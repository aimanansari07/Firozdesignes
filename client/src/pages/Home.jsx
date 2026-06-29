import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Seo from '../components/ui/Seo.jsx';
import PageTransition from '../components/layout/PageTransition.jsx';
import HeroSection from '../components/home/HeroSection.jsx';
import StatsCounter from '../components/home/StatsCounter.jsx';
import FeaturedProjects from '../components/home/FeaturedProjects.jsx';
import TestimonialsSlider from '../components/home/TestimonialsSlider.jsx';
import InstagramFeed from '../components/home/InstagramFeed.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';
import GoldLine from '../components/ui/GoldLine.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import { BRANDS } from '../utils/constants.js';

function BrandStorySplit() {
  return (
    <section className="relative bg-bg py-14 md:py-24">
      <div className="container-feroze">
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          {/* Signature vertical gold hairline between columns */}
          <GoldLine className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block" />

          {/* Interiors */}
          <div className="md:pr-10">
            <SectionLabel>{BRANDS.interiors.name}</SectionLabel>
            <h2 className="mt-4 font-display text-display font-light text-white">Since 1996</h2>
            <p className="mt-5 font-body text-body text-muted">
              Founded by <span className="text-white">Feroz Shaikh</span>, Feroze Interiors is a Mumbai-based
              interior &amp; architecture studio with nearly three decades of craft — delivering over 5,00,000 sq ft
              across hospitality, commercial and residential spaces in India and the Middle East.
            </p>
            <Link
              to={BRANDS.interiors.path}
              className="group mt-8 inline-flex items-center gap-2 font-body text-small uppercase tracking-wider text-gold"
            >
              Explore Interiors
              <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          {/* Automotive */}
          <div className="md:pl-10">
            <SectionLabel color="var(--color-automotive)">{BRANDS.automotive.name}</SectionLabel>
            <h2 className="mt-4 font-display text-display font-light text-white">
              Where Engineering Meets Craftsmanship
            </h2>
            <p className="mt-5 font-body text-body text-muted">
              Founded by <span className="text-white">Ayan Shaikh</span>, Feroze Automotive Decor transforms real
              car parts — V6 to V12 engine blocks, pistons and more — into bespoke statement furniture. India’s 1st
              automotive-inspired furniture brand.
            </p>
            <Link
              to={BRANDS.automotive.path}
              className="group mt-8 inline-flex items-center gap-2 font-body text-small uppercase tracking-wider text-gold"
            >
              Explore Automotive Decor
              <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <Seo
        title=""
        path="/"
        description="FEROZE — luxury interior design and automotive-inspired furniture. Feroze Interiors (since 1996) and Feroze Automotive Decor. Mumbai, working globally."
      />
      <HeroSection />
      <StatsCounter />
      <FeaturedProjects />
      <BrandStorySplit />
      <TestimonialsSlider />
      <InstagramFeed />
      <CtaBanner />
    </PageTransition>
  );
}
