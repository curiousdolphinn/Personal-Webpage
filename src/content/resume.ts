import { ResumeData } from '../types';
import { siteConfig } from './siteConfig';

export const resumeData: ResumeData = {
  summary: `Academic record, coursework, and technical index for Applied Mathematics and Computer Science, focusing on Systems Architecture, Operating Systems, Computer Organization, and Discrete Structures.`,
  education: [
    {
      degree: siteConfig.degree,
      institution: siteConfig.institution,
      period: "2024 — Present",
      currentStanding: "Semester 2 (Ongoing) · Semester 1 Completed",
      gpaOrHonors: "CGPA: 7.44",
      relevantCoursework: [
        "BCS ZC311: Data Structures and Algorithms (4 Units · Ongoing)",
        "BCS ZC316: Object Oriented Programming (4 Units · Ongoing)",
        "BCS ZC215: Command Line Interfaces and Scripting (3 Units · Ongoing)",
        "BCS ZC233: Probability and Statistics (3 Units · Ongoing)",
        "BCS ZC112: Introduction to Logic (2 Units · Ongoing)",
        "Biology (3 Units · Ongoing)",
        "BCS ZC313: Introduction to Programming (4 Units)",
        "BCS ZC219: Discrete Mathematics (3 Units)",
        "BCS ZC230: Linear Algebra and Optimization (3 Units)",
        "BCS ZC228: Introduction to Computing Systems (3 Units)",
        "BCS ZC111: Basic Electronics (2 Units)",
        "BCS ZC239: Writing Practice (3 Units)"
      ],
      semesters: [
        {
          semesterName: "First Semester",
          semesterNumber: 1,
          status: "completed",
          totalUnits: 18,
          courses: [
            { code: "BCS ZC313", title: "Introduction to Programming", units: 4, grade: "B-", status: "completed" },
            { code: "BCS ZC239", title: "Writing Practice", units: 3, grade: "B-", status: "completed" },
            { code: "BCS ZC219", title: "Discrete Mathematics", units: 3, grade: "B-", status: "completed" },
            { code: "BCS ZC228", title: "Introduction to Computing Systems", units: 3, grade: "A", status: "completed" },
            { code: "BCS ZC111", title: "Basic Electronics", units: 2, grade: "C-", status: "completed" },
            { code: "BCS ZC230", title: "Linear Algebra and Optimization", units: 3, grade: "B", status: "completed" }
          ]
        },
        {
          semesterName: "Second Semester",
          semesterNumber: 2,
          status: "ongoing",
          totalUnits: 19,
          courses: [
            { code: "BCS ZC311", title: "Data Structures and Algorithms", units: 4, status: "ongoing" },
            { code: "BCS ZC316", title: "Object Oriented Programming", units: 4, status: "ongoing" },
            { code: "BCS ZC215", title: "Command Line Interfaces and Scripting", units: 3, status: "ongoing" },
            { code: "BCS ZC233", title: "Probability and Statistics", units: 3, status: "ongoing" },
            { code: "BCS ZC112", title: "Introduction to Logic", units: 2, status: "ongoing" },
            { code: "—", title: "Biology", units: 3, status: "ongoing" }
          ]
        }
      ]
    }
  ],
  areasOfExploration: [
    {
      category: "Systems Architecture & Low-Level Computing",
      skills: ["Operating Systems Internals", "Computer Organization & Architecture", "Systems Programming (C / C++)", "Memory Hierarchy & Cache Design", "Linux & POSIX Environments"]
    },
    {
      category: "Applied Mathematics & Discrete Structures",
      skills: ["Discrete Mathematics & Graph Theory", "Linear Algebra & Matrix Operations", "Optimization & Numerical Methods", "Probability & Statistics for Computing"]
    },
    {
      category: "Core Computer Science & Foundations",
      skills: ["Data Structures & Algorithms", "Theory of Computation", "Object-Oriented Programming", "Formal Methods & Verification"]
    }
  ],
  selectedProjects: [
    {
      name: "Kernel Tuning",
      period: "Active",
      tech: "Linux Kernel · Systems Architecture · Fedora · Kconfig / DKMS · CS",
      description: [
        "Designing a minimal-footprint custom Linux kernel and dissecting DKMS out-of-tree module rebuild mechanics on a remote Fedora physical server.",
        "Undertaken as a mentor-directed technical assessment on hard computational problems, testing low-level reasoning speed, Kconfig dependency pruning, and boot pipeline optimization."
      ]
    },
    {
      name: "Elenchus",
      period: "Active",
      tech: "Formal Methods · Mathematical Logic · CS & Mathematics",
      description: [
        "Formal proof-checking for informal mathematical intuition. Bridges intuitive reasoning with mechanized proof validation and automated structural hypothesis ablation."
      ]
    }
  ],
  honorsAndActivities: [],
  laboratoryNotes: "Maintained as an honest academic record of coursework, research questions, and logged studies."
};
