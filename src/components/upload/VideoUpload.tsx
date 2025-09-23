import { useRef } from "react";
import { Play, Clock, X } from "lucide-react";
import BasicContainer from "../layout/BasicContainer";

interface VideoUploadProps {
  fileUrl: string;
  selectedFrameTime: number;
  videoDuration: number;
  onReset: () => void;
  onAnalyze: () => void;
  onTimeChange: (time: number) => void;
  onLoadedMetadata: () => void;
  isAnalyzing: boolean;
}

export default function VideoUpload({
  fileUrl,
  selectedFrameTime,
  videoDuration,
  onReset,
  onAnalyze,
  onTimeChange,
  onLoadedMetadata,
  isAnalyzing
}: VideoUploadProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 텍스트 상수
  const TEXTS = {
    selectFrame: "분석할 장면을 선택하세요",
    reselect: "다시 선택",
    analyze: "기분 분석하기",
    analyzing: "분석 중..."
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    onTimeChange(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <BasicContainer>
      <div className="space-y-6">
        {/* 비디오 플레이어 */}
        <div className="relative rounded-xl overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={fileUrl}
            className="w-full max-h-96 object-contain"
            onLoadedMetadata={onLoadedMetadata}
            controls={false}
          />
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {formatTime(selectedFrameTime)} / {formatTime(videoDuration)}
          </div>
          <button
            onClick={onReset}
            className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 프레임 선택 슬라이더 */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">
            {TEXTS.selectFrame}
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={videoDuration}
              step={0.1}
              value={selectedFrameTime}
              onChange={handleTimeChange}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0:00</span>
              <span>{formatTime(videoDuration)}</span>
            </div>
          </div>
        </div>

        {/* 컨트롤 버튼들 */}
        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={onReset}
            className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            {TEXTS.reselect}
          </button>

          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${isAnalyzing
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
              }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {TEXTS.analyzing}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                {TEXTS.analyze}
              </div>
            )}
          </button>
        </div>
      </div>
    </BasicContainer>
  );
}
