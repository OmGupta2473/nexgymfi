import { useQuery } from '@tanstack/react-query';
import {
  getDashboardRevenue,
  getDashboardSummary,
  getMembershipsExpiring,
} from '../api/dashboard.api';

export const useDashboardSummary = () =>
  useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: getDashboardSummary,
  });

export const useDashboardRevenue = () =>
  useQuery({
    queryKey: ['dashboard', 'revenue'],
    queryFn: getDashboardRevenue,
  });

export const useMembershipsExpiring = () =>
  useQuery({
    queryKey: ['dashboard', 'memberships-expiring'],
    queryFn: getMembershipsExpiring,
  });
