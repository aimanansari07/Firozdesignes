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
import useApi from '../hooks/useApi.js';
import siteSettingsService from '../services/siteSettingsService.js';
import { BRANDS, STATS } from '../utils/constants.js';

function FounderCard({ name, image, role }) {
  if (!image) return null;
  return (
    <div className="mt-6 flex items-center gap-4">
      <img
        src={image}
        alt={name}
        className="h-14 w-14 shrink-0 border border-gold/30 object-cover"
      />
      <div>
        <p className="font-body text-small font-medium text-white">{name}</p>
        {role && <p className="font-body text-caption text-muted">{role}</p>}
      </div>
    </div>
  );
}

function BrandStorySplit({ interiors, automotive }) {
  const founderI = (interiors && interiors.founderName) || BRANDS.interiors.founder;
  const founderImageI = (interiors && interiors.founderImage) || '';
  const since = (interiors && interiors.since) || '1996';
  const descI = (interiors && interiors.description) || '';

  const founderA = (automotive && automotive.founderName) || BRANDS.automotive.founder;
  const founderImageA = (automotive && automotive.founderImage) || '';
  const tagline = (automotive && automotive.tagline) || BRANDS.automotive.tagline;
  const descA = (automotive && automotive.description) || '';

  const bodyI = descI.replace(/^Founded by [^,]+,\s*/, '');
  const bodyA = descA.replace(/^Founded by [^,]+,\s*/, '');

  return (
    <section className="relative bg-bg py-14 md:py-24">
      <div className="container-feroze">
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <GoldLine className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block" />

          <div className="md:pr-10">
            <SectionLabel>{BRANDS.interiors.name}</SectionLabel>
            <h2 className="mt-4 font-display text-display font-light text-white">Since {since}</h2>
            <p className="mt-5 font-body text-body text-muted">
              Founded by <span className="text-white">{founderI}</span>, {bodyI}
            </p>
            <FounderCard
              name={founderI}
              image={founderImageI}
              role={BRANDS.interiors.founderRole}
            />
            <Link
              to={BRANDS.interiors.path}
              className="group mt-8 inline-flex items-center gap-2 font-body text-small uppercase tracking-wider text-gold"
            >
              Explore Interiors
              <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="md:pl-10">
            <SectionLabel color="var(--color-automotive)">{BRANDS.automotive.name}</SectionLabel>
            <h2 className="mt-4 font-display text-display font-light text-white">{tagline}</h2>
            <p className="mt-5 font-body text-body text-muted">
              Founded by <span className="text-white">{founderA}</span>, {bodyA}
            </p>
            <FounderCard
              name={founderA}
              image={founderImageA}
              role={BRANDS.automotive.founderRole}
            />
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
  const { data: settingsData } = useApi(() => siteSettingsService.get(), []);
  const settings = settingsData && settingsData.data;

  return (
    <PageTransition>
      <Seo
        title=""
        path="/"
        description="FEROZE - luxury interior design and automotive-inspired furniture. Feroze Interiors (since 1996) and Feroze Automotive Decor. Mumbai, working globally."
      />
      <HeroSection />
      <StatsCounter stats={(settings && settings.stats && settings.stats.length) ? settings.stats : STATS} />
      <FeaturedProjects />
      <BrandStorySplit
        interiors={settings && settings.interiors}
        automotive={settings && settings.automotive}
      />
      <TestimonialsSlider />
      <InstagramFeed />
      <CtaBanner />
    </PageTransition>
  );
}
