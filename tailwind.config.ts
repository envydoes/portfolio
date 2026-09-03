import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        pixel: ['var(--font-geist-pixel)', 'var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        bg: 'rgb(var(--bg) / <alpha-value>)',
        accent: {
          50: 'rgb(var(--accent-50) / <alpha-value>)',
          100: 'rgb(var(--accent-100) / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
        },
        gray: {
          50: 'rgb(var(--g50) / <alpha-value>)',
          100: 'rgb(var(--g100) / <alpha-value>)',
          200: 'rgb(var(--g200) / <alpha-value>)',
          300: 'rgb(var(--g300) / <alpha-value>)',
          400: 'rgb(var(--g400) / <alpha-value>)',
          500: 'rgb(var(--g500) / <alpha-value>)',
          600: 'rgb(var(--g600) / <alpha-value>)',
          700: 'rgb(var(--g700) / <alpha-value>)',
          800: 'rgb(var(--g800) / <alpha-value>)',
          900: 'rgb(var(--g900) / <alpha-value>)',
          950: 'rgb(var(--g950) / <alpha-value>)',
        },
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'blink 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

