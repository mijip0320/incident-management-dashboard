export const queryKeys = {
  dashboard: {
    all: ['dashboard'] as const,
    summary: () => [...queryKeys.dashboard.all, 'summary'] as const,
  },
  incidents: {
    all: ['incidents'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.incidents.all, 'list', filters] as const,
    detail: (id: string) =>
      [...queryKeys.incidents.all, 'detail', id] as const,
  },
  services: {
    all: ['services'] as const,
    list: () => [...queryKeys.services.all, 'list'] as const,
    detail: (id: string) =>
      [...queryKeys.services.all, 'detail', id] as const,
  },
  postmortems: {
    all: ['postmortems'] as const,
    list: () => [...queryKeys.postmortems.all, 'list'] as const,
    detail: (id: string) =>
      [...queryKeys.postmortems.all, 'detail', id] as const,
  },
  users: {
    all: ['users'] as const,
    me: () => [...queryKeys.users.all, 'me'] as const,
  },
};
