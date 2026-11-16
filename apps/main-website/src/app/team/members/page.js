'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MemberCard from '@/components/team/MemberCard';
import TeamSectionGrid from '@/components/team/TeamSectionGrid';
import { STUDENT_TEAM_DATA } from '@/constants/team';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Teams' },
  { id: 'executive', label: 'Executive Leadership' },
  { id: 'web', label: 'Web Team' },
  { id: 'technical', label: 'Technical Team' },
  { id: 'design', label: 'Design Team' },
  { id: 'media', label: 'Media Team' },
  { id: 'prContent', label: 'PR & Content Team' },
  { id: 'eventCore', label: 'Event & Core Team' },
  { id: 'pastMembers', label: 'Past Members' },
];

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
    p.includes('coordinator') ||
    p.includes('secretary') ||
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

export default function StudentTeamPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const {
    coordinators,
    cocoordinators,
    secretaries,
    committeeCoordinators,
    leads,
    coLeads,
    pastMembers,
  } = STUDENT_TEAM_DATA;

  const showAll = selectedFilter === 'all';

  // Grouping active members by functional domains in strict Lead > Co-Lead > Senior Member order
  const executiveMembers = sortByPostOrder([
    ...(coordinators || []),
    ...(cocoordinators || []),
    ...(secretaries || []),
  ]);

  const webMembers = sortByPostOrder([
    ...(leads || []).filter((m) => m.post?.toLowerCase().includes('web')),
    ...(coLeads || []).filter((m) => m.post?.toLowerCase().includes('web')),
    ...(committeeCoordinators || []).filter((m) => m.post?.toLowerCase().includes('web')),
  ]);

  const technicalMembers = sortByPostOrder([
    ...(leads || []).filter((m) => m.post?.toLowerCase().includes('technical')),
    ...(coLeads || []).filter((m) => m.post?.toLowerCase().includes('technical')),
    ...(committeeCoordinators || []).filter((m) => m.post?.toLowerCase().includes('technical')),
  ]);

  const designMembers = sortByPostOrder([
    ...(leads || []).filter((m) => m.post?.toLowerCase().includes('design')),
    ...(coLeads || []).filter((m) => m.post?.toLowerCase().includes('design')),
    ...(committeeCoordinators || []).filter((m) => m.post?.toLowerCase().includes('design')),
  ]);

  const mediaMembers = sortByPostOrder([
    ...(leads || []).filter((m) => m.post?.toLowerCase().includes('media')),
    ...(coLeads || []).filter((m) => m.post?.toLowerCase().includes('media')),
    ...(committeeCoordinators || []).filter((m) => m.post?.toLowerCase().includes('media')),
  ]);

  const prContentMembers = sortByPostOrder([
    ...(leads || []).filter((m) => m.post?.toLowerCase().includes('pr') || m.post?.toLowerCase().includes('content')),
    ...(coLeads || []).filter((m) => m.post?.toLowerCase().includes('pr') || m.post?.toLowerCase().includes('content')),
    ...(committeeCoordinators || []).filter((m) => m.post?.toLowerCase().includes('pr') || m.post?.toLowerCase().includes('content')),
  ]);

  const eventCoreMembers = sortByPostOrder([
    ...(leads || []).filter((m) => m.post?.toLowerCase().includes('event') || m.post?.toLowerCase().includes('core')),
    ...(coLeads || []).filter((m) => m.post?.toLowerCase().includes('event') || m.post?.toLowerCase().includes('core')),
    ...(committeeCoordinators || []).filter((m) => m.post?.toLowerCase().includes('event') || m.post?.toLowerCase().includes('core')),
  ]);

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 max-w-[800px]"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Active <span className="text-[#0ef]">Student Members</span>
        </h2>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12 max-w-[1050px] px-4">
        {FILTER_OPTIONS.map((opt) => {
          const isSelected = selectedFilter === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => setSelectedFilter(opt.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${isSelected
                ? 'bg-[#00f7ff] text-[#020712] font-semibold'
                : 'bg-white/5 text-white/75 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-center"
          >
            {(showAll || selectedFilter === 'executive') && executiveMembers.length > 0 && (
              <TeamSectionGrid title="Executive Leadership">
                {executiveMembers.map((info, idx) => (
                  <MemberCard key={`exec-${idx}`} info={info} />
                ))}
              </TeamSectionGrid>
            )}

            {(showAll || selectedFilter === 'web') && webMembers.length > 0 && (
              <TeamSectionGrid title="Web Team">
                {webMembers.map((info, idx) => (
                  <MemberCard key={`web-${idx}`} info={info} />
                ))}
              </TeamSectionGrid>
            )}

            {(showAll || selectedFilter === 'technical') && technicalMembers.length > 0 && (
              <TeamSectionGrid title="Technical Team">
                {technicalMembers.map((info, idx) => (
                  <MemberCard key={`tech-${idx}`} info={info} />
                ))}
              </TeamSectionGrid>
            )}

            {(showAll || selectedFilter === 'design') && designMembers.length > 0 && (
              <TeamSectionGrid title="Design Team">
                {designMembers.map((info, idx) => (
                  <MemberCard key={`design-${idx}`} info={info} />
                ))}
              </TeamSectionGrid>
            )}

            {(showAll || selectedFilter === 'media') && mediaMembers.length > 0 && (
              <TeamSectionGrid title="Media Team">
                {mediaMembers.map((info, idx) => (
                  <MemberCard key={`media-${idx}`} info={info} />
                ))}
              </TeamSectionGrid>
            )}

            {(showAll || selectedFilter === 'prContent') && prContentMembers.length > 0 && (
              <TeamSectionGrid title="PR & Content Team">
                {prContentMembers.map((info, idx) => (
                  <MemberCard key={`pr-${idx}`} info={info} />
                ))}
              </TeamSectionGrid>
            )}

            {(showAll || selectedFilter === 'eventCore') && eventCoreMembers.length > 0 && (
              <TeamSectionGrid title="Event & Core Team">
                {eventCoreMembers.map((info, idx) => (
                  <MemberCard key={`event-${idx}`} info={info} />
                ))}
              </TeamSectionGrid>
            )}

            {(showAll || selectedFilter === 'pastMembers') && pastMembers && pastMembers.length > 0 && (
              <div className={`${showAll ? 'pt-8 border-t border-dashed border-white/15' : ''} w-full flex flex-col items-center`}>
                <TeamSectionGrid title="Past Student Members" isPast={true}>
                  {pastMembers.map((info, idx) => (
                    <MemberCard key={`past-${idx}`} info={info} isPast={true} />
                  ))}
                </TeamSectionGrid>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}