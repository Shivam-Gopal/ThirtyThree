import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/app/lib/cn";

/** Centered page container with the site's fluid side gutters. */
export function Wrap({ className, wide, ...rest }: ComponentProps<"div"> & { wide?: boolean }) {
  return (
    <div
      className={cn("mx-auto px-[clamp(20px,5vw,56px)]", wide ? "max-w-[1920px] px-[clamp(20px,4vw,56px)]" : "max-w-wrap", className)}
      {...rest}
    />
  );
}

type Tone = "paper" | "beige" | "ink";
const tones: Record<Tone, string> = {
  paper: "",
  beige: "bg-beige-soft",
  ink: "bg-ink text-on-ink",
};

/** Page section shell: vertical rhythm + background tone. */
export function Section({ tone = "paper", className, ...rest }: ComponentProps<"section"> & { tone?: Tone }) {
  return <section data-dark={tone === "ink" ? "" : undefined} className={cn("py-[104px] max-sm:py-[72px] scroll-mt-16", tones[tone], className)} {...rest} />;
}

/** Small mono label with a leading rule. tone="ink" for dark sections. */
export function Eyebrow({ tone = "paper", className, children }: { tone?: "paper" | "ink" | "hero"; className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-[10px] font-mono text-[12.5px] font-semibold uppercase tracking-[0.14em] before:h-px before:w-4 before:content-['']",
        tone === "paper" && "text-ink-50 before:bg-beige-dk",
        tone === "ink" && "text-on-ink-60 before:bg-on-ink-30",
        tone === "hero" && "text-on-ink-60 before:bg-beige-dk",
        className,
      )}
    >
      {children}
    </div>
  );
}

export const titleClass = "mt-4 max-w-[820px] text-[clamp(32px,4.4vw,54px)] leading-[1.02]";

export function Lede({ tone = "paper", className, ...rest }: ComponentProps<"p"> & { tone?: "paper" | "ink" }) {
  return (
    <p
      className={cn("mt-5 max-w-[520px] text-[16.5px] leading-[1.65]", tone === "ink" ? "text-on-ink-60" : "text-ink-70", className)}
      {...rest}
    />
  );
}
