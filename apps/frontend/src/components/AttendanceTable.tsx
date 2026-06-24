import type { AttendanceRecord } from '../api/types';
import { formatDateTime } from '../utils/format';

export const AttendanceTable = ({
  attendance,
}: {
  attendance: AttendanceRecord[];
}) => (
  <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
    <table className="w-full min-w-[640px] text-left text-sm">
      <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
        <tr>
          <th className="px-4 py-3">Member</th>
          <th className="px-4 py-3">Phone</th>
          <th className="px-4 py-3">Source</th>
          <th className="px-4 py-3">Checked In</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-100">
        {attendance.map((record) => (
          <tr key={record.id} className="hover:bg-zinc-50/70">
            <td className="px-4 py-3 font-medium text-zinc-950">
              {record.member?.name ?? record.memberId}
            </td>
            <td className="px-4 py-3 text-zinc-600">
              {record.member?.phone ?? '—'}
            </td>
            <td className="px-4 py-3">
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                {record.source}
              </span>
            </td>
            <td className="px-4 py-3 text-zinc-600">
              {formatDateTime(record.checkedInAt)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
