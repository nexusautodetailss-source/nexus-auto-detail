"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { Menu, X, Phone } from "lucide-react";

const PHONE = "(678) 882-6689";

export default function Navbar() {
  const { lang, setLang, T } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: T({ en: "Services", es: "Servicios" }) },
    { href: "#packages", label: T({ en: "Packages", es: "Paquetes" }) },
    { href: "#gallery", label: T({ en: "Gallery", es: "Galería" }) },
    { href: "/pressure-washing", label: T({ en: "Pressure Washing", es: "Lavado a Presión" }) },
  ];

  const bookMsg = encodeURIComponent("Hi! I'd like to book an appointment with Nexus Auto Detail.");
  const waUrl = `https://wa.me/16788826689?text=${bookMsg}`;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#030A14]/90 backdrop-blur-md border-b border-[rgba(26,174,222,0.12)]" : ""
      }`}
    >
      <div className="flex items-center justify-between px-[6vw] h-[72px]">
        {/* Logo — image only */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image src="/logo-sin-titulo-sm.png" alt="Nexus Auto Detail" width={120} height={67}
            className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[.78rem] font-semibold tracking-[.15em] uppercase text-[var(--gray)] hover:text-[var(--white)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4">
          {/* Phone */}
          <a href={`tel:+16788826689`}
            className="flex items-center gap-1.5 text-[.75rem] font-semibold text-[var(--gray)] hover:text-[var(--white)] transition-colors">
            <Phone size={13} className="text-[var(--blue)]" />
            {PHONE}
          </a>

          {/* Lang toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="text-[.72rem] font-bold tracking-[.2em] uppercase border border-[rgba(26,174,222,.3)] rounded-full px-3 py-1 text-[var(--blue)] hover:bg-[rgba(26,174,222,.08)] transition-colors"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-blue text-sm py-3 px-6">
            {T({ en: "Book Now", es: "Reservar" })}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-[var(--white)] p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#061020]/98 backdrop-blur-xl border-t border-[rgba(26,174,222,.12)] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[.9rem] font-semibold tracking-[.15em] uppercase text-[var(--white)] hover:text-[var(--blue)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="rule" />
          <a href={`tel:+16788826689`} className="flex items-center gap-2 text-[var(--blue)] text-sm font-semibold">
            <Phone size={14} /> {PHONE}
          </a>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-[.72rem] font-bold tracking-[.2em] uppercase border border-[rgba(26,174,222,.3)] rounded-full px-3 py-1 text-[var(--blue)]"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
            <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-blue text-sm py-3 px-6">
              {T({ en: "Book Now", es: "Reservar" })}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
