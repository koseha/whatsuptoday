import { forwardRef } from "react";

interface ShareableResultProps {
  generatedPhrase: string;
  analysisResult: {
    dominantEmotion: string;
    dominantLabel: string;
    dominantScore: number;
    age: number;
    gender: string;
    emotions: Record<string, number>;
  } | null;
  userImage?: string;
}

const ShareableResult = forwardRef<HTMLDivElement, ShareableResultProps>(({
  generatedPhrase,
  analysisResult,
  userImage
}, ref) => {
  // 감정 라벨 매핑
  const emotionLabels = {
    happy: "😊 행복",
    sad: "😢 슬픔",
    angry: "😠 화남",
    fearful: "😨 두려움",
    surprised: "😲 놀람",
    disgusted: "🤢 혐오",
    neutral: "😐 차분함"
  };

  // 성별 변환 함수
  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'male': return '남성';
      case 'female': return '여성';
      default: return gender;
    }
  };

  return (
    <div ref={ref} className="w-96 h-auto bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
      {/* 사용자 이미지 */}
      {userImage && (
        <div className="flex justify-center mb-5">
          <div className="w-56 h-72 rounded-lg overflow-hidden border-4 border-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={userImage}
              alt="분석 이미지"
              width={224}
              height={288}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
              loading="eager"
              decoding="sync"
            />
          </div>
        </div>
      )}

      {/* AI 문구 - 큰 제목처럼 */}
      <div className="text-center mb-5">
        <h2 className="text-xl font-bold text-purple-700 leading-relaxed">
          {generatedPhrase}
        </h2>
      </div>

      {/* 주요 분석 결과 */}
      {analysisResult && (
        <div className="text-center bg-white rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-1">주요 감정</p>
          <p className="text-lg font-bold text-purple-600">
            {emotionLabels[analysisResult.dominantEmotion as keyof typeof emotionLabels]} {(analysisResult.dominantScore * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500">
            {analysisResult.age}세 {getGenderLabel(analysisResult.gender)}
          </p>
        </div>
      )}

      {/* 감정 수치 차트 */}
      {analysisResult && (
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="space-y-1">
            {Object.entries(analysisResult.emotions)
              .sort(([, a], [, b]) => b - a) // 높은 순으로 정렬
              .map(([emotion, score]) => (
                <div key={emotion} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 w-16">
                    {emotionLabels[emotion as keyof typeof emotionLabels] || emotion}
                  </span>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${score * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right font-medium">
                    {(score * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 하단 브랜딩 */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          #AI감정분석 #whatsuptoday.pages.dev
        </p>
      </div>
    </div>
  );
});

ShareableResult.displayName = "ShareableResult";

export default ShareableResult;
