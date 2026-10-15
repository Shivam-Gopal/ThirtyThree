"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/app/hooks/useInView";
import { cn } from "@/app/lib/cn";

type Props = {
  src: string;
  poster: string;
  /** play with sound (parent decides). If the browser blocks it, onSoundBlocked fires. */
  soundOn?: boolean;
  onSoundBlocked?: () => void;
  onLeaveView?: () => void;
  className?: string;
};

/**
 * Performance-first looping video:
 *  • nothing is downloaded until the card is within ~300px of the viewport (poster shows meanwhile)
 *  • plays only while ≥25% visible, pauses the moment it scrolls away
 *  • stays on the poster for visitors with Data-Saver / reduced-motion enabled
 */
export function LazyVideo({ src, poster, soundOn = false, onSoundBlocked, onLeaveView, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const near = useInView(ref, { rootMargin: "300px 0px", once: true });
  const visible = useInView(ref, { threshold: 0.25 });
  const [canAutoplay, setCanAutoplay] = useState(true);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (conn?.saveData || reduced) setCanAutoplay(false);
  }, []);

  // play / pause with visibility
  useEffect(() => {
    const v = ref.current;
    if (!v || !near || !canAutoplay) return;
    if (visible) v.play().catch(() => {});
    else {
      v.pause();
      onLeaveView?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, near, canAutoplay]);

  // sound on / off
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = !soundOn;
    if (soundOn) {
      v.play().catch(() => {
        v.muted = true;
        onSoundBlocked?.();
        v.play().catch(() => {});
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundOn]);

  return (
    <video
      ref={ref}
      className={cn("absolute inset-0 block h-full w-full object-cover", className)}
      src={near ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload={near ? "metadata" : "none"}
    />
  );
}
