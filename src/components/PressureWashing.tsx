"use client";
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/LangContext";
import { Check, MessageCircle, Droplets } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    icon: "🏠",
    name: { en: "House Washing", es: "Lavado de Casa" },
    desc: { en: "Complete exterior house cleaning — removes mold, mildew, and grime safely.", es: "Limpieza exterior completa del hogar — elimina moho, hongos y suciedad de forma segura." },
    features: [
      { en: "Soft wash method", es: "Método soft wash" },
      { en: "Safe for all siding types", es: "Seguro para todos los tipos de revestimiento" },
      { en: "Mold & mildew removal", es: "Eliminación de moho y hongos" },
    ],
  },
  {
    icon: "💧",
    name: { en: "Soft Washing", es: "Lavado Suave" },
    desc: { en: "Low-pressure cleaning for delicate surfaces — roofs, wood, stucco.", es: "Limpieza de baja presión para superficies delicadas — techos, madera, estuco." },
    features: [
      { en: "Eco-friendly solution", es: "Solución ecológica" },
      { en: "No surface damage", es: "Sin daño a las superficies" },
      { en: "Long-lasting results", es: "Resultados duraderos" },
    ],
  },
  {
    icon: "🛤️",
    name: { en: "Driveways", es: "Entradas de Garaje" },
    desc: { en: "Deep clean concrete and asphalt driveways — oil stains, tire marks, dirt.", es: "Limpieza profunda de entradas de concreto y asfalto — manchas de aceite, marcas de llantas, suciedad." },
    features: [
      { en: "Oil stain treatment", es: "Tratamiento de manchas de aceite" },
      { en: "High-pressure blast", es: "Chorro de alta presión" },
      { en: "Edge detail", es: "Detalle de bordes" },
    ],
  },
  {
    icon: "🚶",
    name: { en: "Sidewalks", es: "Aceras" },
    desc: { en: "Restore sidewalks to fresh, bright concrete free of stains and grime.", es: "Restaura las aceras a concreto fresco y brillante libre de manchas y suciedad." },
    features: [
      { en: "Algae & moss removal", es: "Eliminación de algas y musgo" },
      { en: "Uniform cleaning", es: "Limpieza uniforme" },
      { en: "Safe finish", es: "Acabado seguro" },
    ],
  },
  {
    icon: "🏡",
    name: { en: "Patios", es: "Patios" },
    desc: { en: "Revive outdoor patios, pavers, and stone surfaces.", es: "Revive patios exteriores, adoquines y superficies de piedra." },
    features: [
      { en: "Paver cleaning", es: "Limpieza de adoquines" },
      { en: "Grout restoration", es: "Restauración de juntas" },
      { en: "Furniture-friendly", es: "Amigable con el mobiliario" },
    ],
  },
  {
    icon: "🅿️",
    name: { en: "Parking Lots", es: "Estacionamientos" },
    desc: { en: "Commercial parking lot cleaning — keeps your business looking sharp.", es: "Limpieza de estacionamientos comerciales — mantiene tu negocio impecable." },
    features: [
      { en: "Large area coverage", es: "Cobertura de grandes áreas" },
      { en: "Oil & grease removal", es: "Eliminación de aceite y grasa" },
      { en: "Stripe preservation", es: "Preservación de rayas" },
    ],
  },
  {
    icon: "🤿",
    name: { en: "Fences & Walls", es: "Cercas y Paredes" },
    desc: { en: "Wood, vinyl, brick, and stone fences cleaned to perfection.", es: "Cercas de madera, vinilo, ladrillo y piedra limpiadas a la perfección." },
    features: [
      { en: "All materials", es: "Todos los materiales" },
      { en: "Stain removal", es: "Eliminación de manchas" },
      { en: "Gentle technique", es: "Técnica suave" },
    ],
  },
  {
    icon: "✨",
    name: { en: "And More", es: "Y Más" },
    desc: { en: "Decks, roofs, pool areas, storefronts — if it needs cleaning, we do it.", es: "Terrazas, techos, áreas de piscina, frentes de tiendas — si necesita limpieza, lo hacemos." },
    features: [
      { en: "Custom quotes", es: "Cotizaciones personalizadas" },
      { en: "Residential & commercial", es: "Residencial y comercial" },
      { en: "Free estimates", es: "Estimados gratuitos" },
    ],
  },
];

