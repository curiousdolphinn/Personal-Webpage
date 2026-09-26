import React from 'react';
import { WorkStatus } from '../types';

interface StatusBadgeProps {
  status: WorkStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  let colorClasses = 'text-[#94a3b8] border-[#2d3748] bg-[#161c28]';

  const normalized = status.toLowerCase().trim();

  switch (normalized) {
    case 'active':
    case 'ongoing':
    case 'reading':
    case 'current':
      colorClasses = 'text-[#4ade80] border-[#164e28] bg-[#0c2314]';
      break;
    case 'completed':
    case 'read':
    case 'worked-through':
    case 'completed-exercises':
      colorClasses = 'text-[#38bdf8] border-[#194367] bg-[#0b2034]';
      break;
    case 'exploring':
    case 'learning':
    case 'revisited':
      colorClasses = 'text-[#facc15] border-[#54410a] bg-[#241c04]';
      break;
    case 'paused':
      colorClasses = 'text-[#c084fc] border-[#4a1d7a] bg-[#1d0b32]';
      break;
    case 'next':
    case 'planned':
    case 'unread':
    case 'idea':
      colorClasses = 'text-[#94a3b8] border-[#2d3748] bg-[#161c28]';
      break;
    case 'blocked':
    case 'abandoned':
    case 'archived':
      colorClasses = 'text-[#f87171] border-[#5c1d1d] bg-[#290d0d]';
      break;
    case 'skipped':
    case 'skimmed':
      colorClasses = 'text-[#cbd5e1] border-[#334155] bg-[#182030]';
      break;
    default:
      colorClasses = 'text-[#94a3b8] border-[#2d3748] bg-[#161c28]';
  }

  return (
    <span
      id={`status-badge-${normalized.replace(/[^a-z0-9]/g, '-')}`}
      className={`inline-flex items-center font-mono font-normal tracking-wide lowercase rounded-sm border ${sizeClasses} ${colorClasses}`}
    >
      <span className="opacity-60 mr-1 select-none">[</span>
      <span>{normalized.replace(/-/g, ' ')}</span>
      <span className="opacity-60 ml-1 select-none">]</span>
    </span>
  );
};
