"use client";
import { cn } from "@/app/lib/cn";

/** The round prev / next buttons from the original design. Dark-section variant for the reels. */
export function ScrollArrows({
  atStart, atEnd, onPrev, onNext, tone = "paper", className,
}: { atStart: boolean; atEnd: boolean; onPrev: () => void; onNext: () => void; tone?: "paper" | "ink"; className?: string }) {
  const btn = cn(
    "grid size-11 cursor-pointer place-items-center rounded-full border bg-transparent p-0 transition-[background,color,opacity,transform] duration-200 enabled:hover:scale-[1.06] disabled:cursor-default disabled:opacity-30 max-[560px]:size-10",
    tone === "paper"
      ? "border-ink text-ink enabled:hover:bg-ink enabled:hover:text-on-ink"
      : "border-on-ink text-on-ink enabled:hover:bg-on-ink enabled:hover:text-ink",
  );
  return (
    <div className={cn("mt-[6px] flex justify-end gap-[10px]", className)}>
      <button type="button" aria-label="Previous cards" disabled={atStart} onClick={onPrev} className={btn}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button type="button" aria-label="Next cards" disabled={atEnd} onClick={onNext} className={btn}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}
