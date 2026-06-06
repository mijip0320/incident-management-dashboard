import type { Postmortem } from '@/entities/postmortem/model/types';

const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 3_600_000).toISOString();

export const mockPostmortems: Postmortem[] = [
  {
    id: 'pm-001',
    incidentId: 'inc-006',
    incidentTitle: 'Payment refund processing delay',
    summary:
      'Refund processing pipeline stalled due to a misconfigured batch job cron schedule.',
    rootCause:
      'Cron expression was updated during deployment but not validated in staging. Batch job never triggered.',
    impact:
      '847 refund requests delayed by 24-36 hours. Customer support tickets increased by 40%.',
    resolution:
      'Manually triggered batch job, cleared backlog, and rolled back cron configuration.',
    actionItems: [
      'Add cron validation to CI pipeline',
      'Implement batch job heartbeat monitoring',
      'Create runbook for manual batch trigger',
    ],
    authorId: 'user-2',
    authorName: 'Lee Manager',
    createdAt: hoursAgo(96),
    updatedAt: hoursAgo(96),
  },
  {
    id: 'pm-002',
    incidentId: 'inc-004',
    incidentTitle: 'Payment gateway timeout',
    summary:
      'External payment gateway experienced intermittent timeouts during peak traffic.',
    rootCause:
      'Gateway provider had regional outage. Our circuit breaker threshold was too high to fail fast.',
    impact: '12% checkout failure rate for 45 minutes during peak hours.',
    resolution:
      'Enabled fallback gateway routing and lowered circuit breaker threshold.',
    actionItems: [
      'Configure multi-gateway failover',
      'Review circuit breaker thresholds',
      'Add gateway health to dashboard',
    ],
    authorId: 'user-3',
    authorName: 'Park Responder',
    createdAt: hoursAgo(46),
    updatedAt: hoursAgo(46),
  },
];
