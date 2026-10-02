"use client";
import { useCallback, useEffect, useState } from "react";
import { X, Smartphone } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { APP_URL } from "./AppPromo";

const KEY = "nexus_app_popup_closed";
const DELAY_MS = 4000;

/** Anuncio de la app y la tarjeta de puntos. Sale en cada visita a la página; se cierra
 *  fácil (X, "No, gracias", clic afuera o Esc) y no se repite en esa misma visita. */
export default function AppPopup() {
  const { T } = useLang();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    try { sessionStorage.setItem(KEY, "1"); } catch {}
  }, []);

  useEffect(() => {
    try { if (sessionStorage.getItem(KEY)) return; } catch {}
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center"
         style={{ background: "rgba(1,5,12,.72)", backdropFilter: "blur(6px)", animation: "popFade .35s ease", padding: 16 }}
         onClick={close} role="dialog" aria-modal="true" aria-label={T({ en: "Nexus app", es: "App de Nexus" })}>
      <style>{`
        @keyframes popFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popUp { from { opacity: 0; transform: translateY(24px) scale(.96) } to { opacity: 1; transform: none } }
        @keyframes stamp { 0% { transform: scale(.3); opacity: 0 } 70% { transform: scale(1.15) } 100% { transform: scale(1); opacity: 1 } }
      `}</style>

      <div className="relative w-full max-w-[440px] overflow-hidden rounded-[28px] border text-center"
           style={{ background: "linear-gradient(180deg,#0a1628,#061020)", borderColor: "rgba(26,174,222,.35)",
                    boxShadow: "0 30px 90px rgba(26,174,222,.25)", animation: "popUp .45s cubic-bezier(.2,.9,.3,1.2)" }}
           onClick={(e) => e.stopPropagation()}>
        <button onClick={close} aria-label={T({ en: "Close", es: "Cerrar" })}
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
                style={{ background: "rgba(255,255,255,.08)", cursor: "pointer" }}>
          <X size={20} color="#F0F8FF" />
        </button>

        <div style={{ padding: "40px 26px 26px" }}>
          <div className="OL">{T({ en: "Nexus loyalty card", es: "Tarjeta de puntos Nexus" })}</div>
          <h3 className="D text-[2.4rem] text-[var(--white)]" style={{ marginTop: 10, paddingRight: 8, paddingLeft: 8 }}>
            {T({ en: "Earn free washes", es: "Gana lavados gratis" })}
          </h3>
          <p className="text-[.95rem] leading-relaxed text-[var(--gray)]" style={{ margin: "12px auto 0", maxWidth: 330 }}>
            {T({
              en: "Download the free Nexus app. Every service gets a stamp on your car's card.",
              es: "Descarga gratis la app de Nexus. Cada servicio suma un sello en la tarjeta de tu carro.",
            })}
          </p>

          {/* tarjeta de 10 sellos */}
          <div className="grid grid-cols-5" style={{ margin: "22px auto 0", maxWidth: 290, gap: 10 }}>
            {Array.from({ length: 10 }, (_, i) => {
              const n = i + 1, on = n <= 4, reward = n === 10;
              return (
                <div key={n} className="flex aspect-square items-center justify-center rounded-full text-[.85rem] font-bold"
                     style={{
                       animation: on ? `stamp .4s ${0.3 + i * 0.12}s both` : undefined,
                       background: on ? "var(--blue)" : reward ? "rgba(255,201,64,.12)" : "rgba(255,255,255,.04)",
                       border: on ? "none" : `1.5px dashed ${reward ? "rgba(255,201,64,.7)" : "rgba(26,174,222,.3)"}`,
                       color: on ? "#031020" : reward ? "#FFC940" : "#4d6075",
                     }}>
                  {reward ? "🎁" : on ? "✓" : n}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col text-[.92rem]" style={{ marginTop: 18, gap: 6 }}>
            <div style={{ color: "#FFC940" }}>
              <b>10</b> · {T({ en: "Your 10th wash is free", es: "Tu 10º lavado es gratis" })}
            </div>
          </div>

          <a href={APP_URL} target="_blank" rel="noreferrer" onClick={close} className="btn btn-blue w-full justify-center" style={{ marginTop: 24 }}>
            <Smartphone size={16} /> {T({ en: "Get the app", es: "Descargar la app" })}
          </a>
          <button onClick={close} style={{ marginTop: 14, cursor: "pointer" }} className="text-[.85rem] text-[var(--gray)] underline-offset-4 hover:underline">
            {T({ en: "No, thanks", es: "No, gracias" })}
          </button>
        </div>
      </div>
    </div>
  );
}
