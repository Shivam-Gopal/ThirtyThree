/**
 * Data-access layer. Every page / component asks for content through these
 * getters instead of importing arrays (or media paths) directly.
 * Swap the bodies for a CMS / API call later and no component has to change.
 */
import * as data from "@/data/content";
import type { SampleWork } from "@/data/content";

export const getSite = () => data.site;
export const getNavLinks = () => data.navLinks;
export const getHero = () => data.hero;
export const getStats = () => data.stats;
export const getAboutTeaser = () => data.aboutTeaser;
export const getWhyUs = () => data.whyUs;
export const getClientLogos = () => data.clientLogos;
export const getClientHandles = () => data.clientHandles;
export const getCapabilities = () => data.capabilities;
export const getProcess = () => data.process;
export const getFaqs = () => data.faqs;
export const getPovReels = () => data.povReels;
export const getPovSection = () => data.povSection;
export const getAdReels = () => data.adReels;
export const getAdsSection = () => data.adsSection;
export const getWorkSection = () => data.workSection;
export const getTestimonials = () => data.testimonials;
export const getTestimonialsSection = () => data.testimonialsSection;
export const getAboutPage = () => data.aboutPage;
export const getContactPage = () => data.contactPage;

export const getSampleWork = (): SampleWork[] => data.sampleWork;
export const getSampleWorkBySlug = (slug: string) => data.sampleWork.find((w) => w.slug === slug);
export const getSampleWorkSlugs = () => data.sampleWork.map((w) => w.slug);

/** Unique categories across all sample-work entries (drives the filter chips). */
export const getWorkCategories = (): string[] => [...new Set(data.sampleWork.flatMap((w) => w.categories))];
