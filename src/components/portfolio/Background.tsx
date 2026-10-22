import { RoboticLayer } from "./RoboticLayer";
import { useEffect, useRef } from "react";

/** Low-density particle field that gently reacts to the cursor, plus a soft cursor spotlight. */
export function Background() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const dpr = Math.min(devicePixelRatio, 2);
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const count = innerWidth < 768 ? 35 : 80;
    const pts = Array.from({ length: count }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, r: Math.random() * 1.4 + 0.4 }));
    const resize = () => { w = innerWidth; h = innerHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    pts.forEach((p) => { p.x *= w; p.y *= h; });
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      if (glow.current) glow.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 140 && d > 0) { p.x += (dx / d) * 1.2; p.y += (dy / d) * 1.2; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(120, 220, 255, 0.55)"; ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i]!, b = pts[j]!, d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) { ctx.strokeStyle = `rgba(110, 200, 255, ${0.12 * (1 - d / 110)})`; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    const onVis = () => { if (!document.hidden && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } };
    addEventListener("resize", resize);
    if (fine) addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    reduce ? draw() : (raf = requestAnimationFrame(draw));
    if (reduce) cancelAnimationFrame(raf);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("pointermove", onMove); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-primary-glow/15 blur-[120px]" />
      <div className="absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full bg-violet/12 blur-[130px]" />
      <RoboticLayer />
      <canvas ref={canvas} className="absolute inset-0" />
      <div ref={glow} className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-primary/[0.07] blur-3xl transition-transform duration-200 ease-out" />
    </div>
  );
}
