import { animate, motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = { speaking?: boolean; waving?: boolean; className?: string; compact?: boolean };

/** ADI — custom SVG robot with cursor-tracked eyes/head, blinking, waving and talking mouth. */
export function Robot({ speaking = false, waving = false, className = "", compact = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 14, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 14, mass: 0.6 });
  const headRot = useTransform(sx, [-1, 1], [-9, 9]);
  const headX = useTransform(sx, [-1, 1], [-6, 6]);
  const headY = useTransform(sy, [-1, 1], [-4, 4]);
  const eyeX = useTransform(sx, [-1, 1], [-9, 9]);
  const eyeY = useTransform(sy, [-1, 1], [-6, 6]);
  const bodyRot = useTransform(sx, [-1, 1], [-3, 3]);
  const [blink, setBlink] = useState(false);
  const [mouth, setMouth] = useState(0);
  const [happy, setHappy] = useState(false);
  const [armAngle, setArmAngle] = useState(0);
  useEffect(() => {
    if (!waving || reduce) return;
    const c = animate(0, [0, -150, -122, -150, -122, -150, 0], { duration: 3, ease: "easeInOut", times: [0, 0.18, 0.32, 0.46, 0.6, 0.78, 1], onUpdate: setArmAngle });
    return () => c.stop();
  }, [waving, reduce]);

  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.35;
      mx.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))));
      my.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my, reduce]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        loop();
      }, 2200 + Math.random() * 2800);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!speaking) { setMouth(0); return; }
    const i = setInterval(() => setMouth(0.25 + Math.random() * 0.75), 110);
    return () => clearInterval(i);
  }, [speaking]);

  const eyeH = blink ? 2 : happy ? 10 : 30;

  return (
    <div
      ref={ref}
      className={`relative select-none ${className}`}
      onPointerEnter={() => setHappy(true)}
      onPointerLeave={() => setHappy(false)}
      role="img"
      aria-label="ADI, a friendly white and graphite robot with glowing cyan eyes"
    >
      {!compact && (
        <>
          <div className="absolute left-1/2 top-[38%] -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-[2%] left-1/2 h-6 w-[45%] -translate-x-1/2 rounded-full bg-primary/25 blur-xl" />
        </>
      )}
      <motion.svg viewBox="0 0 400 480" className={`h-full w-full ${reduce ? "" : "animate-float"}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="ceramic" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="oklch(0.99 0.004 240)" />
            <stop offset="0.6" stopColor="oklch(0.9 0.012 240)" />
            <stop offset="1" stopColor="oklch(0.72 0.02 245)" />
          </linearGradient>
          <linearGradient id="visor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="oklch(0.24 0.04 258)" />
            <stop offset="1" stopColor="oklch(0.1 0.02 260)" />
          </linearGradient>
          <linearGradient id="graphite" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="oklch(0.34 0.025 258)" />
            <stop offset="1" stopColor="oklch(0.16 0.02 260)" />
          </linearGradient>
          <radialGradient id="core">
            <stop offset="0" stopColor="oklch(0.97 0.06 210)" />
            <stop offset="0.45" stopColor="oklch(0.82 0.14 210)" />
            <stop offset="1" stopColor="oklch(0.82 0.14 210 / 0)" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* holo ring */}
        {!compact && (
          <g opacity="0.55">
            <ellipse cx="200" cy="455" rx="120" ry="16" fill="none" stroke="oklch(0.82 0.14 210)" strokeWidth="1.5" strokeDasharray="4 8" />
            <ellipse cx="200" cy="455" rx="80" ry="9" fill="none" stroke="oklch(0.68 0.16 290)" strokeWidth="1" />
          </g>
        )}

        <motion.g style={{ rotate: bodyRot, originX: "200px", originY: "420px" }}>
          {/* left arm (static) */}
          <g>
            <rect x="92" y="282" width="34" height="92" rx="17" fill="url(#graphite)" />
            <circle cx="109" cy="290" r="14" fill="url(#ceramic)" />
            <g>
              <rect x="88" y="368" width="42" height="34" rx="15" fill="url(#ceramic)" />
              <rect x="118" y="396" width="9" height="16" rx="4.5" fill="url(#ceramic)" />
              <rect x="106" y="398" width="9" height="18" rx="4.5" fill="url(#ceramic)" />
              <rect x="94" y="396" width="9" height="16" rx="4.5" fill="url(#ceramic)" />
              <rect x="85" y="374" width="9" height="16" rx="4.5" fill="url(#ceramic)" transform="rotate(25 90 382)" />
              <rect x="94" y="372" width="30" height="3" rx="1.5" fill="oklch(0.82 0.14 210)" opacity="0.7" />
            </g>
          </g>

          {/* torso */}
          <path d="M130 270 Q200 250 270 270 L262 392 Q200 420 138 392 Z" fill="url(#ceramic)" />
          <path d="M150 286 Q200 272 250 286 L244 372 Q200 390 156 372 Z" fill="url(#visor)" />
          <circle cx="200" cy="328" r="34" fill="url(#core)" opacity={speaking ? 1 : 0.7} />
          <circle cx="200" cy="328" r="12" fill="oklch(0.95 0.07 210)" filter="url(#glow)" />
          <circle cx="200" cy="328" r="22" fill="none" stroke="oklch(0.82 0.14 210)" strokeWidth="1.5" strokeDasharray="3 5" />
          <rect x="176" y="402" width="48" height="36" rx="10" fill="url(#graphite)" />

          {/* neck */}
          <rect x="182" y="238" width="36" height="28" rx="8" fill="url(#graphite)" />

          {/* head */}
          <motion.g style={{ x: headX, y: headY, rotate: headRot, originX: "200px", originY: "240px" }}>
            {/* antenna */}
            <line x1="200" y1="62" x2="200" y2="30" stroke="oklch(0.34 0.025 258)" strokeWidth="5" strokeLinecap="round" />
            <motion.circle cx="200" cy="24" r="9" fill="oklch(0.82 0.14 210)" filter="url(#glow)"
              animate={reduce ? {} : { opacity: [1, 0.35, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
            {/* ears */}
            <rect x="72" y="128" width="30" height="70" rx="14" fill="url(#graphite)" />
            <rect x="298" y="128" width="30" height="70" rx="14" fill="url(#graphite)" />
            <rect x="80" y="150" width="6" height="26" rx="3" fill="oklch(0.82 0.14 210)" opacity="0.8" />
            <rect x="314" y="150" width="6" height="26" rx="3" fill="oklch(0.82 0.14 210)" opacity="0.8" />
            {/* shell */}
            <rect x="90" y="60" width="220" height="180" rx="78" fill="url(#ceramic)" />
            <path d="M120 82 Q200 58 280 82" stroke="oklch(1 0 0 / 0.9)" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7" />
            {/* visor */}
            <rect x="112" y="98" width="176" height="118" rx="56" fill="url(#visor)" />
            <rect x="112" y="98" width="176" height="118" rx="56" fill="none" stroke="oklch(0.82 0.14 210 / 0.35)" strokeWidth="2" />
            {/* eyes */}
            <motion.g style={{ x: eyeX, y: eyeY }} filter="url(#glow)">
              {happy && !blink ? (
                <>
                  <path d="M146 158 Q163 138 180 158" stroke="oklch(0.88 0.13 210)" strokeWidth="9" fill="none" strokeLinecap="round" />
                  <path d="M220 158 Q237 138 254 158" stroke="oklch(0.88 0.13 210)" strokeWidth="9" fill="none" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <rect x="149" y={150 - eyeH / 2} width="28" height={eyeH} rx="12" fill="oklch(0.88 0.13 210)" />
                  <rect x="223" y={150 - eyeH / 2} width="28" height={eyeH} rx="12" fill="oklch(0.88 0.13 210)" />
                </>
              )}
              {/* mouth */}
              <rect x={200 - 14 - mouth * 6} y={190 - mouth * 5} width={28 + mouth * 12} height={4 + mouth * 10} rx="5"
                fill="oklch(0.82 0.14 210)" opacity={speaking ? 0.95 : 0.6} />
            </motion.g>
            {/* cheeks */}
            <ellipse cx="132" cy="190" rx="10" ry="5" fill="oklch(0.68 0.16 290)" opacity={happy ? 0.6 : 0.25} />
            <ellipse cx="268" cy="190" rx="10" ry="5" fill="oklch(0.68 0.16 290)" opacity={happy ? 0.6 : 0.25} />
          </motion.g>
          {/* right arm — waves (SVG-native rotation pivots exactly at the shoulder) */}
          <g transform={`rotate(${armAngle} 291 290)`}>
                        <rect x="274" y="282" width="34" height="92" rx="17" fill="url(#graphite)" />
            <circle cx="291" cy="290" r="15" fill="url(#ceramic)" />
            <g>
              <rect x="270" y="368" width="42" height="34" rx="15" fill="url(#ceramic)" />
              <rect x="273" y="396" width="9" height="16" rx="4.5" fill="url(#ceramic)" />
              <rect x="285" y="398" width="9" height="18" rx="4.5" fill="url(#ceramic)" />
              <rect x="297" y="396" width="9" height="16" rx="4.5" fill="url(#ceramic)" />
              <rect x="306" y="374" width="9" height="16" rx="4.5" fill="url(#ceramic)" transform="rotate(-25 310 382)" />
              <rect x="276" y="372" width="30" height="3" rx="1.5" fill="oklch(0.82 0.14 210)" opacity="0.7" />
            </g>
          </g>
        </motion.g>
      </motion.svg>
    </div>
  );
}
