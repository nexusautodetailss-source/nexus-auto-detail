"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { Check, MessageCircle } from "lucide-react";

interface Service {
  id: string;
  name: { en: string; es: string };
  photo: string;
  features: { en: string; es: string }[];
  desc: { en: string; es: string };
}

const SERVICES: Service[] = [
  {
    id: "exterior",
    name: { en: "Exterior Detail", es: "Detalle Exterior" },
    photo: "/fotos/_74A0599.jpg",
    desc: { en: "Full exterior treatment — your car will shine like new.", es: "Tratamiento exterior completo — tu auto brillará como nuevo." },
    features: [
      { en: "Hand wash", es: "Lavado a mano" },
      { en: "Clay bar treatment", es: "Arcilla descontaminante" },
      { en: "Wheel & tire detail", es: "Detalle de rines y llanta" },
      { en: "Window cleaning", es: "Limpieza de ventanas" },
      { en: "Trim dressing", es: "Acondicionador de molduras" },
    ],
  },
  {
    id: "interior",
    name: { en: "Interior Detail", es: "Detalle Interior" },
    photo: "/fotos/_74A0676.jpg",
    desc: { en: "Deep clean for every inch inside your vehicle.", es: "Limpieza profunda de cada rincón de tu vehículo." },
    features: [
      { en: "Deep vacuum", es: "Aspirado profundo" },
      { en: "Seat conditioning", es: "Acondicionamiento de asientos" },
      { en: "Dashboard cleaning", es: "Limpieza del tablero" },
      { en: "Odor elimination", es: "Eliminación de olores" },
      { en: "Door panels", es: "Paneles de puerta" },
    ],
  },
  {
    id: "full",
    name: { en: "Full Detail", es: "Detalle Completo" },
    photo: "/fotos/_74A0685.jpg",
    desc: { en: "The ultimate head-to-toe transformation.", es: "La transformación definitiva de pies a cabeza." },
    features: [
      { en: "Everything interior + exterior", es: "Interior + exterior completo" },
      { en: "Machine polish", es: "Pulido a máquina" },
      { en: "Engine bay cleaning", es: "Limpieza de compartimento de motor" },
      { en: "Paint decontamination", es: "Descontaminación de pintura" },
      { en: "Final inspection", es: "Inspección final" },
    ],
  },
  {
    id: "wax",
    name: { en: "Wash & Wax", es: "Lavado y Encerado" },
    photo: "/fotos/_74A0603-1.jpg",
    desc: { en: "Protection and shine that lasts for weeks.", es: "Protección y brillo que dura semanas." },
    features: [
      { en: "Premium wash", es: "Lavado premium" },
      { en: "Carnauba wax coat", es: "Capa de cera carnauba" },
      { en: "UV protection", es: "Protección UV" },
      { en: "Chrome polish", es: "Pulido de cromados" },
      { en: "Tire shine", es: "Brillo de llantas" },
    ],
  },
  {
    id: "headlight",
    name: { en: "Headlight Restoration", es: "Restauración de Faros" },
    photo: "/fotos/DJI_20260414232837_0055_D.jpg",
    desc: { en: "Crystal clear headlights restored in one visit.", es: "Faros cristalinos restaurados en una visita." },
    features: [
      { en: "Oxidation removal", es: "Eliminación de oxidación" },
      { en: "Multi-stage sanding", es: "Lijado de múltiples etapas" },
      { en: "UV sealant coat", es: "Sellador UV" },
      { en: "Clarity restored", es: "Claridad restaurada" },
      { en: "Improved visibility", es: "Mejor visibilidad" },
    ],
  },
  {
    id: "ceramic",
    name: { en: "Ceramic Coating", es: "Recubrimiento Cerámico" },
    photo: "/anim1/clean.png",
    desc: { en: "Military-grade ceramic protection that lasts years.", es: "Protección cerámica de grado militar que dura años." },
    features: [
      { en: "9H hardness rating", es: "Dureza nivel 9H" },
      { en: "Hydrophobic surface", es: "Superficie hidrofóbica" },
      { en: "UV + scratch resistant", es: "Resistente a UV y rayones" },
      { en: "2–5 year durability", es: "Durabilidad 2–5 años" },
      { en: "Deep gloss finish", es: "Acabado con brillo profundo" },
    ],
  },
];

