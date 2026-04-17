"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { MessageCircle, Star, Sparkles, Zap, Crown } from "lucide-react";

interface Package {
  id: string;
  icon: React.ElementType;
  name: { en: string; es: string };
  accent: string;
  popular?: boolean;
  features: { en: string; es: string }[];
  desc: { en: string; es: string };
}

const PACKAGES: Package[] = [
  {
    id: "basic",
    icon: Zap,
    name: { en: "Basic", es: "Básico" },
    accent: "#1AAEDE",
    desc: { en: "The essential clean to keep your car looking sharp.", es: "La limpieza esencial para mantener tu auto impecable." },
    features: [
      { en: "Exterior hand wash", es: "Lavado exterior a mano" },
      { en: "Basic interior vacuum", es: "Aspirado básico interior" },
      { en: "Window cleaning", es: "Limpieza de ventanas" },
      { en: "Tire shine", es: "Brillo de llantas" },
    ],
  },
  {
    id: "standard",
    icon: Sparkles,
    name: { en: "Standard", es: "Estándar" },
    accent: "#FF4500",
    popular: true,
    desc: { en: "Our most popular combo — inside and out, spotless.", es: "Nuestro combo más popular — interior y exterior impecable." },
    features: [
      { en: "Everything in Basic", es: "Todo lo del Básico" },
      { en: "Wash & wax", es: "Lavado y encerado" },
      { en: "Deeper interior clean", es: "Limpieza interior profunda" },
      { en: "Dashboard & door panels", es: "Tablero y paneles" },
      { en: "Seat conditioning", es: "Acondicionamiento de asientos" },
      { en: "Odor elimination", es: "Eliminación de olores" },
    ],
  },
  {
    id: "full",
    icon: Crown,
    name: { en: "Full Detail", es: "Detalle Completo" },
    accent: "#FFD700",
    desc: { en: "The ultimate treatment — your car like it just left the showroom.", es: "El tratamiento definitivo — tu auto como recién salido del distribuidor." },
    features: [
      { en: "Everything in Standard", es: "Todo lo del Estándar" },
      { en: "Machine polish", es: "Pulido a máquina" },
      { en: "Leather conditioning", es: "Acondicionamiento de cuero" },
      { en: "Engine bay cleaning", es: "Limpieza del motor" },
      { en: "Paint decontamination", es: "Descontaminación de pintura" },
      { en: "Full inspection", es: "Inspección completa" },
    ],
  },
];

function PkgCard({ pkg, index }: { pkg: Package; index: number }) {
  const { T } = useLang();
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = pkg.icon;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const bookMsg = encodeURIComponent(`Hi! I'd like to book the ${pkg.name.en} package.`);

  return (
    <div
      ref={cardRef}
      className="pkg-card gc flex flex-col items-center text-center relative overflow-hidden"
      style={{
        padding: "clamp(28px, 3vw, 48px)",
        borderColor: hovered ? `${pkg.accent}60` : `${pkg.accent}20`,
        borderTopWidth: "3px",
        borderTopColor: pkg.accent,
        willChange: "transform",
        transition: "border-color .3s ease, box-shadow .3s ease",
        boxShadow: hovered ? `0 20px 60px ${pkg.accent}20` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow bg on hover */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 0%, ${pkg.accent}12 0%, transparent 65%)` }} />

      {/* Popular badge */}
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-white text-[.65rem] font-bold tracking-[.2em] uppercase px-4 py-1.5 rounded-full z-10"
          style={{ background: pkg.accent, boxShadow: `0 4px 20px ${pkg.accent}60` }}>
          <Star size={10} fill="white" />
          {T({ en: "Most Popular", es: "Más Popular" })}
        </div>
      )}

      {/* Animated icon */}
      <div className="relative mb-5 mt-2">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
          style={{
            background: `${pkg.accent}15`,
            border: `1px solid ${pkg.accent}30`,
            transition: "transform .3s ease, box-shadow .3s ease",
            transform: hovered ? "scale(1.2) rotate(-6deg)" : "scale(1) rotate(0deg)",
            boxShadow: hovered ? `0 0 30px ${pkg.accent}50` : "none",
          }}>
          <Icon size={28} style={{ color: pkg.accent }} />
        </div>
        {/* Pulse ring on hover */}
        {hovered && (
          <div className="absolute inset-0 rounded-2xl animate-ping pointer-events-none"
            style={{ border: `1px solid ${pkg.accent}40`, animationDuration: "1.2s" }} />
        )}
      </div>

      {/* Name */}
      <div className="D text-[clamp(2.2rem,4vw,3rem)] leading-none" style={{ color: pkg.accent }}>
        {T(pkg.name).toUpperCase()}
      </div>

      {/* Desc */}
      <p className="text-[var(--gray)] text-[.95rem] mt-3 leading-relaxed">{T(pkg.desc)}</p>

      <div className="rule w-full my-5" />

      {/* Features — animate in staggered when visible */}
      <ul className="flex flex-col gap-3 w-full flex-1 text-left">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transitionDelay: `${0.1 + i * 0.08}s`,
            }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `${pkg.accent}20`, border: `1px solid ${pkg.accent}50` }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: pkg.accent }} />
            </div>
            <span className="text-[.92rem] text-[var(--white)]">{T(f)}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={`https://wa.me/16788826689?text=${bookMsg}`}
        target="_blank" rel="noreferrer"
        className="btn w-full justify-center mt-6 transition-all duration-300"
        style={{
          background: pkg.accent,
          color: "#fff",
          boxShadow: hovered ? `0 8px 40px ${pkg.accent}60` : `0 4px 20px ${pkg.accent}30`,
          transform: hovered ? "translateY(-2px)" : "none",
        }}
      >
        <MessageCircle size={15} />
        {T({ en: "Book Now", es: "Reservar" })}
      </a>
    </div>
  );
}

export default function Packages() {
  const { T } = useLang();
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          cardsRef.current?.querySelectorAll(".pkg-card") ?? [],
          { y: 70, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.18, ease: "back.out(1.5)",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%" } }
        );
      });

      // 3D tilt
      const cards = cardsRef.current?.querySelectorAll(".pkg-card");
      cards?.forEach((card) => {
        const el = card as HTMLElement;
        el.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top)  / rect.height - 0.5;
          gsap.to(el, { rotateY: x * 10, rotateX: -y * 7, transformPerspective: 900, duration: 0.3, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power2.out" });
        });
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="packages" className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-[5vw] py-16"
      style={{ background: "rgba(6,16,32,0.88)", backdropFilter: "blur(2px)" }}>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(26,174,222,0.05)_0%,transparent_60%)]" />
      </div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <div className="OL mb-4">{T({ en: "Choose Your Clean", es: "Elige Tu Limpieza" })}</div>
        <h2 className="D text-[clamp(3rem,7vw,6rem)] text-[var(--white)]">
          {T({ en: "PACKAGES", es: "PAQUETES" })}
        </h2>
        <p className="text-[var(--gray)] text-[1rem] mt-4 max-w-lg mx-auto leading-relaxed">
          {T({ en: "Mobile service included — we come to you within 40 miles.", es: "Servicio móvil incluido — vamos a ti en un radio de 40 millas." })}
        </p>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1200px]">
        {PACKAGES.map((pkg, i) => (
          <PkgCard key={pkg.id} pkg={pkg} index={i} />
        ))}
      </div>
    </section>
  );
}
