# Step 3. 타입과 Mock Data 구성

| 항목 | 값 |
|------|-----|
| **상태** | ✅ completed |
| **시작일** | 2026-06-06 |
| **완료일** | 2026-06-06 |

## 작업 내용

- [x] Service, Incident, Timeline, User, Dashboard 타입 정의
- [x] mockUsers 생성
- [x] mockServices 생성
- [x] mockIncidents 생성
- [x] mockTimelineEvents 생성
- [x] mockDashboardSummary 생성
- [x] mockPostmortems 생성 (기획서 mock 목록)
- [x] mockTeams 생성
- [x] entity별 API 함수 + TanStack Query hook

## 완료 기준

- [x] 모든 화면에서 사용할 수 있는 mock data 존재
- [x] 타입 오류 없음

## 구현 상세

### Entity 타입 (`entities/{domain}/model/types.ts`)

| Entity | 주요 타입 |
|--------|-----------|
| user | `User`, `UserRole` |
| team | `Team` |
| service | `Service`, `ServiceStatus` |
| incident | `Incident`, `IncidentTimelineEvent`, `IncidentFilters`, `Severity` |
| postmortem | `Postmortem` |
| dashboard | `DashboardSummary`, `SeverityCount`, `ServiceIncidentCount` |

### Mock Data

| 파일 | 내용 |
|------|------|
| `mock-users.ts` | 4명 (ADMIN/MANAGER/RESPONDER/VIEWER) |
| `mock-services.ts` | Payment / Notification / User (A/B/C) |
| `mock-incidents.ts` | 6건 (다양한 status/severity) |
| `mock-timeline-events.ts` | 10건 |
| `mock-postmortems.ts` | 2건 |
| `mock-dashboard-summary.ts` | 집계 데이터 (MTTA/MTTR, charts, active list) |

### Query Hooks (Option A — local mock)

```txt
entities/user/api/useUsersQuery.ts       → useUsersQuery, useCurrentUserQuery
entities/service/api/useServicesQuery.ts → useServicesQuery, useServiceQuery
entities/incident/api/useIncidentsQuery.ts → useIncidentsQuery, useIncidentQuery, ...
entities/postmortem/api/usePostmortemsQuery.ts
entities/dashboard/api/useDashboardSummaryQuery.ts
```

API 함수는 `shared/lib/mock-delay.ts`로 비동기 시뮬레이션 (300ms).

## 변경 파일

- `entities/{user,team,service,incident,postmortem,dashboard}/model/`
- `entities/{user,service,incident,postmortem,dashboard}/api/`
- `shared/lib/mock-delay.ts`
- `shared/api/query-keys.ts`

## 메모

- FSD: mock data는 entity `model/`에 배치 (shared → entities import 금지)
- Step 7/8에서 mutable mock store(Zustand) 추가 예정
- Step 4부터 `useDashboardSummaryQuery` 등 hook 사용
