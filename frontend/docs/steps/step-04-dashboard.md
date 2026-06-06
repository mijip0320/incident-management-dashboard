# Step 4. Dashboard 화면 구현

| 항목 | 값 |
|------|-----|
| **상태** | ✅ completed |
| **시작일** | 2026-06-06 |
| **완료일** | 2026-06-06 |

## 작업 내용

- [x] Summary Cards 구현
- [x] Service Health Cards 구현
- [x] Active Incidents 리스트 구현
- [x] Incidents by Severity 차트 구현
- [x] Incidents by Service 차트 구현
- [x] Recent Timeline 구현

## 완료 기준

- [x] 운영 대시보드처럼 보이는 메인 화면 완성
- [x] mock data 기반으로 렌더링

## 구현 상세

### Dashboard 구성 (`features/dashboard/ui/`)

| 컴포넌트 | 역할 |
|----------|------|
| `DashboardView` | `useDashboardSummaryQuery` + loading/error 처리 |
| `DashboardSummaryCards` | Open / Critical / MTTA / MTTR |
| `ServiceHealthCards` | Service A/B/C health 카드 |
| `IncidentsBySeverityChart` | Recharts BarChart |
| `IncidentsByServiceChart` | Recharts BarChart |
| `RecentTimeline` | 최근 타임라인 (date-fns) |
| `ActiveIncidentsList` | 활성 인시던트 테이블 |

### 공통 / Entity UI

- `shared/components/{Card,StatCard,DashboardSkeleton,ErrorState}`
- `entities/service/ui/ServiceStatusBadge`
- `entities/incident/ui/{SeverityBadge,IncidentStatusBadge}`
- `shared/lib/chart-colors.ts` — CSS 변수 기반 차트 색상

### 패키지 추가

- `recharts`, `date-fns`

## 변경 파일

- `src/features/dashboard/ui/*.tsx`
- `src/pages/dashboard/DashboardPage.tsx`
- `src/shared/components/{Card,StatCard,DashboardSkeleton,ErrorState}.tsx`
- `src/entities/service/ui/ServiceStatusBadge.tsx`
- `src/entities/incident/ui/{SeverityBadge,IncidentStatusBadge}.tsx`
- `src/shared/lib/chart-colors.ts`
- `package.json`

## 메모

- 차트 색상은 `@theme` CSS 변수(`var(--color-*)`) 사용
- Active Incidents 링크는 Step 7 detail route 추가 전까지 `/incidents`로 연결
