import { FormEvent, useState } from 'react';
import { AttendanceTable } from '../components/AttendanceTable';
import { useAttendanceToday, useManualCheckIn } from '../hooks/useAttendance';
import { useMembers } from '../hooks/useMembers';
import { getErrorMessage } from '../utils/format';

export const AttendancePage = () => {
  const attendance = useAttendanceToday();
  const members = useMembers();
  const manualCheckIn = useManualCheckIn();
  const [memberId, setMemberId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      await manualCheckIn.mutateAsync(memberId);
      setMemberId('');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Attendance</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Manual check-ins use the same backend membership validation as QR.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row"
      >
        <select
          value={memberId}
          onChange={(event) => setMemberId(event.target.value)}
          className="h-10 flex-1 rounded-md border border-zinc-300 px-3 text-sm"
          required
        >
          <option value="">Select member for manual check-in</option>
          {(members.data ?? []).map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} · {member.phone}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={manualCheckIn.isPending}
          className="h-10 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white disabled:opacity-60"
        >
          {manualCheckIn.isPending ? 'Checking in...' : 'Check in'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <AttendanceTable attendance={attendance.data ?? []} />
      </div>
    </div>
  );
};
