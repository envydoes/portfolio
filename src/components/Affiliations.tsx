'use client';

import React from 'react';
import {
  Users2,
  Mail,
  Github,
  Linkedin,
  Instagram,
  ArrowUpRight,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface AffiliationsProps {
  playSound: (type?: 'click' | 'hover') => void;
}

export const Affiliations: React.FC<AffiliationsProps> = ({ playSound }) => {
  const { affiliations, personalInfo } = portfolioData;

  return (
    <section id="affiliations" className="py-8 border-t border-gray-200/80 dark:border-[#1e1e1e]">
      <div id="contact" className="mb-6">
        <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-[#666] font-bold flex items-center gap-2">
          <Users2 className="h-3.5 w-3.5" />
          <span>Affiliations &amp; Connect</span>
        </h2>
        <p className="text-sm font-medium text-ink dark:text-[#ddd] mt-1">
          Organizations, professional networks &amp; employer contact
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Affiliations Card */}
        <div className="rounded-xl border border-gray-200 dark:border-[#222] bg-white/70 dark:bg-[#111] p-5">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#888] mb-3">
            A Member of
          </h3>
          <div className="divide-y divide-gray-100 dark:divide-[#1e1e1e]">
            {affiliations.map((item, i) => (
              <a
                key={i}
                href={item.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                onMouseEnter={() => playSound('hover')}
                className="group flex items-center justify-between py-2.5 text-xs sm:text-sm text-gray-700 dark:text-[#ccc] hover:text-blue-600 dark:hover:text-white transition-colors"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  {item.role && (
                    <p className="font-mono text-[11px] text-gray-400 dark:text-[#777]">
                      {item.role}
                    </p>
                  )}
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>

        {/* Social Links Card */}
        <div className="rounded-xl border border-gray-200 dark:border-[#222] bg-white/70 dark:bg-[#111] p-5">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#888] mb-3">
            Social &amp; Professional
          </h3>
          <div className="space-y-2">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center justify-between rounded-lg border border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-[#161616] px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-[#ccc] hover:border-gray-300 dark:hover:border-[#3a3a3a] hover:text-ink dark:hover:text-white transition-all"
            >
              <span className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <span>GitHub (@envydoes)</span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center justify-between rounded-lg border border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-[#161616] px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-[#ccc] hover:border-gray-300 dark:hover:border-[#3a3a3a] hover:text-ink dark:hover:text-white transition-all"
            >
              <span className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-blue-500" />
                <span>LinkedIn Profile</span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
            </a>

            {personalInfo.socials.instagram && (
              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                onMouseEnter={() => playSound('hover')}
                className="flex items-center justify-between rounded-lg border border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-[#161616] px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-[#ccc] hover:border-gray-300 dark:hover:border-[#3a3a3a] hover:text-ink dark:hover:text-white transition-all"
              >
                <span className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-500" />
                  <span>Instagram</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
              </a>
            )}
          </div>
        </div>

        {/* Get in Touch Card */}
        <div className="rounded-xl border border-gray-200 dark:border-[#222] bg-white/70 dark:bg-[#111] p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#888] mb-2">
              Let's Work Together
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-[#999] leading-relaxed">
              Open to collaborations, freelance projects, and exciting opportunities. Let's build something great together.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-[#1e1e1e]">
            <a
              href={personalInfo.socials.email}
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink text-white dark:bg-white dark:text-black px-4 py-2 text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
