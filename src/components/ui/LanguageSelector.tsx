"use client";

import { LANGUAGES } from '@/components/shared/languages';
import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageSelector() {
  const { selectedLanguage } = useLanguage();

  const selectedLang = LANGUAGES.find(lang => lang.code === selectedLanguage);

  // 현재는 한국어만 지원하므로 비활성화된 상태로 표시
  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-2 text-sm bg-background-container rounded-lg border border-border opacity-60 cursor-not-allowed">
        <span className="hidden sm:inline">{selectedLang?.name}</span>
        <span className="text-xs text-muted-foreground">(준비 중)</span>
      </div>
    </div>
  );
}

