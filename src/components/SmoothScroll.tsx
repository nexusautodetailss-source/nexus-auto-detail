"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (isTouch) return;

    let lenis: import("lenis").default | null = null;
    let raf: number;

    async function init() {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      const tick = (time: number) => {
        lenis!.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    init();
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
