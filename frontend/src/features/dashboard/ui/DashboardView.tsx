import { useDashboardSummaryQuery } from '@/entities/dashboard/api/useDashboardSummaryQuery';
import { ActiveIncidentsList } from '@/features/dashboard/ui/ActiveIncidentsList';
import { DashboardSummaryCards } from '@/features/dashboard/ui/DashboardSummaryCards';
import { IncidentsByServiceChart } from '@/features/dashboard/ui/IncidentsByServiceChart';
import { IncidentsBySeverityChart } from '@/features/dashboard/ui/IncidentsBySeverityChart';
import { RecentTimeline } from '@/features/dashboard/ui/RecentTimeline';
import { ServiceHealthCards } from '@/features/dashboard/ui/ServiceHealthCards';
import { DashboardSkeleton } from '@/shared/components/DashboardSkeleton';
import { ErrorState } from '@/shared/components/ErrorState';

export const DashboardView = () => {
  const { data, isLoading, isError } = useDashboardSummaryQuery();

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !data) return <ErrorState />;

  return (
    <div className="space-y-6">
      <DashboardSummaryCards summary={data} />
      <ServiceHealthCards services={data.serviceHealth} />
      <div className="grid gap-4 lg:grid-cols-2">
        <IncidentsBySeverityChart data={data.incidentsBySeverity} />
        <IncidentsByServiceChart data={data.incidentsByService} />
      </div>
      <div className="grid gap-4 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <ActiveIncidentsList incidents={data.activeIncidents} />
        </div>
        <div className="xl:col-span-2">
          <RecentTimeline events={data.recentTimeline} />
        </div>
      </div>
    </div>
  );
};
