'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import EventSponsorsSection from '@/components/sections/EventSponsorsSection';
import { getOptimizedCloudinaryUrl } from '@/utils/cloudinary';
import {
  CalendarIcon,
  ClockIcon,
  LocationIcon,
  CheckIcon,
  ShareIcon,
  ExpandIcon,
} from '@/components/icons';

export default function EventDetailClient({ event }) {
  const [copied, setCopied] = useState(false);
  const optimizedImage = getOptimizedCloudinaryUrl(event.image, { width: 1200 });

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-[1140px] mx-auto pb-12">
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#060a14] mb-10 shadow-2xl">
        <div className="relative h-[280px] sm:h-[380px] md:h-[440px] w-full bg-neutral-950">
          <Image
            src={optimizedImage}
            alt={event.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1140px"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040810] via-[#040810]/45 to-transparent" />

          <div className="absolute top-6 left-6 right-6 flex items-center justify-between gap-3 z-20">
            <Badge variant="cyan">{event.category}</Badge>

            <div className="flex items-center gap-2">
              {event.status && (
                <span
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide border backdrop-blur-md ${
                    event.status === 'Upcoming'
                      ? 'bg-[#0ef]/15 text-[#0ef] border-[#0ef]/40 shadow-[0_0_12px_rgba(0,238,255,0.2)]'
                      : event.status === 'Ongoing'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                      : 'bg-white/10 text-white/70 border-white/15'
                  }`}
                >
                  {event.status} Event
                </span>
              )}
              <a
                href={event.image}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#0ef]/20 hover:text-[#0ef] hover:border-[#0ef]/40 transition-all shadow-lg group/btn"
                title="View Full Poster"
              >
                <ExpandIcon className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10 max-w-[880px]">
            <span className="text-xs font-mono font-bold text-[#0ef] uppercase tracking-widest block mb-2">
              Incubation Center NIT Patna
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              {event.title}
            </h1>
            {event.tagline && (
              <p className="text-sm sm:text-base font-medium text-white/85 mt-2.5 leading-relaxed drop-shadow">
                {event.tagline}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <GlassCard className="p-6 sm:p-8 rounded-3xl border border-white/10" hoverEffect={false}>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-1.5 h-5 rounded-full bg-[#0ef]" />
              About the Event
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-white/80 whitespace-pre-line text-justify">
              {event.description}
            </p>
          </GlassCard>

          {event.highlights && event.highlights.length > 0 && (
            <GlassCard className="p-6 sm:p-8 rounded-3xl border border-white/10" hoverEffect={false}>
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                <span className="w-1.5 h-5 rounded-full bg-[#0ef]" />
                Key Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {event.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <CheckIcon className="w-4 h-4 text-[#0ef] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-white/85 leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {event.speakers && event.speakers.length > 0 && (
            <GlassCard className="p-6 sm:p-8 rounded-3xl border border-white/10" hoverEffect={false}>
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                <span className="w-1.5 h-5 rounded-full bg-[#0ef]" />
                Speakers & Mentors
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.speakers.map((speaker, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#0ef]/40 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#0c1424] border border-[#0ef]/40 flex items-center justify-center font-bold text-base text-[#0ef] shrink-0 shadow-md">
                      {speaker.name ? speaker.name.charAt(0) : 'S'}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {speaker.name}
                      </h3>
                      <p className="text-xs text-white/60 mt-0.5">
                        {speaker.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Event Sponsors & Partners Section */}
          {/* <EventSponsorsSection sponsors={event.sponsors} /> */}

          {event.eligibility && (
            <GlassCard className="p-6 rounded-3xl border border-[#0ef]/30 bg-[#0ef]/5" hoverEffect={false}>
              <h3 className="text-xs sm:text-sm font-bold text-[#0ef] uppercase tracking-wider mb-2">
                Eligibility & Guidelines
              </h3>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                {event.eligibility}
              </p>
            </GlassCard>
          )}
        </div>

        <div className="lg:col-span-5 sticky top-28">
          <GlassCard className="p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col gap-6" hoverEffect={false}>
            <h2 className="text-lg font-bold text-white pb-4 border-b border-white/10">
              Event Information
            </h2>

            <div className="flex flex-col gap-4.5">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#0ef] shrink-0">
                  <CalendarIcon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[0.7rem] text-white/50 block font-mono">DATE</span>
                  <span className="text-xs sm:text-sm font-semibold text-white">{event.date}</span>
                </div>
              </div>

              {event.time && (
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#0ef] shrink-0">
                    <ClockIcon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[0.7rem] text-white/50 block font-mono">TIME</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">{event.time}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#0ef] shrink-0">
                  <LocationIcon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[0.7rem] text-white/50 block font-mono">VENUE</span>
                  <span className="text-xs sm:text-sm font-semibold text-white">{event.venue}</span>
                </div>
              </div>

              {event.mode && (
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#0ef] shrink-0 font-bold text-xs">
                    🌐
                  </div>
                  <div>
                    <span className="text-[0.7rem] text-white/50 block font-mono">MODE</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">{event.mode}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Button
                href={
                  event.url && event.url !== '#'
                    ? event.url
                    : event.status === 'Past'
                    ? '/gallery'
                    : '#idea'
                }
                isExternal={Boolean(event.url && event.url.startsWith('http'))}
                variant="primary"
                size="md"
                className="w-full justify-center text-xs sm:text-sm font-bold uppercase tracking-wider py-3"
              >
                {event.status === 'Past' ? 'View Event Archive →' : 'Register Now →'}
              </Button>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold text-white/70 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <ShareIcon className="w-3.5 h-3.5 text-white/60" />
                    <span>Share Event</span>
                  </>
                )}
              </button>

            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
