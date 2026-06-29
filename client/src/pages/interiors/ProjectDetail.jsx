import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Maximize, Tag } from 'lucide-react';
import Seo from '../../components/ui/Seo.jsx';
import PageTransition from '../../components/layout/PageTransition.jsx';
import SectionLabel from '../../components/ui/SectionLabel.jsx';
import Button from '../../components/ui/Button.jsx';
import LazyImage from '../../components/ui/LazyImage.jsx';
import ImageLightbox from '../../components/ui/ImageLightbox.jsx';
import ProjectCard from '../../components/ui/ProjectCard.jsx';
import InquiryModal from '../../components/ui/InquiryModal.jsx';
import useApi from '../../hooks/useApi.js';
import projectService from '../../services/projectService.js';
import { titleCase } from '../../utils/formatters.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useApi(() => projectService.getBySlug(slug), [slug]);
  const [lightbox, setLightbox] = useState(null);
  const [enquire, setEnquire] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-12 w-px animate-line-grow origin-top bg-gold" />
      </div>
    );
  }
  if (error || !data?.data) {
    return (
      <PageTransition>
        <div className="container-feroze flex min-h-[60vh] flex-col items-center justify-center pt-32 text-center">
          <h1 className="font-display text-display text-white">Project not found</h1>
          <Button to="/interiors/projects" variant="ghost" className="mt-8">Back to Projects</Button>
        </div>
      </PageTransition>
    );
  }

  const p = data.data;
  const related = data.related || [];
  // Ensure the gallery always has tiles (placeholders) even before photos exist.
  const gallery = p.images?.length ? p.images : [null, null, null];

  const meta = [
    { icon: Tag, label: 'Category', value: titleCase(p.category) },
    { icon: MapPin, label: 'Location', value: p.location },
    { icon: Calendar, label: 'Year', value: p.year },
    { icon: Maximize, label: 'Area', value: p.area },
  ].filter((m) => m.value);

  return (
    <PageTransition>
      <Seo
        title={`${p.title} — Feroze Interiors`}
        path={`/interiors/projects/${p.slug}`}
        description={p.shortDescription || p.description?.slice(0, 150)}
        type="article"
      />

      {/* Cover hero */}
      <section className="relative h-[70vh] min-h-[420px]">
        <LazyImage src={p.images?.[0]} seed={p.slug} label={p.title} alt={`${p.title} cover`} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="container-feroze absolute inset-x-0 bottom-0 z-10 pb-12">
          <SectionLabel>{titleCase(p.category)}</SectionLabel>
          <h1 className="mt-4 font-display text-display font-light text-white">{p.title}</h1>
        </div>
      </section>

      {/* Meta */}
      <section className="border-b border-border bg-bg py-5 md:py-8">
        <div className="container-feroze grid grid-cols-2 gap-6 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <div className="flex items-center gap-2 font-body text-caption uppercase tracking-wider text-muted">
                <m.icon size={13} className="text-gold" /> {m.label}
              </div>
              <div className="data mt-1 text-small text-white">{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Description + gallery */}
      <section className="bg-bg py-10 md:py-16">
        <div className="container-feroze grid gap-12 lg:grid-cols-[1.4fr,1fr]">
          <div>
            <h2 className="font-display text-heading font-light text-white">About the Project</h2>
            <p className="mt-5 whitespace-pre-line font-body text-body text-muted">{p.description}</p>
            <Button onClick={() => setEnquire(true)} variant="gold" className="mt-8">
              Enquire About This Project
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className={`group relative overflow-hidden border border-border transition hover:border-gold ${
                  i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'
                }`}
                aria-label={`Open image ${i + 1}`}
              >
                <LazyImage src={img} seed={`${p.slug}-${i}`} label={p.title} alt={`${p.title} view ${i + 1}`} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-surface py-12 md:py-20">
          <div className="container-feroze">
            <SectionLabel>More Projects</SectionLabel>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <ProjectCard key={r._id || r.slug} project={r} index={i} />
              ))}
            </div>
            <div className="mt-12">
              <Link to="/interiors/projects" className="font-body text-small uppercase tracking-wider text-gold hover:text-gold-light">
                ← Back to all projects
              </Link>
            </div>
          </div>
        </section>
      )}

      {lightbox !== null && (
        <ImageLightbox images={gallery} index={lightbox} seed={p.slug} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
      )}
      <InquiryModal
        open={enquire}
        onClose={() => setEnquire(false)}
        title="Enquire About This Project"
        prefill={{ brand: 'interiors', inquiryType: 'project', projectType: p.title }}
      />
    </PageTransition>
  );
}
