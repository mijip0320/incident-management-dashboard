# Frontend Plan - Incident Management Dashboard

## 1. 목적

React, Vite, TypeScript 기반으로 `Incident Management Dashboard`의 프론트엔드 화면을 먼저 구현한다.

초기 단계에서는 실제 백엔드 연결 없이 mock data 또는 MSW를 사용한다. 백엔드가 완성되면 API client 계층만 교체하여 실제 Express API와 연결할 수 있도록 구조를 잡는다.

## 2. 핵심 컨셉

이 프로젝트는 단순 CRUD 앱이 아니라, 여러 서비스의 장애 상태를 실시간으로 확인하고 대응하는 운영 대시보드이다.

주요 흐름은 다음과 같다.

```txt
Service A/B/C 상태 확인
→ 장애 발생 감지
→ Incident 생성
→ 담당자 지정
→ 상태 변경
→ Timeline 기록
→ 복구 확인
→ Postmortem 작성
```

## 3. 기술 스택

- React
- Vite
- TypeScript
- React Router
- TanStack Query
- Zustand 또는 Context API
- React Hook Form
- Zod
- Tailwind CSS
- shad/cn UI
- Recharts
- date-fns
- clsx
- MSW 또는 local mock data

## 4. 추천 폴더 구조

```txt
src/
├─ app/
│  ├─ router.tsx
│  ├─ providers.tsx
│  └─ queryClient.ts
├─ pages/
│  ├─ login/
│  ├─ dashboard/
│  ├─ incidents/
│  ├─ services/
│  ├─ postmortems/
│  └─ settings/
├─ features/
│  ├─ auth/
│  ├─ dashboard/
│  ├─ incidents/
│  ├─ services/
│  ├─ timeline/
│  ├─ postmortems/
│  └─ realtime/
├─ entities/
│  ├─ user/
│  ├─ team/
│  ├─ service/
│  ├─ incident/
│  └─ postmortem/
├─ shared/
│  ├─ api/
│  ├─ components/
│  ├─ constants/
│  ├─ hooks/
│  ├─ layouts/
│  ├─ lib/
│  ├─ mocks/
│  ├─ styles/
│  └─ types/
└─ main.tsx
```

## 5. 주요 화면

### 5.1 Login Page

목적: 데모 로그인 화면을 제공한다.

초기 구현에서는 실제 인증 없이 mock user를 생성하여 로그인된 상태로 이동한다.

필수 요소:

- 이메일 입력
- 비밀번호 입력
- 로그인 버튼
- Demo Login 버튼
- 에러 메시지 영역

### 5.2 Main Dashboard

목적: 현재 서비스 운영 상태와 장애 현황을 한눈에 보여준다.

필수 요소:

- Open Incidents 카드
- Critical Incidents 카드
- Average MTTA 카드
- Average MTTR 카드
- Service Health Status 카드 목록
- Incidents by Severity 차트
- Incidents by Service 차트
- Recent Incident Timeline
- Active Incidents 리스트

### 5.3 Service Status Page

목적: Service A/B/C의 현재 상태를 보여준다.

필수 요소:

- 서비스 목록 테이블
- 서비스명
- 상태: Operational, Degraded, Down
- 최근 health check 시간
- 평균 응답 시간
- 실패 횟수
- 관련 인시던트 수
- 상세 보기 버튼

### 5.4 Incident List Page

목적: 인시던트 목록을 검색, 필터, 정렬할 수 있다.

필수 요소:

- 검색 입력
- 상태 필터
- 심각도 필터
- 서비스 필터
- 담당자 필터
- 생성일 정렬
- Incident 카드 또는 테이블
- Create Incident 버튼

### 5.5 Incident Detail Page

목적: 단일 인시던트의 상세 정보와 대응 흐름을 보여준다.

필수 요소:

- 제목
- 심각도
- 상태
- 연결 서비스
- 담당자
- 생성자
- 생성 시간
- Acknowledged 시간
- Resolved 시간
- 상태 변경 버튼
- 담당자 변경
- Timeline
- Comment / Update 작성
- Postmortem 작성 버튼

### 5.6 Create Incident Page 또는 Modal

목적: 사용자가 수동으로 인시던트를 생성할 수 있다.

필수 요소:

- 제목
- 설명
- 서비스 선택
- 심각도 선택
- 담당자 선택
- 생성 버튼
- 폼 검증

### 5.7 Postmortem Page

목적: 해결된 인시던트에 대해 사후 분석 문서를 작성한다.

필수 요소:

- 관련 Incident 정보
- Summary
- Root Cause
- Impact
- Resolution
- Action Items
- 저장 버튼

### 5.8 Settings Page

