import { FieldDefinition } from '../types';

/**
 * ============================================================================
 * ORGANIZATIONAL FIELD CATEGORIES
 * ============================================================================
 * 
 * Fields are organizational environments where work, questions, and studies live.
 * They represent research topics and categories, not personal claims or credentials.
 * The system supports adding unlimited future fields without code modification.
 */
export const fieldsData: FieldDefinition[] = [
  {
    id: "mathematics",
    slug: "mathematics",
    title: "Pure Mathematics",
    shortTitle: "Mathematics",
    tagline: "", // Left empty so you can add a quote whenever you come across one you like
    description: "Foundational mathematics: linear algebra, abstract algebraic structures, topology, analysis, and discrete mathematics.",
    whyExploring: "Computing is applied mathematical structure. Understanding vector spaces, groups, rings, and metric topologies illuminates why computational architectures behave as they do.",
    questions: [],
    currentStudy: [],
    relatedFieldIds: ["cryptography", "cs-ai"]
  },
  {
    id: "biology",
    slug: "biology",
    title: "Biology / Computational Biology",
    shortTitle: "Biology",
    tagline: "Understanding biological systems through computation, algorithms, and quantitative models.",
    description: "Molecular genetics, sequence alignment algorithms, evolutionary dynamics, and biological information processing.",
    whyExploring: "Living systems represent distributed biological computation. DNA, RNA, and protein folding provide profound perspectives on error-correction, storage density, and molecular self-assembly.",
    questions: [],
    currentStudy: [],
    relatedFieldIds: ["cs-ai", "mathematics"]
  },
  {
    id: "cryptography",
    slug: "cryptography",
    title: "Cryptography / Formal Methods",
    shortTitle: "Cryptography",
    tagline: "Mathematical security, zero-knowledge proofs, post-quantum primitives, and formal verification.",
    description: "Cryptographic primitives, asymmetric protocols, zero-knowledge verification, and formal correctness.",
    whyExploring: "Cryptography guarantees security through computational hardness and algebraic invariants rather than trust.",
    questions: [],
    currentStudy: [],
    relatedFieldIds: ["mathematics", "cs-ai"]
  },
  {
    id: "cs-ai",
    slug: "cs-ai",
    title: "Computer Science / AI",
    shortTitle: "CS / AI",
    tagline: "Systems programming, algorithms, machine learning theory, and computing architecture.",
    description: "Systems programming, memory hierarchies, operating system internals, compiler construction, and machine learning mechanisms.",
    whyExploring: "Understanding software from bare metal instructions up through high-level abstractions enables building reliable, high-performance systems.",
    questions: [],
    currentStudy: [],
    relatedFieldIds: ["mathematics", "biology", "cryptography"]
  }
];
