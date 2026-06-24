import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPayment, getPayments } from '../api/payments.api';

export const paymentsKey = ['payments'] as const;

export const usePayments = () =>
  useQuery({
    queryKey: paymentsKey,
    queryFn: getPayments,
  });

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentsKey });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
