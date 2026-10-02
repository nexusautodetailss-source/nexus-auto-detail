"use client";
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/LangContext";
import { Bell, CalendarCheck, Gift, Sparkles, Smartphone } from "lucide-react";

export const APP_URL = "https://app.nexusdetails.com";

const PERKS = [
  {
    icon: Gift,
    title: { en: "Loyalty card for every car", es: "Tarjeta de puntos para cada carro" },
    text: { en: "Your 5th service gets 50% off a wash. Your 10th wash is free.", es: "En tu 5º servicio, 50% de un lavado. Tu 10º lavado es gratis." },
  },
  {
    icon: Sparkles,
    title: { en: "Watch your car get dirty", es: "Mira cómo se ensucia tu carro" },
    text: { en: "Your car in the app gets dusty day by day, so you always know when it's time.", es: "Tu carro en la app se va ensuciando día a día, así sabes cuándo toca lavarlo." },
  },
  {
    icon: CalendarCheck,
    title: { en: "Book in 3 taps", es: "Agenda en 3 toques" },
    text: { en: "Pick your car, the service and a time. We come to you.", es: "Eliges tu carro, el servicio y la hora. Nosotros vamos hasta ti." },
  },
  {
    icon: Bell,
    title: { en: "Reminders that help", es: "Recordatorios que ayudan" },
    text: { en: "We'll let you know when it's time for a wash or your next oil change.", es: "Te avisamos cuando toca lavarlo o el próximo cambio de aceite." },
  },
];

export default function AppPromo() {
  const { T } = useLang();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".app-phone", { y: 80, opacity: 0, rotate: -4 },
          { y: 0, opacity: 1, rotate: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
        gsap.fromTo(".app-perk", { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: .7, stagger: .12, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } });
      }, ref);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} id="app" className="S relative overflow-hidden" style={{ background: "rgba(3,10,20,0.9)" }}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end">
        <div className="h-[700px] w-[700px] bg-[radial-gradient(circle,rgba(26,174,222,0.16)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 grid max-w-6xl items-center md:grid-cols-[1.1fr_.9fr]" style={{ margin: "0 auto", gap: 56 }}>
        <div>
          <div className="OL" style={{ marginBottom: 16 }}>{T({ en: "The Nexus App", es: "La App de Nexus" })}</div>
          <h2 className="D text-[clamp(2.6rem,6vw,5.2rem)] text-[var(--white)]">
            {T({ en: "Your car,", es: "Tu carro," })}<br />
            <span className="g-blue">{T({ en: "always clean.", es: "siempre limpio." })}</span>
          </h2>
          <p className="max-w-lg text-[1rem] leading-relaxed text-[var(--gray)]" style={{ marginTop: 20 }}>
            {T({
              en: "Download the free Nexus app: book your wash, track your car and earn free washes.",
              es: "Descarga gratis la app de Nexus: agenda tu lavado, sigue tu carro y gana lavados gratis.",
            })}
          </p>

          <div className="grid sm:grid-cols-2" style={{ marginTop: 36, gap: 22 }}>
            {PERKS.map((p, i) => (
              <div key={i} className="app-perk flex" style={{ gap: 16 }}>
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                     style={{ background: "rgba(26,174,222,.12)", border: "1px solid rgba(26,174,222,.3)" }}>
                  <p.icon size={20} className="text-[var(--cyan)]" />
                </div>
                <div>
                  <div className="text-[.95rem] font-semibold text-[var(--white)]">{T(p.title)}</div>
                  <div className="text-[.85rem] leading-snug text-[var(--gray)]" style={{ marginTop: 4 }}>{T(p.text)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center" style={{ marginTop: 40, gap: 24 }}>
            <a href={APP_URL} target="_blank" rel="noreferrer" className="btn btn-blue">
              <Smartphone size={16} /> {T({ en: "Get the app", es: "Descargar la app" })}
            </a>
            {/* En computadora: escanear con el celular */}
            <div className="hidden items-center md:flex" style={{ gap: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/app-qr.svg" alt="QR app.nexusdetails.com" className="h-20 w-20 rounded-xl bg-white" style={{ padding: 6 }} />
              <span className="max-w-[140px] text-[.78rem] leading-snug text-[var(--gray)]">
                {T({ en: "Scan with your phone camera", es: "Escanéalo con la cámara de tu celular" })}
              </span>
            </div>
          </div>
          <p className="text-[.75rem] text-[var(--gray)]" style={{ marginTop: 20 }}>
            {T({
              en: "iPhone: open it in Safari → Share → \"Add to Home Screen\". Android: tap \"Install\".",
              es: "iPhone: ábrela en Safari → Compartir → \"Agregar a inicio\". Android: toca \"Instalar\".",
            })}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="app-phone float relative w-[min(300px,78vw)] rounded-[3rem] border border-white/10 bg-[#0b1220] shadow-[0_40px_120px_rgba(26,174,222,.25)]" style={{ padding: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={T({ en: "/app-screen-en.webp", es: "/app-screen-es.webp" })} alt={T({ en: "Nexus app", es: "App de Nexus" })}
                 className="w-full rounded-[2.4rem]" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