목적: 데모 사용자, 팀, 환경 설정을 보여준다.

필수 요소:

- 현재 사용자 정보
- 팀 정보
- Role 정보
- Mock realtime 설정
- Theme 선택은 선택 사항

## 6. 주요 타입 정의

```ts
export type ServiceStatus = 'OPERATIONAL' | 'DEGRADED' | 'DOWN';

export type IncidentStatus =
  | 'TRIGGERED'
  | 'ACKNOWLEDGED'
  | 'INVESTIGATING'
  | 'RESOLVED'
  | 'POSTMORTEM_REQUIRED'
  | 'CLOSED';

export type Severity = 'SEV1' | 'SEV2' | 'SEV3' | 'SEV4';

export type UserRole = 'ADMIN' | 'MANAGER' | 'RESPONDER' | 'VIEWER';

export interface Service {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  averageLatencyMs: number;
  lastCheckedAt: string;
  failureCount: number;
  activeIncidentCount: number;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  serviceId: string;
  serviceName: string;
  severity: Severity;
  status: IncidentStatus;
  assigneeId?: string;
  assigneeName?: string;
  createdById: string;
  createdByName: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IncidentTimelineEvent {
  id: string;
  incidentId: string;
  actorName: string;
  eventType:
    | 'INCIDENT_CREATED'
    | 'STATUS_CHANGED'
    | 'ASSIGNEE_CHANGED'
    | 'COMMENT_ADDED'
    | 'SERVICE_RECOVERED'
    | 'POSTMORTEM_CREATED';
  message: string;
  oldValue?: string;
  newValue?: string;
  createdAt: string;
}
```

## 7. Mock Data 전략

초기 프론트 구현에서는 다음 mock 데이터를 만든다.

```txt
mockUsers
mockServices
mockIncidents
mockIncidentTimeline
mockDashboardSummary
mockPostmortems
```

선택지는 두 가지다.

### Option A: 단순 local mock data

- 빠르게 화면 구현 가능
- API 구조는 나중에 붙임

### Option B: MSW 사용

- 실제 API 호출과 유사한 개발 가능
- 추후 백엔드 연결 시 전환이 쉬움

초기 추천은 `Option A`로 빠르게 화면을 만든 뒤, 필요하면 MSW로 전환한다.

## 8. 실시간 화면 시뮬레이션

백엔드가 없더라도 프론트에서 실시간성을 보여주기 위해 mock realtime 기능을 만든다.

예시:

- 10초마다 새로운 Incident가 생성되는 것처럼 표시
- Service B 상태가 Operational → Degraded로 변경
- Incident 상태가 Triggered → Acknowledged로 변경
- Recent Timeline에 이벤트가 추가됨

구현 방식:

```txt
setInterval 기반 mock event generator
또는 Zustand store에 이벤트 push
```

나중에 백엔드 SSE와 연결할 때는 이 계층을 `useIncidentEvents` hook 내부에서 교체한다.

## 9. 단계별 구현 지시서

AI Assistant는 아래 단계를 반드시 순서대로 진행한다.

각 단계 완료 후 반드시 사용자에게 물어본다.

```txt
이 단계 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 1. 프로젝트 생성 및 기본 설정

작업 내용:

- Vite React TypeScript 프로젝트 생성
- ESLint/Prettier 기본 설정
- Tailwind CSS 설정
- React Router 설치
- TanStack Query 설치
- 기본 layout 구성
- 전역 스타일 구성

완료 기준:

- `npm run dev` 실행 가능
- 기본 Home 화면 표시
- 라우터 구조 존재

체크포인트 질문:

```txt
Step 1 프로젝트 생성 및 기본 설정을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 2. 공통 레이아웃 구현

작업 내용:

- AppLayout 구현
- Sidebar 구현
- Header 구현
- PageContainer 구현
- Navigation 메뉴 구현

메뉴:

- Dashboard
- Incidents
- Services
- Postmortems
- Settings

완료 기준:

- 모든 주요 페이지로 이동 가능
- 선택된 메뉴 active 표시
- 반응형 최소 대응

체크포인트 질문:

```txt
Step 2 공통 레이아웃 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 3. 타입과 Mock Data 구성

작업 내용:

- Service, Incident, Timeline, User, Dashboard 타입 정의
- mockUsers 생성
- mockServices 생성
- mockIncidents 생성
- mockTimelineEvents 생성
- mockDashboardSummary 생성

완료 기준:

- 모든 화면에서 사용할 수 있는 mock data 존재
- 타입 오류 없음

체크포인트 질문:

```txt
Step 3 타입과 Mock Data 구성을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 4. Dashboard 화면 구현

작업 내용:

