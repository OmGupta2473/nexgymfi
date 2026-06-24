import { useState } from 'react';
import { useAuditLogs } from '../hooks/useAudit';
import { formatDateTime } from '../utils/format';

export const AuditPage = () => {
  const [page, setPage] = useState(1);
  const audit = useAuditLogs(page);
  const logs = audit.data?.items ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Audit logs</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Owner-only activity log from `/audit`.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <table className="w-full min-w-[780px] text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Entity</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-zinc-50/70">
                <td className="px-4 py-3">
                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                    {log.action}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-900">
                  {log.entity}
                  <span className="ml-2 font-mono text-xs text-zinc-400">
                    {log.entityId.slice(0, 8)}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-600">
                  {log.user?.email ?? log.userId}
                </td>
                <td className="px-4 py-3 text-zinc-600">{log.ipAddress ?? '—'}</td>
                <td className="px-4 py-3 text-zinc-600">
                  {formatDateTime(log.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!logs.length && !audit.isLoading ? (
          <p className="p-8 text-center text-sm text-zinc-500">
            No audit logs yet.
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-sm text-zinc-500">
          Page {audit.data?.meta.page ?? page} of {audit.data?.meta.lastPage ?? 1}
        </p>
        <button
          type="button"
          disabled={!audit.data || page >= audit.data.meta.lastPage}
          onClick={() => setPage((current) => current + 1)}
          className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
