# Session Log

날짜순(최신이 위)으로 프론트엔드 구현 작업 이력을 기록합니다.

---

## 2026-06-06 — Step 2: 공통 레이아웃 구현

**스텝:** Step 2  
**상태:** completed

### 작업 내용

- AppLayout, Sidebar, Header, PageContainer 구현
- NavLink 기반 active 메뉴 표시
- Mobile sidebar drawer (Zustand `useLayoutStore`)
- Router nested layout 적용 (login 제외)
- PageShell → PageContainer 마이그레이션

### 변경 파일

- `src/shared/layouts/{AppLayout,Sidebar,Header,PageContainer,NavIcon}.tsx`
- `src/shared/model/useLayoutStore.ts`
- `src/app/router.tsx`, `src/pages/**/*.tsx`

### 완료 기준 확인

- [x] 모든 주요 페이지로 이동 가능
- [x] 선택된 메뉴 active 표시
- [x] 반응형 최소 대응

---

**스텝:** — (품질)  
**상태:** completed

### 발견된 이슈

- `providers.tsx` 상대 import (`./queryClient`)
- `PageShell`, `HomePage` palette 하드코딩 (`slate-*`, `blue-*`, `text-white`)
- 라우터 lazy loading / Suspense 미적용
- FSD `entities/`, `features/` 폴더 골격 누락
- 기획서에 없는 `HomePage` (`/` dev 전용)

### 수정 내용

- `@/` alias import 통일, semantic 토큰(`text-foreground`, `text-muted-foreground` 등) 적용
- `lazyPage` + `RouteBoundary` + `PageLoader`로 code splitting 적용
- `shared/constants/routes.ts` 추가, `/` → `/dashboard` redirect
- `HomePage` 제거, FSD 폴더 골격 복원

### 변경 파일

- `src/app/router.tsx`, `RouteBoundary.tsx`, `providers.tsx`
- `src/shared/constants/routes.ts`, `lib/lazy-page.ts`, `components/PageLoader.tsx`
- `src/shared/layouts/PageShell.tsx`
- `src/pages/home/HomePage.tsx` (삭제)

---

**스텝:** — (인프라)  
**상태:** completed

### 작업 내용

- `frontend/AGENTS.md` 생성 (FSD, TanStack Query, Zustand, shadcn/tailwind 토큰, toast 규칙)
- `.cursor/rules/frontend-agents.mdc` 추가
- `globals.css` shadcn 호환 semantic 토큰 확장 (severity, status, destructive, success 등)
- `shared/api/client.ts`, `query-keys.ts`, `shared/lib/toast.ts` 스캐폴드
- `zustand`, `sonner` 패키지 설치 및 `AppProviders`에 `<Toaster />` 등록
- 기존 컴포넌트 `function` → 화살표 함수로 통일

### 변경 파일

- `frontend/AGENTS.md`
- `frontend/src/shared/styles/globals.css`
- `frontend/src/shared/api/client.ts`, `query-keys.ts`
- `frontend/src/shared/lib/toast.ts`
- `frontend/src/app/providers.tsx`
- `frontend/src/pages/**/*.tsx`, `shared/layouts/PageShell.tsx`
- `.cursor/rules/frontend-agents.mdc`

---

**스텝:** — (인프라)  
**상태:** completed

### 작업 내용

- `frontend/docs/` 폴더 및 진행 추적 문서 구조 생성
- `PROGRESS.md`, `SESSION_LOG.md`, `steps/step-01` ~ `step-12` 파일 생성
- `.cursor/rules/frontend-progress-docs.mdc` 규칙 추가 (AI 자동 갱신)

### 비고

- Step 1 완료 내역을 `steps/step-01-project-setup.md`에 소급 기록

---

## 2026-06-06 — Step 1: 프로젝트 생성 및 기본 설정

**스텝:** Step 1  
**상태:** completed

### 작업 내용

- Vite + React 19 + TypeScript 프로젝트 초기화
- ESLint / Prettier 설정
- Tailwind CSS v4 (`@tailwindcss/vite`) 설정
- React Router v7 라우터 구조 구성
- TanStack Query v5 (`queryClient`, `AppProviders`) 설정
- Home 및 주요 페이지 placeholder 생성
- `npm run dev`, `npm run build`, `npm run lint` 검증 완료

### 생성·변경 파일

- `package.json`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `.prettierrc`
- `src/app/router.tsx`, `providers.tsx`, `queryClient.ts`
- `src/main.tsx`, `src/shared/styles/globals.css`
- `src/pages/{home,login,dashboard,incidents,services,postmortems,settings}/`
- `src/shared/layouts/PageShell.tsx`

### 완료 기준 확인

- [x] `npm run dev` 실행 가능 (http://localhost:5173)
- [x] 기본 Home 화면 표시
- [x] 라우터 구조 존재

---

## 2026-06-06 — 프로젝트 폴더 구조 생성

**스텝:** — (사전 준비)  
**상태:** completed

### 작업 내용

- `incident-project-plan/README.md` 기준 루트 폴더 구조 생성
- `frontend/src/` Feature-Sliced Design 디렉터리 골격 생성
