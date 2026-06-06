import type {
  Incident,
  IncidentTimelineEvent,
  Severity,
} from '@/entities/incident/model/types';
import type { Service } from '@/entities/service/model/types';

export interface SeverityCount {
  severity: Severity;
  count: number;
}

export interface ServiceIncidentCount {
  serviceId: string;
  serviceName: string;
  count: number;
}

export interface DashboardSummary {
  openIncidents: number;
  criticalIncidents: number;
  averageMttaMinutes: number;
  averageMttrMinutes: number;
  serviceHealth: Service[];
  incidentsBySeverity: SeverityCount[];
  incidentsByService: ServiceIncidentCount[];
  recentTimeline: IncidentTimelineEvent[];
  activeIncidents: Incident[];
}
