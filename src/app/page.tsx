'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MobileNav } from '@/components/MobileNav';
import { Hero } from '@/components/Hero';
import { SpotlightDeck } from '@/components/SpotlightDeck';
import { DesignProjects } from '@/components/DesignProjects';
import { TechStack } from '@/components/TechStack';
import { Timeline } from '@/components/Timeline';
import { Certifications } from '@/components/Certifications';
import { CurrentlyBoard } from '@/components/CurrentlyBoard';
import { Affiliations } from '@/components/Affiliations';
import { Footer } from '@/components/Footer';
import { AskAIModal } from '@/components/AskAIModal';
import { TypingModal } from '@/components/TypingModal';
import { useTheme } from '@/hooks/useTheme';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function HomePage() {
  const { theme, setTheme, mounted } = useTheme();
  const { soundEnabled, toggleSound, playSound } = useSoundEffects();

  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [isTypingOpen, setIsTypingOpen] = useState(false);

  // Global Keyboard Shortcuts (⌘K for AI Assistant, ⌘J for Typing Test)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playSound('pop');
        setIsAskAIOpen((prev) => !prev);
      } else if (isCmdOrCtrl && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        playSound('pop');
        setIsTypingOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playSound]);

  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar (lg+) */}
      <Sidebar
        theme={theme}
        onThemeChange={setTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenAskAI={() => setIsAskAIOpen(true)}
        onOpenTyping={() => setIsTypingOpen(true)}
        playSound={playSound}
      />

      {/* Mobile Top Header and Navigation (below lg) */}
      <MobileNav
        theme={theme}
        onThemeChange={setTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenAskAI={() => setIsAskAIOpen(true)}
        onOpenTyping={() => setIsTypingOpen(true)}
        playSound={playSound}
      />

      {/* Main Content Column */}
      <main className="mx-auto w-full max-w-[820px] px-6 sm:px-10 py-10 lg:py-16 lg:pl-[270px]">
        {/* Profile & Narrative Hero */}
        <Hero
          onOpenAskAI={() => setIsAskAIOpen(true)}
          playSound={playSound}
        />

        {/* 3D Spotlight Project Deck */}
        <SpotlightDeck playSound={playSound} />

        {/* Figma Design Gallery */}
        <DesignProjects playSound={playSound} />

        {/* Tech Stack & Skills */}
        <TechStack playSound={playSound} />

        {/* Education & Experience Timeline */}
        <Timeline playSound={playSound} />

        {/* Certifications */}
        <Certifications playSound={playSound} />

        {/* "Currently" Real-time Board */}
        <CurrentlyBoard playSound={playSound} />

        {/* Affiliations, Memberships & Contact */}
        <Affiliations playSound={playSound} />

        {/* Footer */}
        <Footer playSound={playSound} />
      </main>

      {/* Interactive Modals */}
      <AskAIModal
        isOpen={isAskAIOpen}
        onClose={() => setIsAskAIOpen(false)}
        playSound={playSound}
      />

      <TypingModal
        isOpen={isTypingOpen}
        onClose={() => setIsTypingOpen(false)}
        playSound={playSound}
      />
    </div>
  );
}

