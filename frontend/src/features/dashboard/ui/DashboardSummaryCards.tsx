import type { DashboardSummary } from '@/entities/dashboard/model/types';
import { StatCard } from '@/shared/components/StatCard';

interface DashboardSummaryCardsProps {
  summary: DashboardSummary;
}

export const DashboardSummaryCards = ({
  summary,
}: DashboardSummaryCardsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Open Incidents"
        value={summary.openIncidents}
        hint="Triggered, Acknowledged, Investigating"
        variant={summary.openIncidents > 0 ? 'warning' : 'default'}
      />
      <StatCard
        label="Critical Incidents"
        value={summary.criticalIncidents}
        hint="Active SEV1 incidents"
        variant={summary.criticalIncidents > 0 ? 'critical' : 'default'}
      />
      <StatCard
        label="Average MTTA"
        value={`${summary.averageMttaMinutes}m`}
        hint="Mean time to acknowledge"
      />
      <StatCard
        label="Average MTTR"
        value={`${summary.averageMttrMinutes}m`}
        hint="Mean time to resolve"
      />
    </div>
  );
};
