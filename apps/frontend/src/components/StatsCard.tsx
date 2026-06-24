import type { LucideIcon } from 'lucide-react';

export const StatsCard = ({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  detail?: string;
}) => (
  <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-zinc-500">{label}</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
          {value}
        </p>
      </div>
      <div className="grid h-10 w-10 place-items-center rounded-md bg-teal-50 text-teal-700">
        <Icon className="h-5 w-5" />
      </div>
    </div>
    {detail ? <p className="mt-4 text-sm text-zinc-500">{detail}</p> : null}
  </div>
);
