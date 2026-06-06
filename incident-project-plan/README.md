# Incident Management Dashboard Project Plan

이 문서는 `Incident Management Dashboard` 사이드프로젝트를 AI Assistant와 단계별로 구현하기 위한 기획서 모음입니다.

## 프로젝트 목표

서비스 운영 중 발생하는 장애를 감지하고, 인시던트를 자동/수동으로 생성하며, 상태 변경, 담당자 지정, 타임라인 기록, 사후 분석까지 관리할 수 있는 실시간 운영 대시보드를 만드는 것이 목표입니다.

초기 구현은 **프론트엔드 화면 중심**으로 진행합니다. 백엔드, Monitor Agent, Mock Service A/B/C는 추후 연결을 고려하여 별도 기획서로 분리합니다.

## 추천 기술 스택

### Frontend

- React
- Vite
- TypeScript
- TanStack Query
- Zustand 또는 Context API
- React Router
- React Hook Form
- Zod
- Tailwind CSS
- shadcn/ui 선택 가능
- Recharts
- MSW 또는 mock data

### Backend

- Node.js
- Express
- TypeScript
- Supabase PostgreSQL
- Prisma 선택 가능
- JWT Auth
- SSE

### Local Services

- Docker Compose
- Mock Payment Service
- Mock Notification Service
- Mock User/Auth Service
- Monitor Agent

## 문서 구성

```txt
incident-project-plan/
├─ README.md
├─ frontend/
│  └─ FRONTEND_PLAN.md
├─ backend/
│  └─ BACKEND_PLAN.md
├─ monitor-agent/
│  └─ MONITOR_AGENT_PLAN.md
└─ services/
   ├─ service-a-payment/
   │  └─ SERVICE_A_PAYMENT_PLAN.md
   ├─ service-b-notification/
   │  └─ SERVICE_B_NOTIFICATION_PLAN.md
   └─ service-c-user/
      └─ SERVICE_C_USER_PLAN.md
```

## AI Assistant 진행 방식

각 문서에는 단계별 체크포인트가 있습니다.

각 단계가 끝나면 AI Assistant는 반드시 아래 형식으로 질문해야 합니다.

```txt
이 단계 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

사용자가 `예`라고 답하면 다음 단계로 진행합니다.
사용자가 `아니오`라고 답하면 현재 단계에서 수정할 부분을 먼저 확인합니다.

