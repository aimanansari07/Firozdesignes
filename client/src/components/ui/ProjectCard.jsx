import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import LazyImage from './LazyImage.jsx';
import { titleCase } from '../../utils/formatters.js';

/** Card for an interior project. Hover → subtle scale + gold border reveal. */
export default function ProjectCard({ project, index = 0 }) {
  const { slug, title, category, location, area, images, shortDescription } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      className="group relative"
    >
      <Link to={`/interiors/projects/${slug}`} className="block">
        <div className="relative overflow-hidden border border-border transition-colors duration-500 group-hover:border-gold">
          <LazyImage
            src={images?.[0]}
            seed={slug}
            label={title}
            alt={`${title} — ${titleCase(category)} interior project in ${location}`}
            className="aspect-[4/3] w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
          />
          <span className="absolute left-4 top-4 bg-bg/80 px-3 py-1 font-body text-caption uppercase tracking-wider text-gold backdrop-blur">
            {titleCase(category)}
          </span>
        </div>

        <div className="pt-4">
          <h3 className="font-display text-heading text-white transition-colors duration-300 group-hover:text-gold">
            {title}
          </h3>
          <div className="mt-2 flex items-center gap-4 font-body text-small text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} className="text-gold" /> {location}
            </span>
            {area && <span className="data text-caption">{area}</span>}
          </div>
          {shortDescription && (
            <p className="mt-2 line-clamp-2 font-body text-small text-muted/80">{shortDescription}</p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
