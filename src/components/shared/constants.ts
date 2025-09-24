// 공통 상수 정의
export const FILE_SIZE_LIMIT = 100 * 1024 * 1024; // 100MB

export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/webm'];

export const TEXTS = {
  // 에러 메시지
  errorFileSize: "파일 크기는 100MB 이하로 선택해주세요.",
  successAnalysis: "분석이 완료되었습니다!",
  errorAnalysis: "분석 중 오류가 발생했습니다.",

  // 업로드 관련
  uploadTitle: "사진을 선택하세요",
  uploadDescription: "파일을 드래그하거나 클릭해서 업로드",
  selectFile: "파일 선택",

  // 지원 형식
  supportedFormats: "지원 형식",
  imageFormats: "JPG, PNG, WEBP",
  videoFormats: "MP4, WebM",

  // 비디오 관련
  selectFrame: "분석할 장면을 선택하세요",
  reselect: "다시 선택",
  analyze: "기분 분석하기",
  analyzing: "분석 중...",

  // 개인정보 보호
  privacyNotice: "선택한 사진은 저장되지 않습니다!",

  // AI 분석
  aiAnalysis: "AI 기분 분석",
  aiDescription: "표정과 분위기를 재미있게 해석"
} as const;
