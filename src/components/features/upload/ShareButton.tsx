import { Share2 } from "lucide-react";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import ShareableResult from "./ShareableResult";

interface ShareButtonProps {
  generatedPhrase: string;
  analysisResult: {
    dominantEmotion: string;
    dominantLabel: string;
    dominantScore: number;
    age: number;
    gender: string;
    emotions: Record<string, number>;
  } | null;
  userImage?: string;
  onShareSuccess?: () => void;
}

export default function ShareButton({
  generatedPhrase,
  analysisResult,
  userImage,
  onShareSuccess
}: ShareButtonProps) {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // 이미지 다운로드 함수
  const downloadImage = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  // 스크린샷 생성 함수
  const generateScreenshot = async () => {
    if (!screenshotRef.current) throw new Error('스크린샷 요소를 찾을 수 없습니다.');

    console.log('스크린샷 생성 시작 - userImage:', userImage);
    console.log('스크린샷 요소:', screenshotRef.current);

    try {
      const dataUrl = await toPng(screenshotRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });

      console.log('스크린샷 생성 완료');
      return dataUrl;
    } catch (error) {
      console.error('스크린샷 생성 실패:', error);
      throw error;
    }
  };

  // 공유 함수
  const handleShare = async () => {
    if (!analysisResult) return;

    setIsGenerating(true);

    try {
      // 1. 스크린샷 생성
      const screenshot = await generateScreenshot();

      setTimeout(() => { console.log('공유 준비 완료'); }, 4000);

      // 2. Web Share API로 공유
      if (navigator.share) {
        const blob = await fetch(screenshot).then(r => r.blob());
        const file = new File([blob], 'whatsuptoday-result.png', { type: 'image/png' });

        const shareData = {
          title: '오늘의 기분 분석 결과',
          text: 'WhatUpToday로 오늘의 기분을 분석해보세요!',
          files: [file]
        };

        // 파일 공유 지원 여부 확인
        if (navigator.canShare && navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData);
            onShareSuccess?.();
          } catch (shareError) {
            // 사용자가 취소한 경우는 정상적인 동작
            if (shareError instanceof Error && shareError.name === 'AbortError') {
              return;
            }
            // 실제 오류인 경우만 알림
            const errorMessage = shareError instanceof Error ? shareError.message : '알 수 없는 오류';
            alert(`공유 실패: ${errorMessage}`);
          }
        } else {
          // 파일 공유 불가 시 다운로드로 폴백
          downloadImage(screenshot, 'whatsuptoday-result.png');
          alert('이미지가 다운로드되었습니다!');
          onShareSuccess?.();
        }
      } else {
        // Web Share API 미지원 시 다운로드로 폴백
        downloadImage(screenshot, 'whatsuptoday-result.png');
        alert('이미지가 다운로드되었습니다!');
        onShareSuccess?.();
      }

    } catch (error) {
      console.error('공유 실패:', error);
      alert('공유 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* 숨겨진 스크린샷 컴포넌트 */}
      <div className="fixed -top-[9999px] -left-[9999px] pointer-events-none">
        <ShareableResult
          ref={screenshotRef}
          generatedPhrase={generatedPhrase}
          analysisResult={analysisResult}
          userImage={userImage}
        />
      </div>

      {/* 공유 버튼 */}
      <button
        onClick={handleShare}
        disabled={isGenerating}
        className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            생성 중...
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            공유하기
          </>
        )}
      </button>
    </>
  );
}
