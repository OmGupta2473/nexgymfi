import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createMember,
  deleteMember,
  getMembers,
  updateMember,
} from '../api/members.api';
import type { CreateMemberPayload } from '../api/types';

export const membersKey = ['members'] as const;

export const useMembers = () =>
  useQuery({
    queryKey: membersKey,
    queryFn: getMembers,
  });

export const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: membersKey });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateMemberPayload>;
    }) => updateMember(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: membersKey }),
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: membersKey });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
