import React, { useState } from 'react';
import { ArrowLeft, Check, Copy, FileCode2 } from 'lucide-react';
import { docsGuideData } from '../content/docs';

interface DocsViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const DocsView: React.FC<DocsViewProps> = ({ onNavigate }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10 py-6 sm:py-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#777] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <span className="font-mono text-xs text-[#666]">
            Content Architecture & Maintenance
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
          Content Management & Architecture Guide
        </h1>
        <p className="text-sm sm:text-base text-[#AAAAAA] font-sans max-w-2xl leading-relaxed">
          This website is built with a <strong>Content-First Static Architecture</strong>. There are no external databases, servers, or CMS requirements. Edit the TypeScript files directly and deploy.
        </p>
      </div>

      {/* Quick Architecture Summary */}
      <div className="p-5 rounded-sm border border-[#2A2A2A] bg-[#141414] space-y-3 text-xs sm:text-sm font-sans">
        <div className="font-mono uppercase font-semibold text-white flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-[#86efac]" />
          <span>Core Content Files Map</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-[#AAAAAA]">
          <div className="p-2.5 rounded-sm bg-[#0E0E0E] border border-[#222222]">
            <strong className="text-white">src/content/siteConfig.ts</strong>: Central identity, birthdate, reference dates
          </div>
          <div className="p-2.5 rounded-sm bg-[#0E0E0E] border border-[#222222]">
            <strong className="text-white">src/content/work.ts</strong>: Unified Work dataset (projects, proofs, coursework, essays)
          </div>
          <div className="p-2.5 rounded-sm bg-[#0E0E0E] border border-[#222222]">
            <strong className="text-white">src/content/activities.ts</strong>: Calendar / Focus session ledger
          </div>
          <div className="p-2.5 rounded-sm bg-[#0E0E0E] border border-[#222222]">
            <strong className="text-white">src/content/fields.ts</strong>: Organizational Field Hubs and inquiries
          </div>
        </div>
      </div>

      {/* Guide Checklist */}
      <div className="space-y-8">
        {docsGuideData.map(guide => (
          <article
            key={guide.id}
            id={`guide-step-${guide.stepNumber}`}
            className="p-5 sm:p-6 rounded-sm border border-[#222222] bg-[#121212] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h2 className="font-serif text-xl font-medium text-white">
                {guide.title}
              </h2>
              <span className="font-mono text-xs text-[#888] bg-[#181818] px-2 py-0.5 rounded-sm border border-[#262626]">
                File: {guide.filePath}
              </span>
            </div>

            <p className="text-sm text-[#CCCCCC] font-sans leading-relaxed">
              {guide.description}
            </p>

            {/* Code Snippet Box with Copy Button */}
            <div className="relative rounded-sm border border-[#262626] bg-[#0A0A0A] overflow-hidden text-xs">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#141414] border-b border-[#222222] font-mono text-[#888] text-[11px]">
                <span>{guide.filePath}</span>
                <button
                  onClick={() => handleCopy(guide.id, guide.codeSnippet)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  {copiedId === guide.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#86efac]" />
                      <span className="text-[#86efac]">Copied snippet</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy snippet</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 font-mono text-[11px] sm:text-xs text-[#CCCCCC] overflow-x-auto leading-relaxed">
                <code>{guide.codeSnippet}</code>
              </pre>
            </div>

            <div className="text-xs text-[#888888] font-sans border-l-2 border-[#444444] pl-3 py-0.5">
              <strong className="text-white font-mono text-[11px]">Tip: </strong>
              {guide.tips}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
