import { MessageCircle } from 'lucide-react';
import Button from '../ui/Button.jsx';
import GoldLine from '../ui/GoldLine.jsx';
import { WHATSAPP_URL } from '../../utils/constants.js';

/** Full-width call-to-action banner. */
export default function CtaBanner({
  headline = 'Have a Project in Mind?',
  subtext = "Let's create something extraordinary together.",
}) {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-14 md:py-24">
      <GoldLine className="absolute left-1/2 top-0 h-16 -translate-x-1/2" />
      <div className="container-feroze text-center">
        <h2 className="mx-auto max-w-3xl font-display text-display font-light text-white text-balance">
          {headline}
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-body text-body text-muted">{subtext}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button to="/contact" variant="gold" size="lg">
            Start a Project
          </Button>
          <Button href={WHATSAPP_URL} variant="ghost" size="lg">
            <MessageCircle size={18} /> WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
