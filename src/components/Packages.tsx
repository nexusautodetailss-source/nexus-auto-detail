"use client";
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/LangContext";
import { Check, MessageCircle, Star } from "lucide-react";

interface Package {
  id: string;
  name: { en: string; es: string };
  accent: string;
  popular?: boolean;
  features: { en: string; es: string }[];
  desc: { en: string; es: string };
}

const PACKAGES: Package[] = [
  {
    id: "basic",
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
    name: { en: "Full Detail", es: "Detalle Completo" },
    accent: "#FFD700",
    desc: { en: "The ultimate treatment — your car like it just left the showroom.", es: "El tratamiento definitivo — tu auto como recién salido del distribuidor." },
    features: [
      { en: "Everything in Standard", es: "Todo lo del Estándar" },
      { en: "Machine polish", es: "Pulido a máquina" },
      { en: "Leather conditioning", es: "Acondicionamiento de cuero" },
      { en: "Engine bay cleaning", es: "Limpieza del compartimento del motor" },
      { en: "Paint decontamination", es: "Descontaminación de pintura" },
      { en: "Full inspection", es: "Inspección completa" },
    ],
  },
];

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
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
          }
        );
      });

      // 3D tilt effect
      const cards = cardsRef.current?.querySelectorAll(".pkg-card");
      cards?.forEach((card) => {
        const el = card as HTMLElement;
        el.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(el, { rotateY: x * 14, rotateX: -y * 10, transformPerspective: 800, duration: 0.3, ease: "power2.out" });
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
    <section id="packages" className="S bg-[var(--navy2)] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(26,174,222,0.05)_0%,transparent_60%)]" />
      </div>

      <div className="text-center mb-14 relative z-10">
        <div className="OL mb-3">{T({ en: "Choose Your Clean", es: "Elige Tu Limpieza" })}</div>
        <h2 className="D text-[clamp(2.5rem,6vw,5rem)] text-[var(--white)]">
          {T({ en: "PACKAGES", es: "PAQUETES" })}
        </h2>
        <p className="text-[var(--gray)] mt-4 max-w-xl mx-auto">
          {T({
            en: "All packages include mobile service — we come to you, anywhere within 40 miles.",
            es: "Todos los paquetes incluyen servicio móvil — vamos a ti, en un radio de 40 millas.",
          })}
        </p>
      </div>

      <div ref={cardsRef} className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className="pkg-card gc p-8 flex flex-col gap-5 relative"
            style={{ borderColor: `${pkg.accent}22`, willChange: "transform" }}
          >
            {/* Popular badge */}
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[var(--hot)] text-white text-[.65rem] font-bold tracking-[.2em] uppercase px-4 py-1.5 rounded-full">
                <Star size={10} fill="white" />
                {T({ en: "Most Popular", es: "Más Popular" })}
              </div>
            )}

            {/* Top accent line */}
            <div className="h-0.5 rounded-full w-full" style={{ background: pkg.accent }} />

            <div>
              <div className="D text-[2.2rem]" style={{ color: pkg.accent }}>
                {T(pkg.name).toUpperCase()}
              </div>
              <p className="text-[var(--gray)] text-sm mt-2">{T(pkg.desc)}</p>
            </div>

            <div className="rule" />

            <ul className="flex flex-col gap-3 flex-1">
              {pkg.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check size={15} className="flex-shrink-0 mt-0.5" style={{ color: pkg.accent }} />
                  <span className="text-[.82rem] text-[var(--white)]">{T(f)}</span>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/16788826689?text=${encodeURIComponent(`Hi! I'd like to book the ${pkg.name.en} package.`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn w-full justify-center mt-2"
              style={{
                background: pkg.accent,
                color: "#fff",
                boxShadow: `0 4px 30px ${pkg.accent}40`,
              }}
            >
              <MessageCircle size={15} />
              {T({ en: "Book Now", es: "Reservar" })}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
