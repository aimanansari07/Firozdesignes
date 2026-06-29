import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage.jsx';
import { formatPrice, titleCase } from '../../utils/formatters.js';

/** Card for an automotive product. */
export default function ProductCard({ product, index = 0 }) {
  const { slug, name, category, engineType, materials, images, price } = product;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      className="group relative"
    >
      <Link to={`/automotive/collection/${slug}`} className="block">
        <div className="relative overflow-hidden border border-border bg-surface transition-colors duration-500 group-hover:border-gold">
          <LazyImage
            src={images?.[0]}
            seed={slug}
            label={engineType || name}
            automotive
            alt={`${name} — automotive-inspired ${titleCase(category)} by Feroze Automotive Decor`}
            className="aspect-square w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
          />
          {engineType && (
            <span className="absolute left-4 top-4 border border-gold/40 bg-bg/80 px-3 py-1 font-mono text-caption uppercase tracking-wider text-gold backdrop-blur">
              {engineType}
            </span>
          )}
        </div>

        <div className="pt-4">
          <h3 className="font-display text-heading text-white transition-colors duration-300 group-hover:text-gold">
            {name}
          </h3>
          {materials?.length > 0 && (
            <p className="mt-1 line-clamp-1 font-body text-small text-muted">
              {materials.slice(0, 3).join(' · ')}
            </p>
          )}
          <p className="data mt-2 text-small text-gold">
            {price?.show ? formatPrice(price) : 'Price on Request'}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
