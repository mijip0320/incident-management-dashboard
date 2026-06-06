export type UserRole = 'ADMIN' | 'MANAGER' | 'RESPONDER' | 'VIEWER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  teamId: string;
}

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  RESPONDER: 'RESPONDER',
  VIEWER: 'VIEWER',
} as const satisfies Record<UserRole, UserRole>;
