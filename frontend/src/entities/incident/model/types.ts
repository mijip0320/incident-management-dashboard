export interface IncidentFilters {
  status?: string;
  severity?: string;
  serviceId?: string;
  assigneeId?: string;
  search?: string;
}

export type IncidentStatus =
  | 'TRIGGERED'
  | 'ACKNOWLEDGED'
  | 'INVESTIGATING'
  | 'RESOLVED'
  | 'POSTMORTEM_REQUIRED'
  | 'CLOSED';

export type Severity = 'SEV1' | 'SEV2' | 'SEV3' | 'SEV4';

export type TimelineEventType =
  | 'INCIDENT_CREATED'
  | 'STATUS_CHANGED'
  | 'ASSIGNEE_CHANGED'
  | 'COMMENT_ADDED'
  | 'SERVICE_RECOVERED'
  | 'POSTMORTEM_CREATED';

export interface Incident {
  id: string;
  title: string;
  description: string;
  serviceId: string;
  serviceName: string;
  severity: Severity;
  status: IncidentStatus;
  assigneeId?: string;
  assigneeName?: string;
  createdById: string;
  createdByName: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IncidentTimelineEvent {
  id: string;
  incidentId: string;
  actorName: string;
  eventType: TimelineEventType;
  message: string;
  oldValue?: string;
  newValue?: string;
  createdAt: string;
}

export const INCIDENT_STATUSES = {
  TRIGGERED: 'TRIGGERED',
  ACKNOWLEDGED: 'ACKNOWLEDGED',
  INVESTIGATING: 'INVESTIGATING',
  RESOLVED: 'RESOLVED',
  POSTMORTEM_REQUIRED: 'POSTMORTEM_REQUIRED',
  CLOSED: 'CLOSED',
} as const satisfies Record<IncidentStatus, IncidentStatus>;

export const SEVERITIES = {
  SEV1: 'SEV1',
  SEV2: 'SEV2',
  SEV3: 'SEV3',
  SEV4: 'SEV4',
} as const satisfies Record<Severity, Severity>;
