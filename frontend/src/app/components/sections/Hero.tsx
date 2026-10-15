import { Button } from "@/app/components/ui/Button";
import { Eyebrow, Wrap } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { getHero } from "@/app/lib/content";
import { HeroBackground } from "./HeroBackground";
import { HeroTicker } from "./HeroTicker";

export function Hero() {
  const hero = getHero();
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black pb-[90px] pt-[85px] text-center max-sm:min-h-0 max-sm:justify-start max-sm:pb-[84px] max-sm:pt-[92px] max-sm:text-left">
      <HeroBackground />

      <Wrap className="relative z-[3] max-sm:before:pointer-events-none max-sm:before:absolute max-sm:before:left-2 max-sm:before:top-[60px] max-sm:before:-z-10 max-sm:before:whitespace-nowrap max-sm:before:font-display max-sm:before:text-[34vw] max-sm:before:font-black max-sm:before:leading-none max-sm:before:text-[rgba(243,238,224,0.05)] max-sm:before:content-['THIRTYTHREE']">
        <Reveal immediate>
          <Eyebrow tone="hero" className="mb-[22px] max-sm:mb-[22px] max-sm:justify-start max-sm:text-[10.5px] max-sm:!text-beige-dk">
            {hero.tag}
          </Eyebrow>
        </Reveal>

        <Reveal as="h1" immediate delay={0.08} className="text-[clamp(28px,5vw,76px)] leading-[1.05] text-on-ink [text-wrap:balance] max-sm:text-left max-sm:text-[clamp(40px,13vw,64px)] max-sm:leading-[0.88] max-sm:[text-wrap:wrap]">
          {hero.headline}
          <span className="text-on-ink-60 max-sm:mt-[6px] max-sm:block max-sm:text-beige">
            <br className="max-sm:hidden" />
            {hero.headlineDim}
            <br className="max-sm:hidden" />
          </span>
        </Reveal>

        <Reveal as="p" immediate delay={0.18} className="mx-auto mt-[26px] max-w-[560px] text-[17.5px] leading-[1.65] text-on-ink-60 max-sm:mx-0 max-sm:mt-6 max-sm:max-w-none max-sm:text-[16px] max-sm:leading-[1.55]">
          {hero.sub}
        </Reveal>

        <Reveal immediate delay={0.28} className="mt-[34px] flex justify-center gap-[14px] max-sm:mt-7 max-sm:justify-start">
          <Button
            href="/contact"
            arrow
            className="bg-beige text-ink shadow-[0_8px_24px_rgba(231,218,184,0.22)] hover:bg-beige-soft hover:shadow-[0_16px_34px_rgba(231,218,184,0.32)] max-sm:gap-4 max-sm:border-beige max-sm:py-[6px] max-sm:pl-[22px] max-sm:pr-[6px] max-sm:text-[13px] max-sm:uppercase max-sm:tracking-[0.04em]"
            arrowClassName="max-sm:inline-flex max-sm:size-[34px] max-sm:items-center max-sm:justify-center max-sm:rounded-full max-sm:bg-ink max-sm:text-[15px] max-sm:text-beige"
          >
            Start scaling
          </Button>
          <Button href="/#work" variant="outline-light" className="hover:bg-on-ink hover:text-ink max-sm:hidden">
            See our work ↘
          </Button>
        </Reveal>
      </Wrap>

      <div className="absolute inset-x-0 bottom-0 z-[4] overflow-hidden border-t border-on-ink-30 bg-[rgba(5,5,5,0.5)] py-4 backdrop-blur-[6px]">
        <HeroTicker items={hero.ticker} />
      </div>
    </section>
  );
}
