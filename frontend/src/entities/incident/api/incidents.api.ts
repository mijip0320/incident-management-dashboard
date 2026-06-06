import { mockIncidents } from '@/entities/incident/model/mock-incidents';
import { mockTimelineEvents } from '@/entities/incident/model/mock-timeline-events';
import type {
  Incident,
  IncidentFilters,
  IncidentTimelineEvent,
} from '@/entities/incident/model/types';
import { mockDelay } from '@/shared/lib/mock-delay';

export type { IncidentFilters };

export const fetchIncidents = async (
  filters?: IncidentFilters,
): Promise<Incident[]> => {
  await mockDelay();

  let result = [...mockIncidents];

  if (filters?.status && filters.status !== 'ALL') {
    result = result.filter((incident) => incident.status === filters.status);
  }
  if (filters?.severity && filters.severity !== 'ALL') {
    result = result.filter(
      (incident) => incident.severity === filters.severity,
    );
  }
  if (filters?.serviceId && filters.serviceId !== 'ALL') {
    result = result.filter(
      (incident) => incident.serviceId === filters.serviceId,
    );
  }
  if (filters?.assigneeId && filters.assigneeId !== 'ALL') {
    result = result.filter(
      (incident) => incident.assigneeId === filters.assigneeId,
    );
  }
  if (filters?.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(
      (incident) =>
        incident.title.toLowerCase().includes(query) ||
        incident.description.toLowerCase().includes(query),
    );
  }

  return result.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};

export const fetchIncidentById = async (
  id: string,
): Promise<Incident | undefined> => {
  await mockDelay();
  return mockIncidents.find((incident) => incident.id === id);
};

export const fetchIncidentTimeline = async (
  incidentId: string,
): Promise<IncidentTimelineEvent[]> => {
  await mockDelay();
  return mockTimelineEvents
    .filter((event) => event.incidentId === incidentId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
};

export const fetchRecentTimeline = async (
  limit = 10,
): Promise<IncidentTimelineEvent[]> => {
  await mockDelay();
  return [...mockTimelineEvents]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
};
