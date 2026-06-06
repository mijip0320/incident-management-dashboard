export type ServiceStatus = 'OPERATIONAL' | 'DEGRADED' | 'DOWN';

export interface Service {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  averageLatencyMs: number;
  lastCheckedAt: string;
  failureCount: number;
  activeIncidentCount: number;
}

export const SERVICE_STATUSES = {
  OPERATIONAL: 'OPERATIONAL',
  DEGRADED: 'DEGRADED',
  DOWN: 'DOWN',
} as const satisfies Record<ServiceStatus, ServiceStatus>;
