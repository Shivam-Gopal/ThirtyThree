"use client";
import { useRef, type ComponentProps } from "react";
import { cn } from "@/app/lib/cn";

/** Premium 3D hover tilt for cards. Pointer-only, off for reduced-motion. Pure DOM, no re-renders. */
export function Tilt({ className, children, max = 7, lift = 6, ...rest }: ComponentProps<"div"> & { max?: number; lift?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-300 ease-snap", className)}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el || !enabled()) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-${lift}px) scale(1.015)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
