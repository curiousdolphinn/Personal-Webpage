import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, BookOpen, ChevronDown, ChevronUp, Book, ExternalLink } from 'lucide-react';
import {
  getFieldBySlug,
  getWorkByField,
  getWritingByField,
  getProjectsByField,
  getRelatedFields,
  getFieldStats,
  getLearningItemsForField,
  getResourcesForField
} from '../lib/fieldUtils';
import { getRecordedTimeByField, getRecordedTimeByWork } from '../lib/activityUtils';
import { getResourceById } from '../content/resources';
import { StatusBadge } from '../components/StatusBadge';

interface FieldDetailViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
}

export const FieldDetailView: React.FC<FieldDetailViewProps> = ({ slug, onNavigate }) => {
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  const [expandedTrackChapters, setExpandedTrackChapters] = useState<Record<string, boolean>>({});
  const field = getFieldBySlug(slug);

  if (!field) {
    return (
      <div className="py-20 text-center space-y-4">
        <h1 className="font-serif text-2xl text-white">Field Not Found</h1>
        <p className="text-sm text-[#737373] font-sans">
          The requested field "{slug}" does not exist in the research registry.
        </p>
        <button
          onClick={() => onNavigate('fields')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-white bg-[#1A1A1A] border border-[#2A2A2A] rounded-sm hover:border-[#444444] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Fields
        </button>
      </div>
    );
  }

  const workItems = getWorkByField(field.slug);
  const projects = getProjectsByField(field.slug);
  const writing = getWritingByField(field.slug);
  const learningItems = getLearningItemsForField(field.slug);
  const resources = getResourcesForField(field.slug);
  const relatedFields = getRelatedFields(field);
  const stats = getFieldStats(field.slug);
  const fieldTime = getRecordedTimeByField(field.slug);

  return (
    <article className="space-y-12 py-8 sm:py-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8E97A8] border-b border-[#232734] pb-4">
        <button
          onClick={() => onNavigate('fields')}
          className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[42px] rounded-md bg-[#161924] border border-[#2D3446] text-[#E2E8F0] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] transition-all text-xs font-mono active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-sky-400" /> Back to All Fields
        </button>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#8E97A8]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span className="text-[#414B64]">/</span>
            <button
              onClick={() => onNavigate('fields')}
              className="hover:text-white transition-colors"
            >
              Fields
            </button>
            <span className="text-[#414B64]">/</span>
            <span className="text-white font-medium">{field.shortTitle || field.title}</span>
          </div>

          <button
            onClick={() => onNavigate('profile')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-md bg-[#161924] border border-[#2D3446] text-[#CBD5E1] hover:text-white hover:border-[#414B64] transition-all text-xs font-mono active:scale-95 shadow-sm"
          >
            <Clock className="w-3.5 h-3.5 text-sky-400" /> Profile & Time
          </button>
        </div>
      </div>

      {/* Field Hub Header */}
      <header className="space-y-4 border-b border-[#1E1E1E] pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-sm bg-[#141414] border border-[#262626] text-[11px] font-mono text-[#888888]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
            <span>Organizational Field</span>
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#141414] border border-[#262626] text-xs font-mono text-[#888888]">
            <span>Recorded Focus:</span>
            <strong className="text-[#86efac] font-medium">{fieldTime.formatted}</strong>
            <span className="text-[#555555]">({fieldTime.count} sessions)</span>
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15]">
          {field.title}
        </h1>

        {field.tagline && (
          <p className="text-base sm:text-lg font-serif italic text-[#A3A3A3] leading-relaxed">
            &ldquo;{field.tagline}&rdquo;
          </p>
        )}

        <p className="text-sm sm:text-base text-[#CCCCCC] font-sans max-w-3xl leading-relaxed">
          {field.description}
        </p>
      </header>

      {/* Why I Explore This Field */}
      {field.whyExploring && (
        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[#737373]">
            Why I Explore This Field
          </h2>
          <div className="p-5 sm:p-6 rounded-sm border border-[#1E1E1E] bg-[#121212] text-sm sm:text-base text-[#C4C4C4] font-sans leading-relaxed">
            {field.whyExploring}
          </div>
        </section>
      )}

      {/* Questions I'm Thinking About */}
      {field.questions && field.questions.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#737373]">
              Questions I'm Thinking About
            </h2>
            <span className="font-mono text-[11px] text-[#555555]">
              {field.questions.length} Active Inquiries
            </span>
          </div>

          <div className="space-y-2.5">
            {field.questions.map((q, idx) => (
              <div
                key={idx}
                className="p-4 rounded-sm border border-[#1A1A1A] bg-[#101010] flex items-start gap-3"
              >
                <span className="font-mono text-xs text-[#555555] shrink-0 mt-0.5">
                  0{idx + 1}.
                </span>
                <p className="font-serif italic text-sm text-[#DDDDDD] leading-relaxed">
                  &ldquo;{q}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CURRENT STUDY & LEARNING IN THIS FIELD */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E1E1E]">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#737373]">
              Field Learning & Studies
            </h2>
            <p className="text-xs text-[#888888] font-sans mt-0.5">
              Active syllabi, textbooks, and topics under study in this domain.
            </p>
          </div>
          <span className="font-mono text-xs text-[#555555]">
            {learningItems.length} Topics
          </span>
        </div>

        {learningItems.length === 0 ? (
          <div className="p-6 rounded-sm border border-dashed border-[#222222] bg-[#0E0E0E] text-center font-mono text-xs text-[#666666]">
            No active studies or learning items listed for this field.
          </div>
        ) : (
          <div className="space-y-4">
            {learningItems.map((study, idx) => {
              const attachedResources = (study.resources || [])
                .map(rId => getResourceById(rId))
                .filter((r): r is NonNullable<typeof r> => Boolean(r));

              return (
                <div
                  key={study.id || idx}
                  className="p-5 rounded-sm border border-[#1E1E1E] bg-[#121212] transition-colors"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Study Topic Details */}
                    <div className={attachedResources.length > 0 ? "lg:col-span-7 space-y-3" : "lg:col-span-12 space-y-3"}>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-[#666666] tracking-wider">
                          Study Track 0{idx + 1}
                        </span>
                        {study.status && (
                          <StatusBadge status={study.status} size="sm" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-serif text-lg font-medium text-white">
                          {study.title}
                        </h3>
                        {study.subtitle && (
                          <p className="text-xs text-[#A3A3A3] font-sans leading-relaxed">
                            {study.subtitle}
                          </p>
                        )}
                      </div>

                      {study.description && (
                        <p className="text-xs text-[#888888] font-sans leading-relaxed">
                          {study.description}
                        </p>
                      )}

                      {study.topics && study.topics.length > 0 && (
                        <div className="pt-1 flex flex-wrap gap-1.5">
                          {study.topics.map((t, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#161616] text-[#737373] border border-[#222222]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {study.notes && (
                        <div className="pt-2 border-t border-[#1C1C1C] flex items-center gap-2 text-[11px] font-mono text-[#666666]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#737373]" />
                          <span>{study.notes}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Attached Literature & Textbooks */}
                    {attachedResources.length > 0 && (
                      <div className="lg:col-span-5 lg:border-l lg:border-[#1E1E1E] lg:pl-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#737373] flex items-center gap-1.5">
                            <Book className="w-3 h-3 text-[#737373]" />
                            Textbook & Literature
                          </span>
                          <span className="text-[10px] font-mono text-[#555555]">
                            {attachedResources[0]?.chapters?.length || 0} Ch.
                          </span>
                        </div>

                        {attachedResources.map(res => (
                          <div
                            key={res.id}
                            className="p-3.5 rounded-sm bg-[#0E0E0E] border border-[#1A1A1A] space-y-2.5"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-serif text-sm font-medium text-white leading-snug">
                                  {res.title}
                                </h4>
                                {res.author && (
                                  <p className="text-[11px] font-mono text-[#737373] mt-0.5">
                                    {res.author}
                                  </p>
                                )}
                              </div>
                              <span className="shrink-0 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm bg-[#161616] text-[#888888] border border-[#262626]">
                                {res.purpose?.replace('-', ' ') || 'textbook'}
                              </span>
                            </div>

                            {res.notes && (
                              <p className="text-[11px] font-sans text-[#888888] italic leading-relaxed">
                                &ldquo;{res.notes}&rdquo;
                              </p>
                            )}

                            {res.url && (
                              <div className="pt-0.5">
                                <a
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#93C5FD] hover:text-white transition-colors bg-[#132035] px-2 py-0.5 rounded-sm border border-[#1E3A5F]"
                                >
                                  <ExternalLink className="w-3 h-3 text-[#93C5FD]" />
                                  <span>Lecture Course Playlist ↗</span>
                                </a>
                              </div>
                            )}

                            {res.chapters && res.chapters.length > 0 && (() => {
                              const isCourse = res.type === 'course' || res.purpose === 'companion-lecture-series';
                              const completedChapters = res.chapters.filter(c => c.status === 'completed').length;
                              const readingChapters = res.chapters.filter(c => c.status === 'reading').length;
                              const pct = Math.round((completedChapters / res.chapters.length) * 100);
                              const isTrackExpanded = !!expandedTrackChapters[res.id];
                              const displayedChapters = isTrackExpanded ? res.chapters : res.chapters;

                              return (
                                <div className="pt-2 border-t border-[#181818] space-y-1.5">
                                  <div className="flex items-center justify-between text-[10px] font-mono text-[#666666]">
                                    <span>
                                      {isCourse
                                        ? `All Video Lectures (${res.chapters.length} Parts)`
                                        : `Curriculum Chapters (${res.chapters.length})`}
                                    </span>
                                    <span className="text-[#888888]">
                                      {completedChapters > 0
                                        ? `${completedChapters}/${res.chapters.length} (${pct}%)`
                                        : readingChapters > 0
                                        ? `Reading In Progress`
                                        : `0% (0 hrs)`}
                                    </span>
                                  </div>

                                  <div className={`space-y-1 overflow-y-auto pr-1 transition-all ${isTrackExpanded ? 'max-h-[32rem]' : 'max-h-72'}`}>
                                    {displayedChapters.map((ch) => {
                                      const isLecture = ch.title.toLowerCase().startsWith('lecture');
                                      return (
                                        <div
                                          key={ch.chapterNumber}
                                          className="p-1.5 rounded-sm bg-[#141414] hover:bg-[#181818] text-[#A3A3A3] space-y-1 transition-colors"
                                        >
                                          <div className="flex items-center justify-between text-[10px] font-mono gap-2">
                                            <span className="truncate pr-1">
                                              {!isLecture && (
                                                <strong className="text-[#666666] font-normal">Ch {ch.chapterNumber}. </strong>
                                              )}
                                              <span className={ch.status === 'completed' ? 'text-[#E5E5E5]' : ''}>
                                                {ch.title}
                                              </span>
                                            </span>
                                            <span
                                              className={`shrink-0 text-[9px] uppercase px-1.5 py-0.5 rounded-sm border ${
                                                ch.status === 'reading'
                                                  ? 'bg-[#132219] text-[#86EFAC] border-[#1D3E2B]'
                                                  : ch.status === 'completed'
                                                  ? 'bg-[#152338] text-[#93C5FD] border-[#1E3A5F]'
                                                  : ch.status === 'next'
                                                  ? 'bg-[#2A2012] text-[#FDE047] border-[#443419]'
                                                  : 'bg-[#1A1A1A] text-[#666666] border-[#242424]'
                                              }`}
                                            >
                                              {ch.status}
                                            </span>
                                          </div>
                                          {ch.articleSlug && (
                                            <div className="pt-0.5">
                                              <button
                                                onClick={() => onNavigate('article', ch.articleSlug)}
                                                className="text-[10px] font-mono text-[#86EFAC] hover:underline flex items-center gap-1"
                                              >
                                                <span>Study Note: Group 1.1 — The Devil of Associativity →</span>
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {res.chapters.length > 5 && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setExpandedTrackChapters(prev => ({
                                          ...prev,
                                          [res.id]: !prev[res.id]
                                        }))
                                      }
                                      className="w-full text-center py-1 text-[10px] font-mono text-[#93C5FD] hover:text-white transition-colors bg-[#111111] hover:bg-[#161616] rounded-sm border border-[#222222]"
                                    >
                                      {isTrackExpanded
                                        ? `Compact view ↑`
                                        : `Expand complete ${res.chapters.length}-part syllabus (${res.chapters.length} parts listed) ↓`}
                                    </button>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* FIELD RESOURCES & LITERATURE */}
      {resources.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E1E1E]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#737373]" />
              <h2 className="font-mono text-xs uppercase tracking-wider text-[#737373]">
                Domain Literature & Resources
              </h2>
            </div>
            <span className="font-mono text-xs text-[#555555]">
              {resources.length} Sources
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((res) => {
              const isExpanded = expandedResource === res.id;

              return (
                <div
                  key={res.id}
                  className="p-5 rounded-sm border border-[#1E1E1E] bg-[#121212] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-[#737373]">
                        {res.purpose?.replace('-', ' ') || res.type}
                      </span>
                      {res.status && <StatusBadge status={res.status} size="sm" />}
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-medium text-white">{res.title}</h3>
                      {res.author && <p className="text-xs font-mono text-[#737373] mt-0.5">{res.author}</p>}
                    </div>
                    {res.notes && (
                      <p className="text-xs font-sans text-[#888888] leading-relaxed italic">
                        &ldquo;{res.notes}&rdquo;
                      </p>
                    )}

                    {res.url && (
                      <div className="pt-1">
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#93C5FD] hover:text-white transition-colors bg-[#132035] px-2.5 py-1 rounded-sm border border-[#1E3A5F]"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#93C5FD]" />
                          <span>Watch Lecture Playlist ({res.author ? res.author.split('(')[0].trim() : 'YouTube'}) ↗</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {res.chapters && res.chapters.length > 0 && (
                    <div className="pt-3 border-t border-[#1C1C1C] space-y-2">
                      <button
                        onClick={() => setExpandedResource(isExpanded ? null : res.id)}
                        className="w-full flex items-center justify-between text-xs font-mono text-[#888888] hover:text-white transition-colors"
                      >
                        <span>
                          {res.type === 'course' || res.purpose === 'companion-lecture-series'
                            ? `Complete Video Lecture Series (${res.chapters.length} Parts)`
                            : `Chapter Syllabus (${res.chapters.length} chapters)`}
                        </span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <div className="space-y-1.5 pt-1.5">
                          {res.chapters.map((ch) => {
                            const isLecture = ch.title.toLowerCase().startsWith('lecture');
                            return (
                              <div
                                key={ch.chapterNumber}
                                className="p-2 rounded-sm bg-[#0E0E0E] border border-[#181818] space-y-1"
                              >
                                <div className="flex items-center justify-between text-[11px] font-mono gap-2">
                                  <span className="text-white">
                                    {!isLecture && <span className="text-[#666666]">Ch {ch.chapterNumber}. </span>}
                                    {ch.title}
                                  </span>
                                <span
                                  className={`text-[9px] uppercase px-1.5 py-0.5 rounded-sm border ${
                                    ch.status === 'reading'
                                      ? 'bg-[#132219] text-[#86EFAC] border-[#1D3E2B]'
                                      : ch.status === 'completed'
                                      ? 'bg-[#152338] text-[#93C5FD] border-[#1E3A5F]'
                                      : ch.status === 'next'
                                      ? 'bg-[#2A2012] text-[#FDE047] border-[#443419]'
                                      : 'bg-[#161616] text-[#737373] border-[#222222]'
                                  }`}
                                >
                                  {ch.status}
                                </span>
                              </div>
                              {ch.notes && (
                                <p className="text-[10px] text-[#737373] font-sans">
                                  {ch.notes}
                                </p>
                              )}
                              {ch.articleSlug && (
                                <div className="pt-1">
                                  <button
                                    onClick={() => onNavigate('article', ch.articleSlug)}
                                    className="inline-flex items-center gap-1 text-[10px] font-mono text-[#86EFAC] hover:underline"
                                  >
                                    <span>Read Study Note: Group 1.1 — The Devil of Associativity →</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Work in this Field */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E1E1E]">
          <h2 className="font-serif text-xl font-medium text-white">
            Work in this Field
          </h2>
          <span className="font-mono text-xs text-[#555555]">
            {projects.length} Entries
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 rounded-sm border border-dashed border-[#222222] bg-[#0E0E0E] text-center space-y-2">
            <div className="font-mono text-xs text-[#737373] uppercase tracking-wider">
              NO RECENT WORK
            </div>
            <p className="font-serif italic text-sm text-[#555555]">
              This notebook is still being written.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map(item => {
              const timeData = getRecordedTimeByWork(item.id || item.slug);

              return (
                <div
                  key={item.id}
                  onClick={() => onNavigate('projects', item.slug)}
                  className="p-4 sm:p-5 rounded-sm border border-[#1E1E1E] bg-[#121212] hover:border-[#333333] cursor-pointer transition-colors space-y-2 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base font-medium text-white group-hover:text-[#CCCCCC] transition-colors">
                        {item.title}
                      </h3>
                      <StatusBadge status={item.status} size="sm" />
                      {timeData.totalMinutes > 0 && (
                        <span className="text-[11px] font-mono text-[#86efac]">
                          {timeData.formatted}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-[#555555]">
                      {item.date} · {item.type.replace('-', ' ')}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Writing in this Field */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E1E1E]">
          <h2 className="font-serif text-xl font-medium text-white">
            Writing in this Field
          </h2>
          <span className="font-mono text-xs text-[#555555]">
            {writing.length} Essays
          </span>
        </div>

        {writing.length === 0 ? (
          <div className="p-8 rounded-sm border border-dashed border-[#222222] bg-[#0E0E0E] text-center space-y-2">
            <div className="font-mono text-xs text-[#737373] uppercase tracking-wider">
              NO WRITING YET
            </div>
            <p className="font-serif italic text-sm text-[#555555]">
              Nothing published here yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#1A1A1A]">
            {writing.map(article => (
              <div
                key={article.id}
                onClick={() => onNavigate('writing', article.slug)}
                className="py-4 group cursor-pointer transition-colors space-y-1.5"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-base font-medium text-white group-hover:text-[#CCCCCC] transition-colors">
                    {article.title}
                  </h3>
                  <span className="text-xs font-mono text-[#555555]">
                    {article.date} · {article.readingTime || '4 min read'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#888888] font-sans leading-relaxed">
                  {article.summary}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Related Fields */}
      {relatedFields.length > 0 && (
        <section className="space-y-3 pt-4 border-t border-[#1E1E1E]">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[#737373]">
            Related Fields
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedFields.map(rf => (
              <div
                key={rf.id}
                onClick={() => onNavigate('fields', rf.slug)}
                className="p-4 rounded-sm border border-[#1E1E1E] bg-[#121212] hover:border-[#333333] cursor-pointer transition-colors space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-medium text-white group-hover:text-[#CCCCCC]">
                    {rf.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#666666] group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs text-[#888888] font-sans line-clamp-1">
                  {rf.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
