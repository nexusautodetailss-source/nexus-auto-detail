"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { Check, MessageCircle, ChevronLeft, ChevronRight, Droplets } from "lucide-react";

/* ── Service data with real photos ── */
const SERVICES = [
  {
    id: "house",
    name: { en: "House Exterior", es: "Exterior del Hogar" },
    accent: "#1AAEDE",
    desc: {
      en: "Complete soft-wash treatment for your home's exterior. We safely remove mold, mildew, algae, and years of grime without damaging your siding.",
      es: "Tratamiento completo de lavado suave para el exterior de tu hogar. Eliminamos moho, hongos, algas y suciedad acumulada sin dañar el revestimiento.",
    },
    features: [
      { en: "Soft wash method — no damage", es: "Método soft wash — sin daño" },
      { en: "Mold & mildew removal",        es: "Eliminación de moho y hongos" },
      { en: "Safe for all siding types",    es: "Seguro para todos los revestimientos" },
      { en: "Eco-friendly solutions",       es: "Soluciones ecológicas" },
    ],
    photos: [
      "/pressure-washing/services/house-exterior/0f58e3cbc1b291b6b01d59f425fe62ec.jpg",
      "/pressure-washing/services/house-exterior/40931f5eb4eb382c12817d8e6062878b.jpg",
      "/pressure-washing/services/house-exterior/7f43330df8f03e6a9f873972ebc65c00.jpg",
      "/pressure-washing/services/house-exterior/bf25502b74670983e2db4b1ede2abbca.jpg",
    ],
  },
  {
    id: "roof",
    name: { en: "Roof Cleaning", es: "Limpieza de Techo" },
    accent: "#FF4500",
    desc: {
      en: "Low-pressure roof washing removes black streaks, moss, and lichen — extending your roof's life and boosting curb appeal instantly.",
      es: "Lavado de techo a baja presión que elimina rayas negras, musgo y líquenes — prolongando la vida del techo y mejorando la apariencia al instante.",
    },
    features: [
      { en: "Low-pressure safe technique",  es: "Técnica segura de baja presión" },
      { en: "Black streak removal",         es: "Eliminación de rayas negras" },
      { en: "Moss & lichen treatment",      es: "Tratamiento de musgo y líquenes" },
      { en: "All roof types",               es: "Todo tipo de techos" },
    ],
    photos: [
      "/pressure-washing/services/roof/111da88aab185ee83bac5ee473eecf97.jpg",
      "/pressure-washing/services/roof/827328f5d16365d8d0d5a52f39d7562e.jpg",
      "/pressure-washing/services/roof/a2e95350b6444009418f5b102b5947b1.jpg",
      "/pressure-washing/services/roof/f9227229d02a9613546cbc51d7a46eca.jpg",
    ],
  },
  {
    id: "driveway",
    name: { en: "Driveways", es: "Entradas de Garaje" },
    accent: "#FFD700",
    desc: {
      en: "High-pressure deep cleaning restores concrete and asphalt driveways — blasting away oil stains, tire marks, and embedded dirt.",
      es: "Limpieza profunda a alta presión que restaura entradas de concreto y asfalto — eliminando manchas de aceite, marcas de llantas y suciedad incrustada.",
    },
    features: [
      { en: "Oil stain pre-treatment",  es: "Pre-tratamiento de manchas de aceite" },
      { en: "High-pressure blast",      es: "Chorro de alta presión" },
      { en: "Edge & border detail",     es: "Detalle de bordes y orillas" },
      { en: "Concrete & asphalt",       es: "Concreto y asfalto" },
    ],
    photos: [
      "/pressure-washing/services/driveway/022ad0327fe61043a1bc1639c14760b3.jpg",
      "/pressure-washing/services/driveway/2200543f6348ae62bf8f39a7167733cb.jpg",
      "/pressure-washing/services/driveway/56104fcdbc59bfc3e29c64639f0df2f8.jpg",
    ],
  },
  {
    id: "sidewalk",
    name: { en: "Sidewalks", es: "Aceras" },
    accent: "#1AAEDE",
    desc: {
      en: "Restore your sidewalks to bright, clean concrete. We remove algae, moss, and years of built-up staining for a fresh, safe finish.",
      es: "Restaura tus aceras a concreto brillante y limpio. Eliminamos algas, musgo y manchas acumuladas para un acabado fresco y seguro.",
    },
    features: [
      { en: "Algae & moss removal", es: "Eliminación de algas y musgo" },
      { en: "Uniform deep clean",   es: "Limpieza profunda uniforme" },
      { en: "Non-slip finish",      es: "Acabado antideslizante" },
    ],
    photos: [
      "/pressure-washing/services/sidewalk/4d318b4fa210afbd5ee4699255f7cddd.jpg",
      "/pressure-washing/services/sidewalk/e2b833894fb2066e11fdcb0939b1263a.jpg",
    ],
  },
  {
    id: "deck",
    name: { en: "Decks & Patios", es: "Decks y Patios" },
    accent: "#FF4500",
    desc: {
      en: "Revive your outdoor living space. We clean wood, composite, and paver surfaces — removing stains, mildew, and graying to prep for sealing.",
      es: "Revive tu espacio exterior. Limpiamos superficies de madera, composite y adoquines — eliminando manchas, moho y grisado para preparar el sellado.",
    },
    features: [
      { en: "Wood & composite decks", es: "Decks de madera y composite" },
      { en: "Paver & stone patios",   es: "Patios de adoquines y piedra" },
      { en: "Pre-seal prep",          es: "Preparación para sellado" },
    ],
    photos: [
      "/pressure-washing/services/deck/21fefb085af090c77e15bfec7ec88e0f.jpg",
      "/pressure-washing/services/deck/6c765ee881260a75f0279bc7181ee4e2.jpg",
    ],
  },
  {
    id: "fence",
    name: { en: "Fences & Walls", es: "Cercas y Paredes" },
    accent: "#FFD700",
    desc: {
      en: "Wood, vinyl, brick, and stone — we clean all fence and wall materials gently and thoroughly, restoring their original look.",
      es: "Madera, vinilo, ladrillo y piedra — limpiamos todos los materiales de cercas y paredes con cuidado y precisión, restaurando su aspecto original.",
    },
    features: [
      { en: "All fence materials",  es: "Todos los materiales" },
      { en: "Stain & mold removal", es: "Eliminación de manchas y moho" },
      { en: "Gentle technique",     es: "Técnica suave" },
    ],
    photos: [
      "/pressure-washing/services/fence/0b9e598a949d268723a26b3d5d09f1ea.jpg",
    ],
  },
  {
    id: "commercial",
    name: { en: "Commercial", es: "Comercial" },
    accent: "#1AAEDE",
    desc: {
      en: "Complete pressure washing for businesses — office buildings, storefronts, parking lots, and facades. We keep your property looking professional and inviting.",
      es: "Lavado a presión completo para negocios — edificios de oficinas, fachadas, estacionamientos y frentes de tienda. Mantenemos tu propiedad con aspecto profesional.",
    },
    features: [
      { en: "Office buildings & facades", es: "Edificios de oficinas y fachadas" },
      { en: "Parking lots & garages",     es: "Estacionamientos y garajes" },
      { en: "Storefronts & entrances",    es: "Frentes de tienda y entradas" },
      { en: "Residential & commercial",   es: "Residencial y comercial" },
    ],
    photos: [
      "/pressure-washing/services/commercial/01038399f555846060f279f95112ef8b.jpg",
      "/pressure-washing/services/commercial/124a0618418e7db1201b8fcbba518866.jpg",
      "/pressure-washing/services/commercial/493c9bfe53ea4493c9feb694eee0662d.jpg",
      "/pressure-washing/services/commercial/b98a94ada4afb53b53fc019e9809a433.jpg",
      "/pressure-washing/services/commercial/fc869db10c215b9737473047610fde34.jpg",
    ],
  },
];

