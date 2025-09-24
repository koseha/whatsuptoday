"use client";

import { useCallback, useState } from "react";
import { UploadBefore, ImageUpload, SupportedFormats } from "./";

type UploadState = 'before' | 'image';

export default function UploadStates() {
  const [uploadState, setUploadState] = useState<UploadState>('before');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');

  // 텍스트 상수
  const TEXTS = {
    errorFileSize: "파일 크기는 10MB 이하로 선택해주세요."
  };

  const handleFileSelect = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      // 파일 크기 검증 (10MB = 10 * 1024 * 1024 bytes)
      if (file.size > 10 * 1024 * 1024) {
        alert(TEXTS.errorFileSize);
        return;
      }

      setUploadState('image');
      setUploadedFile(file);
      setFileUrl(URL.createObjectURL(file));
    } else {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
  }, [TEXTS.errorFileSize]);

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
        />
      )}
    </>
  );
}
