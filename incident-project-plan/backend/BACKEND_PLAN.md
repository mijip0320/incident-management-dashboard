# Backend Plan - Incident Management API

## 1. 목적

TypeScript + Express + Supabase PostgreSQL 기반으로 Incident Management Dashboard의 API 서버를 구현한다.

초기 프론트엔드 화면 구현 이후 연결할 수 있도록 API 구조, DB 모델, SSE 이벤트 구조를 미리 정의한다.

## 2. 기술 스택

- Node.js
- Express
- TypeScript
- Supabase PostgreSQL
- Prisma 선택 가능
- JWT Auth
- Zod 또는 Joi validation
- SSE
- Docker Compose 선택 가능

## 3. 추천 폴더 구조

```txt
src/
├─ app.ts
├─ server.ts
├─ config/
├─ db/
├─ modules/
│  ├─ auth/
│  ├─ users/
│  ├─ teams/
│  ├─ services/
│  ├─ incidents/
│  ├─ timelines/
│  ├─ postmortems/
│  ├─ dashboard/
│  └─ realtime/
├─ middlewares/
├─ utils/
├─ types/
└─ validators/
```

## 4. 핵심 도메인

- User
- Team
- TeamMember
- Service
- Incident
- IncidentUpdate
- IncidentTimeline
- Postmortem
- ServiceHealthCheck
- AuditLog

## 5. DB 모델 초안

```txt
users
- id
- email
- name
- role
- created_at
- updated_at

teams
- id
- name
- created_at

team_members
- id
- team_id
- user_id
- role
- created_at

services
- id
- team_id
- name
- description
- status
- health_check_url
- created_at
- updated_at

incidents
- id
- service_id
- title
- description
- severity
- status
- assignee_id
- created_by_id
- acknowledged_at
- resolved_at
- created_at
- updated_at

incident_updates
- id
- incident_id
- author_id
- message
- created_at

incident_timelines
- id
- incident_id
- actor_id
- event_type
- message
- old_value
- new_value
- created_at

postmortems
- id
- incident_id
- summary
- root_cause
- impact
- resolution
- action_items
- created_by_id
- created_at
- updated_at

service_health_checks
- id
- service_id
- status
- latency_ms
- checked_at
- error_message
```

## 6. 주요 API

```txt
POST   /auth/register
POST   /auth/login
GET    /me

GET    /services
POST   /services
GET    /services/:id
PATCH  /services/:id
DELETE /services/:id

GET    /incidents
POST   /incidents
GET    /incidents/:id
PATCH  /incidents/:id/status
PATCH  /incidents/:id/assignee
POST   /incidents/:id/updates
GET    /incidents/:id/timeline

GET    /dashboard/summary
GET    /dashboard/incidents-by-severity
GET    /dashboard/incidents-by-service
GET    /dashboard/mttr
GET    /dashboard/mtta

POST   /postmortems
GET    /postmortems/:incidentId
PATCH  /postmortems/:id

POST   /internal/events/service-health
GET    /events/incidents
```

## 7. SSE 이벤트 타입

```ts
type RealtimeEvent =
  | {
      type: 'INCIDENT_CREATED';
      payload: Incident;
    }
  | {
      type: 'INCIDENT_STATUS_CHANGED';
      payload: {
        incidentId: string;
        status: IncidentStatus;
      };
    }
  | {
      type: 'SERVICE_STATUS_CHANGED';
      payload: {
        serviceId: string;
        status: ServiceStatus;
      };
    }
  | {
      type: 'TIMELINE_EVENT_CREATED';
      payload: IncidentTimelineEvent;
    };
```

## 8. Monitor Agent 연동 흐름

```txt
Monitor Agent
→ POST /internal/events/service-health
→ API 서버가 health event 저장
→ 장애 조건 확인
→ Incident 자동 생성 또는 상태 변경
→ Timeline 기록
→ SSE로 프론트에 이벤트 발행
```

## 9. 단계별 구현 지시서

AI Assistant는 아래 단계를 순서대로 진행한다.

각 단계 완료 후 반드시 사용자에게 물어본다.

