import { useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import useApi from '../../hooks/useApi.js';
import testimonialService from '../../services/testimonialService.js';
import TestimonialForm from './TestimonialForm.jsx';

export default function TestimonialsList() {
  const { data, loading, error, refetch } = useApi(() => testimonialService.adminList(), []);
  const items = data?.data || [];
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (t) => {
    setEditing(t);
    setOpen(true);
  };

  const onDelete = async (t) => {
    if (!window.confirm(`Delete testimonial from “${t.name}”?`)) return;
    try {
      await testimonialService.remove(t._id);
      toast.success('Deleted');
      refetch();
    } catch (err) {
      toast.error(err.friendlyMessage || 'Failed');
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-light text-white">Testimonials</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-gold px-4 py-2 font-body text-small text-bg transition hover:bg-gold-light">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="h-40 animate-pulse border border-border bg-surface" />
      ) : error ? (
        <p className="border border-automotive/40 bg-automotive/10 px-4 py-3 font-body text-small text-automotive">Could not load testimonials. {error}</p>
      ) : items.length === 0 ? (
        <div className="border border-border bg-surface py-16 text-center font-body text-small text-muted">No testimonials yet.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((t) => (
            <div key={t._id} className="border border-border bg-surface p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => openEdit(t)} className="text-muted hover:text-gold" aria-label="Edit"><Pencil size={15} /></button>
                  <button onClick={() => onDelete(t)} className="text-muted hover:text-automotive" aria-label="Delete"><Trash2 size={15} /></button>
                </div>
              </div>
              <p className="mt-3 font-body text-small text-white/90">“{t.quote}”</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="font-body text-small text-gold">{t.name}</div>
                  <div className="font-body text-caption text-muted">{t.designation}</div>
                </div>
                <span className="font-mono text-caption uppercase text-muted">
                  {t.brand} · {t.published ? 'live' : 'draft'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <TestimonialForm key={editing?._id || 'new'} open={open} initial={editing} onClose={() => setOpen(false)} onSaved={refetch} />
    </div>
  );
}
