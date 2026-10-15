import { Eyebrow, Lede, Section, Wrap, titleClass } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { ReelGroup } from "@/app/components/ui/ReelGroup";
import { PovReelCard } from "@/app/components/ui/ReelCards";
import { getPovReels, getPovSection } from "@/app/lib/content";

export function Pov() {
  const reels = getPovReels();
  const section = getPovSection();
  return (
    <Section tone="ink" id="pov">
      <Wrap>
        <div className="grid items-center gap-16 [grid-template-columns:minmax(0,1.05fr)_minmax(0,1fr)] max-[980px]:grid-cols-1 max-[980px]:gap-9">
          <div>
            <Reveal><Eyebrow tone="ink">{section.eyebrow}</Eyebrow></Reveal>
            <Reveal as="h2" delay={0.06} className="mt-4 max-w-none text-[clamp(34px,5vw,64px)] leading-[0.98] text-on-ink">
              <span className="block">{section.lines[0]}</span>
              <span className="block text-beige-dk">{section.lines[1]}</span>
            </Reveal>
            <Reveal delay={0.12}><Lede tone="ink">{section.lede}</Lede></Reveal>
          </div>

          {/* ≥701px: 3-up grid · phones: horizontal swipe strip */}
          <ReelGroup>
            <div
              className={
                "grid w-full max-w-[700px] justify-self-end gap-[18px] [grid-template-columns:repeat(3,minmax(0,1fr))] " +
                "max-[980px]:max-w-none max-[980px]:justify-self-stretch " +
                "max-[700px]:mr-[calc(-1*clamp(20px,5vw,56px))] max-[700px]:flex max-[700px]:max-w-none max-[700px]:justify-self-stretch max-[700px]:snap-x max-[700px]:snap-mandatory max-[700px]:gap-[14px] max-[700px]:overflow-x-auto max-[700px]:pb-[6px] max-[700px]:pr-[clamp(20px,5vw,56px)] max-[700px]:[scrollbar-width:none] max-[700px]:[&::-webkit-scrollbar]:hidden"
              }
            >
              {reels.map((r) => (
                <PovReelCard key={r.id} reel={r} />
              ))}
            </div>
          </ReelGroup>
        </div>
      </Wrap>
    </Section>
  );
}
