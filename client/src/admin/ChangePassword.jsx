import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService.js';

export default function ChangePassword() {
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState({ current: false, newP: false, confirm: false });
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  const toggle = (field) => setShow((s) => ({ ...s, [field]: !s[field] }));

  const onSubmit = async ({ currentPassword, newPassword }) => {
    setSubmitting(true);
    try {
      await authService.changePassword(currentPassword, newPassword);
      toast.success('Password changed successfully.');
      reset();
    } catch (err) {
      toast.error(err.friendlyMessage || 'Failed to change password.');
    } finally {
      setSubmitting(false);
    }
  };

  const Field = ({ id, label, showKey, reg }) => (
    <label className="block">
      <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">{label}</span>
      <div className="relative">
        <input type={show[showKey] ? 'text' : 'password'} {...reg} className="form-input pr-10" placeholder="••••••••" />
        <button type="button" onClick={() => toggle(showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition">
          {show[showKey] ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {errors[id] && <span className="mt-1 block font-body text-caption text-automotive">{errors[id].message}</span>}
    </label>
  );

  return (
    <div className="max-w-md">
      <h1 className="font-display text-2xl tracking-widest text-white mb-1">Change Password</h1>
      <p className="font-body text-caption text-muted mb-8">Update your admin account password.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 border border-border bg-surface p-6">
        <Field
          id="currentPassword"
          label="Current Password"
          showKey="current"
          reg={register('currentPassword', { required: 'Required' })}
        />
        <Field
          id="newPassword"
          label="New Password"
          showKey="newP"
          reg={register('newPassword', { required: 'Required', minLength: { value: 8, message: 'Minimum 8 characters' } })}
        />
        <Field
          id="confirm"
          label="Confirm New Password"
          showKey="confirm"
          reg={register('confirm', { required: 'Required', validate: (v) => v === watch('newPassword') || 'Passwords do not match' })}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gold py-3 font-body text-small uppercase tracking-wider text-bg transition hover:bg-gold-light disabled:opacity-60"
        >
          {submitting ? 'Saving…' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
