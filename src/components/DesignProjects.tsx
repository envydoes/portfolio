'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Figma, X } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface DesignProjectsProps {
  playSound: (type?: 'click' | 'hover' | 'pop') => void;
}

export const DesignProjects: React.FC<DesignProjectsProps> = ({ playSound }) => {
  const { designProjects } = portfolioData;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);

  const selectedDesign = selectedIndex === null ? null : designProjects[selectedIndex];
  const selectedScreen = selectedDesign?.screens[selectedScreenIndex];

  const selectDesign = (index: number) => {
    playSound('pop');
    setSelectedScreenIndex(0);
    setSelectedIndex(index);
  };

  const moveScreen = (direction: number) => {
    if (!selectedDesign) return;
    playSound('pop');
    setSelectedScreenIndex((selectedScreenIndex + direction + selectedDesign.screens.length) % selectedDesign.screens.length);
  };

  return (
    <section id="design-projects" className="py-10 border-t border-gray-200/80 dark:border-[#1e1e1e]">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold flex items-center gap-2">
            <Figma className="h-3.5 w-3.5" />
            <span>Design Projects</span>
          </h2>
          <p className="mt-1 text-sm font-medium text-ink dark:text-gray-200">
            Interactive Project Highlights (Click cards to cycle)
          </p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-[#666]">
          {designProjects.length} project{designProjects.length === 1 ? '' : 's'} / {designProjects.reduce((total, design) => total + design.screens.length, 0)} screens
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {designProjects.map((design, index) => (
          <button
            key={design.id}
            type="button"
            onClick={() => selectDesign(index)}
            onMouseEnter={() => playSound('hover')}
            className="group overflow-hidden rounded-xl border border-gray-200 dark:border-[#222] bg-white/70 text-left dark:bg-[#111] transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-[#444]"
          >
            <div className="aspect-video overflow-hidden border-b border-gray-200 dark:border-[#222] bg-gray-100 dark:bg-[#1a1a1a]">
              <img src={design.image} alt={`${design.title} preview`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-ink dark:text-white">{design.title}</h3>
                <span className="shrink-0 font-mono text-[10px] uppercase text-gray-400 dark:text-[#666]">View</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-[#aaa]">{design.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {design.tags.map((tag) => (
                  <span key={tag} className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[9px] text-gray-500 dark:bg-[#1f1f1f] dark:text-[#999]">#{tag}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setSelectedIndex(null)}>
          <div className="relative w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl dark:border-[#2a2a2a] dark:bg-[#111]" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between px-2 pb-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 dark:text-[#666]">{selectedScreenIndex + 1} / {selectedDesign.screens.length} screens</p>
                <h3 className="mt-1 text-base font-bold text-ink dark:text-white">{selectedScreen?.title}</h3>
              </div>
              <button type="button" onClick={() => setSelectedIndex(null)} className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-ink dark:hover:bg-[#1d1d1d] dark:hover:text-white" aria-label="Close design preview">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-[#2a2a2a]">
              {selectedScreen && <img src={selectedScreen.image} alt={`${selectedScreen.title} design`} className="max-h-[70vh] w-full object-contain" />}
            </div>
            <div className="flex items-center justify-between gap-3 px-2 pt-3">
              <button type="button" onClick={() => moveScreen(-1)} className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-500 hover:text-ink dark:text-[#aaa] dark:hover:text-white" aria-label="Previous design screen">
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </button>
              <a href={selectedDesign.designUrl} target="_blank" rel="noopener noreferrer" onClick={() => playSound('click')} className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400">
                Open in Figma <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button type="button" onClick={() => moveScreen(1)} className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-500 hover:text-ink dark:text-[#aaa] dark:hover:text-white" aria-label="Next design screen">
                Next <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};