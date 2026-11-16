'use client';

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import MemberCard from '@/components/team/MemberCard';
import TeamSectionGrid from '@/components/team/TeamSectionGrid';
import { OFFICE_BEARERS_DATA } from '@/constants/team';

/**
 * Strict hierarchy rank: Lead (1) > Co-Lead (2) > Senior Member (3) > Other (4)
 */
function getPostRank(post = '') {
  const p = (post || '').toLowerCase().trim();
  if (
    p.includes('co-lead') ||
    p.includes('co lead') ||
    p.includes('colead') ||
    p.includes('co-coordinator') ||
    p.includes('cocoordinator')
  ) {
    return 2;
  }
  if (
    p.includes('lead') ||
    p.includes('head') ||
    p.includes('secretary') ||
    p.includes('coordinator') ||
    p.includes('president')
  ) {
    return 1;
  }
  if (p.includes('senior')) {
    return 3;
  }
  return 4;
}

function sortByPostOrder(members = []) {
  return [...members].sort((a, b) => getPostRank(a.post) - getPostRank(b.post));
}

export default function OfficeBearersPage() {
  const allMembers = Array.isArray(OFFICE_BEARERS_DATA) ? OFFICE_BEARERS_DATA : [];

  // Group members by domain with strict rank order (Lead > Co-Lead > Senior Member)
  // Leadership excludes Senior Members (Senior members belong to their respective teams)
  const leadershipMembers = useMemo(
    () =>
      sortByPostOrder(
        allMembers.filter((m) => {
          const post = (m.post || '').toLowerCase();
          const team = (m.team || '').toLowerCase();
          return (
            (post.includes('secretary') ||
              (!team && !post.includes('lead') && !post.includes('senior'))) &&
            !post.includes('senior')
          );
        })
      ),
    [allMembers]
  );

  const technicalMembers = useMemo(
    () =>
      sortByPostOrder(
        allMembers.filter(
          (m) =>
            (m.team || '').toLowerCase() === 'technical' ||
            (m.post || '').toLowerCase().includes('technical')
        )
      ),
    [allMembers]
  );

  const webMembers = useMemo(
    () =>
      sortByPostOrder(
        allMembers.filter(
          (m) =>
            (m.team || '').toLowerCase() === 'web' ||
            (m.post || '').toLowerCase().includes('web')
        )
      ),
    [allMembers]
  );

  const designMembers = useMemo(
    () =>
      sortByPostOrder(
        allMembers.filter(
          (m) =>
            (m.team || '').toLowerCase() === 'design' ||
            (m.post || '').toLowerCase().includes('design')
        )
      ),
    [allMembers]
  );

  const mediaMembers = useMemo(
    () =>
      sortByPostOrder(
        allMembers.filter(
          (m) =>
            (m.team || '').toLowerCase() === 'media' ||
            (m.post || '').toLowerCase().includes('media')
        )
      ),
    [allMembers]
  );

  const prMembers = useMemo(
    () =>
      sortByPostOrder(
        allMembers.filter(
          (m) =>
            (m.team || '').toLowerCase() === 'pr' ||
            (m.post || '').toLowerCase().includes('pr')
        )
      ),
    [allMembers]
  );

  const contentMembers = useMemo(
    () =>
      sortByPostOrder(
        allMembers.filter(
          (m) =>
            (m.team || '').toLowerCase() === 'content' ||
            (m.post || '').toLowerCase().includes('content')
        )
      ),
    [allMembers]
  );

  const eventMembers = useMemo(
    () =>
      sortByPostOrder(
        allMembers.filter(
          (m) =>
            (m.team || '').toLowerCase() === 'event' ||
            (m.post || '').toLowerCase().includes('event')
        )
      ),
    [allMembers]
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 max-w-[800px] px-4"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Honouring <span className="text-[#0ef]">Office Bearers</span>
        </h2>
      </motion.div>

      {/* Main Content Presentation */}
      <div className="w-full flex flex-col items-center">
        {leadershipMembers.length > 0 && (
          <TeamSectionGrid title="Executive & Leadership">
            {leadershipMembers.map((info, idx) => (
              <MemberCard key={`lead-${idx}`} info={info} />
            ))}
          </TeamSectionGrid>
        )}

        {technicalMembers.length > 0 && (
          <TeamSectionGrid title="Technical Team">
            {technicalMembers.map((info, idx) => (
              <MemberCard key={`tech-${idx}`} info={info} />
            ))}
          </TeamSectionGrid>
        )}

        {webMembers.length > 0 && (
          <TeamSectionGrid title="Web Team">
            {webMembers.map((info, idx) => (
              <MemberCard key={`web-${idx}`} info={info} />
            ))}
          </TeamSectionGrid>
        )}

        {designMembers.length > 0 && (
          <TeamSectionGrid title="Design Team">
            {designMembers.map((info, idx) => (
              <MemberCard key={`design-${idx}`} info={info} />
            ))}
          </TeamSectionGrid>
        )}

        {mediaMembers.length > 0 && (
          <TeamSectionGrid title="Media Team">
            {mediaMembers.map((info, idx) => (
              <MemberCard key={`media-${idx}`} info={info} />
            ))}
          </TeamSectionGrid>
        )}

        {prMembers.length > 0 && (
          <TeamSectionGrid title="PR & Outreach Team">
            {prMembers.map((info, idx) => (
              <MemberCard key={`pr-${idx}`} info={info} />
            ))}
          </TeamSectionGrid>
        )}

        {contentMembers.length > 0 && (
          <TeamSectionGrid title="Content Team">
            {contentMembers.map((info, idx) => (
              <MemberCard key={`content-${idx}`} info={info} />
            ))}
          </TeamSectionGrid>
        )}

        {eventMembers.length > 0 && (
          <TeamSectionGrid title="Event Team">
            {eventMembers.map((info, idx) => (
              <MemberCard key={`event-${idx}`} info={info} />
            ))}
          </TeamSectionGrid>
        )}
      </div>
    </div>
  );
}
