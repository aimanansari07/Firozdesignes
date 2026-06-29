import { SITE } from './constants.js';

/**
 * Build a consistent set of meta values for a page.
 * Used with <Seo /> (react-helmet-async).
 */
export function buildMeta({ title, description, path = '', image, type = 'website' } = {}) {
  const fullTitle = title ? `${title} | ${SITE.name} Designs` : SITE.name;
  const canonical = `${SITE.url}${path}`;
  return {
    title: title ? `${title} | Feroze Designs` : 'FEROZE — Luxury Interior Design & Automotive Decor | Mumbai',
    description:
      description ||
      'FEROZE — luxury interior design and automotive-inspired furniture. Feroze Interiors (since 1996) and Feroze Automotive Decor. Mumbai, working globally.',
    canonical,
    ogTitle: fullTitle,
    image: image || `${SITE.url}/logo-feroze.svg`,
    type,
  };
}
