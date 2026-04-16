"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { X, ZoomIn } from "lucide-react";

const PHOTOS = [
  { src: "/fotos/DJI_20260414230320_0047_D.jpg", caption: { en: "Chido & Adela — Ready to Roll", es: "Chido y Adela — Listos" }, aspect: "landscape" },
  { src: "/fotos/_74A0599.jpg", caption: { en: "Power Foam Wash", es: "Lavado con Espuma" }, aspect: "portrait" },
  { src: "/fotos/_74A0603-1.jpg", caption: { en: "Hand Detail Work", es: "Trabajo a Mano" }, aspect: "landscape" },
  { src: "/fotos/_74A0676.jpg", caption: { en: "Interior Detail", es: "Detalle Interior" }, aspect: "landscape" },
  { src: "/fotos/_74A0685.jpg", caption: { en: "Final Result: Showroom Ready", es: "Resultado Final: Listo para Exhibición" }, aspect: "landscape" },
  { src: "/fotos/DJI_20260414230347_0050_D.jpg", caption: { en: "The Team", es: "El Equipo" }, aspect: "landscape" },
  { src: "/fotos/DJI_20260414232837_0055_D.jpg", caption: { en: "Wheel Detail Close-Up", es: "Detalle de Rueda" }, aspect: "portrait" },
  { src: "/fotos/_74A0590-1.jpg", caption: { en: "Tire & Wheel Care", es: "Cuidado de Llanta y Rin" }, aspect: "portrait" },
  { src: "/fotos/DJI_20260414230339_0049_D.jpg", caption: { en: "Mobile Service Vans", es: "Vans de Servicio Móvil" }, aspect: "landscape" },
];

export default function Gallery() {
  const { T } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          gridRef.current?.querySelectorAll(".gallery-item") ?? [],
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          }
        );
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight" && lightbox !== null) setLightbox((lightbox + 1) % PHOTOS.length);
      if (e.key === "ArrowLeft" && lightbox !== null) setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="gallery" className="S bg-[var(--navy)]">
      <div className="text-center mb-12">
        <div className="OL mb-3">{T({ en: "Our Work", es: "Nuestro Trabajo" })}</div>
        <h2 className="D text-[clamp(2.5rem,6vw,5rem)] text-[var(--white)]">
          {T({ en: "THE GALLERY", es: "GALERÍA" })}
        </h2>
      </div>

      {/* Masonry grid */}
      <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            className="gallery-item break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl border border-[var(--border)]"
            onClick={() => setLightbox(i)}
          >
            <div className={`relative w-full ${photo.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
              <Image src={photo.src} alt={T(photo.caption)} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030A14]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                <ZoomIn className="text-[var(--white)]" size={28} />
                <span className="text-[var(--white)] text-sm font-semibold text-center px-4">{T(photo.caption)}</span>
              </div>
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
          <button
            className="absolute top-6 right-6 text-[var(--white)] hover:text-[var(--blue)] transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--white)] hover:text-[var(--blue)] text-3xl font-bold z-10 bg-black/40 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length); }}
          >
            ‹
          </button>
          <div className="relative max-w-[90vw] max-h-[85vh] aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image
              src={PHOTOS[lightbox].src}
              alt={T(PHOTOS[lightbox].caption)}
              width={1200}
              height={800}
              className="object-contain rounded-xl max-h-[85vh] w-auto h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 text-center py-3 text-[var(--gray)] text-sm">
              {T(PHOTOS[lightbox].caption)} — {lightbox + 1}/{PHOTOS.length}
            </div>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--white)] hover:text-[var(--blue)] text-3xl font-bold z-10 bg-black/40 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % PHOTOS.length); }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
