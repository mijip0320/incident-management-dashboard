# Frontend AGENTS.md

Incident Management Dashboard 프론트엔드 작업 시 AI Assistant와 개발자가 따를 **공통 규칙**입니다.

기획서: [`../incident-project-plan/frontend/FRONTEND_PLAN.md`](../incident-project-plan/frontend/FRONTEND_PLAN.md)  
진행 기록: [`docs/PROGRESS.md`](./docs/PROGRESS.md)

---

## Tech Stack

| 영역 | 라이브러리 |
|------|-----------|
| Build | Vite 6 |
| UI | React 19, TypeScript 5 |
| Routing | React Router 7 |
| Server State | TanStack Query 5 |
| Client State | Zustand |
| Styling | Tailwind CSS 4, shadcn/ui |
| Forms | React Hook Form + Zod |
| Toast | Sonner |
| Charts | Recharts |
| Utils | clsx, date-fns |

---

## 1. FSD (Feature-Sliced Design) 구조

**모든 파일과 디렉터리는 FSD 레이어 규칙을 따른다.**

```txt
src/
├─ app/          # 앱 진입점, router, providers, queryClient
├─ pages/        # 라우트 단위 페이지 (조합만, 로직 최소화)
├─ features/     # 사용자 시나리오/기능 (auth, incidents, dashboard …)
├─ entities/     # 도메인 모델 (user, incident, service …)
└─ shared/       # 재사용 UI, api, lib, hooks, styles, types
```

### 레이어 의존성 (하위 → 상위만 import)

```txt
shared  ←  entities  ←  features  ←  pages  ←  app
```

| 레이어 | 역할 | 예시 |
|--------|------|------|
| `app` | 전역 설정 | `router.tsx`, `providers.tsx` |
| `pages` | 페이지 shell | `DashboardPage.tsx` |
| `features` | 기능 단위 UI + hook + api | `features/incidents/ui/IncidentList.tsx` |
| `entities` | 도메인 타입, store, api | `entities/incident/model/types.ts` |
| `shared` | 공통 | `shared/components`, `shared/api` |

### 금지

- `entities`에서 `features` import
- `shared`에서 `entities` / `features` import
- 페이지/컴포넌트에 API fetch 로직 직접 작성 (→ TanStack Query hook 사용)
- FSD 레이어 밖(`src/utils/` 등) 임의 폴더 생성

### 슬라이스 내부 구조 (features / entities)

```txt
features/incidents/
├─ api/           # query/mutation hooks
├─ ui/            # 컴포넌트
├─ model/         # zustand store, selectors (필요 시)
└─ lib/           # feature 전용 유틸
```

---

## 2. TypeScript 규칙

- `strict: true` 유지. `any` 사용 금지 (`unknown` + type guard 사용).
- 도메인 타입은 `entities/{domain}/model/types.ts`에 정의.
- API 응답 타입과 UI props 타입 분리.
- enum 대신 union type + `as const` 객체 사용.

```ts
// ✅ GOOD — entities/incident/model/types.ts
export type IncidentStatus = 'TRIGGERED' | 'ACKNOWLEDGED' | 'RESOLVED';

export interface Incident {
  id: string;
  title: string;
  status: IncidentStatus;
}
```

- path alias: `@/` → `src/` (`import { X } from '@/entities/incident'`).
- type-only import: `import type { Incident } from '...'`.

---

## 3. React 규칙

### 컴포넌트는 반드시 화살표 함수

```tsx
// ✅ GOOD
export const IncidentCard = ({ incident }: IncidentCardProps) => {
  return <div>{incident.title}</div>;
};

// ❌ BAD
export function IncidentCard() { ... }
export default function IncidentCard() { ... }
```

- named export 사용 (`export default` 지양).
- props interface: `{ComponentName}Props` 네이밍.
- 페이지 컴포넌트: `pages/{route}/{Name}Page.tsx` → `export const DashboardPage = () => ...`

### Hooks

- 커스텀 hook: `use` 접두사 (`useIncidents`, `useAuthStore`).
- hook 파일 위치: feature/entity의 `api/` 또는 `model/`.

