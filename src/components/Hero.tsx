"use client";
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/LangContext";
import { ChevronDown } from "lucide-react";

const AWARDS = [
  { year: "2011", img: "/best/best-2011.png" },
  { year: "2013", img: "/best/best-2013.png" },
  { year: "2015", img: "/best/best-2015.png" },
  { year: "2017", img: "/best/best-2017.png" },
  { year: "2019", img: "/best/best-2019.png" },
  { year: "2020", img: "/best/best-2020.png" },
  { year: "2024", img: "/best/best-2024.png" },
  { year: "2025", img: "/best/best-2025.png" },
];

export default function Hero() {
  const { T } = useLang();
  const headRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const olRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { default: gsap } = await import("gsap");
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(olRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
          .fromTo(
            headRef.current?.querySelectorAll(".anim-line") ?? [],
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.12 },
            "-=0.4"
          )
          .fromTo(ctaRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3");
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient edges so the hero fades cleanly into sections below */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030A14]/70 via-transparent to-[#030A14]" />
      {/* Blue radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(26,174,222,0.18)_0%,transparent_70%)]" />
      </div>

      {/* Content — centered */}
      <div className="relative z-10 w-full px-[6vw] pt-28 pb-16 flex flex-col items-center text-center max-w-5xl mx-auto">

        {/* Logo */}
        <div ref={olRef} className="mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-sin-titulo-final.png"
            alt="Nexus Auto Detail"
            className="w-[clamp(200px,28vw,320px)] h-auto object-contain"
            style={{ mixBlendMode: "screen" }}
          />
        </div>

        {/* Overline */}
        <div className="OL-hero mb-6">
          {T({ en: "Lawrenceville, GA · Est. 2010", es: "Lawrenceville, GA · Desde 2010" })}
        </div>

        {/* Headline */}
        <div ref={headRef}>
          <div className="D anim-line text-[clamp(5rem,14vw,13rem)] text-glow leading-[.85] g-blue">
            NEXUS
          </div>
          <div className="D anim-line text-[clamp(3.5rem,9vw,9rem)] text-[var(--white)] leading-[.9]">
            AUTO DETAIL
          </div>
          <div className="D anim-line text-[clamp(2.5rem,6vw,5.5rem)] g-fire mt-2">
            {T({ en: "WE COME TO YOU", es: "VAMOS A TI" })}
          </div>
        </div>

        <p className="mt-6 text-[var(--gray)] text-[1.25rem] leading-relaxed max-w-[600px]">
          {T({
            en: "Premium mobile auto detailing by Chido & Adela. Serving all of Georgia up to 40 miles from Lawrenceville — no need to leave your driveway.",
            es: "Detallado automotriz premium por Chido y Adela. Servimos toda Georgia hasta 40 millas desde Lawrenceville — sin que salgas de tu casa.",
          })}
        </p>

        <div ref={ctaRef} className="mt-4" />

        {/* Best of Gwinnett ribbons */}
        <div className="mt-12 w-full">
          <div className="OL mb-5">{T({ en: "Best of Gwinnett", es: "Mejor de Gwinnett" })}</div>
          <div className="flex flex-nowrap justify-center gap-3 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}>
            {AWARDS.map(({ year, img }, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={year}
                src={img}
                alt={`Best of Gwinnett ${year}`}
                className="ribbon-badge flex-shrink-0"
                style={{
                  width: "clamp(72px, 8.5vw, 120px)",
                  height: "auto",
                  objectFit: "contain",
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--gray)] text-[.65rem] tracking-[.3em] uppercase animate-bounce">
        <span>{T({ en: "Scroll", es: "Bajar" })}</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
