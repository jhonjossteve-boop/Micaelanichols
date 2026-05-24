"use client";
import { useState, useEffect } from "react";
import FadeUp from "./FadeUp";

const testimonials = [
  {
    text: "Micaela is the kind of nurse every physician hopes to work with. Her clinical instincts are sharp, her documentation is meticulous, and her patients consistently speak of feeling truly cared for. She is a consummate professional.",
    name: "Dr. Sarah Chen",
    role: "Attending Physician, Regional Medical Center",
    initials: "SC",
  },
  {
    text: "During a really frightening time, Micaela was calm, kind, and explained everything in a way I could understand. She made me feel like more than just a patient. I am so grateful for her compassion and dedication.",
    name: "Maria L.",
    role: "Patient, Acute Care Unit",
    initials: "ML",
  },
  {
    text: "Micaela raises the bar for everyone around her. She mentors newer nurses with patience, steps up without being asked, and brings a contagious energy to even the hardest shifts. A genuine asset to our team.",
    name: "James Park, RN",
    role: "Charge Nurse & Colleague",
    initials: "JP",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[active];

  return (
    <section style={{ padding: "108px 40px", background: "var(--white)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <FadeUp>
          <span className="sec-label">Kind Words</span>
          <h2 className="sec-title">What Others<br /><em>Are Saying</em></h2>
          <div className="divider" style={{ margin: "20px auto" }} />
        </FadeUp>

        <FadeUp delay={200} style={{ marginTop: 40 }}>
          <div style={{
            background: "var(--cream)", borderRadius: 2, border: "1px solid var(--border)",
            padding: "44px 52px", transition: "all .6s ease",
          }}>
            <div style={{ fontSize: 60, lineHeight: .5, color: "var(--gold)", fontFamily: "Georgia,serif", marginBottom: 28, opacity: .4 }}>"</div>
            <p
              key={active}
              className="serif"
              style={{
                fontSize: 21, lineHeight: 1.75, color: "var(--navy)", fontStyle: "italic",
                fontWeight: 300, marginBottom: 36,
                animation: "fadeUp .5s ease both",
              }}
            >
              {current.text}
            </p>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:14 }}>
              <div style={{ width:44,height:44,borderRadius:"50%",background:"var(--teal-pale)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:500,color:"var(--teal)" }}>
                {current.initials}
              </div>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:13,fontWeight:500,color:"var(--navy)" }}>{current.name}</div>
                <div style={{ fontSize:11,color:"var(--warm-gray)" }}>{current.role}</div>
              </div>
            </div>
          </div>

          <div style={{ display:"flex",justifyContent:"center",gap:9,marginTop:28 }}>
            {testimonials.map((_, i) => (
              <button key={i} className={`dot${i === active ? " active" : ""}`} onClick={() => setActive(i)} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
