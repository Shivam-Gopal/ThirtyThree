"use client";
import { useEffect, useState, type RefObject } from "react";

type Options = { threshold?: number; rootMargin?: string; once?: boolean; initial?: boolean };

/** Is the referenced element on (or near) screen? One tiny IntersectionObserver per call. */
export function useInView<T extends Element>(ref: RefObject<T | null>, { threshold = 0, rootMargin = "0px", once = false, initial = false }: Options = {}) {
  const [inView, setInView] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin, once]);
  return inView;
}
