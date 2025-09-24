import { Camera } from "lucide-react";
import BasicContainer from "../../ui/BasicContainer";

export default function SupportedFormats() {
  // 텍스트 상수
  const TEXTS = {
    supportedFormats: "지원 형식",
    imageFormats: "JPG, PNG, WEBP"
  };

  return (
    <BasicContainer>
      <h4 className="font-bold text-sm mb-3 text-center">{TEXTS.supportedFormats}</h4>
      <div className="flex justify-center text-xs">
        <div className="flex items-center text-muted">
          <Camera className="w-4 h-4 mr-1" />
          {TEXTS.imageFormats}
        </div>
      </div>
    </BasicContainer>
  );
}
