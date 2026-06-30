import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import Seo from '../../components/ui/Seo.jsx';
import PageTransition from '../../components/layout/PageTransition.jsx';
import SectionLabel from '../../components/ui/SectionLabel.jsx';
import Button from '../../components/ui/Button.jsx';
import GoldLine from '../../components/ui/GoldLine.jsx';
import LazyImage from '../../components/ui/LazyImage.jsx';
import ProductFilter from '../../components/automotive/ProductFilter.jsx';
import ProductGrid from '../../components/automotive/ProductGrid.jsx';
import useApi from '../../hooks/useApi.js';
import productService from '../../services/productService.js';
import siteSettingsService from '../../services/siteSettingsService.js';
import { BRANDS, WHATSAPP_URL } from '../../utils/constants.js';

export default function AutomotiveHome() {
  const [category, setCategory] = useState('all');
  const { data, loading } = useApi(() => productService.list({ limit: 100 }), []);
  const { data: settingsData } = useApi(() => siteSettingsService.get(), []);

  const all = (data && data.data) || [];
  const products = useMemo(
    () => (category === 'all' ? all : all.filter((p) => p.category === category)).slice(0, 9),
    [all, category]
  );

  const founderImage = settingsData && settingsData.data && settingsData.data.automotive && settingsData.data.automotive.founderImage;
  const founderName = (settingsData && settingsData.data && settingsData.data.automotive && settingsData.data.automotive.founderName) || 'Ayan Shaikh';

  return (
    <PageTransition>
      <Seo
        title="Feroze Automotive Decor - Automotive Inspired Luxury Furniture"
        path="/automotive"
        description="Feroze Automotive Decor - automotive-inspired luxury furniture engineered from real car parts. V6-V12 engine block tables, piston towers and bespoke statement pieces. Mumbai | Dubai."
      />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] sm:min-h-[88vh] items-center overflow-hidden bg-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/videos/hero-automotive.mp4"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/20" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(circle at 70% 40%, rgba(139,26,26,0.18), transparent 60%)' }}
        />
        <div className="container-feroze relative z-10 pt-16 sm:pt-20">
          <span className="mb-6 inline-flex items-center gap-2 border border-automotive/60 bg-automotive/10 px-4 py-1.5 font-mono text-caption uppercase tracking-widest text-gold-light">
            India's 1st Automotive-Inspired Furniture
          </span>
          <h1 className="max-w-4xl font-display font-light text-white" style={{ fontSize: 'var(--text-display)' }}>
            FEROZE Automotive Decor
          </h1>
          <p className="mt-5 font-display text-2xl font-light text-gold md:text-3xl">
            Where Engineering Meets Craftsmanship
          </p>
          <p className="mt-4 max-w-xl font-body text-body text-muted">{BRANDS.automotive.descriptor}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/automotive/collection" variant="gold">Explore Collection</Button>
            <Button href={WHATSAPP_URL} variant="automotive">
              <MessageCircle size={18} /> Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-bg py-12 md:py-20">
        <div className="container-feroze grid gap-10 md:grid-cols-[auto,1fr] md:gap-16">
          <GoldLine className="hidden h-full md:block" color="var(--color-automotive)" />
          <p className="max-w-3xl font-display text-2xl font-light leading-snug text-white md:text-3xl">
            From V6 to V12 engine block tables to automotive wall art and bespoke statement pieces — every product
            celebrates automotive culture while honoring generations of furniture craftsmanship.
          </p>
        </div>
      </section>

      {/* Collection */}
      <section className="bg-bg pb-14 md:pb-24">
        <div className="container-feroze">
          <div className="mb-8 flex flex-col gap-6">
            <SectionLabel>The Collection</SectionLabel>
            <ProductFilter active={category} onChange={setCategory} />
          </div>
          <ProductGrid products={products} loading={loading} />
          <div className="mt-12 text-center">
            <Button to="/automotive/collection" variant="ghost" size="lg">View Full Collection</Button>
          </div>
        </div>
      </section>

      {/* About founder teaser */}
      <section className="bg-surface py-14 md:py-24">
        <div className="container-feroze grid items-center gap-12 md:grid-cols-2">
          <LazyImage
            src={founderImage || ''}
            seed="ayan-shaikh-portrait"
            label={founderName}
            automotive
            alt={founderName + ', Director - Design Innovation & Business Development'}
            className="aspect-[4/5] w-full border border-border"
          />
          <div>
            <SectionLabel color="var(--color-automotive)">The Founder</SectionLabel>
            <h2 className="mt-4 font-display text-display font-light text-white">{founderName}</h2>
            <p className="mt-2 font-body text-small uppercase tracking-wider text-gold">{BRANDS.automotive.founderRole}</p>
            <p className="mt-6 font-body text-body text-muted">
              The next generation of the Feroze legacy. Combining automotive engineering with furniture craftsmanship,
              Ayan founded Feroze Automotive Decor — transforming iconic automotive elements into bespoke furniture.
            </p>
            <Link to="/automotive/about" className="group mt-8 inline-flex items-center gap-2 font-body text-small uppercase tracking-wider text-gold">
              Read the Brand Story
              <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
