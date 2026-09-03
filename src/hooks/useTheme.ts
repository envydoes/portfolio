'use client';

import { useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'joshua_portfolio_theme';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  // Apply theme class to document root
  const applyTheme = useCallback((mode: ThemeMode) => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const isDark =
      mode === 'dark' ||
      (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    let initialTheme: ThemeMode = 'dark';
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        initialTheme = stored;
      }
    } catch {
      // ignore
    }

    setThemeState(initialTheme);
    applyTheme(initialTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      try {
        const current = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
        if (current === 'system') {
          applyTheme('system');
        }
      } catch {
        // ignore
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme]);

  const setTheme = useCallback(
    (newTheme: ThemeMode, event?: React.MouseEvent) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch {
        // ignore
      }

      if (typeof document === 'undefined') return;

      const root = document.documentElement;
      const willBeDark =
        newTheme === 'dark' ||
        (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

      const currentlyDark = root.classList.contains('dark');
      if (willBeDark === currentlyDark) {
        applyTheme(newTheme);
        return;
      }

      // Check if View Transitions API is available and user doesn't prefer reduced motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      type DocWithTransition = Document & {
        startViewTransition?: (callback: () => void) => {
          ready: Promise<void>;
        };
      };
      const docWithTransition = document as DocWithTransition;

      if (!prefersReduced && typeof docWithTransition.startViewTransition === 'function') {
        const x = event?.clientX ?? window.innerWidth / 2;
        const y = event?.clientY ?? window.innerHeight / 2;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        const transition = docWithTransition.startViewTransition(() => {
          applyTheme(newTheme);
        });

        transition.ready.then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 450,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        });
      } else {
        root.classList.add('theme-anim');
        applyTheme(newTheme);
        setTimeout(() => {
          root.classList.remove('theme-anim');
        }, 500);
      }
    },
    [applyTheme]
  );

  return { theme, setTheme, mounted };
}

