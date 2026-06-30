import Seo from '../../components/ui/Seo.jsx';
import PageTransition from '../../components/layout/PageTransition.jsx';
import SectionLabel from '../../components/ui/SectionLabel.jsx';
import GoldLine from '../../components/ui/GoldLine.jsx';
import LazyImage from '../../components/ui/LazyImage.jsx';
import StatsCounter from '../../components/home/StatsCounter.jsx';
import CtaBanner from '../../components/home/CtaBanner.jsx';
import useApi from '../../hooks/useApi.js';
import siteSettingsService from '../../services/siteSettingsService.js';
import { STATS_EXTENDED } from '../../utils/constants.js';

const timeline = [
  { year: '1996', title: 'Dubai Exposure', text: 'Feroz travels to Dubai to study international design practices, construction methodologies and evolving interior trends.' },
  { year: '1996', title: 'Feroze Interiors Founded', text: 'Returns to Mumbai and founds Feroze Interiors with little more than hand-drawn sketches, creativity and determination.' },
  { year: '2000s', title: 'Hospitality Specialists', text: 'Builds a reputation in themed restaurants and experience-driven spaces — Jugheads, Northern Tadka, Slice of Lime.' },
  { year: 'Today', title: '29+ Years of Growth', text: 'Over 5,00,000 sq ft delivered across India and the Middle East, with an in-house manufacturing facility and a 45-60 member team.' },
];

const capabilities = [
  'Hospitality Interiors',
  'Restaurants & Cafes',
  'Hotels & Resorts',
  'Commercial Interiors',
  'Corporate Offices',
  'Luxury Residences',
  'Villas',
  'Retail Spaces',
  'Turnkey Interior Solutions',
  'Custom Furniture Manufacturing',
];

export default function AboutInteriors() {
  const { data: settingsData } = useApi(() => siteSettingsService.get(), []);
  const founderImage = settingsData?.data?.interiors?.founderImage || '';
  const founderName = settingsData?.data?.interiors?.founderName || 'Feroz Shaikh';

  return (
    <PageTransition>
      <Seo
        title="About Feroz Shaikh - Founder & Principal Designer | Feroze Interiors"
        path="/interiors/about"
        description="Meet Feroz Shaikh, Founder & Principal Designer of Feroze Interiors - a legacy of craftsmanship since 1996."
      />

      {/* Hero */}
      <section className="bg-bg pt-24 sm:pt-32">
        <div className="container-feroze grid items-center gap-12 md:grid-cols-2">
          <div>
            <SectionLabel>Founder &amp; Principal Designer</SectionLabel>
            <h1 className="mt-4 font-display text-display font-light text-white">{founderName}</h1>
            <p className="mt-6 font-body text-body text-muted">
              A legacy of craftsmanship that traces back to his family roots in furniture manufacturing,
              built into a studio delivering experiences people remember.
            </p>
          </div>
          <LazyImage
            key={founderImage || 'interiors-about-placeholder'}
            src={founderImage || undefined}
            seed="feroz-shaikh-portrait"
            label={founderName}
            eager
            alt={'Portrait of ' + founderName + ', Founder & Principal Designer of Feroze Interiors'}
            className="aspect-[4/5] w-full border border-border"
          />
        </div>
      </section>

      {/* Bio */}
      <section className="bg-bg py-12 md:py-20">
        <div className="container-feroze grid gap-10 md:grid-cols-[auto,1fr] md:gap-16">
          <GoldLine className="hidden h-full md:block" />
          <article className="max-w-3xl space-y-6 font-body text-body text-muted">
            <p>
              Feroz Shaikh is the Founder and Principal Designer of Feroze Interiors, a company established in 1996 and
              built on a legacy of craftsmanship that traces back to his family roots in furniture manufacturing.
            </p>
            <p>
              Surrounded by the world of furniture making from an early age, Feroz developed a natural appreciation for
              materials, detailing and handcrafted workmanship. In 1996, he travelled to Dubai to gain exposure to
              international design practices, construction methodologies and evolving interior trends. Returning to
              Mumbai, he founded Feroze Interiors with little more than hand-drawn sketches, creativity and
              determination.
            </p>
            <p>
              Over the years, that vision grew into a company that has delivered over 5,00,000+ square feet of interiors
              across hospitality, commercial and residential sectors throughout India and Middle East. For him, interior
              design is not simply about creating spaces — it is about creating experiences that people remember.
            </p>
          </article>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface py-12 md:py-20">
        <div className="container-feroze">
          <SectionLabel>The Journey</SectionLabel>
          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-4">
            {timeline.map((t) => (
              <div key={t.title} className="bg-surface p-8">
                <span className="data text-2xl text-gold">{t.year}</span>
                <h3 className="mt-3 font-display text-heading font-light text-white">{t.title}</h3>
                <p className="mt-3 font-body text-small text-muted">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-bg py-12 md:py-20">
        <div className="container-feroze">
          <SectionLabel>Studio Capabilities</SectionLabel>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border md:grid-cols-5">
            {capabilities.map((c) => (
              <div key={c} className="flex items-center bg-bg p-6 font-body text-small text-white/90">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsCounter stats={STATS_EXTENDED} id="about-stats" />
      <CtaBanner headline="Let's Build Something Timeless" subtext="From concept to turnkey handover — tell us about your space." />
    </PageTransition>
  );
}
