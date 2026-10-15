"use client";
import { memo, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "@/app/hooks/useInView";
import { cn } from "@/app/lib/cn";

type Props<T> = {
  items: readonly T[];
  getKey: (item: T) => string;
  renderItem: (item: T, index: number) => ReactNode;
  direction?: "left" | "right";
  /** seconds each item spends crossing the screen → constant speed for ANY array length */
  secondsPerItem?: number;
  /** CSS length between items, e.g. "4.5rem" */
  gap?: string;
  /** soft fade at both edges */
  fade?: boolean;
  className?: string;
};

/**
 * Seamless infinite marquee driven entirely by data.
 *
 * Logic that keeps it smooth for any array:
 *  1. The array is rendered as a "set". The set is measured, and repeated just enough times to be wider than
 *     the viewport, so short arrays never leave a gap.
 *  2. Two identical sets sit side by side and a GPU-only translate3d(-50%) loop slides them → no jump on reset.
 *  3. Duration = items × secondsPerItem, so adding logos never speeds the strip up.
 *  4. The animation is paused while off-screen (saves CPU) and on hover; items are memoised so React never
 *     re-renders them while the CSS animation runs.
 */
function MarqueeInner<T>({ items, getKey, renderItem, direction = "left", secondsPerItem = 2.4, gap = "4.5rem", fade = true, className }: Props<T>) {
  const viewport = useRef<HTMLDivElement>(null);
  const firstSet = useRef<HTMLDivElement>(null);
  const onScreen = useInView(viewport, { rootMargin: "100px 0px" });
  const [repeat, setRepeat] = useState(1);

  useLayoutEffect(() => {
    const vp = viewport.current;
    const set = firstSet.current;
    if (!vp || !set) return;
    const measure = () => {
      const unit = set.scrollWidth / repeat; // width of one copy of the array
      if (unit > 0) setRepeat(Math.max(1, Math.ceil(vp.clientWidth / unit)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [repeat, items.length]);

  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  const duration = `${Math.max(8, items.length * repeat * secondsPerItem)}s`;
  const copies = Array.from({ length: repeat });
  const setClass = "flex shrink-0 items-center";
  const setStyle = { gap, paddingRight: gap };

  const renderSet = (hidden: boolean) => (
    <div className={setClass} style={setStyle} aria-hidden={hidden || undefined} ref={hidden ? undefined : firstSet}>
      {copies.flatMap((_, c) => items.map((it, i) => <Item key={`${c}-${getKey(it)}`} render={renderItem} item={it} index={i} />))}
    </div>
  );

  return (
    <div
      ref={viewport}
      className={cn("overflow-hidden", fade && "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]", className)}
    >
      <div
        className={cn(
          "flex w-max items-center will-change-transform hover:[animation-play-state:paused]",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        )}
        style={{ animationDuration: duration, animationPlayState: onScreen && !prefersReduced ? "running" : "paused" }}
      >
        {renderSet(false)}
        {renderSet(true)}
      </div>
    </div>
  );
}

const Item = memo(function Item<T>({ render, item, index }: { render: (item: T, i: number) => ReactNode; item: T; index: number }) {
  return <>{render(item, index)}</>;
}) as <T>(p: { render: (item: T, i: number) => ReactNode; item: T; index: number }) => ReactNode;

export const Marquee = MarqueeInner;
