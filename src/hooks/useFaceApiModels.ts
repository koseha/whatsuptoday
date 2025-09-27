"use client";

import { useEffect, useState } from 'react';

// 전역 모델 로딩 상태 관리
let globalModelsLoaded = false;
let globalLoadingPromise: Promise<boolean> | null = null;

export const useFaceApiModels = () => {
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(globalModelsLoaded);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // 이미 로드된 경우 즉시 반환
    if (globalModelsLoaded) {
      setModelsLoaded(true);
      return;
    }

    // 이미 로딩 중인 경우 기존 Promise 사용
    if (globalLoadingPromise) {
      setIsLoading(true);
      globalLoadingPromise.then((loaded) => {
        setModelsLoaded(loaded);
        setIsLoading(false);
      });
      return;
    }

    // 새로운 로딩 시작
    setIsLoading(true);
    globalLoadingPromise = loadModels();

    globalLoadingPromise.then((loaded) => {
      globalModelsLoaded = loaded;
      setModelsLoaded(loaded);
      setIsLoading(false);
    });
  }, []);

  return { modelsLoaded, isLoading };
};

const loadModels = async (): Promise<boolean> => {
  try {
    // 동적 import로 클라이언트 사이드에서만 로드
    const faceapi = await import('face-api.js');

    // TensorFlow.js 백엔드 설정
    await faceapi.tf.setBackend('webgl');
    await faceapi.tf.ready();

    // TinyYolov2 모델을 먼저 로드 (얼굴 감지용)
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');

    // 나머지 모델들 순차적으로 로딩
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    await faceapi.nets.ageGenderNet.loadFromUri('/models');

    return true;
  } catch (error) {
    console.error('❌ 모델 로딩 실패:', error);
    // 개발 환경에서는 더미 데이터 사용
    return true;
  }
};
