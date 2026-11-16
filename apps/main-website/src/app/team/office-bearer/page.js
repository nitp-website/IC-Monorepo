'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import MemberCard from '@/components/team/MemberCard';
import TeamSectionGrid from '@/components/team/TeamSectionGrid';
import { OFFICE_BEARERS_DATA, STUDENT_TEAM_DATA } from '@/constants/team';

const CURRENT_SESSION = '2026-27';
const PAST_SESSION = '2025-26';

const TEAM_SECTIONS = [
  { title: 'Executive & Leadership', match: (member) => !member.team },
  { title: 'Web Team', match: (member) => /web/i.test(`${member.team || ''} ${member.post || ''}`) },
  { title: 'Technical Team', match: (member) => /technical/i.test(`${member.team || ''} ${member.post || ''}`) },
  { title: 'Design Team', match: (member) => /design/i.test(`${member.team || ''} ${member.post || ''}`) },
  { title: 'Media Team', match: (member) => /media/i.test(`${member.team || ''} ${member.post || ''}`) },
  { title: 'PR & Content Team', match: (member) => /pr|content|outreach/i.test(`${member.team || ''} ${member.post || ''}`) },
  { title: 'Event & Core Team', match: (member) => /event|core/i.test(`${member.team || ''} ${member.post || ''}`) },
];

function getPostRank(member) {
  const post = member.post || '';
  const value = post.toLowerCase().trim();
  const isStudentCoordinator = /student\s+co[- ]?[-]?ordinator/.test(value);
  const isExecutivePost = /president|secretary/.test(value) || isStudentCoordinator;
  const isTeamPost = /committee\s+co[- ]?[-]?ordinator|\bcoordinator\b|\bco-ordinator\b|\blead\b|\bhead\b/.test(value);

  if (isExecutivePost && !member.team) return 1;
  if (isTeamPost && !/co[- ]?lead/.test(value)) return 2;
  if (/co[- ]?lead/.test(value)) return 3;
  return 4;
}

function sortByHierarchy(members) {
  return [...members].sort((a, b) => getPostRank(a) - getPostRank(b));
}

function getPastOfficeBearers() {
  const data = STUDENT_TEAM_DATA;
  return [
    ...(data.coordinators || []),
    ...(data.cocoordinators || []),
    ...(data.secretaries || []),
    ...(data.leads || []),
    ...(data.coLeads || []),
    ...(data.committeeCoordinators || []),
  ].map((member) => ({
    ...member,
    team: member.team || inferTeam(member.post),
    session: PAST_SESSION,
  }));
}

function inferTeam(post = '') {
  const value = post.toLowerCase();
  for (const team of ['technical', 'web', 'design', 'media', 'pr', 'content', 'event', 'core']) {
    if (value.includes(team)) return team === 'pr' ? 'PR' : team[0].toUpperCase() + team.slice(1);
  }
  return null;
}

function SessionGroups({ members, isPast = false, hierarchical = false }) {
  if (hierarchical) {
    const hierarchySections = [
      { title: 'Executive & Leadership', rank: 1 },
      { title: 'Team Committee Coordinators & Leads', rank: 2 },
      { title: 'Co-Leads', rank: 3 },
      { title: 'Senior Members', rank: 4 },
    ];

    return (
      <div className="w-full flex flex-col items-center">
        {hierarchySections.map(({ title, rank }) => {
          const sectionMembers = members.filter((member) => getPostRank(member) === rank);
          if (!sectionMembers.length) return null;
          return (
            <TeamSectionGrid key={title} title={title} isPast={isPast}>
              {sectionMembers.map((member, index) => (
                <MemberCard key={`hierarchy-${title}-${member.id || member.email || member.name}-${index}`} info={member} isPast={isPast} />
              ))}
            </TeamSectionGrid>
          );
        })}
      </div>
    );
  }

  const assigned = new Set();

  return (
    <div className="w-full flex flex-col items-center">
      {TEAM_SECTIONS.map(({ title, match }) => {
        const sectionMembers = sortByHierarchy(members.filter((member) => {
          if (assigned.has(member)) return false;
          const belongs = match(member);
          if (belongs) assigned.add(member);
          return belongs;
        }));

        if (!sectionMembers.length) return null;
        return (
          <TeamSectionGrid key={title} title={title} isPast={isPast}>
            {sectionMembers.map((member, index) => (
              <MemberCard key={`${title}-${member.id || member.email || member.name}-${index}`} info={member} isPast={isPast} />
            ))}
          </TeamSectionGrid>
        );
      })}

      {(() => {
        const otherMembers = sortByHierarchy(members.filter((member) => !assigned.has(member)));
        return otherMembers.length ? (
          <TeamSectionGrid title="Other Office Bearers" isPast={isPast}>
            {otherMembers.map((member, index) => (
              <MemberCard key={`other-${member.id || member.email || member.name}-${index}`} info={member} isPast={isPast} />
            ))}
          </TeamSectionGrid>
        ) : null;
      })()}
    </div>
  );
}

export default function OfficeBearersPage() {
  const [selectedSession, setSelectedSession] = useState(CURRENT_SESSION);
  const [hierarchical, setHierarchical] = useState(false);
  const pastMembers = useMemo(() => getPastOfficeBearers(), []);
  const currentMembers = Array.isArray(OFFICE_BEARERS_DATA) ? OFFICE_BEARERS_DATA : [];
  const showingPast = selectedSession === PAST_SESSION;
  const members = showingPast ? pastMembers : currentMembers;

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 max-w-[800px] px-4"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Honouring <span className="text-[#0ef]">Office Bearers</span>
        </h2>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-5 px-4" role="tablist" aria-label="Office bearer sessions">
        {[CURRENT_SESSION, PAST_SESSION].map((session) => {
          const selected = selectedSession === session;
          return (
            <button
              key={session}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setSelectedSession(session)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${selected
                ? 'bg-[#00f7ff] text-[#020712] font-semibold'
                : 'bg-white/5 text-white/75 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
            >
              {session === CURRENT_SESSION ? 'Current Session ' : 'Session '}{session}
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-[1240px] flex items-center justify-end gap-3 mb-12 px-4">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10 bg-[#0b111b]">
        <span id="hierarchy-toggle-label" className="text-xs sm:text-sm font-medium text-white/75">
          Hierarchical order
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={hierarchical}
          aria-labelledby="hierarchy-toggle-label"
          onClick={() => setHierarchical((value) => !value)}
          className={`relative w-11 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f7ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b111b] ${hierarchical ? 'bg-[#00d9e8]' : 'bg-white/20'}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${hierarchical ? 'translate-x-5' : 'translate-x-0'}`}
          />
        </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8 w-full max-w-[800px] px-4">
        <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${showingPast ? 'to-purple-400/40' : 'to-[#0ef]/40'}`} />
        <h3 className="text-base sm:text-lg font-bold tracking-wider uppercase text-white shrink-0">
          Session {selectedSession}
        </h3>
        <div className={`h-px flex-1 bg-gradient-to-l from-transparent ${showingPast ? 'to-purple-400/40' : 'to-[#0ef]/40'}`} />
      </div>
      {members.length ? (
        <SessionGroups members={members} isPast={showingPast} hierarchical={hierarchical} />
      ) : (
        <p className="text-white/60 text-sm mb-16">Office bearer records for this session will be added soon.</p>
      )}
    </div>
  );
}
