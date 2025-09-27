import { Camera, HardDrive } from "lucide-react";
import BasicContainer from "@/components/ui/BasicContainer";
import { useAppTranslations } from "@/hooks/useTranslations";

export default function SupportedFormats() {
  const t = useAppTranslations();

  return (
    <BasicContainer>
      <h4 className="font-bold text-sm mb-3 text-center">{t.upload.supportedFormats()}</h4>
      <div className="flex justify-center space-x-6 text-xs">
        <div className="flex items-center text-muted">
          <Camera className="w-4 h-4 mr-1" />
          {t.upload.imageFormats()}
        </div>
        <div className="flex items-center text-muted">
          <HardDrive className="w-4 h-4 mr-1" />
          최대 10MB
        </div>
      </div>
    </BasicContainer>
  );
}
