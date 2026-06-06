import { Link } from 'react-router-dom';
import type { Service } from '@/entities/service/model/types';
import { formatLastChecked } from '@/entities/service/lib/format-last-checked';
import { ServiceStatusBadge } from '@/entities/service/ui/ServiceStatusBadge';
import { Drawer } from '@/shared/components/Drawer';
import { Button } from '@/shared/components/ui/button';
import { ROUTES } from '@/shared/constants/routes';

interface ServiceDetailDrawerProps {
  service: Service | null;
  open: boolean;
  onClose: () => void;
}

export const ServiceDetailDrawer = ({
  service,
  open,
  onClose,
}: ServiceDetailDrawerProps) => {
  if (!service) return null;

  const lastChecked = formatLastChecked(service.lastCheckedAt);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={service.name}
      description={service.description}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <ServiceStatusBadge status={service.status} />
          <span className="text-xs text-muted-foreground">{service.id}</span>
        </div>

        <dl className="grid grid-cols-2 gap-4">
          <DetailItem label="Average Latency" value={`${service.averageLatencyMs}ms`} />
          <DetailItem label="Failure Count" value={String(service.failureCount)} />
          <DetailItem
            label="Active Incidents"
            value={String(service.activeIncidentCount)}
          />
          <DetailItem label="Last Health Check" value={lastChecked.relative} hint={lastChecked.absolute} />
        </dl>

        <div className="rounded-lg border border-border bg-background p-4">
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Health Check Endpoint
          </h3>
          <p className="mt-2 break-all font-mono text-sm text-foreground">
            {getHealthCheckUrl(service.id)}
          </p>
        </div>

        {service.activeIncidentCount > 0 && (
          <Button asChild variant="secondary" className="w-full">
            <Link to={ROUTES.incidents} onClick={onClose}>
              View Related Incidents ({service.activeIncidentCount})
            </Link>
          </Button>
        )}
      </div>
    </Drawer>
  );
};

interface DetailItemProps {
  label: string;
  value: string;
  hint?: string;
}

const DetailItem = ({ label, value, hint }: DetailItemProps) => (
  <div>
    <dt className="text-xs text-muted-foreground">{label}</dt>
    <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    {hint && <dd className="mt-0.5 text-xs text-muted-foreground">{hint}</dd>}
  </div>
);

const getHealthCheckUrl = (serviceId: string) => {
  const portMap: Record<string, number> = {
    'service-a-payment': 4101,
    'service-b-notification': 4102,
    'service-c-user': 4103,
  };
  const port = portMap[serviceId] ?? 4100;
  return `http://localhost:${port}/health`;
};
