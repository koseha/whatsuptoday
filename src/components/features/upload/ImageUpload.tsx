"use client";

import { Sparkles, Search, FileText, PenTool } from "lucide-react";
import { useState } from "react";
import BasicContainer from "../../ui/BasicContainer";
import ImageDisplay from "./ImageDisplay";
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
          <div className="space-y-6">
            {/* AI 로딩 애니메이션 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* 검색 단계 (0-3초) */}
                {generatingPhase === 'search' && (
                  <div className="animate-fade-in-out">
                    <div className="relative">
                      <Search className="w-12 h-12 text-primary animate-magnify-search" strokeWidth={1.5} />

                      {/* 팡팡 터지는 효과들 */}
                      {/* 반짝이는 별들 */}
                      <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-sparkle-1" />
                      <div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-sparkle-2" />
                      <div className="absolute -bottom-1 -left-3 w-1 h-1 bg-pink-400 rounded-full animate-sparkle-3" />
                      <div className="absolute -bottom-2 -right-2 w-1.5 h-1.5 bg-green-400 rounded-full animate-sparkle-1" />

                      {/* 떠오르는 버블들 */}
                      <div className="absolute -left-4 top-2 w-2 h-2 bg-blue-300/60 rounded-full animate-bubble-1" />
                      <div className="absolute -right-4 top-4 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-bubble-2" />
                      <div className="absolute -left-2 -bottom-2 w-1 h-1 bg-cyan-300/60 rounded-full animate-bubble-3" />
                      <div className="absolute -right-2 -bottom-1 w-1.5 h-1.5 bg-orange-300/60 rounded-full animate-bubble-1" />

                      {/* 리플 효과 */}
                      <div className="absolute inset-0 rounded-full animate-ripple" style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                      }} />
                    </div>
                  </div>
                )}

                {/* 글쓰기 단계 (3-6초) */}
                {generatingPhase === 'writing' && (
                  <div className="animate-fade-in-out">
                    <div className="relative">
                      {/* 문서 */}
                      <FileText
                        className="w-10 h-12 text-muted-foreground animate-paper-float absolute -left-3 top-0"
                        strokeWidth={1.5}
                      />
                      {/* 펜 */}
                      <PenTool className="w-6 h-6 text-primary animate-pen-write absolute right-0 top-3" strokeWidth={1.5} />

                      {/* 팡팡 터지는 효과들 */}
                      {/* 반짝이는 별들 */}
                      <div className="absolute -top-3 -left-1 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-sparkle-2" />
                      <div className="absolute -top-1 -right-4 w-2 h-2 bg-blue-400 rounded-full animate-sparkle-1" />
                      <div className="absolute -bottom-3 -left-4 w-1 h-1 bg-pink-400 rounded-full animate-sparkle-3" />
                      <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-sparkle-2" />
                      <div className="absolute top-1 -left-5 w-1 h-1 bg-purple-400 rounded-full animate-sparkle-1" />
                      <div className="absolute top-3 -right-5 w-1.5 h-1.5 bg-orange-400 rounded-full animate-sparkle-3" />

                      {/* 떠오르는 버블들 */}
                      <div className="absolute -left-6 top-1 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-bubble-2" />
                      <div className="absolute -right-6 top-3 w-1 h-1 bg-purple-300/60 rounded-full animate-bubble-3" />
                      <div className="absolute -left-4 -bottom-1 w-1.5 h-1.5 bg-cyan-300/60 rounded-full animate-bubble-1" />
                      <div className="absolute -right-4 -bottom-3 w-1 h-1 bg-orange-300/60 rounded-full animate-bubble-2" />
                      <div className="absolute -left-7 top-4 w-1.5 h-1.5 bg-pink-300/60 rounded-full animate-bubble-3" />
                      <div className="absolute -right-7 top-6 w-1 h-1 bg-green-300/60 rounded-full animate-bubble-1" />

                      {/* 글자 라인 효과 */}
                      <div className="absolute left-0 top-6 space-y-1">
                        <div className="w-6 h-0.5 bg-primary/60 animate-pulse" style={{ animationDelay: "0s" }} />
                        <div className="w-4 h-0.5 bg-primary/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
                        <div className="w-5 h-0.5 bg-primary/30 animate-pulse" style={{ animationDelay: "1s" }} />
                      </div>

                      {/* 리플 효과 */}
                      <div className="absolute inset-0 rounded-full animate-ripple" style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                      }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium text-foreground">
                  {generatingPhase === 'search' ? 'AI가 분석하고 있습니다' : 'AI가 결과를 작성하고 있습니다'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {generatingPhase === 'search' ? '요청을 분석하고 있습니다...' : '최적의 문구를 작성하고 있습니다...'}
                </p>
              </div>
            </div>
          </div>
        )}

        {currentAnalysisState === 'completed' && generatedPhrase && (
          <div className="space-y-2">
            <p className="text-center text-green-600 font-medium">문구 생성 완료!</p>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <p className="text-center text-lg font-medium text-gray-800">
                {generatedPhrase}
              </p>
            </div>
            <button
              style={{
                background: 'white',
                border: '0.5px solid hsl(245,70%,59%)',
                color: 'hsl(245,70%,59%)'
              }}
              onClick={handleGenerate}
              className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
            >
              다른 문구 생성하기
            </button>
            <button
              onClick={onReset}
              className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
            >
              {TEXTS.changePhoto}
            </button>
          </div>
        )}


      </div>
    </BasicContainer>
  );
}
