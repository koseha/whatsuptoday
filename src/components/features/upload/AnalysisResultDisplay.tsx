import { Sparkles } from "lucide-react";

interface AnalysisResultDisplayProps {
  generatedPhrase: string;
  analysisResult: {
    dominantEmotion: string;
    dominantLabel: string;
    dominantScore: number;
    age: number;
    gender: string;
    emotions: Record<string, number>;
  } | null;
  onRegenerate: () => void;
  onReset: () => void;
}

export default function AnalysisResultDisplay({
  generatedPhrase,
  analysisResult,
  onRegenerate,
  onReset
}: AnalysisResultDisplayProps) {
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
    <div className="space-y-4">

      {/* AI 생성 문구 */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">AI</span>
        </div>
        <p className="text-center text-lg font-medium text-purple-800">
          {generatedPhrase}
        </p>
      </div>

      {/* 감정 분석 결과 */}
      {analysisResult && (
        <div className="space-y-3">
          {/* 주요 감정 */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">주요 감정</span>
              <span className="text-sm text-gray-500">
                {analysisResult.age}세 {getGenderLabel(analysisResult.gender)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">
                {emotionLabels[analysisResult.dominantEmotion as keyof typeof emotionLabels] || analysisResult.dominantEmotion}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {(analysisResult.dominantScore * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* 전체 감정 수치 (높은 순으로 정렬) */}
          <div className="space-y-2">
            {Object.entries(analysisResult.emotions)
              .sort(([, a], [, b]) => b - a) // 수치 높은 순으로 정렬
              .map(([emotion, score]) => (
                <div key={emotion} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 w-20">
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
                  <span className="text-xs text-gray-500 w-12 text-right">
                    {(score * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
      <button
        style={{
          background: 'white',
          border: '0.5px solid hsl(245,70%,59%)',
          color: 'hsl(245,70%,59%)'
        }}
        onClick={onRegenerate}
        className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
      >
        다른 문구 생성하기
      </button>
      <button
        onClick={onReset}
        className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
      >
        다른 사진으로 변경
      </button>
    </div>
  );
}
