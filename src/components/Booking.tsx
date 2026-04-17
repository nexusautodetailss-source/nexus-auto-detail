"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { Phone, MapPin, Clock, MessageCircle, ChevronRight, ChevronLeft, Check } from "lucide-react";

const SERVICES_LIST = [
  { en: "Exterior Detail",       es: "Detalle Exterior" },
  { en: "Interior Detail",       es: "Detalle Interior" },
  { en: "Full Detail",           es: "Detalle Completo" },
  { en: "Wash & Wax",            es: "Lavado y Encerado" },
  { en: "Headlight Restoration", es: "Restauración de Faros" },
  { en: "Ceramic Coating",       es: "Recubrimiento Cerámico" },
  { en: "Basic Package",         es: "Paquete Básico" },
  { en: "Standard Package",      es: "Paquete Estándar" },
  { en: "Full Detail Package",   es: "Paquete Detalle Completo" },
  { en: "Pressure Washing",      es: "Lavado a Presión" },
];

const INFO = [
  { icon: Phone,  label: { en: "Call Us",       es: "Llámanos" },        value: "(678) 882-6689",             href: "tel:+16788826689" },
  { icon: MapPin, label: { en: "Service Area",  es: "Área de Servicio" }, value: "Lawrenceville, GA · 40 mi", href: null },
  { icon: Clock,  label: { en: "Hours",         es: "Horario" },          value: "Mon–Sat · By Appointment",  href: null },
];

const STEPS = [
  { en: "Service",  es: "Servicio" },
  { en: "Details",  es: "Detalles" },
  { en: "Confirm",  es: "Confirmar" },
];

