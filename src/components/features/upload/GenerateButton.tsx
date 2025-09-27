import { Sparkles } from "lucide-react";
import { useAppTranslations } from "@/hooks/useTranslations";

interface GenerateButtonProps {
  showTextAnimation: boolean;
  onGenerate: () => void;
  onReset: () => void;
  changePhotoText: string;
}

export default function GenerateButton({ 
  showTextAnimation, 
  onGenerate, 
  onReset, 
  changePhotoText 
}: GenerateButtonProps) {
  const t = useAppTranslations();
  return (
    <div className="space-y-2">
      <button
        onClick={onGenerate}
        className="w-full px-6 py-3 rounded-lg font-bold transition-all text-white cursor-pointer relative overflow-hidden bg-gradient-to-r from-[hsl(245,70%,59%)] to-[hsl(245,70%,70%)] hover:shadow-lg hover:shadow-primary/25 shimmer-effect"
        style={{
          border: '0.5px solid hsl(245,70%,59%)'
        }}
      >
        <div className={`flex items-center justify-center gap-2 ${showTextAnimation ? 'text-fade-in-up' : ''}`}>
          <Sparkles className="w-4 h-4" />
          {t.analysis.analyze()}
        </div>
      </button>
      <button
        onClick={onReset}
        className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
      >
        {changePhotoText}
      </button>
    </div>
  );
}
