import { ActivityRecord } from '../types';

/**
 * ============================================================================
 * CANONICAL ACTIVITY DATASET (Productive Calendar / Focus Ledger)
 * ============================================================================
 * 
 * Each record represents a focused session.
 * 
 * Duration is computed automatically from startTime and endTime (e.g. "14:00" to "15:30")
 * or can be set via durationMinutes for historical entries where exact timestamps are omitted.
 * 
 * Multi-Field Allocation Rule:
 * When an activity belongs to multiple fields, its duration is distributed equally
 * across those fields for field-specific statistics, avoiding double counting in
 * aggregate totals.
 */
export const activitiesData: ActivityRecord[] = [
  // ── Mathematics & Abstract Algebra (15 hours / 900 minutes) ──────────────
  {
    id: "act-math-01",
    date: "2026-09-06",
    startTime: "10:00",
    endTime: "12:00",
    durationMinutes: 120,
    type: "coursework",
    fields: ["mathematics"],
    workId: "groups-1-1-binary-operations",
    notes: "Watched and transcribed Harvard Math 122 Lecture 1 (Prof. Benedict Gross): Group axioms, linear algebra review, and GL_n(R) matrix groups.",
    visibility: "public"
  },
  {
    id: "act-math-02",
    date: "2026-09-08",
    startTime: "14:00",
    endTime: "16:30",
    durationMinutes: 150,
    type: "reading",
    fields: ["mathematics"],
    workId: "groups-1-1-binary-operations",
    notes: "Detailed study of Michael Artin's Algebra (1st Ed), Chapter 1 (Group 1.1): Rigorous definition of binary operations, closure, and domain constraints.",
    visibility: "public"
  },
  {
    id: "act-math-03",
    date: "2026-09-10",
    startTime: "09:30",
    endTime: "11:30",
    durationMinutes: 120,
    type: "writing",
    fields: ["mathematics"],
    workId: "groups-1-1-binary-operations",
    notes: "Authored expositional study note on Group 1.1: 'The Devil of Associativity' — dissecting whether closure is an independent axiom and framing associativity as execution order invariance.",
    visibility: "public"
  },
  {
    id: "act-math-04",
    date: "2026-09-13",
    startTime: "15:00",
    endTime: "17:30",
    durationMinutes: 150,
    type: "problem-solving",
    fields: ["mathematics"],
    workId: "groups-1-1-binary-operations",
    notes: "Worked counterexamples on non-associative operations (integer subtraction) and verified associativity for matrix multiplication in GL_2(R).",
    visibility: "public"
  },
  {
    id: "act-math-05",
    date: "2026-09-16",
    startTime: "11:00",
    endTime: "13:00",
    durationMinutes: 120,
    type: "coursework",
    fields: ["mathematics"],
    notes: "Harvard Math 122 Lecture 2 prep & Artin Chapter 2.2: Symmetries of regular polygons, cycle notation, and generators for the dihedral group D_n.",
    visibility: "public"
  },
  {
    id: "act-math-06",
    date: "2026-09-18",
    startTime: "16:00",
    endTime: "18:00",
    durationMinutes: 120,
    type: "problem-solving",
    fields: ["mathematics"],
    notes: "Artin Chapter 2 problem set: Subgroup criteria, cancellation laws, and cyclic subgroup orders.",
    visibility: "public"
  },
  {
    id: "act-math-07",
    date: "2026-09-21",
    startTime: "14:00",
    endTime: "16:00",
    durationMinutes: 120,
    type: "proof",
    fields: ["mathematics"],
    notes: "Equivalence relations, left and right coset partitions, and proof construction of Lagrange's Theorem for finite groups.",
    visibility: "public"
  },

  // ── Computer Science & Systems Architecture (35 hours / 2,100 minutes) ──
  {
    id: "act-cs-01",
    date: "2026-09-05",
    startTime: "09:00",
    endTime: "12:00",
    durationMinutes: 180,
    type: "coursework",
    fields: ["cs-ai"],
    notes: "BITS CS Computing Systems (BCS ZC228): Processor datapath architecture, register transfer language, and instruction execution cycles.",
    visibility: "public"
  },
  {
    id: "act-cs-02",
    date: "2026-09-07",
    startTime: "13:30",
    endTime: "16:00",
    durationMinutes: 150,
    type: "coursework",
    fields: ["cs-ai", "mathematics"],
    notes: "BITS CS Discrete Mathematics (BCS ZC219): Predicate calculus, equivalence relations, partial orders, and structural induction for CS.",
    visibility: "public"
  },
  {
    id: "act-cs-03",
    date: "2026-09-09",
    startTime: "10:00",
    endTime: "13:00",
    durationMinutes: 180,
    type: "research",
    fields: ["cs-ai", "mathematics"],
    workId: "elenchus",
    notes: "Elenchus (Step 0): Comprehensive literature review on autoformalization fidelity (arXiv:2604.25031, arXiv:2606.31002, arXiv:2506.08321) and mapping gaps in state-of-the-art formal reasoning.",
    visibility: "public"
  },
  {
    id: "act-cs-04",
    date: "2026-09-11",
    startTime: "14:00",
    endTime: "16:30",
    durationMinutes: 150,
    type: "coding",
    fields: ["cs-ai"],
    notes: "Low-level C programming (BCS ZC313): Pointer arithmetic, dynamic memory allocators, cache alignment, and Valgrind memory leak profiling.",
    visibility: "public"
  },
  {
    id: "act-cs-05",
    date: "2026-09-12",
    startTime: "09:00",
    endTime: "12:00",
    durationMinutes: 180,
    type: "project",
    fields: ["cs-ai", "mathematics"],
    workId: "elenchus",
    notes: "Elenchus Architecture: Formulating Socratic elenchus methodology & Terence Tao sub-system hypothesis permutation approach for structural error diagnosis.",
    visibility: "public"
  },
  {
    id: "act-cs-06",
    date: "2026-09-14",
    startTime: "15:00",
    endTime: "17:30",
    durationMinutes: 150,
    type: "experiment",
    fields: ["cs-ai", "mathematics"],
    workId: "elenchus",
    notes: "Elenchus (Step 1-3): Designing natural-language intuition capture pipeline and the roundtrip confirmation checkpoint to mitigate translation drift.",
    visibility: "public"
  },
  {
    id: "act-cs-07",
    date: "2026-09-15",
    startTime: "10:00",
    endTime: "13:00",
    durationMinutes: 180,
    type: "coursework",
    fields: ["cs-ai"],
    notes: "Operating Systems: Virtual memory subsystems, 4-level page table translation, TLB invalidation, and page fault handling mechanisms.",
    visibility: "public"
  },
  {
    id: "act-cs-08",
    date: "2026-09-17",
    startTime: "14:00",
    endTime: "16:30",
    durationMinutes: 150,
    type: "research",
    fields: ["cs-ai", "mathematics"],
    workId: "elenchus",
    notes: "Elenchus Architecture: Specification for autoformalization pipeline translating informal math claims into verified Lean 4 theorems.",
    visibility: "public"
  },
  {
    id: "act-cs-09",
    date: "2026-09-19",
    startTime: "09:30",
    endTime: "12:30",
    durationMinutes: 180,
    type: "coursework",
    fields: ["cs-ai"],
    notes: "Computer Organization & Architecture: Pipelining hazards (data, structural, control), forwarding paths, and 2-bit branch prediction modeling.",
    visibility: "public"
  },
  {
    id: "act-cs-10",
    date: "2026-09-20",
    startTime: "15:00",
    endTime: "17:30",
    durationMinutes: 150,
    type: "coding",
    fields: ["cs-ai"],
    notes: "POSIX concurrency in C: Multi-threaded worker pools, condition variables, reader-writer locks, and race condition debugging with ThreadSanitizer.",
    visibility: "public"
  },
  {
    id: "act-cs-11",
    date: "2026-09-22",
    startTime: "10:00",
    endTime: "13:00",
    durationMinutes: 180,
    type: "experiment",
    fields: ["cs-ai"],
    workId: "kernel-tuning",
    notes: "Kernel Tuning (Phase 0): Baseline state audit on remote Fedora server (lsmod, lspci -k) and configuring QEMU VM sandbox for safe boot testing.",
    visibility: "public"
  },
  {
    id: "act-cs-12",
    date: "2026-09-23",
    startTime: "14:00",
    endTime: "16:30",
    durationMinutes: 150,
    type: "research",
    fields: ["cs-ai", "mathematics"],
    workId: "elenchus",
    notes: "Elenchus: Lean 4 Mathlib algebraic hierarchy alignment. Testing automated tactic search with aesop and decide counterexample generation.",
    visibility: "public"
  },
  {
    id: "act-cs-13",
    date: "2026-09-24",
    startTime: "09:00",
    endTime: "11:00",
    durationMinutes: 120,
    type: "experiment",
    fields: ["cs-ai"],
    workId: "kernel-tuning",
    notes: "Kernel Tuning (Phase 1 → 2): Analyzing baseline-modules.txt and system state alongside terminal-dashboard monitor on Fedora server.",
    visibility: "public"
  },
  {
    id: "act-cs-14",
    date: "2026-09-24",
    startTime: "13:00",
    endTime: "16:00",
    durationMinutes: 180,
    type: "coursework",
    fields: ["cs-ai"],
    notes: "Computing Systems (BCS ZC228): System bus architectures, direct memory access (DMA) controllers, and interrupt-driven hardware servicing.",
    visibility: "public"
  }
];
