import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL, SITE } from '../../utils/constants.js';

/** Fixed floating WhatsApp button, visible on all public pages. */
export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with FEROZE on WhatsApp at ${SITE.phoneDisplay}`}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-gold/40 bg-surface-2/90 py-3 pl-3 pr-4 shadow-lg backdrop-blur transition-all duration-300 hover:border-gold hover:pr-5"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-bg transition group-hover:bg-gold-light">
        <MessageCircle size={20} />
      </span>
      <span className="hidden font-body text-small tracking-wide text-white sm:inline">
        WhatsApp Us
      </span>
    </a>
  );
}
