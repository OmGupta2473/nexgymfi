import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  cancelMembership,
  createMembership,
  extendMembership,
  freezeMembership,
  getMemberships,
  resumeMembership,
} from '../api/memberships.api';

export const membershipsKey = ['memberships'] as const;

export const useMemberships = () =>
  useQuery({
    queryKey: membershipsKey,
    queryFn: getMemberships,
  });

export const useCreateMembership = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMembership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: membershipsKey });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useFreezeMembership = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: freezeMembership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: membershipsKey });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useResumeMembership = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeMembership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: membershipsKey });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useCancelMembership = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelMembership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: membershipsKey });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useExtendMembership = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, days }: { id: string; days: number }) =>
      extendMembership(id, days),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: membershipsKey });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