/* ── Carousel component ── */
function ServiceCarousel({ photos, accent }: { photos: string[]; accent: string }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => setIdx(i => (i + 1) % photos.length), [photos.length]);
  const prev = () => setIdx(i => (i - 1 + photos.length) % photos.length);

  useEffect(() => {
    if (photos.length <= 1) return;
    timer.current = setTimeout(next, 3200);
    return () => { if (timer.current !== null) clearTimeout(timer.current); };
  }, [idx, next, photos.length]);

  /* Placeholder when no photos yet */
  if (photos.length === 0) return (
    <div className="relative w-full flex items-center justify-center"
      style={{ aspectRatio: "16/9", borderRadius: "14px 14px 0 0", background: `linear-gradient(135deg, ${accent}12, rgba(3,10,20,0.6))`, border: `1px dashed ${accent}40` }}>
      <div className="text-center">
        <div className="text-4xl mb-2">🏢</div>
        <span className="text-[.7rem] tracking-[.2em] uppercase font-bold" style={{ color: accent }}>Coming Soon</span>
      </div>
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", borderRadius: "14px 14px 0 0" }}>
      {photos.map((src, i) => (
        <div key={src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === idx ? 1 : 0 }}>
          <Image src={src} alt="" fill className="object-cover" />
        </div>
      ))}

      {/* Gradient overlay bottom */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(3,10,20,0.7) 0%, transparent 50%)" }} />

      {/* Arrows — only if multiple photos */}
      {photos.length > 1 && (
        <>
          <button onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(3,10,20,0.6)", border: `1px solid ${accent}40`, color: "#fff" }}>
            <ChevronLeft size={15} />
          </button>
          <button onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(3,10,20,0.6)", border: `1px solid ${accent}40`, color: "#fff" }}>
            <ChevronRight size={15} />
          </button>
        </>
      )}

      {/* Dot nav */}
      {photos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {photos.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className="transition-all duration-300"
              style={{
                width: i === idx ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === idx ? accent : "rgba(255,255,255,0.35)",
              }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Service card ── */
function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const { T } = useLang();
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="pw-card flex flex-col overflow-hidden rounded-2xl transition-all duration-400"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? svc.accent + "50" : "rgba(26,174,222,0.12)"}`,
        borderTopColor: svc.accent,
        borderTopWidth: "2px",
        boxShadow: hov ? `0 24px 60px ${svc.accent}18` : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity .6s ease ${index * 0.1}s, transform .6s ease ${index * 0.1}s, border-color .3s, box-shadow .3s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Photos */}
      <ServiceCarousel photos={svc.photos} accent={svc.accent} />

      {/* Content */}
      <div className="flex flex-col flex-1 items-center text-center" style={{ padding: "clamp(24px, 3vw, 40px)" }}>
        <div className="D text-[clamp(1.8rem,3vw,2.2rem)] mb-4" style={{ color: svc.accent }}>
          {T(svc.name).toUpperCase()}
        </div>
        <p className="text-[var(--gray)] text-[.95rem] leading-relaxed mb-7 flex-1 max-w-sm">
          {T(svc.desc)}
        </p>
        <div className="rule w-full mb-7" />
        <ul className="flex flex-col gap-4 w-full max-w-xs">
          {svc.features.map((f, i) => (
            <li key={i}
              className="flex items-center gap-3 transition-all duration-400"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-16px)",
                transitionDelay: `${0.2 + index * 0.1 + i * 0.07}s`,
              }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${svc.accent}20`, border: `1px solid ${svc.accent}50` }}>
                <Check size={12} style={{ color: svc.accent }} />
              </div>
              <span className="text-[.92rem] text-[var(--white)]">{T(f)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function PressureWashing() {
  const { T } = useLang();
  const heroRef  = useRef<HTMLDivElement>(null);
  const bookMsg  = encodeURIComponent("Hi! I'd like to get a quote for pressure washing from Nexus Auto Detail.");
  const waUrl    = `https://wa.me/16788826689?text=${bookMsg}`;
  const smsUrl   = `sms:+16788826689?body=${bookMsg}`;

  useEffect(() => {
    async function init() {
      const { default: gsap } = await import("gsap");
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".hero-anim") ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.13, ease: "power3.out", delay: 0.2 }
      );
    }
    init();
  }, []);

  return (
    <>
      {/* ── FIXED VIDEO BACKGROUND ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: -10, overflow: "hidden" }}>
        <video
          src="/pressure-washing/video/bg-web.mp4"
          autoPlay muted loop playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.62 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(3,10,20,0.38)" }} />
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Overlays */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(3,10,20,0.45) 0%, transparent 40%, rgba(3,10,20,0.7) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(3,10,20,0.4) 100%)" }} />

        {/* Content */}
        <div ref={heroRef} className="relative z-10 flex flex-col items-center text-center px-[5vw] pt-32 pb-24">
          <Link href="/" className="hero-anim OL mb-6 flex items-center gap-2 hover:text-[var(--cyan)] transition-colors">
            <ChevronLeft size={14} />
            {T({ en: "Back to Home", es: "Volver al Inicio" })}
          </Link>

          <div className="hero-anim flex items-center gap-3 mb-5">
            <Droplets size={28} className="text-[var(--blue)]" />
            <div className="OL">{T({ en: "Nexus Auto Detail", es: "Nexus Auto Detail" })}</div>
          </div>

          <h1 className="hero-anim D text-[clamp(4rem,12vw,10rem)] text-[var(--white)] leading-[.88]">
            PRESSURE
          </h1>
          <h1 className="hero-anim D text-[clamp(4rem,12vw,10rem)] g-blue leading-[.88] mb-6">
            WASHING
          </h1>

          <p className="hero-anim text-[var(--gray)] text-[1.05rem] max-w-[560px] leading-relaxed mb-10">
            {T({
              en: "Professional pressure & soft washing for homes, driveways, roofs, and commercial properties. We bring the power — you see the results.",
              es: "Lavado a presión y soft wash profesional para hogares, entradas, techos y propiedades comerciales. Traemos la potencia — tú ves los resultados.",
            })}
          </p>

          {/* CTA buttons */}
          <div className="hero-anim flex flex-wrap justify-center gap-4">
            <a href={waUrl} target="_blank" rel="noreferrer"
              className="btn justify-center"
              style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 30px rgba(37,211,102,.4)" }}>
              <MessageCircle size={17} />
              {T({ en: "Free Quote via WhatsApp", es: "Cotización Gratis por WhatsApp" })}
            </a>
            <a href={smsUrl} className="btn btn-ghost justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {T({ en: "Text Us", es: "Escríbenos" })}
            </a>
            <a href="tel:+16788826689" className="btn btn-ghost justify-center">
              (678) 882-6689
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="hero-anim mt-16 flex flex-col items-center gap-2 opacity-50">
            <span className="text-[.62rem] tracking-[.3em] uppercase text-[var(--gray)]">
              {T({ en: "Explore Services", es: "Ver Servicios" })}
            </span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-[var(--blue)] to-transparent" />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="relative overflow-hidden py-28"
        style={{ background: "rgba(3,10,20,0.78)", backdropFilter: "blur(2px)" }}>

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[1000px] h-[600px]"
            style={{ background: "radial-gradient(ellipse at center, rgba(26,174,222,0.06) 0%, transparent 65%)" }} />
        </div>

        {/* Header */}
        <div className="text-center mb-20 relative z-10 px-[5vw]">
          <div className="OL mb-4">{T({ en: "What We Clean", es: "Lo Que Limpiamos" })}</div>
          <h2 className="D text-[clamp(3rem,7vw,6rem)] text-[var(--white)]">
            {T({ en: "OUR SERVICES", es: "NUESTROS SERVICIOS" })}
          </h2>
          <p className="text-[var(--gray)] text-[1rem] mt-5 max-w-lg mx-auto leading-relaxed">
            {T({
              en: "From rooftops to driveways — we restore every surface to its best condition.",
              es: "Desde techos hasta entradas — restauramos cada superficie a su mejor estado.",
            })}
          </p>
        </div>

        {/* Cards grid — centered */}
        <div className="relative z-10 flex justify-center px-[5vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-[1300px]">
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="relative overflow-hidden px-[5vw] py-24"
        style={{ background: "rgba(3,10,20,0.82)", backdropFilter: "blur(2px)" }}>

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(26,174,222,0.07) 0%, transparent 70%)" }} />

        <div className="relative z-10 flex flex-col items-center text-center gap-8">
          <div className="OL">{T({ en: "Get Started Today", es: "Empieza Hoy" })}</div>
          <div className="D text-[clamp(2.5rem,7vw,6rem)] text-[var(--white)] leading-[.9]">
            {T({ en: "READY FOR A", es: "¿LISTO PARA UNA" })}
          </div>
          <div className="D text-[clamp(2.5rem,7vw,6rem)] g-blue leading-[.9] -mt-4">
            {T({ en: "CLEAN PROPERTY?", es: "PROPIEDAD LIMPIA?" })}
          </div>
          <p className="text-[var(--gray)] text-[1rem] max-w-md leading-relaxed">
            {T({
              en: "Free estimates — we come to you within 40 miles of Lawrenceville, GA.",
              es: "Estimados gratuitos — vamos a ti en un radio de 40 millas de Lawrenceville, GA.",
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={waUrl} target="_blank" rel="noreferrer"
              className="btn justify-center"
              style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 30px rgba(37,211,102,.4)" }}>
              <MessageCircle size={17} />
              {T({ en: "Book via WhatsApp", es: "Reservar por WhatsApp" })}
            </a>
            <a href={smsUrl} className="btn btn-ghost justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {T({ en: "Text Us", es: "Escríbenos" })}
            </a>
            <a href="tel:+16788826689" className="btn btn-ghost justify-center">
              (678) 882-6689
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
