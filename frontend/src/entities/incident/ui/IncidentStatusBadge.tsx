import clsx from 'clsx';
import type { IncidentStatus } from '@/entities/incident/model/types';
import { Badge } from '@/shared/components/ui/badge';

interface IncidentStatusBadgeProps {
  status: IncidentStatus;
  className?: string;
}

const statusLabels: Record<IncidentStatus, string> = {
  TRIGGERED: 'Triggered',
  ACKNOWLEDGED: 'Acknowledged',
  INVESTIGATING: 'Investigating',
  RESOLVED: 'Resolved',
  POSTMORTEM_REQUIRED: 'Postmortem',
  CLOSED: 'Closed',
};

const statusStyles: Record<IncidentStatus, string> = {
  TRIGGERED: 'bg-severity-critical/15 text-severity-critical border-transparent',
  ACKNOWLEDGED: 'bg-severity-high/15 text-severity-high border-transparent',
  INVESTIGATING: 'bg-severity-medium/15 text-severity-medium border-transparent',
  RESOLVED: 'bg-status-operational/15 text-status-operational border-transparent',
  POSTMORTEM_REQUIRED: 'bg-severity-low/15 text-severity-low border-transparent',
  CLOSED: 'bg-secondary text-muted-foreground border-transparent',
};

export const IncidentStatusBadge = ({
  status,
  className,
}: IncidentStatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={clsx('rounded-md font-medium', statusStyles[status], className)}
    >
      {statusLabels[status]}
    </Badge>
  );
};
