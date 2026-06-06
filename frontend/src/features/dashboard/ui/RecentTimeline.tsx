import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { IncidentTimelineEvent } from '@/entities/incident/model/types';
import { Card, CardContent, CardHeader } from '@/shared/components/Card';

interface RecentTimelineProps {
  events: IncidentTimelineEvent[];
}

const eventTypeLabels: Record<IncidentTimelineEvent['eventType'], string> = {
  INCIDENT_CREATED: 'Created',
  STATUS_CHANGED: 'Status',
  ASSIGNEE_CHANGED: 'Assignee',
  COMMENT_ADDED: 'Comment',
  SERVICE_RECOVERED: 'Recovery',
  POSTMORTEM_CREATED: 'Postmortem',
};

export const RecentTimeline = ({ events }: RecentTimelineProps) => {
  return (
    <Card className="h-full">
      <CardHeader
        title="Recent Incident Timeline"
        description="Latest activity across all incidents"
      />
      <CardContent>
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent events</p>
        ) : (
          <ul className="space-y-4">
          {events.map((event, index) => (
            <li key={event.id} className="relative flex gap-3">
              {index < events.length - 1 && (
                <span className="absolute left-[7px] top-5 h-full w-px bg-border" />
              )}
              <span className="relative mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary bg-background" />
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {eventTypeLabels[event.eventType]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(event.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground">{event.message}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {event.actorName} · {event.incidentId}
                </p>
              </div>
            </li>
          ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
