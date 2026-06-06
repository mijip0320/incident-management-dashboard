# Monitor Agent Plan

## 1. 목적

Monitor Agent는 Service A/B/C의 `/health` 엔드포인트를 주기적으로 호출하고, 상태와 응답 시간을 측정하여 Incident API에 health event를 전송한다.

프론트엔드 포트폴리오 관점에서는 이 Agent가 존재함으로써 Dashboard가 단순 CRUD가 아니라 실제 운영 모니터링 시스템처럼 보이게 된다.

## 2. 기술 스택

- Node.js
- TypeScript
- fetch 또는 axios
- dotenv
- node-cron 또는 setInterval

## 3. 역할

```txt
1. 등록된 서비스 목록을 기준으로 health check 수행
2. 응답 성공/실패 판단
3. latency 측정
4. 연속 실패 횟수 관리
5. 장애 조건 충족 시 Incident API에 이벤트 전송
6. 복구 조건 충족 시 Recovery 이벤트 전송
```

## 4. 서비스 체크 대상 예시

```ts
const services = [
  {
    id: 'service-a-payment',
    name: 'Payment Service',
    healthUrl: 'http://localhost:4101/health',
  },
  {
    id: 'service-b-notification',
    name: 'Notification Service',
    healthUrl: 'http://localhost:4102/health',
  },
  {
    id: 'service-c-user',
    name: 'User Service',
    healthUrl: 'http://localhost:4103/health',
  },
];
```

## 5. 장애 판단 규칙

초기 규칙:

```txt
3회 연속 health check 실패 → DOWN
3회 연속 latency 2000ms 초과 → DEGRADED
2회 연속 정상 응답 → OPERATIONAL
```

## 6. Incident API 전송 payload 예시

```json
{
  "serviceId": "service-a-payment",
  "serviceName": "Payment Service",
  "status": "DOWN",
  "latencyMs": 0,
  "checkedAt": "2026-06-06T10:00:00.000Z",
  "errorMessage": "Health check failed"
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

### Step 1. Monitor Agent 프로젝트 생성

작업 내용:

- Node.js TypeScript 프로젝트 생성
- dotenv 설정
- dev script 구성

완료 기준:

- `npm run dev` 실행 가능

체크포인트 질문:

```txt
Step 1 Monitor Agent 프로젝트 생성을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 2. 서비스 목록 설정

작업 내용:

- monitoring 대상 서비스 config 작성
- 환경변수 기반 API URL 설정

완료 기준:

- Service A/B/C health URL 관리 가능

체크포인트 질문:

```txt
Step 2 서비스 목록 설정을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 3. Health Check 구현

작업 내용:

- 각 서비스 `/health` 호출
- latency 측정
- 응답 성공/실패 판단
- timeout 처리

완료 기준:

- console에서 각 서비스 상태 확인 가능

체크포인트 질문:

```txt
Step 3 Health Check 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 4. 장애 판단 상태 관리 구현

작업 내용:

- 연속 실패 횟수 관리
- 연속 지연 횟수 관리
- 연속 정상 횟수 관리
- Operational/Degraded/Down 상태 산출

완료 기준:

- 서비스별 상태 전환 판단 가능

체크포인트 질문:

```txt
Step 4 장애 판단 상태 관리 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 5. Incident API 이벤트 전송 구현

작업 내용:

- `POST /internal/events/service-health` 호출
- internal secret header 추가
- 실패 시 retry 또는 log 처리

완료 기준:

- API 서버로 health event 전송 가능

체크포인트 질문:

```txt
Step 5 Incident API 이벤트 전송 구현을 완료했습니다.
다음 단계로 진행할까요? 예/아니오
```

---

### Step 6. Polling Scheduler 구현

작업 내용:

- 5초마다 health check 실행
- 중복 실행 방지
- graceful shutdown 처리

완료 기준:

- Agent가 지속적으로 Service A/B/C를 감시

체크포인트 질문:

```txt
Step 6 Polling Scheduler 구현을 완료했습니다.
Monitor Agent 1차 구현을 마무리할까요? 예/아니오
```

## 8. 포트폴리오 설명 포인트

- 로컬 마이크로서비스 환경을 감시하는 Agent 구현
- health check, latency 측정, 장애 조건 판단
- 장애 자동 생성 흐름 설계
- Incident API와 실시간 대시보드 연결을 위한 이벤트 기반 구조

