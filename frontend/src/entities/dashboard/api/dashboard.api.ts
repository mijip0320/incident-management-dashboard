import { mockDashboardSummary } from '@/entities/dashboard/model/mock-dashboard-summary';
import type { DashboardSummary } from '@/entities/dashboard/model/types';
import { mockDelay } from '@/shared/lib/mock-delay';

export const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
  await mockDelay();
  return mockDashboardSummary;
};
