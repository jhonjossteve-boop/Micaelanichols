import { useState, useEffect, useRef } from "react";

const PALETTE = {
  cream: "#FAF8F5",
  white: "#FFFFFF",
  offwhite: "#F5F2EE",
  teal: "#2A8C7A",
  tealLight: "#3AADA0",
  tealDark: "#1A6B5C",
  tealPale: "#E8F4F2",
  navy: "#1C2B3A",
  navyMid: "#2D4057",
  slate: "#4A6274",
  muted: "#7A8C96",
  border: "#DDD8D0",
  gold: "#C9A96E",
  goldLight: "#E8D5AA",
  warmGray: "#9A9087",
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${PALETTE.cream};
    color: ${PALETTE.navy};
    overflow-x: hidden;
  }

  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes floatBubble {
    0%, 100% { transform: translateY(0px) scale(1); }
    50%       { transform: translateY(-18px) scale(1.03); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50%       { opacity: 1; }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes progressBar {
    from { width: 0; }
    to   { width: var(--target-width); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeUp { animation: fadeUp 0.7s ease forwards; }
  .animate-fadeIn { animation: fadeIn 0.7s ease forwards; }

  nav a { text-decoration: none; color: inherit; }

  section { position: relative; }

  input, textarea, button { font-family: inherit; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${PALETTE.offwhite}; }
  ::-webkit-scrollbar-thumb { background: ${PALETTE.tealLight}; border-radius: 3px; }

  .btn-primary {
    background: ${PALETTE.teal};
    color: ${PALETTE.white};
    border: none;
    padding: 14px 32px;
    border-radius: 2px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-block;
    text-decoration: none;
  }
  .btn-primary:hover { background: ${PALETTE.tealDark}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(42,140,122,0.25); }

  .btn-outline {
    background: transparent;
    color: ${PALETTE.navy};
    border: 1px solid ${PALETTE.navy};
    padding: 13px 32px;
    border-radius: 2px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-block;
    text-decoration: none;
  }
  .btn-outline:hover { background: ${PALETTE.navy}; color: ${PALETTE.white}; transform: translateY(-2px); }

  .section-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${PALETTE.teal};
    display: block;
    margin-bottom: 16px;
  }

  .section-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(36px, 5vw, 52px);
    font-weight: 300;
    line-height: 1.15;
    color: ${PALETTE.navy};
  }

  .divider {
    width: 48px;
    height: 2px;
    background: ${PALETTE.gold};
    margin: 24px 0;
  }
`;

function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function AnimatedSection({ children, style = {}, delay = 0 }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 1000, background: PALETTE.border }}>
      <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${PALETTE.teal}, ${PALETTE.gold})`, transition: "width 0.1s linear" }} />
    </div>
  );
}

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Education", "Experience", "Skills", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 3, left: 0, right: 0, zIndex: 999,
      background: scrolled ? "rgba(250,248,245,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${PALETTE.border}` : "none",
      transition: "all 0.4s ease",
      padding: "0 40px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="#hero" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: PALETTE.navy, letterSpacing: 1 }}>
          M. Nichols
        </a>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{
                fontSize: 12, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase",
                color: active === l.toLowerCase() ? PALETTE.teal : PALETTE.slate,
                transition: "color 0.2s", position: "relative",
                paddingBottom: 4,
              }}
              onMouseEnter={e => e.target.style.color = PALETTE.teal}
              onMouseLeave={e => e.target.style.color = active === l.toLowerCase() ? PALETTE.teal : PALETTE.slate}
            >
              {l}
            </a>
          ))}
          <a href="#contact" className="btn-primary" style={{ padding: "10px 24px", fontSize: 11 }}>Hire Me</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: PALETTE.cream }}>
      {/* Decorative elements */}
      <div style={{
        position: "absolute", top: -80, right: -80, width: 600, height: 600,
        borderRadius: "50%", background: `radial-gradient(circle, ${PALETTE.tealPale} 0%, transparent 70%)`,
        animation: "floatBubble 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: -100, left: -60, width: 400, height: 400,
        borderRadius: "50%", background: `radial-gradient(circle, ${PALETTE.goldLight}55 0%, transparent 70%)`,
        animation: "floatBubble 12s ease-in-out infinite reverse",
      }} />
      <div style={{
        position: "absolute", top: "30%", left: "50%", width: 2, height: 120,
        background: `linear-gradient(180deg, transparent, ${PALETTE.border}, transparent)`,
        display: "none",
      }} />

      {/* Thin decorative lines */}
      <div style={{ position: "absolute", top: 120, left: 40, display: "flex", flexDirection: "column", gap: 8 }}>
        {[60, 40, 80].map((w, i) => (
          <div key={i} style={{ width: w, height: 1, background: PALETTE.gold, opacity: 0.5 }} />
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", width: "100%" }}>
        {/* Left: Text */}
        <div>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.8s ease 0.1s" }}>
            <span className="section-label">Registered Nurse · New Rochelle, NY</span>
          </div>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(24px)", transition: "all 0.8s ease 0.3s" }}>
            <h1 className="serif" style={{ fontSize: "clamp(52px, 7vw, 80px)", fontWeight: 300, lineHeight: 1.05, color: PALETTE.navy, marginBottom: 8 }}>
              Micaela<br />
              <span style={{ fontStyle: "italic", color: PALETTE.teal }}>Nichols</span>
            </h1>
          </div>
          <div style={{ opacity: loaded ? 1 : 0, transition: "all 0.8s ease 0.5s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
              <div style={{ width: 40, height: 1, background: PALETTE.gold }} />
              <span style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: PALETTE.warmGray, fontWeight: 500 }}>Columbia University</span>
            </div>
          </div>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)", transition: "all 0.8s ease 0.6s" }}>
            <p style={{ fontSize: 18, lineHeight: 1.75, color: PALETTE.slate, maxWidth: 440, marginBottom: 48 }}>
              Compassionate Registered Nurse dedicated to patient-centered care, clinical excellence, and improving community health outcomes.
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", opacity: loaded ? 1 : 0, transition: "all 0.8s ease 0.8s" }}>
            <a href="#" className="btn-primary">View Resume</a>
            <a href="#contact" className="btn-outline">Contact Me</a>
          </div>

          <div style={{ marginTop: 64, display: "flex", gap: 40, opacity: loaded ? 1 : 0, transition: "all 0.8s ease 1s" }}>
            {[["5+", "Years Experience"], ["1,200+", "Patients Cared For"], ["8", "Certifications"]].map(([num, label]) => (
              <div key={label}>
                <div className="serif" style={{ fontSize: 32, fontWeight: 400, color: PALETTE.navy, lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 11, color: PALETTE.muted, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Portrait */}
        <div style={{ display: "flex", justifyContent: "center", opacity: loaded ? 1 : 0, transition: "all 1s ease 0.4s" }}>
          <div style={{ position: "relative" }}>
            {/* Decorative frame */}
            <div style={{
              position: "absolute", top: -20, left: -20, right: 20, bottom: 20,
              border: `1px solid ${PALETTE.gold}44`, borderRadius: 4,
            }} />
            <div style={{
              width: 380, height: 480, borderRadius: 4,
              background: `linear-gradient(160deg, ${PALETTE.tealPale} 0%, ${PALETTE.offwhite} 50%, ${PALETTE.goldLight}44 100%)`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              {/* Placeholder portrait */}
              <div style={{
                width: 140, height: 140, borderRadius: "50%",
                background: `linear-gradient(135deg, ${PALETTE.teal}33, ${PALETTE.teal}88)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="24" r="14" fill={PALETTE.teal} opacity="0.6" />
                  <ellipse cx="32" cy="54" rx="22" ry="14" fill={PALETTE.teal} opacity="0.4" />
                </svg>
              </div>
              <div style={{ textAlign: "center", padding: "0 32px" }}>
                <div className="serif" style={{ fontSize: 20, color: PALETTE.navy, fontWeight: 400 }}>Micaela Nichols</div>
                <div style={{ fontSize: 12, color: PALETTE.teal, letterSpacing: 2, textTransform: "uppercase", marginTop: 6 }}>RN, BSN</div>
              </div>
              {/* Cross icon */}
              <div style={{ position: "absolute", top: 24, right: 24, opacity: 0.15 }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="13" y="4" width="6" height="24" rx="2" fill={PALETTE.teal} />
                  <rect x="4" y="13" width="24" height="6" rx="2" fill={PALETTE.teal} />
                </svg>
              </div>
              <div style={{ position: "absolute", bottom: 24, left: 24, opacity: 0.1 }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" stroke={PALETTE.navy} strokeWidth="1" />
                  <circle cx="24" cy="24" r="12" stroke={PALETTE.navy} strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* Badge */}
            <div style={{
              position: "absolute", bottom: -16, right: -16,
              background: PALETTE.white, border: `1px solid ${PALETTE.border}`,
              borderRadius: 4, padding: "16px 24px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}>
              <div style={{ fontSize: 11, color: PALETTE.muted, letterSpacing: 2, textTransform: "uppercase" }}>Education</div>
              <div className="serif" style={{ fontSize: 18, color: PALETTE.navy, marginTop: 4 }}>Columbia University</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "pulse 2s ease-in-out infinite" }}>
        <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: PALETTE.muted }}>Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke={PALETTE.muted} strokeWidth="1" />
          <rect x="7" y="5" width="2" height="6" rx="1" fill={PALETTE.teal} />
        </svg>
      </div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const visible = useIntersection(ref);

  const milestones = [
    { year: "2017", title: "Columbia University", desc: "Enrolled in Bachelor of Science in Nursing program, graduating with distinction." },
    { year: "2021", title: "BSN Graduate", desc: "Completed clinical rotations across multiple specialties including ICU, ER, and pediatrics." },
    { year: "2021", title: "RN Licensure", desc: "Passed NCLEX-RN on first attempt and received New York state licensure." },
    { year: "2022", title: "Clinical Practice", desc: "Joined a leading healthcare system in the New York metro area, specializing in acute care." },
    { year: "2024", title: "Advanced Certifications", desc: "Earned ACLS and Critical Care certifications to expand scope of practice." },
  ];

  const values = [
    { icon: "♡", label: "Empathy", desc: "Every patient is a whole person deserving dignity and compassionate care." },
    { icon: "◎", label: "Precision", desc: "Clinical accuracy and meticulous attention to detail in all patient interactions." },
    { icon: "◈", label: "Leadership", desc: "Mentoring newer nurses and advocating within interdisciplinary care teams." },
    { icon: "◇", label: "Communication", desc: "Clear, honest dialogue with patients, families, and colleagues at every stage." },
  ];

  return (
    <section id="about" style={{ padding: "120px 40px", background: PALETTE.white }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: "all 0.7s ease" }}>
            <span className="section-label">About Me</span>
            <h2 className="section-title">A Nurse Driven by<br /><em>Purpose & Compassion</em></h2>
            <div className="divider" />
            <p style={{ fontSize: 16, lineHeight: 1.85, color: PALETTE.slate, marginBottom: 24 }}>
              Nursing, for me, has always been more than a profession — it is a calling rooted in genuine care for people at their most vulnerable. As a Columbia University graduate, I bring rigorous academic training alongside an unwavering commitment to patient advocacy.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: PALETTE.slate, marginBottom: 40 }}>
              Based in New Rochelle, NY, I work at the intersection of clinical excellence and community wellness. Whether at the bedside or collaborating with a multidisciplinary team, I strive to elevate the standard of care for every patient I serve.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {values.map((v, i) => (
                <div key={i} style={{
                  padding: "24px", background: PALETTE.cream, borderRadius: 2,
                  borderLeft: `2px solid ${PALETTE.teal}`,
                  opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)",
                  transition: `all 0.7s ease ${i * 100 + 400}ms`,
                }}>
                  <div style={{ fontSize: 20, marginBottom: 8, color: PALETTE.teal }}>{v.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: PALETTE.navy, marginBottom: 6 }}>{v.label}</div>
                  <div style={{ fontSize: 13, color: PALETTE.muted, lineHeight: 1.6 }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: "all 0.7s ease 0.2s" }}>
            <span className="section-label">Career Journey</span>
            <div style={{ position: "relative", paddingLeft: 32 }}>
              <div style={{ position: "absolute", left: 6, top: 0, bottom: 0, width: 1, background: PALETTE.border }} />
              {milestones.map((m, i) => (
                <div key={i} style={{
                  position: "relative", marginBottom: 40,
                  opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-16px)",
                  transition: `all 0.7s ease ${i * 150 + 300}ms`,
                }}>
                  <div style={{
                    position: "absolute", left: -32, top: 4, width: 13, height: 13,
                    borderRadius: "50%", background: PALETTE.white,
                    border: `2px solid ${i === milestones.length - 1 ? PALETTE.teal : PALETTE.gold}`,
                    boxShadow: i === milestones.length - 1 ? `0 0 0 4px ${PALETTE.tealPale}` : "none",
                  }} />
                  <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: PALETTE.teal, marginBottom: 6 }}>{m.year}</div>
                  <div className="serif" style={{ fontSize: 20, fontWeight: 400, color: PALETTE.navy, marginBottom: 8 }}>{m.title}</div>
                  <div style={{ fontSize: 14, color: PALETTE.slate, lineHeight: 1.65 }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  const creds = [
    { type: "Degree", title: "Bachelor of Science in Nursing", sub: "Columbia University School of Nursing", year: "2021", detail: "Graduated with honors. Focus areas: acute care, evidence-based practice, and community health." },
    { type: "License", title: "Registered Nurse (RN)", sub: "New York State Department of Education", year: "2021", detail: "Active license in good standing. License No. XXXXXX." },
    { type: "Certification", title: "Basic Life Support (BLS)", sub: "American Heart Association", year: "2024", detail: "Current certification, valid through 2026." },
    { type: "Certification", title: "Advanced Cardiovascular Life Support (ACLS)", sub: "American Heart Association", year: "2024", detail: "Proficient in managing cardiac arrest and peri-arrest scenarios." },
    { type: "Certification", title: "Critical Care Registered Nurse (CCRN)", sub: "American Association of Critical-Care Nurses", year: "2023", detail: "Demonstrates specialized knowledge in critically ill patient populations." },
    { type: "Education", title: "Continuing Education", sub: "Various Accredited Institutions", year: "Ongoing", detail: "40+ hours annually in wound care, pharmacology updates, and sepsis management." },
  ];

  const typeColors = {
    Degree: PALETTE.teal,
    License: PALETTE.navy,
    Certification: PALETTE.gold,
    Education: PALETTE.slate,
  };

  return (
    <section id="education" style={{ padding: "120px 40px", background: PALETTE.cream }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="section-label">Academic & Professional</span>
            <h2 className="section-title">Education &<br /><em>Credentials</em></h2>
            <div className="divider" style={{ margin: "24px auto" }} />
          </div>
        </AnimatedSection>

        {/* Columbia Feature Card */}
        <AnimatedSection delay={100} style={{ marginBottom: 48 }}>
          <div style={{
            background: PALETTE.navy, borderRadius: 4, padding: "56px 64px",
            display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, background: `radial-gradient(circle, ${PALETTE.teal}22 0%, transparent 70%)` }} />
            <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", border: `1px solid ${PALETTE.white}11` }} />
            <div>
              <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: PALETTE.gold, marginBottom: 16, display: "block" }}>Flagship Institution</span>
              <h3 className="serif" style={{ fontSize: 40, fontWeight: 300, color: PALETTE.white, marginBottom: 12 }}>Columbia University</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 480 }}>
                School of Nursing · Bachelor of Science in Nursing · Class of 2021. Ranked among the top nursing programs in the United States, Columbia provided rigorous preparation across clinical practice, research, and healthcare leadership.
              </p>
            </div>
            <div style={{ textAlign: "center", position: "relative" }}>
              <div style={{ width: 100, height: 100, borderRadius: "50%", border: `1px solid ${PALETTE.gold}66`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", border: `1px solid ${PALETTE.gold}99`, display: "flex", alignItems: "center", justifyContent: "center", background: `${PALETTE.teal}22` }}>
                  <span className="serif" style={{ fontSize: 26, color: PALETTE.gold, fontStyle: "italic" }}>CU</span>
                </div>
              </div>
              <div style={{ marginTop: 16, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Est. 1754</div>
            </div>
          </div>
        </AnimatedSection>

        {/* Credentials Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {creds.map((c, i) => (
            <AnimatedSection key={i} delay={i * 80}>
              <div style={{
                background: PALETTE.white, borderRadius: 2, padding: "32px",
                border: `1px solid ${PALETTE.border}`, height: "100%",
                transition: "all 0.3s ease", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.08)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  display: "inline-block", fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
                  color: typeColors[c.type] || PALETTE.slate,
                  borderBottom: `1px solid ${typeColors[c.type] || PALETTE.slate}`,
                  paddingBottom: 3, marginBottom: 16,
                }}>
                  {c.type}
                </div>
                <div className="serif" style={{ fontSize: 20, fontWeight: 400, color: PALETTE.navy, marginBottom: 6, lineHeight: 1.3 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: PALETTE.teal, marginBottom: 16 }}>{c.sub}</div>
                <div style={{ fontSize: 13, color: PALETTE.muted, lineHeight: 1.65, marginBottom: 20 }}>{c.detail}</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: PALETTE.warmGray, letterSpacing: 1, textTransform: "uppercase" }}>{c.year}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const jobs = [
    {
      role: "Registered Nurse — Acute Care Unit",
      org: "Regional Medical Center, New York Metro Area",
      period: "2022 – Present",
      bullets: [
        "Deliver comprehensive nursing care to 5–8 patients per shift in a fast-paced acute care environment",
        "Collaborate with physicians, pharmacists, and social workers in interdisciplinary rounds",
        "Mentored and precepted three new graduate nurses transitioning to the floor",
        "Recognized for consistently high patient satisfaction scores and peer feedback",
      ],
      tag: "Current",
    },
    {
      role: "Graduate Nursing Intern",
      org: "Columbia University Medical Center",
      period: "2020 – 2021",
      bullets: [
        "Completed clinical rotations in ICU, emergency medicine, surgical, and pediatric units",
        "Administered medications, managed IV lines, and executed care plans under supervision",
        "Participated in simulation labs for rapid response and code blue scenarios",
      ],
      tag: "Internship",
    },
    {
      role: "Patient Care Technician",
      org: "Community Hospital, Westchester County",
      period: "2019 – 2021",
      bullets: [
        "Assisted RNs with vital signs, phlebotomy, specimen collection, and ADLs",
        "Maintained accurate EMR documentation across a 28-bed medical-surgical unit",
        "Served as student nurse advocate at department-wide quality improvement meetings",
      ],
      tag: "Pre-licensure",
    },
    {
      role: "Community Health Volunteer",
      org: "New Rochelle Health Department",
      period: "2018 – 2020",
      bullets: [
        "Coordinated health screenings, immunization clinics, and diabetes education sessions",
        "Interpreted health education materials for Spanish-speaking community members",
        "Assisted with contact tracing and public health response initiatives",
      ],
      tag: "Volunteer",
    },
  ];

  const tagColors = { Current: PALETTE.teal, Internship: PALETTE.navy, "Pre-licensure": PALETTE.gold, Volunteer: PALETTE.slate };

  return (
    <section id="experience" style={{ padding: "120px 40px", background: PALETTE.white }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ marginBottom: 72 }}>
            <span className="section-label">Professional History</span>
            <h2 className="section-title">Clinical &<br /><em>Professional Experience</em></h2>
            <div className="divider" />
          </div>
        </AnimatedSection>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: PALETTE.border, marginLeft: 0 }} />

          {jobs.map((j, i) => (
            <AnimatedSection key={i} delay={i * 120} style={{ marginBottom: 48 }}>
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 48 }}>
                {/* Left: period */}
                <div style={{ textAlign: "right", paddingRight: 48, position: "relative" }}>
                  <div style={{
                    position: "absolute", right: -7, top: 6, width: 13, height: 13, borderRadius: "50%",
                    background: PALETTE.white, border: `2px solid ${tagColors[j.tag] || PALETTE.teal}`,
                  }} />
                  <div style={{ fontSize: 12, fontWeight: 500, color: tagColors[j.tag] || PALETTE.teal, letterSpacing: 1 }}>{j.period}</div>
                  <div style={{
                    marginTop: 8, display: "inline-block", fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
                    background: `${tagColors[j.tag] || PALETTE.teal}18`, color: tagColors[j.tag] || PALETTE.teal,
                    padding: "3px 10px", borderRadius: 2,
                  }}>
                    {j.tag}
                  </div>
                </div>

                {/* Right: content */}
                <div style={{
                  background: PALETTE.cream, borderRadius: 2, padding: "32px 36px",
                  borderLeft: `2px solid ${tagColors[j.tag] || PALETTE.teal}`,
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.boxShadow = `0 4px 24px rgba(0,0,0,0.06)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="serif" style={{ fontSize: 22, fontWeight: 400, color: PALETTE.navy, marginBottom: 4 }}>{j.role}</div>
                  <div style={{ fontSize: 13, color: PALETTE.teal, marginBottom: 20, letterSpacing: 0.5 }}>{j.org}</div>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {j.bullets.map((b, bi) => (
                      <li key={bi} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: PALETTE.gold, marginTop: 8, flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: PALETTE.slate, lineHeight: 1.65 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const ref = useRef(null);
  const visible = useIntersection(ref);

  const skills = [
    { name: "Patient-Centered Care", pct: 97 },
    { name: "Critical Care & ICU", pct: 88 },
    { name: "Emergency Response", pct: 92 },
    { name: "Electronic Medical Records", pct: 95 },
    { name: "Clinical Documentation", pct: 96 },
    { name: "Patient Advocacy", pct: 98 },
    { name: "Team Leadership & Mentorship", pct: 85 },
    { name: "Communication & Education", pct: 94 },
  ];

  const specialties = [
    "Acute Care", "Wound Care", "IV Therapy", "Medication Administration",
    "Sepsis Management", "Telemetry Monitoring", "Pain Assessment",
    "Patient Education", "Infection Control", "Discharge Planning",
    "Phlebotomy", "Code Response",
  ];

  return (
    <section id="skills" style={{ padding: "120px 40px", background: PALETTE.cream }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span className="section-label">Competencies</span>
            <h2 className="section-title">Clinical &<br /><em>Professional Skills</em></h2>
            <div className="divider" style={{ margin: "24px auto" }} />
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div ref={ref}>
            {skills.map((s, i) => (
              <div key={i} style={{
                marginBottom: 28, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-16px)",
                transition: `all 0.6s ease ${i * 80}ms`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: PALETTE.navy }}>{s.name}</span>
                  <span style={{ fontSize: 12, color: PALETTE.teal, fontWeight: 500 }}>{s.pct}%</span>
                </div>
                <div style={{ height: 3, background: PALETTE.border, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 2,
                    background: `linear-gradient(90deg, ${PALETTE.teal}, ${PALETTE.tealLight})`,
                    width: visible ? `${s.pct}%` : "0%",
                    transition: `width 1s ease ${i * 80 + 200}ms`,
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <AnimatedSection delay={200} style={{ marginBottom: 40 }}>
              <div style={{ background: PALETTE.white, borderRadius: 2, padding: "40px", border: `1px solid ${PALETTE.border}` }}>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: PALETTE.teal, marginBottom: 24 }}>Clinical Specialties</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {specialties.map((s, i) => (
                    <span key={i} style={{
                      fontSize: 12, fontWeight: 500, letterSpacing: 0.5,
                      padding: "6px 14px", borderRadius: 2,
                      border: `1px solid ${PALETTE.border}`,
                      color: PALETTE.slate, background: PALETTE.cream,
                      transition: "all 0.2s ease", cursor: "default",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = PALETTE.teal; e.currentTarget.style.color = PALETTE.teal; e.currentTarget.style.background = PALETTE.tealPale; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = PALETTE.border; e.currentTarget.style.color = PALETTE.slate; e.currentTarget.style.background = PALETTE.cream; }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={350}>
              <div style={{ background: PALETTE.navy, borderRadius: 2, padding: "40px" }}>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: PALETTE.gold, marginBottom: 16 }}>Languages</div>
                {[["English", "Native"], ["Spanish", "Conversational"]].map(([lang, level]) => (
                  <div key={lang} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
                    <span className="serif" style={{ fontSize: 20, fontWeight: 300, color: PALETTE.white }}>{lang}</span>
                    <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{level}</span>
                  </div>
                ))}
                <div style={{ marginTop: 32, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: PALETTE.gold, marginBottom: 16 }}>Software</div>
                {["Epic EMR", "Cerner", "Microsoft Office Suite", "Meditech"].map(sw => (
                  <div key={sw} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: PALETTE.gold }} />
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>{sw}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonials = [
    { name: "Dr. Sarah Chen", role: "Attending Physician, Regional Medical Center", text: "Micaela is the kind of nurse every physician hopes to work with. Her clinical instincts are sharp, her documentation is meticulous, and her patients consistently speak of feeling truly cared for. She is a consummate professional.", initials: "SC" },
    { name: "Maria L.", role: "Patient, Acute Care Unit", text: "During a really frightening time, Micaela was calm, kind, and explained everything in a way I could understand. She made me feel like more than just a patient. I am so grateful for her compassion.", initials: "ML" },
    { name: "James Park, RN", role: "Charge Nurse & Colleague", text: "Micaela raises the bar for everyone around her. She mentors newer nurses with patience, steps up without being asked, and brings a contagious energy to even the hardest shifts. A genuine asset to our team.", initials: "JP" },
  ];

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: "120px 40px", background: PALETTE.white }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <AnimatedSection>
          <span className="section-label">Kind Words</span>
          <h2 className="section-title">What Others<br /><em>Are Saying</em></h2>
          <div className="divider" style={{ margin: "24px auto" }} />
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div style={{ position: "relative", marginTop: 48 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                position: i === active ? "relative" : "absolute",
                top: 0, left: 0, right: 0,
                opacity: i === active ? 1 : 0,
                transform: i === active ? "none" : "translateY(16px)",
                transition: "all 0.6s ease",
                pointerEvents: i === active ? "auto" : "none",
                padding: "48px 56px",
                background: PALETTE.cream, borderRadius: 2,
                border: `1px solid ${PALETTE.border}`,
              }}>
                <div style={{ fontSize: 64, lineHeight: 0.5, color: PALETTE.gold, fontFamily: "Georgia, serif", marginBottom: 32, opacity: 0.5 }}>"</div>
                <p className="serif" style={{ fontSize: 22, lineHeight: 1.75, color: PALETTE.navy, fontStyle: "italic", fontWeight: 300, marginBottom: 40 }}>
                  {t.text}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%", background: PALETTE.tealPale,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 500, color: PALETTE.teal,
                  }}>
                    {t.initials}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: PALETTE.navy }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: PALETTE.muted }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 32 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                background: i === active ? PALETTE.teal : PALETTE.border,
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section style={{ padding: "100px 40px", background: PALETTE.navy }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <AnimatedSection>
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: PALETTE.gold, display: "block", marginBottom: 16 }}>Ready to Connect</span>
          <h2 className="serif" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, color: PALETTE.white, marginBottom: 16 }}>
            Explore My Full <em>Professional Profile</em>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.75 }}>
            Download my resume or connect with me on LinkedIn to learn more about my clinical experience and professional journey.
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary">Download Resume</button>
            <button style={{
              background: "transparent", color: PALETTE.white,
              border: `1px solid rgba(255,255,255,0.3)`, padding: "13px 32px",
              borderRadius: 2, fontSize: 13, fontWeight: 500, letterSpacing: 1.5,
              textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = PALETTE.white; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "transparent"; }}
            >
              View Credentials
            </button>
            <button style={{
              background: "#0077B5", color: PALETTE.white,
              border: "none", padding: "14px 32px",
              borderRadius: 2, fontSize: 13, fontWeight: 500, letterSpacing: 1.5,
              textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease",
            }}>
              LinkedIn Profile
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus("error"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
    setSubmitting(false);
  };

  const inputStyle = {
    width: "100%", padding: "16px 20px", border: `1px solid ${PALETTE.border}`,
    borderRadius: 2, fontSize: 14, color: PALETTE.navy, background: PALETTE.white,
    outline: "none", transition: "border-color 0.2s",
    fontFamily: "'DM Sans', sans-serif",
  };

  return (
    <section id="contact" style={{ padding: "120px 40px", background: PALETTE.cream }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100 }}>
        <AnimatedSection>
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Let's Work<br /><em>Together</em></h2>
          <div className="divider" />
          <p style={{ fontSize: 16, color: PALETTE.slate, lineHeight: 1.85, marginBottom: 48 }}>
            Whether you are a healthcare recruiter, a potential employer, or a colleague interested in collaboration — I would love to hear from you.
          </p>

          {[
            { icon: "◎", label: "Location", value: "New Rochelle, NY" },
            { icon: "✉", label: "Email", value: "micaela@example.com" },
            { icon: "◈", label: "Availability", value: "Open to new opportunities" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 20, marginBottom: 28, alignItems: "flex-start" }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", background: PALETTE.tealPale,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, color: PALETTE.teal, flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: PALETTE.muted, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 15, color: PALETTE.navy }}>{item.value}</div>
              </div>
            </div>
          ))}
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div style={{ background: PALETTE.white, borderRadius: 2, padding: "48px", border: `1px solid ${PALETTE.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: PALETTE.muted, display: "block", marginBottom: 8 }}>Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = PALETTE.teal} onBlur={e => e.target.style.borderColor = PALETTE.border} />
              </div>
              <div>
                <label style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: PALETTE.muted, display: "block", marginBottom: 8 }}>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = PALETTE.teal} onBlur={e => e.target.style.borderColor = PALETTE.border} />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: PALETTE.muted, display: "block", marginBottom: 8 }}>Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can I help you?" style={inputStyle}
                onFocus={e => e.target.style.borderColor = PALETTE.teal} onBlur={e => e.target.style.borderColor = PALETTE.border} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: PALETTE.muted, display: "block", marginBottom: 8 }}>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell me about your opportunity or question..." style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = PALETTE.teal} onBlur={e => e.target.style.borderColor = PALETTE.border} />
            </div>

            {status === "success" && (
              <div style={{ padding: "12px 20px", background: PALETTE.tealPale, borderRadius: 2, color: PALETTE.tealDark, fontSize: 14, marginBottom: 16 }}>
                Thank you! Your message was sent successfully. I will be in touch soon.
              </div>
            )}
            {status === "error" && (
              <div style={{ padding: "12px 20px", background: "#FEF2F2", borderRadius: 2, color: "#B91C1C", fontSize: 14, marginBottom: 16 }}>
                Please fill in all required fields, then try again. (Configure your Formspree ID to enable email delivery.)
              </div>
            )}

            <button className="btn-primary" onClick={handleSubmit} disabled={submitting}
              style={{ width: "100%", opacity: submitting ? 0.7 : 1 }}>
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: PALETTE.navy, padding: "60px 40px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 60, marginBottom: 60 }}>
          <div>
            <div className="serif" style={{ fontSize: 26, color: PALETTE.white, marginBottom: 16 }}>M. Nichols</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 220 }}>
              Registered Nurse · Columbia University · New Rochelle, NY
            </p>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: PALETTE.gold, marginBottom: 20 }}>Quick Links</div>
            {["About", "Education", "Experience", "Skills", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 10, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = PALETTE.white}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
              >
                {l}
              </a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: PALETTE.gold, marginBottom: 20 }}>Connect</div>
            {[["LinkedIn", "#"], ["Email", "mailto:micaela@example.com"], ["Resume", "#"]].map(([label, href]) => (
              <a key={label} href={href} style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 10, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = PALETTE.white}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2025 Micaela Nichols · All Rights Reserved</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>RN, BSN · Columbia University</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingContact() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return show ? (
    <a href="#contact" style={{
      position: "fixed", bottom: 36, right: 36, zIndex: 998,
      width: 56, height: 56, borderRadius: "50%", background: PALETTE.teal,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 8px 24px rgba(42,140,122,0.35)`,
      textDecoration: "none", transition: "all 0.3s ease",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = PALETTE.tealDark; e.currentTarget.style.transform = "scale(1.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = PALETTE.teal; e.currentTarget.style.transform = "scale(1)"; }}
      title="Contact Me"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="white" strokeWidth="1.5" />
        <path d="M2 5l8 6 8-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </a>
  ) : null;
}

export default function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <ScrollProgress />
      <Nav active="" />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Testimonials />
      <ResumeSection />
      <Contact />
      <Footer />
      <FloatingContact />
    </>
  );
}
