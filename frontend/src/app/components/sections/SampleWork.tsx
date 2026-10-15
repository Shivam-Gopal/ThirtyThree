"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollArrows } from "@/app/components/ui/ScrollArrows";
import { useHScroll } from "@/app/hooks/useHScroll";
import { Eyebrow, Section, Wrap, titleClass } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { Tilt } from "@/app/components/ui/Tilt";
import { cn } from "@/app/lib/cn";
import type { SampleWork as Work } from "@/data/content";

type Props = { items: Work[]; categories: string[]; section: { eyebrow: string; title: string; note: string } };

export function SampleWork({ items, categories, section }: Props) {
  const [cat, setCat] = useState("All");
  const shown = useMemo(() => (cat === "All" ? items : items.filter((w) => w.categories.includes(cat))), [items, cat]);
  const { ref: grid, edge, update, scrollByCard } = useHScroll<HTMLDivElement>([shown]);

  // mouse drag-to-scroll (desktop)
  const drag = useRef({ down: false, moved: false, sx: 0, sl: 0 });
  const onDown = (e: React.MouseEvent) => { drag.current = { down: true, moved: false, sx: e.pageX, sl: grid.current?.scrollLeft ?? 0 }; };
  useEffect(() => {
    const up = () => { const g = grid.current; if (drag.current.down && g) { drag.current.down = false; g.style.scrollSnapType = ""; g.style.scrollBehavior = ""; } };
    const move = (e: MouseEvent) => {
      const d = drag.current, g = grid.current;
      if (!d.down || !g) return;
      const dx = e.pageX - d.sx;
      if (Math.abs(dx) > 4) { d.moved = true; g.style.scrollSnapType = "none"; g.style.scrollBehavior = "auto"; }
      if (d.moved) g.scrollLeft = d.sl - dx;
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mouseup", up); window.removeEventListener("mousemove", move); };
  }, []);

  return (
    <Section tone="beige" id="work">
      <Wrap>
        <Reveal><Eyebrow>{section.eyebrow}</Eyebrow></Reveal>
        <Reveal as="h2" delay={0.06} className={titleClass}>{section.title}</Reveal>
        <Reveal as="p" delay={0.12} className="mt-3 text-[15px] text-ink-50">{section.note}</Reveal>

        <div role="tablist" aria-label="Filter work by category" className="mt-7 flex gap-[10px] overflow-x-auto px-[2px] pb-[6px] pt-[2px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => { setCat(c); grid.current?.scrollTo({ left: 0, behavior: "auto" }); }}
              className={cn(
                "shrink-0 cursor-pointer rounded-full border px-5 py-[9px] font-sans text-[14px] font-medium transition-[background,color,border-color] duration-200",
                c === cat ? "border-ink bg-ink text-on-ink" : "border-line bg-white/55 text-ink hover:border-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div
          ref={grid}
          tabIndex={0}
          onScroll={update}
          onMouseDown={onDown}
          className="-mx-1 mt-[26px] flex snap-x snap-mandatory gap-[22px] overflow-x-auto scroll-smooth px-1 pb-4 pt-2 [-webkit-overflow-scrolling:touch] [overscroll-behavior-x:contain] [scrollbar-color:#cbb585_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-beige-dk [&::-webkit-scrollbar]:h-[6px]"
        >
          {shown.map((w) => (
            <Tilt key={w.slug} className="flex shrink-0 basis-[max(calc((100%-66px)/4),300px)] snap-start flex-col overflow-hidden rounded-[18px] border border-line bg-white transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(18,16,9,0.1)] max-[560px]:basis-[78%]">
              <Link href={`/work/${w.slug}`} draggable={false} className="group flex flex-1 flex-col text-inherit no-underline">
                <div className="relative h-[210px] shrink-0 overflow-hidden bg-[linear-gradient(135deg,#e7dab8_0%,#f1e9d6_100%)]">
                  <Image src={w.image} alt={w.imageAlt} fill sizes="(max-width:560px) 78vw, 360px" draggable={false} style={{ objectPosition: w.imagePosition }} className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105" />
                  <span className="absolute left-[14px] top-[14px] rounded-full bg-ink px-[10px] py-[5px] font-mono text-[11px] text-on-ink">{w.tag}</span>
                </div>
                <div className="flex flex-1 flex-col px-[18px] pb-5 pt-[18px]">
                  <div className="font-mono text-[12px] uppercase tracking-[0.06em] text-ink-50">{w.brand}</div>
                  <h3 className="mb-3 mt-2 min-h-[2.4em] text-[19px] font-extrabold normal-case leading-[1.2] tracking-normal">{w.title}</h3>
                  <div className="mt-auto flex min-h-14 items-center gap-3 border-t border-line pt-3">
                    <span className="min-w-[3.4ch] shrink-0 font-display text-[24px] font-black leading-none">{w.result.value}</span>
                    <span className="flex-1 text-[12.5px] leading-[1.35] text-ink-50">{w.result.label}</span>
                  </div>
                </div>
              </Link>
            </Tilt>
          ))}
        </div>

        <ScrollArrows atStart={edge.start} atEnd={edge.end} onPrev={() => scrollByCard(-1)} onNext={() => scrollByCard(1)} />
      </Wrap>
    </Section>
  );
}
