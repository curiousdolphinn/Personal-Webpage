import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { getAllFields } from '../lib/fieldUtils';
import { workData } from '../content/work';
import { siteConfig } from '../content/siteConfig';

interface SearchResultItem {
  id: string;
  type: 'field' | 'work' | 'writing' | 'profile' | 'cv';
  title: string;
  subtitle: string;
  meta: string;
  targetView: string;
  targetParam?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, param?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Build searchable index
  const allResults: SearchResultItem[] = React.useMemo(() => {
    const results: SearchResultItem[] = [];

    // Fields
    const fields = getAllFields();
    fields.forEach(f => {
      results.push({
        id: `field-${f.id}`,
        type: 'field',
        title: f.title,
        subtitle: `${f.tagline || ''} — ${f.description}`,
        meta: `Organizational Field`,
        targetView: 'fields',
        targetParam: f.slug
      });
    });

    // Profile & CV Record
    results.push({
      id: 'profile-cv-record',
      type: 'cv',
      title: 'Profile & Curriculum Vitae',
      subtitle: `${siteConfig.name} — ${siteConfig.degree} at ${siteConfig.institution}. Coursework, projects, and life ledger.`,
      meta: 'Profile · CV · Coursework · Life Ledger',
      targetView: 'profile'
    });

    // Public Work items
    workData
      .filter(w => w.visibility === 'public')
      .forEach(w => {
        results.push({
          id: `work-${w.id}`,
          type: w.type === 'writing' ? 'writing' : 'work',
          title: w.title,
          subtitle: w.summary || '',
          meta: `${w.type.replace('-', ' ')} · ${w.status}`,
          targetView: w.type === 'writing' ? 'writing' : 'projects',
          targetParam: w.slug
        });
      });

    return results;
  }, []);

  const filteredResults = React.useMemo(() => {
    if (!query.trim()) return allResults.slice(0, 10);
    const q = query.toLowerCase();
    return allResults.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.meta.toLowerCase().includes(q)
    ).slice(0, 15);
  }, [allResults, query]);

  const handleSelect = (item: SearchResultItem) => {
    onNavigate(item.targetView, item.targetParam);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
    } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredResults[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#151822] border border-[#2A2F3D] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#232734] bg-[#12151E]">
          <Search className="w-4 h-4 text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search fields, work, writing, profile, or topics..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-sm text-white placeholder-[#78849E] focus:outline-none font-sans min-h-[36px]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8E97A8] hover:text-white px-2 py-1 text-xs min-h-[36px]"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[#8E97A8] hover:text-white p-2 rounded-md hover:bg-[#1C212E] min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#232734] p-2">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#8E97A8]">
              No matching records found for "{query}"
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3.5 rounded-md cursor-pointer transition-colors space-y-1 active:bg-[#202636] min-h-[48px] ${
                    isSelected ? 'bg-[#1C212E] border-l-2 border-sky-400' : 'hover:bg-[#181D29]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif text-sm font-medium text-white">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider shrink-0 font-medium">
                      {item.meta}
                    </span>
                  </div>
                  {item.subtitle && (
                    <p className="text-xs text-[#A0AEC0] font-sans line-clamp-1">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-[#232734] bg-[#0E1118] flex items-center justify-between text-[11px] font-mono text-[#8E97A8]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-sky-400 font-medium">{filteredResults.length} index matches</span>
        </div>
      </div>
    </div>
  );
};