export default function Booking() {
  const { T } = useLang();
  const [step, setStep] = useState(0);
  const [dir, setDir]   = useState<1 | -1>(1);
  const [anim, setAnim] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", service: "", date: "", time: "", notes: "", vehicles: {} as Record<string, number> });
  const today           = new Date(); today.setHours(0,0,0,0);
  const [calMonth, setCalMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const sectionRef      = useRef<HTMLElement>(null);

  const goTo = (next: number) => {
    setDir(next > step ? 1 : -1);
    setAnim(true);
    setTimeout(() => { setStep(next); setAnim(false); }, 260);
  };

  const vehicleStr = Object.entries(form.vehicles).map(([t, c]) => `${c}× ${t}`).join(", ");

  const buildMsg = () =>
    `Hello Nexus Auto Detail! I'd like to book an appointment.\n\n🔧 Service: ${form.service}\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📍 Address: ${form.address}\n🚗 Vehicles: ${vehicleStr}\n📅 Date: ${form.date || "TBD"}${form.time ? `\n⏰ Time: ${form.time}` : ""}\n${form.notes ? `📝 Notes: ${form.notes}` : ""}`;

  const toggleVehicle = (type: string) => {
    const v = { ...form.vehicles };
    if (v[type]) { delete v[type]; } else { v[type] = 1; }
    setForm({ ...form, vehicles: v });
  };

  const setVehicleCount = (type: string, delta: number) => {
    const current = form.vehicles[type] ?? 1;
    const next = Math.max(1, Math.min(10, current + delta));
    setForm({ ...form, vehicles: { ...form.vehicles, [type]: next } });
  };

  const handleSubmit = () => {
    window.open(`https://wa.me/16788826689?text=${encodeURIComponent(buildMsg())}`, "_blank");
  };

  const handleSMS = () => {
    window.open(`sms:+16788826689?body=${encodeURIComponent(buildMsg())}`, "_blank");
  };

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(sectionRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  const canNext0 = !!form.service;
  const canNext1 = !!form.name && !!form.phone && !!form.address && Object.keys(form.vehicles).length > 0;

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 md:px-[5vw] py-16 md:py-28"
      style={{ background: "rgba(3,10,20,0.88)", backdropFilter: "blur(2px)" }}
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(198,51,0,0.07)_0%,transparent_65%)]" />
      </div>

      {/* ── Header ── */}
      <div className="text-center mb-8 md:mb-16 relative z-10">
        <div className="OL mb-3 md:mb-5">{T({ en: "Ready to Book?", es: "¿Listo para Reservar?" })}</div>
        <h2 className="D text-[clamp(2.5rem,8vw,7rem)] text-[var(--white)]">
          {T({ en: "BOOK YOUR DETAIL", es: "RESERVA TU DETALLE" })}
        </h2>
        <p className="text-[var(--gray)] text-[.95rem] mt-4 max-w-lg mx-auto leading-relaxed px-2">
          {T({ en: "Takes 30 seconds — we'll confirm via WhatsApp.", es: "Solo 30 segundos — confirmamos por WhatsApp." })}
        </p>
      </div>

      {/* ── Step progress ── */}
      <div className="flex items-center gap-3 md:gap-6 mb-8 md:mb-14 relative z-10">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-3 md:gap-6">
            <div className="flex flex-col items-center gap-1.5 md:gap-2">
              <div
                className="w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[.88rem] md:text-[1rem] font-bold transition-all duration-400"
                style={{
                  background: i <= step ? "var(--blue)" : "rgba(26,174,222,0.12)",
                  color: i <= step ? "#fff" : "rgba(26,174,222,0.45)",
                  boxShadow: i === step ? "0 0 22px rgba(26,174,222,0.55)" : "none",
                  transform: i === step ? "scale(1.15)" : "scale(1)",
                }}
              >
                {i < step ? <Check size={15} /> : i + 1}
              </div>
              <span
                className="text-[.58rem] md:text-[.68rem] tracking-[.12em] uppercase font-semibold"
                style={{ color: i === step ? "var(--blue)" : "rgba(136,153,170,0.5)" }}
              >
                {T(s)}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="w-10 md:w-24 h-[1px] mb-6 transition-all duration-500"
                style={{ background: i < step ? "var(--blue)" : "rgba(26,174,222,0.18)" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Step card ── */}
      <div className="relative z-10 w-full max-w-2xl">
        <div
          className="gc"
          style={{
            padding: "clamp(20px, 5vw, 64px)",
            opacity: anim ? 0 : 1,
            transform: anim ? `translateX(${dir * 40}px)` : "translateX(0)",
            transition: "opacity .26s ease, transform .26s ease",
          }}
        >

          {/* STEP 0 — Choose service */}
          {step === 0 && (
            <div className="flex flex-col">
              <div className="D text-[clamp(1.8rem,4vw,2.4rem)] text-[var(--white)] text-center mb-2">
                {T({ en: "What service do you need?", es: "¿Qué servicio necesitas?" })}
              </div>
              <p className="text-[var(--gray)] text-[.88rem] text-center mb-10">
                {T({ en: "Select one to continue", es: "Selecciona uno para continuar" })}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {SERVICES_LIST.map((s) => (
                  <button
                    key={s.en}
                    onClick={() => setForm({ ...form, service: s.en })}
                    className="px-3 py-3.5 md:px-6 md:py-5 rounded-2xl text-[.82rem] md:text-[.92rem] font-semibold text-center transition-all duration-200"
                    style={{
                      background: form.service === s.en ? "var(--blue)" : "rgba(26,174,222,0.07)",
                      border: `1px solid ${form.service === s.en ? "var(--blue)" : "rgba(26,174,222,0.18)"}`,
                      color: form.service === s.en ? "#fff" : "var(--gray)",
                      transform: form.service === s.en ? "scale(1.03)" : "scale(1)",
                      boxShadow: form.service === s.en ? "0 4px 20px rgba(26,174,222,0.3)" : "none",
                    }}
                  >
                    {T(s)}
                  </button>
                ))}
              </div>

              <div className="mt-12">
                <button
                  onClick={() => canNext0 && goTo(1)}
                  className="btn btn-blue w-full justify-center"
                  style={{ opacity: canNext0 ? 1 : 0.35, cursor: canNext0 ? "pointer" : "not-allowed" }}
                >
                  {T({ en: "Continue", es: "Continuar" })} <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 1 — Personal info */}
          {step === 1 && (
            <div className="flex flex-col">
              <div className="D text-[clamp(1.8rem,4vw,2.4rem)] text-[var(--white)] text-center mb-2">
                {T({ en: "Your details", es: "Tus datos" })}
              </div>
              <p className="text-[var(--gray)] text-[.88rem] text-center mb-10">
                {T({ en: "Tell us about you and your vehicle", es: "Cuéntanos sobre ti y tu vehículo" })}
              </p>

              <div className="flex flex-col gap-7">
                {/* Text fields */}
                {[
                  { name: "name",    type: "text", label: { en: "Full Name *",       es: "Nombre completo *" } },
                  { name: "phone",   type: "tel",  label: { en: "Phone Number *",    es: "Teléfono *" } },
                  { name: "address", type: "text", label: { en: "Service Address *", es: "Dirección del servicio *" } },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="OL text-[.62rem] text-[var(--blue)] block mb-2.5">
                      {T(field.label)}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form] as string}
                      onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                      className="w-full bg-[rgba(26,174,222,0.06)] border border-[rgba(26,174,222,0.2)] rounded-2xl px-5 py-4 text-[var(--white)] placeholder-[var(--gray)] text-[1rem] focus:outline-none focus:border-[var(--blue)] transition-colors"
                      placeholder={T(field.label).replace(" *", "")}
                    />
                  </div>
                ))}

                {/* Vehicle type — multi-select with per-type counter */}
                <div>
                  <label className="OL text-[.62rem] text-[var(--blue)] block mb-1">
                    {T({ en: "Vehicle Type *", es: "Tipo de Vehículo *" })}
                  </label>
                  <p className="text-[var(--gray)] text-[.78rem] mb-3">
                    {T({ en: "Select all that apply", es: "Selecciona todos los que apliquen" })}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { en: "Sedan",    es: "Sedán",     icon: "🚗" },
                      { en: "Truck",    es: "Camioneta",  icon: "🛻" },
                      { en: "Mini Van", es: "Mini Van",   icon: "🚐" },
                      { en: "Suburban", es: "Suburban",   icon: "🚙" },
                      { en: "SUV",      es: "SUV",        icon: "🚙" },
                      { en: "Sports",   es: "Deportivo",  icon: "🏎️" },
                    ].map((v) => {
                      const selected = !!form.vehicles[v.en];
                      const count = form.vehicles[v.en] ?? 1;
                      return (
                        <div
                          key={v.en}
                          className="rounded-2xl overflow-hidden transition-all duration-200"
                          style={{
                            border: `1px solid ${selected ? "var(--blue)" : "rgba(26,174,222,0.18)"}`,
                            background: selected ? "rgba(26,174,222,0.12)" : "rgba(26,174,222,0.05)",
                            boxShadow: selected ? "0 4px 20px rgba(26,174,222,0.2)" : "none",
                          }}
                        >
                          {/* Type button */}
                          <button
                            type="button"
                            onClick={() => toggleVehicle(v.en)}
                            className="w-full flex items-center gap-3 px-4 py-3.5 text-[.88rem] font-semibold transition-colors"
                            style={{ color: selected ? "var(--white)" : "var(--gray)" }}
                          >
                            <span className="text-[1.1rem]">{v.icon}</span>
                            <span className="flex-1 text-left">{T(v)}</span>
                            {selected && (
                              <span className="text-[.7rem] font-bold text-[var(--blue)] bg-[rgba(26,174,222,0.15)] px-2 py-0.5 rounded-full">
                                ✓
                              </span>
                            )}
                          </button>

                          {/* Counter — only shows when selected */}
                          {selected && (
                            <div className="flex items-center justify-between px-4 pb-3 gap-2">
                              <span className="text-[.72rem] text-[var(--gray)]">
                                {T({ en: "How many?", es: "¿Cuántos?" })}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setVehicleCount(v.en, -1)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-[1rem] font-bold transition-colors"
                                  style={{ background: "rgba(26,174,222,0.15)", color: "var(--blue)" }}
                                >−</button>
                                <span className="D text-[1.4rem] text-[var(--white)] w-6 text-center leading-none">
                                  {count}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setVehicleCount(v.en, 1)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-[1rem] font-bold transition-colors"
                                  style={{ background: "rgba(26,174,222,0.15)", color: "var(--blue)" }}
                                >+</button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <button onClick={() => goTo(0)} className="btn btn-ghost flex-1 justify-center">
                  <ChevronLeft size={17} /> {T({ en: "Back", es: "Volver" })}
                </button>
                <button
                  onClick={() => canNext1 && goTo(2)}
                  className="btn btn-blue flex-1 justify-center"
                  style={{ opacity: canNext1 ? 1 : 0.35, cursor: canNext1 ? "pointer" : "not-allowed" }}
                >
                  {T({ en: "Continue", es: "Continuar" })} <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Date + Time + confirm */}
          {step === 2 && (() => {
            const DAYS_EN = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            const DAYS_ES = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
            const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const MONTHS_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
            const TIME_SLOTS = ["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];

            const y = calMonth.getFullYear();
            const m = calMonth.getMonth();
            const firstDay = new Date(y, m, 1).getDay();
            const daysInMonth = new Date(y, m + 1, 0).getDate();
            const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({length: daysInMonth}, (_,i) => i+1)];
            while (cells.length % 7 !== 0) cells.push(null);

            const selDate = form.date ? new Date(form.date + "T00:00:00") : null;
            const isSelected = (d: number) => selDate?.getFullYear() === y && selDate?.getMonth() === m && selDate?.getDate() === d;
            const isToday = (d: number) => today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;
            const isPast = (d: number) => new Date(y, m, d) < today;

            const selectDay = (d: number) => {
              if (isPast(d)) return;
              const mm = String(m + 1).padStart(2,"0");
              const dd = String(d).padStart(2,"0");
              setForm({ ...form, date: `${y}-${mm}-${dd}` });
            };

            const dayNames = T({ en: "x", es: "x" }) === "x" ? DAYS_EN : DAYS_ES;
            const monthName = (T({ en: "x", es: "x" }) === "x" ? MONTHS_EN : MONTHS_ES)[m];

            return (
              <div className="flex flex-col">
                {/* Title */}
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: "rgba(26,174,222,0.12)", border: "1px solid rgba(26,174,222,0.3)" }}>
                    <Check size={26} style={{ color: "var(--blue)" }} />
                  </div>
                  <div className="D text-[clamp(1.8rem,4vw,2.4rem)] text-[var(--white)]">
                    {T({ en: "Almost done!", es: "¡Casi listo!" })}
                  </div>
                  <p className="text-[var(--gray)] text-[.88rem] mt-2">
                    {T({ en: "Pick a date, time, and send", es: "Elige fecha, hora y envía" })}
                  </p>
                </div>

                <div className="flex flex-col gap-8">
                  {/* ── Custom Calendar ── */}
                  <div>
                    <label className="OL text-[.62rem] text-[var(--blue)] block mb-3">
                      {T({ en: "Preferred Date", es: "Fecha Preferida" })}
                    </label>
                    <div style={{ background: "rgba(26,174,222,0.05)", border: "1px solid rgba(26,174,222,0.18)", borderRadius: "20px", padding: "20px" }}>
                      {/* Month nav */}
                      <div className="flex items-center justify-between mb-5">
                        <button type="button"
                          onClick={() => setCalMonth(new Date(y, m - 1, 1))}
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[rgba(26,174,222,0.15)]"
                          style={{ color: "var(--blue)" }}>
                          <ChevronLeft size={18} />
                        </button>
                        <span className="D text-[1.3rem] text-[var(--white)]">{monthName} {y}</span>
                        <button type="button"
                          onClick={() => setCalMonth(new Date(y, m + 1, 1))}
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[rgba(26,174,222,0.15)]"
                          style={{ color: "var(--blue)" }}>
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      {/* Day headers */}
                      <div className="grid grid-cols-7 mb-2">
                        {DAYS_EN.map((d, i) => (
                          <div key={d} className="text-center text-[.65rem] font-bold tracking-wide pb-1"
                            style={{ color: i === 0 || i === 6 ? "rgba(26,174,222,0.45)" : "rgba(136,153,170,0.6)" }}>
                            {T({ en: DAYS_EN[i], es: DAYS_ES[i] })}
                          </div>
                        ))}
                      </div>

                      {/* Day cells */}
                      <div className="grid grid-cols-7 gap-y-1">
                        {cells.map((d, idx) => {
                          if (!d) return <div key={idx} />;
                          const past = isPast(d);
                          const sel = isSelected(d);
                          const tod = isToday(d);
                          return (
                            <button
                              key={idx}
                              type="button"
                              disabled={past}
                              onClick={() => selectDay(d)}
                              className="mx-auto w-9 h-9 rounded-full flex items-center justify-center text-[.88rem] font-semibold transition-all duration-150"
                              style={{
                                background: sel ? "var(--blue)" : tod ? "rgba(26,174,222,0.15)" : "transparent",
                                color: sel ? "#fff" : past ? "rgba(136,153,170,0.25)" : tod ? "var(--blue)" : "var(--white)",
                                boxShadow: sel ? "0 0 16px rgba(26,174,222,0.5)" : "none",
                                border: tod && !sel ? "1px solid rgba(26,174,222,0.4)" : "1px solid transparent",
                                cursor: past ? "not-allowed" : "pointer",
                                transform: sel ? "scale(1.1)" : "scale(1)",
                              }}
                            >{d}</button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* ── Time slots ── */}
                  <div>
                    <label className="OL text-[.62rem] text-[var(--blue)] block mb-3">
                      {T({ en: "Preferred Time", es: "Hora Preferida" })}
                    </label>
                    <div className="grid grid-cols-5 gap-1.5">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setForm({ ...form, time: slot })}
                          className="py-2 rounded-xl text-[.68rem] md:text-[.78rem] font-semibold text-center transition-all duration-150"
                          style={{
                            background: form.time === slot ? "var(--blue)" : "rgba(26,174,222,0.07)",
                            border: `1px solid ${form.time === slot ? "var(--blue)" : "rgba(26,174,222,0.18)"}`,
                            color: form.time === slot ? "#fff" : "var(--gray)",
                            boxShadow: form.time === slot ? "0 4px 14px rgba(26,174,222,0.3)" : "none",
                            transform: form.time === slot ? "scale(1.05)" : "scale(1)",
                          }}
                        >{slot}</button>
                      ))}
                    </div>
                  </div>

                  {/* ── Notes ── */}
                  <div>
                    <label className="OL text-[.62rem] text-[var(--blue)] block mb-2.5">
                      {T({ en: "Notes (optional)", es: "Notas (opcional)" })}
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={form.notes}
                      onChange={e => setForm({ ...form, notes: e.target.value })}
                      placeholder={T({ en: "Color, special requests, parking info...", es: "Color, peticiones especiales, estacionamiento..." })}
                      className="w-full bg-[rgba(26,174,222,0.06)] border border-[rgba(26,174,222,0.2)] rounded-2xl px-5 py-4 text-[var(--white)] placeholder-[var(--gray)] text-[.95rem] focus:outline-none focus:border-[var(--blue)] transition-colors resize-none"
                    />
                  </div>

                  {/* ── Summary card ── */}
                  <div style={{ background: "rgba(26,174,222,0.05)", border: "1px solid rgba(26,174,222,0.18)", borderRadius: "16px", padding: "18px 22px" }}>
                    <div className="OL text-[.58rem] text-[var(--blue)] mb-3">{T({ en: "Booking Summary", es: "Resumen de Reserva" })}</div>
                    <div className="flex flex-col gap-2.5">
                      {[
                        { label: { en: "Service",  es: "Servicio" },  val: form.service },
                        { label: { en: "Vehicles", es: "Vehículos" }, val: vehicleStr },
                        { label: { en: "Name",     es: "Nombre" },    val: form.name },
                        { label: { en: "Phone",    es: "Teléfono" },  val: form.phone },
                        ...(form.date ? [{ label: { en: "Date", es: "Fecha" }, val: form.date }] : []),
                        ...(form.time ? [{ label: { en: "Time", es: "Hora" },  val: form.time }] : []),
                      ].map(({ label, val }) => (
                        <div key={label.en} className="flex justify-between items-center">
                          <span className="text-[var(--gray)] text-[.83rem]">{T(label)}</span>
                          <span className="text-[var(--white)] text-[.88rem] font-semibold">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="mt-8 mb-4">
                  <button onClick={() => goTo(1)} className="btn btn-ghost w-full justify-center">
                    <ChevronLeft size={17} /> {T({ en: "Back", es: "Volver" })}
                  </button>
                </div>

                {/* Send options */}
                <div className="OL text-[.58rem] text-center mb-4">{T({ en: "Send your booking via", es: "Envía tu reserva por" })}</div>
                <div className="flex gap-4">
                  <button onClick={handleSubmit} className="btn flex-1 justify-center"
                    style={{ background: "#25D366", color: "#fff", boxShadow: "0 4px 30px rgba(37,211,102,.35)" }}>
                    <MessageCircle size={17} /> WhatsApp
                  </button>
                  <button onClick={handleSMS} className="btn flex-1 justify-center"
                    style={{ background: "var(--blue)", color: "#fff", boxShadow: "0 4px 30px rgba(26,174,222,.35)" }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    {T({ en: "Text Message", es: "Mensaje de Texto" })}
                  </button>
                </div>
                <p className="text-[.68rem] text-[var(--gray)] text-center mt-4 leading-relaxed">
                  {T({ en: "Both open with your details pre-filled. We'll confirm within 1 hour.", es: "Ambos abren con tus datos. Confirmamos en menos de 1 hora." })}
                </p>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── Contact info cards ── */}
      <div className="relative z-10 grid grid-cols-3 gap-3 w-full max-w-2xl mt-10 md:mt-16">
        {INFO.map(({ icon: Icon, label, value, href }) => {
          const inner = (
            <div className="gc p-4 md:p-7 flex flex-col items-center text-center gap-2 md:gap-4 hover:border-[rgba(26,174,222,.35)] transition-colors">
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-[rgba(26,174,222,.12)] flex items-center justify-center">
                <Icon size={16} className="text-[var(--blue)]" />
              </div>
              <div>
                <div className="OL text-[.52rem] md:text-[.58rem] mb-1">{T(label)}</div>
                <div className="text-[var(--white)] text-[.72rem] md:text-[.88rem] font-semibold leading-snug">{value}</div>
              </div>
            </div>
          );
          return href
            ? <a key={value} href={href}>{inner}</a>
            : <div key={value}>{inner}</div>;
        })}
      </div>
    </section>
  );
}
