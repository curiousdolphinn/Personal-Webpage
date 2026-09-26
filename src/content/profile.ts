import { ProfileData } from '../types';
import { siteConfig } from './siteConfig';

/**
 * ============================================================================
 * CONCISE PROFILE & INTELLECTUAL ORIENTATION
 * ============================================================================
 * 
 * Keep profile concise without long biographical narratives or exaggerated claims.
 */
export const profileData: ProfileData = {
  name: siteConfig.name,
  tagline: "Academic notebook, research questions, project archive, and reading records.",
  conciseBackground: [
    "Undergraduate studying Computer Science at BITS Pilani with a focus on mathematical foundations and systems architecture.",
    "This website functions as an index and notebook for technical projects, coursework, reading trails, and logged studies."
  ],
  guidingPrinciples: [
    {
      title: "First Principles Understanding",
      description: "Build foundational intuition and implementations from scratch to verify core mechanics."
    },
    {
      title: "Document Failure & Limitations",
      description: "Record trade-offs, unsolved questions, and implementation constraints honestly."
    },
    {
      title: "Reading & Learning Trails",
      description: "Track source literature, chapters, and prerequisite paths associated with active work."
    }
  ]
};
