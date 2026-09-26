import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { workData } from '../content/work';
import { StatusBadge } from '../components/StatusBadge';
import { getFieldBadges } from '../lib/fieldUtils';
import { getRecordedTimeByWork } from '../lib/activityUtils';
import { WorkItem, WorkType, WorkStatus } from '../types';

interface ProjectsViewProps {
  onNavigate: (view: string, param?: string) => void;
  selectedSlug?: string;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const publicWork = useMemo(() => {
    return workData.filter(w => w.visibility === 'public');
  }, []);

  const typeOptions: { value: string; label: string }[] = [
    { value: 'ALL', label: 'All Types' },
    { value: 'project', label: 'Project' },
    { value: 'coursework', label: 'Coursework' },
    { value: 'proof', label: 'Proof Writeup' },
    { value: 'experiment', label: 'Experiment' },
    { value: 'research', label: 'Research' },
    { value: 'implementation', label: 'Implementation' },
    { value: 'paper-reproduction', label: 'Paper Reproduction' },
    { value: 'problem-set', label: 'Problem Set' },
    { value: 'reading', label: 'Reading Notes' },
    { value: 'writing', label: 'Essay / Writing' },
  ];

  const statusOptions = ['ALL', 'active', 'completed', 'exploring', 'paused', 'abandoned'];

  const filteredWork = useMemo(() => {
    return publicWork.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (item.technologies && item.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesStatus = selectedStatus === 'ALL' || item.status.toLowerCase() === selectedStatus.toLowerCase();
      const matchesType = selectedType === 'ALL' || item.type.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [publicWork, searchQuery, selectedStatus, selectedType]);

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
            {publicWork.length} total entries
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
          Work & Projects Archive
        </h1>
        <p className="text-base text-[#CBD5E1] font-sans max-w-2xl leading-relaxed">
          A unified record of implementations, coursework, proofs, experiments, paper reproductions, and active inquiries.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-md border border-[#262B38] bg-[#151822] space-y-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by title, tag, concept..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#0D0F14] border border-[#262B38] rounded-md text-white placeholder-[#78849E] focus:outline-none focus:border-sky-400 min-h-[44px]"
            />
          </div>

          {/* Type dropdown */}
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="px-3.5 py-2.5 text-sm bg-[#0D0F14] border border-[#262B38] rounded-md text-[#E2E8F0] focus:outline-none focus:border-sky-400 font-sans min-h-[44px]"
          >
            {typeOptions.map(t => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs font-mono">
          <span className="text-[#8E97A8] mr-1">Status:</span>
          {statusOptions.map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3.5 py-1.5 rounded-md transition-all min-h-[36px] flex items-center active:scale-95 ${
                selectedStatus === status
                  ? 'bg-sky-400 text-[#09101F] font-semibold shadow-sm'
                  : 'bg-[#181D29] text-[#CBD5E1] hover:text-white border border-[#2A3142] hover:border-[#3D475E]'
              }`}
            >
              {status === 'ALL' ? 'ALL' : status.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Work Grid or Empty State */}
      {filteredWork.length === 0 ? (
        <div className="p-12 rounded-md border border-dashed border-[#2B3040] bg-[#12141D] text-center space-y-2">
          <div className="font-mono text-xs text-[#8E97A8] uppercase tracking-wider">
            NO RECENT WORK
          </div>
          <p className="font-serif italic text-sm text-[#78849E]">
            This notebook is still being written.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredWork.map(work => {
            const timeData = getRecordedTimeByWork(work.id || work.slug);
            const fieldBadges = getFieldBadges(work.fields);

            return (
              <div
                key={work.id}
                onClick={() => onNavigate('projects', work.slug)}
                className="p-5 sm:p-6 rounded-md border border-[#262B38] bg-[#151822] hover:border-[#3E465B] hover:bg-[#1A1E2B] active:bg-[#202536] active:scale-[0.99] cursor-pointer transition-all space-y-3 group shadow-sm select-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="font-serif text-lg sm:text-xl font-medium text-white group-hover:text-sky-300 transition-colors">
                      {work.title}
                    </h2>
                    <StatusBadge status={work.status} size="sm" />
                    {timeData.totalMinutes > 0 && (
                      <span className="text-[11px] font-mono text-[#4ADE80] font-medium">
                        {timeData.formatted} invested
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#8E97A8] shrink-0">
                    {work.date} · {work.type.replace('-', ' ')}
                  </span>
                </div>

                <p className="text-sm text-[#A0AEC0] font-sans leading-relaxed">
                  {work.summary}
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
                    {(work.technologies || work.tags || []).slice(0, 4).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono text-[#94A3B8] bg-[#131620] rounded-sm border border-[#232734]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-sky-400 group-hover:text-sky-300 transition-colors shrink-0 font-medium flex items-center gap-1">
                    Inspect details →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
