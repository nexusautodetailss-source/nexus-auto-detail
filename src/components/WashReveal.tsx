"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "@/lib/LangContext";
import { RotateCcw } from "lucide-react";

interface WashProps {
  dirtyUrl: string;
  cleanUrl: string;
  label: string;
}

function WashCanvas({ dirtyUrl, cleanUrl, label }: WashProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const dirtyImgRef = useRef<HTMLImageElement | null>(null);
  const totalPixels = useRef(0);
  const clearedPixels = useRef(0);
  const isDrawing = useRef(false);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; r: number }[]>([]);
  const rafRef = useRef<number>(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = dirtyUrl;
    img.onload = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      dirtyImgRef.current = img;
      totalPixels.current = canvas.width * canvas.height;
      clearedPixels.current = 0;
      setProgress(0);
      setDone(false);
    };
  }, [dirtyUrl]);

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  // Particle animation loop
  useEffect(() => {
    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;
    const animate = () => {
      pCanvas.width = pCanvas.offsetWidth;
      pCanvas.height = pCanvas.offsetHeight;
      const ctx = pCanvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      particles.current = particles.current.filter(p => p.life > 0);
      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3;
        p.life -= 3;
        const alpha = p.life / 100;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${alpha * 0.6})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const spawnParticles = (x: number, y: number) => {
    for (let i = 0; i < 8; i++) {
      particles.current.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.8) * 5,
        life: 80 + Math.random() * 40,
        r: 1.5 + Math.random() * 2.5,
      });
    }
  };

  const erase = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || done) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    let cx: number, cy: number;
    if ("touches" in e) {
      cx = e.touches[0].clientX - rect.left;
      cy = e.touches[0].clientY - rect.top;
    } else {
      cx = e.clientX - rect.left;
      cy = e.clientY - rect.top;
    }
    // Scale to canvas coords
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = cx * scaleX;
    const y = cy * scaleY;

    ctx.globalCompositeOperation = "destination-out";
    const r = 50;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, "rgba(0,0,0,1)");
    grad.addColorStop(0.5, "rgba(0,0,0,0.8)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    spawnParticles(cx, cy);

    // Count transparent pixels
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) cleared++;
    }
    const pct = Math.round((cleared / totalPixels.current) * 100);
    setProgress(pct);
    if (pct >= 85) setDone(true);
  };

  const reset = () => {
    const canvas = canvasRef.current;
    if (!canvas || !dirtyImgRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(dirtyImgRef.current, 0, 0, canvas.width, canvas.height);
    clearedPixels.current = 0;
    setProgress(0);
    setDone(false);
    particles.current = [];
  };

  return (
    <div className="relative flex-1 min-h-[280px] sm:min-h-[380px] rounded-2xl overflow-hidden border border-[var(--border)] group">
      {/* Clean image beneath */}
      <img src={cleanUrl} alt="clean" className="absolute inset-0 w-full h-full object-cover" />

      {/* Particle canvas */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Dirty canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 cursor-none"
        onMouseMove={(e) => isDrawing.current && erase(e)}
        onMouseDown={(e) => { isDrawing.current = true; erase(e); }}
        onMouseUp={() => { isDrawing.current = false; }}
        onMouseLeave={() => { isDrawing.current = false; }}
        onTouchMove={erase}
        onTouchStart={erase}
      />

      {/* Label */}
      <div className="absolute top-4 left-4 z-30 OL text-[var(--white)]">{label}</div>

      {/* Progress */}
      <div className="absolute bottom-4 left-4 right-4 z-30">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[.68rem] font-bold tracking-[.2em] text-[var(--blue)] uppercase">
            {done ? "✓ Spotless!" : `${progress}% Clean`}
          </span>
          <button onClick={reset} className="text-[var(--gray)] hover:text-[var(--blue)] transition-colors">
            <RotateCcw size={14} />
          </button>
        </div>
        <div className="h-1.5 bg-[rgba(255,255,255,.1)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--blue)] to-[var(--cyan)] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Done badge */}
      {done && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="gc px-6 py-3 text-center glow-blue animate-bounce">
            <div className="D text-[2rem] g-blue">SPOTLESS!</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WashReveal() {
  const { T } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const titleEl = sectionRef.current?.querySelector(".wash-title") ?? null;
        if (titleEl) {
          gsap.fromTo(titleEl,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
          );
        }
      });
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="S bg-[var(--navy2)] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(26,174,222,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="wash-title text-center mb-12 relative z-10">
        <div className="OL mb-3">{T({ en: "Interactive Demo", es: "Demo Interactivo" })}</div>
        <h2 className="D text-[clamp(2.5rem,6vw,5rem)] text-[var(--white)]">
          {T({ en: "WITNESS THE TRANSFORMATION", es: "MIRA LA TRANSFORMACIÓN" })}
        </h2>
        <p className="text-[var(--gray)] mt-4">
          {T({ en: "Scrub to reveal the clean car beneath", es: "Frota para revelar el auto limpio" })}
        </p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-6">
        <WashCanvas
          dirtyUrl="/anim1/dirty.png"
          cleanUrl="/anim1/clean.png"
          label="Porsche"
        />
        <WashCanvas
          dirtyUrl="/anim2/dirty.png"
          cleanUrl="/anim2/clean.jpg"
          label="Traverse"
        />
      </div>
    </section>
  );
}
