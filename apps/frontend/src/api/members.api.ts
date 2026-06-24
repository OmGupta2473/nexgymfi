import { api } from './axios';
import type { CreateMemberPayload, Member } from './types';

export const getMembers = async () => {
  const response = await api.get<Member[]>('/members');
  return response.data;
};

export const createMember = async (data: CreateMemberPayload) => {
  const response = await api.post<Member>('/members', data);
  return response.data;
};

export const updateMember = async (
  id: string,
  data: Partial<CreateMemberPayload>,
) => {
  const response = await api.patch<Member>(`/members/${id}`, data);
  return response.data;
};

export const deleteMember = async (id: string) => {
  const response = await api.delete(`/members/${id}`);
  return response.data;
};
