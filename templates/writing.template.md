# Writing & Essay Template

Copy this template into `src/content/work.ts` (with `type: 'writing'`) to publish an essay, theoretical note, or technical write-up.

```typescript
import { WorkItem } from '../types';

export const exampleEssay: WorkItem = {
  id: "spectral-graph-theory-notes",
  slug: "spectral-graph-theory-notes",
  title: "On the Laplacian Spectrum and Graph Partitioning",
  type: "writing",
  status: "completed",
  visibility: "public", // 'public' | 'private' | 'unlisted'
  date: "Aug 2026",
  readingTime: "8 min read",
  summary: "An exposition of Cheeger's inequality, graph Laplacians, and how eigenvalues bound graph conductance.",
  fields: ["algorithms-complexity", "pure-mathematics"],
  tags: ["graph-theory", "linear-algebra", "spectral-theory"],
  
  contentMarkdown: `
## Introduction

Let $G = (V, E)$ be an undirected, $d$-regular graph on $n$ vertices. The normalized Laplacian matrix is defined as:

$$L = I - \\frac{1}{d} A$$

where $A$ is the adjacency matrix.

### Cheeger's Inequality

The fundamental connection between the second smallest eigenvalue $\\lambda_2$ and the graph conductance $\\Phi(G)$ is given by Cheeger's inequality:

$$\\frac{\\lambda_2}{2} \\le \\Phi(G) \\le \\sqrt{2\\lambda_2}$$

This provides an algorithmic guarantee for spectral partitioning methods.
`
};
```
