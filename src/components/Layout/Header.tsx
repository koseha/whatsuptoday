"use client";

import { Camera } from "lucide-react";
import Link from "next/link";
import AnimatedTitle from "../ui/AnimatedTitle";
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations();

  return (
    <header className="pt-10">
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <Link href="/" className="block">
            <div className="bg-gradient-hero p-3 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 cursor-pointer">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </Link>
        </div>
        <AnimatedTitle />
        <p className="text-muted font-normal text-sm leading-relaxed">
          {t('header.description')} <span className="text-primary font-medium">{t('header.aiText')}</span>{t('header.descriptionEnd')}
        </p>
      </div>
    </header>
  );
}
