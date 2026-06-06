import type { Service } from '@/entities/service/model/types';
import { ServiceStatusBadge } from '@/entities/service/ui/ServiceStatusBadge';
import { Card, CardContent, CardHeader } from '@/shared/components/Card';

interface ServiceHealthCardsProps {
  services: Service[];
}

export const ServiceHealthCards = ({ services }: ServiceHealthCardsProps) => {
  return (
    <Card>
      <CardHeader
        title="Service Health Status"
        description="Real-time health check results for monitored services"
      />
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-lg border border-border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {service.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {service.description}
                </p>
              </div>
              <ServiceStatusBadge status={service.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="text-muted-foreground">Latency</dt>
                <dd className="mt-0.5 font-medium text-foreground">
                  {service.averageLatencyMs}ms
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Failures</dt>
                <dd className="mt-0.5 font-medium text-foreground">
                  {service.failureCount}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Active Incidents</dt>
                <dd className="mt-0.5 font-medium text-foreground">
                  {service.activeIncidentCount}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Last Check</dt>
                <dd className="mt-0.5 font-medium text-foreground">
                  {new Date(service.lastCheckedAt).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </dd>
              </div>
            </dl>
          </div>
        ))}
        </div>
      </CardContent>
    </Card>
  );
};
