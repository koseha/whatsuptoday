import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: '이용 약관 - What\'s Up Today',
  description: 'What\'s Up Today 이용 약관',
};

export default async function TermsOfService({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">이용 약관</h1>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. 서비스 개요</h2>
              <p>What&apos;s Up Today는 AI를 활용한 감정 분석 서비스를 제공합니다.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. 이용 규칙</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>본인 또는 동의를 받은 타인의 사진만 업로드 가능합니다</li>
                <li>부적절한 내용의 사진 업로드는 금지됩니다</li>
                <li>서비스 이용 시 관련 법규를 준수해야 합니다</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. 서비스 제한</h2>
              <p>다음의 경우 서비스 이용이 제한될 수 있습니다:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>약관 위반 시</li>
                <li>시스템 점검 및 유지보수 시</li>
                <li>기타 운영상 필요한 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. 면책 조항</h2>
              <p>서비스 이용으로 인한 손해에 대해 책임을 지지 않습니다. 분석 결과는 참고용이며, 정확성을 보장하지 않습니다.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. 약관 변경</h2>
              <p>필요에 따라 약관을 변경할 수 있으며, 변경 시 사이트에 공지합니다.</p>
            </section>

            <section>
              <p className="text-xs text-gray-500 mt-8">
                본 이용 약관은 2025년 9월 27일부터 시행됩니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}