import { api } from './axios';
import type { PaginatedAuditLogs } from './types';

export const getAuditLogs = async (params?: {
  action?: string;
  entity?: string;
  userId?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get<PaginatedAuditLogs>('/audit', { params });
  return response.data;
};
