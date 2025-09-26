import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WhatUpToday - 오늘의 기분 AI 분석',
  description: 'AI가 당신의 표정을 분석해드립니다',
  other: {
    'google-adsense-account': 'ca-pub-8025815525124731',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen">
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
