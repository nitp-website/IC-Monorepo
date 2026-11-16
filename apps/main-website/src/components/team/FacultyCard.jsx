'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import Badge from '@/components/ui/Badge';
import { EnvelopeIcon } from '@/components/icons';
import { getOptimizedCloudinaryUrl } from '@/utils/cloudinary';

export default function FacultyCard({ info, isHead = false, isPast = false }) {
  const [imgError, setImgError] = useState(!info.image || info.image.trim() === '');
  const optimizedSrc = getOptimizedCloudinaryUrl(info.image, { width: 360 });

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex flex-col items-center text-center w-full ${
        isHead ? 'max-w-[340px] sm:max-w-[360px] lg:max-w-[380px]' : 'max-w-[320px] sm:max-w-[340px]'
      } rounded-3xl bg-white/[0.03] border p-6 sm:p-7 backdrop-blur-xl transition-all ${
        isHead
          ? 'border-[#0ef]/50 hover:border-[#0ef] hover:bg-white/[0.06]'
          : isPast
          ? 'border-white/10 hover:border-amber-400/40 hover:bg-white/[0.06]'
          : 'border-white/10 hover:border-[#0ef]/40 hover:bg-white/[0.06]'
      }`}
    >
      <div
        className={`relative rounded-full overflow-hidden mb-5 border-2 group-hover:scale-105 transition-all bg-neutral-900 shrink-0 ${
          isHead
            ? 'w-32 h-32 sm:w-36 sm:h-36 border-[#0ef]'
            : isPast
            ? 'w-28 h-28 sm:w-32 sm:h-32 border-amber-400/30 group-hover:border-amber-400'
            : 'w-28 h-28 sm:w-32 sm:h-32 border-[#0ef]/30 group-hover:border-[#0ef]'
        }`}
      >
        {!imgError ? (
          <Image
            src={optimizedSrc}
            alt={info.name}
            fill
            sizes="144px"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-3xl font-bold ${
              isPast ? 'text-amber-400' : 'text-[#0ef]'
            }`}
          >
            {info.name ? info.name.charAt(0) : 'P'}
          </div>
        )}
      </div>

      <Badge
        variant={isHead ? 'cyan' : isPast ? 'amber' : 'cyan'}
        className={isHead ? '!bg-[#0ef] !text-[#050810] font-bold mb-2' : 'mb-2'}
      >
        {info.post}
      </Badge>

      {info.tenure && (
        <span className="text-[0.7rem] text-white/50 mb-2 font-mono">
          Tenure: {info.tenure}
        </span>
      )}

      <h3
        className={`text-xl sm:text-2xl font-bold text-white mb-2 transition-colors ${
          isPast ? 'group-hover:text-amber-300' : 'group-hover:text-[#0ef]'
        }`}
      >
        {info.name}
      </h3>

      <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6 flex-grow line-clamp-5">
        {info.about}
      </p>

      {info.email && (
        <a
          href={`mailto:${info.email}`}
          className="mt-auto inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-[#0ef] hover:border-[#0ef] hover:bg-[#0ef]/10 transition-colors"
        >
          <EnvelopeIcon className="w-3.5 h-3.5" />
          <span>{info.email}</span>
        </a>
      )}
    </motion.div>
  );
}
