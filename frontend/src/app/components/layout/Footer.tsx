import Link from "next/link";
import { Eyebrow, Wrap, titleClass } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { socialIcons } from "@/app/components/ui/Icons";
import { getSite } from "@/app/lib/content";

const colLink = "mb-[10px] block text-[14.5px] text-on-ink no-underline transition-[transform,color] duration-200 hover:translate-x-1 hover:text-beige-dk";

export function Footer() {
  const site = getSite();
  return (
    <footer id="contact" data-dark className="bg-ink pb-[30px] pt-20 text-on-ink">
      <Wrap>
        <Reveal className="mb-[14px]">
          <Eyebrow tone="paper" className="!text-on-ink-60">Let&apos;s connect</Eyebrow>
        </Reveal>
        <Reveal as="h2" delay={0.06} className={`${titleClass} text-on-ink`}>
          Don&apos;t be shy, say hello.
        </Reveal>

        <div className="mt-[50px] grid items-start gap-10 border-b border-on-ink-30 pb-[50px] [grid-template-columns:1.3fr_1fr_1fr] max-[980px]:grid-cols-1 max-[980px]:gap-[30px]">
          <div>
            <Link href="/" className="font-display text-[30px] font-extrabold text-on-ink no-underline">THIRTYTHREE</Link>
            <p className="mt-4 max-w-[300px] text-[14.5px] leading-[1.6] text-on-ink-60">{site.footerBlurb}</p>
          </div>

          <div className="min-w-0">
            <h4 className="mb-4 mt-0 font-mono text-[12px] uppercase tracking-[0.1em] text-on-ink-60">Contact</h4>
            <a href={`mailto:${site.email}`} className={colLink}>{site.email}</a>
            <a href={`tel:${site.phone.tel}`} className={colLink}>{site.phone.display}</a>
          </div>

          <div className="min-w-0">
            <h4 className="mb-4 mt-0 font-mono text-[12px] uppercase tracking-[0.1em] text-on-ink-60">Follow</h4>
            <div className="flex items-center gap-[18px]" aria-label="Social media links">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.id as keyof typeof socialIcons];
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-8 items-center justify-center text-on-ink transition-[transform,color] duration-200 hover:-translate-y-[2px] hover:text-beige-dk"
                  >
                    <Icon className={s.id === "linkedin" ? "size-[25px]" : "size-[22px]"} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[14px] pt-[26px] text-[13px] text-on-ink-60">
          <div>© {new Date().getFullYear()} ThirtyThree. All rights reserved.</div>
        </div>
      </Wrap>
    </footer>
  );
}
