import {
  Activity,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  ListChecks,
  Users,
  WalletCards,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/members', label: 'Members', icon: Users },
  { to: '/plans', label: 'Plans', icon: ClipboardList },
  { to: '/payments', label: 'Payments', icon: CreditCard },
  { to: '/attendance', label: 'Attendance', icon: Activity },
  { to: '/audit', label: 'Audit', icon: ListChecks },
];

export const Sidebar = () => (
  <aside className="hidden w-64 shrink-0 border-r border-zinc-200 bg-zinc-950 text-zinc-100 lg:block">
    <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
      <div className="grid h-9 w-9 place-items-center rounded-md bg-teal-400 text-zinc-950">
        <WalletCards className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-semibold">GymFlex</p>
        <p className="text-xs text-zinc-400">Owner console</p>
      </div>
    </div>
    <nav className="space-y-1 p-3">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            [
              'flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition',
              isActive
                ? 'bg-white text-zinc-950'
                : 'text-zinc-300 hover:bg-white/10 hover:text-white',
            ].join(' ')
          }
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);
