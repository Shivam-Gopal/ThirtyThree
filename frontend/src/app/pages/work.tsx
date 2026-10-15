import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/app/components/work/CaseStudy";
import { getSampleWorkBySlug, getSampleWorkSlugs } from "@/app/lib/content";

export const workSlugs = () => getSampleWorkSlugs();

export function workMetadata(slug: string): Metadata {
  const work = getSampleWorkBySlug(slug);
  return work ? { title: `${work.brand} — Case study`, description: work.caseStudy.summary } : {};
}

/** Case-study page for one sample-work entry (/work/<slug>). */
export default function WorkPage({ slug }: { slug: string }) {
  const work = getSampleWorkBySlug(slug);
  if (!work) notFound();
  return <CaseStudy work={work} />;
}
