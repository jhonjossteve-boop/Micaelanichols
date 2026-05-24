"use client";
import { useState, useEffect } from "react";

export default function FloatingContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!show) return null;

  return (
    <a
      href="#contact"
      title="Contact Me"
      style={{
        position:"fixed",bottom:32,right:32,zIndex:998,
        width:52,height:52,borderRadius:"50%",background:"var(--teal)",
        display:"flex",alignItems:"center",justifyContent:"center",
        boxShadow:"0 8px 24px rgba(42,140,122,.35)",
        textDecoration:"none",transition:"all .3s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.background="var(--teal-dark)"; e.currentTarget.style.transform="scale(1.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.background="var(--teal)"; e.currentTarget.style.transform="scale(1)"; }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="white" strokeWidth="1.5"/>
        <path d="M2 5l8 6 8-6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </a>
  );
}