export default function Services() {
  const { T } = useLang();
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(sectionRef.current, { opacity: 0 }, {
          opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        });
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  const changeService = async (idx: number) => {
    if (idx === active || animating) return;
    setAnimating(true);
    const { default: gsap } = await import("gsap");
    gsap.to([photoRef.current, textRef.current], {
      opacity: 0, y: 20, duration: 0.3, onComplete: () => {
        setActive(idx);
        gsap.to([photoRef.current, textRef.current], { opacity: 1, y: 0, duration: 0.5, delay: 0.05 });
        setAnimating(false);
      }
    });
  };

  const svc = SERVICES[active];
  const bookMsg = encodeURIComponent(`Hi! I'm interested in ${svc.name.en} service from Nexus Auto Detail.`);

  return (
    <section id="services" ref={sectionRef} className="relative bg-[var(--navy)]">
      <div className="S">
        <div className="OL mb-3">{T({ en: "What We Do", es: "Lo Que Hacemos" })}</div>
        <h2 className="D text-[clamp(2.5rem,6vw,5rem)] text-[var(--white)] mb-12">
          {T({ en: "OUR SERVICES", es: "NUESTROS SERVICIOS" })}
        </h2>
      </div>

      {/* Desktop: sidebar + showcase */}
      <div className="hidden md:flex h-[80vh] min-h-[600px] max-h-[900px]">
        {/* Sidebar */}
        <div className="w-[300px] flex-shrink-0 border-r border-[var(--border)] flex flex-col justify-center px-8 gap-2 bg-[var(--navy2)]">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => changeService(i)}
              className={`text-left px-4 py-4 rounded-xl transition-all duration-300 ${
                active === i
                  ? "bg-[rgba(26,174,222,.12)] border-l-2 border-[var(--blue)] pl-6"
                  : "hover:bg-[rgba(255,255,255,.04)]"
              }`}
            >
              <span className={`D text-[1.4rem] ${active === i ? "text-[var(--blue)]" : "text-[var(--gray)]"}`}>
                {T(s.name)}
              </span>
            </button>
          ))}
        </div>

        {/* Photo showcase */}
        <div ref={photoRef} className="flex-1 relative overflow-hidden">
          <Image
            src={svc.photo}
            alt={T(svc.name)}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030A14]/80 via-[#030A14]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030A14] via-transparent to-transparent" />

          <div ref={textRef} className="absolute inset-0 flex flex-col justify-end p-12">
            <div className="OL mb-2">{T({ en: "Service", es: "Servicio" })}</div>
            <div className="D text-[clamp(3rem,6vw,5.5rem)] text-[var(--white)] leading-[.88] mb-4">
              {T(svc.name).toUpperCase()}
            </div>
            <p className="text-[var(--gray)] mb-6 max-w-[400px]">{T(svc.desc)}</p>
            <div className="grid grid-cols-2 gap-2 mb-8 max-w-[420px]">
              {svc.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={14} className="text-[var(--blue)] flex-shrink-0" />
                  <span className="text-[.8rem] text-[var(--white)]">{T(f)}</span>
                </div>
              ))}
            </div>
            <a
              href={`https://wa.me/16788826689?text=${bookMsg}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-blue w-fit"
            >
              <MessageCircle size={16} />
              {T({ en: "Book This Service", es: "Reservar Servicio" })}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile: accordion cards */}
      <div className="md:hidden px-5vw space-y-4 pb-20 px-5">
        {SERVICES.map((s, i) => (
          <div key={s.id} className="gc overflow-hidden rounded-2xl">
            <button
              onClick={() => setActive(active === i ? -1 : i)}
              className="w-full flex items-center justify-between px-5 py-4"
            >
              <span className={`D text-[1.4rem] ${active === i ? "text-[var(--blue)]" : "text-[var(--white)]"}`}>
                {T(s.name)}
              </span>
              <span className={`text-xl transition-transform ${active === i ? "rotate-45" : ""} text-[var(--blue)]`}>+</span>
            </button>
            {active === i && (
              <div className="px-5 pb-5">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4">
                  <Image src={s.photo} alt={T(s.name)} fill className="object-cover" />
                </div>
                <p className="text-[var(--gray)] text-sm mb-4">{T(s.desc)}</p>
                <div className="space-y-2">
                  {s.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2">
                      <Check size={13} className="text-[var(--blue)]" />
                      <span className="text-[.8rem] text-[var(--white)]">{T(f)}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={`https://wa.me/16788826689?text=${encodeURIComponent(`Hi! I'm interested in ${s.name.en}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-blue mt-5 w-full justify-center"
                >
                  {T({ en: "Book Now", es: "Reservar" })}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
