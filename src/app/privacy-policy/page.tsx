import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보 처리방침 - What\'s Up Today',
  description: 'What\'s Up Today 개인정보 처리방침',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">개인정보 처리방침</h1>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. 개인정보 수집 및 이용</h2>
              <p>What&apos;s Up Today는 AI 감정 분석 서비스를 제공합니다.</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>업로드된 사진은 분석 목적으로만 사용되며 저장되지 않습니다</li>
                <li>Google Analytics를 통해 방문 통계를 수집합니다</li>
                <li>Google AdSense를 통해 광고를 제공합니다</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. 쿠키 사용</h2>
              <p>서비스 개선을 위해 쿠키를 사용합니다. 브라우저 설정에서 쿠키를 차단할 수 있습니다.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. 개인정보 보호</h2>
              <p>수집된 정보는 서비스 제공 목적으로만 사용되며, 제3자에게 제공되지 않습니다.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. 연락처</h2>
              <p>개인정보 관련 문의사항이 있으시면 <a href="/contact" className="text-blue-600 hover:underline">연락처</a>를 통해 문의해 주세요.</p>
            </section>

            <section>
              <p className="text-xs text-gray-500 mt-8">
                본 개인정보 처리방침은 2025년 9월 27일부터 시행됩니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
