# Books & Resources Template

Copy this template into `src/content/resources.ts` to add a book, paper, course, or problem set with chapter-level tracking.

```typescript
import { ResourceItem } from '../types';

export const exampleResource: ResourceItem = {
  id: "silverman-number-theory",
  title: "A Friendly Introduction to Number Theory",
  author: "Joseph H. Silverman",
  type: "book", // 'book' | 'paper' | 'course' | 'documentation' | 'problem-set'
  status: "reading", // 'reading' | 'completed' | 'paused' | 'planned' | 'abandoned' | 'revisited'
  readingDepth: "worked-through", // 'read' | 'skimmed' | 'worked-through' | 'completed-exercises' | 'revisited'
  purpose: "primary-text", // 'prerequisite' | 'background' | 'primary-text' | 'reference' | 'paper' | 'supplementary'
  fields: ["pure-mathematics", "cryptography-security"],
  relatedWork: ["rsa-implementation-project"],
  notes: "Focusing on quadratic reciprocity, Diophantine equations, and elliptic curves over finite fields.",
  
  // Chapter-by-Chapter Tracking
  chapters: [
    {
      chapterNumber: 1,
      title: "What is Number Theory?",
      status: "completed",
      percentage: 100,
      readingDepth: "completed-exercises",
      notes: "Solved all initial Pythagorean triple exercises."
    },
    {
      chapterNumber: 2,
      title: "Pythagorean Triples and the Circle",
      status: "completed",
      percentage: 100,
      readingDepth: "worked-through",
      notes: "Geometric derivation of primitive solutions using slope parameterization."
    },
    {
      chapterNumber: 3,
      title: "Divisibility and the Greatest Common Divisor",
      status: "reading",
      percentage: 60,
      readingDepth: "worked-through",
      notes: "Implementing the Extended Euclidean algorithm in C."
    },
    {
      chapterNumber: 4,
      title: "Linear Diophantine Equations",
      status: "unread"
    }
  ]
};
```
