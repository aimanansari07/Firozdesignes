import ProductCard from '../ui/ProductCard.jsx';

/** Responsive product catalog grid with loading + empty states. */
export default function ProductGrid({ products = [], loading = false, skeletonCount = 6 }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse border border-border bg-surface" />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="border border-border bg-surface py-12 md:py-24 text-center">
        <p className="font-body text-body text-muted">No products found in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, i) => (
        <ProductCard key={p._id || p.slug} product={p} index={i} />
      ))}
    </div>
  );
}
