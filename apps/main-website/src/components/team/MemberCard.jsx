'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import Badge from '@/components/ui/Badge';
import { GitHubIcon, LinkedInIcon, InstagramIcon, GmailIcon } from '@/components/icons';
import { getOptimizedCloudinaryUrl } from '@/utils/cloudinary';

export default function MemberCard({ info, isPast = false }) {
  const [imgError, setImgError] = useState(!info.image || info.image.trim() === '');
  const optimizedSrc = getOptimizedCloudinaryUrl(info.image, { width: 320 });

  const hasGithub = Boolean(info.github && info.github !== '#');
  const hasLinkedin = Boolean(info.linkedin && info.linkedin !== '#');
  const hasInstagram = Boolean(info.instagram && info.instagram !== '#');
  const hasEmail = Boolean(info.email && info.email !== '#');

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex flex-col items-center text-center w-full max-w-[300px] sm:max-w-[320px] rounded-3xl bg-white/[0.03] border p-6 backdrop-blur-xl transition-all ${
        isPast
          ? 'border-white/10 hover:border-purple-400/40 hover:bg-white/[0.06]'
          : 'border-white/10 hover:border-[#0ef]/40 hover:bg-white/[0.06]'
      }`}
    >
      <div
        className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 border-2 transition-all bg-neutral-900 shrink-0 ${
          isPast
            ? 'border-purple-400/30 group-hover:border-purple-400'
            : 'border-[#0ef]/30 group-hover:border-[#0ef]'
        }`}
      >
        {!imgError ? (
          <Image
            src={optimizedSrc}
            alt={info.name}
            fill
            sizes="128px"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-3xl font-bold ${
              isPast ? 'text-purple-400' : 'text-[#0ef]'
            }`}
          >
            {info.name ? info.name.charAt(0) : 'U'}
          </div>
        )}
      </div>

      {info.post && (
        <Badge variant={isPast ? 'purple' : 'cyan'} className="mb-2">
          {info.post}
        </Badge>
      )}

      {info.session && (
        <span className="text-[0.7rem] text-white/50 mb-2 font-mono">
          Session: {info.session}
        </span>
      )}

      <h3
        className={`text-lg sm:text-xl font-bold text-white mb-1 transition-colors ${
          isPast ? 'group-hover:text-purple-300' : 'group-hover:text-[#0ef]'
        }`}
      >
        {info.name}
      </h3>

      {info.department && (
        <span className="text-[0.72rem] text-white/50 mb-2 font-medium tracking-wide">
          {info.department}
        </span>
      )}

      {info.email && (
        <a
          href={`mailto:${info.email}`}
          className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-[#0ef] mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#0ef]/40 transition-colors max-w-full group/email"
          title={info.email}
        >
          <GmailIcon className="w-3.5 h-3.5 text-[#ea4335] shrink-0" />
          <span className="truncate text-[0.72rem] font-mono">{info.email}</span>
        </a>
      )}

      {info.about && (
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4 flex-grow line-clamp-4">
          {info.about}
        </p>
      )}

      {(hasGithub || hasLinkedin || hasInstagram || hasEmail) && (
        <div className="mt-auto flex items-center justify-center gap-3 pt-2">
          {hasGithub && (
            <a
              href={info.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${info.name}'s GitHub`}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/15 transition-all duration-200 shadow-md"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
          )}
          {hasLinkedin && (
            <a
              href={info.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${info.name}'s LinkedIn`}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#0a66c2] hover:border-[#0a66c2]/60 hover:bg-[#0a66c2]/15 transition-all duration-200 shadow-md"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
          {hasInstagram && (
            <a
              href={info.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${info.name}'s Instagram`}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#e4405f] hover:border-[#e4405f]/60 hover:bg-[#e4405f]/15 transition-all duration-200 shadow-md"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          )}
          {hasEmail && (
            <a
              href={`mailto:${info.email}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Email ${info.name}`}
              title={info.email}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#ea4335] hover:border-[#ea4335]/60 hover:bg-[#ea4335]/15 transition-all duration-200 shadow-md"
            >
              <GmailIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