```txt
이 단계 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 1. Express TypeScript 프로젝트 구성

작업 내용:

- Node.js 프로젝트 생성
- TypeScript 설정
- Express 설치
- dev script 구성
- health check API 생성

완료 기준:

- `npm run dev` 실행 가능
- `GET /health` 응답 가능

체크포인트 질문:

```txt
Step 1 Express TypeScript 프로젝트 구성을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 2. 기본 미들웨어와 에러 처리

작업 내용:

- cors 설정
- json parser 설정
- request logger 설정
- global error handler 구현
- not found handler 구현

완료 기준:

- 일관된 에러 응답 구조 제공

체크포인트 질문:

```txt
Step 2 기본 미들웨어와 에러 처리를 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 3. DB 연결 구성

작업 내용:

- Supabase PostgreSQL 연결
- Prisma 또는 pg client 선택
- 환경변수 구성
- DB 연결 테스트

완료 기준:

- API 서버에서 DB 연결 가능

체크포인트 질문:

```txt
Step 3 DB 연결 구성을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 4. Services API 구현

작업 내용:

- Service CRUD 구현
- service status 변경 로직 구현
- health_check_url 저장

완료 기준:

- 프론트 Services 화면과 연결 가능

체크포인트 질문:

```txt
Step 4 Services API 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 5. Incidents API 구현

작업 내용:

- Incident 목록 조회
- Incident 생성
- Incident 상세 조회
- 상태 변경
- 담당자 변경
- update/comment 추가

완료 기준:

- 프론트 Incident List/Detail/Create와 연결 가능

체크포인트 질문:

```txt
Step 5 Incidents API 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 6. Timeline 자동 기록 구현

작업 내용:

- incident 생성 시 timeline 기록
- status 변경 시 timeline 기록
- assignee 변경 시 timeline 기록
- comment 추가 시 timeline 기록

완료 기준:

- Incident Detail Timeline과 연결 가능

체크포인트 질문:

```txt
Step 6 Timeline 자동 기록 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 7. Dashboard API 구현

작업 내용:

- summary 통계 API
- incidents by severity
- incidents by service
- MTTA 계산
- MTTR 계산

완료 기준:

- 프론트 Dashboard와 연결 가능

체크포인트 질문:

```txt
Step 7 Dashboard API 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 8. SSE Realtime API 구현

작업 내용:

- `GET /events/incidents` 구현
- client connection 관리
- incident event broadcast 구현
- service status event broadcast 구현

완료 기준:

- 프론트에서 SSE로 실시간 이벤트 수신 가능

체크포인트 질문:

```txt
Step 8 SSE Realtime API 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 9. Internal Service Health Event API 구현

작업 내용:

- `POST /internal/events/service-health` 구현
- Monitor Agent의 이벤트 수신
- 장애 조건 판단
- Incident 자동 생성
- 복구 감지 시 상태 변경 후보 처리

완료 기준:

- Monitor Agent와 연동 가능

체크포인트 질문:

```txt
Step 9 Internal Service Health Event API 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 10. 인증/인가 구현

작업 내용:

- 회원가입
- 로그인
- JWT 발급
- 인증 middleware
- role 기반 접근 제어

완료 기준:

- 관리자/응답자/조회자 역할 분리 가능

체크포인트 질문:

```txt
Step 10 인증/인가 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 11. 프론트 연결 준비

작업 내용:

- CORS 정리
- 응답 DTO 구조 정리
- API 문서 작성
- sample env 작성

완료 기준:

- 프론트에서 실제 API로 전환 가능

체크포인트 질문:

```txt
Step 11 프론트 연결 준비를 완료했습니다.
백엔드 1차 구현을 마무리할까요? 예/아니오
```

## 10. 백엔드 구현 시 주의사항

- 비즈니스 로직을 route handler에 몰아넣지 않는다.
- module/service/repository 계층을 분리한다.
- 모든 상태 변경은 timeline을 남긴다.
- Monitor Agent에서 들어오는 internal API는 별도 secret key로 보호한다.
- SSE connection은 memory leak이 생기지 않도록 close 이벤트에서 제거한다.

