"use client";
import Image from "next/image";
import { Eyebrow, Section, Wrap, titleClass } from "@/app/components/ui/Layout";
import { Marquee } from "@/app/components/ui/Marquee";
import { Reveal } from "@/app/components/ui/Reveal";
import type { Logo } from "@/data/content";

/* Render functions live at module level → stable identity → the memoised marquee items never re-render. */
const logoKey = (l: Logo) => l.slug;
const renderLogo = (l: Logo) => (
  <span className="flex h-[52px] items-center after:ml-[4.5rem] after:flex after:items-center after:text-[14px] after:text-beige-dk after:content-['✦']">
    <Image
      src={l.src}
      alt={l.name}
      width={l.width}
      height={l.height}
      sizes="180px"
      // Eager: lazy-loading made logos pop in one-by-one as they slid on screen (blank gaps + repaints on mobile).
      loading="eager"
      className="h-full w-auto max-w-[180px] object-contain opacity-[0.55] grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
    />
  </span>
);
const handleKey = (h: string) => h;
const renderHandle = (h: string) => (
  <span className="flex items-center gap-[2.6rem] whitespace-nowrap font-mono text-[14px] font-medium tracking-[0.03em] text-ink-50 after:ml-[2.6rem] after:text-[12px] after:text-beige-dk after:content-['•']">
    {h}
  </span>
);

/** "Logos on-board": two data-driven marquees (logos → left, handles → right). */
export function Clients({ logos, handles }: { logos: Logo[]; handles: string[] }) {
  return (
    <Section>
      <Wrap>
        <Reveal><Eyebrow>The roster</Eyebrow></Reveal>
        <Reveal as="h2" delay={0.06} className={titleClass}>Logos on-board.</Reveal>
        <Reveal as="p" delay={0.12} className="mt-3 text-[15px] text-ink-50">A few of the brands ThirtyThree has partnered with.</Reveal>
      </Wrap>
      <div className="mt-12">
        <Marquee items={logos} getKey={logoKey} renderItem={renderLogo} direction="left" gap="4.5rem" secondsPerItem={2.3} />
        <Marquee items={handles} getKey={handleKey} renderItem={renderHandle} direction="right" gap="2.6rem" secondsPerItem={2} className="mt-[26px]" />
      </div>
    </Section>
  );
}
