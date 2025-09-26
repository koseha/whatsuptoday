"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import BasicContainer from "../../ui/BasicContainer";
import ImageDisplay from "./ImageDisplay";
import AILoadingAnimation from "./AILoadingAnimation";
import AnalysisResultDisplay from "./AnalysisResultDisplay";
import { useFaceAnalysis } from "../../hooks/useFaceAnalysis";
import { usePhraseGeneration } from "../../hooks/usePhraseGeneration";

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
    } catch (error) {
      setCurrentAnalysisState('analyzed');
    }
  };

  return (
    <BasicContainer>
      <div className="space-y-4">
        <ImageDisplay fileUrl={fileUrl} />

        {/* 상태별 UI 렌더링 */}

        {analysisState === 'analyzing' && (
          <div className="space-y-2">
            <button
              onClick={handleGenerate}
              disabled={true}
              className="w-full px-6 py-3 rounded-lg font-bold transition-all text-white cursor-pointer relative overflow-hidden button-fill-animation"
              style={{
                background: 'white',
                border: '0.5px solid hsl(245,70%,59%)',
                color: 'hsl(245,70%,59%)'
              }}
            >
              <div className={`flex items-center justify-center gap-2 ${showTextAnimation ? 'text-fade-out-up' : ''}`}>
                <Sparkles className="w-4 h-4" />
                사진 선택하는 중...
              </div>
            </button>
            <button
              onClick={onReset}
              className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
            >
              {TEXTS.changePhoto}
            </button>
          </div>
        )}

        {analysisState === 'analyzed' && analysisResult && (
          <div className="space-y-2">
            <button
              onClick={handleGenerate}
              className="w-full px-6 py-3 rounded-lg font-bold transition-all text-white cursor-pointer relative overflow-hidden bg-gradient-to-r from-[hsl(245,70%,59%)] to-[hsl(245,70%,70%)] hover:shadow-lg hover:shadow-primary/25 shimmer-effect"
              style={{
                border: '0.5px solid hsl(245,70%,59%)'
              }}
            >
              <div className={`flex items-center justify-center gap-2 ${showTextAnimation ? 'text-fade-in-up' : ''}`}>
                <Sparkles className="w-4 h-4" />
                오늘의 기분 분석하기
              </div>
            </button>
            <button
              onClick={onReset}
              className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
            >
              {TEXTS.changePhoto}
            </button>
          </div>
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
