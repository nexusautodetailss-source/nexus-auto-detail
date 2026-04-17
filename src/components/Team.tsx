"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { Shield, Star, Zap } from "lucide-react";

const STATS = [
  { num: 14,  suffix: "+", label: { en: "Years of Excellence", es: "Años de Excelencia" } },
  { num: 2,   suffix: "",  label: { en: "Fully Equipped Vans", es: "Vans Equipadas" } },
  { num: 40,  suffix: "mi",label: { en: "Service Radius", es: "Radio de Servicio" } },
  { num: 9,   suffix: "×", label: { en: "Best of Gwinnett", es: "Mejor de Gwinnett" } },
];

const PILLARS = [
  {
    icon: Shield,
    color: "var(--blue)",
    glow: "rgba(26,174,222,0.3)",
    title: { en: "Uncompromising Standards", es: "Estándares sin Compromiso" },
    desc:  { en: "Every vehicle gets the same meticulous attention — no shortcuts, no exceptions, ever.", es: "Cada vehículo recibe la misma atención meticulosa — sin atajos, sin excepciones." },
  },
  {
    icon: Star,
    color: "#FFD700",
    glow: "rgba(255,215,0,0.3)",
    title: { en: "Award-Winning Quality", es: "Calidad Premiada" },
    desc:  { en: "Nine-time Best of Gwinnett winners. Their work speaks louder than any certificate.", es: "Ganadores 9 veces del Best of Gwinnett. Su trabajo habla más que cualquier premio." },
  },
  {
    icon: Zap,
    color: "var(--hot)",
    glow: "rgba(238,26,0,0.3)",
    title: { en: "We Come to You", es: "Vamos a Ti" },
    desc:  { en: "Fully mobile, fully equipped. Professional detailing at your driveway — zero hassle.", es: "Totalmente móvil y equipados. Detallado profesional en tu casa — sin complicaciones." },
  },
];

function StatCounter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(target / 40);
        const id = setInterval(() => {
          start += step;
          if (start >= target) { setVal(target); clearInterval(id); }
          else setVal(start);
        }, 30);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <div ref={ref} className="D text-[3rem] g-blue">{val}{suffix}</div>;
}

export default function Team() {
  const { T } = useLang();
  const headerRef  = useRef<HTMLDivElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {

        // Header fades in
        gsap.fromTo(headerRef.current,
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%" } }
        );

        // Photo rises with glow
        gsap.fromTo(photoRef.current,
          { y: 60, opacity: 0, scale: 0.88 },
          { y: 0, opacity: 1, scale: 1, duration: 1.3, ease: "power3.out",
            scrollTrigger: { trigger: photoRef.current, start: "top 85%" } }
        );

        // Pillar cards cascade
        const cards = pillarsRef.current?.querySelectorAll(".pillar-card") ?? [];
        gsap.fromTo(cards,
          { y: 80, opacity: 0, scale: 0.85, rotateX: 25 },
          { y: 0, opacity: 1, scale: 1, rotateX: 0,
            duration: 0.8, stagger: 0.18, ease: "back.out(1.6)",
            scrollTrigger: { trigger: pillarsRef.current, start: "top 80%" } }
        );

        // Stats pop in
        const statEls = document.querySelectorAll(".stat-card");
        gsap.fromTo(statEls,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(2)",
            scrollTrigger: { trigger: statEls[0], start: "top 90%" } }
        );
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Gradient overlays over the fixed video */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030A14]/60 via-transparent to-[#030A14]" />
      </div>

      <div className="relative z-10 px-[6vw] py-28 flex flex-col items-center text-center">

        {/* HEADER */}
        <div ref={headerRef} className="mb-10">
          <div className="OL mb-5">{T({ en: "Dedication · Precision · Excellence", es: "Dedicación · Precisión · Excelencia" })}</div>
          <div className="D text-[clamp(4.5rem,11vw,10rem)] g-blue leading-[.82]">CHIDO</div>
          <div className="D text-[clamp(4.5rem,11vw,10rem)] text-[var(--white)] leading-[.82]">&amp; ADELA</div>
          <p className="mt-8 text-[1.3rem] text-[var(--gray)] leading-relaxed max-w-[640px] mx-auto">
            {T({
              en: "Chido & Adela bring an unmatched level of care, precision, and commitment to every vehicle they work on. For them, detailing isn't just a service — it's a craft refined year after year, always raising the bar, never settling for anything less than perfect.",
              es: "Chido y Adela aportan un nivel incomparable de cuidado, precisión y compromiso a cada vehículo. Para ellos el detallado no es solo un servicio — es un oficio perfeccionado año tras año, siempre elevando el estándar, nunca conformándose con menos que la perfección.",
            })}
          </p>
        </div>

        {/* PHOTO — centered, no background */}
        <div ref={photoRef} className="relative mb-16 flex items-center justify-center">
          {/* Glow rings behind photo */}
          <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(26,174,222,0.15) 0%, transparent 70%)" }} />
          <div className="absolute w-[380px] h-[380px] rounded-full border border-[rgba(26,174,222,0.12)] animate-ping pointer-events-none"
            style={{ animationDuration: "3.5s" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fotos/sin-fondo-mama-chido.png"
            alt="Chido & Adela"
            className="float relative z-10"
            style={{
              width: "clamp(280px, 38vw, 560px)",
              height: "auto",
              filter: "drop-shadow(0 20px 60px rgba(26,174,222,0.25))",
            }}
          />
        </div>

        {/* PILLARS */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12" style={{ perspective: "1000px" }}>
          {PILLARS.map(({ icon: Icon, color, glow, title, desc }) => (
            <div
              key={title.en}
              className="pillar-card gc p-8 flex flex-col items-center gap-5 relative overflow-hidden group cursor-default text-center"
              style={{ transition: "transform .3s ease, box-shadow .3s ease, border-color .3s ease" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-10px) scale(1.03)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${glow}`;
                (e.currentTarget as HTMLElement).style.borderColor = color;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.borderColor = "";
              }}
            >
              {/* Scan shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(180deg, transparent 0%, ${glow.replace("0.3","0.06")} 50%, transparent 100%)`,
                  backgroundSize: "100% 200%", animation: "shimmer 2s linear infinite" }} />

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
                style={{ background: `${glow.replace("0.3","0.12")}` }}>
                <Icon size={26} style={{ color }} className="group-hover:scale-125 transition-transform duration-300" />
              </div>

              <div className="D text-[1.5rem] text-[var(--white)]">{T(title)}</div>
              <p className="text-[1rem] text-[var(--gray)] leading-relaxed">{T(desc)}</p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
            </div>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
          {STATS.map((s) => (
            <div key={s.num} className="stat-card gc p-6 text-center relative overflow-hidden group hover:border-[rgba(26,174,222,.4)] transition-colors">
              <StatCounter target={s.num} suffix={s.suffix} />
              <div className="text-[.72rem] text-[var(--gray)] tracking-[.2em] uppercase mt-2">{T(s.label)}</div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(26,174,222,0.06) 0%, transparent 70%)" }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
