"use client";

import { useCallback, useState, useEffect } from "react";
import { UploadBefore, ImageUpload, SupportedFormats } from "./";

type UploadState = 'before' | 'image';

export default function UploadStates() {
  const [uploadState, setUploadState] = useState<UploadState>('before');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);

  // 텍스트 상수
  const TEXTS = {
    errorFileSize: "파일 크기는 10MB 이하로 선택해주세요.",
  };

  // 페이지 로드 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // face-api.js 모델 로딩 (페이지 방문 시)
  useEffect(() => {
    const loadModels = async () => {
      try {
        // 동적 import로 클라이언트 사이드에서만 로드
        const faceapi = await import('face-api.js');

        // TensorFlow.js 백엔드 설정
        await faceapi.tf.setBackend('webgl');
        await faceapi.tf.ready();

        console.log('TinyYolov2 모델 로딩 시작...');

        // TinyYolov2 모델을 먼저 로드 (얼굴 감지용)
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        console.log('TinyYolov2 모델 로딩 완료');

        // 나머지 모델들 순차적으로 로딩
        console.log('Face Landmark 모델 로딩 중...');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

        console.log('Face Expression 모델 로딩 중...');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');

        console.log('Age Gender 모델 로딩 중...');
        await faceapi.nets.ageGenderNet.loadFromUri('/models');

        console.log('모든 모델 로딩 완료');
        setModelsLoaded(true);
      } catch (error) {
        console.error('모델 로딩 실패:', error);
        // 개발 환경에서는 더미 데이터 사용
        console.log('더미 데이터 모드로 전환');
        setModelsLoaded(true);
      }
    };

    loadModels();
  }, []);


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
          modelsLoaded={modelsLoaded}
        />
      )}
    </>
  );
}
