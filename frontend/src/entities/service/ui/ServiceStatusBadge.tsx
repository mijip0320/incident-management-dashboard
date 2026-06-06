import clsx from 'clsx';
import type { ServiceStatus } from '@/entities/service/model/types';
import { Badge } from '@/shared/components/ui/badge';

interface ServiceStatusBadgeProps {
  status: ServiceStatus;
  className?: string;
}

const statusConfig: Record<
  ServiceStatus,
  { label: string; className: string }
> = {
  OPERATIONAL: {
    label: 'Operational',
    className: 'bg-status-operational/15 text-status-operational border-transparent',
  },
  DEGRADED: {
    label: 'Degraded',
    className: 'bg-status-degraded/15 text-status-degraded border-transparent',
  },
  DOWN: {
    label: 'Down',
    className: 'bg-status-down/15 text-status-down border-transparent',
  },
};

export const ServiceStatusBadge = ({
  status,
  className,
}: ServiceStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={clsx('gap-1.5 rounded-full', config.className, className)}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {config.label}
    </Badge>
  );
};
