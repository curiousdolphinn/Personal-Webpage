import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  Github, 
  Mail, 
  Printer, 
  Download, 
  ArrowDown, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { profileData } from '../content/profile';
import { siteConfig } from '../content/siteConfig';
import { resumeData } from '../content/resume';
import { 
  calculateTimeSinceBirth, 
  calculateTimeSinceReference,
  calculatePersonalYearProgress,
  calculateYearProgress, 
  calculateMonthProgress, 
  calculateDayProgress
} from '../lib/timeUtils';
import { 
  getTotalRecordedTime, 
  getAllFieldsTimeSummary
} from '../lib/activityUtils';

interface ProfileViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onNavigate }) => {
  // Live clock state updated every second
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Measurement 1: Time since birth (Sep 5, 2007)
  const timeSinceBirth = useMemo(() => {
    return calculateTimeSinceBirth(siteConfig.dateOfBirth, now);
  }, [now]);

  // Measurement 2: Time since personal reference date (turning 19 on Sep 5, 2026)
  const timeSinceReference = useMemo(() => {
    return calculateTimeSinceReference(siteConfig.lifeReferenceDate, now);
  }, [now]);

  const personalYearProgress = useMemo(() => calculatePersonalYearProgress(siteConfig.lifeReferenceDate, now), [now]);
  const monthProgress = useMemo(() => calculateMonthProgress(now), [now]);
  const dayProgress = useMemo(() => calculateDayProgress(now), [now]);

