export interface DocsGuideItem {
  id: string;
  stepNumber: number;
  title: string;
  filePath: string;
  description: string;
  codeSnippet: string;
  tips: string;
}

export const docsGuideData: DocsGuideItem[] = [
  {
    id: "edit-identity",
    stepNumber: 1,
    title: "1. Changing Your Identity & Reference Dates",
    filePath: "src/content/siteConfig.ts",
    description: "Open `src/content/siteConfig.ts` to configure your name, institutional degree, affiliation, location, contact coordinates, birth date, and personal temporal reference date.",
    codeSnippet: `// src/content/siteConfig.ts
export const siteConfig: SiteConfig = {
  name: "Your Full Name",
  handle: "yourname",
  
  // ISO 8601 string for Live "Time Since Birth" counter
  dateOfBirth: "2007-01-15T08:00:00Z",

  // ISO 8601 string for Live "Time Since Reference Date" counter
  lifeReferenceDate: "2026-01-01T00:00:00Z",

  // Label displayed in the Profile and Time widgets
  lifeReferenceLabel: "Since 19", // or "Since I started tracking"

  degree: "B.S. in Computer Science & Mathematics",
  institution: "Your University / Focus",
  location: "Your City / Campus",
  email: "your.email@example.edu",
  github: "https://github.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourhandle",
  resumeUrl: "#resume",
};`,
    tips: "Editing this single file updates the entire site: navigation bar, hero headers, footer links, curriculum vitae, and live UTC clock measurements."
  },
  {
    id: "add-field",
    stepNumber: 2,
    title: "2. Adding or Modifying a Field",
    filePath: "src/content/fields.ts",
    description: "Fields are organizational categories for your inquiries, current study tracks, and work. You can add as many fields as you wish.",
    codeSnippet: `// src/content/fields.ts
{
  id: "quantum-mechanics",
  slug: "quantum-mechanics",
  title: "Quantum Computation",
  shortTitle: "Quantum",
  tagline: "Unitary transformations, Hilbert spaces, and error correction.",
  description: "Exploring quantum circuit formulations, stabilizer codes, and linear algebraic foundations.",
  whyExploring: "Quantum information theory reveals fundamental limits on information transmission and computation.",
  questions: [
    "How do Calderbank-Shor-Steane (CSS) codes map classical linear error-correcting codes to stabilizer subspaces?",
    "What are the minimal gate sets required for universal fault-tolerant compilation?"
  ],
  currentStudy: [
    {
      title: "Quantum Information Theory",
      subtitle: "Density matrices, quantum entropy, and entanglement witnesses.",
      status: "active"
    }
  ],
  relatedFieldIds: ["mathematics", "cs-ai"]
}`,
    tips: "Fields are categories, not credential claims. The system automatically links any Work or Activity tagged with this field slug."
  },
  {
    id: "add-work",
    stepNumber: 3,
    title: "3. Adding Work (Projects, Implementations, Experiments)",
    filePath: "src/content/work.ts",
    description: "All projects, codebases, experiments, and research items live in the unified `workData` array.",
    codeSnippet: `// src/content/work.ts
{
  id: "work-toy-allocator",
  slug: "toy-heap-allocator",
  title: "Toy Heap Memory Allocator in C99",
  type: "implementation", // 'project' | 'implementation' | 'experiment' | 'research' | 'coursework' | 'proof' | 'reading'
  fields: ["cs-ai"], // Slug of associated fields
  status: "active", // 'active' | 'completed' | 'exploring' | 'paused' | 'abandoned'
  date: "August 2026",
  summary: "A user-space malloc/free implementation using segregated free lists and boundary tag coalescing.",
  tags: ["C", "Linux", "Memory Management", "POSIX"],
  visibility: "public", // 'public' | 'unlisted' | 'private'
  githubUrl: "https://github.com/yourhandle/allocator",
  problem: "Understanding how memory fragmentation and coalescing overhead affect allocation throughput.",
  approach: "Built 8-byte aligned explicit doubly linked lists with power-of-two size classes.",
  whatILearned: "Boundary tag headers reduce free overhead from O(N) to O(1) at the cost of slight heap overhead.",
  limitationsAndMistakes: "Did not yet implement thread-safe locking or per-thread arenas."
}`,
    tips: "Documenting mistakes and unfinished parts reflects genuine engineering rigor."
  },
  {
    id: "add-writing",
    stepNumber: 4,
    title: "4. Adding Technical Writing & Essays",
    filePath: "src/content/work.ts",
    description: "Technical essays and notes are simply Work items with `type: 'writing'`. They support Markdown, KaTeX math expressions, code snippets, and reading time estimation.",
    codeSnippet: `// src/content/work.ts
{
  id: "write-spectral-graph-theory",
  slug: "spectral-graph-theory-intuition",
  title: "Why the Graph Laplacian Measures Smoothness",
  type: "writing",
  fields: ["mathematics", "cs-ai"],
  status: "completed",
  date: "August 2026",
  readingTime: "6 min read",
  tags: ["Mathematics", "Linear Algebra", "Graph Theory"],
  visibility: "public",
  summary: "A geometric interpretation of the quadratic form x^T L x and its relationship to Rayleigh quotients.",
  contentMarkdown: \`
## Introduction

The Graph Laplacian $L = D - A$ satisfies:
$$
x^T L x = \\\\sum_{(u,v) \\\\in E} (x_u - x_v)^2
$$

When $x$ is normalized such that $\\\\sum x_i^2 = 1$, the quadratic form measures the total quadratic variation across all edges.
\`
}`,
    tips: "Math formulas work automatically via KaTeX using single dollar signs $...$ for inline and double dollar signs $$...$$ for blocks."
  },
  {
    id: "add-coursework-proofs-reading",
    stepNumber: 5,
    title: "5. Adding Coursework, Proofs, and Reading Notes",
    filePath: "src/content/work.ts",
    description: "Coursework, proof writeups, problem sets, and paper reproductions use the same unified Work model.",
    codeSnippet: `// src/content/work.ts
// A Proof Writeup
{
  id: "proof-cheeger-inequality",
  slug: "proof-discrete-cheeger-inequality",
  title: "Discrete Cheeger Inequality via Spectral Cut Tracing",
  type: "proof",
  fields: ["mathematics"],
  status: "completed",
  date: "2026",
  summary: "A step-by-step constructive proof showing 2h_G >= lambda_2 >= h_G^2 / 2.",
  tags: ["Proof", "Spectral Graph Theory", "Cheeger Constant"],
  visibility: "public"
},

// A Paper Reproduction / Reading Note
{
  id: "read-shannon-1948",
  slug: "shannon-1948-mathematical-theory-communication",
  title: "Reading Notes: A Mathematical Theory of Communication",
  type: "reading",
  author: "Claude E. Shannon",
  fields: ["mathematics", "cs-ai"],
  status: "completed",
  date: "2026",
  summary: "Notes on source coding theorems, entropy axiomatization, and channel capacity limits.",
  tags: ["Information Theory", "Foundations", "Entropy"],
  visibility: "public"
}`,
    tips: "Any work item automatically appears on the Homepage recent list, Work Archive, and corresponding Field Hubs."
  },
  {
    id: "record-activity",
    stepNumber: 6,
    title: "6. Recording Focus Activities (Calendar / Ledger)",
    filePath: "src/content/activities.ts",
    description: "Every focused session or calendar block is logged in `activitiesData`. Duration is calculated from `startTime` and `endTime` (e.g. '14:00' to '15:30') or specified in `durationMinutes`.",
    codeSnippet: `// src/content/activities.ts
{
  id: "act-2026-08-30-01",
  date: "2026-08-30",
  startTime: "14:00",
  endTime: "15:30", // Computes 90 minutes automatically
  type: "coding", // 'reading'|'writing'|'coding'|'problem-solving'|'coursework'|'proof'
  workId: "toy-heap-allocator", // Links directly to the Work item slug/id
  fields: ["cs-ai"], // Or inherits fields from workId automatically
  notes: "Implemented boundary tag header bit manipulation and free coalescing.",
  visibility: "public"
}`,
    tips: "You can paste daily focus sessions from your calendar. If you do not have exact timestamps, simply provide durationMinutes: 90."
  },
  {
    id: "activity-to-work-and-field-math",
    stepNumber: 7,
    title: "7. How Activity Becomes Work Time & Field Time",
    filePath: "src/lib/activityUtils.ts",
    description: "The aggregation pipeline is mathematically precise and avoids double counting:",
    codeSnippet: `// MATHEMATICAL TIME ALLOCATION PIPELINE:

// 1. Work Time:
// Total time for Work Item W = Sum of all public activities where act.workId === W.slug

// 2. Multi-Field Equal Allocation:
// If an activity has duration D = 60 minutes and is tagged with 2 fields: ['mathematics', 'cryptography']
// - Field 'mathematics' receives: 60 / 2 = +30 minutes
// - Field 'cryptography' receives: 60 / 2 = +30 minutes
// - Overall total work on the site increases by: exactly 60 minutes (no inflation!)

// 3. Field Inheritance:
// If an activity specifies a workId without explicit fields, it automatically inherits
// the field tags from the parent Work item.`,
    tips: "This ensures the sum of all individual field times equals the exact total recorded focus time across your entire life ledger."
  },
  {
    id: "privacy-control",
    stepNumber: 8,
    title: "8. Marking Items Private or Unlisted",
    filePath: "src/content/work.ts & activities.ts",
    description: "Every Work item and Activity record supports the `visibility` field.",
    codeSnippet: `// VISIBILITY SETTINGS:

// 1. Public:
// visibility: 'public'
// Appears on public homepage, feeds, search modal, and public time aggregations.

// 2. Unlisted:
// visibility: 'unlisted'
// Hidden from public feeds and lists, but accessible if given the direct slug URL.

// 3. Private:
// visibility: 'private'
// Completely excluded from public pages, feeds, search indexes, and public time calculations.`,
    tips: "Set private items during early draft stages or for personal logs you do not wish to publish."
  }
];
