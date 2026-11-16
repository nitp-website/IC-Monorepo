'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDownIcon, CheckIcon } from '@/components/icons';

const TEAM_TABS = [
  { label: 'Faculty & Advisors', href: '/team/faculty' },
  { label: 'Office Bearers', href: '/team/office-bearer' },
];

export default function TeamLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentTab =
    TEAM_TABS.find(
      (t) =>
        pathname === t.href ||
        (pathname === '/team' && t.href === '/team/office-bearer')
    ) || TEAM_TABS[1];

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 bg-[#050810] opacity-95 bg-[radial-gradient(#142850_1px,#050810_1px)] [background-size:18px_18px] text-white font-['Poppins',sans-serif] select-none">
      <div className="max-w-[1280px] mx-auto px-4 mb-12 flex flex-col items-center gap-4">
        <div className="hidden sm:inline-flex items-center justify-center p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-lg">
          {TEAM_TABS.map((tab) => {
            const isActive =
              pathname === tab.href ||
              (pathname === '/team' && tab.href === '/team/office-bearer');

            return (
              <Link key={tab.href} href={tab.href}>
                <div
                  className={`relative px-6 py-2.5 rounded-full text-sm sm:text-[15px] transition-all duration-200 cursor-pointer ${isActive
                    ? 'text-[#020712] font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/5 font-medium'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTeamTab"
                      className="absolute inset-0 bg-[#00f7ff] rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="relative w-full max-w-[340px] z-30 sm:hidden">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-[#060c1d] border border-white/15 text-white hover:border-white/30 backdrop-blur-xl transition-colors cursor-pointer shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#00f7ff]" />
              <span className="font-semibold text-sm">{currentTab.label}</span>
            </div>
            <motion.span
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-white/70"
            >
              <ChevronDownIcon className="w-4 h-4" />
            </motion.span>
          </button>

          {dropdownOpen && (
            <div
              className="fixed inset-0 z-20"
              onClick={() => setDropdownOpen(false)}
            />
          )}

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute top-full left-0 right-0 mt-1.5 p-1.5 rounded-xl bg-[#060c1d]/98 border border-white/15 shadow-2xl backdrop-blur-2xl flex flex-col gap-1 overflow-hidden z-30"
              >
                {TEAM_TABS.map((tab) => {
                  const isSelected =
                    pathname === tab.href ||
                    (pathname === '/team' && tab.href === '/team/office-bearer');

                  return (
                    <button
                      key={tab.href}
                      onClick={() => {
                        setDropdownOpen(false);
                        router.push(tab.href);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-colors text-left cursor-pointer ${isSelected
                        ? 'bg-white/10 text-[#00f7ff] font-semibold'
                        : 'text-white/75 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      <div>
                        <p className="text-sm font-medium">{tab.label}</p>
                        <p className="text-[0.72rem] text-white/50">{tab.description}</p>
                      </div>
                      {isSelected && <CheckIcon className="w-4 h-4 text-[#00f7ff] shrink-0" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}
