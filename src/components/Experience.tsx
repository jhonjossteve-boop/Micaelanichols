import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: 'Staff RN',
    employer: 'Montefiore Medical Center',
    location: 'Bronx, NY',
    period: '2022 — Present',
    responsibilities: [
      'Provide comprehensive patient care in a high-volume Medical-Surgical unit',
      'Perform thorough patient assessments, vital monitoring, and care plan development',
      'Administer medications with precision and maintain meticulous documentation',
      'Collaborate with interdisciplinary teams to coordinate complex care transitions',
      'Educate patients and families on discharge plans and self-care strategies',
    ],
  },
  {
    id: 2,
    role: 'Registered Nurse',
    employer: 'Westchester Medical Center',
    location: 'Valhalla, NY',
    period: '2020 — 2022',
    responsibilities: [
      'Delivered specialized care in a fast-paced ICU step-down unit',
      'Managed post-operative recovery for cardiac, thoracic, and general surgery patients',
      'Maintained accurate and timely EHR documentation using EPIC system',
      'Performed hemodynamic monitoring and responded to rapid deterioration events',
      'Mentored newly graduated nurses during onboarding rotations',
    ],
  },
  {
    id: 3,
    role: 'Student Nurse Extern',
    employer: 'NewYork-Presbyterian Hospital',
    location: 'New York, NY',
    period: '2019 — 2020',
    responsibilities: [
      'Completed rigorous clinical rotations across multiple specialty units as part of Columbia BSN program',
      'Assisted RNs with patient assessment, documentation, and direct patient care',
      'Developed foundational clinical skills in a world-class academic medical center',
      'Demonstrated exceptional initiative, earning recognition from supervising nurses',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-3">Career</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Professional Experience
          </h3>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
                className="relative sm:pl-24 pl-0"
              >
                {/* Dot */}
                <div className="hidden sm:flex absolute left-4 md:left-8 top-1 -translate-x-1/2 h-4 w-4 rounded-full bg-primary border-4 border-background shadow" />

                <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                        {exp.role}
                      </h4>
                      <p className="text-primary font-medium mt-1">{exp.employer}</p>
                      <p className="text-sm text-muted-foreground mt-1">{exp.location}</p>
                    </div>
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium whitespace-nowrap self-start">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {exp.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
