"use client";

import { useCallback, useState } from "react";
import { UploadBefore, ImageUpload, VideoUpload, SupportedFormats } from "../upload";
import BasicContainer from "./BasicContainer";
import { Shield, Sparkles } from "lucide-react";

type UploadState = 'before' | 'image' | 'video';

export default function ContentArea() {
  const [uploadState, setUploadState] = useState<UploadState>('before');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [selectedFrameTime, setSelectedFrameTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 텍스트 상수
  const TEXTS = {
    errorFileSize: "파일 크기는 100MB 이하로 선택해주세요.",
    successAnalysis: "분석이 완료되었습니다!",
    errorAnalysis: "분석 중 오류가 발생했습니다."
  };

  const handleFileSelect = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      setUploadState('image');
      setUploadedFile(file);
      setFileUrl(URL.createObjectURL(file));
    } else if (file.type.startsWith('video/')) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        alert(TEXTS.errorFileSize);
        return;
      }
      setUploadState('video');
      setUploadedFile(file);
      setFileUrl(URL.createObjectURL(file));
      setSelectedFrameTime(0);
    }
  }, [TEXTS.errorFileSize]);

  const handleLoadedMetadata = useCallback(() => {
    setVideoDuration(videoDuration);
    setSelectedFrameTime(videoDuration / 2);
  }, [videoDuration]);

  const handleTimeChange = useCallback((time: number) => {
    setSelectedFrameTime(time);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    try {
      // Mock analysis - 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
      alert(TEXTS.successAnalysis);
    } catch {
      alert(TEXTS.errorAnalysis);
    } finally {
      setIsAnalyzing(false);
    }
  }, [uploadedFile, TEXTS.successAnalysis, TEXTS.errorAnalysis]);

  const handleReset = useCallback(() => {
    setUploadState('before');
    setUploadedFile(null);
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl('');
    }
    setSelectedFrameTime(0);
    setVideoDuration(0);
  }, [fileUrl]);

  return (
    <div className="flex flex-col gap-2 md:gap-7">
      {/* 업로드 전 상태 */}
      {uploadState === 'before' && <>
        <UploadBefore onFileSelect={handleFileSelect} />
        <SupportedFormats />
      </>
      }

      {/* 업로드 후 - 사진 */}
      {uploadState === 'image' && uploadedFile && (
        <ImageUpload
          fileUrl={fileUrl}
          onReset={handleReset}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />
      )}

      {/* 업로드 후 - 비디오 */}
      {uploadState === 'video' && uploadedFile && (
        <VideoUpload
          fileUrl={fileUrl}
          selectedFrameTime={selectedFrameTime}
          videoDuration={videoDuration}
          onReset={handleReset}
          onAnalyze={handleAnalyze}
          onTimeChange={handleTimeChange}
          onLoadedMetadata={handleLoadedMetadata}
          isAnalyzing={isAnalyzing}
        />
      )}

      <BasicContainer>
        <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
        <h3 className="font-bold text-sm mb-1">AI 기분 분석</h3>
        <p className="text-xs text-muted">표정과 분위기를 재미있게 해석</p>
      </BasicContainer>

      <div className="flex items-center justify-center gap-2 py-2">
        <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
        <span className="text-xs text-green-700 dark:text-green-300 font-medium">
          선택한 사진/동영상은 저장되지 않습니다!
        </span>
      </div>

    </div>
  );
}