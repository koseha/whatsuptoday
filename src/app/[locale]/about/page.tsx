import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'About - What\'s Up Today',
  description: 'AI 감정 분석 서비스 What\'s Up Today에 대해 알아보세요',
};

export default async function About({
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
          <h1 className="text-3xl font-bold mb-8 text-center">About What&apos;s Up Today</h1>

          <div className="space-y-8 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold mb-4">프로젝트 소개</h2>
              <p className="mb-4">
                What&apos;s Up Today는 AI 기술을 활용하여 사용자의 얼굴 표정을 분석하고 감정을 파악하는 웹 서비스입니다.
                업로드된 사진을 통해 주요 감정, 나이, 성별을 분석하고, AI가 생성한 재미있는 문구와 함께 결과를 제공합니다.
              </p>
              <p>
                이 서비스는 단순한 기술 데모를 넘어서, 실제로 사용자에게 즐거움과 재미를 선사하는 것을 목표로 개발되었습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">기술적 특징</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">AI 분석 기술</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Face-API.js를 활용한 실시간 얼굴 감지</li>
                    <li>7가지 감정 분석 (행복, 슬픔, 화남, 두려움, 놀람, 혐오, 중립)</li>
                    <li>나이와 성별 예측</li>
                    <li>감정 점수 기반 주요 감정 도출</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">웹 기술</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Next.js 15 기반 정적 사이트 생성</li>
                    <li>React 19와 TypeScript 활용</li>
                    <li>Tailwind CSS로 반응형 디자인</li>
                    <li>Supabase Edge Functions + Gemini API로 AI 문구 생성</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">개발 과정에서의 도전</h2>
              <p className="mb-4">
                정적 사이트 생성(SSG) 환경에서 AI 모델을 효율적으로 로딩하는 것이 가장 큰 도전이었습니다.
                Face-API.js의 모델 파일들은 상당한 크기로, 초기 로딩 시간을 최소화하기 위해 전역 상태 관리와
                모델 캐싱 전략을 구현했습니다.
              </p>
              <p className="mb-4">
                또한 사용자 경험을 위해 분석 과정을 시각적으로 표현하여 지루함을 해소했습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">개인정보 보호</h2>
              <p className="mb-4">
                What&apos;s Up Today는 사용자의 개인정보 보호를 최우선으로 합니다.
                업로드된 사진은 분석 목적으로만 사용되며, 서버에 저장되지 않습니다.
                모든 분석은 클라이언트 사이드에서 이루어지며, 분석 완료 후 이미지는 즉시 삭제됩니다.
              </p>
              <p>
                Google Analytics를 통한 방문 통계 수집과 Google AdSense를 통한 광고 제공 외에는
                사용자의 개인정보를 수집하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">다국어 지원</h2>
              <p className="mb-4">
                What&apos;s Up Today는 글로벌 사용자를 위해 9개 언어를 지원합니다.
                한국어, English, Español, 日本語, 中文, Tiếng Việt, Bahasa Indonesia, Italiano, ไทย 중 선택할 수 있으며,
                선택한 언어는 자동으로 저장되어 다음 방문 시에도 유지됩니다.
              </p>
              <p>
                AI가 생성하는 감정 분석 문구도 사용자가 선택한 언어로 제공되어,
                전 세계 어디서나 편하게 서비스를 이용할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">향후 계획</h2>
              <p className="mb-4">
                분석 정확도를 높이기 위한 모델 개선과 더 많은 언어 지원을 계획하고 있습니다.
              </p>
              <p>
                또한 사용자 피드백을 바탕으로 새로운 기능과 개선사항을 지속적으로 반영할 예정입니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">연락처</h2>
              <p>
                서비스에 대한 문의나 피드백이 있으시면 <Link href="/contact" className="text-blue-600 hover:underline">연락처 페이지</Link>를 통해
                언제든 연락해 주세요. 사용자의 의견은 서비스 개선에 큰 도움이 됩니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}