"use client";
import { useState, useEffect } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const t = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--cream)",
        padding: "0 40px",
      }}
    >
      {/* Background orbs */}
      <div style={{ position:"absolute",top:-60,right:-60,width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,#e8f4f2 0%,transparent 70%)",animation:"floatBubble 9s ease-in-out infinite",pointerEvents:"none" }} />
      <div style={{ position:"absolute",bottom:-80,left:-40,width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,#e8d5aa44 0%,transparent 70%)",animation:"floatBubble 13s ease-in-out infinite reverse",pointerEvents:"none" }} />

      <div
        className="hero-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "96px 0 60px",
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: 72,
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Text */}
        <div>
          <div style={t(100)}>
            <span className="sec-label">Registered Nurse · New Rochelle, NY</span>
          </div>
          <div style={t(300)}>
            <h1
              className="serif"
              style={{ fontSize: "clamp(52px,7vw,76px)", fontWeight: 300, lineHeight: 1.05, color: "var(--navy)", marginBottom: 6 }}
            >
              Micaela<br />
              <span style={{ fontStyle: "italic", color: "var(--teal)" }}>Nichols</span>
            </h1>
          </div>
          <div style={t(500)}>
            <div style={{ display:"flex",alignItems:"center",gap:12,margin:"20px 0" }}>
              <div style={{ width:36,height:1,background:"var(--gold)" }} />
              <span style={{ fontSize:11,letterSpacing:3,textTransform:"uppercase",color:"var(--warm-gray)",fontWeight:500 }}>Columbia University</span>
            </div>
          </div>
          <div style={t(600)}>
            <p style={{ fontSize:17,lineHeight:1.8,color:"var(--slate)",maxWidth:420,marginBottom:40 }}>
              Compassionate Registered Nurse dedicated to patient-centered care, clinical excellence, and improving community health outcomes.
            </p>
          </div>
          <div className="cta-buttons" style={{ ...t(750), display:"flex",gap:14,flexWrap:"wrap",marginBottom:56 }}>
            <button className="btn-primary">View Resume</button>
            <a href="#contact" className="btn-outline">Contact Me</a>
          </div>
          <div className="hero-stats" style={{ ...t(900), display:"flex",gap:40 }}>
            {[["5+","Years Experience"],["1,200+","Patients Assisted"],["8","Certifications"]].map(([num,label]) => (
              <div key={label}>
                <div className="serif" style={{ fontSize:30,fontWeight:400,color:"var(--navy)",lineHeight:1 }}>{num}</div>
                <div style={{ fontSize:10,color:"var(--warm-gray)",letterSpacing:1.5,textTransform:"uppercase",marginTop:4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait */}
        <div
          className="hero-portrait"
          style={{ ...t(400), display:"flex",justifyContent:"center" }}
        >
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute",top:-16,left:-16,right:16,bottom:16,border:"1px solid #c9a96e44",borderRadius:4 }} />
            <div style={{
              width:340,height:420,borderRadius:4,
              background:"linear-gradient(160deg,#e8f4f2 0%,#f5f2ee 55%,#e8d5aa33 100%)",
              display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
              position:"relative",overflow:"hidden",
            }}>
              <div style={{ width:120,height:120,borderRadius:"50%",background:"linear-gradient(135deg,#2a8c7a33,#2a8c7a88)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18 }}>
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <circle cx="28" cy="21" r="12" fill="#2a8c7a" opacity=".65" />
                  <ellipse cx="28" cy="48" rx="20" ry="12" fill="#2a8c7a" opacity=".4" />
                </svg>
              </div>
              <div className="serif" style={{ fontSize:19,color:"var(--navy)",fontWeight:400 }}>Micaela Nichols</div>
              <div style={{ fontSize:11,color:"var(--teal)",letterSpacing:2,textTransform:"uppercase",marginTop:6 }}>RN, BSN</div>
              <div style={{ position:"absolute",top:20,right:20,opacity:.12 }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="11" y="3" width="6" height="22" rx="2" fill="#2a8c7a"/><rect x="3" y="11" width="22" height="6" rx="2" fill="#2a8c7a"/></svg>
              </div>
              <div style={{ position:"absolute",bottom:20,fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--warm-gray)" }}>Replace with your photo</div>
            </div>
            <div style={{ position:"absolute",bottom:-14,right:-14,background:"#fff",border:"1px solid var(--border)",borderRadius:4,padding:"14px 20px",boxShadow:"0 8px 28px rgba(0,0,0,.08)" }}>
              <div style={{ fontSize:10,color:"var(--warm-gray)",letterSpacing:2,textTransform:"uppercase" }}>Education</div>
              <div className="serif" style={{ fontSize:17,color:"var(--navy)",marginTop:4 }}>Columbia University</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,animation:"pulse 2.5s ease-in-out infinite" }}>
        <span style={{ fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"var(--warm-gray)" }}>Scroll</span>
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
          <rect x="1" y="1" width="12" height="20" rx="6" stroke="var(--warm-gray)" strokeWidth="1"/>
          <rect x="6" y="5" width="2" height="5" rx="1" fill="var(--teal)"/>
        </svg>
      </div>
    </section>
  );
}
