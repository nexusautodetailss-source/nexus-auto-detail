"use client";
import { MessageSquare, Phone } from "lucide-react";
import { useLang } from "@/lib/LangContext";

// Línea de Nexus atendida por Max (agente de voz): contesta 24/7 en inglés y español y agenda directo.
export const CALL_NUMBER = "+14704921077";
export const CALL_DISPLAY = "(470) 492-1077";

// Los mensajes de texto siguen llegando al número de siempre de Nexus.
const SMS_URL = "sms:+16788826689?body=" + encodeURIComponent("Hi! I'd like to book an appointment with Nexus Auto Detail.");

/** Botones flotantes: llamar (lo atiende Max) y mensaje de texto al número de Nexus. */
export default function WhatsAppFloat() {
  const { T } = useLang();
  return (
    <div className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-3">
    <a
      href={SMS_URL}
      className="flex items-center justify-center rounded-full shadow-xl transition-all hover:scale-105"
      style={{ width: 52, height: 52, background: "rgba(3,10,20,.92)", color: "var(--blue)",
               border: "1.5px solid var(--blue)", boxShadow: "0 4px 24px rgba(26,174,222,.3)" }}
      aria-label={T({ en: "Text message", es: "Mensaje de texto" })}
      title={T({ en: "Text message", es: "Mensaje de texto" })}
    >
      <MessageSquare size={22} />
    </a>
    <a
      href={`tel:${CALL_NUMBER}`}
      className="flex items-center gap-2 rounded-full shadow-2xl transition-all hover:scale-105"
      style={{
        padding: "14px 20px 14px 16px",
        background: "var(--blue)",
        color: "#fff",
        boxShadow: "0 4px 30px rgba(26,174,222,.45)",
      }}
      aria-label={T({ en: `Call ${CALL_DISPLAY}`, es: `Llamar al ${CALL_DISPLAY}` })}
    >
      <span className="relative flex items-center justify-center">
        <Phone size={20} />
        <span className="absolute rounded-full pointer-events-none"
          style={{ inset: -8, border: "2px solid rgba(255,255,255,.55)", animation: "pulse-ring 2s ease infinite" }} />
      </span>
      <span className="text-[.85rem] font-bold leading-tight">
        <span className="block text-[.65rem] font-semibold opacity-80">{T({ en: "Call · 24/7", es: "Llámanos · 24/7" })}</span>
        {CALL_DISPLAY}
      </span>
    </a>
    </div>
  );
}
