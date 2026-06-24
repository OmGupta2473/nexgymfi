import { FormEvent, useMemo, useState } from 'react';
import { PaymentTable } from '../components/PaymentTable';
import type { PaymentMethod, PaymentType } from '../api/types';
import { useMembers } from '../hooks/useMembers';
import { useMemberships } from '../hooks/useMemberships';
import { useCreatePayment, usePayments } from '../hooks/usePayments';
import { getErrorMessage } from '../utils/format';

export const PaymentsPage = () => {
  const payments = usePayments();
  const members = useMembers();
  const memberships = useMemberships();
  const createPayment = useCreatePayment();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    memberId: '',
    membershipId: '',
    amount: '',
    type: 'NEW_MEMBERSHIP' as PaymentType,
    method: 'UPI' as PaymentMethod,
    notes: '',
  });

  const memberMemberships = useMemo(
    () =>
      (memberships.data ?? []).filter(
        (membership) => membership.memberId === form.memberId,
      ),
    [form.memberId, memberships.data],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      await createPayment.mutateAsync({
        memberId: form.memberId,
        membershipId: form.membershipId || undefined,
        amount: Number(form.amount),
        type: form.type,
        method: form.method,
        notes: form.notes || undefined,
      });
      setForm({
        memberId: '',
        membershipId: '',
        amount: '',
        type: 'NEW_MEMBERSHIP',
        method: 'UPI',
        notes: '',
      });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Payments</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Records are created through `/payments` and included with member data.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="overflow-x-auto">
          <PaymentTable payments={payments.data ?? []} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-zinc-200 bg-white p-5"
        >
          <h3 className="font-semibold text-zinc-950">Record payment</h3>
          <div className="mt-4 grid gap-3">
            <select
              value={form.memberId}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  memberId: event.target.value,
                  membershipId: '',
                }))
              }
              className="h-10 rounded-md border border-zinc-300 px-3 text-sm"
              required
            >
              <option value="">Select member</option>
              {(members.data ?? []).map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            <select
              value={form.membershipId}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  membershipId: event.target.value,
                }))
              }
              className="h-10 rounded-md border border-zinc-300 px-3 text-sm"
            >
              <option value="">No membership link</option>
              {memberMemberships.map((membership) => (
                <option key={membership.id} value={membership.id}>
                  {membership.plan?.name ?? membership.planId} · {membership.status}
                </option>
              ))}
            </select>
            <input
              value={form.amount}
              onChange={(event) =>
                setForm((current) => ({ ...current, amount: event.target.value }))
              }
              type="number"
              min={1}
              step="0.01"
              placeholder="Amount"
              className="h-10 rounded-md border border-zinc-300 px-3 text-sm"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.type}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    type: event.target.value as PaymentType,
                  }))
                }
                className="h-10 rounded-md border border-zinc-300 px-3 text-sm"
              >
                <option value="NEW_MEMBERSHIP">New</option>
                <option value="RENEWAL">Renewal</option>
                <option value="PARTIAL">Partial</option>
                <option value="REFUND">Refund</option>
              </select>
              <select
                value={form.method}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    method: event.target.value as PaymentMethod,
                  }))
                }
                className="h-10 rounded-md border border-zinc-300 px-3 text-sm"
              >
                <option value="UPI">UPI</option>
                <option value="CASH">Cash</option>
                <option value="CARD">Card</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <textarea
              value={form.notes}
              onChange={(event) =>
                setForm((current) => ({ ...current, notes: event.target.value }))
              }
              placeholder="Notes"
              className="min-h-20 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={createPayment.isPending}
              className="h-10 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white disabled:opacity-60"
            >
              {createPayment.isPending ? 'Recording...' : 'Record payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
