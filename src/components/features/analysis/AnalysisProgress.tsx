"use client";

import { Loader2, Brain, Eye } from "lucide-react";

interface AnalysisProgressProps {
  state: 'detecting' | 'analyzing';
  message: string;
  isModelLoading?: boolean;
}

export default function AnalysisProgress({ state, message, isModelLoading = false }: AnalysisProgressProps) {
  const isDetecting = state === 'detecting';

  return (
    <div className="text-center space-y-6">
      {/* 로딩 아이콘 */}
      <div className="relative">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          {isDetecting ? (
            <Eye className="w-8 h-8 text-white animate-pulse" />
          ) : (
            <Brain className="w-8 h-8 text-white animate-pulse" />
          )}
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"></div>
      </div>

      {/* 진행 메시지 */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">
          {isDetecting ? "얼굴 감지 중" : "AI 분석 중"}
        </h3>
        <p className="text-sm text-gray-600">{message}</p>
        {isModelLoading && (
          <p className="text-xs text-primary">
            TinyYolov2 모델 로딩 중...
          </p>
        )}
      </div>

      {/* 진행 바 */}
      <div className="w-full max-w-xs mx-auto">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ${isDetecting ? 'w-1/2' : 'w-full'
              }`}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{isDetecting ? "얼굴 감지" : "AI 분석"}</span>
          <span>{isDetecting ? "50%" : "100%"}</span>
        </div>
      </div>

      {/* 로딩 스피너 */}
      <div className="flex justify-center">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    </div>
  );
}
