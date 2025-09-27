"use client";

import { useState } from 'react';
import { LANGUAGES } from '@/components/shared/languages';
import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageSelector() {
  const { selectedLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const selectedLang = LANGUAGES.find(lang => lang.code === selectedLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-background-container rounded-lg border border-border hover:bg-background-container/80 transition-colors"
      >
        <span className="text-lg">{selectedLang?.flag}</span>
        <span className="hidden sm:inline">{selectedLang?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[140px] bg-background-container border border-border rounded-lg shadow-lg z-10">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                changeLanguage(language.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-background-container/80 transition-colors first:rounded-t-lg last:rounded-b-lg ${language.code === selectedLanguage ? 'bg-primary/10 text-primary' : ''
                }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

