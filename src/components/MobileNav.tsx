'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Code2,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  Award,
  Users2,
  Search,
  Keyboard,
  CheckCircle2,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SoundToggle } from '@/components/SoundToggle';
import { ThemeMode } from '@/hooks/useTheme';
import { portfolioData } from '@/data/portfolioData';

interface MobileNavProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode, event: React.MouseEvent) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenAskAI: () => void;
  onOpenTyping: () => void;
  playSound: (type?: 'click' | 'hover' | 'pop') => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  theme,
  onThemeChange,
  soundEnabled,
  onToggleSound,
  onOpenAskAI,
  onOpenTyping,
  playSound,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { personalInfo } = portfolioData;

  const navLinks = [
    { label: 'Spotlight', href: '#spotlight', icon: Sparkles },
    { label: 'Tech Stack', href: '#stack', icon: Layers },
    { label: 'Projects', href: '#projects', icon: FolderGit2 },
    { label: 'Timeline', href: '#timeline', icon: GraduationCap },
    { label: 'Certifications', href: '#certifications', icon: Award },
    { label: 'Currently', href: '#currently', icon: Briefcase },
    { label: 'Contact', href: '#contact', icon: Users2 },
  ];

  const handleLinkClick = () => {
    playSound('click');
    setIsOpen(false);
  };

  return (
    <>
      {/* Sticky Mobile Header */}
      <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-gray-200/80 dark:border-[#1e1e1e] bg-white/90 dark:bg-[#0a0a0a]/95 px-5 backdrop-blur-md lg:hidden">
        <Link
          href="/"
          onClick={() => playSound('click')}
          className="flex items-center gap-2 font-mono text-sm font-bold text-ink dark:text-white"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-white dark:bg-white dark:text-ink font-mono text-xs font-black">
            JM
          </div>
          <span>{personalInfo.shortName}</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle
            theme={theme}
            onThemeChange={onThemeChange}
            onSound={() => playSound('click')}
          />
          <button
            type="button"
            onClick={() => {
              playSound('pop');
              setIsOpen((prev) => !prev);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 dark:border-[#2a2a2a] text-gray-600 dark:text-[#aaa]"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-[#0a0a0a] px-6 py-6 lg:hidden animate-fade-up">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#1e1e1e] pb-4">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-ink dark:text-white">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-white dark:bg-white dark:text-ink font-mono text-xs font-black">
                JM
              </div>
              <span>{personalInfo.name}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setIsOpen(false);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 dark:border-[#2a2a2a] text-gray-600 dark:text-[#aaa]"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-between overflow-y-auto py-6">
            <nav className="flex flex-col gap-2 font-mono text-sm">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 dark:text-[#aaa] hover:bg-gray-100 dark:hover:bg-[#161616] hover:text-ink dark:hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-gray-400 dark:text-[#666]" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="flex flex-col gap-3 border-t border-gray-200 dark:border-[#1e1e1e] pt-5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleLinkClick();
                    setTimeout(onOpenAskAI, 150);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#141414] py-2 font-mono text-xs text-ink dark:text-white"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Ask AI (⌘K)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleLinkClick();
                    setTimeout(onOpenTyping, 150);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#141414] py-2 font-mono text-xs text-ink dark:text-white"
                >
                  <Keyboard className="h-3.5 w-3.5" />
                  <span>Typing Test (⌘J)</span>
                </button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-[#222] p-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-xs text-gray-500 dark:text-[#888]">
                    Available for Projects
                  </span>
                </div>

                <SoundToggle
                  soundEnabled={soundEnabled}
                  onToggle={onToggleSound}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
