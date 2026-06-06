import type { User } from '@/entities/user/model/types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@demo.io',
    name: 'Kim Admin',
    role: 'ADMIN',
    teamId: 'team-1',
  },
  {
    id: 'user-2',
    email: 'manager@demo.io',
    name: 'Lee Manager',
    role: 'MANAGER',
    teamId: 'team-1',
  },
  {
    id: 'user-3',
    email: 'responder@demo.io',
    name: 'Park Responder',
    role: 'RESPONDER',
    teamId: 'team-1',
  },
  {
    id: 'user-4',
    email: 'viewer@demo.io',
    name: 'Choi Viewer',
    role: 'VIEWER',
    teamId: 'team-1',
  },
];

export const mockCurrentUser = mockUsers[2];
