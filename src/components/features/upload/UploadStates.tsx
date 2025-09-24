"use client";

import { useCallback, useState, useEffect } from "react";
import { UploadBefore, ImageUpload, SupportedFormats } from "./";

type UploadState = 'before' | 'image';

export default function UploadStates() {
  const [uploadState, setUploadState] = useState<UploadState>('before');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    emotions: {
      happy: number;
      sad: number;
      angry: number;
      fearful: number;
      surprised: number;
      disgusted: number;
      neutral: number;
    };
    age: number;
    gender: string;
    dominantEmotion: string;
    dominantLabel: string;
    dominantScore: number;
    emotionLabels: Record<string, string>;
    aiPhrase: string;
  } | null>(null);

  // 텍스트 상수
  const TEXTS = {
    errorFileSize: "파일 크기는 10MB 이하로 선택해주세요.",
    successAnalysis: "분석이 완료되었습니다!",
    errorAnalysis: "분석 중 오류가 발생했습니다."
  };

  // face-api.js 모델 로딩
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
        setIsModelLoaded(true);
      } catch (error) {
        console.error('모델 로딩 실패:', error);
        // 개발 환경에서는 더미 데이터 사용
        console.log('더미 데이터 모드로 전환');
        setIsModelLoaded(true);
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

  const handleAnalyze = useCallback(async () => {
    if (!uploadedFile) return;
    if (!isModelLoaded) {
      alert('모델이 아직 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setIsAnalyzing(true);
    try {
      // face-api.js 분석 시작 (모델이 이미 로드됨)
      const faceapi = await import('face-api.js');

      console.log('TinyYolov2 모델을 사용한 얼굴 감지 시작...');

      // 이미지 URL을 fetch하여 blob으로 변환
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const img = await faceapi.bufferToImage(blob);

      // 얼굴 감지 및 분석
      const detections = await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      console.log(`얼굴 감지 완료: ${detections.length}개 얼굴 발견`);

      if (detections.length === 0) {
        throw new Error('얼굴을 감지할 수 없습니다');
      }

      const detection = detections[0];
      const emotions = detection.expressions;
      const age = Math.round(detection.age);
      const gender = detection.gender;

      console.log('감정 분석 결과:', emotions);
      console.log('추가 정보:', { age, gender });

      // 결과를 사용자에게 표시
      const dominantEmotion = Object.entries(emotions).reduce((a, b) =>
        emotions[a[0] as keyof typeof emotions] > emotions[b[0] as keyof typeof emotions] ? a : b
      )[0] as keyof typeof emotions;

      const emotionLabels = {
        happy: "행복",
        sad: "슬픔",
        angry: "화남",
        fearful: "두려움",
        surprised: "놀람",
        disgusted: "혐오",
        neutral: "중립"
      };

      const dominantScore = emotions[dominantEmotion] as number;
      const dominantLabel = emotionLabels[dominantEmotion as keyof typeof emotionLabels] || dominantEmotion;

      // AI 문구 생성 (더미 데이터)
      const aiPhrases = [
        "오늘은 정말 좋은 하루네요! ✨",
        "약간 피곤해 보이시는데, 푹 쉬세요! 😴",
        "밝은 미소가 정말 예쁘네요! 😊",
        "오늘 하루도 화이팅! 💪",
        "평온한 표정이 좋아요! 🧘‍♀️",
        "에너지가 넘치는 하루네요! ⚡",
        "차분하고 안정적인 기분이 느껴져요! 🌸",
        "오늘도 수고하셨어요! 👏"
      ];

      const aiPhrase = aiPhrases[Math.floor(Math.random() * aiPhrases.length)];

      // 분석 결과 저장
      const result = {
        emotions,
        age,
        gender,
        dominantEmotion,
        dominantLabel,
        dominantScore,
        emotionLabels,
        aiPhrase
      };

      setAnalysisResult(result);

    } catch (error) {
      console.error('분석 오류:', error);
      alert(`분석 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setIsAnalyzing(false);
    }
  }, [uploadedFile, fileUrl, isModelLoaded]);

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
          isModelLoaded={isModelLoaded}
          analysisResult={analysisResult}
        />
      )}
    </>
  );
}
