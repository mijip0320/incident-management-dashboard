# Service A Plan - Mock Payment Service

## 1. 목적

Payment Service처럼 보이는 mock service를 만든다.

실제 결제 기능을 구현하는 것이 아니라, 운영 상태를 모니터링하고 장애를 시뮬레이션하기 위한 서비스이다.

## 2. 기술 스택

- Node.js
- Express
- TypeScript

## 3. 포트

```txt
localhost:4101
```

## 4. 제공 엔드포인트

```txt
GET  /health
GET  /metrics
POST /simulate/error
POST /simulate/slow
POST /simulate/recover
```

## 5. 상태 정의

```ts
type SimulatedStatus = 'NORMAL' | 'ERROR' | 'SLOW';
```

## 6. 엔드포인트 동작

### GET /health

NORMAL 상태:

```json
{
  "status": "ok",
  "service": "Payment Service",
  "latencyMs": 120
}
```

ERROR 상태:

```json
{
  "status": "error",
  "service": "Payment Service",
  "message": "Payment gateway is unavailable"
}
```

HTTP status는 500을 반환한다.

SLOW 상태:

- 2500ms 이상 지연 후 200 응답

### GET /metrics

```json
{
  "service": "Payment Service",
  "requestCount": 120,
  "errorCount": 4,
  "averageLatencyMs": 180
}
```

### POST /simulate/error

Payment Service를 ERROR 상태로 변경한다.

### POST /simulate/slow

Payment Service를 SLOW 상태로 변경한다.

### POST /simulate/recover

Payment Service를 NORMAL 상태로 복구한다.

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
- port 4101 설정
- `GET /health` 기본 응답 구현

완료 기준:

- `localhost:4101/health` 호출 가능

체크포인트 질문:

```txt
Step 1 Payment Service 프로젝트 생성을 완료했습니다.
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

- API 호출로 서비스 상태 변경 가능

체크포인트 질문:

```txt
Step 2 Payment Service 상태 시뮬레이션 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 3. Metrics 구현

작업 내용:

- requestCount 증가
- errorCount 증가
- averageLatencyMs 계산
- `/metrics` 구현

완료 기준:

- Monitor Agent 또는 Dashboard에서 사용할 metric 제공 가능

체크포인트 질문:

```txt
Step 3 Payment Service Metrics 구현을 완료했습니다.
Payment Service 1차 구현을 마무리할까요? 예/아니오
```

## 8. 포트폴리오 설명 포인트

- Payment API 장애 상황을 시뮬레이션하는 mock service
- 장애/지연/복구 상태를 수동으로 발생시켜 dashboard 실시간 반영 테스트 가능

