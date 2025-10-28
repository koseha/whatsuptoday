import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: "FAQ - What's Up Today",
  description: "What's Up Today 서비스에 대한 자주 묻는 질문과 답변",
};

export default async function FAQ({
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
          <h1 className="text-3xl font-bold mb-8 text-center">자주 묻는 질문</h1>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q1. What&apos;s Up Today는 어떤 서비스인가요?</h2>
              <p className="text-gray-700 leading-relaxed">
                What&apos;s Up Today는 AI 기술을 활용하여 업로드된 사진의 얼굴 표정을 분석하고 감정을 파악하는 웹 서비스입니다.
                사진을 업로드하면 7가지 감정(행복, 슬픔, 화남, 두려움, 놀람, 혐오, 중립)을 분석하고,
                나이와 성별을 예측한 후 AI가 생성한 재미있는 문구와 함께 결과를 제공합니다. 또한 이러한 결과를 SNS에 공유할 수 있습니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q2. 업로드한 사진은 어디에 저장되나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                업로드된 사진은 서버에 저장되지 않습니다. 모든 분석은 사용자의 디바이스에서 이루어지며,
                분석이 완료되면 이미지는 즉시 삭제됩니다. 개인정보 보호를 최우선으로 하는 서비스입니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q3. 분석 결과의 정확도는 어느 정도인가요?</h2>
              <p className="text-gray-700 leading-relaxed">
                AI 분석 결과는 참고용이며, 100% 정확성을 보장하지 않습니다.
                Face-API.js의 감정 분석 모델을 사용하여 일반적인 표정 패턴을 기반으로 분석하지만,
                개인의 특성이나 특수한 상황에서는 정확도가 달라질 수 있습니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q4. 어떤 종류의 사진을 업로드해야 하나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                얼굴이 명확하게 보이는 사진을 업로드해 주세요. 조명이 충분하고 얼굴이 화면 중앙에 위치한 사진이
                분석 정확도가 높습니다. 선글라스나 마스크 등으로 얼굴이 가려진 사진은 분석이 어려울 수 있습니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q5. 얼굴을 찾을 수 없다는 메시지가 나와요.</h2>
              <p className="text-gray-700 leading-relaxed">
                이는 업로드된 사진에서 얼굴을 감지하지 못했을 때 나타나는 메시지입니다.
                더 선명하고 밝은 사진으로 다시 시도해 보시거나, 얼굴이 화면 중앙에 오도록 사진을 조정해 보세요.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q6. 지원하는 파일 형식은 무엇인가요?</h2>
              <p className="text-gray-700 leading-relaxed">
                JPG, PNG, WEBP 형식의 이미지 파일을 지원합니다. 파일 크기는 최대 10MB까지 업로드 가능하며,
                더 큰 파일의 경우 압축 후 업로드해 주세요.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q7. 모바일에서도 사용할 수 있나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                네, 반응형 디자인으로 구현되어 있어 모바일, 태블릿, 데스크톱 모든 기기에서 사용할 수 있습니다.
                모바일에서는 카메라로 직접 촬영한 사진을 업로드하여 분석할 수 있습니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q8. 분석에 시간이 얼마나 걸리나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                일반적으로 3-5초 내에 분석이 완료됩니다. AI 모델 로딩이 필요한 경우 첫 사용 시에는
                조금 더 시간이 걸릴 수 있지만, 이후에는 빠르게 분석됩니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q9. 여러 언어를 지원하나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                네! 현재 9개 언어를 지원합니다: 한국어, English, Español, 日本語, 中文, Tiếng Việt, Bahasa Indonesia, Italiano, ไทย.
                페이지 상단의 언어 선택기를 통해 원하는 언어로 전환할 수 있으며,
                선택한 언어는 자동으로 저장되어 다음 방문 시에도 유지됩니다.
                AI가 생성하는 문구도 선택한 언어로 제공됩니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q10. 분석 결과를 공유할 수 있나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                네, 분석 결과와 AI 생성 문구를 포함한 이미지를 생성하여 공유할 수 있습니다.
                웹 공유 API를 지원하는 브라우저에서는 직접 공유가 가능하며,
                이미지로 저장하여 SNS에 업로드할 수도 있습니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q11. 개인정보는 어떻게 처리되나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                업로드된 사진은 사용자의 디바이스에서 분석 후 즉시 삭제되며 절대로 저장되지 않습니다.
                분석 결과(감정, 나이, 성별)는 서비스 개선을 위해 익명화되어 저장되며,
                개인을 식별할 수 없는 통계 목적으로만 사용됩니다.
                Google Analytics를 통한 방문 통계 수집과 Google AdSense를 통한 광고 제공도 이루어집니다.
                자세한 내용은 <Link href="/privacy-policy" className="text-blue-600 hover:underline">개인정보 처리방침</Link>을 참고해 주세요.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q12. 서비스 이용에 비용이 발생하나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                What&apos;s Up Today는 완전 무료 서비스입니다. 별도의 가입이나 결제 없이
                언제든지 사진을 업로드하여 감정 분석을 받을 수 있습니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q13. 분석에 사용되는 모델 파일의 크기는 얼마나 되나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                각 모델 파일은 약 1-2MB 크기로, 총 4개 모델이 사용됩니다. 첫 방문 시 한 번만 다운로드되며,
                이후에는 브라우저 캐시에서 로드되어 빠른 분석이 가능합니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q14. 분석 정확도는 어느 정도인가요?</h2>
              <p className="text-gray-700 leading-relaxed">
                Face-API.js의 공식 문서에 따르면, 일반적인 조건에서 약 80-90%의 정확도를 보입니다.
                하지만 개인의 특성이나 특수한 상황에서는 정확도가 달라질 수 있습니다.
                분석 결과는 참고용으로만 사용하시기 바랍니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q15. 왜 TensorFlow.js WebGL 백엔드를 사용하나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                GPU 가속을 통해 분석 속도를 향상시키고, CPU 부하를 줄이기 위함입니다.
                WebGL을 지원하지 않는 브라우저에서는 CPU 백엔드로 자동 전환됩니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q16. 모델 로딩이 실패하면 어떻게 되나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                개발 환경에서는 더미 데이터를 사용하여 테스트할 수 있도록 구현되어 있습니다.
                실제 서비스에서는 모델 로딩 실패 시 사용자에게 오류 메시지를 표시하고 다시 시도할 수 있습니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q17. 분석 결과를 어떻게 해석하나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                각 감정별로 0-1 사이의 점수가 표시되며, 가장 높은 점수의 감정이 주요 감정으로 표시됩니다.
                나이와 성별은 얼굴 특징을 기반으로 한 예측값이며, 100% 정확성을 보장하지 않습니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q18. 여러 사람이 있는 사진도 분석 가능한가요?</h2>
              <p className="text-gray-700 leading-relaxed">
                현재는 첫 번째로 감지된 얼굴만 분석합니다. 여러 사람이 있는 사진의 경우
                가장 앞쪽에 있는 사람의 얼굴이 분석 대상이 됩니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q19. 동영상 파일도 분석할 수 있나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                현재는 정적 이미지 파일만 지원합니다. 동영상 파일은 지원하지 않으며,
                동영상에서 프레임을 추출하여 이미지로 변환한 후 업로드해 주세요.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q20. 분석 결과를 저장할 수 있나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                분석 결과는 브라우저에 저장되지 않습니다. 결과를 보관하고 싶으시면
                공유 기능을 사용하여 이미지로 저장하거나 스크린샷을 찍어 보관하실 수 있습니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q21. 업로드한 사진이 어디에 저장되나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                업로드된 사진은 서버에 저장되지 않습니다. 브라우저의 메모리에서만 처리되며,
                분석 완료 후 즉시 삭제됩니다. 개인정보 보호를 최우선으로 하는 서비스입니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q22. 분석 데이터는 어떻게 처리되나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                분석 결과(감정, 나이, 성별)는 서비스 개선을 위해 익명화되어 저장될 수 있습니다.
                하지만 개인을 식별할 수 없는 통계 목적으로만 사용되며, 개인정보는 포함되지 않습니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q23. 쿠키나 추적 기술을 사용하나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                Google Analytics를 통한 방문 통계 수집과 Google AdSense를 통한 광고 제공을 위해
                쿠키를 사용할 수 있습니다. 언어 설정은 localStorage에 저장됩니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q24. 오프라인에서도 사용할 수 있나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                모델 파일이 브라우저 캐시에 저장되어 있다면 오프라인에서도 얼굴 감지와 감정 분석이 가능합니다.
                하지만 AI 문구 생성은 인터넷 연결이 필요합니다.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Q25. 추가 문의사항이 있으면 어떻게 하나요?</h2>
              <p className="text-gray-700 leading-relaxed">
                서비스 이용 중 궁금한 점이나 문의사항이 있으시면 <Link href="/contact" className="text-blue-600 hover:underline">연락처 페이지</Link>를 통해
                언제든 연락해 주세요. 사용자의 피드백은 서비스 개선에 큰 도움이 됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
