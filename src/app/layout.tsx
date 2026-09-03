import type { Metadata } from 'next';
import './globals.css';
import { portfolioData } from '@/data/portfolioData';

export const metadata: Metadata = {
  title: `${portfolioData.personalInfo.name} — Full-Stack Developer & Software Engineer`,
  description: portfolioData.personalInfo.tagline,
  keywords: [
    'Joshua M. Madulid',
    'Joshua Madulid',
    'envydoes',
    'Full-Stack Developer',
    'React',
    'Next.js',
    'Laravel',
    'PHP',
    'TypeScript',
    'NEUST',
    'Portfolio',
  ],
  authors: [{ name: portfolioData.personalInfo.name, url: 'https://github.com/envydoes' }],
  creator: portfolioData.personalInfo.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://madulidjoshuam.vercel.app',
    title: `${portfolioData.personalInfo.name} — Portfolio`,
    description: portfolioData.personalInfo.tagline,
    siteName: portfolioData.personalInfo.name,
    images: [
      {
        url: portfolioData.personalInfo.avatarUrl,
        width: 400,
        height: 400,
        alt: portfolioData.personalInfo.name,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: `${portfolioData.personalInfo.name} — Portfolio`,
    description: portfolioData.personalInfo.tagline,
    images: [portfolioData.personalInfo.avatarUrl],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/joshua.jpg" type="image/jpeg" />
      </head>
      <body className="relative bg-white dark:bg-[#0a0a0a] text-ink dark:text-[#f4f4f5] antialiased">
        {/* Signature Halftone Radial Backdrop Gradients */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="halftone halftone-wide mask-tr absolute right-0 top-0 h-[75vh] w-[70vw] opacity-15 dark:opacity-20"></div>
          <div className="halftone mask-bl absolute bottom-0 left-0 h-[65vh] w-[60vw] opacity-10 dark:opacity-15"></div>
        </div>

        {/* Application Shell */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

