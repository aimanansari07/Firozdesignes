import { Helmet } from 'react-helmet-async';
import { buildMeta } from '../../utils/seo.js';

/** Per-page SEO meta tags (title, description, canonical, Open Graph, Twitter). */
export default function Seo(props) {
  const meta = buildMeta(props);
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />

      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Feroze Designs & Holdings" />
      <meta property="og:title" content={meta.ogTitle} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:image" content={meta.image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.ogTitle} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Helmet>
  );
}
