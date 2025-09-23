import BasicContainer from "@/components/layout/BasicContainer";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* 파일 업로드 */}
      {/*  */}
      <BasicContainer>
        <div className="animate-fade-in-up">
          <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
          <h3 className="font-bold text-sm mb-1">AI 기분 분석</h3>
          <p className="text-xs text-muted">표정과 분위기를 재미있게 해석</p>
        </div>
      </BasicContainer>
    </>
  );
}
