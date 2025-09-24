"use client";

import { useState, useCallback, useEffect } from "react";
import { Sparkles, AlertCircle } from "lucide-react";
import AnalysisResult from "./AnalysisResult";
import AnalysisProgress from "./AnalysisProgress";

export type AnalysisState =
  | 'idle'           // 대기 중
  | 'detecting'      // 얼굴 감지 중
  | 'analyzing'      // AI 분석 중
  | 'completed'      // 완료
  | 'error';         // 오류

export interface AnalysisResultData {
  emotions: {
    happy: number;
    sad: number;
    angry: number;
    fearful: number;
    surprised: number;
    disgusted: number;
  };
  age: number;
  gender: string;
  aiPhrase: string;
}

interface AnalysisStatesProps {
  imageUrl: string;
  onReset: () => void;
}

const TEXTS = {
  detecting: "얼굴을 감지하고 있어요...",
  analyzing: "AI가 기분을 분석하고 있어요...",
  error: "분석 중 오류가 발생했어요. 다시 시도해주세요.",
  retry: "다시 분석하기",
  newPhoto: "새로운 사진으로"
};

const DUMMY_EMOTIONS = [
  { happy: 0.8, sad: 0.1, angry: 0.05, fearful: 0.02, surprised: 0.03, disgusted: 0.0 },
  { happy: 0.3, sad: 0.6, angry: 0.05, fearful: 0.03, surprised: 0.02, disgusted: 0.0 },
  { happy: 0.7, sad: 0.1, angry: 0.1, fearful: 0.05, surprised: 0.05, disgusted: 0.0 },
  { happy: 0.4, sad: 0.3, angry: 0.1, fearful: 0.1, surprised: 0.1, disgusted: 0.0 },
];

const DUMMY_PHRASES = [
  "오늘은 정말 좋은 하루네요! ✨",
  "약간 피곤해 보이시는데, 푹 쉬세요! 😴",
  "밝은 미소가 정말 예쁘네요! 😊",
  "오늘 하루도 화이팅! 💪",
  "평온한 표정이 좋아요! 🧘‍♀️",
  "에너지가 넘치는 하루네요! ⚡",
  "차분하고 안정적인 기분이 느껴져요! 🌸",
  "오늘도 수고하셨어요! 👏"
];

export default function AnalysisStates({ imageUrl, onReset }: AnalysisStatesProps) {
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [result, setResult] = useState<AnalysisResultData | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // face-api.js 모델 로딩
  useEffect(() => {
    const loadModels = async () => {
      try {
        // 동적 import로 클라이언트 사이드에서만 로드
        const faceapi = await import('face-api.js');

        // TensorFlow.js 백엔드 설정
        await faceapi.tf.setBackend('webgl');
        await faceapi.tf.ready();

        console.log('모델 로딩 시작...');

        // TinyYolov2 모델을 먼저 로드 (얼굴 감지용)
        console.log('TinyYolov2 모델 로딩 중...');
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        console.log('TinyYolov2 모델 로딩 완료');

        // 나머지 모델들 순차적으로 로딩 (병렬 로딩으로 인한 오류 방지)
        console.log('Face Landmark 모델 로딩 중...');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

        console.log('Face Recognition 모델 로딩 중...');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

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

  const handleAnalyze = useCallback(async () => {
    if (!imageUrl) return;

    setAnalysisState('detecting');

    try {
      // 실제 face-api.js 분석 (모델이 로드된 경우)
      if (isModelLoaded) {
        try {
          const faceapi = await import('face-api.js');

          // TensorFlow.js 백엔드 확인
          await faceapi.tf.setBackend('webgl');
          await faceapi.tf.ready();

          console.log('TinyYolov2 모델을 사용한 얼굴 감지 시작...');

          // 이미지 URL을 fetch하여 blob으로 변환
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const img = await faceapi.bufferToImage(blob);

          // TinyYolov2 모델로 얼굴 감지
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

          setAnalysisState('analyzing');

          // AI 문구 생성 시뮬레이션
          await new Promise(resolve => setTimeout(resolve, 2000));

          const aiPhrase = DUMMY_PHRASES[Math.floor(Math.random() * DUMMY_PHRASES.length)];

          setResult({
            emotions,
            age,
            gender,
            aiPhrase
          });
        } catch (error) {
          console.error('face-api.js 분석 실패:', error);
          // face-api.js 실패 시 더미 데이터 사용
          throw error;
        }
      } else {
        // 더미 데이터 사용
        setAnalysisState('analyzing');
        await new Promise(resolve => setTimeout(resolve, 2000));

        const randomEmotions = DUMMY_EMOTIONS[Math.floor(Math.random() * DUMMY_EMOTIONS.length)];
        const aiPhrase = DUMMY_PHRASES[Math.floor(Math.random() * DUMMY_PHRASES.length)];

        setResult({
          emotions: randomEmotions,
          age: Math.floor(Math.random() * 50) + 20,
          gender: Math.random() > 0.5 ? 'male' : 'female',
          aiPhrase
        });
      }

      setAnalysisState('completed');
    } catch (error) {
      console.error('분석 오류:', error);
      setAnalysisState('error');
    }
  }, [imageUrl, isModelLoaded]);

  const handleRetry = useCallback(() => {
    setAnalysisState('idle');
    setResult(null);
    handleAnalyze();
  }, [handleAnalyze]);

  if (analysisState === 'idle') {
    return (
      <div className="text-center">
        <button
          onClick={handleAnalyze}
          className="btn-primary w-full shimmer-effect"
          disabled={!isModelLoaded}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isModelLoaded ? "분석하기" : "모델 로딩 중..."}
        </button>
      </div>
    );
  }

  if (analysisState === 'detecting' || analysisState === 'analyzing') {
    return (
      <AnalysisProgress
        state={analysisState}
        message={analysisState === 'detecting' ? TEXTS.detecting : TEXTS.analyzing}
        isModelLoading={!isModelLoaded}
      />
    );
  }

  if (analysisState === 'error') {
    return (
      <div className="text-center space-y-4">
        <div className="text-red-500">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p>{TEXTS.error}</p>
        </div>
        <button
          onClick={handleRetry}
          className="btn-primary w-full"
        >
          {TEXTS.retry}
        </button>
        <button
          onClick={onReset}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          {TEXTS.newPhoto}
        </button>
      </div>
    );
  }

  if (analysisState === 'completed' && result) {
    return (
      <AnalysisResult
        result={result}
        onRetry={handleRetry}
        onNewPhoto={onReset}
      />
    );
  }

  return null;
}
