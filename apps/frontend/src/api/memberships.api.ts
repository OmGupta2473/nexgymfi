import { api } from './axios';
import type { CreateMembershipPayload, Membership } from './types';

export const getMemberships = async () => {
  const response = await api.get<Membership[]>('/memberships');
  return response.data;
};

export const createMembership = async (data: CreateMembershipPayload) => {
  const response = await api.post<Membership>('/memberships', data);
  return response.data;
};

export const freezeMembership = async (id: string) => {
  const response = await api.post<Membership>(`/memberships/${id}/freeze`);
  return response.data;
};

export const resumeMembership = async (id: string) => {
  const response = await api.post<Membership>(`/memberships/${id}/resume`);
  return response.data;
};

export const cancelMembership = async (id: string) => {
  const response = await api.post<Membership>(`/memberships/${id}/cancel`);
  return response.data;
};

export const extendMembership = async (id: string, days: number) => {
  const response = await api.post<Membership>(`/memberships/${id}/extend`, {
    days,
  });
  return response.data;
};
