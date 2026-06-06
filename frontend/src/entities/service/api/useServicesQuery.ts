import { useQuery } from '@tanstack/react-query';
import {
  fetchServiceById,
  fetchServices,
} from '@/entities/service/api/services.api';
import { queryKeys } from '@/shared/api/query-keys';

export const useServicesQuery = () =>
  useQuery({
    queryKey: queryKeys.services.list(),
    queryFn: fetchServices,
  });

export const useServiceQuery = (id: string) =>
  useQuery({
    queryKey: queryKeys.services.detail(id),
    queryFn: () => fetchServiceById(id),
    enabled: Boolean(id),
  });
