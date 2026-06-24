import type { Payment } from '../api/types';
import { formatDateTime, formatMoney } from '../utils/format';

export const PaymentTable = ({ payments }: { payments: Payment[] }) => (
  <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
    <table className="w-full min-w-[760px] text-left text-sm">
      <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
        <tr>
          <th className="px-4 py-3">Receipt</th>
          <th className="px-4 py-3">Member</th>
          <th className="px-4 py-3">Amount</th>
          <th className="px-4 py-3">Type</th>
          <th className="px-4 py-3">Method</th>
          <th className="px-4 py-3">Paid At</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-100">
        {payments.map((payment) => (
          <tr key={payment.id} className="hover:bg-zinc-50/70">
            <td className="px-4 py-3 font-mono text-xs text-zinc-600">
              {payment.receiptNumber ?? payment.id.slice(0, 8)}
            </td>
            <td className="px-4 py-3 font-medium text-zinc-950">
              {payment.member?.name ?? payment.memberId}
            </td>
            <td className="px-4 py-3 font-medium text-zinc-900">
              {formatMoney(payment.amount)}
            </td>
            <td className="px-4 py-3 text-zinc-600">{payment.type}</td>
            <td className="px-4 py-3 text-zinc-600">{payment.method}</td>
            <td className="px-4 py-3 text-zinc-600">
              {formatDateTime(payment.paidAt)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
