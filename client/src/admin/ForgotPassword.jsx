import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { authService } from '../services/authService.js';

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ({ email }) => {
    setSubmitting(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg bg-grain p-4">
      <Helmet>
        <title>Forgot Password | Feroze Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-sm border border-border bg-surface p-8">
        <div className="mb-8 text-center">
          <span className="font-display text-3xl tracking-[0.3em] text-white">FEROZE</span>
          <p className="mt-1 font-body text-caption uppercase tracking-[0.35em] text-muted">Admin Panel</p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
              <span className="text-gold text-xl">✓</span>
            </div>
            <p className="font-body text-small text-white">Reset link sent!</p>
            <p className="font-body text-caption text-muted">Check your email inbox. The link expires in 30 minutes.</p>
            <Link to="/admin/login" className="block mt-4 font-body text-caption text-gold hover:text-gold-light transition">
              ← Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="font-body text-caption text-muted mb-6">Enter your admin email and we'll send you a password reset link.</p>

            <label className="block">
              <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">Email</span>
              <input
                {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/i, message: 'Valid email required' } })}
                className="form-input"
                placeholder="admin@ferozedesigns.com"
                autoComplete="email"
              />
              {errors.email && <span className="mt-1 block font-body text-caption text-automotive">{errors.email.message}</span>}
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gold py-3 font-body text-small uppercase tracking-wider text-bg transition hover:bg-gold-light disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Send Reset Link'}
            </button>

            <Link to="/admin/login" className="block text-center font-body text-caption text-muted hover:text-white transition mt-2">
              ← Back to Login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
