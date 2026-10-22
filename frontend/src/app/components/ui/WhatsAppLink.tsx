"use client";
import type { ComponentProps, MouseEvent } from "react";

/**
 * Link to a WhatsApp chat that opens reliably on phones.
 *
 * Desktop: opens in a new tab (WhatsApp Web / desktop app), like before.
 * Touch devices: navigates in the SAME tab. A new tab started from target="_blank" is what Android
 * Chrome, Samsung Internet and in-app browsers (Instagram, Facebook) often fail to hand over to the
 * WhatsApp app; a same-tab navigation from the tap is passed to the app directly. Without JavaScript the
 * plain href + target="_blank" still works.
 */
export function WhatsAppLink({ href, onClick, ...rest }: ComponentProps<"a"> & { href: string }) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (!touch) return;
    e.preventDefault();
    window.location.href = href;
  };
  return <a href={href} target="_blank" rel="noopener noreferrer" onClick={handle} {...rest} />;
}
