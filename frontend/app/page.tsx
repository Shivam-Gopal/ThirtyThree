"use client";

import { useEffect, useState } from "react";

export default function Home() {
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
    <main className="loading-page">
      <div className={`loader-screen ${isLoading ? "visible" : "hidden"}`}>
        <div className="loader-logo">
          <div className="loader-thirty">THIRTY</div>
          <div className="loader-three">THREE™</div>
        </div>

        <div className="loader-bar" aria-hidden="true">
          <div className="loader-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="loader-pct">{String(progress).padStart(3, "0")}%</div>
      </div>
    </main>
  );
}
