"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function GlobalVideoBackground() {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
      // retry on first user interaction
      const resume = () => {
        video.play().catch(() => {});
        document.removeEventListener("touchstart", resume);
        document.removeEventListener("click", resume);
      };
      document.addEventListener("touchstart", resume, { once: true });
      document.addEventListener("click", resume, { once: true });
    });
  }, []);

  if (pathname.startsWith("/pressure-washing")) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -10, overflow: "hidden" }}>
      <video
        ref={videoRef}
        src="/videos/v1-web.mp4"
        autoPlay muted loop playsInline
        preload="auto"
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(3,10,20,0.42)" }} />
    </div>
  );
}
