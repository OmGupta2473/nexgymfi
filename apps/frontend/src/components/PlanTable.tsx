import type { Plan } from '../api/types';
import { formatMoney } from '../utils/format';

export const PlanTable = ({
  plans,
  onArchive,
}: {
  plans: Plan[];
  onArchive?: (id: string) => void;
}) => (
  <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
    <table className="w-full min-w-[680px] text-left text-sm">
      <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
        <tr>
          <th className="px-4 py-3">Plan</th>
          <th className="px-4 py-3">Duration</th>
          <th className="px-4 py-3">Price</th>
          <th className="px-4 py-3">Status</th>
          {onArchive ? <th className="px-4 py-3 text-right">Action</th> : null}
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-100">
        {plans.map((plan) => (
          <tr key={plan.id} className="hover:bg-zinc-50/70">
            <td className="px-4 py-3">
              <p className="font-medium text-zinc-950">{plan.name}</p>
              <p className="mt-1 max-w-xl text-xs text-zinc-500">
                {plan.description ?? 'No description'}
              </p>
            </td>
            <td className="px-4 py-3 text-zinc-600">{plan.durationDays} days</td>
            <td className="px-4 py-3 font-medium text-zinc-900">
              {formatMoney(plan.price)}
            </td>
            <td className="px-4 py-3">
              <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700">
                {plan.isActive ? 'Active' : 'Inactive'}
              </span>
            </td>
            {onArchive ? (
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onArchive(plan.id)}
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
