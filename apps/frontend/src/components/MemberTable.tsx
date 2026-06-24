import type { Member } from '../api/types';
import { formatDate } from '../utils/format';

export const MemberTable = ({
  members,
  onDelete,
}: {
  members: Member[];
  onDelete?: (id: string) => void;
}) => (
  <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
    <table className="w-full min-w-[760px] text-left text-sm">
      <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
        <tr>
          <th className="px-4 py-3">Member</th>
          <th className="px-4 py-3">Phone</th>
          <th className="px-4 py-3">Email</th>
          <th className="px-4 py-3">Joined</th>
          <th className="px-4 py-3">Emergency</th>
          {onDelete ? <th className="px-4 py-3 text-right">Action</th> : null}
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-100">
        {members.map((member) => (
          <tr key={member.id} className="hover:bg-zinc-50/70">
            <td className="px-4 py-3 font-medium text-zinc-950">{member.name}</td>
            <td className="px-4 py-3 text-zinc-600">{member.phone}</td>
            <td className="px-4 py-3 text-zinc-600">{member.email ?? '—'}</td>
            <td className="px-4 py-3 text-zinc-600">
              {formatDate(member.joinedAt)}
            </td>
            <td className="px-4 py-3 text-zinc-600">
              {member.emergencyContact ?? '—'}
            </td>
            {onDelete ? (
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onDelete(member.id)}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  Archive
                </button>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
