import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Github, Pause, Play, RotateCcw, SkipForward, Volume2, VolumeX, Rocket, BrainCircuit, BarChart3 } from "lucide-react";
import { SiPython, SiReact, SiFastapi, SiMysql } from "react-icons/si";
import { intents, profile } from "@/lib/portfolio-data";
import { Robot } from "./Robot";
import { useGuide, scrollToSection } from "@/components/portfolio/GuideContext";

const chips = [
  { icon: SiPython, label: "Python" },
  { icon: SiReact, label: "React" },
  { icon: SiFastapi, label: "FastAPI" },
  { icon: SiMysql, label: "MySQL" },
];

export function Hero({ ready }: { ready: boolean }) {
  const g = useGuide();
  useEffect(() => { if (!ready) return; const t = setTimeout(g.start, 900); return () => clearTimeout(t); }, [ready]); // eslint-disable-line

  const fade = (i: number) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const } });
  const contacts = [
    { icon: Phone, text: profile.phone, href: profile.phoneHref },
    { icon: Mail, text: profile.email, href: `mailto:${profile.email}` },
    { icon: Linkedin, text: "linkedin.com/in/adyashitbiswal-060853367", href: profile.linkedin },
    { icon: Github, text: "github.com/adyashitbiswal-rgb", href: profile.github },
    { icon: MapPin, text: profile.location },
  ];

  return (
    <section id="home" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-5 pb-16 pt-24 md:px-8 lg:grid-cols-[1fr_1.05fr]">
      {/* ROBOT STAGE */}
      <div className="relative flex min-h-[560px] flex-col items-center justify-center">
        {/* speech bubble */}
        <AnimatePresence>
          {g.text && (
            <motion.div key="bubble" initial={{ opacity: 0, scale: 0.85, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: -3 }} exit={{ opacity: 0 }}
              className="absolute left-0 top-0 z-20 w-[min(86vw,300px)] rounded-2xl border-2 border-primary/60 bg-popover/90 p-4 shadow-glow backdrop-blur" aria-live="polite">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-primary">{g.mode === "intro" ? `Intro ${g.lineIndex + 1}/${g.total}` : "AI avatar"}</p>
              <p className="min-h-[4.5em] font-display text-[15px] font-semibold leading-snug">{g.typed}{g.speaking && <span className="animate-caret text-primary">▍</span>}</p>
              <span className="absolute -bottom-3 right-10 h-5 w-5 rotate-45 border-b-2 border-r-2 border-primary/60 bg-popover" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* tech chips */}
        <div className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/4 flex-col gap-3 sm:flex">
          {chips.map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, x: -30 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1 + i * 0.12 }}
              whileHover={{ x: 6, scale: 1.05 }}
              className="flex w-32 items-center gap-2.5 rounded-xl border border-primary/40 bg-popover/70 px-3 py-2 text-sm shadow-glow backdrop-blur">
              <c.icon className="h-4 w-4 text-primary" /> {c.label}
            </motion.div>
          ))}
        </div>

        {/* holo cards */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.3 }}
          className="absolute right-0 top-16 z-10 hidden -rotate-3 rounded-xl border border-primary/50 bg-primary/10 p-3 backdrop-blur sm:block animate-float">
          <p className="font-display text-sm font-bold leading-tight">Build<br />Innovate<br />Create</p>
          <Rocket className="absolute -right-2 -top-2 h-5 w-5 text-primary" />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.5 }}
          className="absolute bottom-40 right-0 z-10 hidden items-center gap-2 rounded-xl border border-primary/50 bg-primary/10 p-3 backdrop-blur sm:flex">
          <BrainCircuit className="h-7 w-7 text-primary" /><BarChart3 className="h-6 w-6 text-primary" /><span className="font-mono text-sm">AI/ML</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -120, scale: 0.8 }} animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ type: "spring", stiffness: 55, damping: 12, delay: 0.2 }} className="relative mt-24">
          <Robot speaking={g.speaking} waving={g.waving} className="h-[340px] w-[290px] sm:h-[420px] sm:w-[360px]" />
          {/* platform */}
          <div className="absolute -bottom-2 left-1/2 h-10 w-[85%] -translate-x-1/2 rounded-[50%] border-2 border-primary/70 bg-primary/10 shadow-glow" />
          <div className="absolute -bottom-4 left-1/2 h-12 w-[100%] -translate-x-1/2 rounded-[50%] border border-primary/30 animate-pulse" />
        </motion.div>

        {/* controls */}
        <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.2 }} className="mt-8 flex items-center gap-1 rounded-full border border-border bg-card/60 p-1 backdrop-blur">
          <CtrlBtn label={g.paused ? "Resume" : "Pause"} onClick={g.togglePause}>{g.paused ? <Play size={15} /> : <Pause size={15} />}</CtrlBtn>
          <CtrlBtn label="Skip dialogue" onClick={g.skip}><SkipForward size={15} /></CtrlBtn>
          <CtrlBtn label="Replay introduction" onClick={g.start}><RotateCcw size={15} /></CtrlBtn>
          {g.ttsSupported && <CtrlBtn label={g.muted ? "Enable voice" : "Mute voice"} onClick={g.toggleMute}>{g.muted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-primary" />}</CtrlBtn>}
        </motion.div>
        <div className="mt-3 flex max-w-md flex-wrap justify-center gap-1.5">
          {intents.map((i) => (
            <button key={i.id} onClick={() => g.ask(i.id)} className="rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary">{i.label}</button>
          ))}
        </div>
      </div>

      {/* TEXT */}
      <div className="relative">
        <motion.span {...fade(0)} className="inline-block rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm">Computer Science Student</motion.span>
        <motion.h1 {...fade(1)} className="mt-5 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl xl:text-7xl">
          Adyashit <span className="text-gradient">Biswal</span>
        </motion.h1>
        <motion.p {...fade(2)} className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold uppercase tracking-wide text-foreground/90 md:text-base">
          <span>Computer Science Student</span><span className="text-primary">|</span><span>AI/ML Enthusiast</span><span className="text-primary">|</span><span>Full-Stack Developer</span>
        </motion.p>
        <motion.ul {...fade(3)} className="mt-8 space-y-3.5">
          {contacts.map((c) => (
            <li key={c.text}>
              {c.href ? (
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-4 text-muted-foreground transition-colors hover:text-foreground">
                  <c.icon className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:scale-125" /><span className="break-all">{c.text}</span>
                </a>
              ) : (
                <span className="flex items-center gap-4 text-muted-foreground"><c.icon className="h-5 w-5 text-primary" />{c.text}</span>
              )}
            </li>
          ))}
        </motion.ul>
        <motion.div {...fade(4)} className="mt-9 flex flex-wrap gap-3">
          <button onClick={() => scrollToSection("projects")} className="group inline-flex items-center gap-3 rounded-full bg-gradient-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
            Explore My Work <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button onClick={() => scrollToSection("contact")} className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-7 py-3.5 font-semibold transition-colors hover:bg-primary/10">
            <Mail size={18} /> Contact Me
          </button>
        </motion.div>
        <motion.p {...fade(5)} className="pointer-events-none mt-8 -rotate-6 text-right font-hand text-3xl leading-tight text-primary lg:absolute lg:-right-2 lg:top-1/2 lg:mt-0">
          Turning<br />Ideas into<br />Real Solutions
          <svg viewBox="0 0 200 20" className="ml-auto h-4 w-44"><path d="M2 15 Q100 0 198 8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" /></svg>
        </motion.p>
      </div>
    </section>
  );
}

function CtrlBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} aria-label={label} title={label} className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">{children}</button>;
}
