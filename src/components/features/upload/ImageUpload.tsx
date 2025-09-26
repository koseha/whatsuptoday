"use client";

import { Sparkles, Search, FileText, PenTool } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import BasicContainer from "../../ui/BasicContainer";

type AnalysisState = 'analyzing' | 'analyzed' | 'generating' | 'completed';

interface ImageUploadProps {
  fileUrl: string;
  onReset: () => void;
  modelsLoaded: boolean;
}

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const generatePhrase = async (expressions: Record<string, number>) => {
  try {
    const { data, error } = await supabase.functions.invoke('generate', {
      body: { expressions }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Supabase function error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('generatePhrase error:', error);
    throw error;
  }
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
  const [generatingPhase, setGeneratingPhase] = useState<'search' | 'writing'>('search');

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
    setGeneratingPhase('search');

    try {
      // 3초 후 글쓰기 애니메이션으로 전환
      setTimeout(() => {
        setGeneratingPhase('writing');
      }, 3000);

      // 실제 generatePhrase 함수 호출
      const result = await generatePhrase(analysisResult.emotions);

      // API 응답에서 문구 추출 (Edge Function이 { text: "문구" } 형태로 응답)
      const aiPhrase = result.text || result.phrase || result.message || "분석 결과를 생성했습니다.";
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
          <div className="space-y-6">
            {/* AI 로딩 애니메이션 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* 검색 단계 (0-3초) */}
                {generatingPhase === 'search' && (
                  <div className="animate-fade-in-out">
                    <div className="relative">
                      <Search className="w-12 h-12 text-primary animate-magnify-search" strokeWidth={1.5} />

                      {/* 팡팡 터지는 효과들 */}
                      {/* 반짝이는 별들 */}
                      <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-sparkle-1" />
                      <div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-sparkle-2" />
                      <div className="absolute -bottom-1 -left-3 w-1 h-1 bg-pink-400 rounded-full animate-sparkle-3" />
                      <div className="absolute -bottom-2 -right-2 w-1.5 h-1.5 bg-green-400 rounded-full animate-sparkle-1" />

                      {/* 떠오르는 버블들 */}
                      <div className="absolute -left-4 top-2 w-2 h-2 bg-blue-300/60 rounded-full animate-bubble-1" />
                      <div className="absolute -right-4 top-4 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-bubble-2" />
                      <div className="absolute -left-2 -bottom-2 w-1 h-1 bg-cyan-300/60 rounded-full animate-bubble-3" />
                      <div className="absolute -right-2 -bottom-1 w-1.5 h-1.5 bg-orange-300/60 rounded-full animate-bubble-1" />

                      {/* 리플 효과 */}
                      <div className="absolute inset-0 rounded-full animate-ripple" style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                      }} />
                    </div>
                  </div>
                )}

                {/* 글쓰기 단계 (3-6초) */}
                {generatingPhase === 'writing' && (
                  <div className="animate-fade-in-out">
                    <div className="relative">
                      {/* 문서 */}
                      <FileText
                        className="w-10 h-12 text-muted-foreground animate-paper-float absolute -left-3 top-0"
                        strokeWidth={1.5}
                      />
                      {/* 펜 */}
                      <PenTool className="w-6 h-6 text-primary animate-pen-write absolute right-0 top-3" strokeWidth={1.5} />

                      {/* 팡팡 터지는 효과들 */}
                      {/* 반짝이는 별들 */}
                      <div className="absolute -top-3 -left-1 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-sparkle-2" />
                      <div className="absolute -top-1 -right-4 w-2 h-2 bg-blue-400 rounded-full animate-sparkle-1" />
                      <div className="absolute -bottom-3 -left-4 w-1 h-1 bg-pink-400 rounded-full animate-sparkle-3" />
                      <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-sparkle-2" />
                      <div className="absolute top-1 -left-5 w-1 h-1 bg-purple-400 rounded-full animate-sparkle-1" />
                      <div className="absolute top-3 -right-5 w-1.5 h-1.5 bg-orange-400 rounded-full animate-sparkle-3" />

                      {/* 떠오르는 버블들 */}
                      <div className="absolute -left-6 top-1 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-bubble-2" />
                      <div className="absolute -right-6 top-3 w-1 h-1 bg-purple-300/60 rounded-full animate-bubble-3" />
                      <div className="absolute -left-4 -bottom-1 w-1.5 h-1.5 bg-cyan-300/60 rounded-full animate-bubble-1" />
                      <div className="absolute -right-4 -bottom-3 w-1 h-1 bg-orange-300/60 rounded-full animate-bubble-2" />
                      <div className="absolute -left-7 top-4 w-1.5 h-1.5 bg-pink-300/60 rounded-full animate-bubble-3" />
                      <div className="absolute -right-7 top-6 w-1 h-1 bg-green-300/60 rounded-full animate-bubble-1" />

                      {/* 글자 라인 효과 */}
                      <div className="absolute left-0 top-6 space-y-1">
                        <div className="w-6 h-0.5 bg-primary/60 animate-pulse" style={{ animationDelay: "0s" }} />
                        <div className="w-4 h-0.5 bg-primary/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
                        <div className="w-5 h-0.5 bg-primary/30 animate-pulse" style={{ animationDelay: "1s" }} />
                      </div>

                      {/* 리플 효과 */}
                      <div className="absolute inset-0 rounded-full animate-ripple" style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                      }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium text-foreground">
                  {generatingPhase === 'search' ? 'AI가 분석하고 있습니다' : 'AI가 결과를 작성하고 있습니다'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {generatingPhase === 'search' ? '요청을 분석하고 있습니다...' : '최적의 문구를 작성하고 있습니다...'}
                </p>
              </div>
            </div>
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
