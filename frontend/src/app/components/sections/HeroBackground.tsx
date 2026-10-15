"use client";
import { useEffect, useRef, useState } from "react";

const SHAPES = [
  { left: "8%", top: "18%", delay: "0.2s" },
  { left: "16%", top: "64%", delay: "1.4s" },
  { left: "88%", top: "22%", delay: "0.8s" },
  { left: "80%", top: "60%", delay: "2.1s" },
  { left: "92%", top: "78%", delay: "1s" },
  { left: "5%", top: "82%", delay: "1.8s" },
];

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

/** 3D hero backdrop. Three.js is fetched lazily after first paint; a pure-CSS orb is the fallback. */
export function HeroBackground() {
  const layer = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  // scene (lazy)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = layer.current?.parentElement as HTMLElement | null;
    if (!section || !canvas.current) return;
    if (!hasWebGL()) { setFallback(true); return; }

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const boot = () =>
      import("./heroScene")
        .then(({ initHeroScene }) => { if (!cancelled) cleanup = initHeroScene(canvas.current!, section); })
        .catch(() => setFallback(true));
    // wait until the browser is idle so the hero text + CTA paint first
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (n: number) => void };
    const idle = typeof w.requestIdleCallback === "function";
    const id = idle ? w.requestIdleCallback!(boot, { timeout: 1200 }) : window.setTimeout(boot, 250);
    return () => {
      cancelled = true;
      if (idle) w.cancelIdleCallback?.(id);
      else clearTimeout(id);
      cleanup?.();
    };
  }, []);

  // gentle parallax + fade as the hero scrolls away
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = layer.current;
    const section = el?.parentElement;
    if (!el || !section) return;
    let ticking = false;
    const update = () => {
      const within = Math.min(Math.max(window.scrollY / (section.offsetHeight || 1), 0), 1);
      el.style.transform = `translateY(${within * 60}px)`;
      el.style.opacity = String(1 - within * 0.6);
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={layer}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden [mask-image:radial-gradient(ellipse_78%_74%_at_50%_46%,black_55%,rgba(0,0,0,0.55)_100%)] motion-reduce:hidden"
    >
      <canvas ref={canvas} className={`absolute inset-0 block size-full ${fallback ? "hidden" : ""}`} />
      {fallback && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-[20%] left-1/2 aspect-square w-[min(56vw,640px)] animate-hf-breathe overflow-hidden rounded-full shadow-[0_0_130px_45px_rgba(203,181,133,0.32)]">
            <div className="absolute -inset-[12%] animate-hf-spin rounded-full bg-[radial-gradient(circle_at_38%_30%,#f6efdd_0%,#cbb585_42%,#15130d_82%)]" />
          </div>
          {SHAPES.map((s) => (
            <div key={s.left + s.top} className="absolute size-4 rotate-45 animate-hf-float border-[1.5px] border-beige-dk opacity-40" style={{ left: s.left, top: s.top, animationDelay: s.delay }} />
          ))}
        </div>
      )}
    </div>
  );
}
