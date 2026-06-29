import { useState } from 'react';
import { Instagram } from 'lucide-react';
import SectionLabel from '../ui/SectionLabel.jsx';
import Button from '../ui/Button.jsx';
import LazyImage from '../ui/LazyImage.jsx';
import ImageLightbox from '../ui/ImageLightbox.jsx';
import { INSTAGRAM } from '../../utils/constants.js';

/**
 * Instagram grid. The Instagram Basic Display API requires a server token; until
 * configured we show a tasteful static grid (4 per account) so the section is
 * always populated. Each tile opens in the lightbox.
 */
const tiles = [
  { seed: 'ig-int-1', account: 'interiors', label: 'Jugheads' },
  { seed: 'ig-int-2', account: 'interiors', label: 'Hospitality' },
  { seed: 'ig-int-3', account: 'interiors', label: 'Luxury Residence' },
  { seed: 'ig-int-4', account: 'interiors', label: 'Northern Tadka' },
  { seed: 'ig-auto-1', account: 'automotive', label: 'V8 Table' },
  { seed: 'ig-auto-2', account: 'automotive', label: 'Piston Tower' },
  { seed: 'ig-auto-3', account: 'automotive', label: 'Wall Art' },
  { seed: 'ig-auto-4', account: 'automotive', label: 'V12 Table' },
];

export default function InstagramFeed() {
  const [lightbox, setLightbox] = useState(null);
  const images = tiles.map(() => null); // placeholders resolve inside lightbox by seed

  return (
    <section className="bg-bg py-14 md:py-24">
      <div className="container-feroze">
        <div className="mb-12 text-center">
          <div className="flex justify-center">
            <SectionLabel>Follow the Journey</SectionLabel>
          </div>
          <p className="mt-4 font-body text-small uppercase tracking-wider text-muted">
            @{INSTAGRAM.interiors.handle} · @{INSTAGRAM.automotive.handle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tiles.map((t, i) => (
            <button
              key={t.seed}
              onClick={() => setLightbox(i)}
              className="group relative aspect-square overflow-hidden border border-border transition-colors hover:border-gold"
              aria-label={`Open ${t.label} image`}
            >
              <LazyImage
                seed={t.seed}
                label={t.label}
                automotive={t.account === 'automotive'}
                alt={`Feroze ${t.account} — ${t.label}`}
                className="h-full w-full transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-bg/0 opacity-0 transition-all duration-300 group-hover:bg-bg/40 group-hover:opacity-100">
                <Instagram className="text-gold" size={24} />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button href={INSTAGRAM.interiors.url} variant="ghost" size="md">
            <Instagram size={16} /> @{INSTAGRAM.interiors.handle}
          </Button>
          <Button href={INSTAGRAM.automotive.url} variant="ghost" size="md">
            <Instagram size={16} /> @{INSTAGRAM.automotive.handle}
          </Button>
        </div>
      </div>

      {lightbox !== null && (
        <ImageLightbox
          images={images}
          index={lightbox}
          seed="ig"
          onClose={() => setLightbox(null)}
          onNavigate={setLightbox}
        />
      )}
    </section>
  );
}
