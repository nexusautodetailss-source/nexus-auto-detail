"use client";
import { useRef, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

const SERVICES_LIST = [
  { en: "Exterior Detail", es: "Detalle Exterior" },
  { en: "Interior Detail", es: "Detalle Interior" },
  { en: "Full Detail", es: "Detalle Completo" },
  { en: "Wash & Wax", es: "Lavado y Encerado" },
  { en: "Headlight Restoration", es: "Restauración de Faros" },
  { en: "Ceramic Coating", es: "Recubrimiento Cerámico" },
  { en: "Basic Package", es: "Paquete Básico" },
  { en: "Standard Package", es: "Paquete Estándar" },
  { en: "Full Detail Package", es: "Paquete Detalle Completo" },
  { en: "Pressure Washing", es: "Lavado a Presión" },
];

export default function Booking() {
  const { T } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", address: "", service: "", date: "", notes: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Nexus Auto Detail! I'd like to book an appointment.\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📍 Address: ${form.address}\n🔧 Service: ${form.service}\n📅 Date: ${form.date}${form.notes ? `\n📝 Notes: ${form.notes}` : ""}`;
    window.open(`https://wa.me/16788826689?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const inputClass = "w-full bg-transparent border-b border-[rgba(26,174,222,.25)] py-3 text-[var(--white)] placeholder-[var(--gray)] text-sm focus:outline-none focus:border-[var(--blue)] transition-colors";

  return (
    <section className="S bg-[var(--navy)] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(198,51,0,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="text-center mb-14">
        <div className="OL mb-3">{T({ en: "Ready to Book?", es: "¿Listo para Reservar?" })}</div>
        <h2 className="D text-[clamp(2.5rem,6vw,5rem)] text-[var(--white)]">
          {T({ en: "BOOK YOUR DETAIL", es: "RESERVA TU DETALLE" })}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-[1100px] mx-auto">
        {/* LEFT — Contact Info */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="D text-[1.8rem] text-[var(--white)] mb-6">
              {T({ en: "GET IN TOUCH", es: "CONTÁCTANOS" })}
            </div>
            <div className="space-y-5">
              <a href="tel:(678) 882-6689" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[rgba(26,174,222,.12)] flex items-center justify-center glow-blue group-hover:bg-[rgba(26,174,222,.2)] transition-colors">
                  <Phone size={18} className="text-[var(--blue)]" />
                </div>
                <div>
                  <div className="text-[.65rem] text-[var(--gray)] tracking-[.2em] uppercase mb-0.5">{T({ en: "Phone", es: "Teléfono" })}</div>
                  <div className="text-[var(--white)] font-semibold">(678) 882-6689</div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[rgba(26,174,222,.12)] flex items-center justify-center">
                  <MapPin size={18} className="text-[var(--blue)]" />
                </div>
                <div>
                  <div className="text-[.65rem] text-[var(--gray)] tracking-[.2em] uppercase mb-0.5">{T({ en: "Service Area", es: "Área de Servicio" })}</div>
                  <div className="text-[var(--white)] font-semibold">Lawrenceville, GA · {T({ en: "Up to 40 miles", es: "Hasta 40 millas" })}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[rgba(26,174,222,.12)] flex items-center justify-center">
                  <Clock size={18} className="text-[var(--blue)]" />
                </div>
                <div>
                  <div className="text-[.65rem] text-[var(--gray)] tracking-[.2em] uppercase mb-0.5">{T({ en: "Hours", es: "Horario" })}</div>
                  <div className="text-[var(--white)] font-semibold">{T({ en: "Mon–Sat, By Appointment", es: "Lun–Sáb, Solo con Cita" })}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rule" />

          <a
            href="https://wa.me/16788826689"
            target="_blank"
            rel="noreferrer"
            className="btn w-fit"
            style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 30px rgba(37,211,102,.35)" }}
          >
            <MessageCircle size={18} />
            {T({ en: "WhatsApp Us", es: "Escríbenos por WhatsApp" })}
          </a>

          <a
            href="https://www.yelp.com/biz/nexus-auto-detail-duluth-4"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost w-fit"
          >
            ★ {T({ en: "See Us on Yelp", es: "Vernos en Yelp" })}
          </a>
        </div>

        {/* RIGHT — Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              className={inputClass}
              name="name"
              placeholder={T({ en: "Your Name *", es: "Tu Nombre *" })}
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className={inputClass}
              name="phone"
              type="tel"
              placeholder={T({ en: "Phone Number *", es: "Teléfono *" })}
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <input
            className={inputClass}
            name="address"
            placeholder={T({ en: "Service Address *", es: "Dirección del Servicio *" })}
            value={form.address}
            onChange={handleChange}
            required
          />

          <select
            className={`${inputClass} cursor-pointer bg-[var(--navy)]`}
            name="service"
            value={form.service}
            onChange={handleChange}
            required
          >
            <option value="" disabled className="bg-[var(--navy)] text-[var(--gray)]">
              {T({ en: "Select Service *", es: "Seleccionar Servicio *" })}
            </option>
            {SERVICES_LIST.map((s) => (
              <option key={s.en} value={s.en} className="bg-[var(--navy)]">{T(s)}</option>
            ))}
          </select>

          <input
            className={inputClass}
            name="date"
            type="date"
            placeholder={T({ en: "Preferred Date", es: "Fecha Preferida" })}
            value={form.date}
            onChange={handleChange}
          />

          <textarea
            className={`${inputClass} resize-none`}
            name="notes"
            rows={3}
            placeholder={T({ en: "Additional notes (vehicle type, special requests...)", es: "Notas adicionales (tipo de vehículo, peticiones especiales...)" })}
            value={form.notes}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-orange w-full justify-center text-base">
            <MessageCircle size={18} />
            {T({ en: "Send via WhatsApp", es: "Enviar por WhatsApp" })}
          </button>

          <p className="text-[.7rem] text-[var(--gray)] text-center">
            {T({
              en: "Submitting will open WhatsApp with your appointment details.",
              es: "Al enviar se abrirá WhatsApp con los detalles de tu cita.",
            })}
          </p>
        </form>
      </div>
    </section>
  );
}
