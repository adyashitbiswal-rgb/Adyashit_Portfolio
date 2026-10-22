/** Decorative robotic background: circuit traces with travelling pulses, rotating HUD rings and a scan beam. */
const traces = [
  "M0 120 H180 L220 160 H420 L460 120 H700",
  "M1440 220 H1240 L1200 260 H980 L940 300 H760",
  "M0 640 H140 L190 590 H380 L420 630 H560",
  "M1440 760 H1300 L1250 710 H1080 L1040 750 H880",
  "M260 900 V780 L300 740 V600",
  "M1180 0 V140 L1140 180 V320",
];

export function RoboticLayer() {
  return (
    <div aria-hidden className="absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="pulse">
            <stop offset="0" stopColor="oklch(0.95 0.08 210)" />
            <stop offset="1" stopColor="oklch(0.82 0.14 210 / 0)" />
          </radialGradient>
        </defs>
        {traces.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="oklch(0.82 0.14 210 / 0.14)" strokeWidth="1.2" />
            <path d={d} fill="none" stroke="oklch(0.82 0.14 210 / 0.7)" strokeWidth="1.6" strokeLinecap="round"
              strokeDasharray="40 1400" className="robo-flow" style={{ animationDelay: `${i * 1.3}s`, animationDuration: `${6 + (i % 3) * 2}s` }} />
            <circle r="4" fill="url(#pulse)">
              <animateMotion dur={`${7 + i}s`} repeatCount="indefinite" path={d} begin={`${i * 0.8}s`} />
            </circle>
          </g>
        ))}
        {/* nodes */}
        {[[220, 160], [460, 120], [1200, 260], [940, 300], [190, 590], [1250, 710], [300, 740], [1140, 180]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3.5" fill="oklch(0.82 0.14 210)" opacity="0.8" />
            <circle cx={x} cy={y} r="3.5" fill="none" stroke="oklch(0.82 0.14 210)" className="robo-ping" style={{ animationDelay: `${i * 0.7}s` }} />
          </g>
        ))}
      </svg>

      {/* HUD rings */}
      <div className="absolute -right-32 top-24 h-[420px] w-[420px] opacity-40">
        <div className="absolute inset-0 rounded-full border border-dashed border-primary/40 animate-spin-slow" />
        <div className="absolute inset-10 rounded-full border border-primary/25 robo-spin-rev" style={{ borderTopColor: "transparent", borderBottomColor: "transparent" }} />
        <div className="absolute inset-24 rounded-full border-2 border-violet/30 animate-spin-slow" style={{ borderLeftColor: "transparent" }} />
        <div className="absolute inset-[45%] rounded-full bg-primary/60 blur-sm" />
      </div>
      <div className="absolute -left-24 bottom-10 h-[300px] w-[300px] opacity-30">
        <div className="absolute inset-0 rounded-full border border-primary/40 robo-spin-rev" style={{ borderRightColor: "transparent" }} />
        <div className="absolute inset-8 rounded-full border border-dashed border-primary/30 animate-spin-slow" />
      </div>

      {/* scan beam */}
      <div className="robo-scan absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-primary/[0.06] to-transparent" />
    </div>
  );
}
