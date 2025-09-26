"use client";

import { useState } from "react";
import BasicContainer from "@/components/ui/BasicContainer";
import ImageDisplay from "./ImageDisplay";
import AILoadingAnimation from "./AILoadingAnimation";
import AnalysisResultDisplay from "./AnalysisResultDisplay";
import AnalyzingButton from "./AnalyzingButton";
import GenerateButton from "./GenerateButton";
import { useFaceAnalysis } from "@/hooks/useFaceAnalysis";
import { usePhraseGeneration } from "@/hooks/usePhraseGeneration";

type AnalysisState = 'analyzing' | 'analyzed' | 'generating' | 'completed';

interface ImageUploadProps {
  fileUrl: string;
  onReset: () => void;
  modelsLoaded: boolean;
}


export default function ImageUpload({
  fileUrl,
  onReset,
  modelsLoaded
}: ImageUploadProps) {
  const { analysisState, analysisResult, showTextAnimation } = useFaceAnalysis(fileUrl, modelsLoaded);
  const { generatedPhrase, generatingPhase, handleGeneratePhrase } = usePhraseGeneration(analysisResult);
  const [currentAnalysisState, setCurrentAnalysisState] = useState<AnalysisState>('analyzing');

  // 텍스트 상수
  const TEXTS = {
    analyze: "오늘의 기분",
    changePhoto: "다른 사진으로 변경",
    errorFileSize: "파일 크기는 10MB 이하로 선택해주세요.",
  };



  const handleGenerate = async () => {
    setCurrentAnalysisState('generating');
    try {
      await handleGeneratePhrase();
      setCurrentAnalysisState('completed');
    } catch {
      setCurrentAnalysisState('analyzed');
    }
  };

  return (
    <BasicContainer>
      <div className="space-y-4">
        <ImageDisplay fileUrl={fileUrl} />

        {/* 상태별 UI 렌더링 */}
        {analysisState === 'analyzing' && (
          <AnalyzingButton
            showTextAnimation={showTextAnimation}
            onReset={onReset}
            changePhotoText={TEXTS.changePhoto}
          />
        )}

        {analysisState === 'analyzed' && analysisResult && (
          <GenerateButton
            showTextAnimation={showTextAnimation}
            onGenerate={handleGenerate}
            onReset={onReset}
            changePhotoText={TEXTS.changePhoto}
          />
        )}

        {currentAnalysisState === 'generating' && (
          <AILoadingAnimation phase={generatingPhase} />
        )}

        {currentAnalysisState === 'completed' && generatedPhrase && (
          <AnalysisResultDisplay
            generatedPhrase={generatedPhrase}
            onRegenerate={handleGenerate}
            onReset={onReset}
          />
        )}


      </div>
    </BasicContainer>
  );
}
