"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { Check, MessageCircle } from "lucide-react";

interface Service {
  id: string;
  name: { en: string; es: string };
  photo: string;
  video?: string;
  tag: { en: string; es: string };
  desc: { en: string; es: string };
  features: { en: string; es: string }[];
}

const SERVICES: Service[] = [
  {
    id: "exterior",
    name: { en: "Exterior Detail", es: "Detalle Exterior" },
    photo: "/fotos/_74A0599.jpg",
    video: "/videos/exterior/clip-web.mp4",
    tag: { en: "Most Popular", es: "Más Popular" },
    desc: { en: "Full exterior treatment — hand wash, clay bar, wheel detail, trim dressing & window cleaning. Your car will shine like new.", es: "Tratamiento exterior completo — lavado a mano, arcilla, rines, molduras y ventanas. Tu auto brillará como nuevo." },
    features: [{ en: "Hand wash", es: "Lavado a mano" }, { en: "Clay bar", es: "Arcilla" }, { en: "Wheel detail", es: "Rines" }, { en: "Window cleaning", es: "Ventanas" }],
  },
  {
    id: "interior",
    name: { en: "Interior Detail", es: "Detalle Interior" },
    photo: "/fotos/_74A0676.jpg",
    video: "/videos/interior/clip-web1.mp4",
    tag: { en: "Deep Clean", es: "Limpieza Profunda" },
    desc: { en: "Deep clean for every inch inside — vacuum, seat conditioning, dashboard, odor elimination & door panels.", es: "Limpieza profunda de cada rincón — aspirado, asientos, tablero, olores y paneles de puerta." },
    features: [{ en: "Deep vacuum", es: "Aspirado" }, { en: "Seat conditioning", es: "Asientos" }, { en: "Odor removal", es: "Olores" }, { en: "Dashboard", es: "Tablero" }],
  },
  {
    id: "full",
    name: { en: "Full Detail", es: "Detalle Completo" },
    photo: "/fotos/_74A0685.jpg",
    video: "/videos/full-detail/clip-web.mp4",
    tag: { en: "Best Value", es: "Mejor Valor" },
    desc: { en: "The ultimate head-to-toe transformation — interior + exterior + machine polish + engine bay.", es: "La transformación definitiva — interior + exterior + pulido a máquina + motor." },
    features: [{ en: "Interior + exterior", es: "Int. + ext." }, { en: "Machine polish", es: "Pulido" }, { en: "Engine bay", es: "Motor" }, { en: "Final inspection", es: "Inspección" }],
  },
  {
    id: "wax",
    name: { en: "Wash & Wax", es: "Lavado y Encerado" },
    photo: "/fotos/_74A0603-1.jpg",
    video: "/videos/wash-wax/clip-web.mp4",
    tag: { en: "Protection", es: "Protección" },
    desc: { en: "Premium wash + carnauba wax coat. UV protection and lasting shine that holds for weeks.", es: "Lavado premium + cera carnauba. Protección UV y brillo duradero que se mantiene por semanas." },
    features: [{ en: "Premium wash", es: "Lavado" }, { en: "Carnauba wax", es: "Cera carnauba" }, { en: "UV protection", es: "Protección UV" }, { en: "Tire shine", es: "Llantas" }],
  },
  {
    id: "headlight",
    name: { en: "Headlight Restoration", es: "Restauración de Faros" },
    photo: "/fotos/DJI_20260414232837_0055_D.jpg",
    video: "/videos/headlight/clip-web.mp4",
    tag: { en: "Visibility", es: "Visibilidad" },
    desc: { en: "Crystal-clear headlights restored in one visit. Oxidation removed, UV sealed, clarity back.", es: "Faros cristalinos restaurados en una visita. Oxidación eliminada, sellado UV, claridad recuperada." },
    features: [{ en: "Oxidation removal", es: "Oxidación" }, { en: "Multi-stage sand", es: "Lijado" }, { en: "UV sealant", es: "Sellador UV" }, { en: "Clarity restored", es: "Claridad" }],
  },
  {
    id: "ceramic",
    name: { en: "Ceramic Coating", es: "Recubrimiento Cerámico" },
    photo: "/fotos/_74A0590-1.jpg",
    video: "/videos/ceramic/clip-web.mp4",
    tag: { en: "Premium", es: "Premium" },
    desc: { en: "Military-grade 9H ceramic protection. Hydrophobic, UV resistant, scratch resistant. Lasts 2–5 years.", es: "Protección cerámica 9H grado militar. Hidrofóbica, resistente a UV y rayones. Dura 2–5 años." },
    features: [{ en: "9H hardness", es: "Dureza 9H" }, { en: "Hydrophobic", es: "Hidrofóbica" }, { en: "UV resistant", es: "Anti-UV" }, { en: "2–5 yr durability", es: "2–5 años" }],
  },
];

