import React from 'react';
import { ArrowLeft, Github, ExternalLink, Clock, BookOpen, CheckCircle2, Circle, HelpCircle, ArrowUpRight } from 'lucide-react';
import { workData } from '../content/work';
import { getFieldBySlug } from '../lib/fieldUtils';
import { getRecordedTimeByWork } from '../lib/activityUtils';
import { getResourceById } from '../content/resources';
import { StatusBadge } from '../components/StatusBadge';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { PipelineViewer } from '../components/PipelineViewer';
import { WorkAttachedResource, ResourceItem, PrerequisiteItem } from '../types';

interface ProjectDetailViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ slug, onNavigate }) => {
  const item = workData.find(w => w.slug === slug || w.id === slug);

  if (!item) {
    return (
      <div className="max-w-[72ch] mx-auto py-16 text-center space-y-4">
        <h1 className="font-serif text-2xl text-white">Item Not Found</h1>
        <p className="text-sm font-mono text-[#888888]">
          The requested work item could not be located in the current ledger.
        </p>
        <button
          id="btn-return-work-archive"
          onClick={() => onNavigate('projects')}
          className="px-4 py-2 text-xs font-mono bg-[#161616] border border-[#2A2A2A] text-white rounded-sm hover:border-[#444444] transition-colors"
        >
          Return to Work Archive
        </button>
      </div>
    );
  }

  const workTime = getRecordedTimeByWork(item.id || item.slug);

  // Normalize attached resources
  const resolvedResources: {
    resource: ResourceItem;
    purpose?: string;
    chaptersFilter?: string | (number | string)[];
    customNotes?: string;
  }[] = [];

  if (item.resources && Array.isArray(item.resources)) {
    for (const resEntry of item.resources) {
      if (typeof resEntry === 'string') {
        const found = getResourceById(resEntry);
        if (found) {
          resolvedResources.push({ resource: found });
        }
      } else if (typeof resEntry === 'object' && resEntry !== null) {
        const entry = resEntry as WorkAttachedResource;
        const resObj = entry.resource || (entry.resourceId ? getResourceById(entry.resourceId) : undefined);
        if (resObj) {
          resolvedResources.push({
            resource: resObj,
            purpose: entry.purpose || resObj.purpose,
            chaptersFilter: entry.chapters,
            customNotes: entry.notes,
          });
        }
      }
    }
  }

  // Milestones statistics
  const totalMilestones = item.milestones?.length || 0;
  const completedMilestones = item.milestones?.filter(m => m.status === 'completed').length || 0;

  // Prerequisite resolution
  const prerequisitesList: PrerequisiteItem[] = (item.prerequisites || []).map((p, idx) => {
    if (typeof p === 'string') {
      return { id: `prereq-${idx}`, title: p, status: 'completed' };
    }
    return p;
  });

  // Check if this project is Elenchus (reads as an essay/writeup rather than a status dashboard)
  const isElenchus = item.id === 'elenchus' || item.slug === 'elenchus';

