import { useQuery } from '@tanstack/react-query';
import {
  fetchIncidentById,
  fetchIncidents,
  fetchIncidentTimeline,
  fetchRecentTimeline,
} from '@/entities/incident/api/incidents.api';
import type { IncidentFilters } from '@/entities/incident/model/types';
import { queryKeys } from '@/shared/api/query-keys';

export const useIncidentsQuery = (filters?: IncidentFilters) =>
  useQuery({
    queryKey: queryKeys.incidents.list(filters),
    queryFn: () => fetchIncidents(filters),
  });

export const useIncidentQuery = (id: string) =>
  useQuery({
    queryKey: queryKeys.incidents.detail(id),
    queryFn: () => fetchIncidentById(id),
    enabled: Boolean(id),
  });

export const useIncidentTimelineQuery = (incidentId: string) =>
  useQuery({
    queryKey: [...queryKeys.incidents.detail(incidentId), 'timeline'],
    queryFn: () => fetchIncidentTimeline(incidentId),
    enabled: Boolean(incidentId),
  });

export const useRecentTimelineQuery = (limit = 10) =>
  useQuery({
    queryKey: [...queryKeys.incidents.all, 'recent-timeline', limit],
    queryFn: () => fetchRecentTimeline(limit),
  });
