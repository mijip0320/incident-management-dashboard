import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser, fetchUsers } from '@/entities/user/api/users.api';
import { queryKeys } from '@/shared/api/query-keys';

export const useUsersQuery = () =>
  useQuery({
    queryKey: queryKeys.users.all,
    queryFn: fetchUsers,
  });

export const useCurrentUserQuery = () =>
  useQuery({
    queryKey: queryKeys.users.me(),
    queryFn: fetchCurrentUser,
  });
