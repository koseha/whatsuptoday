import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: "AI 감정 분석 기술 가이드 - What's Up Today | Face-API.js 구현 원리",
  description: "Face-API.js와 TensorFlow.js를 활용한 AI 감정 분석 기술의 상세한 구현 원리와 작동 방식을 알아보세요. TinyFaceDetector, FaceExpressionNet 등 실제 사용된 모델들의 기술적 특징을 설명합니다.",
  keywords: "AI감정분석기술, Face-API.js, TensorFlow.js, TinyFaceDetector, FaceExpressionNet, 컴퓨터비전, 딥러닝모델",
  openGraph: {
    title: "AI 감정 분석 기술 가이드 - What's Up Today",
    description: "실제 구현된 AI 감정 분석 기술의 상세한 작동 원리와 모델 구조를 알아보세요.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default async function TechGuide({
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
          <h1 className="text-3xl font-bold mb-8 text-center">AI 감정 분석 기술 가이드</h1>

          <div className="space-y-8 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold mb-4">개요</h2>
              <p className="mb-4">
                What&apos;s Up Today는 Face-API.js 라이브러리를 기반으로 구현된 AI 감정 분석 서비스입니다.
                이 가이드에서는 실제 구현에 사용된 기술들과 그 작동 원리를 상세히 설명합니다.
              </p>
              <p>
                모든 기술적 설명은 실제 코드에서 확인된 내용을 바탕으로 하며,
                과장되거나 부정확한 정보는 포함하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">사용된 AI 모델들</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-medium mb-2">TinyFaceDetector</h3>
                  <p className="mb-2">
                    얼굴 감지를 담당하는 경량화된 모델입니다. YOLO 기반의 객체 감지 알고리즘을 사용하여
                    이미지에서 얼굴의 위치를 빠르고 정확하게 찾아냅니다.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>용도</strong>: 얼굴 영역 감지 및 바운딩 박스 생성</li>
                    <li><strong>특징</strong>: 빠른 처리 속도와 높은 정확도</li>
                    <li><strong>출력</strong>: 얼굴의 위치와 크기 정보</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-medium mb-2">FaceExpressionNet</h3>
                  <p className="mb-2">
                    7가지 기본 감정을 분석하는 딥러닝 모델입니다. 얼굴의 미세한 근육 변화를
                    패턴으로 인식하여 감정을 수치화합니다.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>분석 감정</strong>: 행복, 슬픔, 화남, 두려움, 놀람, 혐오, 중립</li>
                    <li><strong>출력 형식</strong>: 각 감정별 0-1 사이의 신뢰도 점수</li>
                    <li><strong>정확도</strong>: 일반적인 조건에서 약 80-90%</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-medium mb-2">AgeGenderNet</h3>
                  <p className="mb-2">
                    얼굴 특징을 기반으로 나이와 성별을 예측하는 모델입니다.
                    통계적 패턴 분석을 통해 예측값을 제공합니다.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>나이 예측</strong>: 얼굴 특징점과 피부 상태 분석</li>
                    <li><strong>성별 예측</strong>: 얼굴 형태와 특징의 차이 분석</li>
                    <li><strong>정확도</strong>: 참고용 수준 (100% 정확성 보장하지 않음)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-lg font-medium mb-2">FaceLandmark68Net</h3>
                  <p className="mb-2">
                    얼굴의 68개 주요 특징점을 감지하는 모델입니다.
                    눈, 코, 입, 얼굴 윤곽 등의 정확한 위치를 찾아냅니다.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>특징점</strong>: 눈 12개, 눈썹 10개, 코 9개, 입 20개, 얼굴 윤곽 17개</li>
                    <li><strong>용도</strong>: 감정 분석의 정확도 향상</li>
                    <li><strong>출력</strong>: 각 특징점의 x, y 좌표</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">분석 과정의 실제 구현</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">1단계: 이미지 전처리</h3>
                  <p className="mb-2">
                    업로드된 파일을 브라우저에서 처리 가능한 형태로 변환합니다.
                  </p>
                  <div className="bg-gray-100 p-3 rounded text-xs font-mono">
                    <div>{/* 파일을 Blob으로 변환 */}</div>
                    <div>const response = await fetch(fileUrl);</div>
                    <div>const blob = await response.blob();</div>
                    <div>const img = await faceapi.bufferToImage(blob);</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">2단계: 얼굴 감지 및 분석</h3>
                  <p className="mb-2">
                    모든 모델을 동시에 실행하여 얼굴 감지, 특징점 추출, 감정 분석, 나이/성별 예측을 수행합니다.
                  </p>
                  <div className="bg-gray-100 p-3 rounded text-xs font-mono">
                    <div>const detections = await faceapi</div>
                    <div>  .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())</div>
                    <div>  .withFaceLandmarks()</div>
                    <div>  .withFaceExpressions()</div>
                    <div>  .withAgeAndGender();</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">3단계: 결과 처리</h3>
                  <p className="mb-2">
                    분석 결과를 사용자에게 표시할 수 있는 형태로 가공합니다.
                  </p>
                  <div className="bg-gray-100 p-3 rounded text-xs font-mono">
                    <div>{/* 주요 감정 선택 */}</div>
                    <div>const dominantEmotion = Object.entries(emotions).reduce((a, b) =&gt;</div>
                    <div>  emotions[a[0]] &gt; emotions[b[0]] ? a : b</div>
                    <div>)[0];</div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">성능 최적화 기술</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">모델 캐싱 시스템</h3>
                  <p className="mb-2">
                    전역 변수를 사용하여 모델 로딩 상태를 관리합니다.
                    한 번 로드된 모델은 재사용되어 중복 로딩을 방지합니다.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-xs">
                    <li>전역 모델 로딩 상태 관리</li>
                    <li>Promise 기반 비동기 로딩</li>
                    <li>브라우저 캐시 활용</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">GPU 가속 처리</h3>
                  <p className="mb-2">
                    TensorFlow.js의 WebGL 백엔드를 사용하여 GPU 가속을 활용합니다.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-xs">
                    <li>WebGL 백엔드 우선 사용</li>
                    <li>CPU 백엔드 자동 전환</li>
                    <li>메모리 사용량 최적화</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">브라우저 호환성</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">지원 브라우저</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Chrome</strong>: 60 이상 (WebGL 지원)</li>
                    <li><strong>Firefox</strong>: 55 이상 (WebGL 지원)</li>
                    <li><strong>Safari</strong>: 11 이상 (WebGL 지원)</li>
                    <li><strong>Edge</strong>: 79 이상 (WebGL 지원)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">필수 기능</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>WebGL 지원 (GPU 가속용)</li>
                    <li>ES6+ 문법 지원</li>
                    <li>Canvas API 지원</li>
                    <li>File API 지원</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">모델 파일 정보</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-left">모델명</th>
                      <th className="border border-gray-300 p-2 text-left">용도</th>
                      <th className="border border-gray-300 p-2 text-left">파일 크기</th>
                      <th className="border border-gray-300 p-2 text-left">로딩 시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">tiny_face_detector_model</td>
                      <td className="border border-gray-300 p-2">얼굴 감지</td>
                      <td className="border border-gray-300 p-2">약 1.5MB</td>
                      <td className="border border-gray-300 p-2">1-2초</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">face_expression_model</td>
                      <td className="border border-gray-300 p-2">감정 분석</td>
                      <td className="border border-gray-300 p-2">약 1.8MB</td>
                      <td className="border border-gray-300 p-2">1-2초</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">age_gender_model</td>
                      <td className="border border-gray-300 p-2">나이/성별 예측</td>
                      <td className="border border-gray-300 p-2">약 1.2MB</td>
                      <td className="border border-gray-300 p-2">1초</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">face_landmark_68_model</td>
                      <td className="border border-gray-300 p-2">특징점 감지</td>
                      <td className="border border-gray-300 p-2">약 1.0MB</td>
                      <td className="border border-gray-300 p-2">1초</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-gray-600">
                * 파일 크기와 로딩 시간은 네트워크 상태와 디바이스 성능에 따라 달라질 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">오류 처리 및 예외 상황</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">얼굴 감지 실패</h3>
                  <p className="mb-2">
                    얼굴이 감지되지 않을 경우 사용자에게 친화적인 메시지를 표시하고
                    다시 시도할 수 있도록 안내합니다.
                  </p>
                  <div className="bg-yellow-50 p-3 rounded text-xs">
                    <strong>해결 방법:</strong> 더 선명하고 밝은 사진으로 다시 시도해보세요.
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">모델 로딩 실패</h3>
                  <p className="mb-2">
                    네트워크 문제나 브라우저 호환성 문제로 모델 로딩이 실패할 경우를 대비한 처리입니다.
                  </p>
                  <div className="bg-red-50 p-3 rounded text-xs">
                    <strong>해결 방법:</strong> 페이지를 새로고침하거나 다른 브라우저를 사용해보세요.
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">관련 정보</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">서비스 소개</h3>
                  <p className="text-sm mb-2">전체적인 서비스 개요와 특징</p>
                  <Link href="/about" className="text-blue-600 hover:underline text-sm">
                    소개 페이지 보기 →
                  </Link>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">사용법 가이드</h3>
                  <p className="text-sm mb-2">완벽한 사용 방법과 팁</p>
                  <Link href="/how-to-use" className="text-blue-600 hover:underline text-sm">
                    사용법 가이드 보기 →
                  </Link>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">자주 묻는 질문</h3>
                  <p className="text-sm mb-2">기술적 질문과 답변</p>
                  <Link href="/faq" className="text-blue-600 hover:underline text-sm">
                    FAQ 보기 →
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
