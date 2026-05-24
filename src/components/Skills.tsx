import { motion } from 'framer-motion';
import { Heart, Shield, BookOpen, Users, Activity, FileText, Zap, Award } from 'lucide-react';

const skillCategories = [
  {
    icon: Heart,
    label: 'Patient Assessment',
    description: 'Comprehensive head-to-toe assessments and continuous monitoring of patient status.',
  },
  {
    icon: Activity,
    label: 'Critical Care',
    description: 'ICU step-down experience with hemodynamic monitoring and emergency response.',
  },
  {
    icon: Shield,
    label: 'Medication Administration',
    description: 'Safe administration of complex medication regimens with strict error-prevention protocols.',
  },
  {
    icon: Zap,
    label: 'IV Therapy & Wound Care',
    description: 'Skilled in IV line management, infusion therapy, and advanced wound care techniques.',
  },
  {
    icon: FileText,
    label: 'EHR / EMR Systems',
    description: 'Proficient in EPIC and other electronic health record platforms for accurate documentation.',
  },
  {
    icon: BookOpen,
    label: 'Patient Education',
    description: 'Empowering patients and families with clear, compassionate education for self-care and recovery.',
  },
  {
    icon: Users,
    label: 'Care Coordination',
    description: 'Seamless collaboration with physicians, specialists, and support staff for holistic patient outcomes.',
  },
  {
    icon: Award,
    label: 'BLS / ACLS Certified',
    description: 'Current certifications in Basic and Advanced Cardiovascular Life Support, CPR, and emergency response.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-card">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-3">Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Clinical Skills & Competencies
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.label}
                variants={cardVariants}
                className="group bg-background rounded-2xl border border-border p-7 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
                data-testid={`card-skill-${skill.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors mb-5">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h4 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {skill.label}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Certifications row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {['RN License — New York', 'BLS Certified', 'ACLS Certified', 'CPR Certified', 'HIPAA Compliant', 'Columbia University BSN'].map((cert) => (
            <span
              key={cert}
              className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
            >
              {cert}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