- Summary Cards 구현
- Service Health Cards 구현
- Active Incidents 리스트 구현
- Incidents by Severity 차트 구현
- Incidents by Service 차트 구현
- Recent Timeline 구현

완료 기준:

- 운영 대시보드처럼 보이는 메인 화면 완성
- mock data 기반으로 렌더링

체크포인트 질문:

```txt
Step 4 Dashboard 화면 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 5. Services 화면 구현

작업 내용:

- 서비스 상태 테이블 구현
- 상태 badge 구현
- latency 표시
- last checked 표시
- service detail drawer 또는 modal 선택 구현

완료 기준:

- Service A/B/C 상태가 명확하게 표시됨
- Operational, Degraded, Down 상태 구분 가능

체크포인트 질문:

```txt
Step 5 Services 화면 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 6. Incident List 화면 구현

작업 내용:

- Incident 목록 테이블 또는 카드 구현
- 검색 기능 구현
- status 필터 구현
- severity 필터 구현
- service 필터 구현
- assignee 필터 구현
- 정렬 구현

완료 기준:

- 사용자가 인시던트를 빠르게 탐색 가능
- 필터 조합이 정상 동작

체크포인트 질문:

```txt
Step 6 Incident List 화면 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 7. Incident Detail 화면 구현

작업 내용:

- Incident 상세 정보 표시
- 상태 변경 UI 구현
- 담당자 변경 UI 구현
- Timeline 표시
- Comment/Update 작성 UI 구현

완료 기준:

- 하나의 Incident 대응 흐름이 화면에서 이해됨
- 상태 변경 시 mock state 갱신 가능

체크포인트 질문:

```txt
Step 7 Incident Detail 화면 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 8. Create Incident 기능 구현

작업 내용:

- Create Incident modal 또는 page 구현
- React Hook Form 적용
- Zod validation 적용
- 생성 시 mock incident list에 추가
- timeline event 자동 추가

완료 기준:

- 수동 Incident 생성 가능
- 생성 후 목록/상세/대시보드에 반영

체크포인트 질문:

```txt
Step 8 Create Incident 기능 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 9. Mock Realtime 구현

작업 내용:

- mock realtime event generator 구현
- 서비스 상태 변경 이벤트 구현
- incident 자동 생성 이벤트 구현
- timeline 자동 추가 구현
- realtime on/off 설정 구현

완료 기준:

- 백엔드 없이도 실시간 운영 대시보드처럼 보임
- 나중에 SSE로 교체 가능한 hook 구조 사용

추천 hook 이름:

```ts
useIncidentRealtime();
useServiceHealthRealtime();
```

체크포인트 질문:

```txt
Step 9 Mock Realtime 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 10. Postmortem 화면 구현

작업 내용:

- resolved incident 기준 postmortem 작성 화면 구현
- Summary, Root Cause, Impact, Resolution, Action Items 입력
- mock 저장 구현

완료 기준:

- 해결된 Incident에 대해 사후 분석 문서 작성 가능

체크포인트 질문:

```txt
Step 10 Postmortem 화면 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 11. UX 개선 및 포트폴리오 완성도 보강

작업 내용:

- loading state 추가
- empty state 추가
- error state 추가
- badge, card, table 스타일 정리
- 모바일/태블릿 최소 대응
- README 초안 작성

완료 기준:

- 포트폴리오 시연 가능한 수준의 완성도

체크포인트 질문:

```txt
Step 11 UX 개선 및 포트폴리오 완성도 보강을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 12. 백엔드 연결 준비

작업 내용:

- API client 계층 분리
- mock repository와 real API repository 인터페이스 분리
- 환경변수 구성
- SSE 연결 지점 TODO 작성

완료 기준:

- 실제 Express API 연결 시 화면 수정 최소화 가능

체크포인트 질문:

```txt
Step 12 백엔드 연결 준비를 완료했습니다.
프론트엔드 화면용 1차 구현을 마무리할까요? 예/아니오
```

## 10. 백엔드 연결 시 고려할 API Client 구조

```txt
shared/api/
├─ client.ts
├─ incidents.api.ts
├─ services.api.ts
├─ dashboard.api.ts
├─ postmortems.api.ts
└─ realtime.api.ts
```

각 feature에서는 직접 fetch를 호출하지 않고 api module을 통해 호출한다.

## 11. 포트폴리오에서 강조할 프론트엔드 역량

- 실시간 운영 대시보드 UI 설계
- 복잡한 상태별 UI 분기
- TanStack Query 기반 서버 상태 관리 준비
- Mock Realtime에서 SSE로 교체 가능한 구조
- Incident Lifecycle UX 설계
- Dashboard Analytics 시각화
- 타입 안정성 기반 도메인 모델링
- 영문/국문 README 작성 가능성

