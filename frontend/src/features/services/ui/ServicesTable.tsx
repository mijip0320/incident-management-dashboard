import type { Service } from '@/entities/service/model/types';
import { formatLastChecked } from '@/entities/service/lib/format-last-checked';
import { ServiceStatusBadge } from '@/entities/service/ui/ServiceStatusBadge';
import { Button } from '@/shared/components/ui/button';

interface ServicesTableProps {
  services: Service[];
  onViewDetail: (service: Service) => void;
}

export const ServicesTable = ({ services, onViewDetail }: ServicesTableProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead className="border-b border-border bg-secondary/40">
          <tr className="text-xs text-muted-foreground">
            <th className="px-4 py-3 font-medium">Service</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Avg Latency</th>
            <th className="px-4 py-3 font-medium">Last Checked</th>
            <th className="px-4 py-3 font-medium">Failures</th>
            <th className="px-4 py-3 font-medium">Incidents</th>
            <th className="px-4 py-3 font-medium">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => {
            const lastChecked = formatLastChecked(service.lastCheckedAt);
            return (
              <tr
                key={service.id}
                className="border-b border-border/60 bg-card last:border-0"
              >
                <td className="px-4 py-4">
                  <p className="font-medium text-foreground">{service.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {service.description}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <ServiceStatusBadge status={service.status} />
                </td>
                <td className="px-4 py-4 text-foreground">
                  {service.averageLatencyMs}ms
                </td>
                <td className="px-4 py-4">
                  <p className="text-foreground">{lastChecked.relative}</p>
                  <p className="text-xs text-muted-foreground">
                    {lastChecked.absolute}
                  </p>
                </td>
                <td className="px-4 py-4 text-foreground">
                  {service.failureCount}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={
                      service.activeIncidentCount > 0
                        ? 'font-medium text-severity-high'
                        : 'text-muted-foreground'
                    }
                  >
                    {service.activeIncidentCount}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetail(service)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
