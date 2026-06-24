import { useQuery } from '@tanstack/react-query';
import { getAuditLogs } from '../api/audit.api';

export const useAuditLogs = (page = 1) =>
  useQuery({
    queryKey: ['audit', page],
    queryFn: () => getAuditLogs({ page, limit: 20 }),
  });
