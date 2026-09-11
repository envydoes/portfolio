'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import githubWeeksData from '@/data/githubWeeks2026.json';

interface DayData {
  date: string;
  level: number;
  count: number;
  tooltip: string;
}

type WeekData = (DayData | null)[];

interface GithubContributionsProps {
  playSound?: (type?: 'click' | 'hover' | 'pop') => void;
}

export const GithubContributions: React.FC<GithubContributionsProps> = ({ playSound }) => {
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const weeks = githubWeeksData as WeekData[];

  // Helper to determine dot diameter matching Bryl Lim dot-matrix style
  const getDotStyle = (day: DayData) => {
    if (day.level === 0 || day.count === 0) {
      return 'w-[2.5px] h-[2.5px] bg-gray-300/80 dark:bg-[#333]';
    }
    if (day.level === 1 || day.count <= 2) {
      return 'w-[4.5px] h-[4.5px] bg-ink dark:bg-white';
    }
    if (day.level === 2 || day.count <= 5) {
      return 'w-[6.5px] h-[6.5px] bg-ink dark:bg-white';
    }
    if (day.level === 3 || day.count <= 9) {
      return 'w-[8.5px] h-[8.5px] bg-ink dark:bg-white';
    }
    // Level 4 / 10+ contributions
    return 'w-[11px] h-[11px] bg-ink dark:bg-white';
  };

  return (
    <section id="github" className="py-10 border-t border-gray-200/80 dark:border-[#1e1e1e]">
      {/* ── Section Header matching Bryl Lim design ── */}
      <div className="mb-5 flex items-baseline justify-between">
        <h3 className="font-mono text-[11px] lowercase tracking-wider text-gray-400 dark:text-[#666] font-semibold">
          github
        </h3>
        <a
          href="https://github.com/envydoes?tab=overview&from=2026-09-01&to=2026-09-11"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound?.('click')}
          onMouseEnter={() => playSound?.('hover')}
          className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-[#888] hover:text-ink dark:hover:text-white transition-colors flex items-center gap-0.5 group"
        >
          <span>@envydoes</span>
          <ArrowUpRight className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>

      {/* ── Bryl Lim Style Halftone Dot Matrix Calendar ── */}
      <div className="relative overflow-x-auto pb-3 pt-1 scrollbar-none">
        <div className="inline-flex gap-[3px] sm:gap-1 items-center">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-[3px] sm:gap-1">
              {week.map((day, dayIdx) => {
                if (!day) {
                  return (
                    <div
                      key={`empty-${weekIdx}-${dayIdx}`}
                      className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px]"
                    />
                  );
                }

                const dotClass = getDotStyle(day);
                const isHovered = hoveredDay?.date === day.date;

                return (
                  <div
                    key={day.date}
                    onMouseEnter={() => {
                      setHoveredDay(day);
                      if (day.count > 0) playSound?.('hover');
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                    className="relative w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] flex items-center justify-center cursor-pointer group"
                  >
                    <span
                      className={`rounded-full transition-transform duration-150 ${dotClass} ${
                        isHovered ? 'scale-135 ring-2 ring-blue-500/50' : ''
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── Status Bar / Live Hover Details ── */}
      <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-gray-400 dark:text-[#666]">
        <div className="h-4 flex items-center">
          {hoveredDay ? (
            <span className="text-ink dark:text-gray-200 transition-opacity animate-in fade-in duration-150">
              <span className="font-semibold">{hoveredDay.count}</span> {hoveredDay.count === 1 ? 'contribution' : 'contributions'} on{' '}
              {new Date(hoveredDay.date + 'T00:00:00Z').toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC',
              })}
            </span>
          ) : (
            <span className="text-gray-400 dark:text-[#555]">
              166 contributions in 2026
            </span>
          )}
        </div>

        {/* Minimal dot size legend */}
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-[#555]">
          <span>Less</span>
          <span className="w-[2.5px] h-[2.5px] rounded-full bg-gray-300 dark:bg-[#333]" />
          <span className="w-[4.5px] h-[4.5px] rounded-full bg-ink dark:bg-white" />
          <span className="w-[7px] h-[7px] rounded-full bg-ink dark:bg-white" />
          <span className="w-[10px] h-[10px] rounded-full bg-ink dark:bg-white" />
          <span>More</span>
        </div>
      </div>
    </section>
  );
};

