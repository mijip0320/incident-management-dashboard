import { useQuery } from '@tanstack/react-query';
import { fetchDashboardSummary } from '@/entities/dashboard/api/dashboard.api';
import { queryKeys } from '@/shared/api/query-keys';

export const useDashboardSummaryQuery = () =>
  useQuery({
    queryKey: queryKeys.dashboard.summary(),
    queryFn: fetchDashboardSummary,
  });
