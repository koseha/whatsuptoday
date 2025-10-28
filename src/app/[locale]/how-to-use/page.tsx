import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: "완벽한 사용법 가이드 - What's Up Today | AI 감정 분석 최적화 팁",
  description: "AI 감정 분석 서비스 What's Up Today의 완벽한 사용법과 최적화 팁을 알아보세요. 완벽한 셀카 촬영법, 분석 결과 해석, 결과 활용 방법까지 상세히 안내합니다.",
  keywords: "AI감정분석사용법, 셀카촬영팁, 감정분석결과해석, 얼굴표정분석, AI분석최적화",
  openGraph: {
    title: "완벽한 사용법 가이드 - What's Up Today",
    description: "AI 감정 분석을 위한 완벽한 셀카 촬영법과 결과 해석 방법을 알아보세요.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default async function HowToUse({
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
          <h1 className="text-3xl font-bold mb-8 text-center">완벽한 사용법 가이드</h1>

          <div className="space-y-8 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold mb-4">시작하기</h2>
              <p className="mb-4">
                What&apos;s Up Today는 매우 간단한 사용법을 가지고 있습니다.
                사진을 업로드하기만 하면 AI가 자동으로 감정을 분석하고 재미있는 문구를 생성해드립니다.
              </p>
              <p>
                하지만 더 정확한 분석 결과를 얻기 위해서는 몇 가지 팁을 알고 계시면 좋습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">완벽한 셀카 촬영법</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-medium mb-2">1. 조명 조건</h3>
                  <div className="space-y-2">
                    <p><strong>✅ 좋은 조명:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>자연광이 충분한 곳 (창가, 야외)</li>
                      <li>앞쪽에서 비치는 부드러운 조명</li>
                      <li>얼굴 전체가 균일하게 밝은 환경</li>
                    </ul>
                    <p><strong>❌ 피해야 할 조명:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>뒤에서 비치는 강한 조명 (역광)</li>
                      <li>한쪽만 밝은 불균등한 조명</li>
                      <li>너무 어두운 실내 조명</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-medium mb-2">2. 촬영 각도와 거리</h3>
                  <div className="space-y-2">
                    <p><strong>최적의 각도:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>얼굴이 정면을 향하도록 촬영</li>
                      <li>카메라와 눈높이가 비슷한 위치</li>
                      <li>약간 아래에서 위를 올려다보는 각도</li>
                    </ul>
                    <p><strong>적절한 거리:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>얼굴이 화면의 1/3~1/2 정도 차지</li>
                      <li>너무 가깝거나 멀지 않은 거리</li>
                      <li>어깨 위쪽까지 포함된 구도</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-medium mb-2">3. 표정과 포즈</h3>
                  <div className="space-y-2">
                    <p><strong>명확한 표정:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>자연스러운 미소나 평상시 표정</li>
                      <li>눈이 명확하게 보이는 상태</li>
                      <li>얼굴이 가려지지 않은 상태</li>
                    </ul>
                    <p><strong>피해야 할 요소:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>선글라스나 마스크 착용</li>
                      <li>손으로 얼굴을 가리는 포즈</li>
                      <li>너무 과장된 표정</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">분석 결과 해석하기</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">감정 분석 결과 이해</h3>
                  <p className="mb-2">
                    AI는 7가지 기본 감정을 분석하여 각각에 대한 신뢰도 점수를 제공합니다.
                    가장 높은 점수를 받은 감정이 주요 감정으로 표시됩니다.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">7가지 기본 감정:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div>😊 행복 (Happy)</div>
                      <div>😢 슬픔 (Sad)</div>
                      <div>😠 화남 (Angry)</div>
                      <div>😨 두려움 (Fearful)</div>
                      <div>😲 놀람 (Surprised)</div>
                      <div>🤢 혐오 (Disgusted)</div>
                      <div>😐 중립 (Neutral)</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">나이와 성별 예측</h3>
                  <p className="mb-2">
                    얼굴 특징을 기반으로 한 예측값으로, 100% 정확성을 보장하지 않습니다.
                    참고용 정보로만 사용하시기 바랍니다.
                  </p>
                  <div className="bg-yellow-50 p-3 rounded text-xs">
                    <strong>주의:</strong> 나이와 성별 예측은 통계적 패턴 분석에 기반하며,
                    개인의 특성이나 특수한 상황에서는 정확도가 달라질 수 있습니다.
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">결과 활용 방법</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">공유 기능 활용</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>이미지 다운로드:</strong> 분석 결과를 이미지로 저장</li>
                    <li><strong>SNS 공유:</strong> 웹 공유 API를 통한 직접 공유</li>
                    <li><strong>해시태그:</strong> #AI감정분석 태그와 함께 공유</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">재분석 팁</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>다른 사진으로 시도:</strong> 다양한 표정의 사진으로 테스트</li>
                    <li><strong>조명 변경:</strong> 다른 조명 조건에서 재촬영</li>
                    <li><strong>각도 조정:</strong> 다양한 각도에서 촬영해보기</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">문제 해결 가이드</h2>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 text-red-800">얼굴을 찾을 수 없어요</h3>
                  <p className="mb-2 text-red-700">
                    이 메시지가 나타나는 경우 다음과 같이 해보세요:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-red-600">
                    <li>더 선명하고 밝은 사진으로 다시 시도</li>
                    <li>얼굴이 화면 중앙에 오도록 조정</li>
                    <li>얼굴이 가려지지 않은 사진 사용</li>
                    <li>표정이 명확하게 보이는 사진 선택</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 text-blue-800">분석이 느려요</h3>
                  <p className="mb-2 text-blue-700">
                    첫 사용 시에는 AI 모델 로딩으로 인해 시간이 걸릴 수 있습니다:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-blue-600">
                    <li>첫 분석: 5-10초 (모델 로딩 포함)</li>
                    <li>이후 분석: 3-5초 (모델 캐시 활용)</li>
                    <li>인터넷 연결 상태 확인</li>
                    <li>브라우저 새로고침 후 재시도</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 text-green-800">결과가 부정확해요</h3>
                  <p className="mb-2 text-green-700">
                    AI 분석 결과는 참고용이며, 정확도를 높이려면:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-green-600">
                    <li>조명이 충분한 환경에서 촬영</li>
                    <li>자연스러운 표정으로 촬영</li>
                    <li>얼굴이 명확하게 보이는 사진 사용</li>
                    <li>다양한 각도와 조건으로 테스트</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">모바일 사용 팁</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">모바일 카메라 활용</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>자동 초점:</strong> 얼굴에 초점이 맞춰지도록 확인</li>
                    <li><strong>HDR 모드:</strong> 조명이 복잡한 환경에서 활용</li>
                    <li><strong>셀카 모드:</strong> 전면 카메라의 셀카 모드 사용</li>
                    <li><strong>안정화:</strong> 손떨림 방지를 위해 안정적으로 촬영</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">모바일 최적화</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>화면 회전:</strong> 세로 모드에서 사용 권장</li>
                    <li><strong>터치 조작:</strong> 파일 선택 시 터치로 쉽게 업로드</li>
                    <li><strong>공유 기능:</strong> 모바일 브라우저의 공유 기능 활용</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">고급 사용법</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">여러 사람이 있는 사진</h3>
                  <p className="mb-2">
                    현재는 첫 번째로 감지된 얼굴만 분석합니다.
                    여러 사람이 있는 사진의 경우 가장 앞쪽에 있는 사람의 얼굴이 분석 대상이 됩니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">동영상에서 프레임 추출</h3>
                  <p className="mb-2">
                    동영상 파일은 직접 지원하지 않지만, 동영상에서 원하는 프레임을
                    이미지로 추출한 후 업로드하면 분석이 가능합니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">오프라인 사용</h3>
                  <p className="mb-2">
                    모델 파일이 브라우저 캐시에 저장되어 있다면 오프라인에서도
                    얼굴 감지와 감정 분석이 가능합니다. 다만 AI 문구 생성은 인터넷 연결이 필요합니다.
                  </p>
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
                  <h3 className="text-lg font-medium mb-2">기술 가이드</h3>
                  <p className="text-sm mb-2">AI 기술의 상세한 작동 원리</p>
                  <Link href="/tech-guide" className="text-blue-600 hover:underline text-sm">
                    기술 가이드 보기 →
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
