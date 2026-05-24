import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 bg-card relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1"
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-3">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              A commitment to excellence in patient care.
            </h3>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                As a Registered Nurse based in New Rochelle, NY, my practice is built on a foundation of rigorous clinical training and an unwavering dedication to patient advocacy. I believe that exceptional healthcare requires both technical precision and genuine empathy.
              </p>
              <p>
                A proud graduate of Columbia University's prestigious BSN program, I have cultivated my skills across diverse clinical environments, from high-acuity ICUs to specialized Med-Surg units. My approach is holistic—treating the whole person, not just the diagnosis.
              </p>
              <p>
                Whether I am coordinating complex care plans, administering critical medications, or educating patients and their families, my mission remains constant: to provide safe, compassionate, and evidence-based care to every patient, every time.
              </p>
            </div>
          </motion.div>

          {/* Stats/Highlight Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
          >
            <div className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-serif text-primary mb-2">Columbia</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">University BSN</div>
              <p className="mt-4 text-sm text-foreground/80">Graduated with clinical honors from a top-tier nursing program.</p>
            </div>

            <div className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow mt-0 sm:mt-12">
              <div className="text-4xl font-serif text-primary mb-2">5+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years Clinical Exp</div>
              <p className="mt-4 text-sm text-foreground/80">Extensive experience across high-acuity and Med-Surg units.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}