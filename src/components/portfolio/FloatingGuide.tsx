import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { intents } from "@/lib/portfolio-data";
import { Robot } from "./Robot";
import { useGuide } from "@/components/portfolio/GuideContext";

/** Compact assistant that appears after the hero; can be opened, minimized or dismissed. */
export function FloatingGuide() {
  const g = useGuide();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setVisible(scrollY > innerHeight * 0.8);
    f(); addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 0, y: 40, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40 }} className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} className="glass w-[min(88vw,320px)] rounded-2xl p-4 shadow-glow">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">ADI · AI guide</span>
                  <button onClick={() => setOpen(false)} aria-label="Minimize guide" className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
                </div>
                <p className="mb-3 text-sm" aria-live="polite">{g.mode === "reply" && g.typed ? g.typed : "Hii! Need a hand? Ask me anything below 👇"}</p>
                <div className="flex flex-wrap gap-1.5">
                  {intents.map((i) => <button key={i.id} onClick={() => g.ask(i.id)} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/50 hover:text-primary">{i.label}</button>)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setOpen(!open)} aria-label={open ? "Minimize AI guide" : "Open AI guide"} className="glass relative h-20 w-20 rounded-full p-1 shadow-glow transition-transform hover:scale-105">
            <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
            <Robot compact speaking={g.speaking && g.mode === "reply"} className="h-full w-full" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
