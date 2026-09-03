'use client';

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { ThemeMode } from '@/hooks/useTheme';

interface ThemeToggleProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode, event: React.MouseEvent) => void;
  onSound?: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onThemeChange, onSound }) => {
  const handleSelect = (mode: ThemeMode, e: React.MouseEvent) => {
    if (onSound) onSound();
    onThemeChange(mode, e);
  };

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-gray-200 dark:border-[#222] bg-gray-50/80 dark:bg-[#141414] p-0.5"
      role="group"
      aria-label="Theme switcher"
    >
      <button
        type="button"
        onClick={(e) => handleSelect('system', e)}
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          theme === 'system'
            ? 'bg-white dark:bg-[#262626] text-ink dark:text-white shadow-xs'
            : 'text-gray-400 hover:text-ink dark:hover:text-white'
        }`}
        title="System theme"
        aria-label="System theme"
      >
        <Monitor className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={(e) => handleSelect('light', e)}
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          theme === 'light'
            ? 'bg-white text-ink shadow-xs'
            : 'text-gray-400 hover:text-ink dark:hover:text-white'
        }`}
        title="Light theme"
        aria-label="Light theme"
      >
        <Sun className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={(e) => handleSelect('dark', e)}
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-white dark:bg-[#262626] text-ink dark:text-white shadow-xs'
            : 'text-gray-400 hover:text-ink dark:hover:text-white'
        }`}
        title="Dark theme"
        aria-label="Dark theme"
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
