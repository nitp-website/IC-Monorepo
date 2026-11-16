import {
  NOTICES_DATA,
  ABOUT_DATA,
  VISION_DATA,
  LEADERSHIP_DATA,
  SUPPORT_SLIDES_DATA,
  INCUBATIONS_DATA,
  TALKS_DATA,
  EVENTS_DATA,
  GALLERY_IMAGES_DATA,
  FACULTY_TEAM_DATA,
  STUDENT_TEAM_DATA,
  OFFICE_BEARERS_DATA,
  FAQ_DATA,
  NAV_LINKS,
  SOCIAL_LINKS,
  EXTERNAL_LINKS,
} from '@/constants';

// Data service layer providing application constants and API accessors.

export async function getNotices() {
  return NOTICES_DATA;
}

export async function getAboutContent() {
  return ABOUT_DATA;
}

export async function getVisionContent() {
  return VISION_DATA;
}

export async function getLeadershipMessages() {
  return LEADERSHIP_DATA;
}

export async function getSupportSlides() {
  return SUPPORT_SLIDES_DATA;
}

export async function getIncubations() {
  return INCUBATIONS_DATA;
}

export async function getTalks() {
  return TALKS_DATA;
}

export async function getEvents() {
  return EVENTS_DATA;
}

export async function getEventById(id) {
  return EVENTS_DATA.find((e) => e.id === id) || null;
}

export async function getGalleryImages() {
  return GALLERY_IMAGES_DATA;
}

export async function getFacultyTeam() {
  return FACULTY_TEAM_DATA;
}

export async function getStudentTeam() {
  return STUDENT_TEAM_DATA;
}

export async function getOfficeBearers() {
  return OFFICE_BEARERS_DATA;
}

export async function getFaqs() {
  return FAQ_DATA;
}

export async function getNavLinks() {
  return NAV_LINKS;
}

export async function getSocialLinks() {
  return SOCIAL_LINKS;
}

export async function getExternalLinks() {
  return EXTERNAL_LINKS;
}
