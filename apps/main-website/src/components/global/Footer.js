'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { facebook_url, instagram_url, linkedin_url } from '@/constants/const';
import {
  LocationIcon,
  EnvelopeIcon,
  ArrowUpIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/icons';

const FOOTER_SECTIONS = [
  {
    title: 'Incubation Center',
    links: [
      { label: 'About Us', href: '/#about' },
      { label: 'Our Vision', href: '/#vision' },
      { label: 'Support Pillars', href: '/#support' },
      { label: 'Leadership Desk', href: '/#darki' },
      { label: 'Incubated Startups', href: '/#incubations' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Events & Timeline', href: '/events' },
      { label: 'Photo Gallery', href: '/gallery' },
      { label: 'Faculty & Advisors', href: '/team/faculty' },
      { label: 'Past Office Bearers', href: '/team/office-bearer' },
    ],
  },
  {
    title: 'Startups & Grants',
    links: [
      { label: 'Apply for Incubation', href: '/#idea' },
      { label: 'Tinkering Lab Access', href: 'https://tinkering-lab.onrender.com' },
      { label: 'Pitchtember Tech', href: 'https://www.pitchtember.tech/' },
      { label: 'NIT Patna Main Site', href: 'https://www.nitp.ac.in' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: facebook_url,
    icon: FacebookIcon,
    hoverClass: 'hover:text-[#1877f2] hover:border-[#1877f2]/60 hover:bg-[#1877f2]/15 hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]',
  },
  {
    name: 'Instagram',
    href: instagram_url,
    icon: InstagramIcon,
    hoverClass: 'hover:text-[#e4405f] hover:border-[#e4405f]/60 hover:bg-[#e4405f]/15 hover:shadow-[0_0_20px_rgba(228,64,95,0.4)]',
  },
  {
    name: 'LinkedIn',
    href: linkedin_url,
    icon: LinkedInIcon,
    hoverClass: 'hover:text-[#0a66c2] hover:border-[#0a66c2]/60 hover:bg-[#0a66c2]/15 hover:shadow-[0_0_20px_rgba(10,102,194,0.4)]',
  },
];

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleFooterLinkClick = (e, href) => {
    if (href && href.includes('#')) {
      const hash = href.split('#')[1];
      if (pathname === '/') {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-black/80 pt-10 sm:pt-14 text-[#aaa] backdrop-blur-md font-['Poppins',sans-serif]" id="footer">
      <div className="mx-auto mb-4 max-w-[1160px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-x-4 gap-y-8 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
          {FOOTER_SECTIONS.map((section, idx) => (
            <div key={idx} className="col-span-1">
              <h3 className="relative mb-4 sm:mb-6 text-[0.88rem] sm:text-[1rem] font-semibold capitalize text-[#0ef] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-8 after:bg-[#0ef] after:content-['']">
                {section.title}
              </h3>
              <ul className="space-y-2 sm:space-y-[10px]">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleFooterLinkClick(e, link.href)}
                      className="block text-[0.78rem] sm:text-[0.92rem] text-[#aaa] transition-all hover:pl-1 hover:text-[#0ef]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-1">
            <h3 className="relative mb-4 sm:mb-6 text-[0.88rem] sm:text-[1rem] font-semibold capitalize text-[#0ef] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-8 after:bg-[#0ef] after:content-['']">
              Contact Us
            </h3>
            <ul className="space-y-2 sm:space-y-[12px]">
              <li className="flex items-start text-[#aaa] gap-1.5 sm:gap-2.5">
                <LocationIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-white mt-0.5" />
                <span className="text-[0.78rem] sm:text-[0.92rem] leading-relaxed">
                  Incubation Center, NIT Patna, Ashok Rajpath, Bihar - 800005
                </span>
              </li>
              <li>
                <a href="mailto:Incubation@nitp.ac.in" className="group flex items-center gap-1.5 sm:gap-2.5 text-[#aaa] hover:text-[#ea4335] transition-colors">
                  <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-white group-hover:text-[#ea4335] transition-colors" />
                  <span className="text-[0.78rem] sm:text-[0.92rem] break-all sm:break-normal">Incubation@nitp.ac.in</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col items-start sm:items-start pt-2 sm:pt-0">
            <h3 className="relative mb-4 sm:mb-6 text-[0.88rem] sm:text-[1rem] font-semibold capitalize text-[#0ef] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-8 after:bg-[#0ef] after:content-['']">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {SOCIAL_LINKS.map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 transition-all duration-300 shadow-md ${social.hoverClass}`}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-[19px] sm:bottom-6 right-4 sm:right-6 z-[9990] group flex items-center gap-2 py-2.5 px-4 rounded-full bg-[#060d1d]/90 border border-[#0ef]/50 text-[#0ef] backdrop-blur-xl shadow-[0_0_25px_rgba(0,238,255,0.35)] hover:border-[#0ef] hover:shadow-[0_0_35px_rgba(0,238,255,0.7)] hover:bg-[#0ef] hover:text-[#050810] transition-all duration-300 cursor-pointer select-none"
          >
            <ArrowUpIcon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase">
              Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="border-t border-white/10 bg-black/90 px-4 sm:px-5 py-4 sm:py-6">
        <div className="mx-auto flex max-w-[1160px] items-center justify-center">
          <p className="text-center text-[0.75rem] sm:text-[0.88rem] text-[#aaa]">
            Copyright &copy; {year} by IC NITP | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
