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
  onLeaveView?: () => void;
  className?: string;
};

/**
 * Looping video that requests media data and starts muted inline playback while visible.
 */
export function LazyVideo({ src, poster, soundOn = false, onSoundBlocked, onLeaveView, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  // Start playback as soon as any part of the card is visible; mobile screens
  // often show only a small portion of tall portrait videos while swiping.
  const visible = useInView(ref, { threshold: 0.01 });

  // play / pause with visibility
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (visible) {
      // Playback can be requested before mobile has buffered enough data.
      // Retry as soon as the browser reports that the video is ready.
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
    }
    else {
      v.pause();
      onLeaveView?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

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
      autoPlay={visible}
      loop
      playsInline
      preload={visible ? "auto" : "none"}
    />
  );
}
