"use client";
import { useEffect, useRef } from "react";
import { LazyVideo } from "@/app/components/ui/LazyVideo";
import { SpeakerIcon } from "@/app/components/ui/Icons";
import { useReelSound } from "@/app/components/ui/ReelGroup";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { cn } from "@/app/lib/cn";
import type { Reel } from "@/data/content";

/** Shared sound behaviour: hover unmutes on desktop, tap toggles on touch; only one reel is loud at a time. */
function useReelSoundControl(id: string) {
  const { activeId, setActive, unlocked } = useReelSound();
  const canHover = useMediaQuery("(hover: hover)");
  const hovered = useRef(false);
  const soundOn = activeId === id;

  // after the visitor's first gesture, retry unmuting a reel they're hovering
  useEffect(() => {
    if (unlocked && hovered.current && canHover) setActive(id);
  }, [unlocked, canHover, id, setActive]);

  return {
    soundOn,
    blocked: () => setActive(null),
    leaveView: () => soundOn && setActive(null),
    onMouseEnter: () => { if (!canHover) return; hovered.current = true; setActive(id); },
    onMouseLeave: () => { hovered.current = false; if (canHover && soundOn) setActive(null); },
    toggle: () => setActive(soundOn ? null : id),
  };
}

/** "Our POV" reel: portrait frame with speaker button + caption. */
export function PovReelCard({ reel }: { reel: Reel }) {
  const c = useReelSoundControl(reel.id);
  const lines = (reel.title ?? "").split("\n");
  return (
    <div className="min-w-0 max-[700px]:flex-[0_0_68%] max-[700px]:snap-start">
      <div
        onMouseEnter={c.onMouseEnter}
        onMouseLeave={c.onMouseLeave}
        onClick={c.toggle}
        className="relative aspect-[9/16] cursor-pointer overflow-hidden rounded-2xl border border-on-ink-30 bg-ink-2 transition-[transform,box-shadow] duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,.35)_0%,rgba(0,0,0,0)_28%,rgba(0,0,0,0)_65%,rgba(0,0,0,.55)_100%)] after:content-[''] hover:-translate-y-[6px] hover:shadow-[0_24px_50px_rgba(0,0,0,.45)]"
      >
        <LazyVideo src={reel.src} poster={reel.poster} soundOn={c.soundOn} onSoundBlocked={c.blocked} onLeaveView={c.leaveView} />
        <button
          type="button"
          aria-label="Toggle sound"
          onClick={(e) => { e.stopPropagation(); c.toggle(); }}
          className="absolute bottom-[10px] right-[10px] z-[2] grid size-[34px] cursor-pointer place-items-center rounded-full border-0 bg-[rgba(21,19,13,.6)] p-0 backdrop-blur-[4px]"
        >
          <SpeakerIcon on={c.soundOn} className="size-4" />
        </button>
      </div>
      <div className="mt-4 font-mono text-[12.5px] uppercase leading-[1.55] tracking-[0.08em] text-on-ink max-sm:text-[11px]">
        {reel.label && <small className="mb-[2px] block text-[11px] tracking-[0.1em] text-beige-dk">{reel.label}</small>}
        {lines.map((l, i) => (
          <span key={i}>{i > 0 && <br />}{l}</span>
        ))}
      </div>
    </div>
  );
}

/** "Ads we shoot" reel: portrait frame that grows on hover, mute badge fades away. */
export function AdReelCard({ reel }: { reel: Reel }) {
  const c = useReelSoundControl(reel.id);
  return (
    <div className="group relative z-[1] w-[210px] flex-none snap-start hover:z-[5] max-[980px]:w-[200px] max-sm:w-[62vw]">
      <div
        onMouseEnter={c.onMouseEnter}
        onMouseLeave={c.onMouseLeave}
        onClick={c.toggle}
        className={cn(
          "relative aspect-[9/16] cursor-pointer overflow-hidden rounded-2xl border border-on-ink-30 bg-ink-2 transition-[transform,box-shadow] duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)]",
          "after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,0)_70%,rgba(0,0,0,.35)_100%)] after:content-['']",
          "hover:scale-[1.08] hover:shadow-[0_24px_50px_rgba(0,0,0,.45)]",
        )}
      >
        <LazyVideo src={reel.src} poster={reel.poster} soundOn={c.soundOn} onSoundBlocked={c.blocked} onLeaveView={c.leaveView} />
        <span aria-hidden="true" className={cn("absolute bottom-[10px] right-[10px] z-[2] flex size-[26px] items-center justify-center rounded-full bg-[rgba(21,19,13,.55)] backdrop-blur-[4px] transition-opacity duration-[250ms] group-hover:opacity-0", c.soundOn ? "opacity-0" : "opacity-[0.85]")}>
          <SpeakerIcon on={c.soundOn} className="size-[13px]" />
        </span>
      </div>
    </div>
  );
}
