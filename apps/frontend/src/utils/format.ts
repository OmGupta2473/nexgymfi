export const formatMoney = (value: number | string | null | undefined) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value ?? 0));

export const formatDate = (value: string | null | undefined) =>
  value
    ? new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date(value))
    : '—';

export const formatDateTime = (value: string | null | undefined) =>
  value
    ? new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
      }).format(new Date(value))
    : '—';

export const getErrorMessage = (error: unknown) => {
  if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'data' in error.response
  ) {
    const data = error.response.data as { message?: string | string[] };

    if (Array.isArray(data.message)) {
      return data.message.join(', ');
    }

    if (data.message) {
      return data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong';
};
