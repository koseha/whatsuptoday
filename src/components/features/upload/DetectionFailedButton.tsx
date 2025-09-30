import { AlertCircle, Camera } from "lucide-react";
import { useAppTranslations } from "@/hooks/useTranslations";
import Image from 'next/image';

interface DetectionFailedButtonProps {
  onReset: () => void;
  changePhotoText: string;
}

export default function DetectionFailedButton({
  onReset,
  changePhotoText
}: DetectionFailedButtonProps) {
  const t = useAppTranslations();
  return (
    <div className="space-y-4">
      {/* 감지 실패 안내 */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="bg-orange-100 p-3 rounded-full">
              <Image
                src="/favicon.svg"
                alt="Oops"
                width={32}
                height={32}
                className="w-8 h-8 opacity-60 grayscale"
              />
            </div>
            <div className="absolute -top-1 -right-1 bg-orange-500 rounded-full p-1">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {t.detection.failed()}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {t.detection.failedDescription()}
          </p>
        </div>
      </div>

      {/* 해결 방안 버튼 */}
      <div className="space-y-3">
        {/* 다른 사진 선택 */}
        <button
          onClick={onReset}
          className="w-full px-6 py-3 rounded-lg font-bold transition-all text-white cursor-pointer relative overflow-hidden bg-gradient-to-r from-[hsl(245,70%,59%)] to-[hsl(245,70%,70%)] hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4" />
          {changePhotoText}
        </button>
      </div>

      {/* 도움말 팁 */}
      <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
        <p className="font-medium mb-1">{t.detection.tips.title()}</p>
        <ul className="space-y-1 text-xs">
          <li>{t.detection.tips.lighting()}</li>
          <li>{t.detection.tips.center()}</li>
          <li>{t.detection.tips.expression()}</li>
        </ul>
      </div>
    </div>
  );
}
