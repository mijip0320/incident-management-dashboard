# Service C Plan - Mock User/Auth Service

## 1. 목적

User/Auth Service처럼 보이는 mock service를 만든다.

실제 인증 시스템을 구현하는 것이 아니라, 사용자 서비스 장애, 인증 API 실패, 응답 지연을 시뮬레이션하기 위한 서비스이다.

## 2. 기술 스택

- Node.js
- Express
- TypeScript

## 3. 포트

```txt
localhost:4103
```

## 4. 제공 엔드포인트

```txt
GET  /health
GET  /metrics
POST /simulate/error
POST /simulate/slow
POST /simulate/recover
GET  /users/me
POST /auth/mock-login
```

## 5. 상태 정의

```ts
type SimulatedStatus = 'NORMAL' | 'ERROR' | 'SLOW';
```

## 6. 엔드포인트 동작

### GET /health

NORMAL 상태에서는 200을 반환한다.
ERROR 상태에서는 500을 반환한다.
SLOW 상태에서는 2500ms 이상 지연 후 200을 반환한다.

### GET /users/me

NORMAL 응답:

```json
{
  "id": "user-1",
  "name": "Demo Responder",
  "email": "responder@example.com",
  "role": "RESPONDER"
}
```

ERROR 응답:

```json
{
  "message": "User database connection failed"
}
```

### POST /auth/mock-login

NORMAL 응답:

```json
{
  "accessToken": "mock-access-token",
  "user": {
    "id": "user-1",
    "name": "Demo Responder",
    "role": "RESPONDER"
  }
}
```

## 7. 단계별 구현 지시서

AI Assistant는 아래 단계를 순서대로 진행한다.

각 단계 완료 후 반드시 사용자에게 물어본다.

```txt
이 단계 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 1. 프로젝트 생성

작업 내용:

- Express TypeScript 프로젝트 생성
- port 4103 설정
- `GET /health` 기본 응답 구현

완료 기준:

- `localhost:4103/health` 호출 가능

체크포인트 질문:

```txt
Step 1 User/Auth Service 프로젝트 생성을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 2. 상태 시뮬레이션 구현

작업 내용:

- NORMAL/ERROR/SLOW 상태 관리
- `/simulate/error` 구현
- `/simulate/slow` 구현
- `/simulate/recover` 구현

완료 기준:

- API 호출로 User/Auth Service 상태 변경 가능

체크포인트 질문:

```txt
Step 2 User/Auth Service 상태 시뮬레이션 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 3. Mock User API 구현

작업 내용:

- `/users/me` 구현
- 현재 상태에 따라 성공/실패/지연 응답 처리

완료 기준:

- User Service의 mock business API 존재

체크포인트 질문:

```txt
Step 3 Mock User API 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 4. Mock Login API 구현

작업 내용:

- `/auth/mock-login` 구현
- mock token 반환
- 현재 상태에 따라 성공/실패/지연 응답 처리

완료 기준:

- Auth Service처럼 보이는 mock endpoint 존재

체크포인트 질문:

```txt
Step 4 Mock Login API 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 5. Metrics 구현

작업 내용:

- requestCount 관리
- loginFailureCount 관리
- averageLatencyMs 계산
- `/metrics` 구현

완료 기준:

- Monitor Agent 또는 Dashboard에서 사용할 metric 제공 가능

체크포인트 질문:

```txt
Step 5 User/Auth Service Metrics 구현을 완료했습니다.
User/Auth Service 1차 구현을 마무리할까요? 예/아니오
```

## 8. 포트폴리오 설명 포인트

- 사용자/인증 서비스 장애를 시뮬레이션하는 mock service
- 인증 장애, DB 연결 실패, 응답 지연 상황을 대시보드에서 보여줄 수 있음

