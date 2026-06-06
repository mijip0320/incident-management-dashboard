import { useQuery } from '@tanstack/react-query';
import {
  fetchPostmortemById,
  fetchPostmortemByIncidentId,
  fetchPostmortems,
} from '@/entities/postmortem/api/postmortems.api';
import { queryKeys } from '@/shared/api/query-keys';

export const usePostmortemsQuery = () =>
  useQuery({
    queryKey: queryKeys.postmortems.list(),
    queryFn: fetchPostmortems,
  });

export const usePostmortemQuery = (id: string) =>
  useQuery({
    queryKey: queryKeys.postmortems.detail(id),
    queryFn: () => fetchPostmortemById(id),
    enabled: Boolean(id),
  });

export const usePostmortemByIncidentQuery = (incidentId: string) =>
  useQuery({
    queryKey: [...queryKeys.postmortems.all, 'by-incident', incidentId],
    queryFn: () => fetchPostmortemByIncidentId(incidentId),
    enabled: Boolean(incidentId),
  });
