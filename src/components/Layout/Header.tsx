"use client";

import AnimatedTitle from "../ui/AnimatedTitle";
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations();

  return (
    <header className="pt-10">
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <Link href="/" className="block group">
            <div className="relative">
              <Image
                src="/favicon.svg"
                alt="What's Up Today"
                width={56}
                height={56}
                className="w-14 h-14 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              />
              {/* Floating sparkles animation */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
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
