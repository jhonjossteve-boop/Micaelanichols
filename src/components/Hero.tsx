import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="min-h-[100dvh] flex items-center justify-center pt-20 pb-16 relative overflow-hidden bg-background"
    >
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground tracking-wide">
              Registered Nurse • New Rochelle, NY
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-[1.1] mb-8"
          >
            Clinical precision. <br />
            <span className="text-primary italic font-normal">Genuine warmth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12 font-light leading-relaxed"
          >
            Compassionate care, clinical excellence — every patient, every time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#resume"
              className="inline-flex items-center justify-center h-14 px-8 text-base font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg"
              data-testid="link-view-resume"
            >
              View Resume
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center h-14 px-8 text-base font-medium text-foreground bg-card border border-border rounded-lg hover:bg-muted hover:scale-[1.02] transition-all shadow-sm"
              data-testid="link-contact-me"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}