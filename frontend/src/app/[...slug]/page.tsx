import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage, { metadata as aboutMetadata } from "@/app/pages/about";
import ContactPage, { metadata as contactMetadata } from "@/app/pages/contact";
import WorkPage, { workMetadata, workSlugs } from "@/app/pages/work";

/**
 * The only route file for everything except the home page.
 * Pages live in src/app/pages/: /about -> about.tsx, /contact -> contact.tsx, /work/<slug> -> work.tsx.
 */
type Params = { slug: string[] };

export const dynamicParams = false;
export const generateStaticParams = (): Params[] => [
  { slug: ["about"] },
  { slug: ["contact"] },
  ...workSlugs().map((s) => ({ slug: ["work", s] })),
];

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const [a, b] = (await params).slug;
  if (a === "about") return aboutMetadata;
  if (a === "contact") return contactMetadata;
  if (a === "work" && b) return workMetadata(b);
  return {};
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const slug = (await params).slug;
  const [a, b] = slug;
  if (slug.length === 1 && a === "about") return <AboutPage />;
  if (slug.length === 1 && a === "contact") return <ContactPage />;
  if (slug.length === 2 && a === "work" && b) return <WorkPage slug={b} />;
  notFound();
}
