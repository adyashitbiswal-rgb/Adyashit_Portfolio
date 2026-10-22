import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Brain, Code2, GraduationCap, BookOpen, ScanFace, Layers, Gauge, Cpu, Sparkles, Puzzle, Users, Clock, Rocket, Award, Star, ArrowUpRight, Github, ExternalLink, Flag } from "lucide-react";
import { SiPython, SiC, SiMysql, SiHtml5, SiCss, SiJavascript, SiReact, SiNodedotjs, SiFastapi, SiGit, SiGithub, SiCplusplus, SiPostgresql, SiCoursera } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import type { IconType } from "react-icons";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { projects, certifications, education, type Project } from "@/lib/portfolio-data";
import { Reveal, SectionHeader, spot } from "./Reveal";
import photo from "@/assets/adyashit.jpg";

/* ---------------- ABOUT ---------------- */
const pillars = [
  { icon: Brain, title: "AI & Machine Learning", text: "Exploring intelligent systems, image processing and applied machine learning." },
  { icon: Code2, title: "Full-Stack Engineering", text: "Building modern interfaces and connecting them with practical backend services." },
  { icon: BookOpen, title: "Continuous Learning", text: "Strengthening programming fundamentals and learning by building real projects." },
];
const journey = [
  { y: "2020–23", t: "School foundations", d: "Science & curiosity in Talcher and Bhubaneswar." },
  { y: "2023", t: "Started B.Tech CSIT", d: "Python, C, Java and data structures." },
  { y: "2024", t: "Into AI/ML", d: "Deepfake detection & diet recommendation projects." },
  { y: "2025+", t: "Full-stack AI", d: "Shipped AI Career Copilot with LLM APIs." },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-28 md:px-8">
      <SectionHeader eyebrow="About · The human behind the code" title={<>Curiosity is my starting point. <span className="text-gradient">Code is my canvas.</span></>} />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="group relative mx-auto w-52 shrink-0 sm:mx-0">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-primary opacity-60 blur-md transition-opacity group-hover:opacity-100" />
            <div className="relative overflow-hidden rounded-3xl border border-primary/40">
              <img src={photo} alt="Portrait of Adyashit Biswal" width={1024} height={1024} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3">
                <p className="font-display text-sm font-bold">Adyashit Biswal</p>
                <p className="font-mono text-[10px] text-primary">CSIT · AI/ML · Full-Stack</p>
              </div>
            </div>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm <span className="text-foreground">Adyashit Biswal</span>, a Computer Science and Information Technology undergraduate with a strong interest in artificial intelligence, machine learning and full-stack development. I enjoy exploring how intelligent systems work and transforming ideas into practical applications. Through projects ranging from deepfake detection to personalized recommendations and AI-powered career guidance, I'm developing the skills to build useful, reliable and user-focused software.
          </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div onPointerMove={spot} className="spotlight glass group h-full rounded-2xl p-5 transition-transform hover:-translate-y-1">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-2.5 text-primary ring-1 ring-primary/20 transition-transform group-hover:rotate-6"><p.icon size={20} /></div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="glass rounded-3xl p-7">
            <p className="eyebrow mb-6">Developer journey</p>
            <ol className="relative space-y-7 border-l border-border pl-7">
              {journey.map((j) => (
                <li key={j.t} className="relative">
                  <span className="absolute -left-[33px] top-1 h-3 w-3 rounded-full bg-primary shadow-glow" />
                  <p className="font-mono text-xs text-primary">{j.y}</p>
                  <p className="mt-1 font-semibold">{j.t}</p>
                  <p className="text-sm text-muted-foreground">{j.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */
type Skill = { name: string; icon: IconType | typeof Brain };
const skillGroups: { id: string; label: string; skills: Skill[] }[] = [
  { id: "prog", label: "Programming", skills: [{ name: "Python", icon: SiPython }, { name: "C", icon: SiC }, { name: "Java", icon: FaJava }, { name: "SQL", icon: SiMysql }] },
  { id: "web", label: "Web Development", skills: [{ name: "HTML5", icon: SiHtml5 }, { name: "CSS3", icon: SiCss }, { name: "JavaScript", icon: SiJavascript }, { name: "React.js", icon: SiReact }, { name: "Node.js", icon: SiNodedotjs }, { name: "FastAPI", icon: SiFastapi }] },
  { id: "ai", label: "AI / Machine Learning", skills: [{ name: "Supervised Learning", icon: Brain }, { name: "Image Processing", icon: ScanFace }, { name: "Model Evaluation", icon: Gauge }, { name: "Model Optimization", icon: Cpu }, { name: "Recommendation Systems", icon: Sparkles }] },
  { id: "tools", label: "Tools & Databases", skills: [{ name: "Git", icon: SiGit }, { name: "GitHub", icon: SiGithub }, { name: "VS Code", icon: VscVscode }, { name: "Dev-C++", icon: SiCplusplus }, { name: "MySQL", icon: SiMysql }, { name: "PostgreSQL", icon: SiPostgresql }] },
  { id: "core", label: "Core Competencies", skills: [{ name: "Problem Solving", icon: Puzzle }, { name: "Teamwork", icon: Users }, { name: "Time Management", icon: Clock }, { name: "Rapid Prototyping", icon: Rocket }] },
];

export function Skills() {
  const [filter, setFilter] = useState("all");
  const groups = filter === "all" ? skillGroups : skillGroups.filter((g) => g.id === filter);
  return (
    <section id="skills" className="mx-auto max-w-7xl px-5 py-28 md:px-8">
      <SectionHeader eyebrow="Skills · Technical constellation" title={<>The toolkit behind <span className="text-gradient">the intelligence.</span></>} sub="Technologies I've learned and applied through coursework and projects — no inflated percentages, just honest skills." />
      <div className="mb-10 flex flex-wrap gap-2" role="tablist">
        {[{ id: "all", label: "All" }, ...skillGroups].map((g) => (
          <button key={g.id} role="tab" aria-selected={filter === g.id} onClick={() => setFilter(g.id)}
            className={`relative rounded-full px-4 py-2 text-sm transition-colors ${filter === g.id ? "text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>
            {filter === g.id && <motion.span layoutId="skill-pill" className="absolute inset-0 rounded-full bg-gradient-primary" />}
            <span className="relative">{g.label}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {groups.map((g) => (
            <motion.div layout key={g.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} onPointerMove={spot} className="spotlight glass rounded-3xl p-6">
              <p className="eyebrow mb-5">{g.label}</p>
              <div className="flex flex-wrap gap-2.5">
                {g.skills.map((s) => (
                  <span key={s.name} tabIndex={0} className="group inline-flex items-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow focus:border-primary/50">
                    <s.icon className="h-4 w-4 text-primary transition-transform group-hover:scale-125" /> {s.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
export function Projects() {
  const [filter, setFilter] = useState<"All" | "AI/ML" | "Full-Stack">("All");
  const [open, setOpen] = useState<Project | null>(null);
  const list = projects.filter((p) => filter === "All" || p.category === filter);
  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-28 md:px-8">
      <SectionHeader eyebrow="Projects · Real work" title={<>Projects that turn ideas into <span className="text-gradient">working systems.</span></>} />
      <div className="mb-10 flex flex-wrap gap-2">
        {(["All", "AI/ML", "Full-Stack"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
            className={`relative rounded-full px-4 py-2 text-sm ${filter === f ? "text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>
            {filter === f && <motion.span layoutId="proj-pill" className="absolute inset-0 rounded-full bg-gradient-primary" />}
            <span className="relative">{f === "All" ? "All Projects" : f}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.button layout key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setOpen(p)} onPointerMove={spot}
              className={`spotlight glass group overflow-hidden rounded-3xl text-left transition-all hover:-translate-y-1.5 hover:shadow-glow ${p.flagship ? "md:col-span-2 md:grid md:grid-cols-[1.3fr_1fr]" : ""}`}>
              <div className="relative overflow-hidden">
                <img src={p.image} alt={`${p.title} illustrative artwork`} loading="lazy" width={1280} height={800} className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent" />
                {p.flagship && <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground"><Star size={12} /> Flagship</span>}
                <span className="absolute bottom-3 right-4 font-mono text-[10px] text-muted-foreground">Illustrative mockup</span>
              </div>
              <div className="flex flex-col p-6 md:p-8">
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground"><span>{p.num} · {p.category}</span><ArrowUpRight className="text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={20} /></div>
                <h3 className="mt-3 text-2xl font-bold md:text-3xl">{p.title}</h3>
                <p className="mt-1 text-primary">{p.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">{p.stack.map((s) => <span key={s} className="rounded-md border border-border bg-background/40 px-2 py-1 font-mono text-[11px]">{s}</span>)}</div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-popover p-0">
          {open && (
            <>
              <img src={open.image} alt="" className="aspect-[16/8] w-full object-cover" />
              <div className="space-y-6 p-6 md:p-8">
                <div>
                  <p className="eyebrow">{open.category}</p>
                  <DialogTitle className="mt-2 font-display text-3xl font-bold">{open.title}</DialogTitle>
                  <DialogDescription className="mt-2 text-muted-foreground">{open.description}</DialogDescription>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Block title="Problem">{open.problem}</Block>
                  <Block title="Solution">{open.solution}</Block>
                </div>
                <Block title="Key features"><ul className="grid gap-1.5 sm:grid-cols-2">{open.features.map((f) => <li key={f} className="flex gap-2"><span className="text-primary">▹</span>{f}</li>)}</ul></Block>
                <Block title="Technologies"><div className="flex flex-wrap gap-1.5">{open.stack.map((s) => <span key={s} className="rounded-md bg-primary/10 px-2 py-1 font-mono text-xs text-primary">{s}</span>)}</div></Block>
                <Block title="Key learnings">{open.learnings}</Block>
                <div className="flex flex-wrap gap-3 border-t border-border pt-5 text-sm">
                  {open.source ? <a href={open.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2"><Github size={16} /> Source</a>
                    : <a href="https://github.com/adyashitbiswal-rgb" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 hover:border-primary/50"><Github size={16} /> GitHub profile</a>}
                  {open.live ? <a href={open.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-primary-foreground"><ExternalLink size={16} /> Live demo</a>
                    : <span className="inline-flex items-center rounded-full border border-dashed border-border px-4 py-2 text-muted-foreground">Live demo · awaiting publication</span>}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">{title}</p><div className="text-sm leading-relaxed text-muted-foreground">{children}</div></div>;
}

/* ---------------- ACHIEVEMENTS ---------------- */
const milestones = ["Built a deepfake detection prototype", "Developed a personalized AI-powered diet planner", "Built AI Career Copilot with full-stack architecture & LLM APIs"];
export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-7xl px-5 py-28 md:px-8">
      <SectionHeader eyebrow="Achievements · Certifications" title={<>Milestones that shape <span className="text-gradient">my journey.</span></>} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.07} className={c.featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
            <div onPointerMove={spot} className={`spotlight glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-transform hover:-translate-y-1 ${c.featured ? "ring-1 ring-primary/40" : ""}`}>
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-primary/20 animate-spin-slow" style={{ borderStyle: "dashed" }} />
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">{c.issuer.includes("Coursera") ? <SiCoursera size={20} /> : <Award size={20} />}</div>
                <p className="font-mono text-xs text-muted-foreground">{c.issuer}</p>
              </div>
              <h3 className={`font-bold ${c.featured ? "text-3xl" : "text-xl"}`}>{c.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
              {c.featured && <p className="mt-auto pt-8 font-mono text-xs text-primary">◆ Featured internship</p>}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-16">
        <p className="eyebrow mb-8 flex items-center gap-2"><Flag size={14} /> Project milestones</p>
        <div className="relative grid gap-6 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-primary opacity-40 md:block" />
          {milestones.map((m, i) => (
            <div key={m} className="relative">
              <div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 bg-background font-mono text-sm text-primary shadow-glow">0{i + 1}</div>
              <p className="text-foreground/90">{m}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- EDUCATION ---------------- */
export function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-5 py-28 md:px-8">
      <SectionHeader eyebrow="Education · Academic timeline" title={<>Building the <span className="text-gradient">foundations.</span></>} />
      <ol className="relative space-y-6 border-l border-border pl-8 md:pl-12">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.1}>
            <li className="relative">
              <span className={`absolute -left-[41px] top-7 flex h-4 w-4 items-center justify-center rounded-full md:-left-[57px] ${e.current ? "bg-primary shadow-glow" : "border border-primary bg-background"}`}>
                {e.current && <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />}
              </span>
              <div onPointerMove={spot} className="spotlight glass flex flex-col gap-4 rounded-3xl p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-4">
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex"><GraduationCap size={22} /></div>
                  <div>
                    <p className="font-mono text-xs text-primary">{e.period}{e.current && " · Ongoing"}</p>
                    <h3 className="mt-1 text-xl font-bold">{e.degree}</h3>
                    <p className="text-sm text-muted-foreground">{e.school}</p>
                  </div>
                </div>
                <span className="self-start rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-sm text-primary md:self-center">{e.result}</span>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export { Layers };
