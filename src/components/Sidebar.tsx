'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Layers,
  FolderGit2,
  GraduationCap,
  Award,
  Activity,
  Users2,
  Mail,
  Keyboard,
  Search,
  Code2,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SoundToggle } from './SoundToggle';
import { ThemeMode } from '@/hooks/useTheme';
import { portfolioData } from '@/data/portfolioData';

interface SidebarProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode, e: React.MouseEvent) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenAskAI: () => void;
  onOpenTyping: () => void;
  playSound: (type?: 'click' | 'hover' | 'pop') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  theme,
  onThemeChange,
  soundEnabled,
  onToggleSound,
  onOpenAskAI,
  onOpenTyping,
  playSound,
}) => {
  const { personalInfo, presence } = portfolioData;

  const navLinks = [
    { label: 'Spotlight', href: '#spotlight', icon: Sparkles },
    { label: 'Tech Stack', href: '#stack', icon: Layers },
    { label: 'Projects', href: '#projects', icon: FolderGit2 },
    { label: 'Timeline', href: '#timeline', icon: GraduationCap },
    { label: 'Certifications', href: '#certifications', icon: Award },
    { label: 'Currently', href: '#currently', icon: Activity },
    { label: 'Affiliations', href: '#affiliations', icon: Users2 },
    { label: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col justify-between border-r border-gray-200 dark:border-[#222] bg-white/95 dark:bg-[#0a0a0a] backdrop-blur-md px-6 py-7 lg:flex">
      {/* Top Header */}
      <div className="flex flex-col">
        <Link
          href="/"
          onClick={() => playSound('click')}
          onMouseEnter={() => playSound('hover')}
          className="group inline-flex items-center gap-2 font-mono text-[14px] font-bold tracking-tight text-ink dark:text-white transition-opacity hover:opacity-75"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-white dark:bg-white dark:text-ink font-mono text-xs font-black shadow-xs">
            JM
          </div>
          <span>{personalInfo.name}</span>
        </Link>
        {/* Navigation Links */}
        <nav className="mt-6 flex flex-col gap-1 font-mono text-[12.5px]">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => playSound('click')}
                onMouseEnter={() => playSound('hover')}
                className="group relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] hover:text-ink dark:hover:text-white transition-all duration-150"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 opacity-70 group-hover:opacity-100 text-gray-400 group-hover:text-ink dark:group-hover:text-white transition-colors" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Interactive Tool Actions */}
      <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 dark:border-[#222]">
        {/* Ask AI / ⌘K */}
        <button
          type="button"
          onClick={() => {
            playSound('pop');
            onOpenAskAI();
          }}
          onMouseEnter={() => playSound('hover')}
          className="group flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#141414] px-2.5 py-1.5 text-[12px] text-gray-500 dark:text-[#888] hover:border-gray-300 dark:hover:border-[#444] hover:text-ink dark:hover:text-white transition-all"
        >
          <span className="flex items-center gap-1.5">
            <Search className="h-3.5 w-3.5" />
            <span>Ask anything</span>
          </span>
          <span className="inline-flex items-center gap-0.5">
            <kbd className="font-mono text-[10px]">⌘</kbd>
            <kbd className="font-mono text-[10px]">K</kbd>
          </span>
        </button>

        {/* Speed Typing Test / ⌘J */}
        <button
          type="button"
          onClick={() => {
            playSound('pop');
            onOpenTyping();
          }}
          onMouseEnter={() => playSound('hover')}
          className="group flex w-full items-center justify-between rounded-lg border border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#141414] px-2.5 py-1.5 text-[12px] text-gray-500 dark:text-[#888] hover:border-gray-300 dark:hover:border-[#444] hover:text-ink dark:hover:text-white transition-all"
        >
          <span className="flex items-center gap-1.5">
            <Keyboard className="h-3.5 w-3.5" />
            <span>Typing test</span>
          </span>
          <span className="inline-flex items-center gap-0.5">
            <kbd className="font-mono text-[10px]">⌘</kbd>
            <kbd className="font-mono text-[10px]">J</kbd>
          </span>
        </button>

        {/* Live Presence indicator */}
        <div className="rounded-lg border border-gray-200/80 dark:border-[#1e1e1e] bg-gray-50/30 dark:bg-[#141414] p-2.5">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <p className="font-mono text-[10.5px] text-gray-400 dark:text-[#777]">
              <span className="font-bold text-ink dark:text-gray-200">{presence.baseCount}</span> people exploring portfolio
            </p>
          </div>
        </div>

        {/* Theme & Sound Bar */}
        <div className="flex items-center justify-between pt-1">
          <ThemeToggle
            theme={theme}
            onThemeChange={onThemeChange}
            onSound={() => playSound('click')}
          />
          <SoundToggle soundEnabled={soundEnabled} onToggle={onToggleSound} />
        </div>

        {/* Email Footer Link */}
        <div className="pt-2 border-t border-gray-200/60 dark:border-[#1e1e1e]">
          <p className="font-mono text-[11px] text-gray-400 dark:text-[#777]">
            Contact:
          </p>
          <a
            href={personalInfo.socials.email}
            onClick={() => playSound('click')}
            onMouseEnter={() => playSound('hover')}
            className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11.5px] font-medium text-ink hover:text-gray-600 dark:text-gray-200 dark:hover:text-white transition-colors"
          >
            <Mail className="h-3 w-3" />
            <span className="truncate">{personalInfo.email}</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

