import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle, Check, Sparkles } from 'lucide-react';
import Seo from '../../components/ui/Seo.jsx';
import PageTransition from '../../components/layout/PageTransition.jsx';
import SectionLabel from '../../components/ui/SectionLabel.jsx';
import Button from '../../components/ui/Button.jsx';
import LazyImage from '../../components/ui/LazyImage.jsx';
import ImageLightbox from '../../components/ui/ImageLightbox.jsx';
import ProductCard from '../../components/ui/ProductCard.jsx';
import InquiryModal from '../../components/ui/InquiryModal.jsx';
import useApi from '../../hooks/useApi.js';
import productService from '../../services/productService.js';
import { formatPrice, titleCase } from '../../utils/formatters.js';
import { WHATSAPP_URL } from '../../utils/constants.js';

const FINISH_SWATCH = {
  Chrome: 'linear-gradient(135deg,#e8e8e8,#9a9a9a)',
  'Matte Black': '#1a1a1a',
  'Gloss Black': 'linear-gradient(135deg,#2a2a2a,#000)',
  Gold: 'linear-gradient(135deg,#E8CC9A,#C9A96E)',
};

export default function ProductDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useApi(() => productService.getBySlug(slug), [slug]);
  const [lightbox, setLightbox] = useState(null);
  const [quote, setQuote] = useState(false);

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
          <h1 className="font-display text-display text-white">Product not found</h1>
          <Button to="/automotive/collection" variant="ghost" className="mt-8">Back to Collection</Button>
        </div>
      </PageTransition>
    );
  }

  const p = data.data;
  const related = data.related || [];
  const gallery = p.images?.length ? p.images : [null, null, null, null];
  const [main, ...thumbs] = gallery;

  const dims = [
    ['Length', p.dimensions?.length],
    ['Width', p.dimensions?.width],
    ['Height', p.dimensions?.height],
    ['Weight', p.dimensions?.weight],
  ].filter(([, v]) => v);

  return (
    <PageTransition>
      <Seo
        title={`${p.name} — Feroze Automotive Decor`}
        path={`/automotive/collection/${p.slug}`}
        description={p.shortDescription || p.description?.slice(0, 150)}
        type="product"
      />

      <section className="bg-bg pt-20 sm:pt-28">
        <div className="container-feroze grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <button
              onClick={() => setLightbox(0)}
              className="group relative block aspect-square w-full overflow-hidden border border-border transition hover:border-gold"
              aria-label="Open image viewer"
            >
              <LazyImage src={main} seed={p.slug} label={p.engineType || p.name} automotive alt={`${p.name} main view`} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
            </button>
            {thumbs.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {thumbs.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox(i + 1)}
                    className="aspect-square overflow-hidden border border-border transition hover:border-gold"
                    aria-label={`Open image ${i + 2}`}
                  >
                    <LazyImage src={img} seed={`${p.slug}-${i + 1}`} label={p.engineType} automotive alt={`${p.name} view ${i + 2}`} className="h-full w-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <SectionLabel color="var(--color-automotive)">{titleCase(p.category)}</SectionLabel>
            <h1 className="mt-4 font-display text-display font-light text-white">{p.name}</h1>
            {p.engineType && (
              <span className="mt-3 inline-block border border-gold/40 px-3 py-1 font-mono text-caption uppercase tracking-wider text-gold">
                {p.engineType} Engine
              </span>
            )}

            <p className="mt-6 font-body text-body text-muted">{p.description}</p>

            {/* Dimensions table — Space Mono */}
            {dims.length > 0 && (
              <div className="mt-8">
                <h3 className="font-body text-caption uppercase tracking-widest text-gold">Dimensions</h3>
                <table className="mt-3 w-full border border-border">
                  <tbody>
                    {dims.map(([label, value]) => (
                      <tr key={label} className="border-b border-border last:border-0">
                        <td className="w-1/2 border-r border-border px-4 py-2.5 font-body text-small text-muted">{label}</td>
                        <td className="data px-4 py-2.5 text-small text-white">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Materials */}
            {p.materials?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-body text-caption uppercase tracking-widest text-gold">Materials</h3>
                <ul className="mt-3 space-y-1.5">
                  {p.materials.map((m) => (
                    <li key={m} className="flex items-center gap-2 font-body text-small text-white/90">
                      <Check size={14} className="text-gold" /> {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Finishes */}
            {p.finishes?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-body text-caption uppercase tracking-widest text-gold">Available Finishes</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  {p.finishes.map((f) => (
                    <span key={f} className="flex items-center gap-2 border border-border px-3 py-1.5 font-body text-small text-white/90">
                      <span className="h-4 w-4 rounded-full border border-border" style={{ background: FINISH_SWATCH[f] || '#444' }} />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="mt-8 border-y border-border py-5">
              <span className="font-body text-caption uppercase tracking-widest text-muted">Price</span>
              <p className="data mt-1 text-2xl text-gold">
                {p.price?.show ? formatPrice(p.price) : 'Price Available on Request'}
              </p>
            </div>

            {/* Customizable note */}
            {p.customizable && (
              <p className="mt-5 flex items-start gap-2 border border-gold/30 bg-gold/5 p-4 font-body text-small text-gold-light">
                <Sparkles size={16} className="mt-0.5 shrink-0" />
                This piece can be customized — choose your engine, finish and dimensions. Contact us to commission yours.
              </p>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={() => setQuote(true)} variant="gold" size="lg">Request a Quote</Button>
              <Button href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi, I'm interested in the ${p.name}.`)}`} variant="automotive" size="lg">
                <MessageCircle size={18} /> Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-surface py-12 md:py-20">
          <div className="container-feroze">
            <SectionLabel color="var(--color-automotive)">You May Also Like</SectionLabel>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <ProductCard key={r._id || r.slug} product={r} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {lightbox !== null && (
        <ImageLightbox images={gallery} index={lightbox} seed={p.slug} automotive onClose={() => setLightbox(null)} onNavigate={setLightbox} />
      )}
      <InquiryModal
        open={quote}
        onClose={() => setQuote(false)}
        title="Request a Quote"
        prefill={{ brand: 'automotive', inquiryType: 'quotation', productInterest: p.name }}
      />
    </PageTransition>
  );
}
