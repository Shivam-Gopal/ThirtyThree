"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);
          return 100;
        }

        return prev + 1;
      });
    }, 20);

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div
        className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-6 bg-white transition-all duration-700 ease-out ${
          isLoading
            ? "pointer-events-auto opacity-100 scale-100"
            : "pointer-events-none opacity-0 scale-[1.02]"
        }`}
      >
        <div className="flex flex-col items-center gap-[2px]">
          <div className="font-sans text-[clamp(64px,10vw,120px)] font-extrabold leading-[0.9] tracking-[-0.02em] text-[#0a0a0a]">
            THIRTY
          </div>
          <div className="pl-[0.55em] font-sans text-[clamp(16px,2.4vw,28px)] font-bold tracking-[0.55em] text-[#888880]">
            THREE™
          </div>
        </div>

        <div
          className="h-px w-[180px] overflow-hidden bg-[#d8d6ce]"
          aria-hidden="true"
        >
          <div
            className="h-full bg-[#0a0a0a] transition-[width] duration-100 linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="font-mono text-[11px] tracking-[0.15em] text-[#888880]">
          {String(progress).padStart(3, "0")}%
        </div>
      </div>
    </div>
  );
}
