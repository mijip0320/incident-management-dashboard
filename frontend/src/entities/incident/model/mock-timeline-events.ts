import type { IncidentTimelineEvent } from '@/entities/incident/model/types';

const now = new Date();
const minutesAgo = (minutes: number) =>
  new Date(now.getTime() - minutes * 60_000).toISOString();
const hoursAgo = (hours: number) =>
  new Date(now.getTime() - hours * 3_600_000).toISOString();

export const mockTimelineEvents: IncidentTimelineEvent[] = [
  {
    id: 'tl-001',
    incidentId: 'inc-002',
    actorName: 'Monitor Agent',
    eventType: 'INCIDENT_CREATED',
    message: 'Incident auto-created from health check failure',
    createdAt: hoursAgo(1),
  },
  {
    id: 'tl-002',
    incidentId: 'inc-002',
    actorName: 'Park Responder',
    eventType: 'STATUS_CHANGED',
    message: 'Status changed from TRIGGERED to ACKNOWLEDGED',
    oldValue: 'TRIGGERED',
    newValue: 'ACKNOWLEDGED',
    createdAt: minutesAgo(20),
  },
  {
    id: 'tl-003',
    incidentId: 'inc-002',
    actorName: 'Park Responder',
    eventType: 'COMMENT_ADDED',
    message: 'Investigating SMS provider API rate limits',
    createdAt: minutesAgo(15),
  },
  {
    id: 'tl-004',
    incidentId: 'inc-001',
    actorName: 'Lee Manager',
    eventType: 'INCIDENT_CREATED',
    message: 'Incident created manually from dashboard alert',
    createdAt: hoursAgo(2),
  },
  {
    id: 'tl-005',
    incidentId: 'inc-001',
    actorName: 'Park Responder',
    eventType: 'ASSIGNEE_CHANGED',
    message: 'Assignee changed to Park Responder',
    newValue: 'Park Responder',
    createdAt: minutesAgo(50),
  },
  {
    id: 'tl-006',
    incidentId: 'inc-001',
    actorName: 'Park Responder',
    eventType: 'STATUS_CHANGED',
    message: 'Status changed from ACKNOWLEDGED to INVESTIGATING',
    oldValue: 'ACKNOWLEDGED',
    newValue: 'INVESTIGATING',
    createdAt: minutesAgo(40),
  },
  {
    id: 'tl-007',
    incidentId: 'inc-003',
    actorName: 'Monitor Agent',
    eventType: 'INCIDENT_CREATED',
    message: 'Incident auto-created from queue depth threshold',
    createdAt: minutesAgo(30),
  },
  {
    id: 'tl-008',
    incidentId: 'inc-004',
    actorName: 'Park Responder',
    eventType: 'SERVICE_RECOVERED',
    message: 'Payment Service health check returned to normal',
    createdAt: hoursAgo(47),
  },
  {
    id: 'tl-009',
    incidentId: 'inc-006',
    actorName: 'Lee Manager',
    eventType: 'POSTMORTEM_CREATED',
    message: 'Postmortem document created for incident inc-006',
    createdAt: hoursAgo(96),
  },
  {
    id: 'tl-010',
    incidentId: 'inc-002',
    actorName: 'Kim Admin',
    eventType: 'COMMENT_ADDED',
    message: 'Escalated to SMS provider support ticket #4821',
    createdAt: minutesAgo(8),
  },
];
