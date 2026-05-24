import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote:
      "Micaela is one of the most gifted nurses I have had the pleasure of working alongside. Her clinical instincts are sharp, her bedside manner is extraordinary, and her patients consistently leave in better spirits than when they arrived. She is a true asset to any unit.",
    name: 'Dr. Renata Osei',
    title: 'Attending Physician, Montefiore Medical Center',
  },
  {
    id: 2,
    quote:
      "In my 20 years of nursing leadership, Micaela stands out for her rare combination of clinical excellence and emotional intelligence. She advocates fiercely for her patients and brings a calm, confident presence to even the most high-pressure situations.",
    name: 'Margaret Vásquez, RN, MSN',
    title: 'Nurse Manager, Westchester Medical Center',
  },
  {
    id: 3,
    quote:
      "As a patient who spent three weeks recovering from surgery, I can honestly say that Micaela made the experience bearable — and at times, even uplifting. She remembered the small details that mattered to me and made me feel like a person, not a chart number.",
    name: 'James T.',
    title: 'Former Patient, Montefiore Medical Center',
  },
  {
    id: 4,
    quote:
      "Working with Micaela during clinical rotations at NewYork-Presbyterian was an inspiration. She demonstrated a level of professionalism and compassion well beyond her training years. She is exactly the kind of nurse the profession needs more of.",
    name: 'Prof. Linda Chow, PhD, RN',
    title: 'Clinical Faculty, Columbia University School of Nursing',
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-3">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            What others are saying
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t) => (
                <div key={t.id} className="flex-[0_0_100%] min-w-0 px-2 md:px-4">
                  <div className="bg-card border border-border rounded-3xl p-10 md:p-14 relative max-w-3xl mx-auto">
                    <Quote className="absolute top-8 left-8 h-10 w-10 text-primary/20" strokeWidth={1} />
                    <blockquote className="text-lg md:text-xl text-foreground font-light leading-relaxed mb-8 relative z-10">
                      "{t.quote}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-serif font-bold text-lg">
                          {t.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={scrollPrev}
              className="h-11 w-11 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary hover:scale-105 transition-all text-muted-foreground"
              data-testid="button-testimonial-prev"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === i ? 'bg-primary w-6' : 'bg-border w-2 hover:bg-muted-foreground'
                  }`}
                  data-testid={`button-testimonial-dot-${i}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="h-11 w-11 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary hover:scale-105 transition-all text-muted-foreground"
              data-testid="button-testimonial-next"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
