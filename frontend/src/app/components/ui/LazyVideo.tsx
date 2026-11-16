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
 * Performance-first looping video:
 *  • nothing is downloaded until the card is within ~300px of the viewport (poster shows meanwhile)
 *  • plays while visible, pauses the moment it scrolls away
 *  • starts muted inline playback only while visible
 */
export function LazyVideo({ src, poster, soundOn = false, onSoundBlocked, onLeaveView, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const near = useInView(ref, { rootMargin: "300px 0px", once: true });
  // Mobile viewports can expose less than a quarter of a tall portrait card.
  // A low threshold still avoids playing cards that are fully off screen.
  const visible = useInView(ref, { threshold: 0.01 });

  // play / pause with visibility
  useEffect(() => {
    const v = ref.current;
    if (!v || !near) return;
    if (visible) {
      // Source assignment and autoplay can race on mobile, especially when
      // the browser is still fetching the video. Retry when data is ready.
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
  }, [visible, near]);

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
      defaultMuted
      autoPlay={near && visible}
      loop
      playsInline
      preload={near ? "metadata" : "none"}
    />
  );
}
