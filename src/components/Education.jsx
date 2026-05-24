import FadeUp from "./FadeUp";

const creds = [
  { type: "Degree", typeColor: "var(--teal)", title: "Bachelor of Science in Nursing", sub: "Columbia University School of Nursing", year: "2021", detail: "Graduated with honors. Focus areas: acute care, evidence-based practice, and community health." },
  { type: "License", typeColor: "var(--navy)", title: "Registered Nurse (RN)", sub: "New York State Department of Education", year: "2021", detail: "Active license in good standing. Licensed in New York state." },
  { type: "Certification", typeColor: "var(--gold)", title: "BLS · ACLS", sub: "American Heart Association", year: "2024", detail: "Current certifications. Proficient in managing cardiac arrest and peri-arrest scenarios." },
  { type: "Certification", typeColor: "var(--gold)", title: "CCRN", sub: "American Association of Critical-Care Nurses", year: "2023", detail: "Specialized knowledge in critically ill patient populations in acute and intensive care settings." },
  { type: "Continuing Ed", typeColor: "var(--slate)", title: "Continuing Education", sub: "Various Accredited Institutions", year: "Ongoing", detail: "40+ hours annually in wound care, pharmacology updates, and sepsis management." },
  { type: "Stats", typeColor: "var(--teal)", title: null },
];

export default function Education() {
  return (
    <section id="education" style={{ padding: "108px 40px", background: "var(--cream)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="sec-label">Academic & Professional</span>
          <h2 className="sec-title">Education &<br /><em>Credentials</em></h2>
          <div className="divider" style={{ margin: "20px auto" }} />
        </FadeUp>

        {/* Columbia Feature */}
        <FadeUp delay={100} style={{ marginBottom: 40 }}>
          <div style={{
            background: "var(--navy)", borderRadius: 4, padding: "48px 56px",
            display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position:"absolute",top:0,right:0,width:280,height:280,background:"radial-gradient(circle,#2a8c7a22 0%,transparent 70%)",pointerEvents:"none" }} />
            <div>
              <span style={{ fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"var(--gold)",marginBottom:14,display:"block" }}>Flagship Institution</span>
              <h3 className="serif" style={{ fontSize:36,fontWeight:300,color:"#fff",marginBottom:10 }}>Columbia University</h3>
              <p style={{ fontSize:14,color:"rgba(255,255,255,.6)",lineHeight:1.8,maxWidth:460 }}>
                School of Nursing · Bachelor of Science in Nursing · Class of 2021. Ranked among the top nursing programs in the United States, providing rigorous preparation across clinical practice, research, and healthcare leadership.
              </p>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ width:90,height:90,borderRadius:"50%",border:"1px solid #c9a96e66",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto" }}>
                <div style={{ width:72,height:72,borderRadius:"50%",border:"1px solid #c9a96e99",display:"flex",alignItems:"center",justifyContent:"center",background:"#2a8c7a22" }}>
                  <span className="serif" style={{ fontSize:24,color:"var(--gold)",fontStyle:"italic" }}>CU</span>
                </div>
              </div>
              <div style={{ marginTop:12,fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,.3)" }}>Est. 1754</div>
            </div>
          </div>
        </FadeUp>

        {/* Credentials grid */}
        <div className="three-col" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }}>
          {creds.slice(0,5).map((c, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="card" style={{ height:"100%" }}>
                <div style={{ fontSize:9,letterSpacing:2,textTransform:"uppercase",color:c.typeColor,borderBottom:`1px solid ${c.typeColor}`,paddingBottom:3,marginBottom:14,display:"inline-block" }}>{c.type}</div>
                <div className="serif" style={{ fontSize:18,color:"var(--navy)",marginBottom:5,lineHeight:1.3 }}>{c.title}</div>
                <div style={{ fontSize:11,color:"var(--teal)",marginBottom:12 }}>{c.sub}</div>
                <div style={{ fontSize:12,color:"var(--warm-gray)",lineHeight:1.65,marginBottom:16 }}>{c.detail}</div>
                <div style={{ fontSize:10,fontWeight:500,color:"var(--warm-gray)",letterSpacing:1,textTransform:"uppercase" }}>{c.year}</div>
              </div>
            </FadeUp>
          ))}
          {/* Stats card */}
          <FadeUp delay={400}>
            <div className="card" style={{ background:"var(--cream)",height:"100%" }}>
              <div style={{ fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--teal)",marginBottom:20 }}>At a Glance</div>
              {[["Clinical Hours","1,000+"],["Certifications","8"],["CE Credits / yr","40+"]].map(([label,val]) => (
                <div key={label} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid var(--border)" }}>
                  <span style={{ fontSize:12,color:"var(--slate)" }}>{label}</span>
                  <span className="serif" style={{ fontSize:22,color:"var(--navy)" }}>{val}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
