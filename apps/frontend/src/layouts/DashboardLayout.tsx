import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export const DashboardLayout = ({ children }: { children?: ReactNode }) => (
  <div className="min-h-screen bg-zinc-100 text-zinc-950">
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  </div>
);
