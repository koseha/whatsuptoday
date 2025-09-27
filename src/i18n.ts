import { getRequestConfig } from 'next-intl/server';

// 지원하는 언어 목록
export const locales = ['ko'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // 현재는 한국어만 지원
  const validLocale: Locale = (locale && locales.includes(locale as Locale)) ? (locale as Locale) : 'ko';

  return {
    locale: validLocale,
    messages: (await import(`../locale/${validLocale}/common.json`)).default
  };
});
