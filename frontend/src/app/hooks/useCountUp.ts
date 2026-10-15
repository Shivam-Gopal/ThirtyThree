"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

/** Counts from 0 → `target` once the element scrolls into view. */
export function useCountUp(target: number, { decimals = 0, duration = 1400 }: { decimals?: number; duration?: number } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.5, once: true });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return { ref, text: value.toFixed(decimals) };
}