### 파일 네이밍

| 종류 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `IncidentCard.tsx` |
| hook | camelCase + use | `useIncidents.ts` |
| store | camelCase + Store | `useIncidentStore.ts` |
| api | camelCase + .api | `incidents.api.ts` |
| 타입 | types.ts | `entities/incident/model/types.ts` |

---

## 4. Vite 규칙

- 환경변수: `import.meta.env.VITE_*` (`.env`, `.env.local`).
- public API base URL: `VITE_API_BASE_URL`.
- 절대 경로 import만 사용 (`@/`), 상대 경로 `../../` 3단계 이상 금지.
- lazy route: `React.lazy` + `Suspense` (페이지 단위 code splitting).

---

## 5. TanStack Query — API 호출 규칙

**컴포넌트에서 fetch/axios 직접 호출 금지.** 반드시 query/mutation hook을 통해 호출한다.

### 계층 구조

```txt
shared/api/
├─ client.ts              # fetch wrapper, base URL, auth header
└─ query-keys.ts          # query key factory

entities/{domain}/api/
├─ {domain}.api.ts        # raw API 함수 (fetch only)
└─ use{Domain}Query.ts    # useQuery / useMutation hooks

features/{feature}/api/
└─ use{Feature}Mutation.ts  # feature 조합 mutation (toast 포함)
```

### Query Key Factory

```ts
// shared/api/query-keys.ts
export const queryKeys = {
  incidents: {
    all: ['incidents'] as const,
    list: (filters: IncidentFilters) =>
      [...queryKeys.incidents.all, 'list', filters] as const,
    detail: (id: string) =>
      [...queryKeys.incidents.all, 'detail', id] as const,
  },
};
```

### Query Hook 예시

```ts
// entities/incident/api/useIncidentsQuery.ts
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/api/query-keys';
import { fetchIncidents } from './incidents.api';

export const useIncidentsQuery = (filters: IncidentFilters) =>
  useQuery({
    queryKey: queryKeys.incidents.list(filters),
    queryFn: () => fetchIncidents(filters),
  });
```

### 컴포넌트 사용

```tsx
// ✅ GOOD
export const IncidentList = () => {
  const { data, isLoading } = useIncidentsQuery(filters);
  ...
};

// ❌ BAD
export const IncidentList = () => {
  useEffect(() => { fetch('/api/incidents')... }, []);
};
```

---

## 6. Zustand — 클라이언트 전역 상태

서버 데이터는 TanStack Query, **UI/세션/실시간 mock 상태**는 Zustand.

### Store 위치

| 상태 종류 | 위치 |
|-----------|------|
| 도메인 UI 상태 | `entities/{domain}/model/use{Domain}Store.ts` |
| feature 전용 | `features/{feature}/model/use{Feature}Store.ts` |
| 앱 전역 (auth, theme) | `features/auth/model/useAuthStore.ts` |

### Store 작성 규칙

```ts
// entities/incident/model/useIncidentFilterStore.ts
import { create } from 'zustand';

interface IncidentFilterState {
  status: IncidentStatus | 'ALL';
  setStatus: (status: IncidentStatus | 'ALL') => void;
  reset: () => void;
}

export const useIncidentFilterStore = create<IncidentFilterState>((set) => ({
  status: 'ALL',
  setStatus: (status) => set({ status }),
  reset: () => set({ status: 'ALL' }),
}));
```

- selector 사용으로 불필요한 re-render 방지: `useStore((s) => s.status)`.
- 서버 데이터를 zustand에 mirror하지 않는다 (Query cache가 source of truth).

---

## 7. Styling — Tailwind + shadcn/ui 디자인 토큰

**컴포넌트에 hex/rgb 하드코딩 금지.** `globals.css` `@theme` 토큰 → Tailwind utility로 사용.

### 토큰 정의 위치

`src/shared/styles/globals.css` — 모든 색상·radius·shadow는 여기서 정의.

### 컴포넌트에서 사용

```tsx
// ✅ GOOD — 토큰 기반 utility
<div className="bg-background text-foreground border-border rounded-lg">
  <span className="text-muted">Secondary text</span>
</div>

// ❌ BAD — 하드코딩
<div className="bg-[#0f172a] text-[#f8fafc]">
```

