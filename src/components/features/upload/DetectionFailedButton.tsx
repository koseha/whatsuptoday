import { AlertCircle, Camera } from "lucide-react";

interface DetectionFailedButtonProps {
  onReset: () => void;
  changePhotoText: string;
}

export default function DetectionFailedButton({
  onReset,
  changePhotoText
}: DetectionFailedButtonProps) {
  return (
    <div className="space-y-4">
      {/* 감지 실패 안내 */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center">
          <div className="bg-orange-100 p-3 rounded-full">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            얼굴을 찾을 수 없어요 😅
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            더 선명하고 밝은 사진으로 다시 시도해보세요!
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
        <p className="font-medium mb-1">💡 팁:</p>
        <ul className="space-y-1 text-xs">
          <li>• 조명이 충분한 곳에서 촬영해보세요</li>
          <li>• 얼굴이 화면 중앙에 오도록 해보세요</li>
          <li>• 표정이 명확하게 보이는 사진이 좋아요</li>
        </ul>
      </div>
    </div>
  );
}
