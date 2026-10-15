import type { Metadata } from "next";
import { Button } from "@/app/components/ui/Button";
import { Eyebrow, Section, Wrap } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { getAboutPage } from "@/app/lib/content";

export const metadata: Metadata = { title: "About", description: "Thirtythree is a performance marketing company built around one idea: being seen by the right people." };

const P = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <Reveal as="p" className={`my-4 text-[17px] leading-[1.75] ${dark ? "text-on-ink-60" : "text-ink-70"}`}>{children}</Reveal>
);

export default function AboutPage() {
  const a = getAboutPage();
  return (
    <>
      <Section className="pt-[150px] max-sm:pt-[120px]">
        <Wrap>
          <Reveal immediate><Eyebrow>{a.intro.eyebrow}</Eyebrow></Reveal>
          <Reveal immediate as="h1" delay={0.05} className="mt-5 max-w-[980px] text-[clamp(36px,6vw,78px)] leading-[0.98]">
            {a.intro.title} <span className="text-beige-dk">{a.intro.titleDim}</span>
          </Reveal>
          <div className="mt-14 grid gap-14 [grid-template-columns:minmax(0,1fr)_minmax(0,1.6fr)] max-[900px]:grid-cols-1">
            <div className="flex gap-8 self-start max-[900px]:gap-6">
              {a.intro.facts.map((f) => (
                <Reveal key={f.value}>
                  <div className="font-display text-[clamp(40px,5vw,64px)] font-black leading-none">{f.value}</div>
                  <div className="mt-2 max-w-[160px] font-mono text-[12px] uppercase tracking-[0.1em] text-ink-50">{f.label}</div>
                </Reveal>
              ))}
            </div>
            <div>{a.intro.paragraphs.map((t) => <P key={t}>{t}</P>)}</div>
          </div>
        </Wrap>
      </Section>

      <Section tone="beige">
        <Wrap className="max-w-[900px]">
          <Reveal><Eyebrow>{a.story.eyebrow}</Eyebrow></Reveal>
          <Reveal as="h2" delay={0.05} className="mt-4 text-[clamp(32px,4.4vw,54px)] leading-[1.02]">{a.story.title}</Reveal>
          {a.story.before.map((t) => <P key={t}>{t}</P>)}
          <Reveal as="blockquote" className="my-10 border-l-4 border-ink pl-6 font-display text-[clamp(26px,3.6vw,44px)] font-extrabold uppercase leading-[1.05]">{a.story.pull}</Reveal>
          {a.story.after.map((t) => <P key={t}>{t}</P>)}
          <Reveal as="div" className="mt-6 font-display text-[clamp(52px,9vw,120px)] font-black uppercase leading-[0.9]">{a.story.bigEnd}</Reveal>
        </Wrap>
      </Section>

      <Section tone="ink">
        <Wrap>
          <div className="grid gap-14 [grid-template-columns:minmax(0,1fr)_minmax(0,1.5fr)] max-[900px]:grid-cols-1">
            <div>
              <Reveal><Eyebrow tone="ink">{a.founder.eyebrow}</Eyebrow></Reveal>
              <Reveal as="h2" delay={0.05} className="mt-4 text-[clamp(34px,5vw,64px)] leading-[0.98] text-on-ink">{a.founder.name}</Reveal>
              <Reveal delay={0.1} className="mt-3 font-mono text-[12.5px] uppercase tracking-[0.1em] text-beige-dk">{a.founder.role}</Reveal>
              <div className="mt-10 flex gap-8">
                {a.founder.duo.map((d) => (
                  <Reveal key={d.label}>
                    <div className="font-display text-[56px] font-black leading-none text-on-ink">{d.value}</div>
                    <div className="mt-2 max-w-[140px] font-mono text-[12px] uppercase tracking-[0.1em] text-on-ink-60">{d.label}</div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              {a.founder.paragraphs.map((t) => <P key={t} dark>{t}</P>)}
              <Reveal as="p" className="my-4 text-[17px] leading-[1.75] text-on-ink-60">{a.founder.emphasis.before}<strong className="text-on-ink">{a.founder.emphasis.strong}</strong></Reveal>
            </div>
          </div>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <Reveal><Eyebrow>{a.backstory.eyebrow}</Eyebrow></Reveal>
          <Reveal as="h2" delay={0.05} className="mt-4 max-w-[820px] text-[clamp(32px,4.4vw,54px)] leading-[1.02]">{a.backstory.title}</Reveal>
          <div className="mt-11 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            {a.backstory.creds.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} className="rounded-2xl border border-ink/15 p-6">
                <h3 className="text-[18px] font-extrabold normal-case">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-70">{c.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 max-w-[820px]">{a.backstory.paragraphs.map((t) => <P key={t}>{t}</P>)}</div>
          <Reveal className="mt-14">
            <p className="m-0 text-[clamp(18px,2.2vw,26px)] font-bold text-ink-70">{a.backstory.closer.line}</p>
            <p className="m-0 mt-1 font-display text-[clamp(34px,5vw,64px)] font-black uppercase leading-none">{a.backstory.closer.end}</p>
            <div className="mt-8"><Button href="/contact" arrow>{a.backstory.closer.button}</Button></div>
          </Reveal>
        </Wrap>
      </Section>
    </>
  );
}
