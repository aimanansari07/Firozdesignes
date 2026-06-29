import ProjectCard from '../ui/ProjectCard.jsx';

/** Responsive projects grid with loading + empty states. */
export default function ProjectsGrid({ projects = [], loading = false, skeletonCount = 6 }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="aspect-[4/3] animate-pulse border border-border bg-surface" />
        ))}
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="border border-border bg-surface py-12 md:py-24 text-center">
        <p className="font-body text-body text-muted">No projects found in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <ProjectCard key={p._id || p.slug} project={p} index={i} />
      ))}
    </div>
  );
}
