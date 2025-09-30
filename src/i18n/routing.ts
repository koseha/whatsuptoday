import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/contact': '/contact',
    '/faq': '/faq',
    '/privacy-policy': '/privacy-policy',
    '/project': '/project',
    '/terms-of-service': '/terms-of-service'
  }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);