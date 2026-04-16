"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { Phone, MapPin } from "lucide-react";

const SERVICES = [
  { en: "Exterior Detail", es: "Detalle Exterior" },
  { en: "Interior Detail", es: "Detalle Interior" },
  { en: "Full Detail", es: "Detalle Completo" },
  { en: "Wash & Wax", es: "Lavado y Encerado" },
  { en: "Headlight Restoration", es: "Restauración de Faros" },
  { en: "Ceramic Coating", es: "Recubrimiento Cerámico" },
  { en: "Pressure Washing", es: "Lavado a Presión" },
];

export default function Footer() {
  const { T } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--navy2)] border-t border-[var(--border)] overflow-hidden">
      {/* Giant ghost text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none">
        <div
          className="D text-[20vw] leading-none"
          style={{ color: "rgba(26,174,222,0.03)", whiteSpace: "nowrap" }}
        >
          NEXUS
        </div>
      </div>

      <div className="relative z-10 S">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Nexus Auto Detail" width={52} height={52} className="rounded-xl" />
              <div>
                <div className="D text-[1.2rem] text-[var(--white)]">NEXUS</div>
                <div className="text-[.6rem] tracking-[.25em] text-[var(--blue)] font-semibold uppercase">Auto Detail</div>
              </div>
            </Link>
            <p className="text-[var(--gray)] text-sm leading-relaxed max-w-[240px]">
              {T({
                en: "Mobile auto detailing by Chido & Adela. Serving all of Georgia since 2010.",
                es: "Detallado automotriz móvil por Chido y Adela. Sirviendo a Georgia desde 2010.",
              })}
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="OL mb-4">{T({ en: "Services", es: "Servicios" })}</div>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.en}>
                  <Link href="#services" className="text-[var(--gray)] text-sm hover:text-[var(--white)] transition-colors">
                    {T(s)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="OL mb-4">{T({ en: "Contact", es: "Contacto" })}</div>
            <div className="space-y-3">
              <a href="tel:(678) 882-6689" className="flex items-center gap-2 text-[var(--gray)] text-sm hover:text-[var(--blue)] transition-colors">
                <Phone size={14} />
                (678) 882-6689
              </a>
              <div className="flex items-start gap-2 text-[var(--gray)] text-sm">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>Lawrenceville, GA<br />{T({ en: "Up to 40 mile radius", es: "Radio de hasta 40 millas" })}</span>
              </div>
            </div>
          </div>

          {/* Reviews & Hours */}
          <div>
            <div className="OL mb-4">{T({ en: "Reviews & Hours", es: "Reseñas y Horario" })}</div>
            <div className="space-y-3">
              <a
                href="https://www.yelp.com/biz/nexus-auto-detail-duluth-4"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#FF1A1A] text-sm font-semibold hover:opacity-80 transition-opacity"
              >
                ★ {T({ en: "Find Us on Yelp", es: "Vernos en Yelp" })}
              </a>
              <div className="text-[var(--gray)] text-sm">
                <div className="font-semibold text-[var(--white)] mb-1">{T({ en: "Mon–Sat", es: "Lun–Sáb" })}</div>
                <div>{T({ en: "By Appointment Only", es: "Solo con Cita Previa" })}</div>
              </div>
              <div className="text-[.65rem] text-[var(--gray)] mt-2">
                🏆 {T({ en: "Best of Gwinnett", es: "Mejor de Gwinnett" })}:<br />
                2011 · 2013 · 2015 · 2017–2020 · 2024 · 2025
              </div>
            </div>
          </div>
        </div>

        <div className="rule mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[.7rem] text-[var(--gray)]">
          <div>© {year} Nexus Auto Detail by Chido &amp; Adela. {T({ en: "All rights reserved.", es: "Todos los derechos reservados." })}</div>
          <div className="flex items-center gap-4">
            <Link href="/pressure-washing" className="hover:text-[var(--blue)] transition-colors">
              {T({ en: "Pressure Washing", es: "Lavado a Presión" })}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
