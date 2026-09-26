# Project / Research Work Item Template

Copy this template into `src/content/work.ts` to add a new project, research paper, library, or experiment.

```typescript
import { WorkItem } from '../types';

export const exampleProject: WorkItem = {
  id: "project-slug-identifier",
  slug: "project-slug-identifier",
  title: "Title of Research or Engineering Project",
  type: "systems", // 'systems' | 'theoretical' | 'implementation' | 'experiment' | 'curriculum' | 'coursework' | 'writing'
  status: "active", // 'active' | 'completed' | 'paused' | 'planned' | 'abandoned'
  visibility: "public", // 'public' | 'private' | 'unlisted'
  date: "Aug 2026",
  summary: "Concise 1-2 sentence description of the project's purpose and core thesis.",
  fields: ["systems-software", "algorithms-complexity"], // slugs of relevant Fields
  
  // Repositories and demos
  githubUrl: "https://github.com/username/repository",
  demoUrl: undefined,
  
  // Core Problem & Approach
  problem: "What specific technical bottleneck, theoretical inquiry, or architectural challenge is being addressed?",
  approach: "How is it built or proved? What algorithms, data structures, or paradigms are deployed?",
  whatILearned: "Key qualitative insights and lessons learned through implementation.",
  limitationsAndMistakes: "Honest analysis of design flaws, performance limits, and dead ends encountered.",
  
  // Prerequisites and Concepts Needed
  whatINeededToKnow: [
    "POSIX memory mapping (mmap)",
    "Cache locality and cache-line eviction",
    "Discrete probability bounds"
  ],
  prerequisites: [
    {
      id: "prereq-1",
      title: "Understanding of Virtual Memory Paging",
      status: "completed"
    },
    {
      id: "prereq-2",
      title: "Previous Research on Page Cache",
      targetSlug: "page-cache-study",
      targetType: "project",
      status: "completed"
    }
  ],

  // Research Milestones (Checklist)
  milestones: [
    {
      id: "m-1",
      title: "Formalize mathematical problem formulation",
      status: "completed",
      description: "Derived the recurrence relation and invariant bounds."
    },
    {
      id: "m-2",
      title: "Implement initial working prototype",
      status: "current",
      description: "Benchmarking single-threaded cache hit rates."
    },
    {
      id: "m-3",
      title: "Profile against baseline implementation",
      status: "next"
    }
  ],

  // Learning Trail (Ordered chronological steps)
  learningTrail: [
    {
      step: 1,
      title: "Survey existing literature on B-tree write-amplification",
      status: "completed",
      resourceRef: {
        title: "Modern Database Systems",
        author: "Hellerstein & Stonebraker",
        chapters: "Ch. 3 - Storage Engines",
        notes: "Carefully studied tree rebalancing costs."
      }
    },
    {
      step: 2,
      title: "Prototype lock-free concurrency primitives",
      status: "active"
    }
  ],

  // Attached Books & Resources with Chapter-Level Reading Progress
  resources: [
    {
      resourceId: "silverman-number-theory", // References resource from resources.ts OR can be an inline object
      purpose: "prerequisite", // 'prerequisite' | 'background' | 'primary-text' | 'reference' | 'paper' | 'supplementary'
      notes: "Chapters 1-5 provided the theoretical basis for our residue calculations."
    }
  ],

  // Tags for search and classification
  tags: ["c", "linux", "systems", "memory", "cache"],

  // Optional full Markdown write-up
  contentMarkdown: `
## Architecture & Technical Notes

Detailed notes, equations, and mathematical formulations can be written directly in Markdown here.
LaTeX formulas are natively supported: $O(n \\log n)$ and $$\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$$.
`
};
```
