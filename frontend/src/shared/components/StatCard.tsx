import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Card, CardContent } from '@/shared/components/Card';

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  variant?: 'default' | 'critical' | 'success' | 'warning';
  icon?: ReactNode;
}

const variantStyles = {
  default: '',
  critical: 'ring-severity-critical/40 bg-severity-critical/5',
  success: 'ring-status-operational/40 bg-status-operational/5',
  warning: 'ring-severity-high/40 bg-severity-high/5',
};

export const StatCard = ({
  label,
  value,
  hint,
  variant = 'default',
  icon,
}: StatCardProps) => {
  return (
    <Card className={clsx(variantStyles[variant])}>
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              {value}
            </p>
            {hint && (
              <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
            )}
          </div>
          {icon && (
            <div className="rounded-lg bg-secondary p-2 text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
