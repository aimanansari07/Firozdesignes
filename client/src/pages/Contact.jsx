import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import Seo from '../components/ui/Seo.jsx';
import PageTransition from '../components/layout/PageTransition.jsx';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import Button from '../components/ui/Button.jsx';
import GoldLine from '../components/ui/GoldLine.jsx';
import inquiryService from '../services/inquiryService.js';
import { SITE, WHATSAPP_URL, INSTAGRAM, INQUIRY_TYPES, BUDGET_RANGES } from '../utils/constants.js';

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { brand: 'general', inquiryType: 'project' } });

  const brand = watch('brand');
  const inquiryType = watch('inquiryType');

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      await inquiryService.submit(values);
      toast.success("Thank you — we'll get back to you within 24–48 hours.");
      reset();
    } catch (err) {
      toast.error(err.friendlyMessage || 'Could not send. Please try WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const showProjectType = inquiryType === 'project' || brand === 'interiors';
  const showProductType = inquiryType === 'product' || inquiryType === 'custom-order' || brand === 'automotive';

  return (
    <PageTransition>
      <Seo
        title="Contact"
        path="/contact"
        description="Get in touch with Feroze Designs & Holdings — interior design and automotive-inspired furniture. Mumbai | Dubai. WhatsApp +91 83558 21370."
      />

      <section className="bg-bg pt-24 sm:pt-32">
        <div className="container-feroze">
          <SectionLabel>Get in Touch</SectionLabel>
          <h1 className="mt-4 font-display text-display font-light text-white">Let's Create Something Extraordinary</h1>
        </div>
      </section>

      <section className="bg-bg py-10 md:py-16">
        <div className="container-feroze grid gap-12 lg:grid-cols-[1fr,1.4fr] lg:gap-20">
          {/* Left — contact info */}
          <aside>
            <div className="space-y-8">
              <ContactRow icon={MessageCircle} label="WhatsApp" value={SITE.phoneDisplay} href={WHATSAPP_URL} />
              <ContactRow icon={Phone} label="Phone" value={SITE.phoneDisplay} href={`tel:+${SITE.phoneDisplay.replace(/\D/g, '')}`} />
              <ContactRow icon={Mail} label="Email" value={SITE.email} href={`mailto:${SITE.emailHref}`} />
              <ContactRow icon={MapPin} label="Studio" value="Mumbai, India · Expanding to Dubai" />
            </div>

            <div className="mt-10">
              <Button href={WHATSAPP_URL} variant="gold" size="lg" className="w-full sm:w-auto">
                <MessageCircle size={18} /> Message Us on WhatsApp
              </Button>
            </div>

            <div className="mt-8 flex gap-4 font-body text-small text-muted">
              <a href={INSTAGRAM.interiors.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold">@{INSTAGRAM.interiors.handle}</a>
              <span>·</span>
              <a href={INSTAGRAM.automotive.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold">@{INSTAGRAM.automotive.handle}</a>
            </div>

            {/* Map embed placeholder */}
            <div className="mt-8 flex aspect-video items-center justify-center border border-border bg-surface">
              <span className="data text-caption uppercase tracking-widest text-muted">Mumbai Studio — Map</span>
            </div>
          </aside>

          {/* Right — inquiry form */}
          <div className="relative">
            <GoldLine className="absolute -left-10 top-0 hidden h-full lg:block" />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name *" error={errors.name}>
                  <input {...register('name', { required: 'Name is required' })} className="form-input" placeholder="Your name" />
                </Field>
                <Field label="Email *" error={errors.email}>
                  <input {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })} className="form-input" placeholder="you@email.com" />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone *" error={errors.phone}>
                  <input {...register('phone', { required: 'Phone is required' })} className="form-input" placeholder="+91 …" />
                </Field>
                <Field label="Brand Interest">
                  <select {...register('brand')} className="form-input">
                    <option value="general">General</option>
                    <option value="interiors">Feroze Interiors</option>
                    <option value="automotive">Automotive Decor</option>
                    <option value="both">Both</option>
                  </select>
                </Field>
              </div>

              <Field label="Inquiry Type">
                <select {...register('inquiryType')} className="form-input">
                  {INQUIRY_TYPES.map((t) => (
                    <option key={t.key} value={t.key}>{t.label}</option>
                  ))}
                </select>
              </Field>

              {showProjectType && (
                <Field label="Project Type">
                  <select {...register('projectType')} className="form-input">
                    <option value="">Select…</option>
                    {['Restaurant / Café', 'Hotel / Resort', 'Corporate Office', 'Residence / Apartment', 'Villa', 'Retail Space', 'Other'].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              )}

              {showProductType && (
                <Field label="Product Interest">
                  <select {...register('productInterest')} className="form-input">
                    <option value="">Select…</option>
                    {['Engine Block Coffee Table', 'Piston Tower Series', 'Automotive Wall Art', 'Side Table', 'Bespoke / Custom Piece'].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              )}

              <Field label="Approximate Budget">
                <select {...register('budget')} className="form-input">
                  <option value="">Prefer not to say</option>
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </Field>

              <Field label="Message *" error={errors.message}>
                <textarea {...register('message', { required: 'Message is required' })} rows={5} className="form-input resize-none" placeholder="Tell us about your project or requirement…" />
              </Field>

              <Button type="submit" variant="gold" size="lg" disabled={submitting} className="w-full sm:w-auto">
                {submitting ? 'Sending…' : 'Send Inquiry'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-border text-gold">
        <Icon size={18} />
      </span>
      <div>
        <div className="font-body text-caption uppercase tracking-widest text-muted">{label}</div>
        <div className="mt-1 font-body text-body text-white">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block transition hover:opacity-80">
      {inner}
    </a>
  ) : (
    inner
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">{label}</span>
      {children}
      {error && <span className="mt-1 block font-body text-caption text-automotive">{error.message}</span>}
    </label>
  );
}
