"use client";

import { useCallback, useState, useEffect } from "react";
import { UploadBefore, ImageUpload, SupportedFormats } from "./";
import { useAppTranslations } from "@/hooks/useTranslations";
import { useFaceApiModels } from "@/hooks/useFaceApiModels";

type UploadState = 'before' | 'image';

export default function UploadStates() {
  const [uploadState, setUploadState] = useState<UploadState>('before');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const { modelsLoaded } = useFaceApiModels();
  const t = useAppTranslations();

  // 페이지 로드 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 모델 로딩은 useFaceApiModels 훅에서 처리


  const handleFileSelect = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      // 파일 크기 검증 (10MB = 10 * 1024 * 1024 bytes)
      if (file.size > 10 * 1024 * 1024) {
        alert(t.upload.fileSizeError());
        return;
      }

      setUploadState('image');
      setUploadedFile(file);
      setFileUrl(URL.createObjectURL(file));
    } else {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
  }, [t]);


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
        {/* <div className="mt-4">
          <LanguageSelector />
        </div> */}
        <UploadBefore onFileSelect={handleFileSelect} />
        <SupportedFormats />
      </>
      }

      {/* 업로드 후 - 사진 */}
      {uploadState === 'image' && uploadedFile && (
        <ImageUpload
          fileUrl={fileUrl}
          onReset={handleReset}
          modelsLoaded={modelsLoaded}
        />
      )}
    </>
  );
}
