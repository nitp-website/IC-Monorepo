import { EVENTS_DATA } from '@/constants/events';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://incubationcenter.nitp.ac.in';

export default function sitemap() {
  const currentDate = new Date();

  // Core Static Ecosystem Routes
  const staticRoutes = [
    {
      url: `${siteUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/events`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/team/faculty`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/team/office-bearer`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic Event Detail Routes
  const eventRoutes = EVENTS_DATA.map((event) => ({
    url: `${siteUrl}/events/${event.id}`,
    lastModified: event.startDate ? new Date(event.startDate) : currentDate,
    changeFrequency: 'weekly',
    priority: event.status === 'Registrations Open' ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...eventRoutes];
}

