'use client';

import React from 'react';
import {
  Activity,
  BookOpen,
  Code2,
  Target,
  Music,
  Coffee,
  MapPin,
  Sparkles,
  Award,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface CurrentlyBoardProps {
  playSound: (type?: 'click' | 'hover') => void;
}

export const CurrentlyBoard: React.FC<CurrentlyBoardProps> = ({ playSound }) => {
  const { currently } = portfolioData;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return BookOpen;
      case 'Code2':
        return Code2;
      case 'Target':
        return Target;
      case 'Award':
        return Award;
      case 'Music':
        return Music;
      case 'Coffee':
        return Coffee;
      case 'MapPin':
        return MapPin;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="currently" className="py-8 border-t border-gray-200/80 dark:border-[#1e1e1e]">
      <div className="mb-6">
        <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-[#666] font-bold flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-emerald-500" />
          <span>Currently</span>
        </h2>
        <p className="text-sm font-medium text-ink dark:text-[#ddd] mt-1">
          Real-time snapshot of what keeps me active &amp; learning
        </p>
      </div>

      <div className="divide-y divide-gray-200/70 dark:divide-[#1e1e1e] rounded-xl border border-gray-200 dark:border-[#222] bg-white/70 dark:bg-[#111] overflow-hidden">
        {currently.map((item, index) => {
          const Icon = getIcon(item.icon);
          return (
            <div
              key={index}
              onMouseEnter={() => playSound('hover')}
              className="flex items-start gap-4 p-4 hover:bg-gray-50/50 dark:hover:bg-[#161616] transition-colors"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-100 dark:bg-[#1a1a1a] text-gray-600 dark:text-[#aaa]">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[11px] text-gray-400 dark:text-[#777]">
                  {item.label}
                </p>
                <p className="text-xs sm:text-sm font-medium text-ink dark:text-[#e0e0e0] mt-0.5">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
