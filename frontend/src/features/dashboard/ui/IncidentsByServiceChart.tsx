import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ServiceIncidentCount } from '@/entities/dashboard/model/types';
import { Card, CardContent, CardHeader } from '@/shared/components/Card';
import {
  CHART_AXIS_COLOR,
  CHART_GRID_COLOR,
  SERVICE_CHART_COLOR,
} from '@/shared/lib/chart-colors';

interface IncidentsByServiceChartProps {
  data: ServiceIncidentCount[];
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ServiceIncidentCount }>;
}) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg">
      <p className="font-medium text-popover-foreground">{item.serviceName}</p>
      <p className="text-muted-foreground">{item.count} incidents</p>
    </div>
  );
};

export const IncidentsByServiceChart = ({
  data,
}: IncidentsByServiceChartProps) => {
  const chartData = data.map((item) => ({
    ...item,
    label: item.serviceName.replace(' Service', ''),
  }));

  return (
    <Card className="h-full">
      <CardHeader
        title="Incidents by Service"
        description="Incident count per monitored service"
      />
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={CHART_GRID_COLOR} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: CHART_AXIS_COLOR, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: CHART_AXIS_COLOR, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-secondary)', opacity: 0.4 }} />
            <Bar dataKey="count" fill={SERVICE_CHART_COLOR} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
