import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import VisionSection from '@/components/sections/VisionSection';
import GoogleSlider from '@/components/sections/GoogleSlider';
import DirectorDesk from '@/components/sections/DirectorDesk';
import IncubationsSection from '@/components/sections/IncubationsSection';
import TalksSection from '@/components/sections/TalksSection';
import EventsSection from '@/components/sections/EventsSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';
import {
  getNotices,
  getAboutContent,
  getVisionContent,
  getLeadershipMessages,
  getSupportSlides,
  getIncubations,
  getTalks,
  getEvents,
  getGalleryImages,
  getFaqs,
} from '@/services/dataService';

export const metadata = {
  title: 'Incubation Center, NIT Patna',
  description:
    'Discover startups, mentorship programs, seed funding guidance, Pitchtember events, and prototyping labs at Incubation Center NIT Patna.',
};

export const revalidate = 60; // ISR: re-fetch at most once a minute

export default async function Home() {
  const [
    notices,
    aboutContent,
    visionContent,
    leadershipMessages,
    supportSlides,
    incubations,
    talks,
    events,
    galleryImages,
    faqs,
  ] = await Promise.all([
    getNotices(),
    getAboutContent(),
    getVisionContent(),
    getLeadershipMessages(),
    getSupportSlides(),
    getIncubations(),
    getTalks(),
    getEvents(),
    getGalleryImages(),
    getFaqs(),
  ]);

  // Structured FAQ schema for Google Search Rich Results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main>
        <HeroSection notices={notices} />
        <AboutSection
          aboutHtml={aboutContent?.aboutHtml}
          campusImage={aboutContent?.campusImage}
          stats={aboutContent?.stats}
        />
        <VisionSection pillars={visionContent?.pillars} />
        <GoogleSlider slides={supportSlides} />
        <DirectorDesk directors={leadershipMessages} />
        <IncubationsSection items={incubations} />
        <TalksSection talks={talks} />
        <EventsSection events={events} />
        <GallerySection images={galleryImages} />
        <ContactSection faqs={faqs} />
      </main>
    </>
  );
}
