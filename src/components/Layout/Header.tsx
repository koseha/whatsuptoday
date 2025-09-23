import { Upload, Camera, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="pt-10">
      <div className="text-center mb-8 animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-hero p-3 rounded-xl shadow-glow">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          WhatsUpToday
        </h1>
        <p className="text-muted font-normal text-sm leading-relaxed">
          오늘의 기분을 AI가 재미있게 분석해드려요<br />
          사진이나 동영상을 업로드해보세요
        </p>
      </div>
    </header>
  );
}
