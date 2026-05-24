"use client";
import FadeUp from "./FadeUp";
import { useFadeUp } from "./FadeUp";

const skills = [
  { name: "Patient-Centered Care", pct: 97 },
  { name: "Emergency Response", pct: 92 },
  { name: "Critical Care & ICU", pct: 88 },
  { name: "Electronic Medical Records", pct: 95 },
  { name: "Clinical Documentation", pct: 96 },
  { name: "Patient Advocacy", pct: 98 },
  { name: "Team Leadership & Mentorship", pct: 85 },
  { name: "Communication & Education", pct: 94 },
];

const specialties = [
  "Acute Care","Wound Care","IV Therapy","Medication Administration",
  "Sepsis Management","Telemetry Monitoring","Pain Assessment",
  "Patient Education","Infection Control","Discharge Planning","Phlebotomy","Code Response",
];

export default function Skills() {
  const [barsRef, barsVisible] = useFadeUp();

  return (
    <section id="skills" style={{ padding: "108px 40px", background: "var(--cream)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="sec-label">Competencies</span>
          <h2 className="sec-title">Clinical &<br /><em>Professional Skills</em></h2>
          <div className="divider" style={{ margin: "20px auto" }} />
        </FadeUp>

        <div className="skills-grid two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72 }}>
          {/* Bars */}
          <div ref={barsRef} style={{ opacity: barsVisible ? 1 : 0, transform: barsVisible ? "none" : "translateY(24px)", transition: "all .7s ease" }}>
            {skills.map((s, i) => (
              <div key={i} style={{ marginBottom: i < skills.length - 1 ? 22 : 0 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:7 }}>
                  <span style={{ fontSize:13,fontWeight:500,color:"var(--navy)" }}>{s.name}</span>
                  <span style={{ fontSize:12,color:"var(--teal)",fontWeight:500 }}>{s.pct}%</span>
                </div>
                <div style={{ height:3,background:"var(--border)",borderRadius:2,overflow:"hidden" }}>
                  <div style={{
                    height:"100%",borderRadius:2,
                    background:"linear-gradient(90deg,var(--teal),var(--teal-light))",
                    width: barsVisible ? `${s.pct}%` : "0%",
                    transition: `width 1s ease ${i * 80 + 200}ms`,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div>
            <FadeUp delay={200} style={{ marginBottom: 20 }}>
              <div className="card">
                <div style={{ fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--teal)",marginBottom:20 }}>Clinical Specialties</div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                  {specialties.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={350}>
              <div style={{ background:"var(--navy)",borderRadius:2,padding:36 }}>
                <div style={{ fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--gold)",marginBottom:16 }}>Languages</div>
                {[["English","Native"],["Spanish","Conversational"]].map(([lang,level]) => (
                  <div key={lang} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.08)" }}>
                    <span className="serif" style={{ fontSize:19,fontWeight:300,color:"#fff" }}>{lang}</span>
                    <span style={{ fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,.4)" }}>{level}</span>
                  </div>
                ))}
                <div style={{ fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--gold)",margin:"20px 0 12px" }}>Software</div>
                <div style={{ fontSize:13,color:"rgba(255,255,255,.6)",lineHeight:2 }}>
                  Epic EMR · Cerner · Meditech · Microsoft Office Suite
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
