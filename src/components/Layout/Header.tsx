import { Camera } from "lucide-react";
import AnimatedTitle from "../ui/AnimatedTitle";
import { useAppTranslations } from "@/hooks/useTranslations";

export default function Header() {
  const t = useAppTranslations();

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
          {t.header.description()} <span className="text-primary font-medium">{t.header.aiText()}</span>{t.header.descriptionEnd()}
        </p>
      </div>
    </header>
  );
}
