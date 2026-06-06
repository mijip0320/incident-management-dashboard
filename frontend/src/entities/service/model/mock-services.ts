import type { Service } from '@/entities/service/model/types';

const now = new Date();
const minutesAgo = (minutes: number) =>
  new Date(now.getTime() - minutes * 60_000).toISOString();

export const mockServices: Service[] = [
  {
    id: 'service-a-payment',
    name: 'Payment Service',
    description: 'Mock payment processing service (Service A)',
    status: 'OPERATIONAL',
    averageLatencyMs: 120,
    lastCheckedAt: minutesAgo(1),
    failureCount: 0,
    activeIncidentCount: 1,
  },
  {
    id: 'service-b-notification',
    name: 'Notification Service',
    description: 'Mock notification delivery service (Service B)',
    status: 'DEGRADED',
    averageLatencyMs: 890,
    lastCheckedAt: minutesAgo(2),
    failureCount: 3,
    activeIncidentCount: 2,
  },
  {
    id: 'service-c-user',
    name: 'User Service',
    description: 'Mock user/auth service (Service C)',
    status: 'OPERATIONAL',
    averageLatencyMs: 95,
    lastCheckedAt: minutesAgo(1),
    failureCount: 0,
    activeIncidentCount: 0,
  },
];
