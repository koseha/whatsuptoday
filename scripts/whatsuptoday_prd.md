# PRD: whatsuptoday

## 1. Objective

사용자가 매일 간단히 사진/동영상을 업로드하고, 그 안의 한 장면을 기반으로 얼굴/기분을 분석하여 유머러스한 문구로 표현하는 **“오늘의 기분 스냅샷” 서비스**를 제공한다.

- **User Value**: 단순 기록을 넘어 재미있고 가볍게 감정 상태를 공유할 수 있는 경험 제공.
- **Business Value**: SNS 확산성 높은 콘텐츠(짧고 유머러스한 이미지)를 통해 자연스러운 바이럴 성장 가능.

## 2. Target Customer

- **Primary Persona**:
  - Z세대 ~ 밀레니얼: 매일 SNS에 짧고 위트 있는 콘텐츠를 올리며 자기표현을 즐기는 사용자.
- **Secondary Persona**:
  - 커뮤니티형 사용자: 친구, 동료와 가볍게 공유하고 반응을 확인하는 데 즐거움을 느끼는 사용자.

## 3. Strategic Fit

- **Company Vision Alignment**: "일상 속에서 가볍고 즐거운 자기표현 도구 제공"
- **Fit**: 초경량 서비스로 MVP를 빠르게 검증 → 사용자 반응 기반으로 기능 확장 (ex. 감정 히스토리 저장, 친구 피드)
- **Leverage**: 최신 AI 모델(GPT-5-nano, face-api.js)을 **서버리스 스택**(Cloudflare Pages)에서 활용 → 운영비 최소화 + 빠른 실험 가능.

## 4. What We Believe (Hypotheses)

- 사람들은 **사진/영상에 담긴 자신의 표정**을 유머러스하게 해석해주는 경험을 좋아한다.
- 하루에 1장면만 고르는 **“간결한 UX”**가 오히려 진입장벽을 낮추고, 일상적 사용을 촉진한다.
- 재미있게 만들어진 결과물은 **SNS에서 공유**될 확률이 높아 서비스 확산성을 강화한다.

## 5. Solution Constraints & Principles

- **Constraints**
  - 클라이언트 사이드 위주 처리 (face-api.js는 브라우저에서 동작).
  - 모델 호출은 경량(GPT-5-nano API) 기반으로 비용 최소화.
  - 배포 및 운영은 Cloudflare Pages 환경에서 가능한 구조로 제한.
- **Principles**
  - Simple & Fun: UX는 무조건 가볍고 단순해야 한다.
  - Shareability First: 결과물은 SNS 공유하기 쉽게 제공.
  - Privacy by Design: 사진/영상은 서버 저장 없이 클라이언트에서 처리.

## 6. Success Metrics

- **Leading Indicators**
  - DAU (Daily Active Users)
  - 사진/영상 업로드 건수
  - SNS 공유 버튼 클릭률
- **Lagging Indicators**
  - SNS 유입 사용자 비율
  - Retention (7-day, 30-day)
  - 평균 세션 길이 (재미 요소 측정 지표)

## 7. High-Level Solution / User Journey

1. 사진/영상 업로드
2. 한 장면(프레임) 선택
3. 얼굴/기분 분석 (face-api.js)
4. GPT-5-nano가 **위트 있는 문구** 생성
5. 결과 화면 표시 → 캡처 & SNS 공유

## 8. Requirements (Functional + Non-functional)

- **Must-have**
  - 사진/동영상 업로드 및 프레임 선택
  - 얼굴/기분 분석 결과 도출
  - GPT 기반 문구 생성
  - 결과 화면 표시 및 캡처/공유 기능
- **Nice-to-have**
  - 다양한 문구 톤 옵션(위트, 시니컬, 따뜻함 등)
  - 결과 저장 및 갤러리 뷰
  - 다인 얼굴 분석(친구들과 함께)

## 9. Dependencies & Open Questions

- Dependencies:
  - GPT-5-nano API 성능 및 Latency
  - face-api.js 브라우저 성능 (모바일 최적화 필요)
- Open Questions:
  - 초기에는 무료 제공? or SNS 공유 시 워터마크 삽입으로 브랜드 노출?
  - 사진/영상 데이터는 절대 서버에 저장 안 하는 구조로 갈지?

## 10. Timeline & Milestones

- Week 1–2: Prototype (사진 업로드 → 프레임 선택 → 분석 + 문구 생성)
- Week 3: UX/UI 간소화 + 캡처/공유 기능
- Week 4: Closed Beta (초대형 테스트)
- Week 5–6: Public Launch

## 11. Risks & Mitigations

- **Risk**: 얼굴 인식 정확도가 낮아 사용자 불만 발생 → **Mitigation**: “재시도/다른 장면 선택” UX 제공.
- **Risk**: GPT 문구가 부적절하거나 재미 없을 수 있음 → **Mitigation**: 톤별 프롬프트 사전 설계.
- **Risk**: SNS 공유율 낮음 → **Mitigation**: 자동 워터마크/해시태그 삽입으로 바이럴 유도.
