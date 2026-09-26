import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Copy, Check, FileText } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Helper to extract text content from React children
const extractText = (node: any): string => {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node.props && node.props.children) return extractText(node.props.children);
  return '';
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose-academic text-[#CBD5E1] text-base leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { output: 'html' }]]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold mt-8 mb-4 text-white tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-serif text-xl sm:text-2xl font-semibold mt-7 mb-3 text-white border-b border-[#232734] pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-sans text-lg font-semibold mt-5 mb-2 text-[#F1F5F9]">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-[#CBD5E1] leading-relaxed text-[15px] sm:text-[16px]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-1.5 text-[15px] text-[#CBD5E1]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-[15px] text-[#CBD5E1]">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => {
            const text = extractText(children);
            if (text.includes('PDF of notes I wrote')) {
              return (
                <div className="my-6 p-6 rounded-md border-2 border-dashed border-[#2E364A] bg-[#12151F] text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-white font-mono">
                    <FileText className="w-4 h-4 text-sky-400" />
                    <span>PDF of notes I wrote</span>
                  </div>
                  <p className="text-xs text-[#8E97A8] font-mono">
                    [ Empty · I will upload it later ]
                  </p>
                </div>
              );
            }
            if (text.includes('TL;DR:')) {
              return (
                <blockquote className="border-l-2 border-sky-400 pl-4 py-3 my-5 text-[#E2E8F0] bg-[#121824] rounded-r text-[15px] not-italic shadow-sm">
                  {children}
                </blockquote>
              );
            }
            return (
              <blockquote className="border-l-2 border-sky-400/50 pl-4 py-2 my-4 italic text-[#CBD5E1] bg-[#151822] rounded-r">
                {children}
              </blockquote>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 border border-[#262B38] rounded-md">
              <table className="min-w-full text-left text-sm divide-y divide-[#262B38]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#151822] font-mono text-xs uppercase text-[#8E97A8]">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-[#232734] font-sans">
              {children}
            </tbody>
          ),
          tr: ({ children }) => <tr className="hover:bg-[#181D29] transition-colors">{children}</tr>,
          th: ({ children }) => <th className="px-4 py-2.5 font-medium text-white">{children}</th>,
          td: ({ children }) => <td className="px-4 py-2.5 text-[#CBD5E1]">{children}</td>,
          code: ({ className, children, ...props }) => {
            const isInline = !className && typeof children === 'string' && !children.includes('\n');
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 font-mono text-[13px] bg-[#1A1D28] text-[#F1F5F9] rounded border border-[#262B38]"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return <CodeBlock language={className?.replace('language-', '')}>{String(children).replace(/\n$/, '')}</CodeBlock>;
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-sky-400 hover:text-sky-300 underline decoration-sky-400/50 hover:decoration-sky-300 underline-offset-2 font-medium transition-colors"
            >
              {children}
            </a>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const CodeBlock: React.FC<{ language?: string; children: string }> = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-5 rounded-md border border-[#262B38] bg-[#0E1118] overflow-hidden text-sm group shadow-sm">
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#151822] border-b border-[#232734] text-xs font-mono text-[#8E97A8]">
        <span>{language || 'text'}</span>
        <button
          id="copy-code-button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 text-[11px] hover:text-white transition-colors px-2 py-1 rounded bg-[#1A1E2B] border border-[#2A3142]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
              <span className="text-[#4ADE80]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#8E97A8]" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto font-mono text-[13px] leading-relaxed text-[#E2E8F0]">
        <pre className="!bg-transparent !p-0 !m-0 !border-0 whitespace-pre">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};
