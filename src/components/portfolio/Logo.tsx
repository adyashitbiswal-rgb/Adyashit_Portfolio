export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lg-ab" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.88 0.12 205)" />
          <stop offset="0.6" stopColor="oklch(0.72 0.16 235)" />
          <stop offset="1" stopColor="oklch(0.68 0.16 290)" />
        </linearGradient>
      </defs>
      <path d="M24 2 L44 13 V35 L24 46 L4 35 V13 Z" fill="oklch(0.16 0.03 260)" stroke="url(#lg-ab)" strokeWidth="2" />
      <path d="M14 33 L21 15 H25 L32 33 M16.8 26.5 H29.2" fill="none" stroke="url(#lg-ab)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="35" cy="15" r="2.4" fill="oklch(0.88 0.12 205)" />
    </svg>
  );
}
