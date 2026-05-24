import FadeUp from "./FadeUp";

const values = [
  { icon: "♡", label: "Empathy", color: "var(--teal)", desc: "Every patient deserves dignity and compassionate care at every stage of treatment." },
  { icon: "◎", label: "Precision", color: "var(--gold)", desc: "Clinical accuracy and meticulous attention to detail in all patient interactions." },
  { icon: "◈", label: "Leadership", color: "var(--navy-mid)", desc: "Mentoring newer nurses and advocating within interdisciplinary care teams." },
  { icon: "◇", label: "Communication", color: "var(--teal-light)", desc: "Clear, honest dialogue with patients, families, and colleagues at every stage." },
];

const milestones = [
  { year: "2017", title: "Columbia University", desc: "Enrolled in the Bachelor of Science in Nursing program, graduating with distinction.", current: false },
  { year: "2021", title: "BSN Graduate & RN Licensure", desc: "Completed clinical rotations across ICU, ER, and pediatrics. Passed NCLEX-RN on first attempt.", current: false },
  { year: "2022", title: "Clinical Practice Begins", desc: "Joined a leading healthcare system in the New York metro area, specializing in acute care.", current: false },
  { year: "2024 · Present", title: "Advanced Certifications", desc: "Earned ACLS, CCRN, and Critical Care certifications to expand scope of practice.", current: true },
];

export default function About() {
  return (
    <section id="about" style={{ padding: "108px 40px", background: "var(--white)" }}>
      <div
        className="two-col"
        style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}
      >
        {/* Left */}
        <FadeUp>
          <span className="sec-label">About Me</span>
          <h2 className="sec-title">
            A Nurse Driven by<br />
            <em>Purpose & Compassion</em>
          </h2>
          <div className="divider" />
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--slate)", marginBottom: 20 }}>
            Nursing, for me, has always been more than a profession — it is a calling rooted in genuine care for people at their most vulnerable. As a Columbia University graduate, I bring rigorous academic training alongside an unwavering commitment to patient advocacy.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--slate)", marginBottom: 40 }}>
            Based in New Rochelle, NY, I work at the intersection of clinical excellence and community wellness. Whether at the bedside or collaborating with a multidisciplinary team, I strive to elevate the standard of care for every patient I serve.
          </p>
          <div
            className="two-col-sm"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {values.map((v) => (
              <div
                key={v.label}
                style={{ padding: "22px", background: "var(--cream)", borderRadius: 2, borderLeft: `2px solid ${v.color}` }}
              >
                <div style={{ fontSize: 18, marginBottom: 8, color: v.color }}>{v.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: "var(--navy)", marginBottom: 5 }}>{v.label}</div>
                <div style={{ fontSize: 12, color: "var(--warm-gray)", lineHeight: 1.6 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Right — timeline */}
        <FadeUp delay={150}>
          <span className="sec-label">Career Journey</span>
          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div style={{ position: "absolute", left: 5, top: 0, bottom: 0, width: 1, background: "var(--border)" }} />
            {milestones.map((m, i) => (
              <div key={i} style={{ position: "relative", marginBottom: i === milestones.length - 1 ? 0 : 32 }}>
                <div style={{
                  position: "absolute", left: -28, top: 4, width: 11, height: 11, borderRadius: "50%",
                  background: "var(--white)",
                  border: `2px solid ${m.current ? "var(--teal)" : "var(--gold)"}`,
                  boxShadow: m.current ? "0 0 0 4px var(--teal-pale)" : "none",
                }} />
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: "var(--teal)", marginBottom: 5 }}>{m.year}</div>
                <div className="serif" style={{ fontSize: 18, fontWeight: 400, color: "var(--navy)", marginBottom: 6 }}>{m.title}</div>
                <div style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.65 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