### 토큰이 없을 때

1. `globals.css` `@theme`에 semantic 토큰 추가
2. 컴포넌트에서 해당 utility 사용

```css
/* globals.css — 예: severity 색상 추가 */
@theme {
  --color-severity-critical: #ef4444;
  --color-severity-high: #f97316;
}
```

```tsx
<span className="bg-severity-critical text-primary-foreground">SEV1</span>
```

### shadcn/ui

- **설치됨**: `components.json` (style: `radix-nova`, icon: `lucide`)
- 컴포넌트 추가: `npx shadcn@latest add button card badge ... -y`
- shadcn 컴포넌트 위치: `src/shared/components/ui/`
- 유틸: `src/shared/lib/utils.ts` (`cn()` = clsx + tailwind-merge)
- **주의**: CLI가 `@/` 폴더에 생성할 경우 `src/shared/`로 이동 필요
- 테마: `index.html`에 `class="dark"`, `globals.css` CSS 변수 + 커스텀 토큰(severity, status)
- shadcn CSS 변수는 `globals.css`의 `:root` / `.dark`와 **동기화** 유지

---

## 8. Mutation + Toast 규칙

모든 mutation은 **성공/실패 toast**를 일관되게 표시한다.

### Toast 라이브러리

- **Sonner** (`shared/lib/toast.ts` wrapper 사용)
- Provider: `app/providers.tsx`에 `<Toaster />` 등록

### Wrapper

```ts
// shared/lib/toast.ts
import { toast } from 'sonner';

export const showSuccessToast = (message: string) => toast.success(message);
export const showErrorToast = (message: string) => toast.error(message);
```

### Mutation Hook 패턴

```ts
// features/incidents/api/useCreateIncidentMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showSuccessToast, showErrorToast } from '@/shared/lib/toast';
import { queryKeys } from '@/shared/api/query-keys';
import { createIncident } from '@/entities/incident/api/incidents.api';

export const useCreateIncidentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIncident,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.incidents.all });
      showSuccessToast('인시던트가 생성되었습니다.');
    },
    onError: (error: ApiError) => {
      // 실패 메시지는 백엔드 응답 body에서 추출
      showErrorToast(error.message ?? '요청 처리에 실패했습니다.');
    },
  });
};
```

### API Error 타입

```ts
// shared/api/client.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

// fetch wrapper에서 백엔드 error.message 파싱
// { "message": "Incident not found" } → ApiError('Incident not found', 404)
```

### 규칙 요약

| 상황 | Toast |
|------|-------|
| mutation 성공 | `showSuccessToast` — 프론트 정의 메시지 |
| mutation 실패 | `showErrorToast` — **백엔드 `message` 필드** 우선 |
| query 실패 | 페이지/컴포넌트 error state UI (toast 선택) |

---

## 9. ESLint / Prettier

- `npm run lint` 통과 필수.
- `npm run format` — Prettier + Tailwind class 정렬.
- unused import/variable 금지 (`noUnusedLocals`).

---

## 10. 진행 문서 갱신

`frontend/` 코드 작업 시 [`docs/PROGRESS.md`](./docs/PROGRESS.md) 및 [`docs/SESSION_LOG.md`](./docs/SESSION_LOG.md)를 **반드시** 함께 갱신한다.  
상세 규칙: `.cursor/rules/frontend-progress-docs.mdc`

---

## Quick Reference — DO / DON'T

| DO | DON'T |
|----|-------|
| FSD 레이어 구조 준수 | flat `components/` 폴더에 모든 것 넣기 |
| TanStack Query hook으로 API 호출 | 컴포넌트에서 `fetch` 직접 호출 |
| 화살표 함수 컴포넌트 | `function` 선언 / `default export` |
| `@theme` 토큰 + Tailwind utility | `#hex` 하드코딩 |
| Zustand for UI/client state | 서버 데이터를 zustand에 duplicate |
| mutation 후 toast (BE message) | 에러 silent fail |
| `@/` path alias | deep relative import |
