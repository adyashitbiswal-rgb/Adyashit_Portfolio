import { useState } from "react";
import { Check, Copy, Mail, MapPin, Phone, Send, Linkedin, Github, Languages } from "lucide-react";
import { profile, languages } from "@/lib/portfolio-data";
import { SectionHeader, Reveal, spot } from "./Reveal";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Please enter a valid email.";
    if (form.subject.trim().length < 3) er.subject = "Add a short subject.";
    if (form.message.trim().length < 10) er.message = "Message should be at least 10 characters.";
    setErrors(er);
    if (Object.keys(er).length) return;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setStatus("opened");
  };

  const links = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
    { icon: Linkedin, label: "LinkedIn", value: "adyashitbiswal", href: profile.linkedin },
    { icon: Github, label: "GitHub", value: "adyashitbiswal-rgb", href: profile.github },
  ];

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-28 md:px-8">
      <SectionHeader eyebrow="Contact · Let's connect" title={<>Have an idea? Let's build something <span className="text-gradient">meaningful.</span></>} sub="I'm interested in software development, AI/ML, and opportunities to learn, collaborate and build useful products." />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="space-y-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onPointerMove={spot}
              className="spotlight glass group flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-110"><l.icon size={19} /></span>
              <span className="min-w-0"><span className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{l.label}</span><span className="block truncate">{l.value}</span></span>
            </a>
          ))}
          <div className="flex gap-3">
            <button onClick={copy} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border py-3 text-sm transition-colors hover:border-primary/50" aria-live="polite">
              {copied ? <><Check size={16} className="text-success" /> Email copied!</> : <><Copy size={16} /> Copy email</>}
            </button>
            <div className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border py-3 text-sm text-muted-foreground"><MapPin size={16} className="text-primary" /> Angul, Odisha</div>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"><Languages size={14} /> Languages</p>
            <div className="flex flex-wrap gap-2">{languages.map((l) => <span key={l.name} className="rounded-full border border-border px-3 py-1 text-sm">{l.name} <span className="text-primary">· {l.level}</span></span>)}</div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="glass space-y-4 rounded-3xl p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name}><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} autoComplete="name" /></Field>
              <Field label="Email" error={errors.email}><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} autoComplete="email" /></Field>
            </div>
            <Field label="Subject" error={errors.subject}><input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} /></Field>
            <Field label="Message" error={errors.message}><textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} resize-none`} /></Field>
            <button type="submit" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary py-3.5 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]">
              <Send size={17} className="transition-transform group-hover:translate-x-1" /> Send via email app
            </button>
            <p className="text-center text-xs text-muted-foreground" aria-live="polite">
              {status === "opened" ? "Your email app should now be open with the message ready — just hit send there." : "This opens your email app with the message pre-filled. Prefer copying? Use the copy email button."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls = "w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none";
function Field({ label, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
