"use client";
import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/app/lib/cn";

/* One IntersectionObserver shared by every <Reveal> on the page (cheaper than one per element). */
type Cb = () => void;
let sharedIO: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, Cb>();
function observe(el: Element, cb: Cb) {
  if (!sharedIO) {
    sharedIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          callbacks.get(e.target)?.();
          callbacks.delete(e.target);
          sharedIO?.unobserve(e.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
  }
  callbacks.set(el, cb);
  sharedIO.observe(el);
}

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number; // seconds
  immediate?: boolean; // visible from first paint (hero)
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
};

/** Fade + rise on scroll. Content is visible without JS thanks to the <noscript> rule in layout. */
export function Reveal({ as: Tag = "div", className, delay = 0, immediate = false, style, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(immediate);
  useEffect(() => {
    if (immediate || !ref.current) return;
    observe(ref.current, () => setShown(true));
  }, [immediate]);
  return (
    <Tag
      ref={ref}
      data-reveal
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
      className={cn(
        "transition-[opacity,transform] duration-[800ms] ease-reveal",
        shown ? "translate-y-0 opacity-100" : "translate-y-[26px] opacity-0",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
