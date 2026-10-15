import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/app/lib/cn";

const base =
  "group inline-flex items-center gap-[9px] font-sans text-[14px] font-bold px-6 py-[13px] rounded-full no-underline cursor-pointer border-[1.5px] border-transparent whitespace-nowrap " +
  "[transform-style:preserve-3d] origin-[50%_120%] transition-[transform,box-shadow,background,color,border-color] duration-200 ease-snap " +
  "hover:[transform:perspective(500px)_rotateX(-8deg)_translateY(-3px)] active:[transform:perspective(500px)_rotateX(2deg)_translateY(1px)_scale(0.98)]";

const variants = {
  dark: "bg-ink text-on-ink shadow-[0_8px_20px_rgba(18,16,9,0.18)] hover:shadow-[0_16px_30px_rgba(18,16,9,0.28)]",
  light: "bg-on-ink text-ink hover:bg-beige",
  outline: "bg-transparent text-ink border-ink hover:bg-ink hover:text-on-ink",
  "outline-light": "bg-transparent text-on-ink border-on-ink-30 hover:border-on-ink",
} as const;

type Props = {
  variant?: keyof typeof variants;
  href?: string;
  arrow?: boolean | string;
  arrowClassName?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Arrow({ children = "→", className }: { children?: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-block transition-transform duration-[250ms] group-hover:-translate-y-[2px] group-hover:translate-x-[3px]", className)}>
      {children}
    </span>
  );
}

/** Link-or-button with the site's 3D tilt hover. Pass `href` to render a <Link>. */
export function Button({ variant = "dark", href, arrow, arrowClassName, className, children, ...rest }: Props) {
  const cls = cn(base, variants[variant], className);
  const arrowEl = arrow ? <Arrow className={arrowClassName}>{typeof arrow === "string" ? arrow : "→"}</Arrow> : null;
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <Link href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {arrowEl}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
      {arrowEl}
    </button>
  );
}
