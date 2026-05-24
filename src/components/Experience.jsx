"use client";
import FadeUp from "./FadeUp";

const jobs = [
  {
    role: "Registered Nurse — Acute Care Unit",
    org: "Regional Medical Center, New York Metro Area",
    period: "2022 – Present",
    tag: "Current",
    tagColor: "var(--teal)",
    bullets: [
      "Deliver comprehensive nursing care to 5–8 patients per shift in a fast-paced acute care environment",
      "Collaborate with physicians, pharmacists, and social workers in interdisciplinary rounds",
      "Mentored and precepted three new graduate nurses transitioning to the floor",
      "Recognized for consistently high patient satisfaction scores and peer feedback",
    ],
  },
  {
    role: "Graduate Nursing Intern",
    org: "Columbia University Medical Center",
    period: "2020 – 2021",
    tag: "Internship",
    tagColor: "var(--gold)",
    bullets: [
      "Completed clinical rotations in ICU, emergency medicine, surgical, and pediatric units",
      "Administered medications, managed IV lines, and executed care plans under supervision",
      "Participated in simulation labs for rapid response and code blue scenarios",
    ],
  },
  {
    role: "Patient Care Technician",
    org: "Community Hospital, Westchester County",
    period: "2019 – 2021",
    tag: "Pre-licensure",
    tagColor: "var(--navy-mid)",
    bullets: [
      "Assisted RNs with vital signs, phlebotomy, specimen collection, and ADLs on a 28-bed unit",
      "Maintained accurate EMR documentation and attended quality improvement meetings",
      "Served as student nurse advocate at department-wide quality improvement meetings",
    ],
  },
  {
    role: "Community Health Volunteer",
    org: "New Rochelle Health Department",
    period: "2018 – 2020",
    tag: "Volunteer",
    tagColor: "var(--slate)",
    bullets: [
      "Coordinated health screenings, immunization clinics, and diabetes education sessions",
      "Interpreted health education materials for Spanish-speaking community members",
      "Assisted with contact tracing and public health response initiatives",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "108px 40px", background: "var(--white)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp style={{ marginBottom: 64 }}>
          <span className="sec-label">Professional History</span>
          <h2 className="sec-title">Clinical &<br /><em>Professional Experience</em></h2>
          <div className="divider" />
        </FadeUp>

        <div style={{ position: "relative" }}>
          <div style={{ position:"absolute",left:192,top:0,bottom:0,width:1,background:"var(--border)" }} />

          {jobs.map((j, i) => (
            <FadeUp key={i} delay={i * 100} style={{ marginBottom: i === jobs.length - 1 ? 0 : 40 }}>
              <div className="exp-item-grid" style={{ display:"grid",gridTemplateColumns:"180px 1fr",gap:40 }}>
                {/* Label */}
                <div className="exp-label-col" style={{ textAlign:"right",paddingRight:40,position:"relative" }}>
                  <div style={{
                    position:"absolute",right:-7,top:6,width:13,height:13,borderRadius:"50%",
                    background:"var(--white)",
                    border:`2px solid ${j.tagColor}`,
                    boxShadow: j.tag === "Current" ? "0 0 0 4px var(--teal-pale)" : "none",
                  }} />
                  <div style={{ fontSize:11,fontWeight:500,color:j.tagColor,letterSpacing:.5 }}>{j.period}</div>
                  <div style={{ marginTop:7,display:"inline-block",fontSize:9,letterSpacing:2,textTransform:"uppercase",background:`${j.tagColor}18`,color:j.tagColor,padding:"3px 10px",borderRadius:2 }}>{j.tag}</div>
                </div>

                {/* Content */}
                <div
                  style={{
                    background:"var(--cream)",borderRadius:2,padding:"28px 32px",
                    borderLeft:`2px solid ${j.tagColor}`,
                    transition:"transform .3s,box-shadow .3s",cursor:"default",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateX(4px)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(0,0,0,.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}
                >
                  <div className="serif" style={{ fontSize:20,fontWeight:400,color:"var(--navy)",marginBottom:3 }}>{j.role}</div>
                  <div style={{ fontSize:12,color:"var(--teal)",marginBottom:16 }}>{j.org}</div>
                  <ul style={{ listStyle:"none",padding:0 }}>
                    {j.bullets.map((b, bi) => (
                      <li key={bi} style={{ display:"flex",gap:10,marginBottom:bi < j.bullets.length-1 ? 8 : 0,alignItems:"flex-start" }}>
                        <div style={{ width:4,height:4,borderRadius:"50%",background:"var(--gold)",marginTop:7,flexShrink:0 }} />
                        <span style={{ fontSize:13,color:"var(--slate)",lineHeight:1.65 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
