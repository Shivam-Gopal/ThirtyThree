import { Eyebrow, Lede, Section, Wrap, titleClass } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { Tilt } from "@/app/components/ui/Tilt";
import { getProcess } from "@/app/lib/content";

export function Process() {
  const steps = getProcess();
  return (
    <Section>
      <Wrap>
        <Reveal><Eyebrow>How we work</Eyebrow></Reveal>
        <Reveal as="h2" delay={0.06} className={titleClass}>The ThirtyThree Method.</Reveal>
        <Reveal delay={0.12}><Lede>A repeatable system, run in order, every time no black boxes.</Lede></Reveal>
        <div className="mt-[52px] grid grid-cols-4 gap-7 max-[980px]:grid-cols-1">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <Tilt className="group relative border-t-2 border-ink pt-5 hover:-translate-y-[5px]">
                <div className="inline-block font-display text-[34px] font-black text-beige-dk transition-transform duration-300 ease-snap group-hover:scale-[1.08]">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-[10px] text-[19px] font-extrabold normal-case">{s.title}</h3>
                <p className="mt-[10px] text-[14.5px] leading-[1.6] text-ink-70">{s.text}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}
