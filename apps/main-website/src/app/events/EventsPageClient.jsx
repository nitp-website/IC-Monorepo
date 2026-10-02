'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import { CalendarIcon, LocationIcon, ExpandIcon } from '@/components/icons';
import { getOptimizedCloudinaryUrl } from '@/utils/cloudinary';

const CATEGORIES = ['All', 'Competition', 'Workshop', 'Conclave', 'Summit', 'Investor Connect'];

export default function EventsPageClient({ events = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  const filteredEvents =
    selectedCategory === 'All'
      ? events
      : events.filter((e) => e.category === selectedCategory);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-[#0ef] text-[#050810] shadow-[0_0_20px_rgba(0,238,255,0.4)] scale-105 font-bold'
                  : 'bg-white/5 text-white/70 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="w-full max-w-[380px] h-full"
          >
            <div onClick={() => router.push(`/events/${event.id}`)} className="block h-full cursor-pointer">
              <GlassCard
                className="flex flex-col justify-between h-full overflow-hidden p-0 rounded-2xl group border border-white/10 hover:border-[#0ef]/60 hover:shadow-[0_0_30px_rgba(0,238,255,0.22)] transition-all duration-300 cursor-pointer"
                hoverEffect={true}
              >
                <div className="relative h-[200px] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={getOptimizedCloudinaryUrl(event.image, { width: 500 })}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d18] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge
                      variant={
                        event.status === 'Registrations Open'
                          ? 'cyan'
                          : event.status === 'Upcoming'
                          ? 'amber'
                          : 'purple'
                      }
                    >
                      {event.status || 'Event'}
                    </Badge>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="text-[0.7rem] font-mono font-bold text-white bg-black/60 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md flex items-center">
                      {event.mode || 'In-Person'}
                    </span>
                    <a
                      href={event.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#0ef]/20 hover:text-[#0ef] hover:border-[#0ef]/40 transition-all shadow-lg group/btn"
                      title="View Full Poster"
                    >
                      <ExpandIcon className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#0ef] mb-2">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0ef] transition-colors leading-snug">
                      {event.title}
                    </h3>

                    <p className="text-xs text-white/60 mb-3 flex items-center gap-1.5">
                      <LocationIcon className="w-3.5 h-3.5 text-[#0ef]/80 shrink-0" />
                      <span>{event.venue}</span>
                    </p>

                    <p className="text-sm text-white/75 line-clamp-3 leading-relaxed mb-4">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                    <span className="text-xs font-semibold text-[#0ef] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View Full Details →
                    </span>
                    <span className="text-xs font-mono text-white/40">
                      {event.category}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16 text-white/60">
          No events found in this category.
        </div>
      )}
    </div>
  );
}
