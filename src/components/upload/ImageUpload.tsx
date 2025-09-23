import { Play, X } from "lucide-react";
import Image from "next/image";
import BasicContainer from "../layout/BasicContainer";

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
    analyze: "기분 분석하기",
    analyzing: "분석 중..."
  };

  return (
    <BasicContainer>
      <div className="space-y-6">
        <div className="relative">
          <Image
            src={fileUrl}
            alt="Uploaded"
            width={800}
            height={600}
            className="w-full max-h-96 object-contain rounded-lg"
          />
          <button
            onClick={onReset}
            className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${isAnalyzing
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
              }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {TEXTS.analyzing}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                {TEXTS.analyze}
              </div>
            )}
          </button>
        </div>
      </div>
    </BasicContainer>
  );
}
