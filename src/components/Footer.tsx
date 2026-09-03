'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface FooterProps {
  playSound: (type?: 'click' | 'hover') => void;
}

export const Footer: React.FC<FooterProps> = ({ playSound }) => {
  const { personalInfo } = portfolioData;

  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-gray-200/80 dark:border-[#1e1e1e] pt-8 pb-14 font-mono text-xs text-gray-500 dark:text-[#777]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-ink dark:text-[#e5e5e5]">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="mt-1 text-[11px] text-gray-400 dark:text-[#666]">
            Built with React, Next.js &amp; Tailwind CSS
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          onMouseEnter={() => playSound('hover')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white/50 dark:bg-[#141414] px-3 py-1.5 text-gray-600 dark:text-[#aaa] hover:border-gray-300 dark:hover:border-[#444] hover:text-ink dark:hover:text-white transition-all"
        >
          <span>Back to top</span>
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
};
