import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import authService from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for an existing session via the httpOnly cookie.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await authService.me();
        if (active) setAdmin(res.data);
      } catch {
        if (active) setAdmin(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await authService.login(email, password);
    setAdmin(res.data);
    return res.data;
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem('admin_token');
    try {
      await authService.logout();
    } finally {
      setAdmin(null);
    }
  }, []);

  const value = useMemo(
    () => ({ admin, isAuthenticated: Boolean(admin), loading, login, logout }),
    [admin, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within an AuthProvider');
  return ctx;
}

export default AuthContext;
