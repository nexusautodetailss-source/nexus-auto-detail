"use client";
import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLang } from "@/lib/LangContext";

export default function WhatsAppFloat() {
  const { T } = useLang();
  const [showPopup, setShowPopup] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const url = "https://wa.me/16788826689?text=" + encodeURIComponent("Hi! I'd like to book an appointment with Nexus Auto Detail.");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup card */}
      {showPopup && !dismissed && (
        <div className="gc p-4 max-w-[260px] shadow-2xl animate-[fadeInUp_.4s_ease]">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="text-[.75rem] font-bold text-[var(--white)]">
              {T({ en: "Need a detail?", es: "¿Necesitas un detalle?" })}
            </div>
            <button onClick={() => { setDismissed(true); setShowPopup(false); }} className="text-[var(--gray)] hover:text-[var(--white)]">
              <X size={14} />
            </button>
          </div>
          <p className="text-[.7rem] text-[var(--gray)] mb-3">
            {T({ en: "Chat with Chido & Adela — book in minutes!", es: "Chatea con Chido y Adela — reserva en minutos!" })}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="btn w-full justify-center py-2 px-4 text-[.7rem]"
            style={{ background: "#25D366", color: "#fff" }}
          >
            {T({ en: "Chat Now", es: "Chatear Ahora" })}
          </a>
        </div>
      )}

      {/* Main button */}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 relative"
        style={{ background: "#25D366", boxShadow: "0 4px 30px rgba(37,211,102,.45)" }}
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} className="text-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-[pulse-ring_2s_ease_infinite]" style={{ border: "2px solid #25D366" }} />
      </a>
    </div>
  );
}
