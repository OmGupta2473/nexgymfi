import { LogOut, QrCode, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const { gym, logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-8">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-zinc-500">
            {gym?.slug ?? 'gymflex'}
          </p>
          <h1 className="truncate text-lg font-semibold text-zinc-950">
            {gym?.name ?? 'GymFlex'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {gym?.slug ? (
            <Link
              to="/qr-print"
              className="hidden h-10 items-center gap-2 rounded-md border border-zinc-200 px-3 text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 sm:flex"
            >
              <QrCode className="h-4 w-4" />
              QR
            </Link>
          ) : null}
          <div className="hidden items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 sm:flex">
            <UserCircle className="h-4 w-4 text-zinc-500" />
            <div className="max-w-44 truncate text-sm">
              <span className="block truncate font-medium text-zinc-800">
                {user?.email}
              </span>
              <span className="block text-xs text-zinc-500">{user?.role}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="grid h-10 w-10 place-items-center rounded-md border border-zinc-200 text-zinc-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
