"use client";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Education", "Experience", "Skills", "Contact"];

  return (
    <nav
      style={{
        position: "fixed",
        top: 3,
        left: 0,
        right: 0,
        zIndex: 999,
        padding: "0 40px",
        background: scrolled ? "rgba(250,248,245,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 21,
            fontWeight: 400,
            color: "var(--navy)",
            letterSpacing: 1,
            textDecoration: "none",
          }}
        >
          M. Nichols
        </a>

        <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">
              {l}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary"
            style={{ padding: "9px 22px", fontSize: 11 }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
