'use client';

import React from 'react';
import {
  CheckCircle2,
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
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-[#2a2a2a] bg-gray-100 dark:bg-[#1a1a1a] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.name}
              className="h-full w-full object-cover"
              style={{ objectPosition: '50% 15%' }}
            />
            <div className="absolute inset-0 rounded-2xl border border-white/20 dark:border-white/5 pointer-events-none" />
          </div>
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
            <span className="inline-flex items-center" title="Verified Developer Profile">
              <CheckCircle2 className="h-5 w-5 fill-blue-500 text-white dark:text-[#0a0a0a]" />
            </span>
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

        {/* Quick Specs */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="rounded-lg border border-gray-200/70 dark:border-[#222] bg-gray-50/50 dark:bg-[#141414] p-2.5 text-center">
            <span className="font-mono text-[9px] uppercase text-gray-400 dark:text-[#555] block mb-0.5">Degree</span>
            <span className="font-mono text-[11px] font-bold text-ink dark:text-white">BSIT @ NEUST</span>
          </div>
          <div className="rounded-lg border border-gray-200/70 dark:border-[#222] bg-gray-50/50 dark:bg-[#141414] p-2.5 text-center">
            <span className="font-mono text-[9px] uppercase text-gray-400 dark:text-[#555] block mb-0.5">Capstone</span>
            <span className="font-mono text-[11px] font-bold text-ink dark:text-white">SumEste Portal</span>
          </div>
          <a
            href="https://github.com/envydoes?tab=overview&from=2026-09-01&to=2026-09-11"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            onMouseEnter={() => playSound('hover')}
            className="rounded-lg border border-gray-200/70 dark:border-[#222] bg-gray-50/50 dark:bg-[#141414] p-2.5 text-center hover:border-gray-400 dark:hover:border-[#444] transition-colors group"
          >
            <span className="font-mono text-[9px] uppercase text-gray-400 dark:text-[#555] block mb-0.5 flex items-center justify-center gap-1">
              GitHub 2026
              <ArrowUpRight className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">166 Contributions</span>
          </a>
          <div className="rounded-lg border border-gray-200/70 dark:border-[#222] bg-gray-50/50 dark:bg-[#141414] p-2.5 text-center">
            <span className="font-mono text-[9px] uppercase text-gray-400 dark:text-[#555] block mb-0.5">Stack</span>
            <span className="font-mono text-[11px] font-bold text-ink dark:text-white">Full-Stack</span>
          </div>
        </div>

      </div>
    </section>
  );
};
