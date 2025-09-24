import { Sparkles } from "lucide-react";
import Image from "next/image";
import BasicContainer from "../../ui/BasicContainer";

interface ImageUploadProps {
  fileUrl: string;
  onReset: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export default function ImageUpload({
  fileUrl,
  onReset,
  onAnalyze,
  isAnalyzing
}: ImageUploadProps) {
  // 텍스트 상수
  const TEXTS = {
    analyze: "오늘의 기분",
    analyzing: "분석 중..."
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
            disabled={isAnalyzing}
            className={`w-full px-6 py-3 rounded-lg font-bold transition-all text-white cursor-pointer relative overflow-hidden ${isAnalyzing
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-gradient-to-r from-[hsl(245,70%,59%)] to-[hsl(245,70%,70%)] hover:shadow-lg hover:shadow-primary/25 shimmer-effect'
              }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {TEXTS.analyzing}
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
            다른 사진으로 변경
          </button>
        </div>
      </div>
    </BasicContainer>
  );
}
