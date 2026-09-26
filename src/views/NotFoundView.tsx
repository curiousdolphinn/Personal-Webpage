import React from 'react';
import { ArrowLeft, Home, Search, FileText, Code2 } from 'lucide-react';

interface NotFoundViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenSearch: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate, onOpenSearch }) => {
  return (
    <div className="py-20 text-center max-w-md mx-auto space-y-6">
      <div className="font-mono text-4xl font-bold text-[#444]">
        404
      </div>
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
        Page Not Found
      </h1>
      <p className="text-sm text-[#888] font-sans leading-relaxed">
        The research document, experiment note, or project you are looking for might have been moved or renamed in the archive.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="px-4 py-2 min-h-[42px] text-xs font-mono font-medium rounded-md bg-white text-black hover:bg-[#E0E0E0] transition-colors flex items-center gap-2 active:scale-95 shadow-sm"
        >
          <Home className="w-3.5 h-3.5" /> Return Home
        </button>
        <button
          onClick={onOpenSearch}
          className="px-4 py-2 min-h-[42px] text-xs font-mono font-medium rounded-md border border-[#2D3446] hover:border-[#414B64] text-[#CBD5E1] hover:text-white bg-[#161924] hover:bg-[#1E2333] transition-colors flex items-center gap-2 active:scale-95 shadow-sm"
        >
          <Search className="w-3.5 h-3.5 text-sky-400" /> Search Archive (⌘K)
        </button>
      </div>
    </div>
  );
};
