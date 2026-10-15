"use client";
import { Marquee } from "@/app/components/ui/Marquee";

const getKey = (t: string) => t;
const renderTicker = (text: string) => (
  <span className="flex items-center gap-[26px] whitespace-nowrap px-[26px] font-mono text-[13px] uppercase tracking-[0.1em] text-on-ink after:text-[11px] after:text-beige-dk after:content-['✦']">
    {text}
  </span>
);

export function HeroTicker({ items }: { items: string[] }) {
  return <Marquee items={items} getKey={getKey} renderItem={renderTicker} gap="0px" fade={false} secondsPerItem={7.5} />;
}
