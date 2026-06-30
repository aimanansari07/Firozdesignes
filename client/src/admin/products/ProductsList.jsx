import { Link } from 'react-router-dom';
import { Pencil, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import LazyImage from '../../components/ui/LazyImage.jsx';
import { titleCase, formatPrice } from '../../utils/formatters.js';

/** Products table used by ProductsManager. */
export default function ProductsList({ products = [], onTogglePublish, onToggleFeatured, onDelete }) {
  if (!products.length) {
    return (
      <div className="border border-border bg-surface py-16 text-center font-body text-small text-muted">
        No products yet. Click “Add Product” to create one.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b border-border bg-surface text-left">
            {['Image', 'Name', 'Category', 'Engine', 'Price', 'Stock', 'Featured', 'Status', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 font-body text-caption uppercase tracking-wider text-muted">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b border-border last:border-0 hover:bg-surface">
              <td className="px-4 py-3">
                <LazyImage src={p.images?.[0]} seed={p.slug} automotive className="h-12 w-12 border border-border" alt={p.name} />
              </td>
              <td className="px-4 py-3 font-body text-small text-white">{p.name}</td>
              <td className="px-4 py-3 font-body text-small text-muted">{titleCase(p.category)}</td>
              <td className="px-4 py-3 font-mono text-caption text-gold">{p.engineType || '—'}</td>
              <td className="px-4 py-3 font-mono text-caption text-muted">{p.price?.show ? formatPrice(p.price) : 'On Request'}</td>
              <td className="px-4 py-3 font-body text-caption">
                <span className={p.inStock ? 'text-green-400' : 'text-automotive'}>{p.inStock ? 'In stock' : 'Out'}</span>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onToggleFeatured(p)}
                  title={p.featured ? 'Remove from featured' : 'Mark as featured'}
                  className={`transition ${p.featured ? 'text-gold' : 'text-muted hover:text-gold'}`}
                >
                  <Star size={16} fill={p.featured ? 'currentColor' : 'none'} />
                </button>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onTogglePublish(p)}
                  className={`inline-flex items-center gap-1 border px-2.5 py-0.5 font-mono text-caption uppercase ${
                    p.published ? 'border-green-500/40 bg-green-500/10 text-green-400' : 'border-border text-muted'
                  }`}
                >
                  {p.published ? <Eye size={12} /> : <EyeOff size={12} />}
                  {p.published ? 'Live' : 'Draft'}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Link to={`/admin/products/${p._id}/edit`} className="text-muted transition hover:text-gold" aria-label="Edit"><Pencil size={16} /></Link>
                  <button onClick={() => onDelete(p)} className="text-muted transition hover:text-automotive" aria-label="Delete"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
