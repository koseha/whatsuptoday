"use client";

import BasicContainer from "@/components/ui/BasicContainer";
import ImageDisplay from "./ImageDisplay";
import AILoadingAnimation from "./AILoadingAnimation";
import AnalysisResultDisplay from "./AnalysisResultDisplay";
import AnalyzingButton from "./AnalyzingButton";
import GenerateButton from "./GenerateButton";
import DetectionFailedButton from "./DetectionFailedButton";
import { useFaceAnalysis } from "@/hooks/useFaceAnalysis";
import { usePhraseGeneration } from "@/hooks/usePhraseGeneration";
import { useAppTranslations } from "@/hooks/useTranslations";

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
  const { analysisState, setAnalysisState, analysisResult, showTextAnimation } = useFaceAnalysis(fileUrl, modelsLoaded);
  const { generatedPhrase, generatingPhase, handleGeneratePhrase } = usePhraseGeneration(analysisResult);
  const t = useAppTranslations();

  const handleGenerate = async () => {
    setAnalysisState('generating');
    try {
      await handleGeneratePhrase();
      setAnalysisState('completed');
    } catch {
      setAnalysisState('analyzed');
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
            changePhotoText={t.upload.changePhoto()}
          />
        )}

        {analysisState === 'analyzed' && analysisResult && (
          <GenerateButton
            showTextAnimation={showTextAnimation}
            onGenerate={handleGenerate}
            onReset={onReset}
            changePhotoText={t.upload.changePhoto()}
          />
        )}

        {analysisState === 'generating' && (
          <AILoadingAnimation phase={generatingPhase} />
        )}

        {analysisState === 'completed' && generatedPhrase && (
          <AnalysisResultDisplay
            generatedPhrase={generatedPhrase}
            analysisResult={analysisResult}
            userImage={fileUrl}
            onRegenerate={handleGenerate}
            onReset={onReset}
          />
        )}

        {analysisState === 'detection-failed' && (
          <DetectionFailedButton
            onReset={onReset}
            changePhotoText={t.upload.changePhoto()}
          />
        )}

      </div>
    </BasicContainer>
  );
}
