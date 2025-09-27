import { useTranslations } from 'next-intl';

export const useAppTranslations = () => {
  const t = useTranslations();

  return {
    // 공통 텍스트
    common: {
      loading: () => t('common.loading'),
      error: () => t('common.error'),
      retry: () => t('common.retry'),
      close: () => t('common.close'),
      cancel: () => t('common.cancel'),
      confirm: () => t('common.confirm'),
    },

    // 헤더 관련
    header: {
      description: () => t('header.description'),
      aiText: () => t('header.aiText'),
      descriptionEnd: () => t('header.descriptionEnd'),
    },

    // 업로드 관련
    upload: {
      title: () => t('upload.title'),
      description: () => t('upload.description'),
      selectFile: () => t('upload.selectFile'),
      supportedFormats: () => t('upload.supportedFormats'),
      imageFormats: () => t('upload.imageFormats'),
      videoFormats: () => t('upload.videoFormats'),
      privacyNotice: () => t('upload.privacyNotice'),
      fileSizeError: () => t('upload.fileSizeError'),
      changePhoto: () => t('upload.changePhoto'),
      maxFileSize: () => t('upload.maxFileSize'),
    },

    // 분석 관련
    analysis: {
      analyzing: () => t('analysis.analyzing'),
      analyze: () => t('analysis.analyze'),
      analyzeTitle: () => t('analysis.analyzeTitle'),
      aiAnalysis: () => t('analysis.aiAnalysis'),
      aiDescription: () => t('analysis.aiDescription'),
      successAnalysis: () => t('analysis.successAnalysis'),
      errorAnalysis: () => t('analysis.errorAnalysis'),
      mainEmotion: () => t('analysis.mainEmotion'),
      emotions: {
        happy: () => t('analysis.emotions.happy'),
        sad: () => t('analysis.emotions.sad'),
        angry: () => t('analysis.emotions.angry'),
        fearful: () => t('analysis.emotions.fearful'),
        surprised: () => t('analysis.emotions.surprised'),
        disgusted: () => t('analysis.emotions.disgusted'),
        neutral: () => t('analysis.emotions.neutral'),
      },
      gender: {
        male: () => t('analysis.gender.male'),
        female: () => t('analysis.gender.female'),
      },
      ageSuffix: () => t('analysis.ageSuffix'),
    },

    // 감지 실패 관련
    detection: {
      failed: () => t('detection.failed'),
      failedDescription: () => t('detection.failedDescription'),
      tips: {
        title: () => t('detection.tips.title'),
        lighting: () => t('detection.tips.lighting'),
        center: () => t('detection.tips.center'),
        expression: () => t('detection.tips.expression'),
      },
    },

    // AI 관련
    ai: {
      generating: () => t('ai.generating'),
      phases: {
        analyzing: () => t('ai.phases.analyzing'),
        thinking: () => t('ai.phases.thinking'),
        creating: () => t('ai.phases.creating'),
        finalizing: () => t('ai.phases.finalizing'),
      },
    },

    // 결과 관련
    result: {
      regenerate: () => t('result.regenerate'),
      share: () => t('result.share'),
      download: () => t('result.download'),
      hashtag: () => t('result.hashtag'),
      generating: () => t('result.generating'),
    },
  };
};
