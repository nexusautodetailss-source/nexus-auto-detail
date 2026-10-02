"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import type { ReviewsData } from "@/lib/reviews";

function Stars({ n, size = 16 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex" style={{ gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} fill={i <= Math.round(n) ? "#FBBC04" : "transparent"} color="#FBBC04" />
      ))}
    </span>
  );
}

function GoogleG() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  );
}

/** Reseñas reales de Google del perfil de Nexus. Si aún no está configurado, no se muestra. */
export default function GoogleReviews({ data }: { data: ReviewsData | null }) {
  const { T } = useLang();
  const [expanded, setExpanded] = useState<number | null>(null);
  if (!data || data.reviews.length === 0) return null;

  return (
    <section id="reviews" style={{ background: "rgba(3,10,20,0.9)", padding: "80px 0 72px" }}>
      <div className="text-center" style={{ padding: "0 5vw" }}>
        <div className="OL">{T({ en: "Google reviews", es: "Reseñas de Google" })}</div>
        <h2 className="D text-[clamp(2.4rem,7vw,4.5rem)] text-[var(--white)]" style={{ marginTop: 12 }}>
          {T({ en: "What our clients say", es: "Lo que dicen nuestros clientes" })}
        </h2>
        <div className="flex items-center justify-center" style={{ marginTop: 16, gap: 10 }}>
          <GoogleG />
          <span className="D text-[2rem] text-[var(--white)]">{data.rating.toFixed(1)}</span>
          <Stars n={data.rating} size={20} />
          <span className="text-[.85rem] text-[var(--gray)]">({data.total} {T({ en: "reviews", es: "reseñas" })})</span>
        </div>
      </div>

      {/* tarjetas: se deslizan en el celular, cuadrícula en computadora */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible"
           style={{ marginTop: 32, gap: 14, padding: "4px 5vw 12px", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
        {data.reviews.map((r, i) => {
          const long = r.text.length > 220;
          const open = expanded === i;
          return (
            <div key={i} className="gc flex flex-shrink-0 flex-col md:w-auto"
                 style={{ width: "82vw", maxWidth: 380, padding: 20, scrollSnapAlign: "center" }}>
              <div className="flex items-center" style={{ gap: 12 }}>
                {r.photo
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={r.photo} alt="" referrerPolicy="no-referrer" className="h-10 w-10 rounded-full object-cover" />
                  : <span className="flex h-10 w-10 items-center justify-center rounded-full font-bold" style={{ background: "var(--blue)" }}>{r.author[0]}</span>}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[.95rem] font-semibold text-[var(--white)]">{r.author}</div>
                  <div className="text-[.75rem] text-[var(--gray)]">{r.when}</div>
                </div>
                <GoogleG />
              </div>
              <div style={{ marginTop: 12 }}><Stars n={r.rating} /></div>
              <p className="text-[.92rem] leading-relaxed text-[var(--white)]" style={{ marginTop: 10, opacity: .9 }}>
                {long && !open ? r.text.slice(0, 220).trimEnd() + "…" : r.text}
              </p>
              {long && (
                <button onClick={() => setExpanded(open ? null : i)} className="self-start text-[.8rem] font-semibold text-[var(--blue)]"
                        style={{ marginTop: 6, cursor: "pointer" }}>
                  {open ? T({ en: "Show less", es: "Ver menos" }) : T({ en: "Read more", es: "Leer más" })}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center" style={{ marginTop: 26, gap: 12, padding: "0 5vw" }}>
        <a href={data.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
          {T({ en: "See all on Google", es: "Ver todas en Google" })}
        </a>
        <a href={data.writeUrl} target="_blank" rel="noreferrer" className="btn btn-blue">
          ⭐ {T({ en: "Leave us a review", es: "Déjanos tu reseña" })}
        </a>
      </div>
    </section>
  );
}
