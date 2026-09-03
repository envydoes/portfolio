'use client';

import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface TimelineProps {
  playSound: (type?: 'click' | 'hover') => void;
}

export const Timeline: React.FC<TimelineProps> = ({ playSound }) => {
  const { timeline } = portfolioData;

  return (
    <section id="timeline" className="py-8 border-t border-gray-200/80 dark:border-[#1e1e1e]">
      <div className="mb-6">
        <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-[#666] font-bold flex items-center gap-2">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Education &amp; Experience Timeline</span>
        </h2>
        <p className="text-sm font-medium text-ink dark:text-[#ddd] mt-1">
          Academic foundation &amp; experience
        </p>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-gray-200 dark:before:bg-[#222]">
        {timeline.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => playSound('hover')}
            className="relative group"
          >
            {/* Dot on vertical line */}
            <div
              className={`absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-[#0a0a0a] ${
                item.isFilledDot
                  ? 'bg-ink dark:bg-white ring-2 ring-black/10 dark:ring-white/20'
                  : 'bg-gray-300 dark:bg-[#333]'
              }`}
            />

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-ink dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-[#999] mt-0.5">
                  {item.organization}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 font-mono text-xs text-gray-400 dark:text-[#666] shrink-0">
                <Calendar className="h-3 w-3" />
                {item.period}
              </span>
            </div>

            {item.description && (
              <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-[#888] leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
