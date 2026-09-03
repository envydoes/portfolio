'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, X, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface TypingModalProps {
  isOpen: boolean;
  onClose: () => void;
  playSound: (type?: 'click' | 'hover' | 'pop' | 'success') => void;
}

export const TypingModal: React.FC<TypingModalProps> = ({
  isOpen,
  onClose,
  playSound,
}) => {
  const { typingQuotes } = portfolioData;
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentQuote = typingQuotes[quoteIndex]?.quote || '';
  const currentAuthor = typingQuotes[quoteIndex]?.author || '';

  useEffect(() => {
    if (isOpen) {
      handleReset();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, quoteIndex]);

  const handleReset = () => {
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
  };

  const handleNextQuote = () => {
    playSound('pop');
    setQuoteIndex((prev) => (prev + 1) % typingQuotes.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isCompleted) return;

    if (!startTime && val.length === 1) {
      setStartTime(Date.now());
    }

    setUserInput(val);
    playSound('hover');

    // Calculate Accuracy
    let errors = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== currentQuote[i]) {
        errors++;
      }
    }
    const acc =
      val.length > 0
        ? Math.max(0, Math.round(((val.length - errors) / val.length) * 100))
        : 100;
    setAccuracy(acc);

    // Calculate WPM
    if (startTime) {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      if (elapsedMinutes > 0.01) {
        const wordsTyped = (val.length - errors) / 5;
        const currentWpm = Math.round(wordsTyped / elapsedMinutes);
        setWpm(Math.max(0, currentWpm));
      }
    }

    // Check completion
    if (val === currentQuote) {
      setIsCompleted(true);
      playSound('success');
    }
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

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#111] p-6 shadow-2xl z-10 animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#1e1e1e] pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 dark:bg-[#1e1e1e] text-ink dark:text-white">
              <Keyboard className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-ink dark:text-white">
                Developer Speed Typing Test
              </h2>
              <p className="font-mono text-xs text-gray-500 dark:text-[#777]">
                Test your typing velocity on iconic developer quotes
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

        {/* Stats Row */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-gray-200 dark:border-[#222] bg-gray-50/70 dark:bg-[#161616] p-3 text-center">
            <p className="font-mono text-[11px] text-gray-400 dark:text-[#777]">SPEED (WPM)</p>
            <p className="text-xl font-mono font-bold text-ink dark:text-white">{wpm}</p>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-[#222] bg-gray-50/70 dark:bg-[#161616] p-3 text-center">
            <p className="font-mono text-[11px] text-gray-400 dark:text-[#777]">ACCURACY</p>
            <p className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {accuracy}%
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-[#222] bg-gray-50/70 dark:bg-[#161616] p-3 text-center">
            <p className="font-mono text-[11px] text-gray-400 dark:text-[#777]">STATUS</p>
            <p className="text-base font-mono font-bold text-ink dark:text-white mt-0.5">
              {isCompleted ? 'Finished!' : startTime ? 'Typing...' : 'Ready'}
            </p>
          </div>
        </div>

        {/* Quote Display Area */}
        <div className="mt-5 rounded-xl border border-gray-200 dark:border-[#222] bg-gray-50/40 dark:bg-[#161616] p-5">
          <div className="font-mono text-sm sm:text-base leading-relaxed select-none">
            {currentQuote.split('').map((char, index) => {
              let charClass = 'text-gray-400 dark:text-[#666]';
              if (index < userInput.length) {
                charClass =
                  userInput[index] === char
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-red-500 bg-red-500/20 underline';
              } else if (index === userInput.length) {
                charClass = 'text-ink dark:text-white bg-blue-500/20 underline';
              }
              return (
                <span key={index} className={charClass}>
                  {char}
                </span>
              );
            })}
          </div>
          <p className="mt-3 text-right font-mono text-xs text-gray-400 dark:text-[#666] italic">
            — {currentAuthor}
          </p>
        </div>

        {/* Input box */}
        <div className="mt-4">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={isCompleted}
            placeholder={isCompleted ? 'Completed! Press Restart or Next Quote' : 'Start typing the quote above...'}
            className="w-full rounded-xl border border-gray-200 dark:border-[#222] bg-white dark:bg-[#161616] px-4 py-3 font-mono text-sm text-ink dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#666] focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-hidden"
          />
        </div>

        {/* Success Banner */}
        {isCompleted && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 animate-fade-up">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-emerald-500" />
              <span className="font-mono text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Splendid! {wpm} WPM with {accuracy}% accuracy!
              </span>
            </div>
            <button
              type="button"
              onClick={handleNextQuote}
              className="rounded-lg bg-emerald-600 px-3 py-1 font-mono text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              Next Quote
            </button>
          </div>
        )}

        {/* Controls footer */}
        <div className="mt-5 flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#1e1e1e]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                handleReset();
              }}
              onMouseEnter={() => playSound('hover')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#161616] px-3 py-1.5 font-mono text-xs text-gray-600 dark:text-[#aaa] hover:text-ink dark:hover:text-white transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleNextQuote}
              onMouseEnter={() => playSound('hover')}
              className="rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#161616] px-3 py-1.5 font-mono text-xs text-gray-600 dark:text-[#aaa] hover:text-ink dark:hover:text-white transition-colors"
            >
              Change Quote
            </button>
          </div>

          <span className="font-mono text-[11px] text-gray-400 dark:text-[#666]">
            Shortcut: ⌘J / Ctrl+J
          </span>
        </div>
      </div>
    </div>
  );
};
