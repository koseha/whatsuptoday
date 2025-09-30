import { redirect } from '@/i18n/routing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirecting...',
  other: {
    'http-equiv': 'refresh',
    content: '0;url=/ko/',
  },
};

export default function RootPage() {
  redirect({ href: '/', locale: 'ko' });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">로딩 중...</h1>
        <p className="text-gray-600">페이지를 이동하고 있습니다.</p>
      </div>
    </div>
  );
}
