import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'WhatUpToday - 오늘의 기분 AI 분석',
  description: 'AI가 당신의 표정을 분석해드립니다',
  other: {
    'google-adsense-account': 'ca-pub-1510173979053173',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P7NFHD2W');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="antialiased min-h-screen">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P7NFHD2W"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-125 w-full px-2 flex flex-col gap-7">
            <Header />

            <main className="w-full animate-fade-in-up">
              {children}
            </main>

            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
