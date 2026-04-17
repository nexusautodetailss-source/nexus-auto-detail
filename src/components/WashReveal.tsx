"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "@/lib/LangContext";
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

const CARS = [
  { dirty: "/anim1/dirty-final.png", clean: "/anim1/clean-final.png", label: "Porsche" },
  { dirty: "/anim2/dirty.png",       clean: "/anim2/clean.jpg",       label: "Traverse" },
];

interface WashProps {
  dirtyUrl: string;
  cleanUrl: string;
  label: string;
  onDone: () => void;
}

function WashCanvas({ dirtyUrl, cleanUrl, label, onDone }: WashProps) {
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress]   = useState(0);
  const [done, setDone]           = useState(false);
  const dirtyImgRef   = useRef<HTMLImageElement | null>(null);
  const totalPixels   = useRef(0); // only opaque pixels in the dirty image
  const isDrawing     = useRef(false);
  const particles     = useRef<{ x:number; y:number; vx:number; vy:number; life:number; r:number }[]>([]);
  const rafRef        = useRef<number>(0);
  const doneRef       = useRef(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = dirtyUrl;
    img.onload = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const dx = (canvas.width  - img.width  * scale) / 2;
      const dy = (canvas.height - img.height * scale) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale);
      dirtyImgRef.current = img;
      // Count only originally-opaque pixels (the actual car, not background)
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let opaque = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] > 30) opaque++;
      totalPixels.current = opaque || 1;
      setProgress(0);
      setDone(false);
      doneRef.current = false;
    };
  }, [dirtyUrl]);

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  // Particle loop
  useEffect(() => {
    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;
    const animate = () => {
      pCanvas.width  = pCanvas.offsetWidth;
      pCanvas.height = pCanvas.offsetHeight;
      const ctx = pCanvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      particles.current = particles.current.filter(p => p.life > 0);
      particles.current.forEach(p => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.25;
        p.life -= 4;
        const alpha = p.life / 100;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${alpha * 0.7})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const spawnParticles = (x: number, y: number) => {
    for (let i = 0; i < 12; i++) {
      particles.current.push({
        x, y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.9) * 6,
        life: 70 + Math.random() * 50,
        r: 2 + Math.random() * 3,
      });
    }
  };

  const erase = (cx: number, cy: number) => {
    const canvas = canvasRef.current;
    if (!canvas || doneRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width  / rect.width;
    const sy = canvas.height / rect.height;
    const x  = cx * sx;
    const y  = cy * sy;

    ctx.globalCompositeOperation = "destination-out";
    const r = 75; // bigger brush
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0,   "rgba(0,0,0,1)");
    grad.addColorStop(0.4, "rgba(0,0,0,0.9)");
    grad.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    spawnParticles(cx, cy);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    // Count pixels that were opaque and are now transparent (actually scrubbed)
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] < 30) cleared++;
    // Subtract original transparent background pixels
    const totalCanvas = canvas.width * canvas.height;
    const originalBg  = totalCanvas - totalPixels.current;
    const actuallyScrubbed = Math.max(0, cleared - originalBg);
    const pct = Math.min(100, Math.round((actuallyScrubbed / totalPixels.current) * 100));
    setProgress(pct);
    if (pct >= 80 && !doneRef.current) {
      doneRef.current = true;
      setDone(true);
      setTimeout(onDone, 1800);
    }
  };

  const handleMouseMove  = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    erase(e.clientX - rect.left, e.clientY - rect.top);
  };
  const handleTouchMove  = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = canvasRef.current!.getBoundingClientRect();
    erase(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
  };

  const reset = () => {
    const canvas = canvasRef.current;
    if (!canvas || !dirtyImgRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = dirtyImgRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const dx = (canvas.width  - img.width  * scale) / 2;
    const dy = (canvas.height - img.height * scale) / 2;
    ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale);
    particles.current = [];
    setProgress(0);
    setDone(false);
    doneRef.current = false;
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Label */}
      <div className="OL mb-4 text-[var(--white)]">{label}</div>

      {/* Canvas area — horizontal, no frame */}
      <div className="relative w-full" style={{ aspectRatio: "16/9", maxHeight: "65vh", minHeight: "220px" }}>
        {/* Clean image underneath */}
        <img
          src={cleanUrl}
          alt="clean"
          className="absolute inset-0 w-full h-full object-contain"
        />
        {/* Particle canvas */}
        <canvas
          ref={particleCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />
        {/* Dirty canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10"
          style={{ cursor: "none" }}
          onMouseMove={handleMouseMove}
          onMouseDown={e => { isDrawing.current = true; const rect = e.currentTarget.getBoundingClientRect(); erase(e.clientX - rect.left, e.clientY - rect.top); }}
          onMouseUp={() => { isDrawing.current = false; }}
          onMouseLeave={() => { isDrawing.current = false; }}
          onTouchMove={handleTouchMove}
          onTouchStart={e => { const rect = e.currentTarget.getBoundingClientRect(); erase(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top); }}
        />

        {/* Done badge */}
        {done && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <div className="gc px-8 py-4 text-center glow-blue">
              <div className="D text-[3rem] g-blue shimmer-text">SPOTLESS!</div>
            </div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mt-5 px-4">
        <div className="flex justify-between mb-2">
          <span className="text-[.72rem] font-bold tracking-[.2em] uppercase text-[var(--blue)]">
            {done ? "✓ Clean" : `${progress}% Clean`}
          </span>
          <button onClick={reset} className="text-[var(--gray)] hover:text-[var(--blue)] transition-colors flex items-center gap-1 text-[.72rem]">
            <RotateCcw size={12} /> Reset
          </button>
        </div>
        <div className="h-1.5 bg-[rgba(255,255,255,.08)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--blue)] to-[var(--cyan)] rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function WashReveal() {
  const { T } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0);

  const goTo = (i: number) => {
    setCurrent(i);
    setKey(k => k + 1);
  };
  const next = () => goTo((current + 1) % CARS.length);
  const prev = () => goTo((current - 1 + CARS.length) % CARS.length);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(sectionRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  const car = CARS[current];

  return (
    <section ref={sectionRef} className="relative overflow-hidden flex flex-col items-center px-4 md:px-[6vw] py-16 md:py-24" style={{ background: "rgba(6,16,32,0.88)", backdropFilter: "blur(2px)" }}>
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(26,174,222,0.07)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 text-center mb-12">
        <div className="OL mb-3">{T({ en: "Interactive Demo", es: "Demo Interactivo" })}</div>
        <h2 className="D text-[clamp(2.5rem,6vw,5rem)] text-[var(--white)]">
          {T({ en: "WITNESS THE TRANSFORMATION", es: "MIRA LA TRANSFORMACIÓN" })}
        </h2>
        <p className="text-[var(--gray)] mt-4 text-[1rem]">
          {T({ en: "Scrub the car to reveal the clean result", es: "Frota el auto para revelar el resultado limpio" })}
        </p>
      </div>

      {/* Single car with nav */}
      <div className="relative z-10 flex items-center gap-2 md:gap-5 w-full max-w-6xl mx-auto px-0">
        {/* Prev */}
        <button
          onClick={prev}
          className="flex-shrink-0 w-8 h-8 md:w-11 md:h-11 rounded-full gc flex items-center justify-center text-[var(--blue)] hover:bg-[rgba(26,174,222,.15)] transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Canvas */}
        <div className="flex-1">
          <WashCanvas
            key={key}
            dirtyUrl={car.dirty}
            cleanUrl={car.clean}
            label={car.label}
            onDone={next}
          />
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="flex-shrink-0 w-8 h-8 md:w-11 md:h-11 rounded-full gc flex items-center justify-center text-[var(--blue)] hover:bg-[rgba(26,174,222,.15)] transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dot navigation */}
      <div className="relative z-10 flex justify-center gap-3 mt-8">
        {CARS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300"
            style={{
              width: current === i ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: current === i ? "var(--blue)" : "rgba(26,174,222,0.3)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
