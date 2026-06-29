import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, X } from 'lucide-react';
import toast from 'react-hot-toast';
import productService from '../../services/productService.js';
import ImageUploader from '../ImageUploader.jsx';
import { PRODUCT_CATEGORIES } from '../../utils/constants.js';

const CATS = PRODUCT_CATEGORIES.filter((c) => c.key !== 'all');

/** Comma/enter-driven tag input. */
function TagInput({ tags, setTags, placeholder }) {
  const [input, setInput] = useState('');
  const add = () => {
    const v = input.trim();
    if (v && !tags.includes(v)) setTags([...tags, v]);
    setInput('');
  };
  return (
    <div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              add();
            }
          }}
          className="form-input"
          placeholder={placeholder}
        />
        <button type="button" onClick={add} className="shrink-0 border border-border px-4 font-body text-small text-gold transition hover:border-gold">Add</button>
      </div>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="flex items-center gap-1.5 border border-border bg-bg px-2.5 py-1 font-body text-caption text-white">
              {t}
              <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} className="text-muted hover:text-automotive"><X size={12} /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [finishes, setFinishes] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: 'coffee-table',
      customizable: true,
      inStock: true,
      published: true,
      featured: false,
      priceShow: false,
      currency: 'INR',
    },
  });

  const priceShow = watch('priceShow');

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const res = await productService.adminGet(id);
        const p = res.data;
        reset({
          name: p.name,
          category: p.category,
          engineType: p.engineType,
          shortDescription: p.shortDescription,
          description: p.description,
          length: p.dimensions?.length,
          width: p.dimensions?.width,
          height: p.dimensions?.height,
          weight: p.dimensions?.weight,
          priceShow: p.price?.show,
          amount: p.price?.amount,
          currency: p.price?.currency || 'INR',
          customizable: p.customizable,
          inStock: p.inStock,
          featured: p.featured,
          published: p.published,
          order: p.order,
        });
        setImages(p.images || []);
        setMaterials(p.materials || []);
        setFinishes(p.finishes || []);
      } catch (err) {
        toast.error(err.friendlyMessage || 'Could not load product');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit, reset]);

  const onSubmit = async (v) => {
    setSaving(true);
    const payload = {
      name: v.name,
      category: v.category,
      engineType: v.engineType,
      shortDescription: v.shortDescription,
      description: v.description,
      dimensions: { length: v.length, width: v.width, height: v.height, weight: v.weight },
      materials,
      finishes,
      price: { show: Boolean(v.priceShow), amount: v.amount ? Number(v.amount) : 0, currency: v.currency },
      customizable: Boolean(v.customizable),
      inStock: Boolean(v.inStock),
      featured: Boolean(v.featured),
      published: Boolean(v.published),
      order: v.order ? Number(v.order) : 0,
      images,
    };
    try {
      if (isEdit) await productService.update(id, payload);
      else await productService.create(payload);
      toast.success(isEdit ? 'Product updated' : 'Product created');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="h-64 animate-pulse border border-border bg-surface" />;

  return (
    <div className="max-w-3xl">
      <Link to="/admin/products" className="mb-6 inline-flex items-center gap-2 font-body text-small text-muted hover:text-gold">
        <ArrowLeft size={16} /> Back to Products
      </Link>
      <h1 className="mb-8 font-display text-3xl font-light text-white">{isEdit ? 'Edit Product' : 'New Product'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormRow label="Name *" error={errors.name}>
          <input {...register('name', { required: 'Required' })} className="form-input" placeholder="V8 Engine Block Coffee Table" />
        </FormRow>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormRow label="Category *">
            <select {...register('category')} className="form-input">
              {CATS.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
          </FormRow>
          <FormRow label="Engine Type">
            <input {...register('engineType')} className="form-input" placeholder="V8, V12, Inline-6…" />
          </FormRow>
        </div>

        <FormRow label="Short Description">
          <input {...register('shortDescription')} className="form-input" placeholder="Card preview text" />
        </FormRow>
        <FormRow label="Description">
          <textarea {...register('description')} rows={5} className="form-input resize-none" placeholder="Full product description…" />
        </FormRow>

        {/* Dimensions */}
        <fieldset>
          <legend className="mb-2 font-body text-caption uppercase tracking-wider text-gold">Dimensions</legend>
          <div className="grid gap-4 sm:grid-cols-4">
            <input {...register('length')} className="form-input" placeholder="Length" />
            <input {...register('width')} className="form-input" placeholder="Width" />
            <input {...register('height')} className="form-input" placeholder="Height" />
            <input {...register('weight')} className="form-input" placeholder="Weight" />
          </div>
        </fieldset>

        <FormRow label="Materials"><TagInput tags={materials} setTags={setMaterials} placeholder="e.g. Aluminium Engine Block" /></FormRow>
        <FormRow label="Finishes"><TagInput tags={finishes} setTags={setFinishes} placeholder="e.g. Chrome" /></FormRow>

        {/* Price */}
        <fieldset className="border border-border p-4">
          <legend className="px-2 font-body text-caption uppercase tracking-wider text-gold">Pricing</legend>
          <label className="flex items-center gap-3">
            <input type="checkbox" {...register('priceShow')} className="h-4 w-4 accent-[#C9A96E]" />
            <span className="font-body text-small text-white">Show price (otherwise “Price on Request”)</span>
          </label>
          {priceShow && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input type="number" {...register('amount')} className="form-input" placeholder="Amount" />
              <select {...register('currency')} className="form-input">
                <option value="INR">INR (₹)</option>
                <option value="AED">AED</option>
              </select>
            </div>
          )}
        </fieldset>

        <FormRow label="Images"><ImageUploader value={images} onChange={setImages} automotive /></FormRow>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <FormRow label="Sort Order"><input type="number" {...register('order')} className="form-input" placeholder="0" /></FormRow>
          <Toggle label="Customizable" {...register('customizable')} />
          <Toggle label="In Stock" {...register('inStock')} />
          <Toggle label="Featured" {...register('featured')} />
          <Toggle label="Published" {...register('published')} />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-gold px-7 py-3 font-body text-small uppercase tracking-wider text-bg transition hover:bg-gold-light disabled:opacity-60">
            {saving ? 'Saving…' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <Link to="/admin/products" className="border border-border px-7 py-3 font-body text-small uppercase tracking-wider text-muted transition hover:border-gold hover:text-gold">
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
