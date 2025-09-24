import { Camera, HardDrive } from "lucide-react";
import BasicContainer from "../../ui/BasicContainer";

export default function SupportedFormats() {
  // 텍스트 상수
  const TEXTS = {
    supportedFormats: "지원 형식",
    imageFormats: "JPG, PNG, WEBP",
    fileSizeLimit: "최대 10MB"
  };

  return (
    <BasicContainer>
      <h4 className="font-bold text-sm mb-3 text-center">{TEXTS.supportedFormats}</h4>
      <div className="flex justify-center space-x-6 text-xs">
        <div className="flex items-center text-muted">
          <Camera className="w-4 h-4 mr-1" />
          {TEXTS.imageFormats}
        </div>
        <div className="flex items-center text-muted">
          <HardDrive className="w-4 h-4 mr-1" />
          {TEXTS.fileSizeLimit}
        </div>
      </div>
    </BasicContainer>
  );
}
