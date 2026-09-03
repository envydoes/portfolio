'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Search,
  CornerDownLeft,
  Bot,
  User,
  ArrowRight,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  playSound: (type?: 'click' | 'hover' | 'pop') => void;
}

export const AskAIModal: React.FC<AskAIModalProps> = ({
  isOpen,
  onClose,
  playSound,
}) => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { aiQuestions } = portfolioData;

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setAnswer(null);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const findAnswer = (searchQuery: string): string => {
    const clean = searchQuery.toLowerCase().trim();
    if (!clean) return '';

    // Search keywords match
    let bestMatch: { score: number; answer: string } = { score: 0, answer: '' };

    aiQuestions.forEach((item) => {
      let currentScore = 0;
      item.keywords.forEach((kw) => {
        if (clean.includes(kw.toLowerCase())) {
          currentScore += 1;
        }
      });

      if (clean.includes(item.question.toLowerCase())) {
        currentScore += 5;
      }

      if (currentScore > bestMatch.score) {
        bestMatch = { score: currentScore, answer: item.answer };
      }
    });

    if (bestMatch.score > 0) {
      return bestMatch.answer;
    }

    return "I don't have an exact answer for that yet, but you can review Joshua's background above or reach out directly at madulidjoshuam@gmail.com!";
  };

  const handleAsk = (q: string) => {
    playSound('pop');
    setQuery(q);
    setLoading(true);

    setTimeout(() => {
      const res = findAnswer(q);
      setAnswer(res);
      setLoading(false);
      playSound('hover');
    }, 280);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleAsk(query);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => {
          playSound('click');
          onClose();
        }}
        className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-xs transition-opacity animate-fade-up"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#111] p-6 shadow-2xl z-10 animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#1e1e1e] pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 dark:bg-[#1e1e1e] text-ink dark:text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-ink dark:text-white">
                Ask Joshua&apos;s AI Assistant
              </h2>
              <p className="font-mono text-xs text-gray-500 dark:text-[#777]">
                Instant answers regarding background, skills &amp; projects
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:text-ink dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1c1c1c] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-gray-400 dark:text-[#666]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything (e.g., Tech stack? Projects? SumEste Portal?)"
              className="w-full rounded-xl border border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#161616] pl-10 pr-20 py-3 font-mono text-sm text-ink dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#666] focus:border-gray-400 dark:focus:border-[#444] focus:outline-hidden"
            />
            <button
              type="submit"
              className="absolute right-2.5 inline-flex items-center gap-1 rounded-md bg-ink dark:bg-white text-white dark:text-black px-2.5 py-1 font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Ask</span>
              <CornerDownLeft className="h-3 w-3" />
            </button>
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[11px] text-gray-400 dark:text-[#666] mr-1">
            Suggestions:
          </span>
          {aiQuestions.slice(0, 4).map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAsk(item.question)}
              onMouseEnter={() => playSound('hover')}
              className="rounded-md border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#161616] px-2.5 py-1 font-mono text-xs text-gray-600 dark:text-[#aaa] hover:border-gray-400 dark:hover:border-[#444] hover:text-ink dark:hover:text-white transition-colors"
            >
              {item.question}
            </button>
          ))}
        </div>

        {/* Answer Box */}
        {answer !== null && (
          <div className="mt-5 rounded-xl border border-gray-200 dark:border-[#262626] bg-gray-50/70 dark:bg-[#161616] p-4.5">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-ink dark:bg-white text-white dark:text-black">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs font-semibold text-gray-500 dark:text-[#777] uppercase tracking-wider mb-1">
                  Answer
                </p>
                {loading ? (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="h-2 w-2 rounded-full bg-ink dark:bg-white animate-pulse"></span>
                    <span>Thinking...</span>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed text-ink dark:text-[#ddd]">
                    {answer}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between text-xs font-mono text-gray-400 dark:text-[#666]">
          <span>Tip: Press ESC to close</span>
          <span>Shortcut: ⌘K</span>
        </div>
      </div>
    </div>
  );
};
