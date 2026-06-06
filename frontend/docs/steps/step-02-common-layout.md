# Step 2. 공통 레이아웃 구현

| 항목 | 값 |
|------|-----|
| **상태** | ✅ completed |
| **시작일** | 2026-06-06 |
| **완료일** | 2026-06-06 |

## 작업 내용

- [x] AppLayout 구현
- [x] Sidebar 구현
- [x] Header 구현
- [x] PageContainer 구현
- [x] Navigation 메뉴 구현

### 메뉴

- Dashboard
- Incidents
- Services
- Postmortems
- Settings

## 완료 기준

- [x] 모든 주요 페이지로 이동 가능
- [x] 선택된 메뉴 active 표시
- [x] 반응형 최소 대응

## 구현 상세

### 레이아웃 구조

```txt
AppLayout
├─ Sidebar (NavLink + active state, mobile drawer)
├─ Header (mobile menu toggle, status badge, user avatar)
└─ Outlet → PageContainer (각 페이지)
```

### 반응형

- **Desktop (lg+):** Sidebar 고정 표시
- **Mobile:** Sidebar 숨김, Header 햄버거 버튼으로 drawer 토글
- Zustand `useLayoutStore`로 mobile sidebar 상태 관리 (`shared/model/`)

### 라우터

- `/login` — AppLayout 외부 (독립 auth 화면)
- `/dashboard`, `/incidents`, … — AppLayout children

## 변경 파일

- `src/shared/layouts/AppLayout.tsx`
- `src/shared/layouts/Sidebar.tsx`
- `src/shared/layouts/Header.tsx`
- `src/shared/layouts/PageContainer.tsx`
- `src/shared/layouts/NavIcon.tsx`
- `src/shared/model/useLayoutStore.ts`
- `src/shared/constants/routes.ts` (NAV_ITEMS + icon)
- `src/shared/styles/globals.css` (`--width-sidebar`)
- `src/app/router.tsx` (nested layout routes)
- `src/pages/**/*.tsx` (PageContainer 적용)
- `src/pages/login/LoginPage.tsx` (독립 레이아웃)
- `src/shared/layouts/PageShell.tsx` (삭제 → PageContainer로 대체)

## 메모

- FSD 준수: layout store는 `shared/model/`에 배치 (shared → features import 금지)
- Login 페이지는 Step 8 이전까지 Demo 링크로 Dashboard 이동 가능
