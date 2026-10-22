import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Intro({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} className="relative">
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring" />
            <Logo className="relative h-20 w-20" />
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="eyebrow mt-6">
            Booting ADI · AI guide
          </motion.p>
          <div className="mt-4 h-px w-48 overflow-hidden bg-border">
            <motion.div className="h-full bg-gradient-primary" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.6, ease: "easeInOut" }} />
          </div>
          <button onClick={() => setShow(false)} className="absolute bottom-8 right-8 font-mono text-xs text-muted-foreground hover:text-primary">
            Skip intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
