'use client';

import React, { useState } from 'react';
import { Layers, Code2, Server, Database, Cloud, Sparkles, Terminal, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface TechStackProps {
  playSound: (type?: 'click' | 'hover' | 'pop') => void;
}

export const TechStack: React.FC<TechStackProps> = ({ playSound }) => {
  const { techStack } = portfolioData;
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Featured highlighted stack matching Bryl Lim's curated preview row
  const primaryRow = [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'Laravel',
    'PostgreSQL',
  ];

  const secondaryRow = [
    'AWS',
    'Docker',
    'Coolify',
    'Kubernetes',
    'PyTorch',
    'Claude Code',
  ];

  const categoryMeta: Record<string, { label: string; icon: React.ElementType }> = {
    Frontend: { label: 'Frontend', icon: Code2 },
    Backend: { label: 'Backend & APIs', icon: Server },
    Database: { label: 'Databases', icon: Database },
    'DevOps & Cloud': { label: 'DevOps & Cloud', icon: Cloud },
    'AI & Tools': { label: 'AI & Engineering', icon: Sparkles },
    'Tools & Others': { label: 'Environments & IDEs', icon: Terminal },
  };

  const categories = Object.keys(categoryMeta);

  const toggleExpanded = () => {
    playSound('pop');
    setIsExpanded((prev) => !prev);
  };

  return (
    <section id="stack" className="py-10 border-t border-gray-200/80 dark:border-[#1e1e1e]">
      {/* Header matching Bryl Lim: STACK on left, VIEW ALL -> on right */}
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-gray-400 dark:text-[#666] font-semibold">
          Stack
        </h3>
        <button
          type="button"
          onClick={toggleExpanded}
          onMouseEnter={() => playSound('hover')}
          className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-[#888] hover:text-ink dark:hover:text-white transition-colors flex items-center gap-1 group"
        >
          <span>{isExpanded ? 'Collapse' : 'View all'}</span>
          {isExpanded ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
          )}
        </button>
      </div>

      {/* Bryl Lim Minimal Compact Preview (Default State) */}
      {!isExpanded ? (
        <div className="space-y-2">
          {/* Row 1 */}
          <div className="flex flex-wrap gap-2">
            {primaryRow.map((name) => (
              <span
                key={name}
                onMouseEnter={() => playSound('hover')}
                className="rounded-md border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#141414] px-2.5 py-1 font-mono text-[12px] text-gray-600 dark:text-[#ccc] hover:border-gray-400 dark:hover:border-[#444] transition-colors cursor-default shadow-2xs"
              >
                {name}
              </span>
            ))}
          </div>

          {/* Row 2 with + more dashed button */}
          <div className="flex flex-wrap items-center gap-2">
            {secondaryRow.map((name) => (
              <span
                key={name}
                onMouseEnter={() => playSound('hover')}
                className="rounded-md border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#141414] px-2.5 py-1 font-mono text-[12px] text-gray-600 dark:text-[#ccc] hover:border-gray-400 dark:hover:border-[#444] transition-colors cursor-default shadow-2xs"
              >
                {name}
              </span>
            ))}

            <button
              type="button"
              onClick={toggleExpanded}
              onMouseEnter={() => playSound('hover')}
              className="rounded-md border border-dashed border-gray-300 dark:border-[#333] bg-transparent px-2.5 py-1 font-mono text-[12px] text-gray-500 dark:text-[#777] hover:border-gray-500 hover:text-ink dark:hover:border-[#666] dark:hover:text-white transition-all cursor-pointer"
            >
              + more
            </button>
          </div>
        </div>
      ) : (
        /* Full Categorized Grid (Expanded View) */
        <div className="space-y-6 pt-2 animate-in fade-in duration-200">
          {/* Category Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-[#1e1e1e]">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setActiveCategory('All');
              }}
              className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                activeCategory === 'All'
                  ? 'bg-ink text-white dark:bg-white dark:text-black font-semibold'
                  : 'bg-gray-100 dark:bg-[#181818] text-gray-600 dark:text-[#888] hover:text-ink dark:hover:text-white'
              }`}
            >
              All ({techStack.length})
            </button>
            {categories.map((cat) => {
              const count = techStack.filter((t) => t.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setActiveCategory(cat);
                  }}
                  className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                    activeCategory === cat
                      ? 'bg-ink text-white dark:bg-white dark:text-black font-semibold'
                      : 'bg-gray-100 dark:bg-[#181818] text-gray-600 dark:text-[#888] hover:text-ink dark:hover:text-white'
                  }`}
                >
                  {categoryMeta[cat]?.label || cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Categorized Sections */}
          <div className="space-y-5">
            {categories
              .filter((cat) => activeCategory === 'All' || activeCategory === cat)
              .map((cat) => {
                const items = techStack.filter((t) => t.category === cat);
                const Meta = categoryMeta[cat];
                const Icon = Meta?.icon || Layers;

                return (
                  <div key={cat} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-gray-400 dark:text-[#666]" />
                      <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-[#888]">
                        {Meta?.label || cat}
                      </h4>
                      <span className="font-mono text-[10px] text-gray-400 dark:text-[#555]">
                        ({items.length})
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {items.map((tech) => (
                        <span
                          key={tech.name}
                          onMouseEnter={() => playSound('hover')}
                          className="rounded-md border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#141414] px-2.5 py-1 font-mono text-[12px] text-gray-700 dark:text-[#ccc] hover:border-gray-400 dark:hover:border-[#444] hover:text-ink dark:hover:text-white transition-colors cursor-default shadow-2xs"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Bottom collapse trigger */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={toggleExpanded}
              onMouseEnter={() => playSound('hover')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white/50 dark:bg-[#141414] px-3.5 py-1.5 font-mono text-[11px] text-gray-500 dark:text-[#888] hover:text-ink dark:hover:text-white hover:border-gray-400 dark:hover:border-[#444] transition-all"
            >
              <span>Collapse Stack</span>
              <ChevronUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
