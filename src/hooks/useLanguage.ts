import { useState, useEffect } from 'react';
import { LanguageCode } from '@/components/shared/languages';

const LANGUAGE_STORAGE_KEY = 'whatsuptoday-language';

export const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('ko');

  useEffect(() => {
    // localStorage에서 저장된 언어 불러오기
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode;
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: LanguageCode) => {
    setSelectedLanguage(language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  };

  return {
    selectedLanguage,
    changeLanguage
  };
};

