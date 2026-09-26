import { WorkItem } from '../types';

/**
 * ============================================================================
 * CANONICAL WORK DATASET
 * ============================================================================
 * 
 * Unified collection of all research, projects, coursework, proofs, experiments,
 * writing, and reading notes.
 * 
 * Supported types:
 * - 'project'
 * - 'coursework'
 * - 'proof'
 * - 'reading'
 * - 'experiment'
 * - 'research'
 * - 'implementation'
 * - 'paper-reproduction'
 * - 'problem-set'
 * - 'writing'
 * - 'other'
 * 
 * Visibility:
 * - 'public': Visible on all public pages and feeds
 * - 'unlisted': Accessible only via direct slug URL
 * - 'private': Hidden from all public interfaces
 */
export const workData: WorkItem[] = [
  {
    id: "kernel-tuning",
    slug: "kernel-tuning",
    title: "Kernel Tuning",
    type: "project",
    fields: ["cs-ai"],
    status: "active",
    date: "2026",
    summary: "Designing a minimal-footprint custom Linux kernel and dissecting DKMS out-of-tree module rebuild mechanics on a remote Fedora server, undertaken as a mentor-guided assessment on hard computational problem-solving.",
    description: "A hands-on systems architecture and kernel engineering project conducted on a remote Fedora physical server. Inspired by an in-depth conversation with my mentor about hard computational problems in computer science and assessing my appetite for deep systems problem-solving. Covers end-to-end Kconfig dissection, driver and subsystem reduction, minimal initramfs generation, and out-of-tree DKMS module compilation hooks.",
    tags: ["linux", "kernel", "systems", "fedora", "kconfig", "dkms", "qemu", "c", "systems-architecture", "performance"],
    technologies: ["Linux Kernel", "Fedora Server", "Kconfig / Kbuild", "DKMS", "QEMU / KVM", "Dracut", "C", "Bash", "bloat-o-meter"],
    visibility: "public",
    motivation: "During a discussion with my mentor about hard computational problems in computer science, he challenged me with this assessment task: design a minimal-footprint kernel and understand DKMS on a Fedora server. The objective is to test and demonstrate reasoning speed, depth of comprehension, and genuine appetite for low-level systems engineering rather than superficial configuration.",
    problem: "Stock distribution kernels (such as Fedora's) are built as general-purpose catch-alls, bundling drivers for thousands of devices, deep debug facilities, and redundant filesystems, resulting in massive footprints (100MB+ initramfs, bloated vmlinux, prolonged boot times). Designing a minimal bespoke kernel requires understanding the exact boot pipeline, Kconfig dependency resolution, identifying what hardware is strictly necessary, and dissecting how out-of-tree kernel modules (via DKMS) interact with hand-built kernels across version bumps.",
    approach: "A disciplined 6-phase research plan executed on a remote Fedora physical server (running alongside the terminal dashboard monitor): establishing baseline state snapshots, setting up a QEMU VM sandbox to avoid bricking host boot entries, auditing driver trees via make localmodconfig and manual Kconfig inspection, building minimal initramfs images, and diagnosing why DKMS automatic post-install hooks do not fire for hand-compiled kernels.",
    whatINeededToKnow: [
      "Linux Boot Pipeline (UEFI / GRUB → vmlinuz decompression → initramfs / switch_root → systemd)",
      "Kconfig Dependency Resolution & Kbuild Language (Documentation/kbuild/kconfig-language.rst)",
      "Hardware Topology & Driver Mapping (lspci -k, lsusb, lsmod baseline tracking)",
      "initramfs Anatomy (CPIO archive structure, dracut vs custom busybox rootfs)",
      "Dynamic Kernel Module Support (DKMS) Architecture (dkms.conf, out-of-tree LKMs, autoinstall mechanics)",
      "QEMU Sandboxing for Safe Kernel Boot Prototyping"
    ],
    pipelineStages: [
      {
        id: "kt-phase-0",
        step: 0,
        title: "Setup & Baseline Snapshot",
        subtitle: "Environment & Sandbox",
        status: "current",
        summary: "Snapshot hardware state, install toolchain dependencies, and provision a QEMU VM sandbox for safe test-booting.",
        description: "Capture uname -r, lsmod > baseline-modules.txt, lspci -k, lsusb, and df -h /boot before touching any configuration. Never test-boot an unverified custom kernel on the physical Fedora host.",
        critical: true,
        failureModeOrMitigation: "Testing an unverified kernel directly on the physical host can result in an unbootable server. Mitigation: Always verify in QEMU VM first.",
        details: [
          "Capture baseline module inventory and hardware PCI/USB IDs",
          "Install toolchain: gcc, make, flex, bison, openssl-devel, elfutils-libelf-devel, dwarves, bc",
          "Acquire Fedora kernel source / mainline clone",
          "Provision QEMU VM sandbox for boot testing"
        ]
      },
      {
        id: "kt-phase-1",
        step: 1,
        title: "Understand Before Shrinking",
        subtitle: "Stock Build & Mental Model",
        status: "next",
        summary: "Compile full stock build in VM to verify baseline, study Kconfig language rules, and maintain an active reasoning log.",
        description: "Run make defconfig && make -j$(nproc) and verify boot in QEMU. Read Documentation/kbuild/kconfig-language.rst and maintain a running log of 'what I thought X did vs what it actually does'.",
        critical: false,
        details: [
          "Do one full stock build and confirm clean boot in VM sandbox",
          "Read Documentation/kbuild/kconfig-language.rst in kernel tree",
          "Study kernelnewbies.org internal primers",
          "Maintain running reasoning log showing progression of understanding"
        ]
      },
      {
        id: "kt-phase-2",
        step: 2,
        title: "Shrink Deliberately",
        subtitle: "Driver & Subsystem Pruning",
        status: "planned",
        summary: "Record baseline sizes, prune unused hardware drivers with localmodconfig and manual tree audits, and track binary diffs with bloat-o-meter.",
        description: "Measure vmlinux, module count, and initramfs size. Run make localmodconfig, audit Device Drivers against lspci -k/lsusb, strip unused filesystems, network protocols, tracing, and crypto. Benchmark against make tinyconfig.",
        critical: true,
        failureModeOrMitigation: "Over-pruning critical storage, controller, or filesystem drivers causes kernel panic at mount time. Mitigation: Track diffs incrementally with bloat-o-meter.",
        details: [
          "Record baseline vmlinux, module count, and initramfs size",
          "First pass via make localmodconfig",
          "Manual walk of Device Drivers, unused filesystems, network protocols, and tracing",
          "Evaluate make tinyconfig branch breakage vs localmodconfig",
          "Measure binary deltas with scripts/bloat-o-meter"
        ]
      },
      {
        id: "kt-phase-3",
        step: 3,
        title: "Minimal initramfs",
        subtitle: "Rootfs Payload Isolation",
        status: "planned",
        summary: "Inspect initramfs CPIO archive, isolate the exact drivers needed to reach the real root filesystem, and rebuild a minimal image.",
        description: "Inspect contents via lsinitrd or cpio unpack. Distinguish what is actually required for mounting root vs distro boilerplate. Rebuild with dracut --no-hostonly or custom busybox payload.",
        critical: false,
        details: [
          "Inspect current initramfs contents using lsinitrd or cpio unpack",
          "Identify mandatory root filesystem dependencies vs default bundles",
          "Rebuild minimal initramfs (dracut vs custom busybox) and verify boot"
        ]
      },
      {
        id: "kt-phase-4",
        step: 4,
        title: "DKMS, Closing the Loop",
        subtitle: "Out-of-Tree LKM Lifecycle",
        status: "planned",
        summary: "Register an out-of-tree kernel module, test version bumps, and diagnose why automatic postinst hooks behave differently on hand-built kernels.",
        description: "Read Arch Wiki DKMS guide, inspect dkms status, write a minimal out-of-tree hello-world LKM, register via dkms add/build/install, bump kernel local version string, and diagnose why manual dkms autoinstall is needed on non-distro kernels.",
        critical: true,
        failureModeOrMitigation: "Assuming distro package manager hooks will rebuild modules for a manual make install. Mitigation: Explicitly trace dkms autoinstall trigger points.",
        details: [
          "Study DKMS architecture and inspect existing dkms.conf configurations",
          "Write and register a minimal out-of-tree hello-world LKM",
          "Bump custom kernel local version string and test rebuild survival",
          "Diagnose why automatic postinst hook doesn't apply to hand-built kernels"
        ]
      },
      {
        id: "kt-phase-5",
        step: 5,
        title: "Writeup for the Mentor",
        subtitle: "Evaluation & Capstone Demo",
        status: "planned",
        summary: "Compile comprehensive technical report, before/after size reductions, reasoning reflections, and share with mentor.",
        description: "Author concise README with measured numbers, rationale behind cuts, and the DKMS capstone demo. Synthesize reflection on whether systems/kernel engineering represents authentic curiosity.",
        critical: false,
        details: [
          "Author technical report with before/after size metrics and reasoning per phase",
          "Include DKMS out-of-tree module survival demo as capstone result",
          "Deliver findings to mentor and record evaluation feedback"
        ]
      }
    ],
    milestones: [
      {
        id: "m-kt-01",
        title: "Snapshot system baseline state (uname -r, lsmod, lspci -k, lsusb, df -h /boot)",
        status: "completed",
        date: "2026-09-20"
      },
      {
        id: "m-kt-02",
        title: "Install build dependencies on remote Fedora server (gcc, make, flex, bison, dwarves, etc.)",
        status: "completed",
        date: "2026-09-21"
      },
      {
        id: "m-kt-03",
        title: "Set up QEMU VM boot-testing sandbox to prevent host bootloader corruption",
        status: "current",
        date: "2026-09-24"
      },
      {
        id: "m-kt-04",
        title: "Perform full stock build (make defconfig && make -j$(nproc)) and boot-test in VM",
        status: "next"
      },
      {
        id: "m-kt-05",
        title: "Study Kconfig language grammar (Documentation/kbuild/kconfig-language.rst)",
        status: "planned"
      },
      {
        id: "m-kt-06",
        title: "Record baseline vmlinux, module count, and initramfs size metrics",
        status: "planned"
      },
      {
        id: "m-kt-07",
        title: "First-pass pruning via make localmodconfig and verify boot",
        status: "planned"
      },
      {
        id: "m-kt-08",
        title: "Manual Device Driver tree purge against lspci -k and lsusb inventory",
        status: "planned"
      },
      {
        id: "m-kt-09",
        title: "Benchmark binary deltas with scripts/bloat-o-meter and test make tinyconfig",
        status: "planned"
      },
      {
        id: "m-kt-10",
        title: "Inspect stock initramfs with lsinitrd and rebuild minimal image with dracut/busybox",
        status: "planned"
      },
      {
        id: "m-kt-11",
        title: "Write minimal out-of-tree LKM, register with DKMS, and test kernel version bump",
        status: "planned"
      },
      {
        id: "m-kt-12",
        title: "Complete mentor evaluation writeup & publish multi-part technical blog series",
        status: "planned"
      }
    ],
    contentMarkdown: `# Kernel Tuning Project — Handoff & Research Plan

> **Origin & Motivation:**  
> Born out of an in-depth conversation with my mentor about hard computational problems in computer science. While discussing the landscape of difficult engineering domains, his advice for me to get started was to take on this project to test and assess whether I have the appetite to understand and solve deep, complex systems problems.
> 
> **Context:** Assessment task set by mentor — design a minimal-footprint kernel and understand DKMS on a Fedora server. The goal is to demonstrate reasoning speed and depth, not just a working build. This also doubles as an upcoming blog series for the personal website.  
> **Environment:** Remote Fedora server (physical machine, running the terminal-dashboard monitor project alongside this).

---

## Phase 0 — Setup (Before Touching Config)
- [x] **Snapshot current system state:** \`uname -r\`, \`lsmod > baseline-modules.txt\`, \`lspci -k\`, \`lsusb\`, \`df -h /boot\`
- [x] **Install build dependencies:** \`sudo dnf install gcc make flex bison openssl-devel elfutils-libelf-devel ncurses-devel dwarves bc perl\`
- [ ] **Get kernel source:** either \`dnf download --source kernel\` (Fedora's config as a sane baseline) or clone mainline from kernel.org for a cleaner slate
- [ ] **Set up a QEMU VM as a safe boot-testing sandbox** before touching the real server's boot entries — never test-boot an unverified custom kernel as your only option on a server you rely on
- [ ] **Blog post #1 idea:** "Why I'm doing this" — the mentor conversation, the assessment framing, starting mental model

## Phase 1 — Understand Before Shrinking
- [ ] **Do one full stock build:** \`make defconfig && make -j$(nproc)\`, boot it in the VM, confirm it works before changing anything
- [ ] **Read:** \`Documentation/kbuild/kconfig-language.rst\` (in the kernel source tree) — ground truth on how Kconfig works
- [ ] **Read:** \`kernelnewbies.org\` kernel internals primers
- [ ] **Note for self:** keep a running log of "what I thought X did vs what it actually does" — this is the artifact that shows reasoning, not just output
- [ ] **Blog post #2 idea:** boot pipeline + Kconfig/module/initramfs distinction explained in your own words

## Phase 2 — Shrink Deliberately
- [ ] **Baseline size:** record \`vmlinux\` size, module count, initramfs size before any cuts
- [ ] **Run \`make localmodconfig\`** (uses your \`baseline-modules.txt\`-equivalent live system) as first pass
- [ ] **Walk Device Drivers menu manually** for anything \`localmodconfig\` missed — remove drivers for hardware you don't have (check against \`lspci -k\` / \`lsusb\`)
- [ ] **Strip:** unused filesystems, unused network protocols, debug/tracing (Kernel hacking menu), unused crypto algorithms
- [ ] **Try \`make tinyconfig\`** as a second, more aggressive branch — compare what breaks vs. \`localmodconfig\` approach
- [ ] **Measure after each major cut:** \`scripts/bloat-o-meter <old-vmlinux> <new-vmlinux>\`
- [ ] **Blog post #3 idea:** before/after sizes with a table, plus "here's what surprised me"

## Phase 3 — initramfs
- [ ] **Inspect current initramfs contents** (\`lsinitrd\` or unpack the cpio manually)
- [ ] **Identify what's actually needed** to reach your real root filesystem vs. what's bundled by default
- [ ] **Rebuild a minimal initramfs** (\`dracut --no-hostonly\` vs custom, or hand-rolled with busybox) and confirm boot still works

## Phase 4 — DKMS, Closing the Loop
- [ ] **Read Arch Wiki's DKMS page first** (clearest reference)
- [ ] **Inspect a real \`dkms.conf\`** if any DKMS module already exists on the box (\`dkms status\`)
- [ ] **Write or pick one small out-of-tree module** (a trivial "hello world" LKM is fine) and register it: \`dkms add\` → \`dkms build\` → \`dkms install\`
- [ ] **Bump your custom kernel's local version string** and rebuild/reinstall it — confirm whether DKMS's automatic hook fires (it likely won't for a hand-built kernel)
- [ ] **Since this isn't a distro package,** manually trigger \`dkms autoinstall\` after \`make install\`, or add it as a step in your own install script — write down *why* the automatic postinst hook doesn't apply here
- [ ] **Blog post #4 idea:** DKMS explained + the "why doesn't autoinstall just work here" gotcha — this is the demonstrable "understood it a level deeper" moment

## Phase 5 — Writeup for the Mentor
- [ ] **Short README:** what was cut, why, measured before/after numbers, one paragraph per phase on reasoning (not just commands run)
- [ ] **Include the DKMS-on-custom-kernel result** as the capstone demo
- [ ] **Send/share with mentor;** note his reaction/feedback for your own career-path notes

## Ongoing — Website Blog Series
- [ ] Each phase above maps to one short blog post — publish as you go, not all at the end, so the log stays honest and dated
- [ ] Close with a reflection post: what this task revealed about whether "systems/kernel work" feels like curiosity-driven work for you, or forced — relevant to the broader career-direction question this task was set to test

---

### Definition of Done
A minimal-footprint custom kernel boots on the Fedora server (or its VM sandbox), measured and documented size reduction from baseline, and one out-of-tree module surviving a kernel version bump via DKMS — with a writeup explaining the reasoning at each step.`
  },
  {
    id: "elenchus",
    slug: "elenchus",
    title: "Elenchus",
    type: "project",
    fields: ["cs-ai", "mathematics"],
    status: "active",
    date: "2026",
    summary: "Given an informally stated math intuition, formalize it in Lean 4, check it, and — if false — automatically diagnose why: isolating which structural axiom breaks, under what relaxed conditions it holds, and translating that diagnosis back into plain language.",
    description: "An automated intuition-to-Lean diagnostic tool built to turn failed mathematical intuitions into structural lessons. Bridges informal mathematical thinking with mechanized verification and hypothesis ablation.",
    tags: ["lean4", "formal-methods", "mathematics", "automated-reasoning", "type-theory", "mathlib", "autoformalization", "llm-reasoning"],
    technologies: ["Lean 4", "Mathlib 4", "Dependent Type Theory", "Python Async Daemon", "TypeScript", "Formal Grammars"],
    visibility: "public",
    links: [
      { label: "arXiv:2604.25031 (Faithful Autoformalization)", url: "https://arxiv.org/abs/2604.25031" },
      { label: "arXiv:2606.31002 (Learning to Disprove)", url: "https://arxiv.org/abs/2606.31002" },
      { label: "arXiv:2506.08321 (LeanTutor AAAI 2026)", url: "https://arxiv.org/abs/2506.08321" }
    ],
    resources: [
      {
        resourceId: "faithful-autoformalization-2026",
        purpose: "paper",
        notes: "On translation-fidelity: roundtrip verification and repair raises equivalence to 83–85%, with a 15–17% residual error rate that necessitates our confirmation checkpoint."
      },
      {
        resourceId: "learning-to-disprove-2026",
        purpose: "paper",
        notes: "On getting genuine disproofs (¬P): trains LLMs specifically to generate Lean-verified counterexamples, treating refutation as an underexplored skill separate from proof search."
      },
      {
        resourceId: "leantutor-aaai-2026",
        purpose: "paper",
        notes: "AAAI 2026 tutoring system: autoformalizer + proof-checker + natural-language feedback. Evaluates step-by-step proofs (57% tactic accuracy, 30% error identification)."
      }
    ],
    contentMarkdown: `> ### The Socratic Elenchus & The Mathematical Parallel
> 
> *"It's most famous as a philosophical term for the Socratic elenchus — the method Socrates uses in Plato's dialogues where he questions someone about their beliefs (e.g., 'what is justice?' or 'what is piety?') until their answer is shown to contain an internal contradiction, revealing that they don't actually know what they claimed to know. The goal isn't just to 'win' the argument but to expose ignorance as a first step toward genuine understanding — hence Socrates' famous claim that he knows he knows nothing."*
> 
> **Drawing the Parallel to Mathematics:**  
> In mathematics, genuine understanding comes from relentlessly questioning each belief of what you have read and understood. When someone explains an informal intuition about a mathematical topic, **Elenchus** uses Lean 4 to formalize it. If the proposition fails, rather than simply returning a cold "false" verdict, the system tears that formalized proposition into discrete component parts, testing which sub-properties fail and which combinations trigger the failure. It then returns the result explaining: *"this is failing because of this"*. Knowing why an intuition failed is vastly more important than merely succeeding or receiving a binary true/false verdict.
> 
> **Terence Tao's Problem-Solving Methodology:**  
> This ablation and diagnostic strategy directly reflects **Terence Tao's approach to solving difficult research problems**: when confronted with a complex, intractable problem, break it into small systems, test each sub-system in isolation, and mix them one by one through systematic permutation. Even if this method does not guarantee an instant solution, it reliably clarifies where the obstacle lies, deepens comprehension, and generates entirely new structural insights.

---

## 1. The Origin: A Wall in Abstract Algebra

While working through the foundational sections of abstract algebra—specifically Groups §1.1 on binary operations—I hit a wall trying to understand why associativity holds naturally for operations like addition, multiplication, modulus, or string concatenation, while failing completely for subtraction. Both addition and subtraction satisfy Definition 1 equally well: they are closed binary operations on $\\mathbb{Z}$. Yet grouping operations differently behaves symmetrically for one and catastrophically breaks for the other:

$$(1 - 2) - 3 = -1 - 3 = -4 \\quad \\neq \\quad 1 - (2 - 3) = 1 - (-1) = 2$$

Looking for an explanation was frustrating. Textbook prose treats counterexamples as self-evident without explaining the structural origin of the failure, and querying language models produced superficial algebraic manipulations rather than a satisfying structural answer explaining *why* the underlying symmetry broke.

## 2. The Claim: Verdicts Are Not Explanations

Existing formal verification tools provide a binary verdict: either a proposition is proved, or proof search fails. None of them tell you *why* an informal intuition breaks or *what minimal change would fix it*. When a mathematician or student forms a flawed intuition, a cold failure certificate gives zero structural leverage. What is needed is an automated diagnostic system: one that accepts an informal mathematical intuition, formalizes it in Lean 4, checks its validity, and—when it fails—mechanically isolates which structural axiom was violated, identifies the minimal failing sub-condition, and translates that diagnosis back into clear mathematical prose.

## 3. Why This Is Not "a Smaller Aristotle"

To anyone working on automated theorem proving—such as Harmonic's Aristotle—this might sound at first glance like a smaller, weaker version of what Aristotle already does. It is not a diluted competitor; it is asking a fundamentally different question.

Aristotle and general autoformalization systems are designed to answer: *is this formalizable, and is it true?* Their primary objective is maximizing formalization fidelity and finding machine-checked proofs for valid conjectures. Elenchus is about the steps *before and after* that proof search. Before proof search, it preserves where an automated translation might be unfaithful through an explicit semantic confirmation checkpoint. And after proof search, once a proposition is determined to be false, Elenchus does not terminate. Where an automated prover stops at refutation or search exhaustion, Elenchus begins its primary work: systematically decomposing the failed formal proposition, running structural ablation on its hypotheses, and determining *why* it failed. This is a difference in what question is being asked, not a difference in computational scale.

## 4. Grounding in the Literature

Three recent empirical results in the formal mathematics literature justify this design:

- **Translation fidelity is an active, unsolved gap:** Empirical evaluations (*Beyond Compilation*, 2026) demonstrate a 3 to 29 percentage point divergence across systems between Lean code that compiles and Lean code that faithfully preserves intended semantics. Even state-of-the-art roundtrip repair (*Faithful Autoformalization via Roundtrip Verification and Repair*, arXiv:2604.25031) raises semantic equivalence from 45–61% to 83–85%, leaving a 15–17% residual error rate. This residual error is precisely why an explicit confirmation checkpoint—where the system paraphrases its formalization back to the user before search begins—is a load-bearing human gate, not decorative process.
- **Proof-search failure is not falsity, and disproof is an independent skill:** As shown in *Learning to Disprove* (arXiv:2606.31002), training models to construct Lean-verified counterexamples is a distinct, underexplored capability separate from tactic proof search. Proof search timing out in Lean says nothing about whether a conjecture is false; conflating search failure with disproof guarantees false diagnoses. Elenchus therefore treats outcome classification as a strict tri-state distinction: **Proved** (machine-checked certificate), **Disproved** (verified proof of $\\neg P$ or an explicit counterexample witness via \`decide\`), and **Undetermined** (neither search succeeded), initiating ablation only on genuine refutations.
- **Structural ablation on false top-level conjectures is unaddressed:** The closest existing system, *LeanTutor* (Patel et al., UC Berkeley, AAAI 2026, arXiv:2506.08321), evaluates step-by-step student proofs, achieving 57% tactic accuracy and 30% error-identification accuracy on intermediate steps. But no published system automates hypothesis ablation on a *false top-level mathematical conjecture* to discover minimal failing cases. Elenchus operates directly on the type-checked Lean AST—dropping, adding, or weakening hypotheses—to isolate broken symmetries without compounding natural-language translation errors across derived branches.

## 5. Scope: Deliberately Narrow by Design

The v1 domain is intentionally confined to basic algebraic axioms: associativity, commutativity, identities, and inverses.

This is a deliberate design choice, not an accidental limitation. In basic abstract algebra, the underlying Mathlib theories are mature and exhaustive, and every single edge case, counterexample, and diagnostic explanation can be hand-verified by a human mathematician before relying on automated pipelines. Testing the pipeline against the anchor intuition—*"subtraction is associative over $\\mathbb{Z}$"*—provides a concrete, tractable testbed: the counterexample is immediate, and the underlying algebraic diagnosis (the asymmetry introduced by the lack of an identity element and the resulting failure of inverse symmetry that addition possesses) is well-understood. Hand-verifying the diagnostic output on these known algebraic boundaries is the only way to establish trust in the ablation and translation mechanisms before deploying them on less trivial domains.

## 6. Current Status & Immediate Next Step

Right now, only the literature review and initial scoping are complete. I have mapped the prior art, formalized the structural questions from Groups §1.1, and hand-worked the counterexample and ablation logic for the "subtraction is associative" case outside of any tooling. No code has been executed in Lean 4 yet, and no hypotheses have been mechanically ablated. The immediate next concrete step is building the minimal script to formalize that single hand-worked subtraction case in Lean 4 and testing whether AST-level hypothesis mutation can isolate the missing hypothesis without human intervention.

---

## Appendix: Logical Pipeline & Invariants

For reference, the operational sequence is organized into seven steps:

1. **Capture:** The user states an informal mathematical intuition in plain natural language (e.g. *"subtraction is associative"*).
2. **Autoformalize with Compile Filter:** An LLM generates a candidate Lean 4 declaration against Mathlib; syntax and type-check errors are filtered immediately.
3. **Semantic Confirmation Checkpoint:** The formal statement is back-translated into plain English, and the user verifies that it faithfully matches their intent before any proof search begins.
4. **Dual Verification ($P$ / $\\neg P$):** The system attempts to prove $P$ via automated tactics (\`aesop\`, \`simp\`, \`ring\`, \`omega\`); if that stalls, it actively searches for a proof of $\\neg P$ or runs \`decide\` / \`native_decide\` to extract an explicit counterexample witness.
5. **Tri-State Classification:** The result is strictly classified as **Proved**, **Disproved**, or **Undetermined** (neither search succeeded). Proof-search failure is never conflated with falsity.
6. **AST-Level Hypothesis Ablation:** On a Disproved outcome, the system systematically generates variants by mutating the verified Lean AST directly (weakening conditions, altering algebraic typeclasses, or relaxing symmetries) inspired by Terence Tao's subsystem permutation method. Mutating the AST directly prevents compounding autoformalization errors across branches.
7. **Structural Aggregation & Diagnostic Synthesis:** Identifies the minimal failing condition and the minimal structural correction that restores validity, translating the result back into clear mathematical prose.`
  },
  {
    id: "groups-1-1-binary-operations",
    slug: "groups-1-1-binary-operations",
    title: "The Devil of Associativity",
    type: "writing",
    fields: ["mathematics"],
    status: "completed",
    date: "2026-09-23",
    summary: "Unpacking Definition 1 and Definition 2 from Group 1.1: why 'binary operation = function ∪ closure', why associativity is about order of execution rather than uniqueness, and testing against counterexamples in subtraction.",
    description: "Personal study notes on group theory fundamentals (Group 1.1), unpacking Definition 1 (binary operations and closure) and Definition 2 (associativity as order invariance), with concrete counterexamples on subtraction.",
    tags: ["math", "group-theory", "self-study", "abstract-algebra"],
    readingTime: "4 min read",
    visibility: "public",
    relatedResource: "artin-algebra-1st-edition",
    relatedChapter: 1,
    contentMarkdown: `I'm starting a new topic — the first section of a group theory text, Group 1.1: "Basic Axioms and Examples." Before I move past the first two definitions, I want to write down not just what they say, but the actual process of pinning down what they mean. This is a summary and more a record of where I got stuck.

> **TL;DR:** Got to know that binary operations mean $\\text{function} \\cup \\text{closure}$, and couldn't understand why associativity fails in a few operators. In some cases like addition, multiplication, modulus, or concatenation, associativity holds, while it doesn't for subtraction and other things. I wonder why, and I haven't got any concrete answers for them (answers given by LLMs don't satisfy).

## Definition 1: Binary operation

The book states it like this:

> A binary operation $*$ on a set $G$ is a function $*: G \\times G \\to G$. For any $a, b \\in G$, we write $a * b$ for $*(a, b)$.

On a first read this is dense, so I want to unpack it piece by piece, in the order the definition actually needs it.

**Step 1 — what is $G \\times G$?**

$G \\times G$ is just the set of every ordered pair you can form by picking one element from $G$ and one element from $G$ (possibly the same element twice). If $G = \\{1, 2\\}$, then

$$G \\times G = \\{(1,1),\\ (1,2),\\ (2,1),\\ (2,2)\\}$$

Nothing exotic here — it's the set of *all* ordered pairings.

**Step 2 — what does it mean for $*$ to be "a function $G \\times G \\to G$"?**

A function, by definition, takes every input and assigns it exactly one specific output. So saying $*$ is a function $G \\times G \\to G$ means: pick any pair $(a,b) \\in G \\times G$, and $*$ hands you back exactly one output. Fine so far — that's just what a function is.

The part that actually adds content is the *codomain*: the output isn't allowed to land just anywhere. It has to land back inside $G$ itself.

**Step 3 — putting it together**

This is where I think the definition is easy to skim past without noticing what it's actually demanding. It's not just saying "$*$ is a function." It's saying "$*$ is a function whose outputs are guaranteed to stay inside $G$." That second condition has a name: **closure**. $G$ is *closed under* $*$ if applying $*$ to any two elements of $G$ never produces something outside $G$.

So the definition of a binary operation is really two ideas stacked on top of each other:

$$\\text{binary operation} = \\text{function} \\ \\cup\\ \\text{closure}$$

A function alone just guarantees a single well-defined output for each input — it says nothing about *where* that output lives. Closure is the extra condition that ties the output back to the same set the inputs came from. Both have to hold for $*$ to qualify.

---

## Definition 2: Associativity

> A binary operation $*$ on a set $G$ is associative if, for all $a, b, c \\in G$:
> $$a * (b * c) = (a * b) * c$$

**My first (wrong) instinct.** My gut reaction on reading this was that it was somehow pointing at *uniqueness* — like it was saying there's only one way to combine three elements. The more I sat with it, the more that felt off, and I couldn't articulate why. What I noticed instead was that the property is really about *order*: it's a claim that grouping the operations differently — doing $b * c$ first versus doing $a * b$ first — doesn't change the outcome. That's a claim about *order of execution*, not about uniqueness of anything.

**The real question this raised for me.** Once I had it framed as "order of operations shouldn't matter," the obvious next question was: why does this hold for some binary operations and fail for others? Definition 1 (function + closure) says nothing about order at all — both addition and subtraction on the integers satisfy Definition 1 equally well. So whatever makes associativity hold or fail has to be a separate condition, layered on top.

**Testing it against a concrete example.** I checked addition first:

$$1 + (2+3) = (1+2) + 3 = 6$$

Holds. Then I tried the same test on subtraction, expecting it to also hold, since subtraction is "just as valid" a binary operation on the integers by Definition 1:

$$1 - (2-3) = 1 - (-1) = 2$$
$$(1-2) - 3 = -1 - 3 = -4$$

$2 \\ne -4$. It fails. A second example made it unambiguous:

$$5 - (3-2) = 5 - 1 = 4$$
$$(5-3) - 2 = 2 - 2 = 0$$

Again unequal.

**Where this leaves me.** So addition and subtraction both pass Definition 1 without any trouble, but only addition passes Definition 2. That confirms these are genuinely independent conditions on an operation — satisfying one tells you nothing about the other. It also means "binary operation" is a much weaker, more permissive label than I originally assumed; associativity is an extra property some binary operations happen to have and others don't, not something baked into what "binary operation" already means.

**Open thread for next time:** now that I've seen associativity fail by direct counterexample, I want to see if there's a structural reason — something about how subtraction is built out of addition and inverses — that predicts *in advance* which operations will fail, rather than having to check case by case.

---

### Lecture Series & Study Log
- **Course Followed:** [Abstract Algebra (Harvard Math 122) — Prof. Benedict Gross](https://youtube.com/playlist?list=PLelIK3uylPMGzHBuR3hLMHrYfMqWWsmx5&si=SCkS4_vJQWFnJYJY)
- **Current Video Status:** **Lecture 1: Introduction to Groups, Binary Operations & Axioms** — **[✓ Completed]**
- **Syllabus Pairing:** *Algebra (1st Edition)* by Michael Artin — Chapter 1: *Matrix Operations* & Chapter 2: *Groups*.

---

*Generated with the help of AI by uploading my notes while studying this topic (nothing new is added to the article which I don't understand or know).*

### PDF of notes I wrote

> **PDF of notes I wrote**  
> [ Empty — I will upload it later ]`
  }
];
