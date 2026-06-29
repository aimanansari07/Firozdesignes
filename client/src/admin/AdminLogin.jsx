import { useState } from 'react';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import useAuth from '../hooks/useAuth.js';

export default function AdminLogin() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!loading && isAuthenticated) {
    return <Navigate to={location.state?.from || '/admin/dashboard'} replace />;
  }

  const onSubmit = async ({ email, password }) => {
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success('Welcome back');
      navigate(location.state?.from || '/admin/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.friendlyMessage || 'Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg bg-grain p-4">
      <Helmet>
        <title>Admin Login | Feroze Designs</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-sm border border-border bg-surface p-8">
        <div className="mb-8 text-center">
          <span className="font-display text-3xl tracking-[0.3em] text-white">FEROZE</span>
          <p className="mt-1 font-body text-caption uppercase tracking-[0.35em] text-muted">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">Email</span>
            <input {...register('email', { required: 'Required' })} className="form-input" placeholder="admin@ferozedesigns.com" autoComplete="username" />
            {errors.email && <span className="mt-1 block font-body text-caption text-automotive">{errors.email.message}</span>}
          </label>

          <label className="block">
            <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">Password</span>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} {...register('password', { required: 'Required' })} className="form-input pr-10" placeholder="••••••••" autoComplete="current-password" />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="mt-1 block font-body text-caption text-automotive">{errors.password.message}</span>}
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 bg-gold py-3 font-body text-small uppercase tracking-wider text-bg transition hover:bg-gold-light disabled:opacity-60"
          >
            <Lock size={15} /> {submitting ? 'Signing in…' : 'Sign In'}
          </button>

          <Link to="/admin/forgot-password" className="block text-center font-body text-caption text-muted hover:text-white transition mt-3">
            Forgot password?
          </Link>
        </form>
      </div>
    </div>
  );
}