export default function PressureWashing() {
  const { T } = useLang();
  const cardsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          heroRef.current?.querySelectorAll(".hero-anim") ?? [],
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.3 }
        );
        gsap.fromTo(
          cardsRef.current?.querySelectorAll(".pw-card") ?? [],
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08,
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
          }
        );
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  const bookMsg = encodeURIComponent("Hi! I'd like to get a quote for pressure washing from Nexus Auto Detail.");

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
        <video
          src="/videos/v2-web.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030A14] via-transparent to-[#030A14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030A14]/80 via-transparent to-transparent" />

        <div className="relative z-10 px-[6vw] pt-32 pb-20">
          <Link href="/" className="hero-anim OL mb-4 block hover:text-[var(--cyan)] transition-colors">
            ← {T({ en: "Back to Home", es: "Volver al Inicio" })}
          </Link>
          <div className="hero-anim flex items-center gap-4 mb-4">
            <Droplets size={36} className="text-[var(--blue)]" />
            <div className="OL">{T({ en: "Nexus Auto Detail", es: "Nexus Auto Detail" })}</div>
          </div>
          <div className="hero-anim D text-[clamp(3rem,9vw,8rem)] text-[var(--white)] leading-[.88]">
            PRESSURE
          </div>
          <div className="hero-anim D text-[clamp(3rem,9vw,8rem)] g-blue leading-[.88]">
            WASHING
          </div>
          <p className="hero-anim text-[var(--gray)] mt-6 max-w-[500px] leading-relaxed">
            {T({
              en: "Professional pressure washing for your home, driveway, and commercial property. We bring the power — you see the results.",
              es: "Lavado a presión profesional para tu hogar, entrada y propiedad comercial. Traemos la potencia — tú ves los resultados.",
            })}
          </p>
          <div className="hero-anim flex flex-wrap gap-4 mt-8">
            <a href={`https://wa.me/16788826689?text=${bookMsg}`} target="_blank" rel="noreferrer" className="btn btn-blue">
              <MessageCircle size={16} />
              {T({ en: "Get a Free Quote", es: "Obtener Cotización Gratis" })}
            </a>
            <a href="tel:(678) 882-6689" className="btn btn-ghost">
              (678) 882-6689
            </a>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="S bg-[var(--navy)]">
        <div className="text-center mb-14">
          <div className="OL mb-3">{T({ en: "What We Clean", es: "Lo Que Limpiamos" })}</div>
          <h2 className="D text-[clamp(2.5rem,6vw,5rem)] text-[var(--white)]">
            {T({ en: "OUR SERVICES", es: "NUESTROS SERVICIOS" })}
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <div key={s.name.en} className="pw-card gc p-6 flex flex-col gap-3 hover:border-[rgba(26,174,222,.3)] transition-colors">
              <div className="text-3xl">{s.icon}</div>
              <div className="D text-[1.4rem] text-[var(--blue)]">{T(s.name)}</div>
              <p className="text-[var(--gray)] text-sm leading-relaxed flex-1">{T(s.desc)}</p>
              <ul className="space-y-1.5">
                {s.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check size={12} className="text-[var(--blue)] flex-shrink-0" />
                    <span className="text-[.75rem] text-[var(--white)]">{T(f)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 bg-[var(--navy2)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,174,222,0.08)_0%,transparent_70%)]" />
        </div>
        <div className="relative z-10 px-[6vw] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="D text-[clamp(2rem,5vw,4rem)] text-[var(--white)]">
              {T({ en: "READY FOR A CLEAN", es: "¿LISTO PARA UNA" })}
            </div>
            <div className="D text-[clamp(2rem,5vw,4rem)] g-blue">
              {T({ en: "PROPERTY?", es: "PROPIEDAD LIMPIA?" })}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`https://wa.me/16788826689?text=${bookMsg}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-blue"
            >
              <MessageCircle size={16} />
              {T({ en: "Book Now", es: "Reservar" })}
            </a>
            <a href="tel:(678) 882-6689" className="btn btn-ghost">
              (678) 882-6689
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
