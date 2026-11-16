"use client";
import { useEffect, useRef } from "react";
import { useInView } from "@/app/hooks/useInView";
import { cn } from "@/app/lib/cn";

type Props = {
  src: string;
  poster: string;
  /** play with sound (parent decides). If the browser blocks it, onSoundBlocked fires. */
  soundOn?: boolean;
  onSoundBlocked?: () => void;
  className?: string;
};

/**
 * Muted inline loop that starts independently of the sound toggle.
 */
export function LazyVideo({ src, poster, soundOn = false, onSoundBlocked, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useInView(ref, { threshold: 0.01 });

  // Autoplay is always enabled below. Retry playback when a card becomes
  // visible in case the browser deferred an offscreen video.
  useEffect(() => {
    const v = ref.current;
    if (!v || !visible) return;
    const play = () => {
      if (!v.paused) return;
      void v.play().catch(() => {});
    };
    v.addEventListener("loadeddata", play);
    v.addEventListener("canplay", play);
    play();
    return () => {
      v.removeEventListener("loadeddata", play);
      v.removeEventListener("canplay", play);
    };
  }, [src, visible]);

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
      src={src}
      poster={poster}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
    />
  );
}
