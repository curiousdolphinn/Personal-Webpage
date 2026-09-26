export interface SiteConfig {
  name: string;
  handle?: string;
  dateOfBirth?: string; // ISO 8601 string (e.g. "2007-01-15T00:00:00Z")
  lifeReferenceDate?: string; // ISO 8601 string (e.g. "2026-01-01T00:00:00Z")
  lifeReferenceLabel?: string; // e.g. "Since 19", "Since I started tracking", "Since 2026"
  degree: string;
  institution: string;
  location?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  resumeUrl?: string;
  twitter?: string;
  scholar?: string;
}

export type WorkType =
  | 'project'
  | 'coursework'
  | 'proof'
  | 'reading'
  | 'experiment'
  | 'research'
  | 'implementation'
  | 'paper-reproduction'
  | 'problem-set'
  | 'writing'
  | 'other';

export type WorkStatus = 'active' | 'completed' | 'exploring' | 'paused' | 'abandoned';
export type Visibility = 'public' | 'private' | 'unlisted';

export interface WorkLink {
  label: string;
  url: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MILESTONES & PREREQUISITES
// ─────────────────────────────────────────────────────────────────────────────

export type MilestoneStatus = 'completed' | 'current' | 'next' | 'blocked' | 'planned';

export interface MilestoneItem {
  id: string;
  title: string;
  status: MilestoneStatus;
  date?: string;
  description?: string;
  relatedResource?: string;
  relatedWork?: string;
}

export type PrerequisiteStatus = 'completed' | 'current' | 'next' | 'blocked' | 'planned';

export interface PrerequisiteItem {
  id: string;
  title: string;
  status?: PrerequisiteStatus;
  targetSlug?: string;
  targetType?: 'work' | 'writing' | 'learning' | 'resource' | 'field' | 'external';
  url?: string;
  notes?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// LEARNING TRAILS
// ─────────────────────────────────────────────────────────────────────────────

export type LearningTrailStatus = 'completed' | 'current' | 'next' | 'planned' | 'skipped';

export interface LearningTrailResourceRef {
  resourceId?: string;
  title?: string;
  author?: string;
  chapters?: string;
  notes?: string;
  url?: string;
}

export interface LearningTrailItem {
  step: number;
  title: string;
  status: LearningTrailStatus;
  resourceRef?: LearningTrailResourceRef;
  description?: string;
  notes?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOKS & RESOURCES (CHAPTER-LEVEL TRACKING)
// ─────────────────────────────────────────────────────────────────────────────

export type ResourceType =
  | 'book'
  | 'paper'
  | 'course'
  | 'lecture'
  | 'documentation'
  | 'article'
  | 'video'
  | 'problem-set'
  | 'other';

export type ResourcePurpose =
  | 'prerequisite'
  | 'background'
  | 'primary-text'
  | 'reference'
  | 'follow-up'
  | 'paper'
  | 'companion-lecture-series'
  | 'lecture'
  | 'supplementary';

export type ReadingDepth =
  | 'read'
  | 'skimmed'
  | 'worked-through'
  | 'completed-exercises'
  | 'revisited';

export type ChapterStatus = 'unread' | 'reading' | 'completed' | 'skipped' | 'next';

export interface ChapterItem {
  chapterNumber: number | string;
  title: string;
  status: ChapterStatus;
  percentage?: number; // e.g. 50 (displayed if provided, not required)
  readingDepth?: ReadingDepth;
  notes?: string; // Honest qualitative comprehension / notes
  articleSlug?: string; // Link to associated research note or blog essay
}

export interface ResourceItem {
  id: string;
  title: string;
  author?: string;
  type: ResourceType;
  purpose?: ResourcePurpose;
  url?: string;
  notes?: string;
  status?: 'unread' | 'reading' | 'completed' | 'skipped';
  chapters?: ChapterItem[];
  startDate?: string;
  finishDate?: string;
  relatedConcepts?: string[];
  fields?: string[]; // Field slugs
  relatedWork?: string[]; // Work slugs
}

export interface WorkAttachedResource {
  resourceId?: string;
  resource?: ResourceItem;
  purpose?: ResourcePurpose;
  chapters?: string | (number | string)[]; // e.g. "Ch. 1-4" or [1, 2, 3, 4]
  notes?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PIPELINE STAGES (CONNECTED DIAMOND WORKFLOW ARCHITECTURE)
// ─────────────────────────────────────────────────────────────────────────────

export type PipelineStageStatus = 'completed' | 'current' | 'next' | 'planned' | 'paused';

export interface PipelineStage {
  id: string;
  step: number;
  title: string;
  subtitle?: string;
  status: PipelineStageStatus;
  summary: string;
  description?: string;
  critical?: boolean;
  failureModeOrMitigation?: string;
  details?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED WORK ITEM MODEL
// ─────────────────────────────────────────────────────────────────────────────

export interface WorkItem {
  id: string;
  slug: string;
  title: string;
  type: WorkType;
  fields: string[]; // array of field slugs, e.g. ['mathematics', 'cryptography']
  status: WorkStatus;
  date: string; // e.g. "2026-08-30" or "2026"
  summary: string;
  description?: string;
  tags: string[];
  links?: WorkLink[];
  featured?: boolean;
  visibility: Visibility;
  contentMarkdown?: string;

