import type { Metadata } from "next";
import { ContactForm } from "@/app/components/contact/ContactForm";
import { Eyebrow, Section, Wrap } from "@/app/components/ui/Layout";
import { Reveal } from "@/app/components/ui/Reveal";
import { getContactPage, getSite } from "@/app/lib/content";
import ContactSceneLoader from "@/app/components/contact/ContactSceneLoader";

export const metadata: Metadata = { title: "Contact", description: "Tell us about your brand and goals. We’ll take it from there." };

export default function ContactPage() {
  const c = getContactPage();
  const site = getSite();
  return (
    <Section tone="ink" className="relative min-h-screen overflow-hidden pt-[150px] max-sm:pt-[120px]">
      <ContactSceneLoader />
      <Wrap className="relative">
        <div className="grid items-start gap-14 [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)] max-[900px]:grid-cols-1">
          <div>
            <Reveal immediate><Eyebrow tone="ink">{c.eyebrow}</Eyebrow></Reveal>
            <Reveal immediate as="h1" delay={0.05} className="mt-5 text-[clamp(38px,6vw,76px)] leading-[0.98] text-on-ink">
              {c.title} <span className="text-beige-dk">{c.titleDim}</span>
            </Reveal>
            <Reveal immediate delay={0.1} className="mt-6 max-w-[480px] text-[16.5px] leading-[1.65] text-on-ink-60">{c.lede}</Reveal>
            <Reveal immediate delay={0.15} className="mt-8 space-y-2 font-mono text-[13.5px]">
              <a className="block text-on-ink no-underline hover:text-beige-dk" href={`mailto:${site.email}`}>{site.email}</a>
              <a className="block text-on-ink no-underline hover:text-beige-dk" href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
            </Reveal>
          </div>
          <Reveal immediate delay={0.12}><ContactForm email={site.email} services={c.services} title={c.formTitle} /></Reveal>
        </div>
      </Wrap>
    </Section>
  );
}
