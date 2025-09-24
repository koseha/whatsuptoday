"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import BasicContainer from "../../ui/BasicContainer";

type AnalysisState = 'analyzing' | 'analyzed' | 'generating' | 'completed';

interface ImageUploadProps {
  fileUrl: string;
  onReset: () => void;
  modelsLoaded: boolean;
}

export default function ImageUpload({
  fileUrl,
  onReset,
  modelsLoaded
}: ImageUploadProps) {
  const [analysisState, setAnalysisState] = useState<AnalysisState>('analyzing');
  const [analysisResult, setAnalysisResult] = useState<{
    dominantEmotion: string;
    dominantLabel: string;
    dominantScore: number;
    age: number;
    gender: string;
    emotions: Record<string, number>;
  } | null>(null);
  const [generatedPhrase, setGeneratedPhrase] = useState<string>('');
  const [showTextAnimation, setShowTextAnimation] = useState<boolean>(false);

  // 텍스트 상수
  const TEXTS = {
    analyze: "오늘의 기분",
    changePhoto: "다른 사진으로 변경",
    errorFileSize: "파일 크기는 10MB 이하로 선택해주세요.",
  };

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
    const performAnalysis = async () => {
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


  const handleGeneratePhrase = useCallback(async () => {
    if (!analysisResult) return;

    setAnalysisState('generating');

    try {
      // GPT API 요청 시뮬레이션 (실제로는 API 호출)
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기

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
      setGeneratedPhrase(aiPhrase);
      setAnalysisState('completed');

    } catch (error) {
      console.error('문구 생성 오류:', error);
      alert('문구 생성 중 오류가 발생했습니다.');
      setAnalysisState('analyzed');
    }
  }, [analysisResult]);

  return (
    <BasicContainer>
      <div className="space-y-4">
        <div className="relative w-full max-w-md mx-auto">
          {/* 이미지 컨테이너 - 정사각형 비율로 고정 */}
          <div className="relative w-full aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <Image
              src={fileUrl}
              alt="업로드된 이미지"
              fill
              className="object-cover"
              style={{ objectPosition: 'center' }}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>

        {/* 상태별 UI 렌더링 */}

        {analysisState === 'analyzing' && (
          <div className="space-y-2">
            <button
              onClick={handleGeneratePhrase}
              disabled={true}
              className="w-full px-6 py-3 rounded-lg font-bold transition-all text-white cursor-pointer relative overflow-hidden button-fill-animation"
              style={{
                background: 'white',
                border: '0.5px solid hsl(245,70%,59%)',
                color: 'hsl(245,70%,59%)'
              }}
            >
              <div className={`flex items-center justify-center gap-2 ${showTextAnimation ? 'text-fade-out-up' : ''}`}>
                <Sparkles className="w-4 h-4" />
                사진 선택하는 중...
              </div>
            </button>
            <button
              onClick={onReset}
              className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
            >
              {TEXTS.changePhoto}
            </button>
          </div>
        )}

        {analysisState === 'analyzed' && analysisResult && (
          <div className="space-y-2">
            <button
              onClick={handleGeneratePhrase}
              className="w-full px-6 py-3 rounded-lg font-bold transition-all text-white cursor-pointer relative overflow-hidden bg-gradient-to-r from-[hsl(245,70%,59%)] to-[hsl(245,70%,70%)] hover:shadow-lg hover:shadow-primary/25 shimmer-effect"
              style={{
                border: '0.5px solid hsl(245,70%,59%)'
              }}
            >
              <div className={`flex items-center justify-center gap-2 ${showTextAnimation ? 'text-fade-in-up' : ''}`}>
                <Sparkles className="w-4 h-4" />
                오늘의 기분 분석하기
              </div>
            </button>
            <button
              onClick={onReset}
              className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
            >
              {TEXTS.changePhoto}
            </button>
          </div>
        )}

        {analysisState === 'generating' && (
          <div className="space-y-2">
            <p className="text-center text-muted-foreground">AI가 문구를 작성하고 있습니다...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '80%' }}></div>
            </div>
            <button
              onClick={onReset}
              className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
            >
              {TEXTS.changePhoto}
            </button>
          </div>
        )}

        {analysisState === 'completed' && generatedPhrase && (
          <div className="space-y-2">
            <p className="text-center text-green-600 font-medium">문구 생성 완료!</p>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <p className="text-center text-lg font-medium text-gray-800">
                {generatedPhrase}
              </p>
            </div>
            <button
              style={{
                background: 'white',
                border: '0.5px solid hsl(245,70%,59%)',
                color: 'hsl(245,70%,59%)'
              }}
              onClick={handleGeneratePhrase}
              className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
            >
              다른 문구 생성하기
            </button>
            <button
              onClick={onReset}
              className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
            >
              {TEXTS.changePhoto}
            </button>
          </div>
        )}


      </div>
    </BasicContainer>
  );
}
