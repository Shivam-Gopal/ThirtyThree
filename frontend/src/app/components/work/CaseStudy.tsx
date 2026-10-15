import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import { Section, Wrap } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { cn } from "@/app/lib/cn";
import type { CaseStudyBlock, SampleWork } from "@/data/content";

function Block({ b, first }: { b: CaseStudyBlock; first?: boolean }) {
  switch (b.type) {
    case "heading":
      return <Reveal as="h2" className="mb-5 mt-16 text-[clamp(26px,3.4vw,40px)] leading-[1.05]">{b.text}</Reveal>;
    case "text":
      return <Reveal as="p" className="my-4 text-[17px] leading-[1.75] text-ink-70">{b.text}</Reveal>;
    case "lead":
      return <Reveal as="p" className="my-8 font-display text-[clamp(26px,3.6vw,42px)] font-extrabold uppercase leading-[1.05] text-ink">{b.text}</Reveal>;
    case "pull":
      return <Reveal as="blockquote" className="my-10 border-l-4 border-beige-dk bg-beige-soft px-7 py-6 text-[clamp(19px,2.2vw,24px)] font-bold leading-[1.4] text-ink">{b.text}</Reveal>;
    case "stats":
      return (
        <div className="my-8 grid grid-cols-3 gap-4 max-sm:grid-cols-1">
          {b.items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className={cn("rounded-2xl border p-6", s.featured ? "border-ink bg-ink text-on-ink" : "border-ink/15 bg-beige-soft")}>
              <div className="font-display text-[clamp(34px,4.4vw,52px)] font-black leading-none">{s.value}</div>
              <div className={cn("mt-2 font-mono text-[12px] uppercase tracking-[0.1em]", s.featured ? "text-on-ink-60" : "text-ink-50")}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      );
    case "figure":
      return (
        <Reveal as="figure" className="my-10 overflow-hidden rounded-2xl border border-ink/10">
          <Image src={b.src} alt={b.alt} width={b.width} height={b.height} sizes="(max-width:900px) 100vw, 860px" priority={first} className="h-auto w-full" />
        </Reveal>
      );
    case "cards":
      return (
        <div className="my-8 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          {b.items.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06} className="rounded-2xl border border-ink/15 p-6">
              <h3 className="text-[18px] font-extrabold normal-case">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink-70">{c.text}</p>
            </Reveal>
          ))}
        </div>
      );
    case "list":
      return (
        <Reveal as="ul" className="my-6 list-none space-y-3 p-0">
          {b.items.map((t) => (
            <li key={t} className="relative pl-6 text-[16.5px] leading-[1.6] text-ink-70 before:absolute before:left-0 before:top-[0.7em] before:h-[2px] before:w-3 before:bg-beige-dk before:content-['']">{t}</li>
          ))}
        </Reveal>
      );
    case "steps":
      return (
        <Reveal as="ol" className="my-6 list-none space-y-4 p-0">
          {b.items.map((t, i) => (
            <li key={t} className="flex items-start gap-4 text-[16.5px] leading-[1.6] text-ink-70">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink font-mono text-[12px] font-semibold text-on-ink">{i + 1}</span>
              <span className="pt-[3px]">{t}</span>
            </li>
          ))}
        </Reveal>
      );
  }
}

export function CaseStudy({ work }: { work: SampleWork }) {
  const cs = work.caseStudy;
  return (
    <>
      <Section tone="ink" className="pb-20 pt-[150px] max-sm:pt-[120px]">
        <Wrap>
          <Reveal immediate className="font-mono text-[12.5px] font-semibold uppercase tracking-[0.14em] text-beige-dk">{cs.kicker}</Reveal>
          <Reveal immediate as="h1" delay={0.05} className="mt-5 max-w-[900px] text-[clamp(38px,6.4vw,84px)] leading-[0.96] text-on-ink">{cs.headline}</Reveal>
          <Reveal immediate delay={0.1} className="mt-6 text-[clamp(16px,1.8vw,22px)] text-on-ink-60">{cs.tagline}</Reveal>
        </Wrap>
      </Section>

      <Section className="py-[72px]">
        <Wrap className="max-w-[860px]">
          {cs.blocks.map((b, i) => <Block key={i} b={b} first={b.type === "figure" && cs.blocks.findIndex((x) => x.type === "figure") === i} />)}
        </Wrap>
      </Section>

      <Section tone="beige" className="text-center">
        <Wrap>
          <Reveal as="h2" className="mx-auto max-w-[760px] text-[clamp(30px,4.6vw,56px)] leading-[1.02]">{cs.cta.heading}</Reveal>
          <Reveal delay={0.1} className="mt-8"><Button variant="dark" href={cs.cta.href} arrow>{cs.cta.button}</Button></Reveal>
          <Reveal delay={0.16} className="mt-14 font-mono text-[12.5px] uppercase tracking-[0.12em] text-ink-50">
            <b className="text-ink">{cs.signoff.brand}</b> · {cs.signoff.line}
          </Reveal>
        </Wrap>
      </Section>
    </>
  );
}
