import { mockPostmortems } from '@/entities/postmortem/model/mock-postmortems';
import type { Postmortem } from '@/entities/postmortem/model/types';
import { mockDelay } from '@/shared/lib/mock-delay';

export const fetchPostmortems = async (): Promise<Postmortem[]> => {
  await mockDelay();
  return mockPostmortems;
};

export const fetchPostmortemById = async (
  id: string,
): Promise<Postmortem | undefined> => {
  await mockDelay();
  return mockPostmortems.find((postmortem) => postmortem.id === id);
};

export const fetchPostmortemByIncidentId = async (
  incidentId: string,
): Promise<Postmortem | undefined> => {
  await mockDelay();
  return mockPostmortems.find(
    (postmortem) => postmortem.incidentId === incidentId,
  );
};
