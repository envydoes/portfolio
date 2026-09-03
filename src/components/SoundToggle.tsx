'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  soundEnabled: boolean;
  onToggle: () => void;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ soundEnabled, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 dark:border-[#222] text-gray-500 hover:text-ink dark:hover:text-white transition-colors duration-200"
      aria-label={soundEnabled ? 'Disable interface sounds' : 'Enable interface sounds'}
      title={soundEnabled ? 'Sound FX On' : 'Sound FX Off'}
    >
      {soundEnabled ? (
        <Volume2 className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <VolumeX className="h-3.5 w-3.5" />
      )}
    </button>
  );
};

