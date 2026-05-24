import { FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

const socials = [
  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:micaela@example.com', label: 'Email' },
  { icon: FaPhone, href: 'tel:+19145550000', label: 'Phone' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-xl font-serif font-bold text-foreground">
              Micaela Nichols<span className="text-primary text-sm align-super ml-1">RN</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Compassionate care, clinical excellence — every patient, every time.
            </p>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex flex-wrap justify-center gap-x-8 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.label === 'LinkedIn' ? '_blank' : undefined}
                  rel={s.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                  className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                  data-testid={`link-footer-${s.label.toLowerCase()}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Micaela Nichols, RN. All rights reserved. New Rochelle, NY.
          </p>
        </div>
      </div>
    </footer>
  );
}
