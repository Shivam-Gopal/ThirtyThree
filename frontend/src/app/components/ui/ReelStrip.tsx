"use client";
import type { ReactNode } from "react";
import { ScrollArrows } from "@/app/components/ui/ScrollArrows";
import { useHScroll } from "@/app/hooks/useHScroll";

/** Scroll container for a row of reels + the original arrow buttons underneath. */
export function ReelStrip({ className, children, arrowsClassName, wrapperClassName }: { className: string; children: ReactNode; arrowsClassName?: string; wrapperClassName?: string }) {
  const { ref, edge, update, scrollByCard } = useHScroll();
  return (
    <div className={wrapperClassName ?? "min-w-0"}>
      <div ref={ref} onScroll={update} className={className}>{children}</div>
      <ScrollArrows tone="ink" atStart={edge.start} atEnd={edge.end} onPrev={() => scrollByCard(-1)} onNext={() => scrollByCard(1)} className={arrowsClassName ?? "mt-4"} />
    </div>
  );
}
