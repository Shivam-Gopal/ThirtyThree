"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/app/lib/cn";

type NavLink = { label: string; href: string };

/**
 * Home: transparent over the dark hero, turns light after 12px of scroll.
 * Other pages: light, switching to the dark look while it floats over a dark section.
 */
export function Navbar({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [light, setLight] = useState(!isHome);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    if (isHome) {
      const onScroll = () => setLight(window.scrollY > 12);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    // inner pages: sample what's right under the bar to pick light/dark
    let raf = 0;
    const update = () => {
      raf = 0;
      const bar = document.getElementById("navbar");
      if (!bar) return;
      const y = Math.min(window.innerHeight - 1, bar.offsetHeight + 2);
      const prev = bar.style.pointerEvents;
      bar.style.pointerEvents = "none";
      const under = document.elementFromPoint(window.innerWidth / 2, y);
      bar.style.pointerEvents = prev;
      const section = under?.closest("section, footer");
      const dark = !!section && (section.hasAttribute("data-dark") || section.tagName === "FOOTER");
      setLight(!dark);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [isHome, pathname]);

  const isActive = (href: string) => !href.includes("#") && href === pathname;

  return (
    <>
      <header
        id="navbar"
        className={cn(
          "fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b px-[clamp(20px,5vw,56px)] py-4 transition-all duration-300 ease-out",
          light
            ? "border-line bg-[rgba(250,246,236,0.94)] shadow-[0_8px_24px_rgba(18,16,9,0.05)] backdrop-blur-[14px] backdrop-saturate-[1.4]"
            : "border-transparent bg-transparent",
        )}
      >
        <Link
          href="/"
          className={cn(
            "-my-2 flex select-none items-end gap-[6px] py-2 no-underline [transform-style:preserve-3d] transition-[transform,color] duration-300 ease-snap hover:[transform:perspective(300px)_rotateX(10deg)_rotateY(-6deg)]",
            light ? "text-ink" : "text-on-ink",
          )}
        >
          <span className="inline-block font-display text-[25px] font-extrabold leading-[0.8]">THIRTYTHREE</span>
        </Link>

        <ul className="m-0 flex list-none items-center gap-[34px] p-0 max-[860px]:hidden">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "relative py-1 text-[14.5px] font-semibold no-underline transition-colors duration-300",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-beige-dk after:transition-[width] after:duration-[250ms] after:content-[''] hover:after:w-full",
                  light ? "text-ink-70 hover:text-ink" : "text-on-ink-60 hover:text-on-ink",
                  isActive(l.href) && (light ? "!text-ink" : "!text-on-ink"),
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Button
            href="/contact"
            arrow
            className={cn(
              "max-sm:hidden",
              !light && "bg-beige text-ink shadow-[0_8px_24px_rgba(231,218,184,0.22)] hover:bg-beige-soft hover:shadow-[0_16px_34px_rgba(231,218,184,0.32)]",
            )}
          >
            Let&apos;s talk
          </Button>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="hidden cursor-pointer flex-col gap-[5px] border-0 bg-transparent p-[6px] max-[860px]:flex"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className={cn("h-[2px] w-[22px] rounded-[2px] transition-colors duration-300", light ? "bg-ink" : "bg-on-ink")} />
            ))}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-[66px] z-[99] flex flex-col gap-4 border-b border-line bg-paper px-6 pb-[26px] pt-[18px] shadow-[0_14px_30px_rgba(18,16,9,0.08)]">
          {links.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-[15px] font-semibold text-ink no-underline">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
