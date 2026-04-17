"use client";
import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLang } from "@/lib/LangContext";

const WA_URL  = "https://wa.me/16788826689?text=" + encodeURIComponent("Hi! I'd like to book an appointment with Nexus Auto Detail.");
const SMS_URL = "sms:+16788826689?body=" + encodeURIComponent("Hi! I'd like to book an appointment with Nexus Auto Detail.");

function SmsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Popup card */}
      {showPopup && !dismissed && (
        <div className="gc p-5 max-w-[270px] shadow-2xl" style={{ animation: "fadeInUp .4s ease" }}>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="text-[.78rem] font-bold text-[var(--white)]">
              {T({ en: "Book your detail!", es: "¡Reserva tu detalle!" })}
            </div>
            <button onClick={() => { setDismissed(true); setShowPopup(false); }} className="text-[var(--gray)] hover:text-[var(--white)] mt-0.5">
              <X size={14} />
            </button>
          </div>
          <p className="text-[.7rem] text-[var(--gray)] mb-4 leading-relaxed">
            {T({ en: "Chat with Chido & Adela and book in minutes!", es: "Chatea con Chido y Adela — reserva en minutos!" })}
          </p>
          <div className="flex flex-col gap-2">
            <a href={WA_URL} target="_blank" rel="noreferrer"
              className="btn w-full justify-center py-2.5 px-4 text-[.72rem]"
              style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 20px rgba(37,211,102,.3)" }}>
              <MessageCircle size={14} />
              WhatsApp
            </a>
            <a href={SMS_URL}
              className="btn w-full justify-center py-2.5 px-4 text-[.72rem]"
              style={{ background: "var(--blue)", color: "#fff", boxShadow: "0 4px 20px rgba(26,174,222,.3)" }}>
              <SmsIcon />
              {T({ en: "Text Message", es: "Mensaje de Texto" })}
            </a>
          </div>
        </div>
      )}

      {/* SMS button */}
      <a
        href={SMS_URL}
        className="w-13 h-13 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 relative"
        style={{
          width: "52px", height: "52px",
          background: "var(--blue)",
          boxShadow: "0 4px 24px rgba(26,174,222,.45)"
        }}
        aria-label="SMS"
        title="Text Message"
      >
        <SmsIcon />
        <span className="absolute inset-0 rounded-full text-white flex items-center justify-center pointer-events-none"
          style={{ border: "2px solid rgba(26,174,222,.6)", animation: "pulse-ring 2.4s ease infinite" }} />
      </a>

      {/* WhatsApp button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noreferrer"
        className="rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 relative"
        style={{
          width: "58px", height: "58px",
          background: "#25D366",
          boxShadow: "0 4px 30px rgba(37,211,102,.45)"
        }}
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} className="text-white" />
        <span className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: "2px solid #25D366", animation: "pulse-ring 2s ease infinite" }} />
      </a>
    </div>
  );
}
