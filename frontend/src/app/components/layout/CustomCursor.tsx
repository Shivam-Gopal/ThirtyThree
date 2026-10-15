"use client";
import { useEffect, useRef } from "react";

const HOVER_SELECTOR = "a, button, [role=button], input, textarea, select, label, [data-cursor-hover]";

/** Dot + trailing ring cursor. Desktop pointers only; everything runs in rAF without touching React state. */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const d = dot.current!;
    const r = ring.current!;
    document.documentElement.classList.add("tt-custom-cursor");

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let shown = false;
    let raf = 0;
    const show = (v: boolean) => { d.style.opacity = r.style.opacity = v ? "1" : "0"; };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      d.style.transform = `translate(${mx}px, ${my}px)`;
      if (!shown) { shown = true; show(true); }
    };
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      r.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    const setHover = (on: boolean) => {
      const size = on ? 56 : 34;
      r.style.width = r.style.height = size + "px";
      r.style.margin = `-${size / 2}px 0 0 -${size / 2}px`;
      r.style.background = on ? "rgba(255,255,255,0.15)" : "transparent";
      const ds = on ? 5 : 8;
      d.style.width = d.style.height = ds + "px";
      d.style.margin = `-${ds / 2}px 0 0 -${ds / 2}px`;
    };
    const over = (e: MouseEvent) => (e.target as Element).closest?.(HOVER_SELECTOR) && setHover(true);
    const out = (e: MouseEvent) => (e.target as Element).closest?.(HOVER_SELECTOR) && setHover(false);
    const leave = () => show(false);
    const enter = () => shown && show(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove("tt-custom-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  const base = "pointer-events-none fixed left-0 top-0 z-[9998] rounded-full opacity-0 mix-blend-difference transition-[opacity,width,height] duration-[250ms] ease-snap motion-reduce:hidden";
  return (
    <>
      <div ref={dot} aria-hidden="true" className={`${base} -mt-1 -ml-1 size-2 bg-white`} />
      <div ref={ring} aria-hidden="true" className={`${base} -mt-[17px] -ml-[17px] size-[34px] border-[1.4px] border-white`} />
    </>
  );
}
