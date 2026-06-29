import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from './Button.jsx';
import inquiryService from '../../services/inquiryService.js';

/**
 * Lightweight inquiry modal, pre-fillable with a project/product context.
 * @param {object} prefill { brand, inquiryType, projectType, productInterest }
 */
export default function InquiryModal({ open, onClose, title = 'Make an Enquiry', prefill = {} }) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      await inquiryService.submit({ ...prefill, ...values });
      toast.success("Thank you — we'll be in touch within 24–48 hours.");
      reset();
      onClose();
    } catch (err) {
      toast.error(err.friendlyMessage || 'Could not submit. Please try WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md border border-border bg-surface p-8"
        >
          <div className="mb-6 flex items-start justify-between">
            <h3 className="font-display text-2xl font-light text-white">{title}</h3>
            <button onClick={onClose} aria-label="Close" className="text-muted transition hover:text-gold">
              <X size={22} />
            </button>
          </div>

          {prefill.productInterest && (
            <p className="mb-4 font-body text-small text-muted">
              Regarding: <span className="text-gold">{prefill.productInterest}</span>
            </p>
          )}
          {prefill.projectType && !prefill.productInterest && (
            <p className="mb-4 font-body text-small text-muted">
              Regarding: <span className="text-gold">{prefill.projectType}</span>
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field label="Name" error={errors.name}>
              <input
                {...register('name', { required: 'Required' })}
                className="form-input"
                placeholder="Your name"
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                {...register('email', { required: 'Required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
                className="form-input"
                placeholder="you@email.com"
              />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input {...register('phone', { required: 'Required' })} className="form-input" placeholder="+91 …" />
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea
                {...register('message', { required: 'Required' })}
                rows={3}
                className="form-input resize-none"
                placeholder="Tell us about your requirement…"
              />
            </Field>

            <Button type="submit" variant="gold" size="md" className="w-full" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send Enquiry'}
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block font-body text-caption uppercase tracking-wider text-muted">{label}</span>
      {children}
      {error && <span className="mt-1 block font-body text-caption text-automotive">{error.message}</span>}
    </label>
  );
}
