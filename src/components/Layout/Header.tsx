import { Camera } from "lucide-react";
import AnimatedTitle from "../ui/AnimatedTitle";

export default function Header() {

  return (
    <header className="pt-10">
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-hero p-3 rounded-xl shadow-glow">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>
        <AnimatedTitle />
        <p className="text-muted font-normal text-sm leading-relaxed">
          오늘의 기분을 <span className="text-primary font-medium">AI</span>가 재미있게 분석해드려요
        </p>
      </div>
    </header>
  );
}
