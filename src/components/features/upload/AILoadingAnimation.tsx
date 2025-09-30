import { Search, FileText, PenTool } from "lucide-react";
import { useAppTranslations } from "@/hooks/useTranslations";
import Image from 'next/image';

interface AILoadingAnimationProps {
  phase: 'search' | 'writing';
}

export default function AILoadingAnimation({ phase }: AILoadingAnimationProps) {
  const t = useAppTranslations();
  return (
    <div className="space-y-6">
      {/* AI 로딩 애니메이션 */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* 중앙 파비콘 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/favicon.svg"
              alt="AI"
              width={40}
              height={40}
              className="w-10 h-10 opacity-20 animate-pulse"
            />
          </div>
          {/* 검색 단계 (0-3초) */}
          {phase === 'search' && (
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
          {phase === 'writing' && (
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
            {phase === 'search' ? t.ai.phases.analyzing() : t.ai.phases.creating()}
          </h3>
          <p className="text-muted-foreground text-sm">
            {phase === 'search' ? t.ai.phases.thinking() : t.ai.phases.finalizing()}
          </p>
        </div>
      </div>
    </div>
  );
}
