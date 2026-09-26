import React, { useState } from 'react';
import { ArrowLeft, Share2, Check, Clock, BookOpen, ExternalLink } from 'lucide-react';
import { workData } from '../content/work';
import { getResourceById } from '../content/resources';
import { getFieldBySlug } from '../lib/fieldUtils';
import { getRecordedTimeByWork } from '../lib/activityUtils';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

interface ArticleDetailViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ slug, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const article = workData.find(w => (w.slug === slug || w.id === slug) && w.type === 'writing');

  if (!article) {
    return (
      <div className="max-w-[68ch] mx-auto py-16 text-center space-y-4">
        <h1 className="font-serif text-2xl text-white">Article Not Found</h1>
        <p className="text-sm font-mono text-[#888888]">
          The requested essay could not be found in the current archive.
        </p>
        <button
          onClick={() => onNavigate('writing')}
          className="px-4 py-2 text-xs font-mono bg-[#161616] border border-[#2A2A2A] text-white rounded-sm"
        >
          Return to Writing Archive
        </button>
      </div>
    );
  }

  const writingTime = getRecordedTimeByWork(article.id || article.slug);
  const relatedResource = article.relatedResource ? getResourceById(article.relatedResource) : undefined;
  const relatedChapterItem = relatedResource?.chapters?.find(c => 
    c.chapterNumber === article.relatedChapter || 
    String(c.chapterNumber) === String(article.relatedChapter)
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="max-w-[68ch] mx-auto space-y-10 py-8 sm:py-14">
      {/* Navigation Header */}
      <div className="flex items-center justify-between text-xs font-mono text-[#8E97A8] pb-2 border-b border-[#232734]">
        <button
          onClick={() => onNavigate('writing')}
          className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[42px] rounded-md bg-[#161924] border border-[#2D3446] text-[#E2E8F0] hover:text-white hover:border-[#414B64] hover:bg-[#1E2333] transition-all text-xs font-mono active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-sky-400" /> Back to All Writing
        </button>

        <div className="flex items-center gap-2.5">
          {article.fields && article.fields.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-[#8E97A8]">Field:</span>
              {article.fields.map(fSlug => {
                const f = getFieldBySlug(fSlug);
                return (
                  <button
                    key={fSlug}
                    onClick={() => onNavigate('fields', f?.slug || fSlug)}
                    className="px-2.5 py-1 min-h-[36px] rounded-md bg-[#161924] border border-[#2D3446] text-[#CBD5E1] hover:text-white hover:border-[#414B64] transition-all flex items-center"
                  >
                    {f?.shortTitle || f?.title || fSlug}
                  </button>
                );
              })}
            </div>
          )}

          <button
            id="share-article-button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[42px] text-xs font-mono text-[#CBD5E1] hover:text-white rounded-md border border-[#2D3446] bg-[#161924] hover:border-[#414B64] hover:bg-[#1E2333] active:scale-95 transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                <span className="text-[#4ADE80] font-medium">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Article Title & Metadata */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#8E97A8]">
          <span>{article.date}</span>
          <span className="text-[#414B64]">·</span>
          <span>EST. READ: {article.readingTime || '4 min read'}</span>
          {writingTime.totalMinutes > 0 && (
            <>
              <span className="text-[#414B64]">·</span>
              <span className="text-[#CBD5E1] flex items-center gap-1">
                <Clock className="w-3 h-3 text-sky-400" />
                <span>WRITING TIME: <strong className="text-[#4ADE80] font-medium">{writingTime.formatted}</strong></span>
              </span>
            </>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.2]">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {(article.tags || []).map(tag => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-mono text-[#94A3B8] bg-[#131620] rounded-sm border border-[#232734]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {relatedResource && (
          <div className="space-y-2 p-3.5 rounded-sm bg-[#121212] border border-[#222222] text-xs font-mono">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-[#B0B0B0]">
                <BookOpen className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span>
                  Study note under <strong className="text-white font-medium">{relatedResource.title}</strong>
                  {relatedResource.author && <span className="text-[#737373]"> by {relatedResource.author}</span>}
                  {relatedChapterItem && (
                    <span className="text-[#86EFAC]">
                      {' '}— Chapter {relatedChapterItem.chapterNumber}: {relatedChapterItem.title}
                    </span>
                  )}
                </span>
              </div>
              {relatedResource.fields && relatedResource.fields[0] && (
                <button
                  onClick={() => onNavigate('fields', relatedResource.fields[0])}
                  className="text-[11px] text-[#737373] hover:text-white transition-colors"
                >
                  View Syllabus →
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-[#1C1C1C] flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span className="text-[#737373] flex items-center gap-1.5">
                <span className="text-[#86EFAC]">✓</span> Following Lecture 1 (Introduction to Groups & Axioms)
              </span>
              <a
                href="https://youtube.com/playlist?list=PLelIK3uylPMGzHBuR3hLMHrYfMqWWsmx5&si=SCkS4_vJQWFnJYJY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#93C5FD] hover:text-white transition-colors"
              >
                <span>Harvard Math 122 Playlist (Benedict Gross)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </header>

      <hr className="border-[#1E1E1E]" />

      {/* Article Body */}
      <div className="font-serif leading-relaxed text-[#D4D4D4]">
        {article.contentMarkdown ? (
          <MarkdownRenderer content={article.contentMarkdown} />
        ) : (
          <p className="text-base text-[#AAAAAA]">{article.summary}</p>
        )}
      </div>
    </article>
  );
};
