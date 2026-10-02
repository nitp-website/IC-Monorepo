import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { requireAuth } from "../../middleware/auth";
import { prisma } from "@repo/database";

const resourceActionSchema = z.object({
  quantity: z
    .number()
    .int()
    .positive()
    .default(1),
});

export async function participantResourceRoutes(app: FastifyInstance) {
  // GET /api/events/:eventId/resources
  // Returns catalog of active event resources with real-time available stock
  app.get(
    "/",
    { preHandler: [requireAuth] },
    async (request, reply) => {
      const { eventId } = request.params as { 
        eventId: string;
      };

      const resources = await prisma.eventResource.findMany({
        where: { 
          eventId, 
          active: true 
        },
        select: {
          id: true,
          name: true,
          description: true,
          type: true,
          content: true,
          quantity: true,
          quantityUsed: true,
          createdAt: true,
        },
        orderBy: { 
          name: "asc" 
        },
      });

      const data = resources.map((r) => {
        const availableStock = Math.max(0, r.quantity - r.quantityUsed);
        return {
          ...r,
          available: availableStock,
        };
      });

      return reply.send({ 
        success: true, 
        data 
      });
    }
  );

  // POST /api/events/:eventId/resources/:resourceId/acquire
  // Atomically deducts inventory & logs acquisition timestamp
  app.post(
    "/:resourceId/acquire",
    { preHandler: [requireAuth] },
    async (request, reply) => {
      const { eventId, resourceId } = request.params as { 
        eventId: string; 
        resourceId: string;
      };
        //   const user = (request as any).user || {
        //     id: (request.headers["x-user-id"] as string) || "test-user-id-123",
        //     };
      const user = (request as any).user;

      const body = resourceActionSchema.safeParse(request.body || {});
      if (!body.success) {
        return reply.status(400).send({ 
          success: false, 
          error: body.error.flatten() 
        });
      }

      const acquireQuantity = body.data.quantity;

      // Resolve participant and team
      const participant = await prisma.eventParticipant.findUnique({
        where: { 
          eventId_userId: { 
            eventId, 
            userId: user.id 
          } 
        },
        include: { 
          teamMemberships: true 
        },
      });

      const membership = participant?.teamMemberships[0];
      if (!participant || !membership) {
        return reply.status(403).send({
          success: false,
          error: { 
            code: "NO_TEAM", 
            message: "You must belong to a team to acquire resources." 
          },
        });
      }

      const teamId = membership.teamId;

      try {
        const result = await prisma.$transaction(async (tx) => {
          // Validate resource belongs to event and is active
          const resource = await tx.eventResource.findUnique({
            where: { 
              id: resourceId 
            },
          });

          if (!resource || resource.eventId !== eventId || !resource.active) {
            throw new Error("RESOURCE_NOT_FOUND");
          }

          // Atomically deduct pool stock
          const updateCount = await tx.$executeRaw`
            UPDATE "EventResource"
            SET "quantityUsed" = "quantityUsed" + ${acquireQuantity},
                "updatedAt" = NOW()
            WHERE "id" = ${resourceId}
              AND ("quantity" - "quantityUsed") >= ${acquireQuantity}
              AND "active" = true
          `;

          if (updateCount === 0) {
            throw new Error("OUT_OF_STOCK");
          }

          // Update team holdings with database-level atomic increment
          const existingHold = await tx.eventTeamResource.findUnique({
            where: { 
              teamId_resourceId: { 
                teamId, 
                resourceId 
              } 
            },
          });

          const now = new Date();
          const isReacquiringAfterFullRelease = Boolean(existingHold?.releasedAt);

          const updatedTeamResource = await tx.eventTeamResource.upsert({
            where: { 
              teamId_resourceId: { 
                teamId, 
                resourceId 
              } 
            },
            update: {
              quantity: isReacquiringAfterFullRelease
                ? acquireQuantity
                : { increment: acquireQuantity },
              releasedAt: null,
              acquiredAt: now,
            },
            create: {
              teamId,
              resourceId,
              quantity: acquireQuantity,
              acquiredAt: now,
              unlockedAt: now,
            },
          });

          // Append audit log
          await tx.eventResourceAuditLog.create({
            data: {
              teamId,
              resourceId,
              action: "ACQUIRE",
              quantity: acquireQuantity,
              timestamp: now,
            },
          });

          return {
            resourceId,
            acquired: acquireQuantity,
            teamHolding: updatedTeamResource.quantity,
          };
        });

        return reply.send({ 
          success: true, 
          data: result 
        });
      } catch (err: any) {
        if (err.message === "RESOURCE_NOT_FOUND") {
          return reply.status(404).send({ 
            success: false, 
            error: { 
              code: "NOT_FOUND", 
              message: "Resource not found." 
            } 
          });
        }
        if (err.message === "OUT_OF_STOCK") {
          return reply.status(409).send({ 
            success: false, 
            error: { 
              code: "OUT_OF_STOCK", 
              message: "Insufficient stock available." 
            } 
          });
        }
        throw err;
      }
    }
  );

  // POST /api/events/:eventId/resources/:resourceId/release
  // Restores stock back to pool & logs release timestamp
  app.post(
    "/:resourceId/release",
    { preHandler: [requireAuth] },


    async (request, reply) => {
      const { eventId, resourceId } = request.params as { 
        eventId: string; 
        resourceId: string;
      };
        //   const user = (request as any).user || {
        //     id: (request.headers["x-user-id"] as string) || "test-user-id-123",
        //     };
      const user = (request as any).user;

      const body = resourceActionSchema.safeParse(request.body || {});
      if (!body.success) {
        return reply.status(400).send({ 
          success: false, 
          error: body.error.flatten() 
        });
      }

      const releaseQuantity = body.data.quantity;

      // Resolve participant and team
      const participant = await prisma.eventParticipant.findUnique({
        where: { 
          eventId_userId: { 
            eventId, 
            userId: user.id 
          } 
        },
        include: { 
          teamMemberships: true 
        },
      });

      const membership = participant?.teamMemberships[0];
      if (!participant || !membership) {
        return reply.status(403).send({
          success: false,
          error: { 
            code: "NO_TEAM", 
            message: "You must belong to a team to release resources." 
          },
        });
      }

      const teamId = membership.teamId;

      try {
        const result = await prisma.$transaction(async (tx) => {
          // Validate resource belongs to event
          const resource = await tx.eventResource.findUnique({
            where: { 
              id: resourceId 
            },
          });

          if (!resource || resource.eventId !== eventId) {
            throw new Error("RESOURCE_NOT_FOUND");
          }

          // Validate holdings
          const hold = await tx.eventTeamResource.findUnique({
            where: { 
              teamId_resourceId: { 
                teamId, 
                resourceId 
              } 
            },
          });

          const currentHeld = hold?.releasedAt ? 0 : (hold?.quantity ?? 0);
          if (!hold || currentHeld < releaseQuantity) {
            throw new Error("INSUFFICIENT_HOLDINGS");
          }

          const remaining = currentHeld - releaseQuantity;
          const now = new Date();

          // Restore pool inventory
          await tx.eventResource.update({
            where: { 
              id: resourceId 
            },
            data: {
              quantityUsed: { 
                decrement: releaseQuantity 
              },
            },
          });

          // Update team record
          const updatedHold = await tx.eventTeamResource.update({
            where: { 
              id: hold.id 
            },
            data: {
              quantity: remaining,
              releasedAt: remaining === 0 ? now : null,
            },
          });

          // Append audit log
          await tx.eventResourceAuditLog.create({
            data: {
              teamId,
              resourceId,
              action: "RELEASE",
              quantity: releaseQuantity,
              timestamp: now,
            },
          });

          return {
            resourceId,
            released: releaseQuantity,
            remainingHolding: updatedHold.quantity,
          };
        });

        return reply.send({ 
          success: true, 
          data: result 
        });
      } catch (err: any) {
        if (err.message === "RESOURCE_NOT_FOUND") {
          return reply.status(404).send({ 
            success: false, 
            error: { 
              code: "NOT_FOUND", 
              message: "Resource not found." 
            } 
          });
        }
        if (err.message === "INSUFFICIENT_HOLDINGS") {
          return reply.status(400).send({
            success: false,
            error: { 
              code: "INVALID_QUANTITY", 
              message: "Cannot release more units than your team currently holds." 
            },
          });
        }
        throw err;
      }
    }
  );
}