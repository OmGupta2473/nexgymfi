import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodayAttendance, manualCheckIn } from '../api/attendance.api';

export const attendanceTodayKey = ['attendance', 'today'] as const;

export const useAttendanceToday = () =>
  useQuery({
    queryKey: attendanceTodayKey,
    queryFn: getTodayAttendance,
  });

export const useManualCheckIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: manualCheckIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: attendanceTodayKey });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
