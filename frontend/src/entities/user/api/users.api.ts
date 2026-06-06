import { mockCurrentUser, mockUsers } from '@/entities/user/model/mock-users';
import type { User } from '@/entities/user/model/types';
import { mockDelay } from '@/shared/lib/mock-delay';

export const fetchUsers = async (): Promise<User[]> => {
  await mockDelay();
  return mockUsers;
};

export const fetchCurrentUser = async (): Promise<User> => {
  await mockDelay();
  return mockCurrentUser;
};
