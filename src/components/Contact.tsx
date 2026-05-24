import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Send } from 'lucide-react';

const socials = [
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    value: 'Micaela Nichols, RN',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    href: 'mailto:micaela@example.com',
    value: 'micaela@example.com',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    href: 'tel:+19145550000',
    value: '(914) 555-0000',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-3">Get In Touch</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Let's connect.
          </h3>
          <p className="mt-4 text-lg text-muted-foreground font-light max-w-xl">
            Whether you're a healthcare recruiter, fellow clinician, or prospective collaborator — I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-3"
          >
            <form
              action="https://formspree.io/f/placeholder"
              method="POST"
              className="space-y-6"
              data-testid="form-contact"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="contact-name">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="contact-email">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="contact-subject">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can I help you?"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                  data-testid="input-subject"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your opportunity or question..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm resize-none"
                  data-testid="textarea-message"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center h-14 px-8 w-full sm:w-auto text-base font-medium text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.99] transition-all shadow-lg gap-2"
                data-testid="button-submit"
              >
                <Send className="h-5 w-5" />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4 justify-start lg:pt-8"
          >
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Or reach me directly</p>
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label === 'LinkedIn' ? '_blank' : undefined}
                  rel={s.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                  data-testid={`link-social-${s.label.toLowerCase()}`}
                >
                  <div className="h-11 w-11 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mt-0.5">{s.value}</p>
                  </div>
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
