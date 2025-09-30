"use client";

import { LANGUAGES } from '@/components/shared/languages';
import { redirect, usePathname } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import type { routing } from '@/i18n/routing';
import type { LanguageCode } from '@/components/shared/languages';

type Locale = typeof routing.locales[number];

export default function LanguageSelector() {
  const pathname = usePathname();
  const { selectedLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 표시할 언어 (localStorage의 selectedLanguage 사용)
  const selectedLang = LANGUAGES.find(lang => lang.code === selectedLanguage);

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLanguageChange = (languageCode: string) => {
    setIsOpen(false);
    // useLanguage 훅을 통해 localStorage에 저장
    changeLanguage(languageCode as LanguageCode);
    // 페이지 라우팅 변경
    redirect({ href: pathname, locale: languageCode as Locale });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-200 shadow-sm"
      >
        <span className="font-medium">{selectedLang?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-50 overflow-hidden">
          <div className="py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150 ${lang.code === selectedLanguage
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700'
                  }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

