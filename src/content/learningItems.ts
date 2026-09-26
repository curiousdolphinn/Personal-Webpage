import { LearningItem } from '../types';

/**
 * ============================================================================
 * CANONICAL LEARNING ITEMS (Inside Fields)
 * ============================================================================
 * 
 * Learning happens inside organizational Fields rather than a global showcase.
 * Each item represents a topic, book sequence, or conceptual inquiry.
 * 
 * Statuses:
 * - 'planned'
 * - 'active'
 * - 'paused'
 * - 'completed'
 * - 'abandoned'
 */
export const learningItemsData: LearningItem[] = [
  {
    id: "abstract-algebra-artin",
    title: "Abstract Algebra",
    field: "mathematics",
    status: "active",
    subtitle: "Comprehensive modern algebra following Michael Artin's Algebra (1st Edition).",
    description: "In-depth study of abstract algebraic structures: matrix groups, symmetry, group operations, bilinear forms, linear groups, group representations, rings, unique factorization, modules, field extensions, and Galois theory.",
    topics: [
      "Matrix Operations & Permutations",
      "Groups, Cosets & Quotient Groups",
      "Vector Spaces & Bases",
      "Linear Transformations & Eigenvectors",
      "Symmetry of Plane Figures & Rotation Groups",
      "Group Actions, Sylow Theorems & Free Groups",
      "Bilinear & Hermitian Forms",
      "Linear Groups (SU_2, SL_2(R)) & Lie Algebras",
      "Group Representations & Characters",
      "Rings, Ideals & Polynomials",
      "Factorization, UFDs, PIDs & Quadratic Fields",
      "Modules & Abelian Group Structure",
      "Field Extensions & Geometric Constructions",
      "Galois Theory & Solvability"
    ],
    resources: ["artin-algebra-1st-edition", "gross-abstract-algebra-lectures"],
    notes: "Active study: working through Chapter 1 (Matrix Operations) and group theoretic axioms; published study note on Group 1.1 (The Devil of Associativity). Following Harvard Math 122 (36 video lectures) by Prof. Benedict Gross (Lecture 1 completed: https://youtube.com/playlist?list=PLelIK3uylPMGzHBuR3hLMHrYfMqWWsmx5&si=SCkS4_vJQWFnJYJY)."
  },
  {
    id: "linear-algebra-axler",
    title: "Linear Algebra",
    field: "mathematics",
    status: "planned",
    subtitle: "Proof-based linear algebra using Sheldon Axler's Linear Algebra Done Right.",
    description: "Systematic study of finite-dimensional vector spaces, linear maps, invariant subspaces, inner product spaces, and spectral theory.",
    topics: [
       "Vector Spaces & Subspaces",
       "Span & Linear Independence",
       "Linear Transformations",
       "Eigenvalues & Invariant Subspaces",
       "Inner Product Spaces",
       "Spectral Theorem"
    ],
    resources: ["axler-linear-algebra-done-right"],
    notes: "Planning to start studying; 0 hours put in. Establishing vector space foundations before advancing to spectral decompositions."
  }
];

/**
 * Helper to retrieve all learning items for a given field
 */
export function getLearningItemsByField(fieldSlug: string): LearningItem[] {
  return learningItemsData.filter(item => item.field === fieldSlug);
}

/**
 * Helper to retrieve learning item by ID
 */
export function getLearningItemById(id: string): LearningItem | undefined {
  return learningItemsData.find(item => item.id === id);
}
