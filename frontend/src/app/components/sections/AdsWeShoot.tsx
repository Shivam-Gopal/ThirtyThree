import { Eyebrow, Lede, Section, Wrap, titleClass } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { ReelGroup } from "@/app/components/ui/ReelGroup";
import { ReelStrip } from "@/app/components/ui/ReelStrip";
import { AdReelCard } from "@/app/components/ui/ReelCards";
import { getAdReels, getAdsSection } from "@/app/lib/content";

export function AdsWeShoot() {
  const reels = getAdReels();
  const s = getAdsSection();
  return (
    <Section tone="ink" id="reels">
      <Wrap>
        <Reveal><Eyebrow tone="ink">{s.eyebrow}</Eyebrow></Reveal>
        <Reveal as="h2" delay={0.06} className={`${titleClass} text-on-ink`}>{s.title}</Reveal>
        <Reveal delay={0.12}><Lede tone="ink">{s.lede}</Lede></Reveal>

        {/* one scrolling row (drag / swipe / arrows) so any number of ads fits at the same card size */}
        <ReelGroup>
          <ReelStrip
            arrowsClassName="mt-5"
            className="-mx-3 mt-8 flex scroll-pl-3 snap-x gap-5 overflow-x-auto px-3 pb-5 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {reels.map((r) => (
              <AdReelCard key={r.id} reel={r} />
            ))}
          </ReelStrip>
        </ReelGroup>
      </Wrap>
    </Section>
  );
}
