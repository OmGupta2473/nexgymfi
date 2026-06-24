import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getMe, loginRequest, logoutRequest, refreshRequest } from '../api/auth.api';
import {
  clearStoredTokens,
  getStoredTokens,
  setStoredTokens,
  setUnauthorizedHandler,
} from '../api/axios';
import type { AuthTokens, AuthUser, Gym, LoginPayload } from '../api/types';

interface AuthContextValue {
  user: AuthUser | null;
  gym: Gym | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<AuthTokens>;
  refetchMe: () => Promise<AuthUser | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tokens, setTokens] = useState<AuthTokens>(() => getStoredTokens());
  const [loading, setLoading] = useState(true);

  const resetSession = useCallback(() => {
    clearStoredTokens();
    setTokens({ accessToken: null, refreshToken: null });
    setUser(null);
    queryClient.clear();
  }, [queryClient]);

  const refetchMe = useCallback(async () => {
    try {
      const nextUser = await getMe();
      setUser(nextUser);
      return nextUser;
    } catch {
      resetSession();
      return null;
    }
  }, [resetSession]);

  const refresh = useCallback(async () => {
    const current = getStoredTokens();

    if (!current.refreshToken) {
      throw new Error('Missing refresh token');
    }

    const nextTokens = await refreshRequest(current.refreshToken);
    setStoredTokens(nextTokens);
    setTokens(nextTokens);
    return nextTokens;
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const nextTokens = await loginRequest(payload);
      setStoredTokens(nextTokens);
      setTokens(nextTokens);
      await refetchMe();
    },
    [refetchMe],
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      resetSession();
    }
  }, [resetSession]);

  useEffect(() => {
    const syncTokens = () => setTokens(getStoredTokens());

    window.addEventListener('gymflex:tokens-changed', syncTokens);
    return () => window.removeEventListener('gymflex:tokens-changed', syncTokens);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      resetSession();

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    });

    return () => setUnauthorizedHandler(null);
  }, [resetSession]);

  useEffect(() => {
    let active = true;

    const boot = async () => {
      try {
        const current = getStoredTokens();

        if (!current.accessToken && current.refreshToken) {
          await refresh();
        }

        if (getStoredTokens().accessToken) {
          await refetchMe();
        }
      } catch {
        resetSession();
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    boot();

    return () => {
      active = false;
    };
  }, [refetchMe, refresh]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      gym: user?.gym ?? null,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      loading,
      login,
      logout,
      refresh,
      refetchMe,
    }),
    [loading, login, logout, refetchMe, refresh, tokens, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
