"use client";
import FadeUp from "./FadeUp";

export default function ResumeCTA() {
  return (
    <section style={{ padding: "96px 40px", background: "var(--navy)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <FadeUp>
          <span style={{ fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--gold)",display:"block",marginBottom:14 }}>
            Ready to Connect
          </span>
          <h2 className="serif" style={{ fontSize:"clamp(32px,5vw,48px)",fontWeight:300,color:"#fff",marginBottom:14 }}>
            Explore My Full <em>Professional Profile</em>
          </h2>
          <p style={{ fontSize:15,color:"rgba(255,255,255,.5)",maxWidth:440,margin:"0 auto 44px",lineHeight:1.8 }}>
            Download my resume or connect on LinkedIn to learn more about my clinical experience and professional journey.
          </p>
          <div style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap" }}>
            <button className="btn-primary">Download Resume</button>
            <button
              style={{ background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,.3)",padding:"13px 30px",borderRadius:2,fontSize:12,fontWeight:500,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",transition:"all .3s",fontFamily:"inherit" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="#fff"; e.currentTarget.style.background="rgba(255,255,255,.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.3)"; e.currentTarget.style.background="transparent"; }}
            >
              View Credentials
            </button>
            <button
              style={{ background:"#0077B5",color:"#fff",border:"none",padding:"14px 30px",borderRadius:2,fontSize:12,fontWeight:500,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",transition:"opacity .3s",fontFamily:"inherit" }}
              onMouseEnter={e => e.currentTarget.style.opacity=".85"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
            >
              LinkedIn Profile
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
