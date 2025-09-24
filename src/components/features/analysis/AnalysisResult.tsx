"use client";

import { Sparkles, RotateCcw, Camera, Heart } from "lucide-react";
import { AnalysisResultData } from "./AnalysisStates";

interface AnalysisResultProps {
  result: AnalysisResultData;
  onRetry: () => void;
  onNewPhoto: () => void;
}

// 아이콘 제거됨

const EMOTION_LABELS = {
  happy: "행복",
  sad: "슬픔",
  angry: "화남",
  fearful: "두려움",
  surprised: "놀람",
  disgusted: "혐오",
};

const EMOTION_COLORS = {
  happy: "text-green-600",
  sad: "text-blue-600",
  angry: "text-red-600",
  fearful: "text-purple-600",
  surprised: "text-yellow-600",
  disgusted: "text-gray-600",
};

export default function AnalysisResult({ result, onRetry, onNewPhoto }: AnalysisResultProps) {
  const { emotions, age, gender, aiPhrase } = result;

  // 가장 높은 감정 찾기
  const dominantEmotion = Object.entries(emotions).reduce((a, b) =>
    emotions[a[0] as keyof typeof emotions] > emotions[b[0] as keyof typeof emotions] ? a : b
  )[0] as keyof typeof emotions;

  const dominantScore = emotions[dominantEmotion];
  const dominantLabel = EMOTION_LABELS[dominantEmotion];
  const dominantColor = EMOTION_COLORS[dominantEmotion];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* AI 생성 문구 */}
      <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
        <div className="flex items-center justify-center mb-3">
          <Sparkles className="w-5 h-5 text-primary mr-2" />
          <span className="text-sm font-medium text-primary">AI 분석 결과</span>
        </div>
        <p className="text-lg font-medium text-gray-900 leading-relaxed">
          {aiPhrase}
        </p>
      </div>

      {/* 주요 감정 */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border">
          <div className={`p-3 rounded-full bg-gray-50 ${dominantColor}`}>
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-lg">😊</span>
            </div>
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-900">{dominantLabel}</div>
            <div className="text-sm text-gray-600">
              {Math.round(dominantScore * 100)}% 확률
            </div>
          </div>
        </div>
      </div>

      {/* 상세 감정 분석 */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 text-center">감정 분석</h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(emotions).map(([emotion, score]) => {
            const label = EMOTION_LABELS[emotion as keyof typeof EMOTION_LABELS] || emotion;
            const color = EMOTION_COLORS[emotion as keyof typeof EMOTION_COLORS] || "text-gray-600";

            return (
              <div key={emotion} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                <div className={`w-4 h-4 flex items-center justify-center ${color}`}>
                  <span className="text-xs">•</span>
                </div>
                <span className="text-sm text-gray-700 flex-1">{label}</span>
                <span className="text-xs text-gray-500">{Math.round(score * 100)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 추가 정보 */}
      <div className="flex justify-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Heart className="w-4 h-4" />
          <span>예상 나이: {age}세</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>성별: {gender === 'male' ? '남성' : '여성'}</span>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex space-x-3">
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>다시 분석</span>
        </button>
        <button
          onClick={onNewPhoto}
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Camera className="w-4 h-4" />
          <span>새로운 사진</span>
        </button>
      </div>
    </div>
  );
}
