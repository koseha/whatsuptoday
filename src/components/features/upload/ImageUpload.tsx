"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import BasicContainer from "../../ui/BasicContainer";

interface ImageUploadProps {
  fileUrl: string;
  onReset: () => void;
}

export default function ImageUpload({
  fileUrl,
  onReset
}: ImageUploadProps) {
  // 텍스트 상수
  const TEXTS = {
    analyze: "오늘의 기분",
    changePhoto: "다른 사진으로 변경",
    errorFileSize: "파일 크기는 10MB 이하로 선택해주세요.",
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
      } catch (error) {
        console.error('모델 로딩 실패:', error);
        // 개발 환경에서는 더미 데이터 사용
        console.log('더미 데이터 모드로 전환');
      }
    };

    loadModels();
  }, []);

  const handleAnalyze = useCallback(async () => {
    try {
      // face-api.js 분석 시작
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

      console.log('분석 완료:', { dominantEmotion, dominantLabel, dominantScore, aiPhrase });

    } catch (error) {
      console.error('분석 오류:', error);
      alert(`분석 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  }, [fileUrl]);

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

        <div className="space-y-2">
          {/* 분석 버튼 */}
          <button
            onClick={handleAnalyze}
            className="w-full px-6 py-3 rounded-lg font-bold transition-all text-white cursor-pointer relative overflow-hidden bg-gradient-to-r from-[hsl(245,70%,59%)] to-[hsl(245,70%,70%)] hover:shadow-lg hover:shadow-primary/25 shimmer-effect"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              {TEXTS.analyze}
            </div>
          </button>

          {/* 다른 사진으로 변경 버튼 */}
          <button
            onClick={onReset}
            className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
          >
            {TEXTS.changePhoto}
          </button>
        </div>

      </div>
    </BasicContainer>
  );
}
