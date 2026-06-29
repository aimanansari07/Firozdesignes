import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Seo from '../../components/ui/Seo.jsx';
import PageTransition from '../../components/layout/PageTransition.jsx';
import SectionLabel from '../../components/ui/SectionLabel.jsx';
import Button from '../../components/ui/Button.jsx';
import GoldLine from '../../components/ui/GoldLine.jsx';
import LazyImage from '../../components/ui/LazyImage.jsx';
import ProjectFilter from '../../components/interiors/ProjectFilter.jsx';
import ProjectsGrid from '../../components/interiors/ProjectsGrid.jsx';
import StatsCounter from '../../components/home/StatsCounter.jsx';
import CtaBanner from '../../components/home/CtaBanner.jsx';
import useApi from '../../hooks/useApi.js';
import projectService from '../../services/projectService.js';
import { BRANDS } from '../../utils/constants.js';

export default function InteriorsHome() {
  const [category, setCategory] = useState('all');
  const { data, loading } = useApi(() => projectService.list({ limit: 9 }), []);
  const all = data?.data || [];
  const projects = useMemo(
    () => (category === 'all' ? all : all.filter((p) => p.category === category)).slice(0, 9),
    [all, category]
  );

  return (
    <PageTransition>
      <Seo
        title="Feroze Interiors — Interior & Architecture Design Studio Since 1996"
        path="/interiors"
        description="Feroze Interiors — a Mumbai-based interior & architecture design studio since 1996. 5,00,000+ sq ft delivered across hospitality, commercial and residential projects in India & the Middle East."
      />

      {/* Hero */}
      <section className="relative flex min-h-[65vh] sm:min-h-[80vh] items-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/videos/hero-interiors.mp4"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/20" />
        <div className="container-feroze relative z-10 pt-16 sm:pt-20">
          <SectionLabel>Feroze Interiors</SectionLabel>
          <h1 className="mt-5 max-w-4xl font-display font-light text-white" style={{ fontSize: 'var(--text-display)' }}>
            Creating Spaces That People Remember
          </h1>
          <p className="mt-5 max-w-xl font-body text-body text-muted">
            {BRANDS.interiors.descriptor}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/interiors/projects" variant="gold">View Projects</Button>
            <Button to="/interiors/about" variant="ghost">Meet the Founder</Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-bg py-12 md:py-20">
        <div className="container-feroze grid gap-10 md:grid-cols-[auto,1fr] md:gap-16">
          <GoldLine className="hidden h-full md:block" />
          <div className="max-w-3xl">
            <p className="font-display text-2xl font-light leading-snug text-white md:text-3xl">
              Established in 1996 by Feroz Shaikh, Feroze Interiors blends functionality, innovation and timeless
              aesthetics — backed by an in-house furniture manufacturing facility in Mumbai.
            </p>
            <p className="mt-6 font-body text-body text-muted">
              From concept development and space planning to turnkey execution and final handover, we deliver
              complete interior solutions tailored to each client’s vision — across restaurants, cafés, hotels,
              resorts, corporate offices, luxury residences, villas and retail spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Projects gallery */}
      <section className="bg-bg pb-14 md:pb-24">
        <div className="container-feroze">
          <div className="mb-8 flex flex-col gap-6">
            <SectionLabel>Selected Work</SectionLabel>
            <ProjectFilter active={category} onChange={setCategory} />
          </div>
          <ProjectsGrid projects={projects} loading={loading} />
          <div className="mt-12 text-center">
            <Button to="/interiors/projects" variant="ghost" size="lg">View All Projects</Button>
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* Meet the founder teaser */}
      <section className="bg-surface py-14 md:py-24">
        <div className="container-feroze grid items-center gap-12 md:grid-cols-2">
          <LazyImage seed="feroz-shaikh-portrait" label="Feroz Shaikh" alt="Feroz Shaikh, Founder & Principal Designer" className="aspect-[4/5] w-full border border-border" />
          <div>
            <SectionLabel>The Founder</SectionLabel>
            <h2 className="mt-4 font-display text-display font-light text-white">Feroz Shaikh</h2>
            <p className="mt-2 font-body text-small uppercase tracking-wider text-gold">Founder &amp; Principal Designer</p>
            <p className="mt-6 font-body text-body text-muted">
              Surrounded by furniture-making from an early age, Feroz built Feroze Interiors from hand-drawn sketches
              into a studio that has delivered over 5,00,000 sq ft across India and the Middle East — while remaining
              deeply involved in the creative process to this day.
            </p>
            <Link to="/interiors/about" className="group mt-8 inline-flex items-center gap-2 font-body text-small uppercase tracking-wider text-gold">
              Read Full Story
              <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </PageTransition>
  );
}
