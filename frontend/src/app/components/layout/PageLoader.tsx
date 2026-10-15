"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* Water-fill intro. Shown on a first visit to the home page in a tab, or when the home page is reloaded. */
const FILL_MS = 2200, HOLD_MS = 350, ZOOM_MS = 550, SEGMENTS = 40;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const hash = (x: number) => { const s = Math.sin(x) * 43758.5453123; return s - Math.floor(s); };

export function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(pathname === "/");
  const stage = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const baseline = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = nav?.type === "reload";
    let visited = false;
    try {
      visited = sessionStorage.getItem("ttLandingVisited") === "1";
      sessionStorage.setItem("ttLandingVisited", "1");
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !(isReload || (!visited && !window.location.hash))) { setVisible(false); return; }

    document.body.classList.add("tt-loading");
    const st = stage.current!, fl = fill.current!, pc = pct.current!, bl = baseline.current!, rt = root.current!;
    let sw = 0, aw = 0, lw = 0;
    const o1 = Math.random() * 1000, o2 = Math.random() * 1000, o3 = Math.random() * 1000;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;

    const stepInstability = () => {
      sw += (Math.random() - 0.5) * 0.05; sw = Math.max(-0.6, Math.min(0.6, sw * 0.94));
      aw += (Math.random() - 0.5) * 0.08; aw = Math.max(-0.5, Math.min(0.5, aw * 0.93));
      lw += (Math.random() - 0.5) * 0.7; lw = Math.max(-3.5, Math.min(3.5, lw * 0.92));
    };
    const clip = (level: number, p1: number, p2: number, p3: number) => {
      const taper = Math.sin((level / 100) * Math.PI);
      const base = 100 - level - lw * taper;
      const a1 = 10 * taper * (1 + aw), a2 = 4.5 * taper * (1 - aw * 0.7), a3 = 2.2 * taper * (1 + Math.abs(aw));
      const jit = 1.6 * taper * (1 + Math.abs(sw));
      const pts: string[] = [];
      for (let i = 0; i <= SEGMENTS; i++) {
        const t = i / SEGMENTS;
        const y =
          base +
          Math.sin(t * Math.PI * 2 * 2.2 + p1 + sw * 6) * a1 +
          Math.sin(t * Math.PI * 2 * 3.7 + p2 - sw * 4) * a2 +
          Math.sin(t * Math.PI * 2 * 5.9 + p3) * a3 +
          (hash(i * 12.9898 + p1 * 3.7) - 0.5) * jit;
        pts.push(`${t * 100}% ${y}%`);
      }
      return `polygon(${pts.join(", ")}, 100% 100%, 0% 100%)`;
    };

    const finish = () => {
      rt.style.transition = `opacity ${ZOOM_MS}ms ease`;
      rt.style.opacity = "0";
      document.body.classList.remove("tt-loading");
      timers.push(setTimeout(() => setVisible(false), ZOOM_MS + 50));
    };
    const zoomOut = () => {
      st.style.transition = `opacity ${ZOOM_MS}ms cubic-bezier(.5,0,1,1), transform ${ZOOM_MS}ms cubic-bezier(.5,0,1,1)`;
      st.style.transform = "scale(1.32)";
      st.style.opacity = "0";
      bl.style.transition = `scale ${ZOOM_MS}ms ease`;
      bl.style.scale = "0 1";
      timers.push(setTimeout(finish, ZOOM_MS));
    };

    st.style.transition = "opacity 260ms ease, transform 260ms ease";
    st.style.opacity = "1"; st.style.transform = "scale(1)";
    bl.style.transition = `scale ${FILL_MS}ms cubic-bezier(.22,1,.36,1)`;
    bl.style.scale = "1 1";
    const start = performance.now();
    const frame = (now: number) => {
      const el = now - start;
      const t = Math.min(el / FILL_MS, 1);
      const eased = easeOutExpo(t);
      stepInstability();
      fl.style.clipPath = clip(eased * 100, o1 + el * 0.0062, o2 + el * -0.0105, o3 + el * 0.0173);
      pc.textContent = Math.round(eased * 100) + "%";
      if (t < 1) raf = requestAnimationFrame(frame);
      else timers.push(setTimeout(zoomOut, HOLD_MS));
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); document.body.classList.remove("tt-loading"); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[9999] flex items-center justify-center bg-paper motion-reduce:hidden">
      <div ref={stage} className="flex w-full scale-[0.97] flex-col items-center gap-[26px] px-[5vw] opacity-0">
        <div aria-label="Thirty Three" className="relative whitespace-nowrap text-center font-display text-[clamp(2.6rem,11vw,8rem)] font-black uppercase leading-[0.86] tracking-[-0.01em]">
          <span aria-hidden="true" className="text-beige-dk">Thirty Three</span>
          <span ref={fill} aria-hidden="true" className="absolute inset-0 text-ink will-change-[clip-path] [clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)]">Thirty Three</span>
        </div>
        <div className="flex items-center gap-[10px] font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-ink-50">
          <span className="h-px w-[26px] bg-ink-50 opacity-40" />
          <span>Loading</span>
          <span ref={pct} className="min-w-[2.6em] text-ink [font-variant-numeric:tabular-nums]">0%</span>
          <span className="h-px w-[26px] bg-ink-50 opacity-40" />
        </div>
      </div>
      <div ref={baseline} className="fixed bottom-12 left-1/2 h-[3px] w-16 -translate-x-1/2 rounded-[2px] bg-beige-dk will-change-[scale] [scale:0_1]" />
    </div>
  );
}
