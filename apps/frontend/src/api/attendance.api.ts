import { api, publicApi } from './axios';
import type { AttendanceRecord, PublicMember } from './types';

export const getTodayAttendance = async () => {
  const response = await api.get<AttendanceRecord[]>('/attendance/today');
  return response.data;
};

export const manualCheckIn = async (memberId: string) => {
  const response = await api.post<AttendanceRecord>('/attendance/check-in', {
    memberId,
  });
  return response.data;
};

export const getMemberAttendance = async (memberId: string) => {
  const response = await api.get<AttendanceRecord[]>(
    `/attendance/member/${memberId}`,
  );
  return response.data;
};

export const autoCheckIn = async (data: {
  deviceToken: string;
  gymSlug: string;
  fingerprint: string;
}) => {
  const response = await publicApi.post<AttendanceRecord>(
    '/attendance/auto',
    data,
  );
  return response.data;
};

export const registerDevice = async (data: {
  memberId: string;
  gymSlug: string;
  deviceToken: string;
  fingerprint: string;
  label: string;
}) => {
  const response = await publicApi.post('/attendance/register-device', data);
  return response.data;
};

export const getPublicMemberList = async (gymSlug: string) => {
  const response = await publicApi.get<PublicMember[]>(
    `/attendance/public-list/${gymSlug}`,
  );
  return response.data;
};
