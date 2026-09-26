import { ResourceItem } from '../types';

/**
 * ============================================================================
 * CANONICAL RESOURCES / BOOKS DATASET
 * ============================================================================
 * 
 * Reusable collection of books, papers, courses, documentation, and problem sets.
 * Resources can be attached to one or multiple Work items, or referenced across fields.
 * 
 * Supports:
 * - Chapter-level tracking (status, optional percentage, notes)
 * - Reading depth (read, skimmed, worked-through, completed-exercises, revisited)
 * - Resource purpose (prerequisite, background, primary-text, reference, paper, supplementary)
 * - Honest qualitative notes on comprehension (no fake masteries or gamification)
 */
export const resourcesData: ResourceItem[] = [
  {
    id: "artin-algebra-1st-edition",
    title: "Algebra (1st Edition)",
    author: "Michael Artin",
    type: "book",
    purpose: "primary-text",
    status: "reading",
    fields: ["mathematics"],
    relatedWork: ["elenchus", "groups-1-1-binary-operations"],
    notes: "Seminal algebra text emphasizing concrete linear algebra, symmetry groups, geometric intuition, and representation theory alongside ring and field theory.",
    chapters: [
      {
        chapterNumber: 1,
        title: "Matrix Operations",
        status: "reading",
        notes: "Basic operations, row reduction, determinants, permutation matrices, Cramer's rule. Includes study note: 'Group 1.1 — The Devil of Associativity'",
        articleSlug: "groups-1-1-binary-operations"
      },
      {
        chapterNumber: 2,
        title: "Groups",
        status: "unread",
        notes: "Definition of a group, subgroups, isomorphisms, homomorphisms, equivalence relations & partitions, cosets, restriction of a homomorphism, products of groups, modular arithmetic, quotient groups."
      },
      {
        chapterNumber: 3,
        title: "Vector Spaces",
        status: "unread",
        notes: "Real vector spaces, abstract fields, bases & dimension, computation with bases, infinite-dimensional spaces, direct sums."
      },
      {
        chapterNumber: 4,
        title: "Linear Transformations",
        status: "unread",
        notes: "The dimension formula, matrix of a linear transformation, linear operators & eigenvectors, characteristic polynomial, orthogonal matrices & rotations, diagonalization, systems of differential equations, matrix exponential."
      },
      {
        chapterNumber: 5,
        title: "Symmetry",
        status: "unread",
        notes: "Symmetry of plane figures, group of motions of the plane, finite & discrete groups of motions, abstract symmetry & group operations, operation on cosets, counting formula, permutation representations, finite subgroups of the rotation group."
      },
      {
        chapterNumber: 6,
        title: "More Group Theory",
        status: "unread",
        notes: "Operations of a group on itself, class equation of icosahedral group, operations on subsets, Sylow theorems, groups of order 12, computation in the symmetric group, free group, generators & relations, Todd–Coxeter algorithm."
      },
      {
        chapterNumber: 7,
        title: "Bilinear Forms",
        status: "unread",
        notes: "Definition of bilinear form, symmetric forms & orthogonality, geometry of a positive form, Hermitian forms, spectral theorem, conics & quadrics, spectral theorem for normal operators, skew-symmetric forms."
      },
      {
        chapterNumber: 8,
        title: "Linear Groups",
        status: "unread",
        notes: "Classical linear groups, special unitary group SU_2, orthogonal representation of SU_2, special linear group SL_2(R), one-parameter subgroups, Lie algebra, translation in a group, simple groups."
      },
      {
        chapterNumber: 9,
        title: "Group Representations",
        status: "unread",
        notes: "Definition of a group representation, G-invariant forms & unitary representations, compact groups, G-invariant subspaces & irreducible representations, characters, regular representation, representations of icosahedral group, Schur's lemma & orthogonality relations, representations of SU_2."
      },
      {
        chapterNumber: 10,
        title: "Rings",
        status: "unread",
        notes: "Definition of a ring, formal construction of integers & polynomials, homomorphisms & ideals, quotient rings & relations, adjunction of elements, integral domains & fraction fields, maximal ideals, algebraic geometry."
      },
      {
        chapterNumber: 11,
        title: "Factorization",
        status: "unread",
        notes: "Factorization of integers & polynomials, UFDs, PIDs, Euclidean domains, Gauss's lemma, explicit factorization, Gaussian integers, algebraic integers, imaginary quadratic fields, ideal factorization, real quadratic fields, Diophantine equations."
      },
      {
        chapterNumber: 12,
        title: "Modules",
        status: "unread",
        notes: "Definition of a module, matrices, free modules & bases, permanence of identities, diagonalization of integer matrices, generators & relations, structure theorem for abelian groups, linear operators, free modules over polynomial rings."
      },
      {
        chapterNumber: 13,
        title: "Fields",
        status: "unread",
        notes: "Examples of fields, algebraic & transcendental elements, degree of field extension, ruler & compass constructions, symbolic adjunction of roots, finite fields, function fields, transcendental extensions, algebraically closed fields."
      },
      {
        chapterNumber: 14,
        title: "Galois Theory",
        status: "unread",
        notes: "Main theorem of Galois theory, cubic equations, symmetric functions, primitive elements, proof of main theorem, quartic equations, Kummer extensions, cyclotomic extensions, quintic equations."
      }
    ]
  },
  {
    id: "gross-abstract-algebra-lectures",
    title: "Abstract Algebra (Harvard Math 122)",
    author: "Prof. Benedict Gross (Harvard University)",
    type: "course",
    purpose: "companion-lecture-series",
    status: "reading",
    url: "https://youtube.com/playlist?list=PLelIK3uylPMGzHBuR3hLMHrYfMqWWsmx5&si=SCkS4_vJQWFnJYJY",
    fields: ["mathematics"],
    notes: "Exhaustive blackboard lecture series covering groups, vector spaces, fields, rings, and Galois theory, taught by Prof. Benedict Gross and following Michael Artin's Algebra.",
    chapters: [
      {
        chapterNumber: 1,
        title: "Lecture 1: Introduction to Groups, Binary Operations & Axioms",
        status: "completed",
        notes: "Watched & completed — covers Definition 1 (binary operations and closure), associativity as order-of-execution invariance, group axioms, and GL_n(R) matrix examples.",
        articleSlug: "groups-1-1-binary-operations"
      },
      {
        chapterNumber: 2,
        title: "Lecture 2: Generalities on Groups, Subgroups & Examples",
        status: "next",
        notes: "Next in sequence: elementary group properties, cancellation laws, subgroups, cyclic groups, and symmetries of regular polygons (dihedral group D_n)."
      },
      {
        chapterNumber: 3,
        title: "Lecture 3: Isomorphisms, Homomorphisms & Kernels",
        status: "unread",
        notes: "Structure-preserving maps between groups, image, kernel, normal subgroups, and introductory quotient constructions."
      },
      {
        chapterNumber: 4,
        title: "Lecture 4: Kernels, Normality, Centers & Inner Automorphisms",
        status: "unread",
        notes: "Conjugation of elements, inner automorphisms, group centers Z(G), and characterization of normal subgroups."
      },
      {
        chapterNumber: 5,
        title: "Lecture 5: Equivalence Relations, Partitions & Cosets",
        status: "unread",
        notes: "Partitions of sets, left and right cosets of a subgroup, and proof of Lagrange's Theorem on subgroup orders."
      },
      {
        chapterNumber: 6,
        title: "Lecture 6: Isometries of the Plane, Cyclic & Dihedral Groups",
        status: "unread",
        notes: "Rigid motions of R², rotations, reflections, glide reflections, and classification of finite subgroups of O(2)."
      },
      {
        chapterNumber: 7,
        title: "Lecture 7: Group Actions on Sets & Conjugation",
        status: "unread",
        notes: "Definition of group actions, orbits, stabilizer subgroups, and groups acting on themselves by left multiplication and conjugation."
      },
      {
        chapterNumber: 8,
        title: "Lecture 8: Quotient Groups & First Isomorphism Theorem",
        status: "unread",
        notes: "Constructing quotient groups G/N, well-definedness of coset multiplication, and the fundamental First Isomorphism Theorem."
      },
      {
        chapterNumber: 9,
        title: "Lecture 9: Vector Spaces, Subspaces & Linear Independence",
        status: "unread",
        notes: "Axiomatic vector spaces over fields, span, linear independence, and subspace intersections and direct sums."
      },
      {
        chapterNumber: 10,
        title: "Lecture 10: Bases, Dimension & Linear Transformations",
        status: "unread",
        notes: "Existence of bases, dimension of vector spaces, and representing linear transformations as matrices."
      },
      {
        chapterNumber: 11,
        title: "Lecture 11: Change of Basis & Matrix Representations",
        status: "unread",
        notes: "Change-of-basis matrices, similarity transformations P⁻¹AP, rank-nullity theorem, and dual spaces."
      },
      {
        chapterNumber: 12,
        title: "Lecture 12: Eigenvalues, Eigenvectors & Characteristic Polynomial",
        status: "unread",
        notes: "Spectral properties of linear operators, roots of det(A - λI), eigenspaces, and diagonalizability criteria."
      },
      {
        chapterNumber: 13,
        title: "Lecture 13: Orthogonal Group O(n) & Midterm Review",
        status: "unread",
        notes: "Inner products, preservation of lengths and angles, orthogonal matrices, and review of group and linear algebra fundamentals."
      },
      {
        chapterNumber: 14,
        title: "Lecture 14: Orthogonal Groups & Geometry of Rotations in R³",
        status: "unread",
        notes: "Structure of SO(3), Euler's rotation theorem, rotation axes, and the topology and geometry of SO(3)."
      },
      {
        chapterNumber: 15,
        title: "Lecture 15: Finite Groups of Motions & Platonic Solids",
        status: "unread",
        notes: "Rotational symmetry groups of the tetrahedron, cube, octahedron, dodecahedron, and icosahedron."
      },
      {
        chapterNumber: 16,
        title: "Lecture 16: Discrete Groups of Motions & Wallpaper Groups",
        status: "unread",
        notes: "Lattices in R², translation subgroups, point groups, and classification of crystallographic planar groups."
      },
      {
        chapterNumber: 17,
        title: "Lecture 17: Discrete Groups of Motions & Abstract Group Actions",
        status: "unread",
        notes: "Discreteness criteria, fundamental domains, and bridging geometric group actions to abstract permutation actions."
      },
      {
        chapterNumber: 18,
        title: "Lecture 18: Group Actions: Orbits, Stabilizers & Counting Formula",
        status: "unread",
        notes: "The Orbit-Stabilizer Theorem |G| = |Orb(x)| · |Stab(x)|, transitive actions, and Burnside's Lemma."
      },
      {
        chapterNumber: 19,
        title: "Lecture 19: The Class Equation & p-Groups",
        status: "unread",
        notes: "Conjugacy classes, the Class Equation of a finite group, non-trivial centers of p-groups, and groups of order p²."
      },
      {
        chapterNumber: 20,
        title: "Lecture 20: Sylow Theorems (Existence & Conjugacy)",
        status: "unread",
        notes: "Formulation and proof of Sylow's First Theorem (existence of Sylow p-subgroups) and Second Theorem (conjugacy of Sylow p-subgroups)."
      },
      {
        chapterNumber: 21,
        title: "Lecture 21: Sylow Theorems (Number of Subgroups) & Applications",
        status: "unread",
        notes: "Sylow's Third Theorem on n_p ≡ 1 (mod p), applications to classifying groups of small orders (pq, 12, 30), and simplicity tests."
      },
      {
        chapterNumber: 22,
        title: "Lecture 22: The Symmetric Group S_n & Conjugacy Classes",
        status: "unread",
        notes: "Cycle decompositions, parity of permutations, conjugacy classes in S_n determined by cycle types, and transposition generators."
      },
      {
        chapterNumber: 23,
        title: "Lecture 23: The Alternating Group A_n, Simplicity of A_5 & Intro to Rings",
        status: "unread",
        notes: "Structure of the alternating group, proof that A_5 is simple (the smallest non-abelian simple group), and introduction to rings."
      },
      {
        chapterNumber: 24,
        title: "Lecture 24: Introduction to Rings, Subrings & Ideals",
        status: "unread",
        notes: "Rings, commutative rings, units, zero divisors, subrings, and left/right/two-sided ideals."
      },
      {
        chapterNumber: 25,
        title: "Lecture 25: Ring Homomorphisms & Quotient Rings",
        status: "unread",
        notes: "Ring homomorphisms, kernels as ideals, quotient rings R/I, and the First Isomorphism Theorem for rings."
      },
      {
        chapterNumber: 26,
        title: "Lecture 26: Commutative Rings & Maximal Ideals",
        status: "unread",
        notes: "Maximal ideals, prime ideals, characterization of R/M as a field and R/P as an integral domain."
      },
      {
        chapterNumber: 27,
        title: "Lecture 27: Examples of Rings: Polynomial & Matrix Rings",
        status: "unread",
        notes: "Polynomial rings R[x], division algorithm for polynomials over fields, evaluation homomorphisms, and non-commutative matrix rings."
      },
      {
        chapterNumber: 28,
        title: "Lecture 28: Rings Review & Ring Extensions",
        status: "unread",
        notes: "Adjoining elements to rings R[α] ≅ R[x]/(f(x)), algebraic elements, and minimal polynomials."
      },
      {
        chapterNumber: 29,
        title: "Lecture 29: Integral Domains & Fields of Fractions",
        status: "unread",
        notes: "Cancellation in domains, construction of the field of fractions Frac(R) from an integral domain, and localization."
      },
      {
        chapterNumber: 30,
        title: "Lecture 30: Factorization in Integral Domains & Euclidean Algorithm",
        status: "unread",
        notes: "Divisibility, associates, irreducible vs prime elements, Euclidean domains, and the Euclidean algorithm in Z and F[x]."
      },
      {
        chapterNumber: 31,
        title: "Lecture 31: Principal Ideal Domains (PIDs) & Gauss's Lemma",
        status: "unread",
        notes: "Every Euclidean domain is a PID, Bezout's identity, primitive polynomials, and Gauss's Lemma on polynomial factorization."
      },
      {
        chapterNumber: 32,
        title: "Lecture 32: Unique Factorization Domains (UFDs) & Gaussian Integers",
        status: "unread",
        notes: "PIDs are UFDs, factorization of Z[i] (Gaussian integers), norm function N(a+bi) = a² + b², and sums of two squares."
      },
      {
        chapterNumber: 33,
        title: "Lecture 33: Polynomial Rings over UFDs & Eisenstein's Criterion",
        status: "unread",
        notes: "R is a UFD implies R[x] is a UFD, irreducibility criteria, reduction modulo p, and Eisenstein's criterion for polynomials."
      },
      {
        chapterNumber: 34,
        title: "Lecture 34: Algebraic Numbers & Algebraic Integers",
        status: "unread",
        notes: "Field extensions Q ⊂ K, algebraic numbers, minimal polynomials, ring of algebraic integers O_K, and traces and norms."
      },
      {
        chapterNumber: 35,
        title: "Lecture 35: Rings of Integers in Quadratic Fields & Ideals",
        status: "unread",
        notes: "Structure of O_{Q(√d)}, discriminant, failure of unique factorization of elements (e.g. in Z[√-5]), and factorization into ideals."
      },
      {
        chapterNumber: 36,
        title: "Lecture 36: Dedekind Domains, Ideal Class Groups & Course Review",
        status: "unread",
        notes: "Unique factorization of ideals into prime ideals in Dedekind domains, ideal class groups, finiteness of class numbers, and course synthesis."
      }
    ]
  },
  {
    id: "axler-linear-algebra-done-right",
    title: "Linear Algebra Done Right (4th Edition)",
    author: "Sheldon Axler",
    type: "book",
    purpose: "primary-text",
    status: "unread",
    fields: ["mathematics"],
    notes: "Primary textbook for proof-based linear algebra: vector spaces, linear maps, eigenvalues, inner product spaces, and spectral theory without determinants.",
    chapters: [
      {
        chapterNumber: 1,
        title: "Vector Spaces",
        status: "unread",
        notes: "Vector spaces, subspaces, direct sums."
      },
      {
        chapterNumber: 2,
        title: "Finite-Dimensional Vector Spaces",
        status: "unread",
        notes: "Span, linear independence, bases, dimension."
      },
      {
        chapterNumber: 3,
        title: "Linear Maps",
        status: "unread",
        notes: "Null spaces, ranges, matrix representations, invertibility."
      },
      {
        chapterNumber: 4,
        title: "Polynomials",
        status: "unread",
        notes: "Zeros of polynomials and factorizations."
      },
      {
        chapterNumber: 5,
        title: "Eigenvalues, Eigenvectors, and Invariant Subspaces",
        status: "unread",
        notes: "Invariant subspaces, existence of eigenvalues, upper-triangular matrices."
      },
      {
        chapterNumber: 6,
        title: "Inner Product Spaces",
        status: "unread",
        notes: "Inner products, norms, orthonormal bases, Gram-Schmidt, orthogonal projections."
      },
      {
        chapterNumber: 7,
        title: "Operators on Inner Product Spaces",
        status: "unread",
        notes: "Self-adjoint & normal operators, Spectral Theorem, positive operators, isometries."
      },
      {
        chapterNumber: 8,
        title: "Operators on Complex Vector Spaces",
        status: "unread",
        notes: "Generalized eigenvectors, characteristic & minimal polynomials, Jordan form."
      },
      {
        chapterNumber: 9,
        title: "Multilinear Algebra and Determinants",
        status: "unread",
        notes: "Bilinear forms, alternating forms, tensor products, determinants."
      }
    ]
  },
  {
    id: "faithful-autoformalization-2026",
    title: "Faithful Autoformalization via Roundtrip Verification and Repair",
    author: "arXiv:2604.25031 (2026)",
    type: "paper",
    purpose: "paper",
    status: "completed",
    url: "https://arxiv.org/abs/2604.25031",
    fields: ["cs-ai", "mathematics"],
    relatedWork: ["elenchus"],
    notes: "Formalizes a claim, translates it back to plain language, re-formalizes, and checks the two formalizations agree — basically an automated version of the checkpoint idea. It raises faithful equivalence from 45–61% up to 83–85% with repair, but leaves a 15–17% residual failure rate."
  },
  {
    id: "learning-to-disprove-2026",
    title: "Learning to Disprove: Formal Counterexample Generation with LLMs",
    author: "arXiv:2606.31002 (2026)",
    type: "paper",
    purpose: "paper",
    status: "completed",
    url: "https://arxiv.org/abs/2606.31002",
    fields: ["cs-ai", "mathematics"],
    relatedWork: ["elenchus"],
    notes: "Trains LLMs specifically to generate Lean-verified counterexamples/disproofs, treating refutation (¬P) explicitly as a distinct, harder, and underexplored skill from proof construction."
  },
  {
    id: "leantutor-aaai-2026",
    title: "LeanTutor: An AI-Powered Tutoring System for Formal Proofs",
    author: "Patel et al. (UC Berkeley, AAAI 2026, arXiv:2506.08321)",
    type: "paper",
    purpose: "paper",
    status: "completed",
    url: "https://arxiv.org/abs/2506.08321",
    fields: ["cs-ai", "mathematics"],
    relatedWork: ["elenchus"],
    notes: "Closest existing end-to-end tutoring system: autoformalizer + proof-checker + natural-language feedback generator for student proofs in Peano Arithmetic. Achieves 57% tactic formalization and only 30% accuracy identifying which step is wrong."
  }
];

/**
 * Helper to retrieve a resource by its unique ID
 */
export function getResourceById(id: string): ResourceItem | undefined {
  return resourcesData.find(r => r.id === id);
}

/**
 * Helper to retrieve all resources associated with a specific field
 */
export function getResourcesByField(fieldSlug: string): ResourceItem[] {
  return resourcesData.filter(r => r.fields?.includes(fieldSlug));
}

/**
 * Helper to retrieve all resources linked to a specific work item
 */
export function getResourcesByWork(workSlugOrId: string): ResourceItem[] {
  return resourcesData.filter(r => r.relatedWork?.includes(workSlugOrId));
}
