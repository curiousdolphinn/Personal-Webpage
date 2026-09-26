import React from 'react';
import { Github, Mail, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../content/siteConfig';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-[#232734] bg-[#0D0F14] py-12 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-[#232734]">
          <div className="space-y-2 max-w-md">
            <div className="font-serif font-medium text-base text-white">
              {siteConfig.name}
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed font-sans">
              Personal research notebook, project archive, and inquiries ledger.
              Built statically with TypeScript, Tailwind, KaTeX, and content-first Markdown.
            </p>
            <div className="pt-1 text-[11px] font-mono text-[#78849E]">
              Designed to compound over time · Zero external backend
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-sans">
            <div className="space-y-2">
              <div className="font-mono uppercase text-[10px] tracking-wider text-[#78849E]">
                Navigation
              </div>
              <ul className="space-y-2 text-[#CBD5E1]">
                <li>
                  <button onClick={() => onNavigate('fields')} className="hover:underline hover:text-sky-300 transition-colors py-0.5">
                    Fields Hub
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('projects')} className="hover:underline hover:text-sky-300 transition-colors py-0.5">
                    Work Archive
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('writing')} className="hover:underline hover:text-sky-300 transition-colors py-0.5">
                    Writing & Essays
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('profile')} className="hover:underline hover:text-sky-300 transition-colors py-0.5">
                    Profile & CV
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('docs')} className="hover:underline hover:text-sky-300 transition-colors py-0.5">
                    Documentation
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-mono uppercase text-[10px] tracking-wider text-[#78849E]">
                Connect
              </div>
              <ul className="space-y-2 text-[#CBD5E1]">
                {siteConfig.github && (
                  <li>
                    <a
                      href={siteConfig.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline hover:text-sky-300 transition-colors py-0.5"
                    >
                      <Github className="w-3.5 h-3.5 text-sky-400" /> GitHub <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-1 hover:underline hover:text-sky-300 transition-colors py-0.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-400" /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#78849E]">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. Open research notebook.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('docs')}
              className="text-[#94A3B8] hover:text-white transition-colors py-1"
            >
              How to Edit Content Guide
            </button>
            <span>·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[#94A3B8] hover:text-white transition-colors py-1"
            >
              Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
