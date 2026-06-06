import clsx from 'clsx';
import type { Severity } from '@/entities/incident/model/types';
import { Badge } from '@/shared/components/ui/badge';

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

const severityConfig: Record<Severity, { label: string; className: string }> = {
  SEV1: {
    label: 'SEV1',
    className: 'bg-severity-critical/15 text-severity-critical border-transparent',
  },
  SEV2: {
    label: 'SEV2',
    className: 'bg-severity-high/15 text-severity-high border-transparent',
  },
  SEV3: {
    label: 'SEV3',
    className: 'bg-severity-medium/15 text-severity-medium border-transparent',
  },
  SEV4: {
    label: 'SEV4',
    className: 'bg-severity-low/15 text-severity-low border-transparent',
  },
};

export const SeverityBadge = ({ severity, className }: SeverityBadgeProps) => {
  const config = severityConfig[severity];

  return (
    <Badge
      variant="outline"
      className={clsx('rounded-md font-semibold', config.className, className)}
    >
      {config.label}
    </Badge>
  );
};
