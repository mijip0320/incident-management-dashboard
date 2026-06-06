export interface Postmortem {
  id: string;
  incidentId: string;
  incidentTitle: string;
  summary: string;
  rootCause: string;
  impact: string;
  resolution: string;
  actionItems: string[];
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}
