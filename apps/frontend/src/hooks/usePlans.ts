import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { archivePlan, createPlan, getPlans, updatePlan } from '../api/plans.api';
import type { CreatePlanPayload } from '../api/types';

export const plansKey = ['plans'] as const;

export const usePlans = () =>
  useQuery({
    queryKey: plansKey,
    queryFn: getPlans,
  });

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlan,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: plansKey }),
  });
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreatePlanPayload> & { isActive?: boolean };
    }) => updatePlan(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: plansKey }),
  });
};

export const useArchivePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archivePlan,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: plansKey }),
  });
};
