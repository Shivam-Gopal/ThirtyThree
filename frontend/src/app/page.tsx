import { Hero } from "@/app/components/sections/Hero";
import { Stats } from "@/app/components/sections/Stats";
import { About } from "@/app/components/sections/About";
import { WhyUs } from "@/app/components/sections/WhyUs";
import { Clients } from "@/app/components/sections/Clients";
import { Capabilities } from "@/app/components/sections/Capabilities";
import { Process } from "@/app/components/sections/Process";
import { Pov } from "@/app/components/sections/Pov";
import { AdsWeShoot } from "@/app/components/sections/AdsWeShoot";
import { SampleWork } from "@/app/components/sections/SampleWork";
import { Testimonials } from "@/app/components/sections/Testimonials";
import { Faq } from "@/app/components/sections/Faq";
import {
  getCapabilities, getClientHandles, getClientLogos, getFaqs, getSampleWork, getStats,
  getTestimonials, getTestimonialsSection, getWhyUs, getWorkCategories, getWorkSection,
} from "@/app/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats stats={getStats()} />
      <About />
      <WhyUs items={getWhyUs()} />
      <Clients logos={getClientLogos()} handles={getClientHandles()} />
      <Capabilities items={getCapabilities()} />
      <Process />
      <Pov />
      <SampleWork items={getSampleWork()} categories={getWorkCategories()} section={getWorkSection()} />
      <AdsWeShoot />
      <Testimonials items={getTestimonials()} section={getTestimonialsSection()} />
      <Faq items={getFaqs()} />
    </>
  );
}
