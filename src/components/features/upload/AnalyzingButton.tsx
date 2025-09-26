import { Sparkles } from "lucide-react";

interface AnalyzingButtonProps {
  showTextAnimation: boolean;
  onReset: () => void;
  changePhotoText: string;
}

export default function AnalyzingButton({
  showTextAnimation,
  onReset,
  changePhotoText
}: AnalyzingButtonProps) {
  return (
    <div className="space-y-2">
      <button
        disabled={true}
        className="w-full px-6 py-3 rounded-lg font-bold transition-all text-white cursor-pointer relative overflow-hidden button-fill-animation"
        style={{
          background: 'white',
          border: '0.5px solid hsl(245,70%,59%)',
          color: 'hsl(245,70%,59%)'
        }}
      >
        <div className={`flex items-center justify-center gap-2 ${showTextAnimation ? 'text-fade-out-up' : ''}`}>
          <Sparkles className="w-4 h-4" />
          사진 가져오는 중...
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
