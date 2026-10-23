import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/portfolio-data";
import { SectionHeader, Reveal } from "./Reveal";

const commands: Record<string, string[]> = {
  help: ["Available commands:", "  about · skills · projects · achievements · education · contact · clear"],
  about: ["Adyashit Biswal — CSIT undergraduate, AI/ML enthusiast & full-stack developer.", "Based in Angul, Odisha, India."],
  skills: ["Programming : Python, C, Java, SQL", "Web         : HTML5, CSS3, JavaScript, React, Node.js, FastAPI", "AI/ML       : Supervised Learning, Image Processing, Model Evaluation", "Tools       : Git, GitHub, VS Code, MySQL, PostgreSQL"],
  projects: ["Three featured projects are available:", "  01 Deepfake Detection System", "  02 AI-Powered Diet Planner", "  03 AI Career Copilot  ★ flagship"],
  achievements: ["◆ AI Internship — IBM SkillsBuild (AICTE)", "◆ Coursera: Data Structures in C · Programming in Python", "  HTML & CSS in Depth · ML Introduction for Everyone"],
  education: ["B.Tech CSIT · GITA · 2023–Present · CGPA 8.0", "Higher Secondary · Mayadhar HSS · 62%", "Secondary · Saraswati Sishu Vidya Mandir · 68.33%"],
  contact: [`email    ${profile.email}`, `phone    ${profile.phone}`, `github   ${profile.github}`, `linkedin ${profile.linkedin}`],
};

type Line = { kind: "in" | "out" | "err"; text: string };

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: "ADI shell v1.0 — portfolio commands only. Type 'help' to begin." }]);
  const [value, setValue] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight }); }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHist((h) => [cmd, ...h]); setHi(-1);
    if (cmd === "clear") return setLines([]);
    const out = commands[cmd];
    setLines((l) => [...l, { kind: "in", text: cmd }, ...(out ? out.map((t) => ({ kind: "out" as const, text: t })) : [{ kind: "err" as const, text: `command not found: ${cmd} — try 'help'` }])]);
  };

  return (
    <section id="terminal" className="mx-auto max-w-5xl px-5 py-28 md:px-8">
      <SectionHeader eyebrow="Terminal · Interactive" title={<>Inside the <span className="text-gradient">developer's mind.</span></>} />
      <Reveal>
        <div className="glass overflow-hidden rounded-2xl shadow-glow" onClick={() => input.current?.focus()}>
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-destructive/80" /><span className="h-3 w-3 rounded-full bg-chart-4" style={{ background: "oklch(0.82 0.16 85)" }} /><span className="h-3 w-3 rounded-full bg-success" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">adyashit@portfolio: ~</span>
          </div>
          <div ref={box} className="h-80 overflow-y-auto p-5 font-mono text-sm" role="log" aria-live="polite">
            {lines.map((l, i) => (
              <div key={i} className={l.kind === "err" ? "text-destructive" : l.kind === "in" ? "text-foreground" : "text-muted-foreground"} style={{ whiteSpace: "pre-wrap" }}>
                {l.kind === "in" && <span className="text-primary">$ </span>}{l.text}
              </div>
            ))}
            <form onSubmit={(e) => { e.preventDefault(); run(value); setValue(""); }} className="flex items-center">
              <span className="text-primary">$&nbsp;</span>
              <input ref={input} value={value} onChange={(e) => setValue(e.target.value)} aria-label="Terminal command" autoComplete="off" spellCheck={false}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp" && hist.length) { e.preventDefault(); const n = Math.min(hi + 1, hist.length - 1); setHi(n); setValue(hist[n] ?? ""); }
                  if (e.key === "ArrowDown") { e.preventDefault(); const n = hi - 1; setHi(n); setValue(n >= 0 ? (hist[n] ?? "") : ""); }
                }}
                className="flex-1 bg-transparent text-foreground caret-primary outline-none focus-visible:outline-none" />
            </form>
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-3">
            {Object.keys(commands).concat("clear").map((c) => <button key={c} onClick={() => run(c)} className="rounded-md border border-border px-2 py-1 font-mono text-xs text-muted-foreground hover:border-primary/50 hover:text-primary">{c}</button>)}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