  // Optional specialized properties
  technologies?: string[];
  readingTime?: string; // for writing/reading pieces
  githubUrl?: string;
  demoUrl?: string;
  paperUrl?: string;
  author?: string;
  motivation?: string;
  problem?: string;
  approach?: string;
  whatILearned?: string;
  limitationsAndMistakes?: string;

  // Rich learning & progression architecture
  whatINeededToKnow?: string[]; // Concise prerequisite concept list
  prerequisites?: (PrerequisiteItem | string)[]; // Detailed prerequisite links & status
  milestones?: MilestoneItem[]; // Structured milestones / research checklist
  learningTrail?: LearningTrailItem[]; // Ordered learning trail steps
  resources?: (WorkAttachedResource | string)[]; // Attached books/resources & chapters
  pipelineStages?: PipelineStage[]; // Interactive connected diamond execution pipeline
  relatedResource?: string; // e.g. "artin-algebra-1st-edition"
  relatedChapter?: number | string; // e.g. 1
}

// Backward-compatibility aliases
export type ProjectItem = WorkItem;
export type WritingItem = WorkItem;
export type ProjectStatus = 'IDEA' | 'EXPLORING' | 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
export type ProjectCategory = string;

export interface GoodReadItem {
  id: string;
  title: string;
  url: string;
  author: string;
  publicationDate?: string;
  summary?: string;
  notes?: string;
  tags?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITIES / TIME LEDGER
// ─────────────────────────────────────────────────────────────────────────────

export type ActivityType =
  | 'reading'
  | 'writing'
  | 'coding'
  | 'problem-solving'
  | 'coursework'
  | 'research'
  | 'experiment'
  | 'proof'
  | 'project'
  | 'other';

export interface ActivityRecord {
  id: string;
  date: string; // ISO format "YYYY-MM-DD"
  startTime?: string; // "14:00" or ISO timestamp
  endTime?: string; // "15:30" or ISO timestamp
  durationMinutes?: number; // Calculated or manually specified
  type: ActivityType;
  fields?: string[]; // e.g. ["mathematics", "cryptography"]
  workId?: string; // slug or id of the WorkItem
  notes?: string;
  status?: string;
  visibility: Visibility;
}

// ─────────────────────────────────────────────────────────────────────────────
// LEARNING ITEMS INSIDE FIELDS
// ─────────────────────────────────────────────────────────────────────────────

export type LearningStatus = 'planned' | 'active' | 'paused' | 'completed' | 'abandoned';

export interface LearningItem {
  id: string;
  title: string;
  field: string; // Field slug
  status: LearningStatus;
  subtitle?: string;
  description?: string;
  topics?: string[];
  startedDate?: string;
  lastUpdated?: string;
  notes?: string;
  resources?: string[]; // Resource IDs or titles
  relatedWork?: string[]; // Work slugs
}

// Legacy alias for CurrentStudyItem
export type CurrentStudyItem = LearningItem;

export interface FieldSpecializedSectionItem {
  id?: string;
  title: string;
  subtitle?: string;
  date?: string;
  badge?: string;
  link?: string;
  note?: string;
  content?: string;
}

export interface FieldSpecializedSection {
  id: string;
  title: string;
  description?: string;
  type?: 'proofs' | 'methods' | 'verification' | 'reproductions' | 'open_source' | 'custom';
  items: FieldSpecializedSectionItem[];
}

export interface FieldDefinition {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  tagline?: string;
  description: string;
  whyExploring?: string;
  questions: string[];
  currentStudy?: LearningItem[];
  relatedFieldIds?: string[];
  specializedSections?: FieldSpecializedSection[];
}

export interface ProfileData {
  name: string;
  tagline?: string;
  conciseBackground: string[];
  longBioParagraphs?: string[];
  guidingPrinciples?: { title: string; description: string }[];
}

export interface CourseworkCourse {
  code: string;
  title: string;
  units: number;
  grade?: string;
  status?: 'completed' | 'in-progress' | 'ongoing' | 'planned';
}

export interface SemesterRecord {
  semesterName: string;
  semesterNumber: number;
  status: 'completed' | 'in-progress' | 'ongoing' | 'upcoming';
  totalUnits?: number;
  courses: CourseworkCourse[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  currentStanding?: string;
  gpaOrHonors?: string;
  relevantCoursework: string[];
  semesters?: SemesterRecord[];
}

export interface ResumeData {
  summary: string;
  education: EducationEntry[];
  areasOfExploration: { category: string; skills: string[] }[];
  selectedProjects: { name: string; period: string; tech: string; description: string[] }[];
  honorsAndActivities: { title: string; date: string; description: string }[];
  laboratoryNotes?: string;
}

export interface NowData {
  lastUpdated: string;
  currentQuestion?: string;
  activeInquiries: string[];
}
