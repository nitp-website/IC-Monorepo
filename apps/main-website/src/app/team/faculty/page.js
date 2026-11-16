'use client';

import React from 'react';
import { motion } from 'motion/react';
import FacultyCard from '@/components/team/FacultyCard';
import TeamSectionGrid from '@/components/team/TeamSectionGrid';
import { FACULTY_TEAM_DATA } from '@/constants/team';

export default function FacultyTeamPage() {
  const { head, mentors, pastFaculty } = FACULTY_TEAM_DATA;

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 max-w-[800px]"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Faculty & Advisors
        </h2>
      </motion.div>

      {head && head.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 w-full flex flex-col items-center text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8 w-full max-w-[800px] px-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#0ef]/40" />
            <span className="text-base sm:text-lg font-bold tracking-wider uppercase text-white shrink-0">
              Leadership & Head Mentors
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#0ef]/40" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 w-full max-w-[1240px]">
            {head.map((info, idx) => (
              <FacultyCard key={info.id || idx} info={info} isHead={true} />
            ))}
          </div>
        </motion.div>
      )}

      {mentors && mentors.length > 0 && (
        <TeamSectionGrid title="Faculty Mentors" accentWord="">
          {mentors.map((info, idx) => (
            <FacultyCard key={info.id || idx} info={info} />
          ))}
        </TeamSectionGrid>
      )}

      {pastFaculty && pastFaculty.length > 0 && (
        <div className="pt-8 border-t border-dashed border-white/15 w-full flex flex-col items-center">
          <TeamSectionGrid title="Past Faculty & Advisors" isPast={true} accentWord="">
            {pastFaculty.map((info, idx) => (
              <FacultyCard key={info.id || idx} info={info} isPast={true} />
            ))}
          </TeamSectionGrid>
        </div>
      )}
    </div>
  );
}