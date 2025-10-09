# 📢 애드센스 광고 가이드

## ✅ 현재 설정 상태

### 1️⃣ 기본 설정 완료
- ✅ 애드센스 스크립트 초기화 (`/src/app/layout.tsx`)
- ✅ 공통 광고 컴포넌트 생성 (`/src/components/shared/AdSense.tsx`)
- ✅ 모든 페이지 하단에 광고 자동 표시 (`/src/app/[locale]/layout.tsx`)

### 2️⃣ 애드센스 계정 정보
- **Publisher ID**: `ca-pub-1510173979053173`
- **광고 슬롯**: Google AdSense 대시보드에서 생성 필요

---

## 🚀 다음 단계: 광고 슬롯 설정

### Step 1: Google AdSense에서 광고 단위 생성

1. [Google AdSense 대시보드](https://www.google.com/adsense/) 접속
2. 좌측 메뉴 → **광고** → **광고 단위 기준**
3. **디스플레이 광고** 선택
4. 광고 설정:
   - **이름**: "Footer Ad" (또는 원하는 이름)
   - **크기**: **반응형** 선택 (권장)
5. **만들기** 클릭
6. 생성된 코드에서 **`data-ad-slot`** 값 복사
   - 예: `data-ad-slot="1234567890"`

### Step 2: 광고 슬롯 ID 적용

`/src/app/[locale]/layout.tsx` 파일에서:

```tsx
<AdSense 
  adSlot="YOUR_AD_SLOT_ID"  // ← 여기를 복사한 ID로 변경
  adFormat="auto"
  fullWidthResponsive={true}
/>
```

**변경 예시**:
```tsx
<AdSense 
  adSlot="1234567890"  // ← 실제 슬롯 ID
  adFormat="auto"
  fullWidthResponsive={true}
/>
```

---

## 📍 광고 추가 방법

### 방법 1: 특정 페이지에만 광고 추가

예시: FAQ 페이지 중간에 광고 삽입

#### 파일: `/src/app/[locale]/faq/page.tsx`

```tsx
import AdSense from '@/components/shared/AdSense';

export default function FAQPage() {
  return (
    <div>
      <h1>FAQ</h1>
      
      {/* 질문 1-5 */}
      <div>...</div>
      
      {/* 중간 광고 */}
      <AdSense 
        adSlot="YOUR_SECOND_AD_SLOT_ID"
        adFormat="auto"
      />
      
      {/* 질문 6-10 */}
      <div>...</div>
    </div>
  );
}
```

### 방법 2: 여러 위치에 다른 광고 삽입

메인 페이지에 2개의 광고 배치 예시:

#### 파일: `/src/app/[locale]/page.tsx`

```tsx
import AdSense from '@/components/shared/AdSense';

export default function HomePage() {
  return (
    <div>
      {/* 상단 배너 광고 */}
      <AdSense 
        adSlot="1111111111"
        adFormat="horizontal"
        style={{ marginBottom: '30px' }}
      />
      
      {/* 메인 콘텐츠 */}
      <div>카메라 섹션</div>
      <div>분석 결과</div>
      
      {/* 하단 광고 */}
      <AdSense 
        adSlot="2222222222"
        adFormat="auto"
        style={{ marginTop: '30px' }}
      />
    </div>
  );
}
```

---

## 🎨 광고 유형 (adFormat 옵션)

| 옵션 | 설명 | 사용 추천 위치 |
|------|------|----------------|
| `auto` | 자동 반응형 (권장) | 모든 위치 |
| `fluid` | 콘텐츠에 맞춰 변형 | 본문 중간 |
| `rectangle` | 정사각형 | 사이드바 |
| `horizontal` | 가로형 배너 | 상단/하단 |
| `vertical` | 세로형 | 사이드바 |

---

## 📋 AdSense 컴포넌트 Props

```tsx
<AdSense 
  adSlot="필수: 광고 슬롯 ID"
  adFormat="선택: 광고 형식 (기본값: auto)"
  fullWidthResponsive={true/false}  // 반응형 여부 (기본값: true)
  style={{ 커스텀 스타일 }}
/>
```

---

## 🗺️ 권장 광고 배치 전략

### 현재 상태 (간단 시작)
```
모든 페이지
└── Footer 위에 1개 광고 (자동 표시)
```

### 단계별 확장

#### Phase 1: 트래픽 많은 페이지 우선
```
[locale]/page.tsx (메인)
├── 분석 결과 하단: 광고 1개
└── Layout 공통 광고: 1개
```

#### Phase 2: 콘텐츠 페이지 추가
```
[locale]/faq/page.tsx
├── 질문 5번과 6번 사이: 광고 1개
└── Layout 공통 광고: 1개
```

#### Phase 3: 최적화
```
[locale]/about/page.tsx
[locale]/project/page.tsx
└── 각 페이지 콘텐츠 중간/하단
```

---

## ⚠️ 주의사항

### 1. 광고 밀도
- **페이지당 최대 3개** 권장
- 너무 많으면 사용자 경험 저하 및 AdSense 정책 위반 가능

### 2. 광고 위치
- ❌ **Contact 페이지**: 양식 방해
- ❌ **법적 문서** (Privacy Policy, Terms): 전문성 저하
- ✅ **콘텐츠 페이지**: 자연스러운 배치

### 3. 테스트
- 로컬 개발 환경에서는 광고가 표시되지 않을 수 있음
- 실제 배포 후 확인 필요

### 4. AdSense 승인
- 광고가 표시되려면 AdSense 계정이 승인되어야 함
- 승인 전까지는 빈 공간으로 표시됨

---

## 🔍 트러블슈팅

### 광고가 표시되지 않을 때

1. **AdSense 승인 확인**
   - AdSense 대시보드에서 계정 상태 확인

2. **광고 슬롯 ID 확인**
   - `YOUR_AD_SLOT_ID`를 실제 ID로 변경했는지 확인

3. **브라우저 콘솔 확인**
   - F12 → Console 탭에서 에러 메시지 확인

4. **광고 차단 확인**
   - 브라우저 광고 차단 확장 프로그램 비활성화

---

## 📞 추가 도움말

- [Google AdSense 고객센터](https://support.google.com/adsense)
- [AdSense 정책](https://support.google.com/adsense/answer/48182)
- [광고 게재 최적화 가이드](https://support.google.com/adsense/answer/9274019)

---

## 🎯 빠른 체크리스트

- [x] 애드센스 스크립트 추가 (`app/layout.tsx`)
- [x] AdSense 컴포넌트 생성
- [x] 공통 광고 배치 (`[locale]/layout.tsx`)
- [ ] Google AdSense에서 광고 단위 생성
- [ ] 광고 슬롯 ID 입력
- [ ] 배포 후 광고 표시 확인
- [ ] 추가 광고 위치 최적화

