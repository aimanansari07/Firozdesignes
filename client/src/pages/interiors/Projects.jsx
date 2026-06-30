import { useState, useMemo } from 'react';
import Seo from '../../components/ui/Seo.jsx';
import PageTransition from '../../components/layout/PageTransition.jsx';
import SectionLabel from '../../components/ui/SectionLabel.jsx';
import ProjectFilter from '../../components/interiors/ProjectFilter.jsx';
import ProjectsGrid from '../../components/interiors/ProjectsGrid.jsx';
import useApi from '../../hooks/useApi.js';
import projectService from '../../services/projectService.js';

const PER_PAGE = 12;

export default function Projects() {
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const { data, loading } = useApi(() => projectService.list({ limit: 200 }), []);
  const all = data?.data || [];

  const filtered = useMemo(
    () => (category === 'all' ? all : all.filter((p) => p.category === category)),
    [all, category]
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const onFilter = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <PageTransition>
      <Seo
        title="Projects — Feroze Interiors"
        path="/interiors/projects"
        description="Browse the Feroze Interiors portfolio — hospitality, commercial, residential, villa, retail and resort projects across India and the Middle East."
      />

      <section className="bg-bg pt-24 sm:pt-32">
        <div className="container-feroze">
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="mt-4 font-display text-display font-light text-white">Our Projects</h1>
          <p className="mt-4 max-w-xl font-body text-body text-muted">
            335+ completed projects across hospitality, commercial and residential sectors — a portfolio built on
            craftsmanship, design and flawless turnkey execution.
          </p>
        </div>
      </section>

      <section className="bg-bg py-8 md:py-12">
        <div className="container-feroze">
          <div className="mb-10">
            <ProjectFilter active={category} onChange={onFilter} />
          </div>
          <ProjectsGrid projects={visible} loading={loading} skeletonCount={PER_PAGE} />

          {pages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-10 w-10 border font-mono text-small transition ${
                    current === i + 1 ? 'border-gold bg-gold text-bg' : 'border-border text-muted hover:border-gold'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
