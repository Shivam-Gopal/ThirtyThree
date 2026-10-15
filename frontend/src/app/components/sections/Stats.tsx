"use client";
import { Wrap } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { useCountUp } from "@/app/hooks/useCountUp";

type Stat = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string };

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const { ref, text } = useCountUp(stat.value, { decimals: stat.decimals ?? 0 });
  return (
    <Reveal delay={index * 0.08} className="px-[10px] text-center">
      <div ref={ref} className="font-display text-[clamp(34px,4.4vw,54px)] font-black leading-none">
        {stat.prefix}{text}{stat.suffix}
      </div>
      <div className="mt-2 text-[13px] font-semibold uppercase tracking-[0.03em] text-ink-50">{stat.label}</div>
    </Reveal>
  );
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-b border-line py-16 max-sm:py-[72px]">
      <Wrap className="grid grid-cols-4 gap-6 max-[980px]:grid-cols-2 max-[980px]:gap-y-[30px]">
        {stats.map((s, i) => (
          <StatItem key={s.label} stat={s} index={i} />
        ))}
      </Wrap>
    </section>
  );
}
