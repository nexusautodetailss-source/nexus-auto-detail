"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PHOTOS = [
  { src: "/fotos/DJI_20260414230320_0047_D.jpg", caption: { en: "Chido & Adela — Ready to Roll", es: "Chido y Adela — Listos" } },
  { src: "/fotos/_74A0599.jpg",                   caption: { en: "Power Foam Wash",               es: "Lavado con Espuma" } },
  { src: "/fotos/_74A0603-1.jpg",                 caption: { en: "Hand Detail Work",              es: "Trabajo a Mano" } },
  { src: "/fotos/_74A0676.jpg",                   caption: { en: "Interior Detail",               es: "Detalle Interior" } },
  { src: "/fotos/_74A0685.jpg",                   caption: { en: "Showroom Ready",                es: "Listo para Exhibición" } },
  { src: "/fotos/DJI_20260414230347_0050_D.jpg",  caption: { en: "The Team",                      es: "El Equipo" } },
  { src: "/fotos/DJI_20260414232837_0055_D.jpg",  caption: { en: "Wheel Detail",                  es: "Detalle de Rueda" } },
  { src: "/fotos/_74A0590-1.jpg",                 caption: { en: "Tire & Wheel Care",             es: "Cuidado de Llanta y Rin" } },
  { src: "/fotos/DJI_20260414230339_0049_D.jpg",  caption: { en: "Mobile Service Vans",           es: "Vans de Servicio Móvil" } },
];

// Duplicate for seamless loop
const LOOP = [...PHOTOS, ...PHOTOS, ...PHOTOS];

export default function Gallery() {
  const { T } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="gallery" className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "rgba(3,10,20,0.85)", backdropFilter: "blur(2px)" }}>

      {/* Header */}
      <div className="text-center mb-12 px-6">
        <div className="OL mb-3">{T({ en: "Our Work", es: "Nuestro Trabajo" })}</div>
        <h2 className="D text-[clamp(2.5rem,6vw,5rem)] text-[var(--white)]">
          {T({ en: "THE GALLERY", es: "GALERÍA" })}
        </h2>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(3,10,20,0.9), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgba(3,10,20,0.9), transparent)" }} />

      {/* Carousel track */}
      <div
        className="flex gap-4"
        style={{
          width: "max-content",
          animation: paused ? "none" : "galleryLoop 40s linear infinite",
          willChange: "transform",
        }}
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {LOOP.map((photo, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 cursor-pointer group overflow-hidden rounded-2xl border border-[rgba(26,174,222,0.12)] hover:border-[rgba(26,174,222,0.4)] transition-colors"
            style={{ width: "clamp(220px, 22vw, 320px)", aspectRatio: "4/3" }}
            onClick={() => setLightbox(i % PHOTOS.length)}
          >
            <Image
              src={photo.src}
              alt={T(photo.caption)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-108"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030A14]/85 via-[#030A14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
              <p className="text-[var(--white)] text-[.82rem] font-semibold">{T(photo.caption)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-[var(--white)] hover:text-[var(--blue)] transition-colors z-10"
            onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 gc w-12 h-12 rounded-full flex items-center justify-center text-[var(--white)] hover:text-[var(--blue)] transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length); }}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative flex items-center justify-center" style={{ maxWidth: "90vw", maxHeight: "85vh" }}
            onClick={e => e.stopPropagation()}>
            <Image
              src={PHOTOS[lightbox].src}
              alt={T(PHOTOS[lightbox].caption)}
              width={1400} height={900}
              className="object-contain rounded-xl"
              style={{ maxHeight: "82vh", width: "auto" }}
            />
            <div className="absolute bottom-3 left-0 right-0 text-center text-[var(--gray)] text-sm">
              {T(PHOTOS[lightbox].caption)} · {lightbox + 1}/{PHOTOS.length}
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 gc w-12 h-12 rounded-full flex items-center justify-center text-[var(--white)] hover:text-[var(--blue)] transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % PHOTOS.length); }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}
