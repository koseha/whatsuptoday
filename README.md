# What's Up Today

AI가 당신의 기분을 재미있게 분석해드려요.

## 🌟 주요 기능

- 🎭 **얼굴 감정 분석**: Face-API.js를 활용한 7가지 감정 분석
- 🤖 **AI 문구 생성**: Google Gemini API로 개인화된 재미있는 문구 생성
- 🌍 **다국어 지원**: 9개 언어 지원 (한국어, English, Español, 日本語, 中文, Tiếng Việt, Bahasa Indonesia, Italiano, ไทย)
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- 🔒 **개인정보 보호**: 클라이언트 사이드 분석, 서버 저장 없음
- 📤 **공유 기능**: 분석 결과를 이미지로 생성 및 공유

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 15 (Static Site Generation)
- **UI**: React 19, TypeScript, Tailwind CSS
- **i18n**: next-intl (9개 언어 지원)
- **State**: React Hooks, localStorage

### AI & Analysis
- **Face Detection**: Face-API.js, TensorFlow.js
- **AI Generation**: Google Gemini API (via Supabase Edge Functions)
- **Models**: TinyFaceDetector, FaceExpressionNet, AgeGenderNet

### Backend
- **Serverless**: Supabase Edge Functions
- **Analytics**: Google Analytics, Google AdSense

## 🌍 지원 언어

| 언어 | 코드 | 지원 범위 |
|------|------|-----------|
| 한국어 | `ko` | 완전 지원 |
| English | `en` | 완전 지원 |
| Español | `es` | 완전 지원 |
| 日本語 | `ja` | 완전 지원 |
| 中文 | `zh` | 완전 지원 |
| Tiếng Việt | `vi` | 완전 지원 |
| Bahasa Indonesia | `id` | 완전 지원 |
| Italiano | `it` | 완전 지원 |
| ไทย | `th` | 완전 지원 |

선택한 언어는 localStorage에 자동 저장되어 다음 방문 시에도 유지됩니다.

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── [locale]/          # 다국어 라우팅
│   │   ├── about/         # 소개 페이지
│   │   ├── contact/       # 연락처
│   │   ├── faq/           # FAQ
│   │   └── ...
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 루트 페이지 (언어 리다이렉트)
├── components/
│   ├── features/          # 기능별 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   └── ui/                # 공통 UI 컴포넌트
├── hooks/                 # 커스텀 훅
│   ├── useFaceAnalysis.ts
│   ├── useLanguage.ts
│   └── usePhraseGeneration.ts
├── i18n/                  # 다국어 설정
│   ├── routing.ts
│   └── request.ts
└── messages/              # 번역 파일
    ├── ko.json
    ├── en.json
    └── ...
```

## 🚀 개발

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🏗️ 빌드

```bash
npm run build
```

정적 사이트로 빌드되어 `out/` 디렉토리에 생성됩니다.

## 🌐 배포

정적 사이트로 빌드되어 Cloudflare Pages에 배포됩니다.

### 빌드 결과
- 67개 정적 페이지 (9개 언어 × 7개 페이지 + 루트)
- 완전한 SSG (Server-Side Generation)
- SEO 최적화

## 📝 라이센스

© 2025 koseha. All rights reserved.
