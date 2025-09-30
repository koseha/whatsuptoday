"use client";

import { Camera, HardDrive } from "lucide-react";
import BasicContainer from "@/components/ui/BasicContainer";
import { useTranslations } from 'next-intl';

export default function SupportedFormats() {
  const t = useTranslations();

  return (
    <BasicContainer>
      <h4 className="font-bold text-sm mb-3 text-center">{t('upload.supportedFormats')}</h4>
      <div className="flex justify-center space-x-6 text-xs">
        <div className="flex items-center text-muted">
          <Camera className="w-4 h-4 mr-1" />
          JPG, PNG, WebP
        </div>
        <div className="flex items-center text-muted">
          <HardDrive className="w-4 h-4 mr-1" />
          최대 10MB
        </div>
      </div>
    </BasicContainer>
  );
}
