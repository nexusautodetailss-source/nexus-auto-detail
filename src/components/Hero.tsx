"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
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
  const imgRef = useRef<HTMLDivElement>(null);
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
          .fromTo(ctaRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
          .fromTo(imgRef.current, { x: 80, opacity: 0, rotate: 2 }, { x: 0, opacity: 1, rotate: 0, duration: 1.2 }, "-=1");
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  const bookMsg = encodeURIComponent("Hi! I'd like to book an appointment with Nexus Auto Detail.");
  const waUrl = `https://wa.me/16788826689?text=${bookMsg}`;

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Video BG */}
      <video
        src="/videos/v1-web.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030A14] via-transparent to-[#030A14]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030A14] via-transparent to-transparent opacity-70" />
      {/* Blue radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(26,174,222,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-[6vw] pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div>
          {/* Logo — only the image, no text */}
          <div ref={olRef} className="mb-6">
            <Image
              src="/logo-sin-titulo-sm.png"
              alt="Nexus Auto Detail"
              width={260}
              height={145}
              className="w-[clamp(180px,22vw,280px)] h-auto object-contain"
              priority
            />
          </div>

          {/* Overline */}
          <div className="OL-hero mb-5">
            {T({ en: "Lawrenceville, GA · Est. 2010", es: "Lawrenceville, GA · Desde 2010" })}
          </div>

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

          <p className="mt-6 text-[var(--gray)] text-[1rem] leading-relaxed max-w-[480px]">
            {T({
              en: "Premium mobile auto detailing by Chido & Adela. Serving all of Georgia up to 40 miles from Lawrenceville — no need to leave your driveway.",
              es: "Detallado automotriz premium por Chido y Adela. Servimos toda Georgia hasta 40 millas desde Lawrenceville — sin que salgas de tu casa.",
            })}
          </p>

          <div ref={ctaRef} className="mt-8" />

          {/* Best of Gwinnett ribbons */}
          <div className="mt-10">
            <div className="OL mb-4">{T({ en: "Best of Gwinnett", es: "Mejor de Gwinnett" })}</div>
            <div className="flex flex-wrap gap-1">
              {AWARDS.map(({ year, img }) => (
                <div key={year} className="relative w-[72px] h-[72px] flex-shrink-0">
                  <Image
                    src={img}
                    alt={`Best of Gwinnett ${year}`}
                    fill
                    className="object-contain"
                    style={{  }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Team photo */}
        <div ref={imgRef} className="relative hidden lg:flex justify-center items-center">
          <div className="relative w-[75%] aspect-[3/4] overflow-hidden">
            <Image
              src="/fotos/logo-sin-fondo.png"
              alt="Chido & Adela — Nexus Auto Detail"
              fill
              className="object-contain"
              style={{ objectPosition: "center center" }}
              priority
            />
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
