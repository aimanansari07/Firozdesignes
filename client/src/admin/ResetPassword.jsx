import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService.js';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async ({ password }) => {
    setSubmitting(true);
    try {
      await authService.resetPassword(token, password);
      toast.success('Password reset successfully!');
      navigate('/admin/login');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Link is invalid or expired.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg bg-grain p-4">
      <Helmet>
        <title>Reset Password | Feroze Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-sm border border-border bg-surface p-8">
        <div className="mb-8 text-center">
          <span className="font-display text-3xl tracking-[0.3em] text-white">FEROZE</span>
          <p className="mt-1 font-body text-caption uppercase tracking-[0.35em] text-muted">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <p className="font-body text-caption text-muted mb-6">Enter your new password below.</p>

          <label className="block">
            <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">New Password</span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Required', minLength: { value: 8, message: 'Minimum 8 characters' } })}
                className="form-input pr-10"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="mt-1 block font-body text-caption text-automotive">{errors.password.message}</span>}
          </label>

          <label className="block">
            <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">Confirm Password</span>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                {...register('confirm', { required: 'Required', validate: (v) => v === watch('password') || 'Passwords do not match' })}
                className="form-input pr-10"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirm && <span className="mt-1 block font-body text-caption text-automotive">{errors.confirm.message}</span>}
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold py-3 font-body text-small uppercase tracking-wider text-bg transition hover:bg-gold-light disabled:opacity-60"
          >
            {submitting ? 'Saving…' : 'Reset Password'}
          </button>

          <Link to="/admin/login" className="block text-center font-body text-caption text-muted hover:text-white transition mt-2">
            ← Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}
