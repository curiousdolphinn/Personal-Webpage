# Field Definition Template

Copy this template into `src/content/fields.ts` to define an academic or research field hub.

```typescript
import { FieldDefinition } from '../types';

export const exampleField: FieldDefinition = {
  id: "systems-software",
  slug: "systems-software",
  title: "Systems & Architecture",
  shortTitle: "Systems",
  tagline: "Operating systems, low-level primitives, and memory hierarchies.",
  description: "Exploring the boundary between hardware and software: kernels, file systems, compilers, and high-performance network primitives.",
  whyExploring: "Understanding low-level hardware constraints provides the foundational mental model for building high-throughput, predictable software systems.",
  questions: [
    "How can lock-free concurrency and modern CPU cache architectures eliminate memory synchronization bottlenecks?"
  ],
  relatedFieldIds: ["algorithms-complexity"],
  currentStudy: [
    {
      title: "Linux Kernel Memory Management",
      subtitle: "Page tables, slab allocators, and demand paging mechanisms.",
      status: "ongoing",
      topics: ["Kernel Primitives", "Virtual Memory", "POSIX API"]
    }
  ]
};
```
