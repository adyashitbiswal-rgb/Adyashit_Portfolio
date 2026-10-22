import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/portfolio-data";
import { Logo } from "./Logo";
import { scrollToSection } from "./GuideContext";

export function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 20);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    nav.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); setOpen(false); scrollToSection(id); };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : ""}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Main">
        <a href="#home" onClick={go("home")} className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-lg font-bold">Adyashit<span className="text-primary">.</span></span>
        </a>
        <ul className="hidden items-center gap-1 rounded-full border border-border bg-card/50 p-1 backdrop-blur lg:flex">
          {nav.map((n) => (
            <li key={n.id} className="relative">
              {active === n.id && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/30" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <a href={`#${n.id}`} onClick={go(n.id)} aria-current={active === n.id ? "true" : undefined}
                className={`relative block px-3.5 py-1.5 text-sm transition-colors ${active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#contact" onClick={go("contact")} className="hidden rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] sm:block">Let's talk</a>
          <button className="rounded-lg border border-border p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open && (
        <motion.ul initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="glass mx-4 mb-4 rounded-2xl p-2 lg:hidden">
          {nav.map((n) => (
            <li key={n.id}><a href={`#${n.id}`} onClick={go(n.id)} className={`block rounded-xl px-4 py-3 ${active === n.id ? "bg-primary/10 text-primary" : ""}`}>{n.label}</a></li>
          ))}
        </motion.ul>
      )}
    </header>
  );
}
