import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: "AI 감정 분석 서비스 소개 - What's Up Today | 얼굴 표정 분석 기술",
  description: "Face-API.js와 Google Gemini를 활용한 AI 감정 분석 서비스. 7가지 감정 분석, 나이/성별 예측, 개인정보 보호하는 클라이언트 사이드 AI 기술을 알아보세요.",
  keywords: "AI감정분석, 얼굴감정인식, Face-API, 컴퓨터비전, 딥러닝, 개인정보보호, 클라이언트사이드AI",
  openGraph: {
    title: "AI 감정 분석 서비스 소개 - What's Up Today",
    description: "최첨단 AI 기술로 구현된 얼굴 감정 분석 서비스의 기술적 원리와 특징을 상세히 알아보세요.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 py-8">
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
              <h2 className="text-xl font-semibold mb-4">실제 사용된 AI 모델들</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">얼굴 감지 및 분석 모델</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>TinyFaceDetector</strong>: 경량화된 얼굴 감지 모델로 빠른 처리 속도 제공</li>
                    <li><strong>FaceExpressionNet</strong>: 7가지 감정 분석 (행복, 슬픔, 화남, 두려움, 놀람, 혐오, 중립)</li>
                    <li><strong>AgeGenderNet</strong>: 얼굴 특징을 기반으로 한 나이와 성별 예측</li>
                    <li><strong>FaceLandmark68Net</strong>: 얼굴의 68개 주요 특징점 감지</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">웹 기술 스택</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Next.js 15</strong>: 정적 사이트 생성(SSG)으로 빠른 로딩</li>
                    <li><strong>React 19 + TypeScript</strong>: 타입 안전성과 최신 기능 활용</li>
                    <li><strong>TensorFlow.js</strong>: WebGL 백엔드로 GPU 가속 처리</li>
                    <li><strong>Supabase Edge Functions</strong>: Google Gemini API 연동</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">AI 분석 과정의 실제 구현</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">1단계: 이미지 전처리</h3>
                  <p className="mb-2">
                    업로드된 파일을 Blob으로 변환한 후, face-api.js의 bufferToImage 함수를 사용하여
                    브라우저에서 처리 가능한 이미지 객체로 변환합니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">2단계: 얼굴 감지 및 분석</h3>
                  <p className="mb-2">
                    TinyFaceDetector를 사용하여 얼굴을 감지하고, 동시에 얼굴 특징점, 감정 표현,
                    나이/성별을 분석합니다. 첫 번째 감지된 얼굴을 기준으로 결과를 제공합니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">3단계: 결과 처리</h3>
                  <p className="mb-2">
                    7가지 감정 중 가장 높은 점수를 가진 감정을 주요 감정으로 선택하고,
                    나이와 성별 정보를 추출하여 최종 결과를 생성합니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">성능 최적화 전략</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">모델 캐싱 시스템</h3>
                  <p className="mb-2">
                    전역 변수를 사용하여 모델 로딩 상태를 관리하고, 한 번 로드된 모델은 재사용합니다.
                    Promise 기반 비동기 로딩으로 중복 로딩을 방지하고 사용자 경험을 개선했습니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">GPU 가속 처리</h3>
                  <p className="mb-2">
                    TensorFlow.js의 WebGL 백엔드를 사용하여 GPU 가속을 활용합니다.
                    WebGL을 지원하지 않는 브라우저에서는 CPU 백엔드로 자동 전환됩니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">사용자 경험 최적화</h3>
                  <p className="mb-2">
                    분석 과정을 시각적으로 표현하고, 최소 3초의 대기 시간을 보장하여
                    사용자가 분석 과정을 자연스럽게 인식할 수 있도록 했습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">개인정보 보호의 기술적 구현</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">클라이언트 사이드 분석</h3>
                  <p className="mb-2">
                    모든 이미지 분석은 사용자의 브라우저에서 직접 실행됩니다.
                    업로드된 사진은 서버로 전송되지 않으며, 분석 완료 후 브라우저 메모리에서 즉시 삭제됩니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">모델 파일 로컬 저장</h3>
                  <p className="mb-2">
                    AI 모델 파일들은 브라우저 캐시에 저장되어 재사용됩니다.
                    이는 개인정보 보호뿐만 아니라 분석 속도 향상에도 기여합니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">데이터 수집 최소화</h3>
                  <p className="mb-2">
                    Google Analytics를 통한 방문 통계 수집과 Google AdSense를 통한 광고 제공 외에는
                    사용자의 개인정보를 수집하지 않습니다. 분석 결과도 서버에 저장되지 않습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">다국어 지원의 기술적 구현</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">next-intl 기반 현지화</h3>
                  <p className="mb-2">
                    Next.js의 next-intl 라이브러리를 사용하여 9개 언어를 지원합니다.
                    한국어, English, Español, 日本語, 中文, Tiếng Việt, Bahasa Indonesia, Italiano, ไทย 중 선택할 수 있습니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">언어 설정 지속성</h3>
                  <p className="mb-2">
                    선택한 언어는 localStorage에 자동 저장되어 다음 방문 시에도 유지됩니다.
                    이를 통해 사용자는 매번 언어를 다시 선택할 필요가 없습니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">AI 문구 다국어 생성</h3>
                  <p className="mb-2">
                    Google Gemini API를 통해 사용자가 선택한 언어로 감정 분석 문구를 생성합니다.
                    각 언어의 문화적 맥락을 고려한 자연스러운 문구를 제공합니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">개발 과정과 문제 해결</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">정적 사이트에서 AI 모델 로딩</h3>
                  <p className="mb-2">
                    정적 사이트 생성(SSG) 환경에서 AI 모델을 효율적으로 로딩하는 것이 가장 큰 도전이었습니다.
                    전역 상태 관리와 모델 캐싱을 통해 한 번 로드된 모델을 재사용하도록 구현했습니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">사용자 경험 최적화</h3>
                  <p className="mb-2">
                    얼굴 감지 실패 시 친근한 메시지와 팁을 제공하고, 분석 과정을 시각적으로 표현하여
                    사용자가 기다리는 동안의 지루함을 해소했습니다.
                  </p>
                </div>
              </div>
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
              <h2 className="text-xl font-semibold mb-4">관련 정보</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">기술 문서</h3>
                  <p className="text-sm mb-2">사용된 AI 기술과 구현 방식에 대한 상세한 설명</p>
                  <Link href="/tech-guide" className="text-blue-600 hover:underline text-sm">
                    기술 가이드 보기 →
                  </Link>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">개인정보 보호</h3>
                  <p className="text-sm mb-2">클라이언트 사이드 분석의 보안 구조</p>
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline text-sm">
                    개인정보 처리방침 보기 →
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}