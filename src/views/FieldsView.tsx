import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAllFields, getFieldStats } from '../lib/fieldUtils';
import { getRecordedTimeByField } from '../lib/activityUtils';

interface FieldsViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const FieldsView: React.FC<FieldsViewProps> = ({ onNavigate }) => {
  const fields = getAllFields();

  return (
    <div className="space-y-12 py-8 sm:py-12">
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
            {fields.length} Organizational Fields
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
          Fields Hub
        </h1>
        <p className="text-base text-[#CBD5E1] font-sans max-w-2xl leading-relaxed">
          Organizational categories for research inquiries, ongoing study, active work, and expositional notes.
        </p>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field, idx) => {
          const stats = getFieldStats(field.slug);
          const timeData = getRecordedTimeByField(field.slug);

          return (
            <article
              key={field.id}
              id={`field-card-${field.slug}`}
              onClick={() => onNavigate('fields', field.slug)}
              className="p-6 rounded-md border border-[#262B38] bg-[#151822] hover:border-[#3E465B] hover:bg-[#1A1E2B] active:bg-[#202536] active:scale-[0.99] transition-all cursor-pointer space-y-4 flex flex-col justify-between group shadow-sm select-none"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#8E97A8] font-medium">
                    Area 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono text-sky-400 group-hover:text-sky-300 flex items-center gap-1 transition-colors font-medium">
                    Enter Field <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-serif text-2xl font-medium text-white group-hover:text-sky-300 transition-colors">
                      {field.title}
                    </h2>
                    {timeData.totalMinutes > 0 && (
                      <span className="text-xs font-mono text-[#4ADE80] font-medium">
                        {timeData.formatted}
                      </span>
                    )}
                  </div>
                  {field.tagline && (
                    <p className="text-xs font-serif italic text-[#94A3B8]">
                      &ldquo;{field.tagline}&rdquo;
                    </p>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#A0AEC0] font-sans leading-relaxed line-clamp-3">
                  {field.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#232734] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#8E97A8]">
                <div className="flex flex-wrap gap-2 text-[#CBD5E1]">
                  <span>{stats.projectsCount} Work</span>
                  <span className="text-[#414B64]">·</span>
                  <span>{stats.writingCount} Writing</span>
                  <span className="text-[#414B64]">·</span>
                  <span>{field.currentStudy?.length || 0} Studies</span>
                </div>
                <span className="text-sky-400 group-hover:text-white transition-colors font-medium">
                  View Field →
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
