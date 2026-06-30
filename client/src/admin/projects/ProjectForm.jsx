import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import projectService from '../../services/projectService.js';
import ImageUploader from '../ImageUploader.jsx';
import { PROJECT_CATEGORIES } from '../../utils/constants.js';

const CATS = PROJECT_CATEGORIES.filter((c) => c.key !== 'all');

export default function ProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { category: 'hospitality', featured: false, published: true } });

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const res = await projectService.adminGet(id);
        const p = res.data;
        reset({
          title: p.title,
          category: p.category,
          shortDescription: p.shortDescription,
          description: p.description,
          location: p.location,
          year: p.year,
          area: p.area,
          client: p.client,
          featured: p.featured,
          published: p.published,
          order: p.order,
        });
        setImages(p.images || []);
      } catch (err) {
        toast.error(err.friendlyMessage || 'Could not load project');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit, reset]);

  const onSubmit = async (values) => {
    setSaving(true);
    const payload = {
      ...values,
      year: values.year ? Number(values.year) : undefined,
      order: values.order !== '' && values.order != null ? Number(values.order) : 1,
      images,
    };
    try {
      if (isEdit) await projectService.update(id, payload);
      else await projectService.create(payload);
      toast.success(isEdit ? 'Project updated' : 'Project created');
      navigate('/admin/projects');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="h-64 animate-pulse border border-border bg-surface" />;

  return (
    <div className="max-w-3xl">
      <Link to="/admin/projects" className="mb-6 inline-flex items-center gap-2 font-body text-small text-muted hover:text-gold">
        <ArrowLeft size={16} /> Back to Projects
      </Link>
      <h1 className="mb-8 font-display text-3xl font-light text-white">{isEdit ? 'Edit Project' : 'New Project'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormRow label="Title *" error={errors.title}>
          <input {...register('title', { required: 'Required' })} className="form-input" placeholder="Project name" />
        </FormRow>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormRow label="Category *">
            <select {...register('category')} className="form-input">
              {CATS.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
          </FormRow>
          <FormRow label="Location">
            <input {...register('location')} className="form-input" placeholder="Mumbai, India" />
          </FormRow>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <FormRow label="Year"><input type="number" {...register('year')} className="form-input" placeholder="2024" /></FormRow>
          <FormRow label="Area"><input {...register('area')} className="form-input" placeholder="4,500 sq ft" /></FormRow>
          <FormRow label="Client"><input {...register('client')} className="form-input" placeholder="Optional" /></FormRow>
        </div>

        <FormRow label="Short Description (max 150 chars)" error={errors.shortDescription}>
          <input {...register('shortDescription', { maxLength: { value: 150, message: 'Max 150 characters' } })} className="form-input" placeholder="Card preview text" />
        </FormRow>

        <FormRow label="Description">
          <textarea {...register('description')} rows={6} className="form-input resize-none" placeholder="Full project description…" />
        </FormRow>

        <FormRow label="Images">
          <ImageUploader value={images} onChange={setImages} />
        </FormRow>

        <div className="grid gap-6 sm:grid-cols-3">
          <FormRow label="Sort Order"><input type="number" {...register('order')} className="form-input" placeholder="1" /></FormRow>
          <Toggle label="Featured" {...register('featured')} />
          <Toggle label="Published" {...register('published')} />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-gold px-7 py-3 font-body text-small uppercase tracking-wider text-bg transition hover:bg-gold-light disabled:opacity-60">
            {saving ? 'Saving…' : isEdit ? 'Update Project' : 'Create Project'}
          </button>
          <Link to="/admin/projects" className="border border-border px-7 py-3 font-body text-small uppercase tracking-wider text-muted transition hover:border-gold hover:text-gold">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function FormRow({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">{label}</span>
      {children}
      {error && <span className="mt-1 block font-body text-caption text-automotive">{error.message}</span>}
    </label>
  );
}

const Toggle = ({ label, ...props }) => (
  <label className="flex items-center gap-3 pt-7">
    <input type="checkbox" {...props} className="h-4 w-4 accent-[#C9A96E]" />
    <span className="font-body text-small text-white">{label}</span>
  </label>
);
