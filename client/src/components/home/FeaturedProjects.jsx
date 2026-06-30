import { useMemo } from 'react';
import SectionLabel from '../ui/SectionLabel.jsx';
import ProjectCard from '../ui/ProjectCard.jsx';
import ProductCard from '../ui/ProductCard.jsx';
import Button from '../ui/Button.jsx';
import GoldLine from '../ui/GoldLine.jsx';
import useApi from '../../hooks/useApi.js';
import projectService from '../../services/projectService.js';
import productService from '../../services/productService.js';

export default function FeaturedProjects() {
  const { data: projData, loading: projLoading } = useApi(() => projectService.list({ featured: true }), []);
  const { data: prodData, loading: prodLoading } = useApi(() => productService.list({ featured: true }), []);

  const projects = useMemo(() => (projData?.data || []).slice(0, 3), [projData]);
  const products = useMemo(() => (prodData?.data || []).slice(0, 3), [prodData]);

  const loading = projLoading || prodLoading;

  return (
    <section className="bg-bg py-14 md:py-24">
      <div className="container-feroze">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Our Work</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-display text-display font-light text-white text-balance">
              Crafting Experiences Across India &amp; The Middle East
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="space-y-16">
            <SkeletonRow />
            <SkeletonRow />
          </div>
        ) : (
          <div className="space-y-16">
            {/* Interiors row */}
            {projects.length > 0 && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <SectionLabel>Feroze Interiors</SectionLabel>
                  <Button to="/interiors/projects" variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((p, i) => (
                    <ProjectCard key={p._id || p.slug} project={p} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            {projects.length > 0 && products.length > 0 && (
              <GoldLine orientation="horizontal" className="w-full" />
            )}

            {/* Automotive row */}
            {products.length > 0 && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <SectionLabel color="var(--color-automotive)">Feroze Automotive Decor</SectionLabel>
                  <Button to="/automotive/collection" variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((p, i) => (
                    <ProductCard key={p._id || p.slug} product={p} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function SkeletonRow() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="aspect-[4/3] animate-pulse border border-border bg-surface" />
      ))}
    </div>
  );
}
