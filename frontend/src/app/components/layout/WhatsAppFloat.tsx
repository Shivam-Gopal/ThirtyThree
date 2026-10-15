import { WhatsAppIcon } from "@/app/components/ui/Icons";
import { getSite } from "@/app/lib/content";

/** Big floating WhatsApp button, fixed bottom-right on every page. */
export function WhatsAppFloat() {
  const { whatsapp } = getSite();
  return (
    <a
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-[22px] right-[22px] z-[9999] flex size-[68px] items-center justify-center rounded-full bg-wa text-white shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-transform duration-200 before:absolute before:inset-0 before:-z-10 before:animate-wa-pulse before:rounded-full before:bg-wa before:content-[''] hover:scale-[1.08] motion-reduce:before:animate-none max-sm:bottom-4 max-sm:right-4 max-sm:size-[60px]"
    >
      <WhatsAppIcon className="size-[38px] max-sm:size-[34px]" />
    </a>
  );
}
