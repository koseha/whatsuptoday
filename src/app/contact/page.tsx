import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '연락처 - What\'s Up Today',
  description: 'What\'s Up Today 연락처 정보',
};

export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">연락처</h1>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold mb-3">문의사항</h2>
              <p>서비스 이용 중 궁금한 점이나 문의사항이 있으시면 언제든 연락해 주세요.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">연락 방법</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2"><strong>이메일:</strong> kosehadev@google.com</p>
                <p className="text-xs text-gray-600">평일 09:00 - 18:00 (KST) 내 응답 가능</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">자주 묻는 질문</h2>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Q: 업로드한 사진은 어디에 저장되나요?</p>
                  <p className="text-gray-600">A: 업로드된 사진은 분석 후 즉시 삭제되며 저장되지 않습니다.</p>
                </div>
                <div>
                  <p className="font-medium">Q: 분석 결과의 정확도는 어느 정도인가요?</p>
                  <p className="text-gray-600">A: AI 분석 결과는 참고용이며, 100% 정확성을 보장하지 않습니다.</p>
                </div>
              </div>
            </section>

            <section>
              <p className="text-xs text-gray-500 mt-8">
                빠른 답변을 위해 문의 시 구체적인 내용을 포함해 주세요.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
