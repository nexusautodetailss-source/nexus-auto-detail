"use client";
import { usePathname } from "next/navigation";

export default function GlobalVideoBackground() {
  const pathname = usePathname();
  if (pathname.startsWith("/pressure-washing")) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -10, overflow: "hidden" }}>
      <video
        src="/videos/v1-web.mp4"
        autoPlay muted loop playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(3,10,20,0.42)" }} />
    </div>
  );
}
