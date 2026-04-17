"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { Phone, MapPin, Clock, MessageCircle, ChevronRight, Star, ExternalLink } from "lucide-react";

const SERVICES = [
  { en: "Exterior Detail",       es: "Detalle Exterior",         href: "#services" },
  { en: "Interior Detail",       es: "Detalle Interior",         href: "#services" },
  { en: "Full Detail",           es: "Detalle Completo",         href: "#services" },
  { en: "Wash & Wax",            es: "Lavado y Encerado",        href: "#services" },
  { en: "Headlight Restoration", es: "Restauración de Faros",    href: "#services" },
  { en: "Ceramic Coating",       es: "Recubrimiento Cerámico",   href: "#services" },
  { en: "Pressure Washing",      es: "Lavado a Presión",         href: "/pressure-washing" },
];

const AWARDS = ["2011","2013","2015","2017","2018","2019","2020","2024","2025"];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={href}
      className="flex items-center gap-1.5 text-[.88rem] transition-colors duration-200"
      style={{ color: hov ? "var(--white)" : "var(--gray)" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>
      <ChevronRight size={12} style={{ opacity: hov ? 1 : 0, color: "var(--blue)", transition: "opacity .2s" }} />
      {children}
    </Link>
  );
}

export default function Footer() {
  const { T } = useLang();
  const year = new Date().getFullYear();

  const waUrl  = "https://wa.me/16788826689?text=" + encodeURIComponent("Hi! I'd like to book an appointment with Nexus Auto Detail.");
  const smsUrl = "sms:+16788826689?body=" + encodeURIComponent("Hi! I'd like to book an appointment with Nexus Auto Detail.");

  return (
    <footer className="relative overflow-hidden"
      style={{ background: "rgba(3,10,20,0.82)", backdropFilter: "blur(2px)" }}>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px]"
          style={{ background: "radial-gradient(ellipse at center bottom, rgba(26,174,222,0.06) 0%, transparent 70%)" }} />
      </div>

      {/* Giant ghost text */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full text-center">
        <div className="D text-[22vw] leading-none"
          style={{ color: "rgba(26,174,222,0.03)", whiteSpace: "nowrap" }}>
          NEXUS
        </div>
      </div>

      <div className="relative z-10 px-[5vw] pt-20 pb-10">

        {/* ── CTA Banner ── */}
        <div className="gc mb-16 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderColor: "rgba(26,174,222,0.2)", background: "rgba(26,174,222,0.04)" }}>
          <div>
            <div className="OL mb-2">{T({ en: "Mobile Service · Lawrenceville, GA", es: "Servicio Móvil · Lawrenceville, GA" })}</div>
            <div className="D text-[clamp(1.8rem,4vw,3rem)] text-[var(--white)]">
              {T({ en: "READY TO BOOK?", es: "¿LISTO PARA RESERVAR?" })}
            </div>
            <p className="text-[var(--gray)] text-[.9rem] mt-1">
              {T({ en: "We come to you — anywhere within 40 miles.", es: "Vamos donde tú estés — hasta 40 millas a la redonda." })}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href={waUrl} target="_blank" rel="noreferrer"
              className="btn justify-center"
              style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 24px rgba(37,211,102,.35)" }}>
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href={smsUrl}
              className="btn btn-ghost justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {T({ en: "Text Us", es: "Escríbenos" })}
            </a>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="relative">
                <Image src="/logo.png" alt="Nexus Auto Detail" width={56} height={56}
                  className="rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ filter: "drop-shadow(0 0 12px rgba(26,174,222,0.3))" }} />
              </div>
              <div>
                <div className="D text-[1.4rem] g-blue">NEXUS</div>
                <div className="text-[.58rem] tracking-[.3em] text-[var(--blue)] font-semibold uppercase">Auto Detail</div>
              </div>
            </Link>
            <p className="text-[var(--gray)] text-[.88rem] leading-relaxed mb-5 max-w-[220px]">
              {T({
                en: "Mobile auto detailing by Chido & Adela. Serving all of Georgia since 2010.",
                es: "Detallado automotriz móvil por Chido y Adela. Sirviendo a Georgia desde 2010.",
              })}
            </p>
            {/* Social / Yelp */}
            <a href="https://www.yelp.com/biz/nexus-auto-detail-duluth-4"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[.72rem] font-bold transition-all duration-200 hover:scale-105"
              style={{ background: "rgba(255,26,26,0.12)", border: "1px solid rgba(255,26,26,0.3)", color: "#FF4444" }}>
              <Star size={12} fill="currentColor" />
              {T({ en: "Find us on Yelp", es: "Vernos en Yelp" })}
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Services */}
          <div>
            <div className="OL mb-5">{T({ en: "Services", es: "Servicios" })}</div>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s.en}>
                  <NavLink href={s.href}>{T(s)}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="OL mb-5">{T({ en: "Contact", es: "Contacto" })}</div>
            <div className="flex flex-col gap-4">
              <a href="tel:+16788826689"
                className="flex items-center gap-3 group transition-colors duration-200 hover:text-[var(--white)]"
                style={{ color: "var(--gray)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-[rgba(26,174,222,0.2)] group-hover:scale-110"
                  style={{ background: "rgba(26,174,222,0.08)", border: "1px solid rgba(26,174,222,0.2)" }}>
                  <Phone size={14} className="text-[var(--blue)]" />
                </div>
                <div>
                  <div className="text-[.65rem] text-[var(--blue)] font-bold tracking-wider uppercase mb-0.5">{T({ en: "Call", es: "Llamar" })}</div>
                  <div className="text-[.9rem] font-semibold">(678) 882-6689</div>
                </div>
              </a>
              <div className="flex items-start gap-3" style={{ color: "var(--gray)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(26,174,222,0.08)", border: "1px solid rgba(26,174,222,0.2)" }}>
                  <MapPin size={14} className="text-[var(--blue)]" />
                </div>
                <div>
                  <div className="text-[.65rem] text-[var(--blue)] font-bold tracking-wider uppercase mb-0.5">{T({ en: "Service Area", es: "Área" })}</div>
                  <div className="text-[.88rem] leading-snug">Lawrenceville, GA<br />
                    <span className="text-[.78rem]">{T({ en: "Up to 40 mi radius", es: "Hasta 40 millas" })}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3" style={{ color: "var(--gray)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(26,174,222,0.08)", border: "1px solid rgba(26,174,222,0.2)" }}>
                  <Clock size={14} className="text-[var(--blue)]" />
                </div>
                <div>
                  <div className="text-[.65rem] text-[var(--blue)] font-bold tracking-wider uppercase mb-0.5">{T({ en: "Hours", es: "Horario" })}</div>
                  <div className="text-[.88rem]">{T({ en: "Mon–Sat · By Appointment", es: "Lun–Sáb · Con Cita Previa" })}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Awards */}
          <div>
            <div className="OL mb-5">{T({ en: "Awards", es: "Premios" })}</div>
            <div className="flex items-center gap-1.5 mb-4">
              {[...Array(5)].map((_,i) => (
                <Star key={i} size={14} fill="#FFD700" style={{ color: "#FFD700" }} />
              ))}
            </div>
            <p className="text-[var(--white)] text-[.85rem] font-semibold mb-3">
              🏆 {T({ en: "Best of Gwinnett", es: "Mejor de Gwinnett" })}
            </p>
            <div className="flex flex-wrap gap-2">
              {AWARDS.map((yr) => (
                <span key={yr}
                  className="px-2.5 py-1 rounded-full text-[.65rem] font-bold transition-all duration-200 hover:scale-110 cursor-default"
                  style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.25)", color: "#FFD700" }}>
                  {yr}
                </span>
              ))}
            </div>
            <p className="text-[var(--gray)] text-[.75rem] mt-4 leading-relaxed">
              {T({
                en: "9× recognized as the best auto detail service in Gwinnett County.",
                es: "9× reconocidos como el mejor servicio de detallado en el condado de Gwinnett.",
              })}
            </p>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="rule mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[.7rem]" style={{ color: "var(--gray)" }}>
          <div>© {year} Nexus Auto Detail · Chido &amp; Adela.&nbsp;
            {T({ en: "All rights reserved.", es: "Todos los derechos reservados." })}
          </div>
          <div className="flex items-center gap-5">
            <Link href="/pressure-washing" className="hover:text-[var(--blue)] transition-colors">
              {T({ en: "Pressure Washing", es: "Lavado a Presión" })}
            </Link>
            <Link href="#booking" className="hover:text-[var(--blue)] transition-colors">
              {T({ en: "Book Now", es: "Reservar" })}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