  return (
    <div className={`${isElenchus ? 'max-w-[74ch]' : 'max-w-[100ch]'} mx-auto space-y-8 py-8 sm:py-12`}>
      {/* ────────────────────────────────────────────────────────── */}
      {/* TOP BAR / BREADCRUMBS */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8E97A8] border-b border-[#232734] pb-4">
        <button
          id="btn-back-work-archive"
          onClick={() => onNavigate('projects')}
          className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[42px] rounded-md bg-[#161924] border border-[#2D3446] text-[#E2E8F0] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] transition-all text-xs font-mono active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-sky-400" /> Back to Work Archive
        </button>

        {item.fields && item.fields.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#8E97A8]">Fields:</span>
            {item.fields.map(fSlug => {
              const f = getFieldBySlug(fSlug);
              return (
                <button
                  key={fSlug}
                  id={`btn-field-crumb-${fSlug}`}
                  onClick={() => onNavigate('fields', f?.slug || fSlug)}
                  className="px-3 py-1.5 min-h-[36px] rounded-md bg-[#161924] border border-[#2D3446] text-[#CBD5E1] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] transition-all text-xs font-mono active:scale-95 flex items-center"
                >
                  {f?.shortTitle || f?.title || fSlug}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {isElenchus ? (
        <article className="space-y-8 font-sans">
          <header className="space-y-4 border-b border-[#232734] pb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#8E97A8]">
              <StatusBadge status={item.status} size="sm" />
              <span>·</span>
              <span className="capitalize">{item.type.replace('-', ' ')}</span>
              <span>·</span>
              <span>{item.date}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white leading-[1.2]">
              {item.title}
            </h1>

            <p className="text-base text-[#CBD5E1] font-sans leading-relaxed">
              {item.summary}
            </p>

            {item.links && item.links.length > 0 && (
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {item.links.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 min-h-[38px] text-xs font-mono rounded-md border border-[#262B38] bg-[#151822] text-[#CBD5E1] hover:border-sky-400 hover:text-white transition-all inline-flex items-center gap-2 shadow-sm active:scale-95"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-sky-400" /> {link.label}
                  </a>
                ))}
              </div>
            )}
          </header>

          <div className="font-sans">
            {item.contentMarkdown && (
              <MarkdownRenderer content={item.contentMarkdown} />
            )}
          </div>
        </article>
      ) : (
        /* ────────────────────────────────────────────────────────── */
        /* TWO-COLUMN DESKTOP LAYOUT */
        /* ────────────────────────────────────────────────────────── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ══════════════════════════════════════════════════════════ */}
        {/* LEFT COLUMN: MAIN PROJECT CONTENT (8 Cols) */}
        {/* ══════════════════════════════════════════════════════════ */}
        <main className="lg:col-span-8 space-y-10">
          {/* Header */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={item.status} size="md" />
              <span className="text-xs font-mono text-[#737373] capitalize">
                {item.type.replace('-', ' ')}
              </span>
              <span className="text-xs font-mono text-[#333333]">·</span>
              <span className="text-xs font-mono text-[#737373]">
                {item.date}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white leading-[1.2]">
              {item.title}
            </h1>

            <p className="text-base text-[#D4D4D4] font-sans leading-relaxed">
              {item.summary}
            </p>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-mono font-medium rounded-sm bg-white text-black hover:bg-[#E0E0E0] transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> Repository
                </a>
              )}
              {item.demoUrl && (
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-mono font-medium rounded-sm border border-[#2E2E2E] bg-[#141414] text-[#CCCCCC] hover:border-[#555555] hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              )}
              {item.links && item.links.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-mono font-medium rounded-sm border border-[#2E2E2E] bg-[#141414] text-[#CCCCCC] hover:border-[#555555] hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> {link.label}
                </a>
              ))}
            </div>
          </header>

          <hr className="border-[#1E1E1E]" />

          {/* Structured Content Sections */}
          <div className="space-y-8 font-sans">
            {item.problem && (
              <section className="space-y-2">
                <h2 className="font-mono text-xs uppercase tracking-wider text-[#737373]">
                  Problem & Inquiry
                </h2>
                <p className="text-sm sm:text-base text-[#D4D4D4] leading-relaxed">
                  {item.problem}
                </p>
              </section>
            )}

            {item.approach && (
              <section className="space-y-2">
                <h2 className="font-mono text-xs uppercase tracking-wider text-[#737373]">
                  Approach & Implementation
                </h2>
                <p className="text-sm sm:text-base text-[#D4D4D4] leading-relaxed">
                  {item.approach}
                </p>
              </section>
            )}

            {/* INTERACTIVE CONNECTED PIPELINE ARCHITECTURE (DIAMOND & PIPE VISUALIZATION) */}
            {item.pipelineStages && item.pipelineStages.length > 0 && (
              <section className="space-y-4 pt-2 border-t border-[#1C1C1C]">
                <PipelineViewer stages={item.pipelineStages} />
              </section>
            )}

            {/* ATTACHED BOOKS & LITERATURE WITH CHAPTER-LEVEL PROGRESS */}
            {resolvedResources.length > 0 && (
              <section className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                  <h2 className="font-mono text-xs uppercase tracking-wider text-[#888888] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#737373]" /> Attached Literature & Resources
                  </h2>
                  <span className="text-[11px] font-mono text-[#555555]">
                    {resolvedResources.length} {resolvedResources.length === 1 ? 'source' : 'sources'}
                  </span>
                </div>

                <div className="space-y-4">
                  {resolvedResources.map(({ resource, purpose, customNotes }) => (
                    <div
                      key={resource.id}
                      className="p-4 rounded-sm border border-[#222222] bg-[#111111] space-y-3"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            {purpose && (
                              <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-[#1A1A1A] border border-[#2A2A2A] text-[#86efac]">
                                {purpose.replace('-', ' ')}
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-[#737373] uppercase">
                              {resource.type}
                            </span>
                          </div>
                          <h3 className="font-serif text-lg font-medium text-white pt-1">
                            {resource.title}
                          </h3>
                          {resource.author && (
                            <p className="text-xs font-mono text-[#888888]">
                              {resource.author}
                            </p>
                          )}
                        </div>

                        {resource.status && (
                          <StatusBadge status={resource.status} size="sm" />
                        )}
                      </div>

                      {customNotes && (
                        <p className="text-xs text-[#A3A3A3] italic bg-[#141414] p-2 rounded-sm border border-[#1E1E1E]">
                          {customNotes}
                        </p>
                      )}

                      {/* Chapter-Level Tracking */}
                      {resource.chapters && resource.chapters.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-[#1C1C1C]">
                          <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider">
                            Reading Progress & Depth
                          </div>
                          <div className="space-y-1.5">
                            {resource.chapters.map((ch, cIdx) => (
                              <div
                                key={cIdx}
                                className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono p-1.5 rounded-sm bg-[#0E0E0E] border border-[#1A1A1A]"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-[#666666] select-none">
                                    {ch.status === 'completed' ? '✓' : ch.status === 'reading' ? '◐' : ch.status === 'skipped' ? '—' : '○'}
                                  </span>
                                  <span className="text-white">
                                    Ch. {ch.chapterNumber} — {ch.title}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  {ch.percentage !== undefined && (
                                    <span className="text-[11px] text-[#93c5fd]">
                                      {ch.percentage}%
                                    </span>
                                  )}
                                  {ch.readingDepth && (
                                    <span className="text-[10px] text-[#888888] px-1.5 py-0.5 rounded-sm bg-[#161616] border border-[#262626]">
                                      {ch.readingDepth.replace('-', ' ')}
                                    </span>
                                  )}
                                  <StatusBadge status={ch.status} size="sm" />
                                </div>

                                {ch.notes && (
                                  <div className="w-full text-[11px] font-sans text-[#888888] pt-1 pl-5">
                                    "{ch.notes}"
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {item.whatILearned && (
              <section className="space-y-2">
                <h2 className="font-mono text-xs uppercase tracking-wider text-[#737373]">
                  Key Learnings & Takeaways
                </h2>
                <p className="text-sm sm:text-base text-[#D4D4D4] leading-relaxed">
                  {item.whatILearned}
                </p>
              </section>
            )}

            {item.limitationsAndMistakes && (
              <section className="space-y-2 p-4 rounded-sm border border-[#242424] bg-[#111111]">
                <h2 className="font-mono text-xs uppercase tracking-wider text-[#A3A3A3]">
                  Limitations & Failure Analysis
                </h2>
                <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                  {item.limitationsAndMistakes}
                </p>
              </section>
            )}

            {/* Extended Markdown content */}
            {item.contentMarkdown && (
              <section className="pt-4 border-t border-[#1C1C1C]">
                <MarkdownRenderer content={item.contentMarkdown} />
              </section>
            )}
          </div>
        </main>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* RIGHT COLUMN: PROGRESSION / LEARNING SIDEBAR (4 Cols) */}
        {/* ══════════════════════════════════════════════════════════ */}
        <aside className="lg:col-span-4 space-y-6 lg:border-l lg:border-[#1C1C1C] lg:pl-8">
          {/* Status & Time Box */}
          <div className="p-4 rounded-sm border border-[#202020] bg-[#111111] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-[#737373]">Status</span>
              <StatusBadge status={item.status} size="sm" />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1E1E1E]">
              <span className="text-[11px] font-mono uppercase text-[#737373] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#555555]" /> Time Invested
              </span>
              <span className="text-xs font-mono font-medium text-white">
                {workTime.totalMinutes > 0 ? workTime.formatted : '00h 00m'}
              </span>
            </div>

            {totalMilestones > 0 && (
              <div className="flex items-center justify-between pt-2 border-t border-[#1E1E1E]">
                <span className="text-[11px] font-mono uppercase text-[#737373]">Milestones</span>
                <span className="text-xs font-mono text-[#86efac]">
                  {completedMilestones} / {totalMilestones} completed
                </span>
              </div>
            )}
          </div>

          {/* PIPELINE ARCHITECTURE SUMMARY */}
          {item.pipelineStages && item.pipelineStages.length > 0 && (
            <div className="space-y-3 p-4 rounded-sm border border-[#222222] bg-[#111111]">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#A0A0A0]">
                  Diagnostic Pipeline
                </h3>
                <span className="text-[10px] font-mono text-[#86EFAC]">
                  {item.pipelineStages.filter(s => s.status === 'completed').length} / {item.pipelineStages.length} Done
                </span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                {item.pipelineStages.map(stage => (
                  <div key={stage.id} className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rotate-45 inline-block shrink-0 ${
                          stage.status === 'completed'
                            ? 'bg-[#22C55E]'
                            : stage.status === 'current'
                            ? 'bg-[#3B82F6] ring-2 ring-[#3B82F6]/40'
                            : stage.status === 'next'
                            ? 'bg-[#EAB308]'
                            : 'bg-[#333333]'
                        }`}
                      />
                      <span
                        className={`truncate max-w-[160px] ${
                          stage.status === 'current'
                            ? 'text-white font-medium'
                            : stage.status === 'completed'
                            ? 'text-[#CCCCCC]'
                            : 'text-[#777777]'
                        }`}
                      >
                        {stage.step}. {stage.title}
                      </span>
                    </span>
                    <span
                      className={`text-[9px] uppercase px-1 rounded-sm ${
                        stage.status === 'completed'
                          ? 'text-[#86EFAC] bg-[#0E2416]'
                          : stage.status === 'current'
                          ? 'text-[#93C5FD] bg-[#16253D]'
                          : stage.status === 'next'
                          ? 'text-[#FDE047] bg-[#261E10]'
                          : 'text-[#666666]'
                      }`}
                    >
                      {stage.status === 'completed' ? 'done' : stage.status === 'current' ? 'active' : stage.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MILESTONES / RESEARCH CHECKLIST (Subtle, non-gamified) */}
          {item.milestones && item.milestones.length > 0 && (
            <div className="space-y-3 p-4 rounded-sm border border-[#1E1E1E] bg-[#0E0E0E]">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#A0A0A0]">
                  Milestones
                </h3>
                <span className="text-[10px] font-mono text-[#555555]">
                  {completedMilestones}/{totalMilestones}
                </span>
              </div>

              <div className="space-y-2">
                {item.milestones.map(m => (
                  <div
                    key={m.id}
                    className="flex items-start gap-2 text-xs font-mono"
                  >
                    <span className="mt-0.5 select-none text-[#737373]">
                      {m.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-[#93c5fd]" />}
                      {m.status === 'current' && <span className="text-[#86efac]">◐</span>}
                      {(m.status === 'next' || m.status === 'planned') && <Circle className="w-3.5 h-3.5 text-[#555555]" />}
                      {m.status === 'blocked' && <span className="text-[#fca5a5]">✕</span>}
                    </span>
                    <div className="flex-1 space-y-0.5">
                      <span className={m.status === 'completed' ? 'text-[#888888] line-through' : 'text-[#E0E0E0]'}>
                        {m.title}
                      </span>
                      {m.description && (
                        <p className="text-[11px] font-sans text-[#666666] leading-tight">
                          {m.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WHAT I NEEDED TO KNOW / PREREQUISITES */}
          {((item.whatINeededToKnow && item.whatINeededToKnow.length > 0) || prerequisitesList.length > 0) && (
            <div className="space-y-3 p-4 rounded-sm border border-[#1E1E1E] bg-[#0E0E0E]">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#A0A0A0]">
                Prerequisites & Knowledge
              </h3>

              {item.whatINeededToKnow && item.whatINeededToKnow.length > 0 && (
                <div className="space-y-1.5 pb-2">
                  <div className="text-[10px] font-mono text-[#666666] uppercase">
                    What I needed to know
                  </div>
                  <ul className="list-disc list-inside text-xs font-mono text-[#B0B0B0] space-y-0.5">
                    {item.whatINeededToKnow.map((concept, i) => (
                      <li key={i}>{concept}</li>
                    ))}
                  </ul>
                </div>
              )}

              {prerequisitesList.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-[#1C1C1C]">
                  <div className="text-[10px] font-mono text-[#666666] uppercase">
                    Dependencies
                  </div>
                  <div className="space-y-1">
                    {prerequisitesList.map(prereq => (
                      <div
                        key={prereq.id}
                        className="flex items-center justify-between text-xs font-mono text-[#CCCCCC]"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="text-[#737373]">
                            {prereq.status === 'completed' ? '✓' : prereq.status === 'current' ? '◐' : '○'}
                          </span>
                          {prereq.targetSlug ? (
                            <button
                              onClick={() => {
                                if (prereq.targetType === 'writing') onNavigate('article', prereq.targetSlug);
                                else if (prereq.targetType === 'field') onNavigate('fields', prereq.targetSlug);
                                else onNavigate('project', prereq.targetSlug);
                              }}
                              className="text-white hover:underline text-left inline-flex items-center gap-1"
                            >
                              {prereq.title} <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                            </button>
                          ) : (
                            <span>{prereq.title}</span>
                          )}
                        </span>
                        {prereq.status && (
                          <span className="text-[10px] text-[#666666]">
                            [{prereq.status}]
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* LEARNING TRAIL (Vertical Chronological Steps) */}
          {item.learningTrail && item.learningTrail.length > 0 && (
            <div className="space-y-3 p-4 rounded-sm border border-[#1E1E1E] bg-[#0E0E0E]">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#A0A0A0]">
                  Learning Trail
                </h3>
                <span className="text-[10px] font-mono text-[#555555]">
                  Step sequence
                </span>
              </div>

              <div className="relative pl-3 space-y-4 border-l border-[#262626] ml-2">
                {item.learningTrail.map((trail, index) => {
                  const stepNum = String(trail.step || index + 1).padStart(2, '0');
                  return (
                    <div key={index} className="relative space-y-1">
                      {/* Trail Step indicator dot */}
                      <span className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-[#333333] border border-[#555555]" />
                      
                      <div className="flex items-baseline justify-between gap-1 text-xs font-mono">
                        <span className="text-[11px] text-[#737373] select-none font-semibold">
                          {stepNum}
                        </span>
                        <StatusBadge status={trail.status} size="sm" />
                      </div>

                      <div className="text-xs font-mono text-white">
                        {trail.title}
                      </div>

                      {trail.resourceRef && (
                        <div className="text-[11px] font-mono text-[#888888] bg-[#141414] p-1.5 rounded-sm border border-[#1E1E1E] space-y-0.5">
                          {trail.resourceRef.title && (
                            <div className="text-[#C0C0C0] font-medium">
                              {trail.resourceRef.title}
                            </div>
                          )}
                          {trail.resourceRef.author && (
                            <div>{trail.resourceRef.author}</div>
                          )}
                          {trail.resourceRef.chapters && (
                            <div className="text-[#86efac]">{trail.resourceRef.chapters}</div>
                          )}
                          {trail.resourceRef.notes && (
                            <div className="text-[#737373] italic">"{trail.resourceRef.notes}"</div>
                          )}
                        </div>
                      )}

                      {trail.description && (
                        <p className="text-[11px] font-sans text-[#737373]">
                          {trail.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Field Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="space-y-2 p-3 rounded-sm border border-[#1A1A1A] bg-[#0E0E0E]">
              <div className="text-[10px] font-mono uppercase text-[#666666]">
                Keywords & Index Tags
              </div>
              <div className="flex flex-wrap gap-1">
                {item.tags.map(t => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 text-[10px] font-mono rounded-sm bg-[#141414] border border-[#222222] text-[#888888]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
      )}
    </div>
  );
};

