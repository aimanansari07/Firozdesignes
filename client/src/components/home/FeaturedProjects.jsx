import { useMemo } from 'react';
import SectionLabel from '../ui/SectionLabel.jsx';
import ProjectCard from '../ui/ProjectCard.jsx';
import Button from '../ui/Button.jsx';
import useApi from '../../hooks/useApi.js';
import projectService from '../../services/projectService.js';

/** Featured projects grid pulled from the API (falls back to demo data). */
export default function FeaturedProjects() {
  const { data, loading } = useApi(() => projectService.list({ featured: true }), []);
  const projects = useMemo(() => (data?.data || []).slice(0, 6), [data]);

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
          <Button to="/interiors/projects" variant="ghost" size="md" className="shrink-0">
            View All Projects
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse border border-border bg-surface" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p._id || p.slug} project={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
