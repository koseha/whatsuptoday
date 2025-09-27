export const LANGUAGES = [
  { code: 'ko', name: '한국어' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ja', name: '日本語' },
  { code: 'zh', name: '中文' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'it', name: 'Italiano' },
  { code: 'th', name: 'ไทย' }
] as const;

export type LanguageCode = typeof LANGUAGES[number]['code'];

