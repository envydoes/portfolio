'use client';

import React, { useState } from 'react';
import { FolderGit2, ArrowUpRight, ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface ProjectsGridProps {
  playSound: (type?: 'click' | 'hover' | 'pop') => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ playSound }) => {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'Mobile'];

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-8 border-t border-gray-200/80 dark:border-gray-800/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold flex items-center gap-2">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Featured Systems &amp; Applications</span>
          </h2>
          <p className="text-sm font-medium text-ink dark:text-gray-200 mt-1">
            Production web platforms &amp; mobile applications
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                playSound('pop');
                setFilter(cat);
              }}
              onMouseEnter={() => playSound('hover')}
              className={`rounded-md px-2.5 py-1 font-mono text-xs transition-all ${
                filter === cat
                  ? 'bg-ink text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                  : 'text-gray-500 hover:text-ink dark:hover:text-white bg-gray-100 dark:bg-[#181818]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => playSound('hover')}
            className="group flex flex-col justify-between rounded-xl border border-gray-200 dark:border-[#222] bg-white/70 dark:bg-[#111] p-5 hover:border-gray-300 dark:hover:border-[#333] hover:shadow-xs transition-all duration-200"
          >
            <div>
              {project.image && project.imageType === 'preview' && (
                <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-gray-100 dark:bg-[#1a1a1a]">
                  <img src={project.image} alt={`${project.title} preview`} className="aspect-video w-full object-cover" />
                </div>
              )}
              <div className="flex items-start gap-3">
                {project.image && project.imageType !== 'preview' && (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a]">
                    <img src={project.image} alt={`${project.title} logo`} className="h-full w-full object-contain p-1.5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    {project.category} • {project.year}
                  </span>
                  {project.featured && (
                    <span className="rounded-sm bg-amber-500/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <h3 className="mt-2 text-base font-bold text-ink dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-[#aaa] leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 dark:border-[#1e1e1e] flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10.5px] text-gray-500 dark:text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound('click')}
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    title="Open project website"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>{project.linkLabel ?? project.liveUrl.replace(/^https?:\/\//, '')}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-70" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
