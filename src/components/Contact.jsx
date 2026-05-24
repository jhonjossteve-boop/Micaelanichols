"use client";
import { useState } from "react";
import FadeUp from "./FadeUp";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [submitting, setSubmitting] = useState(false);

  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "YOUR_FORM_ID";

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setSubmitting(false);
  };

  const contactInfo = [
    { icon: "◎", label: "Location", value: "New Rochelle, NY" },
    { icon: "✉", label: "Email", value: "micaela@example.com" },
    { icon: "◈", label: "Availability", value: "Open to new opportunities" },
  ];

  return (
    <section id="contact" style={{ padding: "108px 40px", background: "var(--cream)" }}>
      <div className="two-col" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 88 }}>
        <FadeUp>
          <span className="sec-label">Get in Touch</span>
          <h2 className="sec-title">Let&apos;s Work<br /><em>Together</em></h2>
          <div className="divider" />
          <p style={{ fontSize:15,color:"var(--slate)",lineHeight:1.85,marginBottom:44 }}>
            Whether you are a healthcare recruiter, a potential employer, or a colleague interested in collaboration — I would love to hear from you.
          </p>
          {contactInfo.map((item) => (
            <div key={item.label} style={{ display:"flex",gap:18,marginBottom:24,alignItems:"flex-start" }}>
              <div style={{ width:42,height:42,borderRadius:"50%",background:"var(--teal-pale)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"var(--teal)",flexShrink:0 }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--warm-gray)",marginBottom:4 }}>{item.label}</div>
                <div style={{ fontSize:14,color:"var(--navy)" }}>{item.value}</div>
              </div>
            </div>
          ))}
        </FadeUp>

        <FadeUp delay={200}>
          <div style={{ background:"var(--white)",borderRadius:2,padding:44,border:"1px solid var(--border)" }}>
            <div className="two-col-sm" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14 }}>
              <div>
                <label style={{ fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--warm-gray)",display:"block",marginBottom:7 }}>Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="form-input" />
              </div>
              <div>
                <label style={{ fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--warm-gray)",display:"block",marginBottom:7 }}>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="form-input" />
              </div>
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--warm-gray)",display:"block",marginBottom:7 }}>Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can I help?" className="form-input" />
            </div>
            <div style={{ marginBottom:22 }}>
              <label style={{ fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--warm-gray)",display:"block",marginBottom:7 }}>Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell me about your opportunity..." className="form-input" style={{ resize:"vertical" }} />
            </div>

            {status === "success" && (
              <div style={{ padding:"11px 16px",background:"var(--teal-pale)",borderRadius:2,color:"var(--teal-dark)",fontSize:13,marginBottom:14 }}>
                Thank you! Your message was sent. I will be in touch soon.
              </div>
            )}
            {status === "error" && (
              <div style={{ padding:"11px 16px",background:"#fef2f2",borderRadius:2,color:"#b91c1c",fontSize:13,marginBottom:14 }}>
                Please fill in all required fields. (Set NEXT_PUBLIC_FORMSPREE_ID in .env.local to enable email delivery.)
              </div>
            )}

            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
              style={{ width:"100%",opacity:submitting ? .7 : 1,justifyContent:"center" }}
            >
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
