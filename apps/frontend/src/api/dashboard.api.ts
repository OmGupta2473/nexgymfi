import { api } from './axios';
import type {
  DashboardRevenue,
  DashboardSummary,
  Membership,
} from './types';

export const getDashboardSummary = async () => {
  const response = await api.get<DashboardSummary>('/dashboard/summary');
  return response.data;
};

export const getDashboardRevenue = async () => {
  const response = await api.get<DashboardRevenue>('/dashboard/revenue');
  return response.data;
};

export const getMembershipsExpiring = async () => {
  const response = await api.get<Membership[]>(
    '/dashboard/memberships-expiring',
  );
  return response.data;
};
