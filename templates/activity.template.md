# Activity / Time Record Template

Copy this template into `src/content/activities.ts` to log an intellectual work session.

```typescript
import { ActivityRecord } from '../types';

export const exampleActivity: ActivityRecord = {
  id: "act-2026-08-30-01",
  date: "2026-08-30",
  minutes: 120, // Duration in minutes
  category: "coursework", // 'coursework' | 'project' | 'paper-reading' | 'writing' | 'problem-solving'
  field: "systems-software", // Target field slug
  workSlug: "custom-memory-allocator", // (Optional) Target work item slug
  description: "Implemented slab allocator page cache and profiled fragmentation with Valgrind.",
  mode: "active-coding", // 'deep-work' | 'active-coding' | 'math-derivation' | 'literature-review' | 'lecture'
  notes: "Eliminated cache thrashing by aligning cache lines to 64 bytes."
};
```
