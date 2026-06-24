import { api } from './axios';
import type { CreatePaymentPayload, Payment } from './types';

export const getPayments = async () => {
  const response = await api.get<Payment[]>('/payments');
  return response.data;
};

export const createPayment = async (data: CreatePaymentPayload) => {
  const response = await api.post<Payment>('/payments', data);
  return response.data;
};
