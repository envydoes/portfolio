'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface SpotlightDeckProps {
  playSound: (type?: 'click' | 'hover' | 'pop') => void;
}

export const SpotlightDeck: React.FC<SpotlightDeckProps> = ({ playSound }) => {
  const { spotlightProjects } = portfolioData;
  const [centerIndex, setCenterIndex] = useState(0);

  const total = spotlightProjects.length;

  const handlePrev = () => {
    playSound('pop');
    setCenterIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    playSound('pop');
    setCenterIndex((prev) => (prev + 1) % total);
  };

  const handleCardClick = (index: number) => {
    if (index !== centerIndex) {
      playSound('pop');
      setCenterIndex(index);
    }
  };

  return (
    <section id="spotlight" className="relative py-8 border-t border-gray-200/80 dark:border-gray-800/80">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Featured Spotlight Deck</span>
          </h2>
          <p className="text-sm font-medium text-ink dark:text-gray-200 mt-1">
            Interactive Project Highlights (Click cards to cycle)
          </p>
        </div>

        {/* Deck Navigation Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrev}
            onMouseEnter={() => playSound('hover')}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-ink dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            onMouseEnter={() => playSound('hover')}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-ink dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Next project"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 3D Card Deck Container */}
      <div className="deck my-4">
        {spotlightProjects.map((project, index) => {
          let positionClass = '';
          const diff = (index - centerIndex + total) % total;

          if (diff === 0) {
            positionClass = 'is-center';
          } else if (diff === total - 1 || (total === 2 && diff === 1 && centerIndex === 0)) {
            positionClass = 'is-left';
          } else {
            positionClass = 'is-right';
          }

          const isCenter = diff === 0;

          return (
            <div
              key={project.id}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => !isCenter && playSound('hover')}
              className={`deck-card ${positionClass} rounded-2xl border border-gray-200 dark:border-[#222] bg-white dark:bg-[#111] p-5 sm:p-6 transition-all duration-500`}
            >
              {project.image && project.imageType === 'preview' && (
                <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-gray-100 dark:bg-[#1a1a1a]">
                  <img src={project.image} alt={`${project.title} preview`} className="aspect-video w-full object-cover" />
                </div>
              )}
              {/* Card Header */}
              <div className="flex items-start gap-3">
                {project.image && project.imageType !== 'preview' && (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a]">
                    <img src={project.image} alt={`${project.title} logo`} className="h-full w-full object-contain p-1.5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                    {project.category} • {project.year}
                  </span>
                  <h3 className="mt-1 text-base sm:text-lg font-bold text-ink dark:text-white leading-snug">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-[#aaa] line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md border border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#141414] px-2 py-0.5 font-mono text-[11px] text-gray-600 dark:text-[#aaa]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Link in Center Card (Live Only) */}
              {isCenter && project.liveUrl && (
                <div className="mt-5 flex items-center justify-end border-t border-gray-100 dark:border-[#1e1e1e] pt-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound('click');
                    }}
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    title="Launch Live Application"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>{project.liveUrl.replace(/^https?:\/\//, '')}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
