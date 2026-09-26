import React, { useState } from 'react';
import { PipelineStage } from '../types';
import { ShieldAlert, Check, Sparkles, Layers, ArrowRight, Activity } from 'lucide-react';

interface PipelineViewerProps {
  stages: PipelineStage[];
}

export const PipelineViewer: React.FC<PipelineViewerProps> = ({ stages }) => {
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);

  if (!stages || stages.length === 0) return null;

  const completedCount = stages.filter(s => s.status === 'completed').length;
  const currentStage = stages.find(s => s.status === 'current') || stages[0];

  const handleSelectStage = (id: string) => {
    setSelectedStageId(id);
    const element = document.getElementById(`stage-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. PIPELINE TRACK HEADER & PROGRESS BAR */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-sm border border-[#222222] bg-[#111111] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1C1C1C] pb-3">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-[#888888] flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Multi-Stage Formal Diagnostic Pipeline</span>
            </div>
            <p className="text-xs text-[#737373] mt-0.5">
              Automated translation, roundtrip intent validation, Lean 4 proof search, and automated hypothesis ablation.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-[#A3A3A3]">
              Pipeline Progress: <strong className="text-white font-mono">{completedCount}</strong> / {stages.length} Stages
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#162238] text-[#93C5FD] border border-[#233B5F]">
              Stage {currentStage.step} Active
            </span>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* HORIZONTAL DIAMOND & PIPE VISUALIZATION TRACK */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="overflow-x-auto pb-3 pt-2 scrollbar-thin scrollbar-thumb-[#262626]">
          <div className="min-w-[760px] flex items-center justify-between relative px-6 py-4">
            {/* Base Continuous Pipe Behind Nodes */}
            <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-[#1F1F1F] -translate-y-1/2 z-0" />

            {stages.map((stage, idx) => {
              const isCompleted = stage.status === 'completed';
              const isCurrent = stage.status === 'current';
              const isNext = stage.status === 'next';
              const isSelected = selectedStageId === stage.id;

              // Compute pipe segment to previous node
              const prevCompleted = idx > 0 && stages[idx - 1].status === 'completed';

              return (
                <div key={stage.id} className="relative z-10 flex flex-col items-center">
                  {/* Segment Pipe to next node if completed */}
                  {idx < stages.length - 1 && (
                    <div
                      className={`absolute top-1/2 left-1/2 h-[2px] -translate-y-1/2 z-0 pointer-events-none transition-colors duration-300 ${
                        isCompleted && (stages[idx + 1].status === 'completed' || stages[idx + 1].status === 'current')
                          ? 'bg-gradient-to-r from-[#22C55E] to-[#3B82F6]'
                          : isCompleted
                          ? 'bg-[#22C55E]'
                          : 'bg-[#1F1F1F]'
                      }`}
                      style={{ width: 'calc(100% + 40px)' }}
                    />
                  )}

                  {/* Diamond Node Button */}
                  <button
                    onClick={() => handleSelectStage(stage.id)}
                    title={`Stage ${stage.step}: ${stage.title} (${stage.status})`}
                    className={`group relative flex items-center justify-center w-8 h-8 transition-transform duration-200 cursor-pointer ${
                      isSelected ? 'scale-110' : 'hover:scale-105'
                    }`}
                  >
                    {/* Rotated Diamond Background */}
                    <div
                      className={`w-7 h-7 rotate-45 border transition-all duration-300 flex items-center justify-center rounded-[2px] ${
                        isCompleted
                          ? 'bg-[#0D2416] border-[#22C55E] shadow-[0_0_12px_rgba(34,197,94,0.45)]'
                          : isCurrent
                          ? 'bg-[#122238] border-[#3B82F6] shadow-[0_0_14px_rgba(59,130,246,0.6)] ring-2 ring-[#3B82F6]/40'
                          : isNext
                          ? 'bg-[#241C10] border-[#EAB308] shadow-[0_0_8px_rgba(234,179,8,0.25)]'
                          : 'bg-[#141414] border-[#2D2D2D] hover:border-[#444444]'
                      }`}
                    >
                      {/* Counter-rotated content inside diamond */}
                      <span className="-rotate-45 font-mono text-[10px] font-bold select-none">
                        {isCompleted ? (
                          <Check className="w-3.5 h-3.5 text-[#86EFAC] stroke-[2.5]" />
                        ) : isCurrent ? (
                          <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-ping" />
                        ) : (
                          <span
                            className={
                              isNext
                                ? 'text-[#FDE047]'
                                : 'text-[#737373] group-hover:text-[#AAAAAA]'
                            }
                          >
                            {stage.step}
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Outer glow ring for current stage */}
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-sm border border-[#60A5FA]/30 animate-pulse pointer-events-none" />
                    )}
                  </button>

                  {/* Stage Label Below Diamond */}
                  <div className="mt-3 flex flex-col items-center text-center max-w-[84px]">
                    <span className="text-[10px] font-mono text-[#666666] leading-none mb-0.5">
                      0{stage.step}
                    </span>
                    <span
                      className={`text-[11px] font-mono leading-tight tracking-tight line-clamp-1 ${
                        isCompleted
                          ? 'text-[#86EFAC] font-medium'
                          : isCurrent
                          ? 'text-[#93C5FD] font-semibold underline underline-offset-4 decoration-[#3B82F6]'
                          : isNext
                          ? 'text-[#FDE047]'
                          : 'text-[#888888]'
                      }`}
                    >
                      {stage.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#737373] pt-2 border-t border-[#1C1C1C]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rotate-45 bg-[#0D2416] border border-[#22C55E] inline-block" />
              <span className="text-[#A3A3A3]">Completed</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rotate-45 bg-[#122238] border border-[#3B82F6] inline-block" />
              <span className="text-[#93C5FD]">Active Development</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rotate-45 bg-[#241C10] border border-[#EAB308] inline-block" />
              <span className="text-[#FDE047]">Next Up</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rotate-45 bg-[#141414] border border-[#2D2D2D] inline-block" />
              <span className="text-[#737373]">Planned Pipeline Stage</span>
            </span>
          </div>
          <span className="text-[#555555]">Click any diamond to inspect stage</span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 2. DETAILED CHRONOLOGICAL STAGE BREAKDOWN CARDS */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="font-mono text-xs uppercase tracking-wider text-[#737373] border-b border-[#1E1E1E] pb-1 flex items-center justify-between">
          <span>Pipeline Stage Specifications & Mechanical Invariants</span>
          <span className="text-[11px] text-[#555555] normal-case tracking-normal">
            9 Discrete Execution Steps
          </span>
        </div>

        <div className="relative border-l border-[#222222] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-6">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';
            const isNext = stage.status === 'next';

            return (
              <div
                key={stage.id}
                id={`stage-card-${stage.id}`}
                className={`relative p-5 sm:p-6 rounded-sm border transition-all duration-300 font-sans ${
                  selectedStageId === stage.id
                    ? 'border-[#3B82F6] bg-[#121622] shadow-[0_0_20px_rgba(59,130,246,0.12)]'
                    : isCurrent
                    ? 'border-[#26354D] bg-[#10141D]'
                    : isCompleted
                    ? 'border-[#1E2E24] bg-[#0E1512]'
                    : 'border-[#1E1E1E] bg-[#111111]'
                }`}
              >
                {/* Connecting Node on the Left Border Track */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rotate-45 border flex items-center justify-center transition-colors ${
                    isCompleted
                      ? 'bg-[#0E2818] border-[#22C55E] text-[#86EFAC] shadow-[0_0_8px_rgba(34,197,94,0.4)]'
                      : isCurrent
                      ? 'bg-[#152845] border-[#3B82F6] text-[#93C5FD] shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                      : isNext
                      ? 'bg-[#291F12] border-[#EAB308] text-[#FDE047]'
                      : 'bg-[#141414] border-[#2E2E2E] text-[#555555]'
                  }`}
                >
                  <span className="-rotate-45 font-mono text-[9px] font-bold">
                    {isCompleted ? '✓' : stage.step}
                  </span>
                </div>

                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1C1C1C] pb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-[#737373]">
                        Stage 0{stage.step}
                      </span>
                      <span className="text-[#333333]">·</span>
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-white">
                        {stage.title}
                      </h3>
                      {stage.critical && (
                        <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-sm bg-[#382010] text-[#FDBA74] border border-[#5E3218] flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 text-[#FB923C]" />
                          <span>Critical Checkpoint</span>
                        </span>
                      )}
                    </div>
                    {stage.subtitle && (
                      <p className="text-xs font-mono text-[#888888]">
                        {stage.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`font-mono text-[11px] px-2.5 py-0.5 rounded-sm uppercase tracking-wider shrink-0 ${
                      isCompleted
                        ? 'bg-[#142A1D] text-[#86EFAC] border border-[#214F33]'
                        : isCurrent
                        ? 'bg-[#162742] text-[#93C5FD] border border-[#24426E]'
                        : isNext
                        ? 'bg-[#281E10] text-[#FDE047] border border-[#4D381A]'
                        : 'bg-[#161616] text-[#737373] border border-[#242424]'
                    }`}
                  >
                    {isCompleted
                      ? 'Completed'
                      : isCurrent
                      ? 'In Progress (Active)'
                      : isNext
                      ? 'Next Stage'
                      : 'Planned'}
                  </span>
                </div>

                {/* Body Content */}
                <div className="space-y-3.5 pt-3">
                  <p className="text-sm sm:text-base text-[#D4D4D4] leading-relaxed">
                    {stage.summary}
                  </p>

                  {stage.description && (
                    <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed">
                      {stage.description}
                    </p>
                  )}

                  {/* Failure Mode & Mitigation Box */}
                  {stage.failureModeOrMitigation && (
                    <div className="p-3.5 rounded-sm border border-[#2A231C] bg-[#141210] space-y-1.5">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-[#F59E0B] flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Failure Mode & Formal Mitigation</span>
                      </div>
                      <p className="text-xs text-[#CFCFCF] font-sans leading-relaxed">
                        {stage.failureModeOrMitigation}
                      </p>
                    </div>
                  )}

                  {/* Technical Bullet Details */}
                  {stage.details && stage.details.length > 0 && (
                    <ul className="list-disc list-inside text-xs font-mono text-[#888888] space-y-1 pt-1 leading-relaxed">
                      {stage.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-[#A3A3A3]">
                          <span className="font-sans text-xs text-[#888888]">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
