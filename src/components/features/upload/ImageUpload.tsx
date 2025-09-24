import { Sparkles } from "lucide-react";
import Image from "next/image";
import BasicContainer from "../../ui/BasicContainer";

interface ImageUploadProps {
  fileUrl: string;
  onReset: () => void;
  onAnalyze: () => void;
}

export default function ImageUpload({
  fileUrl,
  onReset,
  onAnalyze
}: ImageUploadProps) {
  // 텍스트 상수
  const TEXTS = {
    analyze: "오늘의 기분",
    changePhoto: "다른 사진으로 변경"
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
            className="w-full px-6 py-3 rounded-lg font-bold transition-all text-white cursor-pointer relative overflow-hidden bg-gradient-to-r from-[hsl(245,70%,59%)] to-[hsl(245,70%,70%)] hover:shadow-lg hover:shadow-primary/25 shimmer-effect"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              {TEXTS.analyze}
            </div>
          </button>

          {/* 다른 사진으로 변경 버튼 */}
          <button
            onClick={onReset}
            className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
          >
            {TEXTS.changePhoto}
          </button>
        </div>

      </div>
    </BasicContainer>
  );
}