function ServiceCard({ svc, index }: { svc: Service; index: number }) {
  const { T } = useLang();
  const [active, setActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const bookMsg = encodeURIComponent(`Hi! I'm interested in the ${svc.name.en} service from Nexus Auto Detail.`);

  function handleTouchEnd(e: React.TouchEvent) {
    e.preventDefault();
    setActive(prev => !prev);
  }

  return (
    <div
      ref={cardRef}
      className="service-card relative cursor-pointer"
      style={{
        aspectRatio: "3/4",
        clipPath: "inset(0 round 16px)",
        transition: "transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .4s ease",
        animationDelay: `${index * 0.1}s`,
        willChange: "transform",
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background photo */}
      <Image
        src={svc.photo}
        alt={T(svc.name)}
        fill
        className="object-cover transition-transform duration-700"
        style={{ transform: active ? "scale(1.08)" : "scale(1)" }}
      />

      {/* Video — autoplay, above photo */}
      {svc.video && (
        <video
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 1 }}
        >
          <source src={svc.video} type="video/mp4" />
        </video>
      )}

      {/* Default gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#030A14] via-[#030A14]/30 to-transparent transition-opacity duration-400"
        style={{ zIndex: 2, opacity: active ? 0.5 : 1 }}
      />

      {/* Default state — title at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 px-2 pb-4 z-20 text-center transition-transform duration-400"
        style={{ transform: active ? "translateY(-6px)" : "" }}
      >
        <div className="D text-[clamp(1.2rem,4.5vw,1.9rem)] text-[var(--white)] leading-tight tracking-wide px-1">
          {T(svc.name).toUpperCase()}
        </div>
        <div className="mt-1.5 w-6 h-[2px] mx-auto rounded-full" style={{ background: "var(--blue)" }} />
      </div>

      {/* Touch/Hover reveal panel */}
      <div
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center transition-transform duration-500"
        style={{
          background: "rgba(3,10,20,0.94)",
          transform: active ? "translateY(0)" : "translateY(-100%)",
          padding: "clamp(16px, 4vw, 28px)",
          overflowY: "auto",
        }}
      >
        {/* Close hint on mobile */}
        <div className="md:hidden absolute top-3 right-4 text-[.65rem] text-[rgba(26,174,222,.6)] tracking-widest uppercase">
          {T({ en: "tap to close", es: "toca para cerrar" })}
        </div>

        {/* Title */}
        <div className="D text-[clamp(1.3rem,4vw,1.8rem)] g-blue leading-tight mb-3">
          {T(svc.name).toUpperCase()}
        </div>

        {/* Description */}
        <p className="text-[clamp(.85rem,2.5vw,1.05rem)] text-[var(--gray)] leading-relaxed mb-4">
          {T(svc.desc)}
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {svc.features.map((f, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full text-[.78rem] font-semibold tracking-wide border border-[rgba(26,174,222,.35)] text-[var(--cyan)] bg-[rgba(26,174,222,.08)]"
            >
              {T(f)}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/16788826689?text=${bookMsg}`}
          target="_blank" rel="noreferrer"
          className="btn btn-blue w-full justify-center py-3"
          onClick={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
        >
          <MessageCircle size={14} />
          {T({ en: "Book This", es: "Reservar" })}
        </a>
      </div>

      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-2xl border transition-colors duration-400 pointer-events-none z-40"
        style={{ borderColor: active ? "rgba(26,174,222,.4)" : "transparent" }}
      />
    </div>
  );
}

export default function Services() {
  const { T } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          gridRef.current?.querySelectorAll(".service-card") ?? [],
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.7, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          }
        );
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative" style={{ background: "rgba(3,10,20,0.88)", backdropFilter: "blur(2px)" }}>
      <div className="S flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="OL mb-3">{T({ en: "What We Do", es: "Lo Que Hacemos" })}</div>
          <h2 className="D text-[clamp(3rem,7vw,6rem)] text-[var(--white)]">
            {T({ en: "OUR SERVICES", es: "NUESTROS SERVICIOS" })}
          </h2>
        </div>

        {/* Floating hint */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex gap-1.5 items-center">
            {[0,1,2].map(i => (
              <span key={i} className="block w-1.5 h-1.5 rounded-full bg-[var(--blue)]"
                style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
          </div>
          <span className="text-[.75rem] font-semibold tracking-[.3em] uppercase text-[var(--blue)] opacity-70">
            <span className="md:hidden">{T({ en: "Tap to explore", es: "Toca para ver más" })}</span>
            <span className="hidden md:inline">{T({ en: "Hover to explore", es: "Pasa el cursor" })}</span>
          </span>
          <div className="flex gap-1.5 items-center">
            {[0,1,2].map(i => (
              <span key={i} className="block w-1.5 h-1.5 rounded-full bg-[var(--blue)]"
                style={{ animation: `bounce 1.2s ease-in-out ${(2-i) * 0.2}s infinite` }} />
            ))}
          </div>
        </div>

        {/* Mobile: snap scroll carousel */}
        <div
          className="md:hidden w-full overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex gap-4 px-5">
            {SERVICES.map((svc, i) => (
              <div key={svc.id} style={{ width: "72vw", flexShrink: 0, scrollSnapAlign: "start" }}>
                <ServiceCard svc={svc} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div
          ref={gridRef}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-[1200px]"
        >
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
