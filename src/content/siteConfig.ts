import { SiteConfig } from '../types';

/**
 * ============================================================================
 * CENTRAL SITE & IDENTITY CONFIGURATION
 * ============================================================================
 * 
 * Single source of truth for identity, temporal reference dates, credentials,
 * and contact links across the entire website.
 * 
 * Changing your name or date of birth here automatically updates all views,
 * headers, footers, meta tags, and live time instruments.
 */
export const siteConfig: SiteConfig = {
  // Full name
  name: "M. Hrushi Prakash",

  // Username handle for URL fragments / paths
  handle: "hrushi",

  // Date of Birth in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ)
  // Calculates live elapsed hours, days, weeks since birth (Sep 5, 2007).
  dateOfBirth: "2007-09-05T00:00:00Z",

  // Personal reference date (turning 19 on Sep 5, 2026)
  // Live measurement 02 dynamically tracks hours and days since turning 19
  lifeReferenceDate: "2026-09-05T00:00:00Z",

  // Configurable label for the second live temporal measurement
  lifeReferenceLabel: "Since 19",

  // Academic degree / program
  degree: "B.Sc. in Computer Science",

  // University or institutional affiliation
  institution: "BITS Pilani",

  // Geographic coordinates / location
  location: "Pilani, India",

  // Primary email contact
  email: "curiousdolphinn@gmail.com",

  // GitHub profile (leave empty or link your repository)
  github: "https://github.com/curiousdolphinn",

  // Resume download link / hash route
  resumeUrl: "#resume",
};
