"use client";
import { useState } from "react";
import { Eyebrow, Lede, Section, Wrap, titleClass } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { cn } from "@/app/lib/cn";

type Cap = { title: string; text: string; tags: string[] };

export function Capabilities({ items }: { items: Cap[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section tone="ink" id="capabilities">
      <Wrap>
        <Reveal><Eyebrow tone="ink">Capabilities</Eyebrow></Reveal>
        <Reveal as="h2" delay={0.06} className={titleClass}>What we do.</Reveal>
        <Reveal delay={0.12}><Lede tone="ink">Four interlocking practices, one growth engine. Tap any row to dig in.</Lede></Reveal>

        <div className="mt-[46px] border-t border-on-ink-30">
          {items.map((c, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={c.title} className="border-b border-on-ink-30">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 border-0 bg-transparent px-1 py-7 text-left font-[inherit] text-on-ink"
                >
                  <span className="flex items-baseline gap-[22px]">
                    <span className="font-mono text-[13px] text-on-ink-60">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-[clamp(24px,3vw,36px)] font-extrabold normal-case tracking-normal">{c.title}</h3>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative size-[30px] shrink-0 rounded-full border transition-[transform,background] duration-300",
                      "before:absolute before:left-1/2 before:top-1/2 before:h-[1.4px] before:w-[11px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
                      "after:absolute after:left-1/2 after:top-1/2 after:h-[11px] after:w-[1.4px] after:-translate-x-1/2 after:-translate-y-1/2 after:transition-opacity after:duration-[250ms] after:content-['']",
                      isOpen ? "rotate-45 border-beige-dk bg-beige-dk before:bg-ink after:bg-ink" : "border-on-ink-30 before:bg-on-ink after:bg-on-ink",
                    )}
                  />
                </button>
                <div className={cn("overflow-hidden transition-[max-height] duration-[400ms] ease-out", isOpen ? "max-h-[320px]" : "max-h-0")}>
                  <div className="grid gap-[30px] px-1 pb-[30px] [grid-template-columns:1.2fr_1fr] max-sm:grid-cols-1">
                    <p className="m-0 max-w-[420px] text-[15px] leading-[1.65] text-on-ink-60">{c.text}</p>
                    <div className="flex flex-wrap items-start gap-[9px]">
                      {c.tags.map((t) => (
                        <span key={t} className="rounded-full border border-on-ink-30 px-3 py-[6px] font-mono text-[12px] text-on-ink-60">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </Section>
  );
}
