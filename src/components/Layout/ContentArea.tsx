import BasicContainer from "../ui/BasicContainer";
import { Shield, Sparkles } from "lucide-react";
import UploadStates from "../features/upload/UploadStates";

export default function ContentArea() {
  return (
    <div className="flex flex-col gap-2 md:gap-7">
      <UploadStates />

      <BasicContainer>
        <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
        <h3 className="font-bold text-sm mb-1">AI 기분 분석</h3>
        <p className="text-xs text-muted">표정과 분위기를 재미있게 해석</p>
      </BasicContainer>

      <div className="flex items-center justify-center gap-2 py-2">
        <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
        <span className="text-xs text-green-700 dark:text-green-300 font-medium">
          선택한 사진은 저장되지 않습니다!
        </span>
      </div>
    </div>
  );
}