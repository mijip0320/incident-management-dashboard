# Frontend Implementation Docs

이 폴더는 `incident-project-plan/frontend/FRONTEND_PLAN.md` 기준으로 프론트엔드 구현 진행 상황을 **실시간으로 기록**합니다.

## 문서 구성

| 파일 | 용도 |
|------|------|
| [PROGRESS.md](./PROGRESS.md) | **현재 스텝**, 전체 진행률, 스텝별 상태 (가장 먼저 확인) |
| [SESSION_LOG.md](./SESSION_LOG.md) | 날짜별 작업 이력 (시간순 로그) |
| [steps/](./steps/) | 스텝별 상세 기록 (작업 내용, 완료 기준, 변경 파일) |

## 상태 값

| 상태 | 의미 |
|------|------|
| `pending` | 아직 시작하지 않음 |
| `in_progress` | 현재 작업 중 |
| `completed` | 완료 (완료 기준 충족) |
| `blocked` | 사용자 확인 대기 또는 외부 의존성으로 중단 |

## 업데이트 규칙

AI Assistant는 `frontend/` 작업 시 **반드시** 아래 시점에 문서를 갱신합니다.

1. **작업 시작** → `PROGRESS.md` 현재 스텝을 `in_progress`로 변경, `SESSION_LOG.md`에 시작 로그 추가
2. **작업 중** → 해당 `steps/step-XX-*.md`에 진행 메모·변경 파일 기록
3. **작업 완료** → 스텝 상태 `completed`, 완료 기준 체크, `SESSION_LOG.md`에 완료 로그 추가
4. **사용자에게 체크포인트 질문** → `PROGRESS.md`에 "다음 스텝 대기" 표시

## "다음 단계 진행" 명령

"다음 단계 진행해줘", "응 진행해줘", "계속 진행" 등 유사 요청 시:

1. **[PROGRESS.md](./PROGRESS.md)를 먼저 읽고** 현재/다음 스텝 확인
2. 해당 `steps/step-XX-*.md` + [FRONTEND_PLAN.md](../../incident-project-plan/frontend/FRONTEND_PLAN.md) 기준으로 **바로 구현**
3. 완료 후 체크포인트 질문

Cursor 규칙: `.cursor/rules/frontend-next-step.mdc`

기획서 원본: [`../../incident-project-plan/frontend/FRONTEND_PLAN.md`](../../incident-project-plan/frontend/FRONTEND_PLAN.md)
