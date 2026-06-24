import { api } from './axios';
import type { CreatePlanPayload, Plan } from './types';

export const getPlans = async () => {
  const response = await api.get<Plan[]>('/plans');
  return response.data;
};

export const createPlan = async (data: CreatePlanPayload) => {
  const response = await api.post<Plan>('/plans', data);
  return response.data;
};

export const updatePlan = async (
  id: string,
  data: Partial<CreatePlanPayload> & { isActive?: boolean },
) => {
  const response = await api.patch<Plan>(`/plans/${id}`, data);
  return response.data;
};

export const archivePlan = async (id: string) => {
  const response = await api.delete<Plan>(`/plans/${id}`);
  return response.data;
};
