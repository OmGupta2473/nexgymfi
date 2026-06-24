import { FormEvent, useMemo, useState } from 'react';
import { MemberTable } from '../components/MemberTable';
import type { Gender } from '../api/types';
import { useMembers, useCreateMember, useDeleteMember } from '../hooks/useMembers';
import { usePlans } from '../hooks/usePlans';
import {
  useCreateMembership,
  useMemberships,
} from '../hooks/useMemberships';
import { formatDate, getErrorMessage } from '../utils/format';

const todayIso = () => new Date().toISOString().slice(0, 10);

export const MembersPage = () => {
  const members = useMembers();
  const plans = usePlans();
  const memberships = useMemberships();
  const createMember = useCreateMember();
  const deleteMember = useDeleteMember();
  const createMembership = useCreateMembership();
  const [error, setError] = useState('');
  const [memberForm, setMemberForm] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    emergencyContact: '',
  });
  const [membershipForm, setMembershipForm] = useState({
    memberId: '',
    planId: '',
    startDate: todayIso(),
  });

  const activeMemberships = useMemo(
    () => (memberships.data ?? []).filter((item) => item.status === 'ACTIVE'),
    [memberships.data],
  );

  const handleCreateMember = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      await createMember.mutateAsync({
        name: memberForm.name,
        phone: memberForm.phone,
        email: memberForm.email || undefined,
        gender: (memberForm.gender || undefined) as Gender | undefined,
        emergencyContact: memberForm.emergencyContact || undefined,
      });
      setMemberForm({
        name: '',
        phone: '',
        email: '',
        gender: '',
        emergencyContact: '',
      });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleCreateMembership = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      await createMembership.mutateAsync(membershipForm);
      setMembershipForm({ memberId: '', planId: '', startDate: todayIso() });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Members</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Create members, assign plans, and let the backend own membership state.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-4">
          <div className="overflow-x-auto">
            <MemberTable
              members={members.data ?? []}
              onDelete={(id) => {
                if (window.confirm('Archive this member?')) {
                  void deleteMember.mutateAsync(id);
                }
              }}
            />
          </div>
          {!members.data?.length && !members.isLoading ? (
            <p className="rounded-md bg-white p-8 text-center text-sm text-zinc-500">
              No members yet.
            </p>
          ) : null}
        </section>

        <aside className="space-y-6">
          <form
            onSubmit={handleCreateMember}
            className="rounded-lg border border-zinc-200 bg-white p-5"
          >
            <h3 className="font-semibold text-zinc-950">New member</h3>
            <div className="mt-4 grid gap-3">
              <input
                value={memberForm.name}
                onChange={(event) =>
                  setMemberForm((form) => ({ ...form, name: event.target.value }))
                }
                placeholder="Name"
                className="h-10 rounded-md border border-zinc-300 px-3 text-sm"
                required
              />
              <input
                value={memberForm.phone}
                onChange={(event) =>
                  setMemberForm((form) => ({ ...form, phone: event.target.value }))
                }
                placeholder="Phone"
                className="h-10 rounded-md border border-zinc-300 px-3 text-sm"
                required
              />
              <input
                value={memberForm.email}
                onChange={(event) =>
                  setMemberForm((form) => ({ ...form, email: event.target.value }))
                }
                placeholder="Email"
                type="email"
                className="h-10 rounded-md border border-zinc-300 px-3 text-sm"
              />
              <select
                value={memberForm.gender}
                onChange={(event) =>
                  setMemberForm((form) => ({ ...form, gender: event.target.value }))
                }
                className="h-10 rounded-md border border-zinc-300 px-3 text-sm"
              >
                <option value="">Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              <input
                value={memberForm.emergencyContact}
                onChange={(event) =>
                  setMemberForm((form) => ({
                    ...form,
                    emergencyContact: event.target.value,
                  }))
                }
                placeholder="Emergency contact"
                className="h-10 rounded-md border border-zinc-300 px-3 text-sm"
              />
              <button
                type="submit"
                disabled={createMember.isPending}
                className="h-10 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white disabled:opacity-60"
              >
                {createMember.isPending ? 'Saving...' : 'Create member'}
              </button>
            </div>
          </form>

          <form
            onSubmit={handleCreateMembership}
            className="rounded-lg border border-zinc-200 bg-white p-5"
          >
            <h3 className="font-semibold text-zinc-950">Assign membership</h3>
            <div className="mt-4 grid gap-3">
              <select
                value={membershipForm.memberId}
                onChange={(event) =>
                  setMembershipForm((form) => ({
                    ...form,
                    memberId: event.target.value,
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
                value={membershipForm.planId}
                onChange={(event) =>
                  setMembershipForm((form) => ({
                    ...form,
                    planId: event.target.value,
                  }))
                }
                className="h-10 rounded-md border border-zinc-300 px-3 text-sm"
                required
              >
                <option value="">Select plan</option>
                {(plans.data ?? []).map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
              <input
                value={membershipForm.startDate}
                onChange={(event) =>
                  setMembershipForm((form) => ({
                    ...form,
                    startDate: event.target.value,
                  }))
                }
                type="date"
                className="h-10 rounded-md border border-zinc-300 px-3 text-sm"
                required
              />
              <button
                type="submit"
                disabled={createMembership.isPending}
                className="h-10 rounded-md bg-teal-600 px-4 text-sm font-semibold text-white disabled:opacity-60"
              >
                {createMembership.isPending ? 'Assigning...' : 'Assign plan'}
              </button>
            </div>
          </form>
        </aside>
      </div>

      <section className="rounded-lg border border-zinc-200 bg-white p-5">
        <h3 className="font-semibold text-zinc-950">Active memberships</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {activeMemberships.map((membership) => (
            <div
              key={membership.id}
              className="rounded-md border border-zinc-100 p-3 text-sm"
            >
              <p className="font-medium text-zinc-950">
                {membership.member?.name ?? membership.memberId}
              </p>
              <p className="mt-1 text-zinc-500">
                {membership.plan?.name ?? membership.planId}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Ends {formatDate(membership.endDate)}
              </p>
            </div>
          ))}
          {!activeMemberships.length ? (
            <p className="text-sm text-zinc-500">No active memberships yet.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
};
