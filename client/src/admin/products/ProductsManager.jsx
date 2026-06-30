import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import useApi from '../../hooks/useApi.js';
import productService from '../../services/productService.js';
import ProductsList from './ProductsList.jsx';

export default function ProductsManager() {
  const { data, loading, error, refetch } = useApi(() => productService.adminList(), []);
  const products = data?.data || [];

  const onTogglePublish = async (p) => {
    try {
      await productService.togglePublish(p._id);
      toast.success(p.published ? 'Unpublished' : 'Published');
      refetch();
    } catch (err) {
      toast.error(err.friendlyMessage || 'Failed');
    }
  };

  const onToggleFeatured = async (p) => {
    try {
      await productService.toggleFeatured(p._id);
      toast.success(p.featured ? 'Removed from featured' : 'Marked as featured');
      refetch();
    } catch (err) {
      toast.error(err.friendlyMessage || 'Failed');
    }
  };

  const onDelete = async (p) => {
    if (!window.confirm(`Delete “${p.name}”? This cannot be undone.`)) return;
    try {
      await productService.remove(p._id);
      toast.success('Product deleted');
      refetch();
    } catch (err) {
      toast.error(err.friendlyMessage || 'Failed');
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-light text-white">Products</h1>
        <Link to="/admin/products/new" className="flex items-center gap-2 bg-gold px-4 py-2 font-body text-small text-bg transition hover:bg-gold-light">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {loading ? (
        <div className="h-40 animate-pulse border border-border bg-surface" />
      ) : error ? (
        <p className="border border-automotive/40 bg-automotive/10 px-4 py-3 font-body text-small text-automotive">
          Could not load products. {error}
        </p>
      ) : (
        <ProductsList products={products} onTogglePublish={onTogglePublish} onToggleFeatured={onToggleFeatured} onDelete={onDelete} />
      )}
    </div>
  );
}
