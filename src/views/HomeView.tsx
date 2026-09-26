import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Github, Mail } from 'lucide-react';
import { siteConfig } from '../content/siteConfig';
import { nowData } from '../content/now';
import { workData } from '../content/work';
import { getAllFields, getFieldStats, getFieldBadges } from '../lib/fieldUtils';
import { calculateTimeSinceBirth, calculateTimeSinceReference } from '../lib/timeUtils';
import { getTotalRecordedTime, getRecordedTimeByWork } from '../lib/activityUtils';
import { StatusBadge } from '../components/StatusBadge';

interface HomeViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const fields = getAllFields();
  const publicWork = useMemo(() => workData.filter(w => w.visibility === 'public'), []);
  const recentWork = useMemo(() => publicWork.slice(0, 5), [publicWork]);
  const recentWriting = useMemo(() => publicWork.filter(w => w.type === 'writing').slice(0, 3), [publicWork]);

  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeSinceBirth = useMemo(() => {
    return calculateTimeSinceBirth(siteConfig.dateOfBirth, now);
  }, [now]);

  const timeSinceRef = useMemo(() => {
    return calculateTimeSinceReference(siteConfig.lifeReferenceDate, now);
  }, [now]);

  const totalWork = useMemo(() => getTotalRecordedTime(), []);

  return (
    <div className="space-y-14 sm:space-y-18 py-8 sm:py-12">
      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. IDENTITY & QUALIFICATION HEADER */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="identity-header" className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-[#888888]">
            <span className="text-white font-medium">{siteConfig.degree}</span>
            <span className="text-[#444444]">·</span>
            <span>{siteConfig.institution}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
            {siteConfig.name}
          </h1>
        </div>

        {/* Index Links (Tactile, clearly clickable navigation chips with min 42px touch height) */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-mono">
          <button
            id="hero-btn-fields"
            onClick={() => onNavigate('fields')}
            className="px-3.5 py-2 min-h-[42px] rounded-md bg-[#161924] border border-[#2D3446] text-[#E2E8F0] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] transition-all flex items-center gap-2 active:scale-95 shadow-sm"
          >
            <span className="font-medium text-white">Fields Hub</span>
            <span className="text-[#8892A4]">({fields.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </button>
          <button
            id="hero-btn-projects"
            onClick={() => onNavigate('projects')}
            className="px-3.5 py-2 min-h-[42px] rounded-md bg-[#161924] border border-[#2D3446] text-[#E2E8F0] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] transition-all flex items-center gap-2 active:scale-95 shadow-sm"
          >
            <span>Work Archive</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </button>
          <button
            id="hero-btn-writing"
            onClick={() => onNavigate('writing')}
            className="px-3.5 py-2 min-h-[42px] rounded-md bg-[#161924] border border-[#2D3446] text-[#E2E8F0] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] transition-all flex items-center gap-2 active:scale-95 shadow-sm"
          >
            <span>Writing</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </button>
          <button
            id="hero-btn-profile"
            onClick={() => onNavigate('profile')}
            className="px-3.5 py-2 min-h-[42px] rounded-md bg-[#161924] border border-[#2D3446] text-[#CBD5E1] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] transition-all flex items-center gap-2 active:scale-95 shadow-sm"
          >
            <span>Profile & CV</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>

        {/* Contact Coordinates */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#8E97A8]">
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-white flex items-center gap-1.5 transition-colors text-[#CBD5E1] py-1"
          >
            <Mail className="w-3.5 h-3.5 text-sky-400" /> {siteConfig.email}
          </a>
          {siteConfig.github && (
            <>
              <span className="text-[#353D52]">·</span>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1.5 transition-colors text-[#CBD5E1] py-1"
              >
                <Github className="w-3.5 h-3.5 text-sky-400" /> GitHub
              </a>
            </>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 2. SMALL TIME SNAPSHOT WIDGET */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="time-snapshot-widget">
        <div
          onClick={() => onNavigate('profile')}
          className="p-5 rounded-md border border-[#282E3E] bg-[#141722] hover:border-[#3E475E] hover:bg-[#191D2B] active:bg-[#1F2436] active:scale-[0.99] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-sm select-none"
        >
          <div className="flex items-center gap-3.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div className="space-y-0.5">
              <div className="font-mono text-[11px] tracking-wider uppercase text-[#8E97A8] flex items-center gap-2">
                <span>TIME SINCE BIRTH</span>
                <span className="text-[#414B64]">·</span>
                <span>
                  {siteConfig.lifeReferenceLabel.toUpperCase()}: {timeSinceRef.isFuture ? '0H (STARTS SEP 5)' : `${timeSinceRef.totalHoursFormatted}H`}
                </span>
              </div>
              <div className="font-mono text-sm sm:text-base text-white">
                <strong className="font-medium text-white">{timeSinceBirth.totalHoursFormatted} hours</strong>
                <span className="text-[#94A3B8] text-xs font-normal ml-2">({timeSinceBirth.years}y {timeSinceBirth.months}m {timeSinceBirth.days}d)</span>
                <span className="text-[#414B64] mx-2">·</span>
                <span className="text-[#4ADE80] text-xs font-mono font-medium">{totalWork.formatted} recorded work</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-sky-400 group-hover:text-sky-300 transition-colors shrink-0 font-medium">
            <span>Inspect Profile Ledger</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 3. CURRENT QUESTIONS */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="current-questions-section" className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#232734]">
          <div className="font-mono text-xs tracking-wider uppercase text-[#94A3B8]">
            Current Questions
          </div>
          <span className="font-mono text-[11px] text-[#78849E]">
            Active Inquiries · {nowData.lastUpdated}
          </span>
        </div>

        <div className="p-5 sm:p-6 rounded-md border border-[#262B38] bg-[#151822] space-y-4 shadow-sm">
          <p className="text-sm sm:text-base font-serif italic text-[#F1F5F9] leading-relaxed">
            &ldquo;{nowData.currentQuestion}&rdquo;
          </p>

          <div className="pt-3 border-t border-[#232734] grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
            {fields.map(f => (
              <div key={f.id} className="flex items-start gap-2">
                <span className="font-mono text-[11px] text-sky-400 shrink-0 font-medium">[{f.shortTitle || f.title}]:</span>
                <span className="leading-relaxed text-[#CBD5E1]">{f.questions[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 4. FIELDS HUBS */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="fields-section" className="space-y-5">
        <div className="flex items-baseline justify-between pb-2 border-b border-[#232734]">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1">
              Organizational Hubs
            </div>
            <h2 className="font-serif text-2xl font-medium tracking-tight text-white">
              Fields
            </h2>
          </div>
          <button
            id="view-all-fields-link"
            onClick={() => onNavigate('fields')}
            className="text-xs font-mono min-h-[38px] px-3.5 py-1.5 rounded-md bg-[#161924] border border-[#2D3446] text-[#CBD5E1] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <span>All {fields.length} Fields Hub</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, idx) => {
            const stats = getFieldStats(field.slug);

            return (
              <div
                key={field.id}
                id={`home-field-card-${field.slug}`}
                onClick={() => onNavigate('fields', field.slug)}
                className="p-5 sm:p-6 rounded-md border border-[#262B38] bg-[#151822] hover:border-[#3E465B] hover:bg-[#1A1E2B] active:bg-[#202536] active:scale-[0.99] transition-all cursor-pointer space-y-3.5 flex flex-col justify-between group shadow-sm select-none"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#8E97A8] font-medium">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-mono text-sky-400 group-hover:text-sky-300 flex items-center gap-1 transition-colors font-medium">
                      Enter Field <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="font-serif font-medium text-lg text-white group-hover:text-sky-300 transition-colors">
                    {field.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A0AEC0] font-sans leading-relaxed line-clamp-2">
                    {field.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#232734] flex items-center justify-between text-[11px] font-mono text-[#8E97A8]">
                  <span>{stats.workCount} items · {field.currentStudy?.length || 0} studies</span>
                  <span className="text-sky-400 group-hover:text-white transition-colors">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 5. RECENT WORK */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="recent-work-section" className="space-y-5">
        <div className="flex items-baseline justify-between pb-2 border-b border-[#232734]">
          <h2 className="font-serif text-2xl font-medium tracking-tight text-white">
            Recent Work
          </h2>
          <button
            id="view-all-projects-link"
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono min-h-[38px] px-3.5 py-1.5 rounded-md bg-[#161924] border border-[#2D3446] text-[#CBD5E1] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <span>All Work Archive ({publicWork.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>

        {recentWork.length === 0 ? (
          <div className="p-8 rounded-md border border-dashed border-[#2B3040] bg-[#12141D] text-center space-y-2">
            <div className="font-mono text-xs text-[#8E97A8] uppercase tracking-wider">
              NO RECENT WORK
            </div>
            <p className="font-serif italic text-sm text-[#78849E]">
              This notebook is still being written.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {recentWork.map(work => {
              const timeInvested = getRecordedTimeByWork(work.id || work.slug);
              const fieldBadges = getFieldBadges(work.fields);

              return (
                <div
                  key={work.id}
                  id={`home-work-item-${work.slug}`}
                  onClick={() => onNavigate('projects', work.slug)}
                  className="p-5 sm:p-6 rounded-md border border-[#262B38] bg-[#151822] hover:border-[#3E465B] hover:bg-[#1A1E2B] active:bg-[#202536] active:scale-[0.99] transition-all cursor-pointer space-y-2.5 group shadow-sm select-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-serif text-base sm:text-lg font-medium text-white group-hover:text-sky-300 transition-colors">
                        {work.title}
                      </h3>
                      <StatusBadge status={work.status} size="sm" />
                      {timeInvested.totalMinutes > 0 && (
                        <span className="text-[11px] font-mono text-[#4ADE80] font-medium">
                          {timeInvested.formatted} invested
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-[#8E97A8] shrink-0">
                      {work.date} · {work.type.replace('-', ' ')}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A0AEC0] font-sans leading-relaxed line-clamp-2">
                    {work.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#232734]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {fieldBadges.map(fb => (
                        <span
                          key={fb.slug}
                          className="px-2.5 py-0.5 text-[10px] font-mono text-[#CBD5E1] bg-[#1B1F2D] rounded-sm border border-[#2E364A]"
                        >
                          {fb.title}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-mono text-sky-400 group-hover:text-sky-300 flex items-center gap-1 transition-colors font-medium">
                      Inspect details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 6. RECENT WRITING */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="recent-writing-section" className="space-y-5">
        <div className="flex items-baseline justify-between pb-2 border-b border-[#232734]">
          <h2 className="font-serif text-2xl font-medium tracking-tight text-white">
            Recent Writing
          </h2>
          <button
            id="view-all-writing-link"
            onClick={() => onNavigate('writing')}
            className="text-xs font-mono min-h-[38px] px-3.5 py-1.5 rounded-md bg-[#161924] border border-[#2D3446] text-[#CBD5E1] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <span>All Writing</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>

        {recentWriting.length === 0 ? (
          <div className="p-8 rounded-md border border-dashed border-[#2B3040] bg-[#12141D] text-center space-y-2">
            <div className="font-mono text-xs text-[#8E97A8] uppercase tracking-wider">
              NO WRITING YET
            </div>
            <p className="font-serif italic text-sm text-[#78849E]">
              Nothing published here yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {recentWriting.map(article => (
              <div
                key={article.id}
                id={`home-article-row-${article.slug}`}
                onClick={() => onNavigate('writing', article.slug)}
                className="p-5 sm:p-6 rounded-md border border-[#262B38] bg-[#151822] hover:border-[#3E465B] hover:bg-[#1A1E2B] active:bg-[#202536] active:scale-[0.99] transition-all cursor-pointer space-y-2.5 group shadow-sm select-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-white group-hover:text-sky-300 transition-colors">
                    {article.title}
                  </h3>
                  <span className="text-xs font-mono text-[#8E97A8] shrink-0">
                    {article.date} · {article.readingTime || '4 min read'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#A0AEC0] font-sans leading-relaxed line-clamp-2">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-[#232734]">
                  <span className="text-xs font-mono text-sky-400 group-hover:text-sky-300 flex items-center gap-1 transition-colors font-medium">
                    Read Essay <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
