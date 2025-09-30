import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: "Project Details - What's Up Today",
  description: "What's Up Today 프로젝트의 기술적 세부사항과 개발 과정",
};

export default async function Project({
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
          <h1 className="text-3xl font-bold mb-8 text-center">Project Details</h1>

          <div className="space-y-8 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold mb-4">프로젝트 개요</h2>
              <p className="mb-4">
                What&apos;s Up Today는 웹 기반 AI 감정 분석 서비스로, 사용자가 업로드한 사진을 분석하여
                감정 상태를 파악하고 재미있는 문구를 생성하는 서비스입니다.
                정적 사이트 생성(SSG)을 통해 빠른 로딩 속도와 SEO 최적화를 달성했습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">기술 스택</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Frontend</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Next.js 15:</strong> React 기반 풀스택 프레임워크</li>
                    <li><strong>React 19:</strong> 최신 React 기능 활용</li>
                    <li><strong>TypeScript:</strong> 타입 안정성 보장</li>
                    <li><strong>Tailwind CSS:</strong> 유틸리티 퍼스트 CSS 프레임워크</li>
                    <li><strong>Lucide React:</strong> 아이콘 라이브러리</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">AI & Backend</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Face-API.js:</strong> 얼굴 감지 및 감정 분석</li>
                    <li><strong>Supabase:</strong> Edge Functions + Gemini API로 AI 문구 생성</li>
                    <li><strong>TensorFlow.js:</strong> 클라이언트 사이드 AI 실행</li>
                    <li><strong>WebGL:</strong> TensorFlow.js GPU 가속으로 AI 분석 성능 최적화</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">핵심 기능 구현</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. 얼굴 감지 및 분석</h3>
                  <p>
                    Face-API.js의 TinyFaceDetector를 사용하여 얼굴을 감지하고,
                    FaceLandmark68Net으로 얼굴 랜드마크를 추출합니다.
                    FaceExpressionNet으로 7가지 감정을 분석하고, AgeGenderNet으로 나이와 성별을 예측합니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">2. 모델 로딩 최적화</h3>
                  <p>
                    정적 사이트에서 AI 모델 로딩 시간을 최소화하기 위해 전역 상태 관리를 구현했습니다.
                    useFaceApiModels 훅을 통해 모델을 한 번만 로드하고, 페이지 이동 시 재로딩을 방지합니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">3. AI 문구 생성</h3>
                  <p>
                    Supabase Edge Functions를 활용하여 분석 결과를 바탕으로 개인화된 문구를 생성합니다.
                    감정 상태, 나이, 성별을 고려하여 사용자에게 맞는 재미있는 문구를 제공합니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">성능 최적화</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">번들 크기 최적화</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Face-API.js 동적 import</li>
                    <li>불필요한 console.log 제거</li>
                    <li>Tree shaking을 통한 미사용 코드 제거</li>
                    <li>정적 생성으로 서버 사이드 렌더링 최소화</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">사용자 경험</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>로딩 애니메이션으로 대기 시간 표시</li>
                    <li>분석 과정의 시각적 피드백</li>
                    <li>반응형 디자인으로 모든 기기 지원</li>
                    <li>오프라인에서도 기본 기능 동작</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">개발 과정에서의 문제 해결</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">문제: 정적 사이트에서 AI 모델 로딩</h3>
                  <p>
                    <strong>해결:</strong> 전역 상태 관리와 모델 캐싱을 통해 한 번 로드된 모델을 재사용하도록 구현했습니다.
                    페이지 이동 시에도 모델을 다시 로드하지 않아 사용자 경험이 크게 개선되었습니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">문제: 분석 정확도와 사용자 경험</h3>
                  <p>
                    <strong>해결:</strong> 얼굴 감지 실패 시 친근한 메시지와 팁을 제공하고,
                    분석 과정을 시각적으로 표현하여 사용자가 기다리는 동안의 지루함을 해소했습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">결과 및 성과</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">기술적 성과</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>정적 사이트에서 AI 모델 효율적 로딩</li>
                    <li>클라이언트 사이드 AI 분석 완성</li>
                    <li>반응형 디자인으로 모든 기기 지원</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">사용자 경험</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>직관적이고 간단한 사용법</li>
                    <li>빠른 분석 속도 (3초 내)</li>
                    <li>정확한 감정 분석 결과</li>
                    <li>재미있는 AI 생성 문구</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">다국어 지원 구현</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">국제화(i18n) 아키텍처</h3>
                  <p>
                    next-intl 라이브러리를 활용하여 9개 언어를 지원합니다.
                    한국어, 영어, 스페인어, 일본어, 중국어, 베트남어, 인도네시아어, 이탈리아어, 태국어를 제공하며,
                    각 언어별로 완전한 번역 파일을 구성했습니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">사용자 경험</h3>
                  <p>
                    선택한 언어는 localStorage에 저장되어 다음 방문 시에도 유지됩니다.
                    AI가 생성하는 감정 분석 문구도 사용자가 선택한 언어로 제공되어,
                    전 세계 사용자에게 최적화된 경험을 제공합니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">향후 개선 계획</h2>
              <p className="mb-4">
                현재 프로젝트는 기본적인 감정 분석 기능과 다국어 지원을 제공하고 있으며,
                향후 더 정확한 분석을 위한 모델 개선과 추가 언어 지원을 계획하고 있습니다.
              </p>
              <p>
                또한 사용자 피드백을 바탕으로 새로운 기능과 개선사항을 지속적으로 반영할 예정입니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
