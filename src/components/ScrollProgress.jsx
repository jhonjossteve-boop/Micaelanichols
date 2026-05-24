"use client";
import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 1000, background: "var(--border)" }}>
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: "linear-gradient(90deg, var(--teal), var(--gold))",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
