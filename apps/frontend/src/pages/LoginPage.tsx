import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/format';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? '/dashboard';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-3 text-sm font-semibold text-zinc-300"
        >
          <span className="grid h-10 w-10 place-items-center rounded-md bg-teal-400 text-zinc-950">
            <Dumbbell className="h-5 w-5" />
          </span>
          GymFlex
        </Link>

        <div className="rounded-lg border border-white/10 bg-white p-6 text-zinc-950 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Use the owner or staff account from your NestJS backend.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-zinc-300 px-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                autoComplete="email"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-zinc-700">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-zinc-300 px-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                autoComplete="current-password"
                minLength={8}
                required
              />
            </label>

            {error ? (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="h-11 w-full rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
