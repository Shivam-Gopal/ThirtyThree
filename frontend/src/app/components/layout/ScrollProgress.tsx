"use client";
import { useEffect, useRef } from "react";

/** Thin progress bar along the top edge. Updates via transform only (no React re-renders). */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px] motion-reduce:hidden" aria-hidden="true">
      <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-beige-dk to-ink will-change-transform" />
    </div>
  );
}
