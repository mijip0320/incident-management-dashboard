# Step 5. Services 화면 구현

| 항목 | 값 |
|------|-----|
| **상태** | ✅ completed |
| **시작일** | 2026-06-06 |
| **완료일** | 2026-06-06 |

## 작업 내용

- [x] 서비스 상태 테이블 구현
- [x] 상태 badge 구현
- [x] latency 표시
- [x] last checked 표시
- [x] service detail drawer 구현

## 완료 기준

- [x] Service A/B/C 상태가 명확하게 표시됨
- [x] Operational, Degraded, Down 상태 구분 가능

## 구현 상세

### 구성 (`features/services/ui/`)

| 컴포넌트 | 역할 |
|----------|------|
| `ServicesView` | `useServicesQuery` + drawer 상태 |
| `ServicesTable` | 서비스 목록 테이블 |
| `ServiceDetailDrawer` | 상세 정보 slide-over panel |

### 테이블 컬럼

Service · Status · Avg Latency · Last Checked · Failures · Incidents · Actions

### Drawer 상세

- Status badge, metrics, health check URL
- 관련 인시던트 링크 (`/incidents`)

### 공통

- `shared/components/Drawer.tsx` — 재사용 drawer
- `entities/service/lib/format-last-checked.ts` — date-fns 포맷

## 변경 파일

- `src/features/services/ui/{ServicesView,ServicesTable,ServiceDetailDrawer}.tsx`
- `src/pages/services/ServicesPage.tsx`
- `src/shared/components/Drawer.tsx`
- `src/entities/service/lib/format-last-checked.ts`

## 메모

- Payment(4101) / Notification(4102) / User(4103) health URL mock 표시
