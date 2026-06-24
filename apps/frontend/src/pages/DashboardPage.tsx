import {
  Activity,
  CalendarClock,
  IndianRupee,
  QrCode,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard } from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';
import {
  useDashboardRevenue,
  useDashboardSummary,
  useMembershipsExpiring,
} from '../hooks/useDashboard';
import { useAttendanceToday } from '../hooks/useAttendance';
import { formatDate, formatMoney } from '../utils/format';

export const DashboardPage = () => {
  const { gym } = useAuth();
  const summary = useDashboardSummary();
  const revenue = useDashboardRevenue();
  const expiring = useMembershipsExpiring();
  const attendance = useAttendanceToday();
  const checkInUrl = gym?.slug ? `/checkin/${gym.slug}` : '#';

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Live numbers from the NestJS API.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to={checkInUrl}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <QrCode className="h-4 w-4" />
            Public check-in
          </Link>
          <Link
            to="/qr-print"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            <QrCode className="h-4 w-4" />
            Print QR
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          icon={Users}
          label="Total members"
          value={summary.data?.totalMembers ?? '—'}
          detail="Active and archived members are separated by the backend."
        />
        <StatsCard
          icon={CalendarClock}
          label="Active memberships"
          value={summary.data?.activeMemberships ?? '—'}
          detail="Members with an active membership record."
        />
        <StatsCard
          icon={Activity}
          label="Today's check-ins"
          value={summary.data?.todayCheckins ?? '—'}
          detail={`${attendance.data?.length ?? 0} records loaded in table views.`}
        />
        <StatsCard
          icon={IndianRupee}
          label="Month revenue"
          value={formatMoney(revenue.data?.monthRevenue)}
          detail={`Today: ${formatMoney(summary.data?.todayRevenue)}`}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-zinc-950">Today’s attendance</h3>
            <Link
              to="/attendance"
              className="text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              Manage
            </Link>
          </div>
          <div className="space-y-3">
            {(attendance.data ?? []).slice(0, 6).map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between gap-3 rounded-md border border-zinc-100 px-3 py-2"
              >
                <div>
                  <p className="font-medium text-zinc-900">
                    {record.member?.name ?? record.memberId}
                  </p>
                  <p className="text-xs text-zinc-500">{record.source}</p>
                </div>
                <p className="text-sm text-zinc-500">
                  {new Date(record.checkedInAt).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            ))}
            {!attendance.data?.length ? (
              <p className="rounded-md bg-zinc-50 px-3 py-8 text-center text-sm text-zinc-500">
                No check-ins yet today.
              </p>
            ) : null}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <h3 className="font-semibold text-zinc-950">Expiring this week</h3>
          <div className="mt-4 space-y-3">
            {(expiring.data ?? []).map((membership) => (
              <div
                key={membership.id}
                className="rounded-md border border-zinc-100 px-3 py-2"
              >
                <p className="font-medium text-zinc-900">
                  {membership.member?.name ?? membership.memberId}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {membership.plan?.name ?? 'Plan'} ends {formatDate(membership.endDate)}
                </p>
              </div>
            ))}
            {!expiring.data?.length ? (
              <p className="rounded-md bg-zinc-50 px-3 py-8 text-center text-sm text-zinc-500">
                No memberships expiring in the next 7 days.
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};
