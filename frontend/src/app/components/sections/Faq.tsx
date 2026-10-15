"use client";
import { useState } from "react";
import { Eyebrow, Section, Wrap, titleClass } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { cn } from "@/app/lib/cn";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section tone="beige" id="faq">
      <Wrap>
        <Reveal><Eyebrow>FAQ</Eyebrow></Reveal>
        <Reveal as="h2" delay={0.06} className={titleClass}>Everything you&apos;d ask over coffee.</Reveal>
        <div className="mt-[46px] max-w-[760px] border-t border-line">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} className="border-b border-line">
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(isOpen ? null : i); } }}
                  className="flex cursor-pointer items-center justify-between gap-5 px-[2px] py-[22px]"
                >
                  <h3 className="text-[17px] font-bold normal-case tracking-normal">{f.q}</h3>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative size-6 flex-none before:absolute before:left-1/2 before:top-1/2 before:h-[1.6px] before:w-[13px] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-ink before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:h-[13px] after:w-[1.6px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-ink after:transition-opacity after:duration-200 after:ease-in-out after:content-['']",
                      isOpen && "after:opacity-0",
                    )}
                  />
                </div>
                <div className={cn("overflow-hidden transition-[max-height] duration-[350ms] ease-in-out", isOpen ? "max-h-[200px]" : "max-h-0")}>
                  <p className="m-0 max-w-[600px] px-[2px] pb-[22px] text-[14.5px] leading-[1.65] text-ink-70">{f.a}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </Section>
  );
}
