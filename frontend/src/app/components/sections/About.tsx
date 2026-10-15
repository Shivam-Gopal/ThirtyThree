import { Button } from "@/app/components/ui/Button";
import { Eyebrow, Section, Wrap, titleClass } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { getAboutTeaser } from "@/app/lib/content";

export function About() {
  const about = getAboutTeaser();
  return (
    <Section id="about">
      <Wrap className="grid items-start gap-[60px] [grid-template-columns:1.15fr_0.85fr] max-[980px]:grid-cols-1 max-[980px]:gap-[30px]">
        <Reveal>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 className={titleClass}>{about.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          {about.paragraphs.map((p) => (
            <p key={p} className="mb-4 max-w-[480px] text-[15.5px] leading-[1.75] text-ink-70 last-of-type:mb-[26px]">{p}</p>
          ))}
          <Button href="/about" variant="outline" arrow>Know more</Button>
        </Reveal>
      </Wrap>
    </Section>
  );
}
