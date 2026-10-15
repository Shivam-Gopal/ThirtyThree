"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useMediaQuery";

/**
 * Index that advances on a timer. Pause/resume from the outside (hover, off-screen…).
 * Used by the testimonial carousel and the "Why ThirtyThree" explorer.
 */
export function useAutoRotate(length: number, intervalMs: number, { paused = false }: { paused?: boolean } = {}) {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0); // bump to restart the timer after a manual change
  const reduced = useReducedMotion();
  const lenRef = useRef(length);
  lenRef.current = length;

  useEffect(() => {
    if (paused || reduced || length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % lenRef.current), intervalMs);
    return () => clearInterval(id);
  }, [paused, reduced, length, intervalMs, tick]);

  const goTo = useCallback((i: number) => {
    setIndex(((i % lenRef.current) + lenRef.current) % lenRef.current);
    setTick((t) => t + 1);
  }, []);
  return { index, goTo };
}
