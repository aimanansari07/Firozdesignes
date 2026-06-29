import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionLabel from '../ui/SectionLabel.jsx';
import TestimonialCard from '../ui/TestimonialCard.jsx';
import useApi from '../../hooks/useApi.js';
import testimonialService from '../../services/testimonialService.js';

import 'swiper/css';
import 'swiper/css/pagination';

/** Auto-playing testimonials carousel with gold navigation. */
export default function TestimonialsSlider({ brand }) {
  const { data } = useApi(() => testimonialService.list(brand ? { brand } : {}), [brand]);
  const items = data?.data || [];
  if (!items.length) return null;

  return (
    <section className="bg-surface py-14 md:py-24">
      <div className="container-feroze">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionLabel>Client Voices</SectionLabel>
          <div className="flex gap-3">
            <button className="swiper-prev-t flex h-11 w-11 items-center justify-center border border-border text-gold transition hover:border-gold" aria-label="Previous testimonial">
              <ChevronLeft size={20} />
            </button>
            <button className="swiper-next-t flex h-11 w-11 items-center justify-center border border-border text-gold transition hover:border-gold" aria-label="Next testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={24}
          loop={items.length > 1}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          navigation={{ prevEl: '.swiper-prev-t', nextEl: '.swiper-next-t' }}
          breakpoints={{ 1024: { slidesPerView: items.length > 1 ? 2 : 1 } }}
        >
          {items.map((t) => (
            <SwiperSlide key={t._id} className="h-auto self-stretch">
              <TestimonialCard testimonial={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
