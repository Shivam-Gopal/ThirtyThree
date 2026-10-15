"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/** Horizontal scroller helper: tracks the scroll edges and exposes prev/next (one card at a time). */
export function useHScroll<T extends HTMLElement = HTMLDivElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);
  const [edge, setEdge] = useState({ start: true, end: true });

  const update = useCallback(() => {
    const g = ref.current;
    if (!g) return;
    setEdge({ start: g.scrollLeft <= 2, end: g.scrollLeft >= g.scrollWidth - g.clientWidth - 2 });
  }, []);

  useEffect(() => {
    update();
    const g = ref.current;
    const ro = typeof ResizeObserver !== "undefined" && g ? new ResizeObserver(update) : null;
    if (g) ro?.observe(g);
    window.addEventListener("resize", update);
    return () => { ro?.disconnect(); window.removeEventListener("resize", update); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, ...deps]);

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const g = ref.current;
    if (!g) return;
    const first = g.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(g).columnGap || "0") || 0;
    g.scrollBy({ left: dir * (first ? first.getBoundingClientRect().width + gap : g.clientWidth), behavior: "smooth" });
  }, []);

  return { ref, edge, update, scrollByCard };
}
