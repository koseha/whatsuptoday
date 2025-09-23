import { useState, useRef } from "react";
import { Upload, Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { MoodAnalysis } from "@/pages/Index";

interface VideoUploadProps {
  onAnalysisComplete: (analysis: MoodAnalysis) => void;
}

// Mock analysis function - 실제로는 ML/LLM API 호출
const mockAnalyzeMood = async (videoFile: File, frameTime: number): Promise<{
  moodText: string;
  confidence: number;
}> => {
  // 재미있는 한국어 기분 분석 결과들
  const moodTexts = [
    "지옥.",
    "띄어쓰기없는장문의기분상태입니다진짜로심각해요",
    "ㅋㅋㅋㅋ 이게 뭐야 ㅋㅋㅋ",
    "오늘은 그냥... 그런 날이네요 🫠",
    "텐션 맥스!!! 근데 왜 얼굴은 그래요",
    "아... 월요일이구나...",
    "커피가 필요한 상태",
    "누군가 나를 구해줘",
    "인생은 아름다워... (진짜야?)",
    "오늘도 화이팅! (억지로)"
  ];

  // 랜덤 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

  return {
    moodText: moodTexts[Math.floor(Math.random() * moodTexts.length)],
    confidence: Math.floor(Math.random() * 30) + 70 // 70-99%
  };
};

export const VideoUpload = ({ onAnalysisComplete }: VideoUploadProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [selectedFrameTime, setSelectedFrameTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('video/')) {
      toast.error('동영상 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      toast.error('파일 크기는 100MB 이하로 선택해주세요.');
      return;
    }

    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setSelectedFrameTime(0);
    toast.success('동영상이 업로드되었습니다!');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
      setSelectedFrameTime(videoRef.current.duration / 2); // 중간 지점으로 설정
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setSelectedFrameTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleAnalyze = async () => {
    if (!videoFile) return;

    setIsAnalyzing(true);
    try {
      const result = await mockAnalyzeMood(videoFile, selectedFrameTime);

      const analysis: MoodAnalysis = {
        videoFile,
        selectedFrameTime,
        moodText: result.moodText,
        confidence: result.confidence,
        timestamp: new Date()
      };

      onAnalysisComplete(analysis);
      toast.success('분석이 완료되었습니다!');
    } catch (error) {
      toast.error('분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className= "space-y-8 animate-fade-in" >
    {/* 파일 업로드 영역 */ }
    < div className = "mood-card p-8" >
      {!videoFile ? (
        <div
            className= "mood-upload-zone p-12 text-center cursor-pointer"
            onDrop = { handleDrop }
  onDragOver = {(e) => e.preventDefault()}
onClick = {() => fileInputRef.current?.click()}
          >
  <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-foreground mb-2" >
      동영상을 업로드하세요
        </h3>
        < p className = "text-muted-foreground mb-4" >
          드래그 앤 드롭하거나 클릭하여 파일을 선택하세요
            </p>
            < p className = "text-sm text-muted-foreground" >
              최대 100MB, MP4 / MOV / AVI 형식 지원
                </p>
                < input
ref = { fileInputRef }
type = "file"
accept = "video/*"
className = "hidden"
onChange = {(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
  </div>
        ) : (
  <div className= "space-y-6" >
  {/* 동영상 플레이어 */ }
  < div className = "relative rounded-xl overflow-hidden bg-black" >
    <video
                ref={ videoRef }
src = { videoUrl }
className = "w-full max-h-96 object-contain"
onLoadedMetadata = { handleLoadedMetadata }
controls = { false}
  />
  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2" >
    <Clock className="w-4 h-4" />
      { formatTime(selectedFrameTime) } / { formatTime(videoDuration) }
      </div>
      </div>

{/* 프레임 선택 슬라이더 */ }
<div className="space-y-4" >
  <label className="block text-sm font-medium text-foreground" >
    분석할 장면을 선택하세요
      </label>
      < div className = "space-y-2" >
        <input
                  type="range"
min = { 0}
max = { videoDuration }
step = { 0.1}
value = { selectedFrameTime }
onChange = { handleTimeChange }
className = "w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer
[&:: -webkit - slider - thumb]: appearance - none[&:: -webkit - slider - thumb]: w - 5[&:: -webkit - slider - thumb]: h - 5
[&:: -webkit - slider - thumb]: bg - primary[&:: -webkit - slider - thumb]: rounded - full
[&:: -webkit - slider - thumb]: cursor - pointer[&:: -webkit - slider - thumb]: shadow - lg"
  />
  <div className="flex justify-between text-xs text-muted-foreground" >
    <span>0:00 </span>
      < span > { formatTime(videoDuration) } </span>
      </div>
      </div>
      </div>

{/* 컨트롤 버튼들 */ }
<div className="flex gap-4 justify-center pt-4" >
  <Button
                variant="outline"
onClick = {() => {
  setVideoFile(null);
  setVideoUrl('');
  URL.revokeObjectURL(videoUrl);
}}
className = "px-6"
  >
  다시 선택
    </Button>

    < button
onClick = { handleAnalyze }
disabled = { isAnalyzing }
className = {`mood-button-primary ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
  {
    isAnalyzing?(
                  <div className = "flex items-center gap-2" >
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
  분석 중...
</div>
                ) : (
  <div className= "flex items-center gap-2" >
  <Play className="w-4 h-4" />
    기분 분석하기
      </div>
                )}
</button>
  </div>
  </div>
        )}
</div>
  </div>
  );
};