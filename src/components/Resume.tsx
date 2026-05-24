import { motion } from 'framer-motion';
import { Download, Award, GraduationCap, FileText } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    title: 'Columbia University',
    subtitle: 'Bachelor of Science in Nursing (BSN)',
    detail: 'Graduated with clinical honors',
  },
  {
    icon: Award,
    title: 'Certifications',
    subtitle: 'RN License • BLS • ACLS • CPR',
    detail: 'All current and active — State of New York',
  },
  {
    icon: FileText,
    title: '5+ Years Experience',
    subtitle: 'Med-Surg, ICU Step-Down, Post-Op',
    detail: 'Across leading New York healthcare systems',
  },
];

export default function Resume() {
  return (
    <section id="resume" className="py-24 bg-card">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex-1"
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-3">Resume</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              A record of excellence in nursing.
            </h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
              Five years of dedicated clinical service across New York's premier healthcare institutions,
              with a foundation built at Columbia University and a commitment to ongoing professional development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center h-14 px-8 text-base font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg gap-2"
                data-testid="link-download-resume"
              >
                <Download className="h-5 w-5" />
                Download Resume (PDF)
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="flex-1 w-full space-y-4"
          >
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="bg-background rounded-2xl border border-border p-6 flex items-start gap-5 hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.subtitle}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{item.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
