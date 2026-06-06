import { mockIncidents } from '@/entities/incident/model/mock-incidents';
import { mockTimelineEvents } from '@/entities/incident/model/mock-timeline-events';
import { mockServices } from '@/entities/service/model/mock-services';
import type { DashboardSummary } from '@/entities/dashboard/model/types';
import type { IncidentStatus } from '@/entities/incident/model/types';

const OPEN_STATUSES: IncidentStatus[] = [
  'TRIGGERED',
  'ACKNOWLEDGED',
  'INVESTIGATING',
];

const activeIncidents = mockIncidents
  .filter((incident) => OPEN_STATUSES.includes(incident.status))
  .sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

const openIncidents = mockIncidents.filter((incident) =>
  OPEN_STATUSES.includes(incident.status),
);

const criticalIncidents = mockIncidents.filter(
  (incident) =>
    incident.severity === 'SEV1' && OPEN_STATUSES.includes(incident.status),
);

export const mockDashboardSummary: DashboardSummary = {
  openIncidents: openIncidents.length,
  criticalIncidents: criticalIncidents.length,
  averageMttaMinutes: 18,
  averageMttrMinutes: 142,
  serviceHealth: mockServices,
  incidentsBySeverity: [
    { severity: 'SEV1', count: 1 },
    { severity: 'SEV2', count: 2 },
    { severity: 'SEV3', count: 2 },
    { severity: 'SEV4', count: 1 },
  ],
  incidentsByService: [
    { serviceId: 'service-a-payment', serviceName: 'Payment Service', count: 3 },
    {
      serviceId: 'service-b-notification',
      serviceName: 'Notification Service',
      count: 2,
    },
    { serviceId: 'service-c-user', serviceName: 'User Service', count: 1 },
  ],
  recentTimeline: [...mockTimelineEvents]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 8),
  activeIncidents,
};
