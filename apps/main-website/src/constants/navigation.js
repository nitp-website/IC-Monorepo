import {
  facebook_url,
  instagram_url,
  linkedin_url,
  nitp_main,
  tinkering_lab,
  pitchtember_url,
  ic_logo,
  nitp_logo,
} from './const';

export const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '/#home' },
  {
    id: 'about',
    label: 'About Us',
    href: '/#about',
    children: [
      { label: 'Our Vision', href: '/#vision' },
      { label: 'Our Support', href: '/#support' },
    ],
  },
  {
    id: 'incubations',
    label: 'Incubations',
    href: '/#incubations',
    children: [
      { label: 'Directors Desk', href: '/#darki' },
      { label: 'Talks about us!', href: '/#talks' },
    ],
  },
  { id: 'events', label: 'Events', href: '/events' },
  { id: 'gallery', label: 'Gallery', href: '/gallery' },
  {
    id: 'team',
    label: 'Team',
    href: '/team/members',
    children: [
      { label: 'Student Team', href: '/team/members' },
      { label: 'Faculty & Advisors', href: '/team/faculty' },
      { label: 'Office Bearers', href: '/team/office-bearer' },
    ],
  },
];

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: linkedin_url, icon: 'linkedin' },
  { name: 'Instagram', url: instagram_url, icon: 'instagram' },
  { name: 'Facebook', url: facebook_url, icon: 'facebook' },
];

export const EXTERNAL_LINKS = {
  nitp: nitp_main,
  tinkeringLab: tinkering_lab,
  pitchtember: pitchtember_url,
  icLogo: ic_logo,
  nitpLogo: nitp_logo,
};
