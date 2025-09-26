import { useEffect, useState } from 'react';

export interface FaceAnalysisResult {
  dominantEmotion: string;
  dominantLabel: string;
  dominantScore: number;
  age: number;
  gender: string;
  emotions: Record<string, number>;
}

export type AnalysisState = 'analyzing' | 'analyzed' | 'analyzing';

export const useFaceAnalysis = (fileUrl: string, modelsLoaded: boolean) => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>('analyzing');
  const [analysisResult, setAnalysisResult] = useState<FaceAnalysisResult | null>(null);
  const [showTextAnimation, setShowTextAnimation] = useState<boolean>(false);

  // 모델이 로드되면 자동으로 분석 시작
  useEffect(() => {
    if (!modelsLoaded) return;

    const analyzeImage = async () => {
      const analysisStartTime = performance.now();
      console.log('🔍 얼굴 분석 시작...');

      const minimumWaitTime = 3000;

      try {
        // 분석 작업과 최소 대기 시간을 병렬로 실행
        const [analysisResult] = await Promise.all([
          performAnalysis(), // 실제 분석 함수
          new Promise(resolve => setTimeout(resolve, minimumWaitTime)) // 최소 대기
        ]);

        setAnalysisResult(analysisResult);

        // 텍스트 애니메이션 트리거
        setShowTextAnimation(true);

        // 애니메이션 후 상태 변경
        setTimeout(() => {
          setAnalysisState('analyzed');
        }, 400); // 애니메이션 시간과 동일

        const totalTime = performance.now() - analysisStartTime;
        console.log(`✅ 전체 소요 시간: ${totalTime.toFixed(2)}ms`);

      } catch (error) {
        // 에러 시에도 최소 시간은 보장됨 (Promise.all 특성)
        console.error(`❌ 분석 실패:`, error);
        alert(`분석 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
        setAnalysisState('analyzing');
      }
    };

    // 실제 분석 로직을 별도 함수로 분리
    const performAnalysis = async (): Promise<FaceAnalysisResult> => {
      const faceapi = await import('face-api.js');

      console.log('TinyYolov2 모델을 사용한 얼굴 감지 시작...');

      // 이미지 로드
      const imageLoadStartTime = performance.now();
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const img = await faceapi.bufferToImage(blob);
      const imageLoadTime = performance.now() - imageLoadStartTime;
      console.log(`📷 이미지 로드 시간: ${imageLoadTime.toFixed(2)}ms`);

      // 얼굴 감지 및 분석
      const detectionStartTime = performance.now();
      const detections = await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();
      const detectionTime = performance.now() - detectionStartTime;
      console.log(`🎯 얼굴 감지 시간: ${detectionTime.toFixed(2)}ms`);

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

      // 결과 처리
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

      return {
        dominantEmotion: dominantEmotion as string,
        dominantLabel,
        dominantScore,
        age,
        gender: gender as string,
        emotions: emotions as unknown as Record<string, number>
      };
    };

    analyzeImage();
  }, [fileUrl, modelsLoaded]);

  return {
    analysisState,
    analysisResult,
    showTextAnimation
  };
};
