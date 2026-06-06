import { Link } from 'react-router-dom';
import type { Incident } from '@/entities/incident/model/types';
import { IncidentStatusBadge } from '@/entities/incident/ui/IncidentStatusBadge';
import { SeverityBadge } from '@/entities/incident/ui/SeverityBadge';
import { Card, CardContent, CardHeader } from '@/shared/components/Card';
import { ROUTES } from '@/shared/constants/routes';

interface ActiveIncidentsListProps {
  incidents: Incident[];
}

export const ActiveIncidentsList = ({ incidents }: ActiveIncidentsListProps) => {
  return (
    <Card>
      <CardHeader
        title="Active Incidents"
        description="Open incidents requiring attention"
      />
      <CardContent>
        {incidents.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active incidents</p>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Incident</th>
                <th className="pb-3 pr-4 font-medium">Service</th>
                <th className="pb-3 pr-4 font-medium">Severity</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Assignee</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr
                  key={incident.id}
                  className="border-b border-border/60 last:border-0"
                >
                  <td className="py-3 pr-4">
                    <Link
                      to={ROUTES.incidents}
                      className="font-medium text-foreground transition hover:text-primary"
                    >
                      {incident.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {incident.id}
                    </p>
                  </td>
                  <td className="py-3 pr-4 text-foreground">
                    {incident.serviceName}
                  </td>
                  <td className="py-3 pr-4">
                    <SeverityBadge severity={incident.severity} />
                  </td>
                  <td className="py-3 pr-4">
                    <IncidentStatusBadge status={incident.status} />
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {incident.assigneeName ?? 'Unassigned'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
