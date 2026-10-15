"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Ctx = { activeId: string | null; setActive: (id: string | null) => void; unlocked: number };
const SoundCtx = createContext<Ctx>({ activeId: null, setActive: () => {}, unlocked: 0 });

/**
 * Shares "which reel has sound" across a group so only one is ever unmuted.
 * Browsers only allow sound after a user gesture, so the first pointer/key event
 * bumps `unlocked`, letting a hovered reel retry unmuting.
 */
export function ReelGroup({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(0);
  const setActive = useCallback((id: string | null) => setActiveId(id), []);

  useEffect(() => {
    const unlock = () => {
      setUnlocked((n) => n + 1);
      ["pointerdown", "keydown"].forEach((t) => window.removeEventListener(t, unlock, true));
    };
    ["pointerdown", "keydown"].forEach((t) => window.addEventListener(t, unlock, true));
    return () => ["pointerdown", "keydown"].forEach((t) => window.removeEventListener(t, unlock, true));
  }, []);

  const value = useMemo(() => ({ activeId, setActive, unlocked }), [activeId, setActive, unlocked]);
  return <SoundCtx.Provider value={value}>{children}</SoundCtx.Provider>;
}

export const useReelSound = () => useContext(SoundCtx);
