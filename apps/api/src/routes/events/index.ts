import type { FastifyInstance } from "fastify";
import { participantRoutes } from "./participant";
import { scanVoteRoutes } from "./scan";
import { submissionRoutes } from "./submission";
import { adminRoutes } from "./admin";
import { eventResourceRoutes } from "./resources";
import { adminLogRoutes } from "./admin-logs";
import { participantResourceRoutes } from "./participant-resources";
import { requireAuth } from "../../middleware/auth";
import { prisma } from "@repo/database";

import { teamRoutes } from "./teams";

export async function eventsRoutes(app: FastifyInstance) {
  // Public or generic authenticated event routes
  app.get(
    "/",
    async (request, reply) => {
      const events = await prisma.event.findMany({
        where: {
          status: {
            not: "DRAFT",
          },
        },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          type: true,
          status: true,
          startsAt: true,
          endsAt: true,
        },
      });
      return reply.send({ events });
    },
  );

  app.get(
    "/:eventId",
    async (request, reply) => {
      const { eventId } = request.params as { eventId: string };
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          type: true,
          status: true,
          startsAt: true,
          endsAt: true,
        },
      });

      if (!event || event.status === "DRAFT") {
        return reply.status(404).send({ error: "Event not found" });
      }

      return reply.send({ event });
    },
  );

  // Register sub-routes
  app.register(participantRoutes);
  app.register(teamRoutes);

  app.register(participantResourceRoutes, { prefix: "/:eventId/resources" });

  // Phase 1 scan initiation + Phase 2/3 vote endpoints
  app.register(scanVoteRoutes, { prefix: "/:eventId/scan" });
  app.register(submissionRoutes, { prefix: "/:eventId/submission" });
  app.register(adminRoutes, { prefix: "/admin" });
  // Admin resource management (CRUD + QR generation + Excel import)
  app.register(eventResourceRoutes, { prefix: "/admin" });
  // Admin logs + overview
  app.register(adminLogRoutes, { prefix: "/admin" });
}
