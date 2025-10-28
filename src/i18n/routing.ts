import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ko', 'en', 'es', 'ja', 'zh', 'vi', 'id', 'it', 'th'],
  defaultLocale: 'ko',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/contact': '/contact',
    '/faq': '/faq',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/tech-guide': '/tech-guide',
    '/how-to-use': '/how-to-use'
  }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);