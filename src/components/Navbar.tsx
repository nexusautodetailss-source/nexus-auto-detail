"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { Menu, X, Phone, ChevronLeft } from "lucide-react";

const PHONE = "(678) 882-6689";

type Lang = "en" | "es";
function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="relative flex items-center rounded-full p-[3px]"
      style={{ background: "rgba(26,174,222,0.10)", border: "1px solid rgba(26,174,222,0.28)" }}>
      {/* sliding pill */}
      <span
        className="absolute top-[3px] bottom-[3px] rounded-full transition-all duration-300 ease-in-out"
        style={{
          width: "calc(50% - 3px)",
          left: lang === "en" ? "3px" : "calc(50%)",
          background: "var(--blue)",
          boxShadow: "0 0 12px rgba(26,174,222,.5)",
        }}
      />
      {(["en", "es"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="relative z-10 px-3 py-1 text-[.85rem] font-bold tracking-[.2em] uppercase transition-colors duration-300 w-12 text-center"
          style={{ color: lang === l ? "#fff" : "rgba(26,174,222,0.55)" }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { lang, setLang, T } = useLang();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isPW = pathname.startsWith("/pressure-washing");

  const links = [
    { href: "#services",  label: T({ en: "Services",         es: "Servicios" }) },
    { href: "#packages",  label: T({ en: "Packages",         es: "Paquetes" }) },
    { href: "#gallery",   label: T({ en: "Gallery",          es: "Galería" }) },
    { href: "/pressure-washing", label: T({ en: "Pressure Washing", es: "Lavado a Presión" }) },
  ];

  const bookMsg = encodeURIComponent("Hi! I'd like to book an appointment with Nexus Auto Detail.");
  const waUrl = `https://wa.me/16788826689?text=${bookMsg}`;

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "transparent",
        borderBottom: "1px solid rgba(26,174,222,0.10)",
      }}
    >
      {/* Desktop — 3-column grid for true centering */}
      <div className="hidden md:grid grid-cols-3 items-center px-[5vw] h-[88px]">

        {/* Left: Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-sin-titulo-final.png" alt="Nexus Auto Detail"
            className="h-14 w-auto object-contain" style={{ mixBlendMode: "screen" }} />
        </Link>

        {/* Center: Nav links or Back button */}
        <div className="flex items-center justify-center gap-8">
          {isPW ? (
            <Link href="/"
              className="flex items-center gap-2 text-[.95rem] font-semibold tracking-[.12em] uppercase transition-all duration-200 hover:text-[var(--white)] hover:gap-3"
              style={{ color: "var(--blue)" }}>
              <ChevronLeft size={16} />
              {T({ en: "Auto Detail", es: "Auto Detail" })}
            </Link>
          ) : (
            links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[.95rem] font-semibold tracking-[.12em] uppercase text-[var(--gray)] hover:text-[var(--white)] transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))
          )}
        </div>

        {/* Right: Phone + Lang + Book */}
        <div className="flex items-center justify-end gap-5">
          <LangToggle lang={lang} setLang={setLang} />

          <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-blue">
            {T({ en: "Book Now", es: "Reservar" })}
          </a>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between px-4 h-[64px] gap-2">
        <Link href="/" className="flex items-center flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-sin-titulo-final.png" alt="Nexus Auto Detail"
            className="h-9 w-auto object-contain" style={{ mixBlendMode: "screen" }} />
        </Link>
        <div className="flex items-center gap-2 flex-shrink-0">
          <LangToggle lang={lang} setLang={setLang} />
          <a href={waUrl} target="_blank" rel="noreferrer"
            className="btn btn-blue text-[.72rem] py-2 px-3 whitespace-nowrap">
            {T({ en: "Book Now", es: "Reservar" })}
          </a>
          <button className="text-[var(--white)] p-1.5" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[rgba(26,174,222,.12)] px-6 py-6 flex flex-col gap-5"
          style={{ background: "rgba(4,28,50,0.98)", backdropFilter: "blur(20px)" }}>
          {isPW ? (
            <Link href="/" onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-[.9rem] font-semibold tracking-[.15em] uppercase transition-colors"
              style={{ color: "var(--blue)" }}>
              <ChevronLeft size={15} />
              {T({ en: "Back to Auto Detail", es: "Volver a Auto Detail" })}
            </Link>
          ) : (
            links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[.9rem] font-semibold tracking-[.15em] uppercase text-[var(--white)] hover:text-[var(--blue)] transition-colors"
              >
                {l.label}
              </Link>
            ))
          )}
          <div className="rule" />
          <a href="tel:+16788826689" className="flex items-center gap-2 text-[var(--blue)] text-[.9rem] font-semibold">
            <Phone size={15} /> {PHONE}
          </a>
          <div className="flex items-center gap-4">
            <LangToggle lang={lang} setLang={setLang} />
            <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-blue text-sm py-3 px-6">
              {T({ en: "Book Now", es: "Reservar" })}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
