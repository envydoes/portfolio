'use client';

import React from 'react';
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  ArrowUpRight,
  Code2,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface HeroProps {
  onOpenAskAI: () => void;
  playSound: (type?: 'click' | 'hover' | 'pop') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAskAI, playSound }) => {
  const { personalInfo, about } = portfolioData;

  return (
    <section className="relative pt-6 pb-12">
      {/* ── Top Header Profile Row ── */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Avatar */}
        <div className="relative group shrink-0">
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-[#2a2a2a] bg-gray-100 dark:bg-[#1a1a1a] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.name}
              className="h-full w-full object-cover"
              style={{ objectPosition: '50% 15%' }}
            />
            <div className="absolute inset-0 rounded-2xl border border-white/20 dark:border-white/5 pointer-events-none" />
          </div>
          {/* Online badge */}
          {personalInfo.status.available && (
            <span
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white dark:border-[#0a0a0a] bg-emerald-500 shadow-xs"
              title={personalInfo.status.text}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white pulse-dot"></span>
            </span>
          )}
        </div>

        {/* Identity */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink dark:text-white">
              {personalInfo.name}
            </h1>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-xs text-gray-500 dark:text-[#666]">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gray-400 dark:text-[#555]" />
              {personalInfo.location}
            </span>
            <span>•</span>
            <span className="text-ink dark:text-[#aaa] font-medium">@{personalInfo.handle}</span>
          </div>

          <p className="mt-2 text-sm sm:text-base font-medium text-gray-600 dark:text-[#999]">
            {personalInfo.role}
          </p>

          {/* CTAs */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <a
              href={personalInfo.socials.email}
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              className="inline-flex items-center gap-2 rounded-lg bg-ink text-white dark:bg-white dark:text-black px-4 py-2 text-xs sm:text-sm font-semibold shadow-sm hover:opacity-85 transition-opacity"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Send Email</span>
            </a>

            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-transparent dark:bg-[#141414] px-3.5 py-2 text-xs sm:text-sm font-medium text-ink dark:text-[#ccc] hover:border-gray-400 dark:hover:border-[#444] dark:hover:text-white transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="h-3 w-3 opacity-60" />
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-transparent dark:bg-[#141414] px-3.5 py-2 text-xs sm:text-sm font-medium text-ink dark:text-[#ccc] hover:border-gray-400 dark:hover:border-[#444] dark:hover:text-white transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>

            <button
              type="button"
              onClick={() => { playSound('pop'); onOpenAskAI(); }}
              onMouseEnter={() => playSound('hover')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-transparent dark:bg-[#141414] px-3 py-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-[#888] hover:text-ink dark:hover:text-white hover:border-gray-400 dark:hover:border-[#444] transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask AI (⌘K)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <div className="mt-10 border-t border-gray-200/80 dark:border-[#1e1e1e] pt-8">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-gray-400 dark:text-[#555] font-bold flex items-center gap-2 mb-4">
          <Code2 className="h-3.5 w-3.5" />
          <span>About Me</span>
        </h2>
        <div className="space-y-3.5 text-sm sm:text-base leading-relaxed text-gray-600 dark:text-[#888]">
          {about.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

      </div>
    </section>
  );
};
