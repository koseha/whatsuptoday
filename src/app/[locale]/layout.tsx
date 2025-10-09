import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdSense from '@/components/shared/AdSense';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title')
  };
}

export function generateStaticParams() {
  // SSG 빌드 시점에 모든 locale 페이지를 생성
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-125 w-full px-2 flex flex-col gap-7">
          <Header />

          <main className="w-full animate-fade-in-up">
            {children}
          </main>

          {/* 광고: 모든 페이지 하단 공통 광고 */}
          <AdSense
            adSlot="6826368695"
            adFormat="auto"
            fullWidthResponsive={true}
          />

          <Footer />
        </div>
      </div>
    </NextIntlClientProvider>
  );
}