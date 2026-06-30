import Seo from '../../components/ui/Seo.jsx';
import PageTransition from '../../components/layout/PageTransition.jsx';
import SectionLabel from '../../components/ui/SectionLabel.jsx';
import GoldLine from '../../components/ui/GoldLine.jsx';
import LazyImage from '../../components/ui/LazyImage.jsx';
import CtaBanner from '../../components/home/CtaBanner.jsx';
import useApi from '../../hooks/useApi.js';
import siteSettingsService from '../../services/siteSettingsService.js';
import { BRANDS } from '../../utils/constants.js';

const process = [
  { n: '01', title: 'Sourcing', text: 'Authentic engine blocks, pistons, crankshafts and turbochargers are sourced and selected for their character.' },
  { n: '02', title: 'Restoration', text: 'Each component is meticulously cleaned, restored and finished by hand to showroom standard.' },
  { n: '03', title: 'Engineering', text: 'Custom bases, mounts and glass are engineered for stability, safety and sculptural balance.' },
  { n: '04', title: 'Finishing', text: 'Chrome, matte, gloss or gold finishes are applied and the piece is detailed as a collector item.' },
];

export default function AboutAutomotive() {
  const { data: settingsData } = useApi(() => siteSettingsService.get(), []);
  const founderImage = settingsData && settingsData.data && settingsData.data.automotive && settingsData.data.automotive.founderImage;
  const founderName = (settingsData && settingsData.data && settingsData.data.automotive && settingsData.data.automotive.founderName) || 'Ayan Shaikh';
  const tagline = (settingsData && settingsData.data && settingsData.data.automotive && settingsData.data.automotive.tagline) || BRANDS.automotive.tagline;

  return (
    <PageTransition>
      <Seo
        title="About Ayan Shaikh & Feroze Automotive Decor"
        path="/automotive/about"
        description="The story of Feroze Automotive Decor - founded by Ayan Shaikh. Where engineering meets craftsmanship, transforming real car parts into bespoke furniture."
      />

      {/* Hero */}
      <section className="bg-bg pt-24 sm:pt-32">
        <div className="container-feroze grid items-center gap-12 md:grid-cols-2">
          <div>
            <SectionLabel color="var(--color-automotive)">{BRANDS.automotive.founderRole}</SectionLabel>
            <h1 className="mt-4 font-display text-display font-light text-white">{founderName}</h1>
            <p className="mt-2 font-display text-2xl font-light text-gold">{tagline}</p>
            <p className="mt-6 font-body text-body text-muted">
              The next generation of the Feroze legacy — merging two worlds: automobiles and furniture.
            </p>
          </div>
          <LazyImage
            src={founderImage || ''}
            seed="ayan-shaikh-portrait"
            label={founderName}
            automotive
            alt={'Portrait of ' + founderName + ', Director - Design Innovation & Business Development'}
            className="aspect-[4/5] w-full border border-border"
          />
        </div>
      </section>

      {/* Bio */}
      <section className="bg-bg py-12 md:py-20">
        <div className="container-feroze grid gap-10 md:grid-cols-[auto,1fr] md:gap-16">
          <GoldLine className="hidden h-full md:block" color="var(--color-automotive)" />
          <article className="max-w-3xl space-y-6 font-body text-body text-muted">
            <p>
              Ayan Shaikh represents the next generation of the Feroze legacy, carrying forward a family tradition built
              on craftsmanship, design and entrepreneurship.
            </p>
            <p>
              Growing up in an environment shaped by furniture manufacturing, interior execution and creative
              problem-solving, Ayan developed an early passion for design and engineering. Combining technical knowledge
              with creative thinking, he pursued studies in automotive engineering while simultaneously developing
              expertise in furniture design.
            </p>
            <p>
              Driven by his passion for both automobiles and furniture craftsmanship, he introduced a unique fusion
              between the two industries through the creation of Feroze Automotive Decor — transforming iconic automotive
              elements and engineering aesthetics into bespoke furniture pieces.
            </p>
          </article>
        </div>
      </section>

      {/* Brand story */}
      <section className="bg-surface py-12 md:py-20">
        <div className="container-feroze max-w-3xl">
          <SectionLabel color="var(--color-automotive)">The Brand Story</SectionLabel>
          <div className="mt-6 space-y-6 font-body text-body text-muted">
            <p>
              Built upon a family legacy that spans generations in furniture manufacturing and interior design, Feroze
              Automotive Decor combines traditional craftsmanship with automotive inspiration to create statement pieces
              unlike anything else in the market.
            </p>
            <p>
              From V6 to V12 engine block tables to automotive-inspired furniture, wall art and bespoke statement
              pieces, every product celebrates automotive culture while maintaining the standards of craftsmanship
              inherited from generations of furniture makers. Today, the brand proudly serves clients across India and is
              steadily expanding its presence into the Middle East.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-bg py-12 md:py-20">
        <div className="container-feroze">
          <SectionLabel color="var(--color-automotive)">Our Manufacturing Process</SectionLabel>
          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-4">
            {process.map((s) => (
              <div key={s.n} className="bg-bg p-8">
                <span className="data text-2xl text-automotive">{s.n}</span>
                <h3 className="mt-3 font-display text-heading font-light text-white">{s.title}</h3>
                <p className="mt-3 font-body text-small text-muted">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {['workshop-1', 'workshop-2', 'workshop-3'].map((seed) => (
              <LazyImage key={seed} seed={seed} label="Workshop" automotive alt="Feroze Automotive Decor Mumbai workshop" className="aspect-video w-full border border-border" />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        headline="Commission a Statement Piece"
        subtext="Have a specific engine or vision in mind? Let's build it together."
      />
    </PageTransition>
  );
}
