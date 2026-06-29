import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

/** Guards admin routes: redirects to /admin/login when not authenticated. */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <span className="data text-sm text-muted">Authenticating…</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
