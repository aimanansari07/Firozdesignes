import { useState, useMemo } from 'react';
import Seo from '../../components/ui/Seo.jsx';
import PageTransition from '../../components/layout/PageTransition.jsx';
import SectionLabel from '../../components/ui/SectionLabel.jsx';
import ProductFilter from '../../components/automotive/ProductFilter.jsx';
import ProductGrid from '../../components/automotive/ProductGrid.jsx';
import useApi from '../../hooks/useApi.js';
import productService from '../../services/productService.js';

export default function Collection() {
  const [category, setCategory] = useState('all');
  const { data, loading } = useApi(() => productService.list({ limit: 100 }), []);
  const all = data?.data || [];
  const products = useMemo(
    () => (category === 'all' ? all : all.filter((p) => p.category === category)),
    [all, category]
  );

  return (
    <PageTransition>
      <Seo
        title="Collection — Feroze Automotive Decor"
        path="/automotive/collection"
        description="Browse the Feroze Automotive Decor collection — engine block coffee tables, piston towers, automotive wall art and bespoke statement pieces engineered from real car parts."
      />

      <section className="bg-bg pt-24 sm:pt-32">
        <div className="container-feroze">
          <SectionLabel color="var(--color-automotive)">Engineered From Real Car Parts</SectionLabel>
          <h1 className="mt-4 font-display text-display font-light text-white">The Collection</h1>
          <p className="mt-4 max-w-xl font-body text-body text-muted">
            Every piece is designed and manufactured in-house at our Mumbai workshop — functional art and a
            collector’s item for enthusiasts, businesses and luxury interiors.
          </p>
        </div>
      </section>

      <section className="bg-bg py-8 md:py-12">
        <div className="container-feroze">
          <div className="mb-10">
            <ProductFilter active={category} onChange={setCategory} />
          </div>
          <ProductGrid products={products} loading={loading} skeletonCount={9} />
        </div>
      </section>
    </PageTransition>
  );
}
