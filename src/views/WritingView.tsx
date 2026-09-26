import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, ArrowRight, Clock, Bookmark, ExternalLink } from 'lucide-react';
import { workData } from '../content/work';
import { goodReadsData } from '../content/writing';
import { getRecordedTimeByWork } from '../lib/activityUtils';
import { getFieldBadges } from '../lib/fieldUtils';

interface WritingViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const WritingView: React.FC<WritingViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  const writingItems = useMemo(() => {
    return workData.filter(w => w.type === 'writing' && w.visibility === 'public');
  }, []);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    writingItems.forEach(w => (w.tags || []).forEach(t => tags.add(t)));
    return ['ALL', ...Array.from(tags)];
  }, [writingItems]);

  const filteredArticles = useMemo(() => {
    return writingItems.filter(article => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.tags && article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesTag = selectedTag === 'ALL' || (article.tags && article.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [writingItems, searchQuery, selectedTag]);

  return (
    <div className="space-y-10 py-8 sm:py-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[42px] rounded-md bg-[#161924] border border-[#2D3446] text-[#E2E8F0] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] transition-all text-xs font-mono active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-sky-400" /> Back to Home
          </button>
          <span className="font-mono text-xs text-[#8E97A8]">
            {writingItems.length} published essays
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
          Writing & Technical Exposition
        </h1>
        <p className="text-base text-[#CBD5E1] font-sans max-w-2xl leading-relaxed">
          Expositional notes on mathematics, system architectures, cryptographic primitives, and research inquiries.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-md border border-[#262B38] bg-[#151822] space-y-3.5 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title, concept, or topic..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#0D0F14] border border-[#262B38] rounded-md text-white placeholder-[#78849E] focus:outline-none focus:border-sky-400 font-sans min-h-[44px]"
          />
        </div>

        {/* Tag Pills */}
        {allTags.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="font-mono text-[#8E97A8] mr-1">
              Topic:
            </span>
            {allTags.map(tag => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-md font-mono transition-all min-h-[36px] flex items-center active:scale-95 ${
                    isSelected
                      ? 'bg-sky-400 text-[#09101F] font-semibold shadow-sm'
                      : 'bg-[#181D29] text-[#CBD5E1] hover:text-white border border-[#2A3142] hover:border-[#3D475E]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Articles List or Empty State */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 rounded-md border border-dashed border-[#2B3040] bg-[#12141D] text-center space-y-2">
          <div className="font-mono text-xs text-[#8E97A8] uppercase tracking-wider">
            NO WRITING YET
          </div>
          <p className="font-serif italic text-sm text-[#78849E]">
            Nothing published here yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map(article => {
            const timeData = getRecordedTimeByWork(article.id || article.slug);
            const fieldBadges = getFieldBadges(article.fields);

            return (
              <div
                key={article.id}
                onClick={() => onNavigate('writing', article.slug)}
                className="p-5 sm:p-6 rounded-md border border-[#262B38] bg-[#151822] hover:border-[#3E465B] hover:bg-[#1A1E2B] active:bg-[#202536] active:scale-[0.99] cursor-pointer transition-all space-y-3 group shadow-sm select-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="font-serif text-lg sm:text-xl font-medium text-white group-hover:text-sky-300 transition-colors">
                      {article.title}
                    </h2>
                    {timeData.totalMinutes > 0 && (
                      <span className="text-[11px] font-mono text-[#4ADE80] font-medium">
                        {timeData.formatted} written
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#8E97A8] shrink-0">
                    {article.date} · {article.readingTime || '4 min read'}
                  </span>
                </div>

                <p className="text-sm text-[#A0AEC0] font-sans leading-relaxed">
                  {article.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#232734]">
                  <div className="flex flex-wrap gap-1.5">
                    {fieldBadges.map(fb => (
                      <span
                        key={fb.slug}
                        className="px-2.5 py-0.5 text-[10px] font-mono text-[#CBD5E1] bg-[#1B1F2D] rounded-sm border border-[#2E364A]"
                      >
                        {fb.title}
                      </span>
                    ))}
                    {(article.tags || []).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono text-[#94A3B8] bg-[#131620] rounded-sm border border-[#232734]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-sky-400 group-hover:text-sky-300 flex items-center gap-1 transition-colors shrink-0 font-medium">
                    Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Good Reads / Recommended External Reading */}
      <section className="pt-10 border-t border-[#232734] space-y-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-sky-400" />
            <h2 className="font-serif text-2xl font-medium text-white">
              Good Reads
            </h2>
          </div>
          <p className="text-sm text-[#94A3B8] font-sans max-w-2xl leading-relaxed">
            Curated essays, foundational papers, and timeless external writings that have shaped my thinking.
          </p>
        </div>

        <div className="divide-y divide-[#232734] border-t border-b border-[#232734]">
          {goodReadsData.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-5 block group hover:bg-[#141722] -mx-3 px-3 rounded-md transition-colors space-y-2.5 active:bg-[#1A1E2B]"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif text-lg font-medium text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                    {item.title}
                    <ExternalLink className="w-3.5 h-3.5 text-[#78849E] group-hover:text-sky-300 transition-colors" />
                  </h3>
                  <span className="text-xs font-mono text-[#8E97A8]">
                    by {item.author}
                  </span>
                </div>
                {item.publicationDate && (
                  <span className="text-xs font-mono text-[#78849E] shrink-0">
                    {item.publicationDate}
                  </span>
                )}
              </div>

              {item.summary && (
                <p className="text-sm text-[#A0AEC0] font-sans leading-relaxed">
                  {item.summary}
                </p>
              )}

              {item.notes && (
                <p className="text-xs text-[#8E97A8] font-mono italic">
                  Note: &ldquo;{item.notes}&rdquo;
                </p>
              )}

              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {(item.tags || []).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono text-[#94A3B8] bg-[#151822] rounded-sm border border-[#262B38]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono text-sky-400 group-hover:text-sky-300 flex items-center gap-1 transition-colors">
                  paulgraham.com ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
