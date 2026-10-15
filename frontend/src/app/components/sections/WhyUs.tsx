"use client";
import { useRef, useState } from "react";
import { Eyebrow, Lede, Section, Wrap, titleClass } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { useAutoRotate } from "@/app/hooks/useAutoRotate";
import { useInView } from "@/app/hooks/useInView";
import { useFinePointer } from "@/app/hooks/useMediaQuery";
import { cn } from "@/app/lib/cn";

type Item = { title: string; text: string; tag: string };
const DWELL = 7000;

/** Interactive "why us" explorer: hover / click / arrow-keys, auto-advances while on screen. */
export function WhyUs({ items }: { items: Item[] }) {
  const root = useRef<HTMLDivElement>(null);
  const onScreen = useInView(root, { threshold: 0.35 });
  const fine = useFinePointer();
  const [stopped, setStopped] = useState(false); // user took control
  const paused = stopped || !onScreen;
  const { index, goTo } = useAutoRotate(items.length, DWELL, { paused });
  const rows = useRef<(HTMLButtonElement | null)[]>([]);

  const pick = (i: number) => { if (i !== index) goTo(i); setStopped(true); };

  return (
    <Section tone="beige">
      <Wrap>
        <Reveal><Eyebrow>Why ThirtyThree</Eyebrow></Reveal>
        <Reveal as="h2" delay={0.06} className={titleClass}>The unfair advantage we bring.</Reveal>
        <Reveal as="div" delay={0.12}><Lede>Four reasons growth stage founders leave their last agency and call us instead.</Lede></Reveal>

        <Reveal
          delay={0.18}
          className="mt-14 grid items-start gap-16 [grid-template-columns:1.05fr_1fr] max-[860px]:grid-cols-1 max-[860px]:gap-2"
          onMouseLeave={() => fine && setStopped(false)}
        >
          <div ref={root}>
            <ul role="tablist" aria-label="Why ThirtyThree" className="m-0 list-none border-t border-line p-0">
              {items.map((it, i) => {
                const active = i === index;
                return (
                  <li key={it.title}>
                    <button
                      ref={(el) => { rows.current[i] = el; }}
                      role="tab"
                      id={`why-tab-${i}`}
                      aria-selected={active}
                      aria-controls={`why-pane-${i}`}
                      onClick={() => pick(i)}
                      onFocus={() => i !== index && goTo(i)}
                      onMouseEnter={() => fine && pick(i)}
                      onKeyDown={(e) => {
                        const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % items.length : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + items.length) % items.length : null;
                        if (next === null) return;
                        e.preventDefault();
                        rows.current[next]?.focus();
                        pick(next);
                      }}
                      className={cn(
                        "group relative flex w-full cursor-pointer items-baseline gap-5 border-0 border-b border-line bg-transparent py-6 pr-[6px] text-left font-[inherit] [-webkit-tap-highlight-color:transparent] transition-[color,padding-left] duration-[350ms]",
                        "before:absolute before:bottom-3 before:left-0 before:top-3 before:w-[2px] before:origin-top before:bg-beige-dk before:transition-transform before:duration-[400ms] before:ease-snap before:content-['']",
                        "after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-beige-dk after:content-['']",
                        active
                          ? "pl-4 text-ink before:scale-y-100 after:animate-why-progress"
                          : "pl-0 text-ink-50 before:scale-y-0 hover:pl-2 hover:text-ink-70",
                        active && paused && "after:[animation-play-state:paused]",
                      )}
                    >
                      <span className={cn("shrink-0 font-mono text-[12.5px] font-semibold tracking-[0.06em] transition-[color,opacity] duration-[350ms]", active ? "text-ink opacity-100" : "text-beige-dk opacity-65 group-hover:opacity-100")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-oswald text-[clamp(19px,2.1vw,27px)] font-semibold leading-[1.15] tracking-[0.005em]">{it.title}</span>
                    </button>

                    {/* phones: the copy expands under its own row */}
                    <div className={cn("overflow-hidden transition-[max-height,opacity] duration-500 ease-snap min-[861px]:hidden", active ? "max-h-[260px] border-b border-line opacity-100" : "max-h-0 opacity-0")}>
                      <p className="m-0 mb-[22px] pl-4 text-[15px] leading-[1.7] text-ink-70">{it.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* desktop detail panel */}
          <div className="relative min-h-[260px] pl-1 pt-[10px] max-[860px]:hidden">
            <div aria-hidden="true" className="pointer-events-none select-none font-anton text-[clamp(110px,14vw,190px)] leading-[0.8] tracking-[-0.02em] text-ink opacity-[0.06]">
              {String(index + 1).padStart(2, "0")}
            </div>
            {items.map((it, i) => (
              <div
                key={it.title}
                id={`why-pane-${i}`}
                role="tabpanel"
                aria-labelledby={`why-tab-${i}`}
                className={cn(
                  "transition-[opacity,transform] duration-[450ms] ease-snap",
                  i === index ? "pointer-events-auto relative translate-y-0 opacity-100" : "pointer-events-none absolute bottom-0 left-1 right-0 translate-y-[14px] opacity-0",
                )}
              >
                <h3 className="mt-[18px] text-[clamp(22px,2.5vw,30px)] font-extrabold normal-case tracking-normal">{it.title}</h3>
                <p className="mt-[14px] max-w-[460px] text-[16px] leading-[1.75] text-ink-70">{it.text}</p>
                <span className="mt-[22px] inline-block border-b border-beige-dk pb-1 font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink-50">{it.tag}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Wrap>
    </Section>
  );
}