  const totalWork = useMemo(() => getTotalRecordedTime(), []);
  const fieldsSummary = useMemo(() => getAllFieldsTimeSummary(), []);
  const eduCgpa = useMemo(() => {
    return resumeData.education[0]?.gpaOrHonors || 'CGPA: 7.44';
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const scrollToLifeLedger = () => {
    const el = document.getElementById('life-focus-ledger');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[76ch] mx-auto space-y-12 py-8 sm:py-12 print:max-w-none print:py-0 print:space-y-4">
      {/* ────────────────────────────────────────────────────────── */}
      {/* TOP ACTION BAR */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#232734]">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[42px] rounded-md bg-[#161924] border border-[#2D3446] text-[#E2E8F0] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] transition-all text-xs font-mono active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-sky-400" /> Back to Dashboard
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={scrollToLifeLedger}
            className="px-3.5 py-2 min-h-[42px] text-xs font-mono rounded-md border border-[#2D3446] hover:border-[#414B64] text-[#CBD5E1] hover:text-white bg-[#161924] hover:bg-[#1E2333] transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>Jump to Life Ledger</span>
            <ArrowDown className="w-3 h-3 text-[#8E97A8]" />
          </button>

          <button
            id="print-cv-button"
            onClick={handlePrint}
            title="Open print dialog to print or save as PDF"
            className="px-3.5 py-2 min-h-[42px] text-xs font-mono font-medium rounded-md border border-[#3E4861] hover:border-sky-400 text-white hover:text-white bg-[#1A1F2D] hover:bg-[#22293C] transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-sky-400" />
            <span>Print / Save PDF</span>
          </button>

          {siteConfig.resumeUrl && (
            <button
              id="download-cv-button"
              onClick={handlePrint}
              title="Print or Save CV as PDF"
              className="px-4 py-2 min-h-[42px] text-xs font-mono font-medium rounded-md bg-white text-black hover:bg-[#E0E0E0] transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CV (PDF)</span>
            </button>
          )}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. IDENTITY & ACADEMIC REGISTRY HEADER (TOP) */}
      {/* ────────────────────────────────────────────────────────── */}
      <header className="space-y-4 print:space-y-1.5 print:pb-2 print:border-b print:border-[#E5E7EB]">
        <div className="space-y-2 print:space-y-1">
          <div className="font-mono text-[11px] uppercase tracking-widest text-[#737373] flex items-center gap-2 print:text-[9pt] print:text-[#4B5563]">
            <span>Curriculum Vitae & Profile</span>
            <span className="text-[#333333] print:text-[#9CA3AF]">/</span>
            <span>Academic Record</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight print:text-[22pt] print:font-semibold print:text-black print:leading-tight">
            {siteConfig.name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-2.5 text-xs font-mono text-[#A3A3A3] pt-0.5 print:text-[10pt] print:text-[#374151] print:pt-0">
            <span className="text-white print:text-black font-medium">{siteConfig.degree}</span>
            <span className="text-[#444444] print:text-[#9CA3AF]">·</span>
            <span>{siteConfig.institution}</span>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-[#737373] pt-2 print:pt-1 print:gap-3 print:text-[9.5pt] print:text-[#4B5563]">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-white transition-colors flex items-center gap-1.5 print:text-[#1F2937]"
            >
              <Mail className="w-3.5 h-3.5 text-[#555555] print:text-[#4B5563]" />
              <span>{siteConfig.email}</span>
            </a>
            {siteConfig.github && (
              <>
                <span className="text-[#333333] print:text-[#9CA3AF]">·</span>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 print:text-[#1F2937]"
                >
                  <Github className="w-3.5 h-3.5 text-[#555555] print:text-[#4B5563]" />
                  <span>{siteConfig.github.replace('https://', '')}</span>
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 2. STATEMENT OF PURPOSE & CONTEXT */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="space-y-3 print:space-y-1.5 print:break-inside-avoid">
        <div className="font-mono text-xs uppercase tracking-wider text-[#737373] border-b border-[#1E1E1E] pb-1 print:text-[9.5pt] print:font-bold print:text-[#111827] print:border-[#E5E7EB] print:pb-0.5">
          Statement of Purpose & Background
        </div>
        <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#CCCCCC] font-sans print:space-y-1 print:text-[9.5pt] print:text-[#374151] print:leading-normal">
          <p className="leading-relaxed text-[#D4D4D4] print:text-[#1F2937] print:leading-normal">
            {resumeData.summary}
          </p>
          {profileData.conciseBackground.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-[#AAAAAA] text-xs sm:text-sm print:text-[#4B5563] print:text-[9pt] print:leading-normal">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 3. EDUCATION & RELEVANT COURSEWORK */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="space-y-4 print:space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[#737373] border-b border-[#1E1E1E] pb-1 flex items-center justify-between print:text-[9.5pt] print:font-bold print:text-[#111827] print:border-[#E5E7EB] print:pb-0.5">
          <span>Education & Coursework</span>
          {eduCgpa && (
            <span className="text-[#CCCCCC] font-mono text-[11px] normal-case tracking-normal print:text-[9pt] print:text-[#374151]">
              Official Cumulative Performance: <strong className="text-white font-mono print:text-black">{eduCgpa}</strong>
            </span>
          )}
        </div>

        {resumeData.education.map((edu, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-sm border border-[#1E1E1E] bg-[#121212] space-y-6 font-sans print:p-0 print:border-0 print:bg-transparent print:space-y-2.5"
          >
            {/* Institution & Standing Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1C1C1C] pb-4 print:pb-1.5 print:border-[#E5E7EB]">
              <div>
                <div className="font-serif text-lg sm:text-xl font-medium text-white flex items-center gap-2 print:text-[12pt] print:font-bold print:text-black">
                  <GraduationCap className="w-4 h-4 text-[#888888] print:text-[#4B5563]" />
                  <span>{edu.institution}</span>
                </div>
                <div className="text-xs text-[#A3A3A3] font-mono mt-1 flex flex-wrap items-center gap-2 print:text-[9pt] print:text-[#4B5563] print:mt-0.5">
                  <span className="text-white print:text-black font-medium">{edu.degree}</span>
                  <span className="text-[#444444] print:text-[#9CA3AF]">·</span>
                  <span className="px-1.5 py-0.5 rounded-sm bg-[#18261E] text-[#86EFAC] border border-[#234230] text-[11px] print:bg-[#F0FDF4] print:text-[#166534] print:border-[#BBF7D0] print:px-1 print:py-0 print:text-[8pt]">
                    Current: Second Semester
                  </span>
                  <span className="text-[#666666] text-[11px] print:text-[#4B5563] print:text-[8.5pt]">
                    (First Semester Completed · 18 Units)
                  </span>
                  {edu.gpaOrHonors && (
                    <>
                      <span className="text-[#444444] print:text-[#9CA3AF]">·</span>
                      <span className="px-2 py-0.5 rounded-sm bg-[#171717] text-white border border-[#2E2E2E] font-mono text-[11px] font-medium print:bg-[#F3F4F6] print:text-black print:border-[#D1D5DB] print:px-1 print:py-0 print:text-[8.5pt]">
                        {edu.gpaOrHonors}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <span className="font-mono text-xs text-[#666666] shrink-0 print:text-[9pt] print:text-[#4B5563] print:font-medium">{edu.period}</span>
            </div>

            {/* Semester Tables */}
            {edu.semesters && edu.semesters.length > 0 ? (
              <div className="space-y-4 print:space-y-2">
                {edu.semesters.map((sem, sIdx) => (
                  <div key={sIdx} className="space-y-2.5 print:space-y-1 print:break-inside-avoid">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-xs print:text-[8.5pt]">
                      <div className="flex items-center gap-2">
                        <span className="uppercase tracking-wider text-white font-medium print:text-black print:font-bold">
                          {sem.semesterName}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-sm uppercase print:text-[8pt] print:px-1 print:py-0 ${
                            sem.status === 'completed'
                              ? 'bg-[#152338] text-[#93C5FD] border border-[#1E3A5F] print:bg-[#EFF6FF] print:text-[#1E40AF] print:border-[#BFDBFE]'
                              : 'bg-[#221C16] text-[#FDE047] border border-[#3E341F] print:bg-[#FEFCE8] print:text-[#854D0E] print:border-[#FEF08A]'
                          }`}
                        >
                          {sem.status === 'completed' ? 'Completed' : 'Ongoing'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-[11px] text-[#888888] print:text-[8.5pt] print:text-[#4B5563]">
                        <span>Total Units: <strong className="text-white font-mono print:text-black">{sem.totalUnits}</strong></span>
                        {sem.status === 'completed' ? (
                          <>
                            <span className="no-print text-[#444444]">·</span>
                            <span className="no-print text-[#888888] flex items-center gap-1 bg-[#161616] px-2 py-0.5 rounded-sm border border-[#222222]">
                              <span>Scroll lateral for grades</span>
                              <span className="text-white">→</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-[#444444] print:text-[#9CA3AF]">·</span>
                            <span className="text-[#FDE047] text-[10px] uppercase font-mono px-1.5 py-0.2 rounded-sm bg-[#221C16] border border-[#3E341F] print:bg-[#FEFCE8] print:text-[#854D0E] print:border-[#FEF08A] print:px-1 print:py-0 print:text-[8pt]">
                              Ongoing Term
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {sem.courses.length > 0 ? (
                      <div className="relative border border-[#1E1E1E] rounded-sm bg-[#101010] print:border-[#D1D5DB] print:bg-white print:rounded-none">
                        <div className="overflow-x-auto print:overflow-visible">
                          <table className="w-full min-w-[720px] print:min-w-0 text-left font-mono text-xs print:text-[8.5pt]">
                            <thead>
                              <tr className="bg-[#161616] text-[#737373] border-b border-[#202020] text-[11px] print:bg-[#F3F4F6] print:text-[#374151] print:border-[#D1D5DB] print:text-[8pt]">
                                <th className="py-2.5 px-3 print:py-1 print:px-2 font-medium uppercase tracking-wider w-32 print:w-24">Course No.</th>
                                <th className="py-2.5 px-3 print:py-1 print:px-2 font-medium uppercase tracking-wider">Course Title</th>
                                <th className="py-2.5 px-3 print:py-1 print:px-2 font-medium uppercase tracking-wider text-center w-20 print:w-14">Units</th>
                                <th className="py-2.5 px-3 print:py-1 print:px-2 font-medium uppercase tracking-wider text-center w-28 print:w-20">Status</th>
                                <th className="py-2.5 px-4 print:py-1 print:px-2 font-medium uppercase tracking-wider text-center w-28 print:w-16 bg-[#181818] text-white border-l border-[#242424] print:bg-[#F3F4F6] print:text-[#111827] print:border-[#D1D5DB]">
                                  Grade
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A1A1A] bg-[#111111] print:divide-[#E5E7EB] print:bg-white">
                              {sem.courses.map((course, cIdx) => (
                                <tr key={cIdx} className="hover:bg-[#151515] transition-colors print:hover:bg-transparent">
                                  <td className="py-2.5 px-3 print:py-1 print:px-2 text-[#CCCCCC] font-medium font-mono print:text-black">{course.code}</td>
                                  <td className="py-2.5 px-3 print:py-1 print:px-2 text-white font-sans text-xs print:text-[8.5pt] print:text-[#1F2937]">{course.title}</td>
                                  <td className="py-2.5 px-3 print:py-1 print:px-2 text-[#A3A3A3] text-center font-mono print:text-[#4B5563]">{course.units}</td>
                                  <td className="py-2.5 px-3 print:py-1 print:px-2 text-center">
                                    {course.status === 'completed' ? (
                                      <span className="text-[10px] uppercase text-[#86EFAC] bg-[#122318] border border-[#1A3A25] px-1.5 py-0.5 rounded-sm print:bg-transparent print:text-[#15803D] print:border-0 print:font-semibold print:text-[8pt] print:p-0">
                                        Passed
                                      </span>
                                    ) : (
                                      <span className="text-[10px] uppercase text-[#FDE047] bg-[#221C16] border border-[#3E341F] px-1.5 py-0.5 rounded-sm font-medium print:bg-transparent print:text-[#A16207] print:border-0 print:font-semibold print:text-[8pt] print:p-0">
                                        Ongoing
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-2.5 px-4 print:py-1 print:px-2 text-center bg-[#141414] border-l border-[#242424] print:bg-transparent print:border-l print:border-[#E5E7EB]">
                                    {course.grade ? (
                                      <span className="inline-block font-mono text-xs font-semibold px-2.5 py-0.5 rounded-sm border bg-[#14281E] text-[#86EFAC] border-[#1D4A2D] print:bg-transparent print:text-black print:border-0 print:p-0 print:text-[9pt] print:font-bold">
                                        {course.grade}
                                      </span>
                                    ) : (
                                      <span className="text-[#666666] font-mono text-xs print:text-[#9CA3AF] print:text-[8.5pt]">—</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr className="bg-[#141414] border-t border-[#202020] text-[#888888] font-medium print:bg-[#F9FAFB] print:border-t-2 print:border-[#D1D5DB] print:text-[#374151]">
                                <td colSpan={2} className="py-2.5 px-3 print:py-1 print:px-2 text-right text-[11px] uppercase tracking-wider print:text-[8pt] print:font-bold">
                                  {sem.semesterName} Summary:
                                </td>
                                <td className="py-2.5 px-3 print:py-1 print:px-2 text-center text-white font-bold print:text-black print:text-[8.5pt]">{sem.totalUnits} Units</td>
                                <td className="py-2.5 px-3 print:py-1 print:px-2 text-center text-[11px] print:text-[8pt]">
                                  {sem.status === 'completed' ? (
                                    <span className="text-[#86EFAC] print:text-[#15803D] print:font-semibold">100% Cleared</span>
                                  ) : (
                                    <span className="text-[#FDE047] print:text-[#A16207] print:font-semibold">Ongoing Term</span>
                                  )}
                                </td>
                                <td className="py-2.5 px-4 print:py-1 print:px-2 text-center font-bold text-white bg-[#181818] border-l border-[#242424] print:bg-transparent print:border-l print:border-[#E5E7EB] print:text-black print:text-[8.5pt]">
                                  {sem.status === 'completed' ? 'CGPA: 7.44' : 'Active Term'}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-[#141414] border border-[#1C1C1C] rounded-sm text-xs font-mono text-[#888888] flex items-center justify-between print:p-1.5 print:bg-white print:border-[#E5E7EB] print:text-[8.5pt]">
                        <span>Currently enrolled in Second Semester curriculum. Course registry in progress.</span>
                        <span className="text-[#86EFAC] text-[10px] uppercase px-1.5 py-0.5 rounded-sm bg-[#132219] border border-[#1D3E2B] print:bg-transparent print:text-[#15803D] print:border-0 print:font-bold">
                          Active Term
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2.5 pt-1">
                <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider">
                  Foundational Coursework
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {edu.relevantCoursework.map((course, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2.5 py-1 text-xs font-mono text-[#CCCCCC] bg-[#161616] rounded-sm border border-[#242424]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 4. AREAS OF EXPLORATION & COMPETENCIES */}
      {/* ────────────────────────────────────────────────────────── */}
      {resumeData.areasOfExploration && resumeData.areasOfExploration.length > 0 && (
        <section className="space-y-3 print:space-y-1.5 print:break-inside-avoid">
          <div className="font-mono text-xs uppercase tracking-wider text-[#737373] border-b border-[#1E1E1E] pb-1 print:text-[9.5pt] print:font-bold print:text-[#111827] print:border-[#E5E7EB] print:pb-0.5">
            Technical Competencies & Systems Architecture
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:grid-cols-3 print:gap-2.5">
            {resumeData.areasOfExploration.map((area, idx) => (
              <div
                key={idx}
                className="p-4 rounded-sm border border-[#1E1E1E] bg-[#121212] space-y-2 print:p-2 print:border print:border-[#E5E7EB] print:bg-white print:space-y-1"
              >
                <div className="font-serif font-medium text-sm text-white border-b border-[#1A1A1A] pb-1.5 print:text-[9pt] print:font-bold print:text-black print:pb-1 print:border-[#E5E7EB]">
                  {area.category}
                </div>
                <div className="space-y-1 pt-1 print:pt-0.5 print:space-y-0.5">
                  {area.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="text-xs font-mono text-[#888888] flex items-center gap-1.5 print:text-[8pt] print:text-[#374151]">
                      <span className="w-1 h-1 rounded-full bg-[#444444] print:bg-[#6B7280]" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 5. SELECTED PROJECTS */}
      {/* ────────────────────────────────────────────────────────── */}
      {resumeData.selectedProjects && resumeData.selectedProjects.length > 0 && (
        <section className="space-y-3 print:space-y-1.5 print:break-inside-avoid">
          <div className="font-mono text-xs uppercase tracking-wider text-[#737373] border-b border-[#1E1E1E] pb-1 flex items-center justify-between print:text-[9.5pt] print:font-bold print:text-[#111827] print:border-[#E5E7EB] print:pb-0.5">
            <span>Selected Projects</span>
            <button
              onClick={() => onNavigate('projects')}
              className="no-print text-[#888888] hover:text-white transition-colors text-[11px] font-mono flex items-center gap-1"
            >
              <span>View all projects</span>
              <span>→</span>
            </button>
          </div>
          <div className="space-y-3 print:space-y-2">
            {resumeData.selectedProjects.map((proj, idx) => {
              const projectSlug = proj.name.toLowerCase().includes('kernel')
                ? 'kernel-tuning'
                : proj.name.toLowerCase().includes('elenchus')
                ? 'elenchus'
                : undefined;

              return (
                <div
                  key={idx}
                  onClick={() => projectSlug && onNavigate('projects', projectSlug)}
                  className={`p-4 sm:p-5 rounded-sm border border-[#1E1E1E] bg-[#121212] space-y-2.5 font-sans transition-colors print:p-2.5 print:border print:border-[#E5E7EB] print:bg-white print:space-y-1 ${
                    projectSlug ? 'cursor-pointer hover:border-[#333333] hover:bg-[#141414]' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base font-medium text-white print:text-[10pt] print:font-bold print:text-black">
                        {proj.name}
                      </h3>
                      {proj.name.toLowerCase().includes('kernel') && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-sm bg-[#16202E] text-[#93C5FD] border border-[#21354F] print:bg-[#EFF6FF] print:text-[#1E40AF] print:border-[#BFDBFE] print:text-[7.5pt] print:px-1">
                          CS
                        </span>
                      )}
                      {proj.name.toLowerCase().includes('elenchus') && (
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-sm bg-[#16202E] text-[#93C5FD] border border-[#21354F] print:bg-[#EFF6FF] print:text-[#1E40AF] print:border-[#BFDBFE] print:text-[7.5pt] print:px-1">
                            CS
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-sm bg-[#221A2B] text-[#D8B4FE] border border-[#3C284F] print:bg-[#FAF5FF] print:text-[#6B21A8] print:border-[#E9D5FF] print:text-[7.5pt] print:px-1">
                            Math
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-mono text-[#555555] print:text-[8pt] print:text-[#4B5563] print:font-medium">{proj.period}</span>
                  </div>
                  <div className="text-xs font-mono text-[#737373] print:text-[8pt] print:text-[#4B5563]">{proj.tech}</div>
                  <ul className="list-disc list-inside text-xs sm:text-[13px] text-[#A3A3A3] space-y-1 leading-relaxed pl-0.5 print:text-[8.5pt] print:text-[#374151] print:space-y-0.5 print:leading-normal">
                    {proj.description.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <hr className="border-[#222222] my-4" />

      {/* ────────────────────────────────────────────────────────── */}
      {/* 5. LIFE & FOCUS LEDGER (PLACED AT THE END AS REQUESTED) */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="life-focus-ledger" className="space-y-6 pt-4 scroll-mt-20 no-print">
        <div className="flex items-baseline justify-between border-b border-[#1E1E1E] pb-3">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-[#737373] mb-1">
              Temporal Position & Hours Recorded
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white">
              Life & Focus Ledger
            </h2>
          </div>
        </div>

        {/* Dual Live Measurements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Measurement 1: Time Since Birth */}
          <div className="p-6 rounded-sm border border-[#1E1E1E] bg-[#121212] space-y-4">
            <div className="space-y-1">
              <div className="font-mono text-[10px] tracking-widest uppercase text-[#737373]">
                MEASUREMENT 01 / TIME SINCE BIRTH
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-light tracking-tight text-white">
                {timeSinceBirth.totalHoursFormatted}{' '}
                <span className="text-base sm:text-lg text-[#737373] font-normal">hours</span>
              </div>
              <div className="font-mono text-xs text-[#A3A3A3] pt-0.5">
                {timeSinceBirth.years} years · {timeSinceBirth.months} months · {timeSinceBirth.days} days
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1C1C1C] text-xs font-mono">
              <div>
                <div className="text-[#666666]">Total Days</div>
                <div className="text-white text-sm font-medium mt-0.5">{timeSinceBirth.totalDaysFormatted}</div>
              </div>
              <div>
                <div className="text-[#666666]">Total Weeks</div>
                <div className="text-white text-sm font-medium mt-0.5">{timeSinceBirth.totalWeeksFormatted}</div>
              </div>
            </div>
          </div>

          {/* Measurement 2: Time Since Turning 19 */}
          <div className="p-6 rounded-sm border border-[#1E1E1E] bg-[#121212] space-y-4">
            <div className="space-y-1">
              <div className="font-mono text-[10px] tracking-widest uppercase text-[#737373]">
                MEASUREMENT 02 / {siteConfig.lifeReferenceLabel.toUpperCase()}
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-light tracking-tight text-white">
                {timeSinceReference.totalHoursFormatted}{' '}
                <span className="text-base sm:text-lg text-[#737373] font-normal">hours</span>
              </div>
              <div className="font-mono text-xs text-[#A3A3A3] pt-0.5">
                {timeSinceReference.isFuture ? (
                  <span className="text-[#888888]">
                    Begins upon turning 19 on Sep 5, 2026 ({timeSinceReference.countdownDays} days remaining)
                  </span>
                ) : (
                  <span>
                    {timeSinceReference.years}y {timeSinceReference.months}m {timeSinceReference.days}d elapsed since turning 19 (Sep 5, 2026)
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1C1C1C] text-xs font-mono">
              <div>
                <div className="text-[#666666]">Recorded Work</div>
                <div className="text-[#86efac] text-sm font-medium mt-0.5">{totalWork.formatted}</div>
              </div>
              <div>
                <div className="text-[#666666]">Sessions Logged</div>
                <div className="text-white text-sm font-medium mt-0.5">{totalWork.count}</div>
              </div>
            </div>
          </div>
        </div>

        {/* The Wheel of Time */}
        <div className="p-5 rounded-sm border border-[#1E1E1E] bg-[#111111] space-y-3">
          <div className="font-mono text-xs uppercase tracking-wider text-[#737373]">
            The Wheel of Time
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            {/* Age 19 Cycle */}
            <div className="p-3 rounded-sm bg-[#0E0E0E] border border-[#1A1A1A] space-y-2">
              <div className="flex justify-between text-[#888888]">
                <span>Age 19 Progress</span>
                <span className="text-white font-medium">{personalYearProgress.percentageFormatted}</span>
              </div>
              <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
                <div className="bg-white/80 h-full rounded-full transition-all duration-300" style={{ width: `${personalYearProgress.percentage}%` }} />
              </div>
              <div className="text-[10px] text-[#666666] leading-tight">
                Day {personalYearProgress.daysIntoYear} of year 19 · {personalYearProgress.elapsedHours}h of {personalYearProgress.totalHours}h
              </div>
            </div>

            {/* Month Progress Cycle */}
            <div className="p-3 rounded-sm bg-[#0E0E0E] border border-[#1A1A1A] space-y-2">
              <div className="flex justify-between text-[#888888]">
                <span>{monthProgress.monthName} Progress</span>
                <span className="text-white font-medium">{monthProgress.percentageFormatted}</span>
              </div>
              <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
                <div className="bg-white/80 h-full rounded-full transition-all duration-300" style={{ width: `${monthProgress.percentage}%` }} />
              </div>
              <div className="text-[10px] text-[#666666] leading-tight">
                {monthProgress.summary}
              </div>
            </div>

            {/* Day Progress Cycle */}
            <div className="p-3 rounded-sm bg-[#0E0E0E] border border-[#1A1A1A] space-y-2">
              <div className="flex justify-between text-[#888888]">
                <span>Day Progress</span>
                <span className="text-white font-medium">{dayProgress.percentageFormatted}</span>
              </div>
              <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
                <div className="bg-white/80 h-full rounded-full transition-all duration-300" style={{ width: `${dayProgress.percentage}%` }} />
              </div>
              <div className="text-[10px] text-[#666666] leading-tight">
                {dayProgress.summary}
              </div>
            </div>
          </div>
        </div>

        {/* Time Distributed by Field Allocation */}
        <div className="space-y-3">
          <div className="font-mono text-xs uppercase tracking-wider text-[#737373]">
            Recorded Focus Hours Across Disciplines
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {fieldsSummary.map(fs => (
              <div
                key={fs.slug}
                onClick={() => onNavigate('fields', fs.slug)}
                className="p-3.5 rounded-sm border border-[#1E1E1E] bg-[#121212] hover:border-[#333333] cursor-pointer transition-colors space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-medium text-sm text-white group-hover:text-[#CCCCCC]">
                    {fs.title}
                  </span>
                  <span className="text-[#86efac] font-mono">{fs.formatted}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#737373]">
                  <span>{fs.activityCount} logged sessions</span>
                  <span className="group-hover:text-white transition-colors">Enter Field →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Academic Note */}
        {resumeData.laboratoryNotes && (
          <div className="pt-4 border-t border-[#1C1C1C] text-xs font-mono text-[#555555]">
            {resumeData.laboratoryNotes}
          </div>
        )}
      </section>
    </div>
  );
};
