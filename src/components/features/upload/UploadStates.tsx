"use client";

import { useCallback, useState } from "react";
import { UploadBefore, ImageUpload, SupportedFormats } from "./";

type UploadState = 'before' | 'image';

export default function UploadStates() {
  const [uploadState, setUploadState] = useState<UploadState>('before');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
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
    } else {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
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
  }, [fileUrl]);
  return (
    <>
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
    </>
  );
}
