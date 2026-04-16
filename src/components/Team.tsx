"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";

const STATS = [
  { num: "14+", label: { en: "Years", es: "Años" } },
  { num: "2", label: { en: "Vans", es: "Vans" } },
  { num: "40mi", label: { en: "Radius", es: "Radio" } },
  { num: "9×", label: { en: "Best of Gwinnett", es: "Mejor Gwinnett" } },
];

export default function Team() {
  const { T } = useLang();
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(leftRef.current, { x: -80, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 80%" },
        });
        gsap.fromTo(rightRef.current, { x: 80, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 80%" },
        });
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Full bleed background */}
      <div className="absolute inset-0">
        <Image
          src="/fotos/DJI_20260414230347_0050_D.jpg"
          alt="Chido & Adela with vans"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030A14] via-[#030A14]/85 to-[#030A14]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030A14]/30 via-transparent to-[#030A14]" />
      </div>

      <div className="relative z-10 S grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div ref={leftRef}>
          <div className="OL mb-4">{T({ en: "The Team Behind the Shine", es: "El Equipo Detrás del Brillo" })}</div>
          <div className="D text-[clamp(3.5rem,8vw,7rem)] text-[var(--white)] leading-[.88]">CHIDO</div>
          <div className="D text-[clamp(3.5rem,8vw,7rem)] text-[var(--white)] leading-[.88]">&amp; ADELA</div>

          <p className="mt-6 text-[var(--gray)] leading-relaxed max-w-[480px]">
            {T({
              en: "Since 2010, Chido and Adela have built Nexus Auto Detail from the ground up in Lawrenceville, GA. With two fully-equipped mobile vans and a passion for perfection, they bring professional-grade detailing straight to your driveway.",
              es: "Desde 2010, Chido y Adela construyeron Nexus Auto Detail desde cero en Lawrenceville, GA. Con dos vans completamente equipadas y pasión por la perfección, llevan el detallado profesional directamente a tu casa.",
            })}
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.num} className="gc p-4 text-center">
                <div className="D text-[2.2rem] g-blue">{s.num}</div>
                <div className="text-[.68rem] text-[var(--gray)] tracking-[.2em] uppercase mt-1">{T(s.label)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — second van photo */}
        <div ref={rightRef} className="relative hidden lg:flex justify-end">
          <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-2xl overflow-hidden border border-[rgba(26,174,222,.25)] glow-blue -rotate-1">
            <Image
              src="/fotos/DJI_20260414230339_0049_D.jpg"
              alt="Nexus vans"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030A14]/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
