"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Eyebrow, Section, Wrap, titleClass } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { cn } from "@/app/lib/cn";
import type { Testimonial } from "@/data/content";

type Props = { items: Testimonial[]; section: { eyebrow: string; title: string; note?: string } };

const INTERVAL = 4200;

/** relative slot: 0 centre, 1 right, -1 left, "back" hidden behind */
function slot(i: number, active: number, n: number): "0" | "1" | "-1" | "back" {
  let d = (((i - active) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d === 0 ? "0" : d === 1 ? "1" : d === -1 ? "-1" : "back";
}

// Card positions (identical to the original design); phones use the tighter variant.
const pos: Record<string, string> = {
  "0": "z-[3] cursor-default border-[rgba(231,218,184,.55)] opacity-100 [transform:translateX(-50%)_translateZ(0)_rotateY(0)_scale(1)] shadow-[0_40px_80px_rgba(0,0,0,.6),0_0_60px_rgba(231,218,184,.12),inset_0_1px_0_rgba(255,255,255,.08)]",
  "1": "z-[2] opacity-50 [filter:brightness(.6)] [transform:translateX(calc(-50%+76%))_translateZ(-220px)_rotateY(-32deg)_scale(.92)] max-[640px]:[transform:translateX(calc(-50%+56%))_translateZ(-200px)_rotateY(-28deg)_scale(.88)]",
  "-1": "z-[2] opacity-50 [filter:brightness(.6)] [transform:translateX(calc(-50%-76%))_translateZ(-220px)_rotateY(32deg)_scale(.92)] max-[640px]:[transform:translateX(calc(-50%-56%))_translateZ(-200px)_rotateY(28deg)_scale(.88)]",
  back: "z-[1] opacity-0 [transform:translateX(-50%)_translateZ(-420px)_scale(.8)]",
};

export function Testimonials({ items, section }: Props) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const onScreen = useRef(true); // assume visible until the observer says otherwise

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);
  const start = useCallback(() => {
    stop();
    if (n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => {
      if (onScreen.current) setActive((a) => (a + 1) % n); // skip ticks while off-screen
    }, INTERVAL);
  }, [n, stop]);

  useEffect(() => {
    start();
    const el = root.current;
    let io: IntersectionObserver | undefined;
    if (el && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([e]) => { onScreen.current = e.isIntersecting; });
      io.observe(el);
    }
    return () => { stop(); io?.disconnect(); };
  }, [start, stop]);

  const go = (i: number) => { setActive(((i % n) + n) % n); start(); };

  return (
    <Section tone="ink" className="overflow-hidden">
      <Wrap>
        <Reveal><Eyebrow tone="ink">{section.eyebrow}</Eyebrow></Reveal>
        <Reveal as="h2" delay={0.06} className={titleClass}>{section.title}</Reveal>
        {section.note && <p className="mt-[10px] max-w-[520px] font-mono text-[11.5px] leading-[1.65] text-on-ink-60">{section.note}</p>}

        <div ref={root} onMouseEnter={stop} onMouseLeave={start} role="group" aria-roledescription="carousel" aria-label="Client testimonials" className="mt-14 max-[640px]:mt-10">
          <div className="relative h-[330px] [perspective-origin:50%_40%] [perspective:1400px] [transform-style:preserve-3d] max-[640px]:h-[360px]">
            {items.map((t, i) => (
              <article
                key={t.id}
                data-pos={slot(i, active, n)}
                onClick={() => i !== active && go(i)}
                className={cn(
                  "absolute left-1/2 top-0 flex h-full w-[min(460px,78%)] cursor-pointer flex-col justify-between rounded-[22px] border border-[rgba(231,218,184,.28)] bg-[linear-gradient(155deg,#26221a_0%,#15130d_70%)] px-8 py-[34px] [backface-visibility:hidden] will-change-transform",
                  "shadow-[0_30px_60px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.06)] transition-[transform,opacity,filter,border-color] duration-[900ms] [transition-timing-function:cubic-bezier(.22,.7,.2,1)] max-[640px]:w-[80%] max-[640px]:px-[22px] max-[640px]:py-[26px]",
                  pos[slot(i, active, n)],
                )}
              >
                <div className="h-9 font-display text-[80px] leading-[0.6] text-beige-dk">&ldquo;</div>
                <p className="m-0 text-[18px] leading-[1.55] text-on-ink max-[640px]:text-[16px]">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="flex size-[38px] items-center justify-center rounded-full bg-beige font-mono text-[13px] font-semibold text-ink">{t.initials}</div>
                  <div>
                    <div className="text-[14px] font-bold">{t.name}</div>
                    <div className="text-[12.5px] text-on-ink-60">{t.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div role="tablist" className="mt-[34px] flex justify-center gap-[10px]">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                aria-selected={i === active}
                onClick={() => { go(i); }}
                className={cn("h-[9px] cursor-pointer rounded-full border-0 p-0 transition-[width,background] duration-300", i === active ? "w-7 bg-beige" : "w-[9px] bg-on-ink-30")}
              />
            ))}
          </div>
        </div>
      </Wrap>
    </Section>
  );
}
