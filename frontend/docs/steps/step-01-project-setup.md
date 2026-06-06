# Step 1. 프로젝트 생성 및 기본 설정

| 항목 | 값 |
|------|-----|
| **상태** | ✅ completed |
| **시작일** | 2026-06-06 |
| **완료일** | 2026-06-06 |

## 작업 내용

- [x] Vite React TypeScript 프로젝트 생성
- [x] ESLint/Prettier 기본 설정
- [x] Tailwind CSS 설정
- [x] React Router 설치
- [x] TanStack Query 설치
- [x] 기본 layout 구성 (`PageShell`)
- [x] 전역 스타일 구성 (`globals.css`)

## 완료 기준

- [x] `npm run dev` 실행 가능
- [x] 기본 Home 화면 표시
- [x] 라우터 구조 존재

## 구현 상세

### 기술 스택

- Vite 6, React 19, TypeScript 5.8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- React Router 7, TanStack Query 5
- clsx, ESLint 9, Prettier 3

### 라우트

| 경로 | 컴포넌트 |
|------|----------|
| `/` | `HomePage` |
| `/login` | `LoginPage` |
| `/dashboard` | `DashboardPage` |
| `/incidents` | `IncidentsPage` |
| `/services` | `ServicesPage` |
| `/postmortems` | `PostmortemsPage` |
| `/settings` | `SettingsPage` |

### 주요 파일

```txt
frontend/
├─ package.json
├─ vite.config.ts
├─ src/
│  ├─ app/
│  │  ├─ router.tsx
│  │  ├─ providers.tsx
│  │  └─ queryClient.ts
│  ├─ main.tsx
│  ├─ pages/
│  └─ shared/
│     ├─ layouts/PageShell.tsx
│     └─ styles/globals.css
```

## 메모

- `@/` path alias 설정 (`vite.config.ts`, `tsconfig.app.json`)
- Home 화면에서 각 라우트로 이동 가능한 네비게이션 카드 제공
- Step 2에서 `AppLayout` / `Sidebar` / `Header`로 교체 예정
