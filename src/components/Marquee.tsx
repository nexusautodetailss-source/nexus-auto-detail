"use client";

const CONTENT = [
  "★ BEST OF GWINNETT",
  "2011", "·", "2013", "·", "2015", "·", "2017", "·", "2018", "·", "2019", "·", "2020", "·", "2024", "·", "2025",
  "✦ LAWRENCEVILLE GA",
  "✦ WE COME TO YOU",
  "✦ 40 MILES SERVICE RADIUS",
  "✦ 14+ YEARS",
  "★ NEXUS AUTO DETAIL",
];

export default function Marquee() {
  const repeated = [...CONTENT, ...CONTENT];

  return (
    <div className="relative w-full overflow-hidden border-y border-[rgba(26,174,222,.25)] bg-[rgba(6,16,32,0.82)] py-4" style={{ backdropFilter: "blur(4px)" }}>
      <div className="marq-inner">
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`flex-shrink-0 px-4 text-[.72rem] font-extrabold tracking-[.35em] uppercase ${
              item.startsWith("★") || item.startsWith("✦")
                ? "text-[var(--hot)]"
                : item === "·"
                ? "text-[var(--orange)]"
                : item.match(/^\d{4}$/)
                ? "text-[var(--white)]"
                : "text-[var(--blue)]"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
