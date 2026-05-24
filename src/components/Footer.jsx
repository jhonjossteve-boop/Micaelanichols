export default function Footer() {
  const links = ["About", "Education", "Experience", "Skills", "Contact"];
  const connect = [
    { label: "LinkedIn", href: "#" },
    { label: "Email", href: "mailto:micaela@example.com" },
    { label: "Download Resume", href: "#" },
  ];

  return (
    <footer style={{ background: "var(--navy)", padding: "56px 40px 36px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:56,marginBottom:48 }}>
          <div>
            <div className="serif" style={{ fontSize:24,color:"#fff",marginBottom:14 }}>M. Nichols</div>
            <p style={{ fontSize:12,color:"rgba(255,255,255,.4)",lineHeight:1.75,maxWidth:200 }}>
              Registered Nurse · Columbia University · New Rochelle, NY
            </p>
          </div>
          <div>
            <div style={{ fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"var(--gold)",marginBottom:18 }}>Quick Links</div>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="footer-link">{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"var(--gold)",marginBottom:18 }}>Connect</div>
            {connect.map(c => (
              <a key={c.label} href={c.href} className="footer-link">{c.label}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:28,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
          <span style={{ fontSize:11,color:"rgba(255,255,255,.3)" }}>© {new Date().getFullYear()} Micaela Nichols · All Rights Reserved</span>
          <span style={{ fontSize:11,color:"rgba(255,255,255,.3)" }}>RN, BSN · Columbia University</span>
        </div>
      </div>
    </footer>
  );
}
