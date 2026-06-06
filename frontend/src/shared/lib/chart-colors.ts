import type { Severity } from '@/entities/incident/model/types';

export const SEVERITY_CHART_COLORS: Record<Severity, string> = {
  SEV1: 'var(--color-severity-critical)',
  SEV2: 'var(--color-severity-high)',
  SEV3: 'var(--color-severity-medium)',
  SEV4: 'var(--color-severity-low)',
};

export const SERVICE_CHART_COLOR = 'var(--color-primary)';
export const CHART_GRID_COLOR = 'var(--color-border)';
export const CHART_AXIS_COLOR = 'var(--color-muted-foreground)';
