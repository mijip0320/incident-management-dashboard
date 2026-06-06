# Service B Plan - Mock Notification Service

## 1. 목적

Notification Service처럼 보이는 mock service를 만든다.

실제 이메일, Slack, SMS 발송 기능을 구현하는 것이 아니라, 알림 시스템의 장애와 지연을 시뮬레이션하기 위한 서비스이다.

## 2. 기술 스택

- Node.js
- Express
- TypeScript

## 3. 포트

```txt
localhost:4102
```

## 4. 제공 엔드포인트

```txt
GET  /health
GET  /metrics
POST /simulate/error
POST /simulate/slow
POST /simulate/recover
POST /notifications/test
```

## 5. 상태 정의

```ts
type SimulatedStatus = 'NORMAL' | 'ERROR' | 'SLOW';
```

## 6. 엔드포인트 동작

### GET /health

NORMAL 상태에서는 200을 반환한다.
ERROR 상태에서는 500을 반환한다.
SLOW 상태에서는 3000ms 지연 후 200을 반환한다.

### POST /notifications/test

테스트 알림 발송처럼 보이는 mock endpoint이다.
실제 외부 서비스와 연결하지 않는다.

NORMAL 응답:

```json
{
  "ok": true,
  "message": "Test notification queued"
}
```

ERROR 응답:

```json
{
  "ok": false,
  "message": "Notification provider unavailable"
}
```

### GET /metrics

```json
{
  "service": "Notification Service",
  "sentCount": 300,
  "failedCount": 12,
  "averageLatencyMs": 220
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
- port 4102 설정
- `GET /health` 기본 응답 구현

완료 기준:

- `localhost:4102/health` 호출 가능

체크포인트 질문:

```txt
Step 1 Notification Service 프로젝트 생성을 완료했습니다.
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

- API 호출로 Notification Service 상태 변경 가능

체크포인트 질문:

```txt
Step 2 Notification Service 상태 시뮬레이션 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 3. Test Notification API 구현

작업 내용:

- `/notifications/test` 구현
- 현재 상태에 따라 성공/실패/지연 응답 처리

완료 기준:

- Notification Service의 mock business API 존재

체크포인트 질문:

```txt
Step 3 Test Notification API 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 4. Metrics 구현

작업 내용:

- sentCount 관리
- failedCount 관리
- averageLatencyMs 계산
- `/metrics` 구현

완료 기준:

- Monitor Agent 또는 Dashboard에서 사용할 metric 제공 가능

체크포인트 질문:

```txt
Step 4 Notification Service Metrics 구현을 완료했습니다.
Notification Service 1차 구현을 마무리할까요? 예/아니오
```

## 8. 포트폴리오 설명 포인트

- 알림 시스템 장애와 지연을 시뮬레이션하는 mock service
- 실시간 장애 대시보드의 서비스 상태 변화를 테스트할 수 있음

