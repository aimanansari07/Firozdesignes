import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { X, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import testimonialService from '../../services/testimonialService.js';

/** Modal create/edit form for a testimonial. */
export default function TestimonialForm({ open, onClose, onSaved, initial }) {
  const isEdit = Boolean(initial?._id);
  const [saving, setSaving] = useState(false);
  const [rating, setRating] = useState(initial?.rating || 5);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initial?.name || '',
      designation: initial?.designation || '',
      brand: initial?.brand || 'both',
      quote: initial?.quote || '',
      published: initial?.published ?? true,
      order: initial?.order || 0,
    },
  });

  if (!open) return null;

  const onSubmit = async (values) => {
    setSaving(true);
    const payload = { ...values, rating: Number(rating), order: Number(values.order) || 0 };
    try {
      if (isEdit) await testimonialService.update(initial._id, payload);
      else await testimonialService.create(payload);
      toast.success(isEdit ? 'Testimonial updated' : 'Testimonial added');
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.friendlyMessage || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="w-full max-w-lg border border-border bg-surface p-8" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-2xl font-light text-white">{isEdit ? 'Edit' : 'New'} Testimonial</h3>
          <button onClick={onClose} className="text-muted hover:text-gold" aria-label="Close"><X size={22} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Quote *" error={errors.quote}>
            <textarea {...register('quote', { required: 'Required' })} rows={3} className="form-input resize-none" placeholder="What the client said…" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name *" error={errors.name}><input {...register('name', { required: 'Required' })} className="form-input" /></Field>
            <Field label="Designation"><input {...register('designation')} className="form-input" placeholder="Director, ABC Hotels" /></Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Brand">
              <select {...register('brand')} className="form-input">
                <option value="interiors">Interiors</option>
                <option value="automotive">Automotive</option>
                <option value="both">Both</option>
              </select>
            </Field>
            <Field label="Rating">
              <div className="flex gap-1 pt-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                    <Star size={22} className={n <= rating ? 'fill-gold text-gold' : 'text-border'} />
                  </button>
                ))}
              </div>
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Sort Order"><input type="number" {...register('order')} className="form-input" /></Field>
            <label className="flex items-center gap-3 pt-7">
              <input type="checkbox" {...register('published')} className="h-4 w-4 accent-[#C9A96E]" />
              <span className="font-body text-small text-white">Published</span>
            </label>
          </div>

          <button type="submit" disabled={saving} className="w-full bg-gold py-3 font-body text-small uppercase tracking-wider text-bg transition hover:bg-gold-light disabled:opacity-60">
            {saving ? 'Saving…' : isEdit ? 'Update' : 'Add Testimonial'}
          </button>
        </form>
      </div>
    </div>,
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
