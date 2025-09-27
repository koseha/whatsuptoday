import { useEffect, useState } from 'react';

export interface FaceAnalysisResult {
  dominantEmotion: string;
  dominantLabel: string;
  dominantScore: number;
  age: number;
  gender: string;
  emotions: Record<string, number>;
}

export type AnalysisState = 'analyzing' | 'analyzed' | 'generating' | 'completed' | 'detection-failed';

export const useFaceAnalysis = (fileUrl: string, modelsLoaded: boolean) => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>('analyzing');
  const [analysisResult, setAnalysisResult] = useState<FaceAnalysisResult | null>(null);
  const [showTextAnimation, setShowTextAnimation] = useState<boolean>(false);

  // 모델이 로드되면 자동으로 분석 시작
  useEffect(() => {
    if (!modelsLoaded) return;

    const analyzeImage = async () => {
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


      } catch (error) {
        // 에러 시에도 최소 시간은 보장됨 (Promise.all 특성)
        console.error(`❌ 분석 실패:`, error);

        // 얼굴 감지 실패인지 확인
        if (error instanceof Error && error.message.includes('감지가 되지 않는군요')) {
          setAnalysisState('detection-failed');
        } else {
          alert(`분석 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
          setAnalysisState('analyzing');
        }
      }
    };

    // 실제 분석 로직을 별도 함수로 분리
    const performAnalysis = async (): Promise<FaceAnalysisResult> => {
      const faceapi = await import('face-api.js');

      // 이미지 로드
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const img = await faceapi.bufferToImage(blob);

      // 얼굴 감지 및 분석
      const detections = await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      if (detections.length === 0) {
        throw new Error('인간. 혹시 얼굴이 없습니까? 감지가 되지 않는군요.');
      }

      const detection = detections[0];
      const emotions = detection.expressions;
      const age = Math.round(detection.age);
      const gender = detection.gender;

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
    setAnalysisState,
    analysisResult,
    showTextAnimation
  };
};
