import { Share2 } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";
import ShareableResult from "./ShareableResult";
import { useAppTranslations } from "@/hooks/useTranslations";

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
  const t = useAppTranslations();

  // 이미지 다운로드 함수
  const downloadImage = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  // 스크린샷 생성 함수
  const generateScreenshot = useCallback(async () => {
    if (!screenshotRef.current) throw new Error('스크린샷 요소를 찾을 수 없습니다.');

    try {
      // 사파리에서 이미지 강제 로드 및 대체
      const images = screenshotRef.current.querySelectorAll('img');
      for (const img of images) {
        const htmlImg = img as HTMLImageElement;
        if (htmlImg.src) {
          // 새로운 이미지 요소로 교체
          const newImg = new Image();
          newImg.crossOrigin = 'anonymous';
          newImg.style.width = '100%';
          newImg.style.height = '100%';
          newImg.style.objectFit = 'cover';

          await new Promise((resolve) => {
            newImg.onload = () => {
              // 원본 이미지 교체
              htmlImg.src = newImg.src;
              resolve(true);
            };
            newImg.onerror = () => {
              console.log('이미지 로드 실패, 원본 유지');
              resolve(false);
            };
            newImg.src = htmlImg.src;
          });
        }
      }

      // 사파리에서 충분한 대기 시간
      await new Promise(resolve => setTimeout(resolve, 1000));

      const dataUrl = await toPng(screenshotRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      return dataUrl;
    } catch (error) {
      console.error('스크린샷 생성 실패:', error);
      throw error;
    }
  }, []);


  // 공유 함수
  const handleShare = async () => {
    if (!analysisResult) return;

    setIsGenerating(true);

    try {
      // 스크린샷 생성
      const screenshot = await generateScreenshot();

      // Web Share API로 공유
      if (navigator.share) {
        const blob = await fetch(screenshot).then(r => r.blob());
        const file = new File([blob], 'whatsuptoday-result.png', { type: 'image/png' });

        const shareData = {
          title: '오늘의 기분 분석 결과',
          text: 'WhatsUpToday • 오늘의 기분',
          url: 'https://whatsuptoday.pages.dev',
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
            {t.result.generating()}
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            {t.result.share()}
          </>
        )}
      </button>
    </>
  );
}
