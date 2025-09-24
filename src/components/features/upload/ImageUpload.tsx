import { Sparkles } from "lucide-react";
import Image from "next/image";
import BasicContainer from "../../ui/BasicContainer";

interface ImageUploadProps {
  fileUrl: string;
  onReset: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  isModelLoaded: boolean;
  analysisResult?: {
    emotions: {
      happy: number;
      sad: number;
      angry: number;
      fearful: number;
      surprised: number;
      disgusted: number;
      neutral: number;
    };
    age: number;
    gender: string;
    dominantEmotion: string;
    dominantLabel: string;
    dominantScore: number;
    emotionLabels: Record<string, string>;
    aiPhrase: string;
  } | null;
}

export default function ImageUpload({
  fileUrl,
  onReset,
  onAnalyze,
  isAnalyzing,
  isModelLoaded,
  analysisResult
}: ImageUploadProps) {
  // 텍스트 상수
  const TEXTS = {
    analyze: "오늘의 기분",
    analyzing: "분석 중...",
    changePhoto: "다른 사진으로 변경",
    modelLoading: "모델 로딩 중..."
  };

  return (
    <BasicContainer>
      <div className="space-y-4">
        <div className="relative w-full max-w-md mx-auto">
          {/* 이미지 컨테이너 - 정사각형 비율로 고정 */}
          <div className="relative w-full aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <Image
              src={fileUrl}
              alt="업로드된 이미지"
              fill
              className="object-cover"
              style={{ objectPosition: 'center' }}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>

        <div className="space-y-2">
          {/* 분석 버튼 */}
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing || !isModelLoaded}
            className={`w-full px-6 py-3 rounded-lg font-bold transition-all text-white cursor-pointer relative overflow-hidden ${isAnalyzing || !isModelLoaded
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-gradient-to-r from-[hsl(245,70%,59%)] to-[hsl(245,70%,70%)] hover:shadow-lg hover:shadow-primary/25 shimmer-effect'
              }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {TEXTS.analyzing}
              </div>
            ) : !isModelLoaded ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {TEXTS.modelLoading}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                {TEXTS.analyze}
              </div>
            )}
          </button>

          {/* 다른 사진으로 변경 버튼 */}
          <button
            onClick={onReset}
            className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
          >
            {TEXTS.changePhoto}
          </button>
        </div>

        {/* 분석 결과 표시 */}
        {analysisResult && (
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20 animate-fade-in-up">
            {/* AI 생성 문구 */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">AI 분석 결과</span>
              </div>
              <p className="text-base font-medium text-gray-900 leading-relaxed">
                {analysisResult.aiPhrase}
              </p>
            </div>

            {/* 주요 감정 */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border">
                <div className="p-2 rounded-full bg-gray-50">
                  <span className="text-lg">😊</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">{analysisResult.dominantLabel}</div>
                  <div className="text-sm text-gray-600">
                    {Math.round(analysisResult.dominantScore * 100)}% 확률
                  </div>
                </div>
              </div>
            </div>

            {/* 상세 감정 분석 */}
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-gray-700 text-center">감정 분석</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(analysisResult.emotions).map(([emotion, score]) => {
                  const label = analysisResult.emotionLabels[emotion] || emotion;
                  return (
                    <div key={emotion} className="flex items-center space-x-2 p-2 bg-white rounded-lg">
                      <div className="w-3 h-3 flex items-center justify-center">
                        <span className="text-xs">•</span>
                      </div>
                      <span className="text-xs text-gray-700 flex-1">{label}</span>
                      <span className="text-xs text-gray-500">{Math.round((score as number) * 100)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 추가 정보 */}
            <div className="flex justify-center space-x-4 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <span>예상 나이: {analysisResult.age}세</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>성별: {analysisResult.gender === 'male' ? '남성' : '여성'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </BasicContainer>
  );
}
