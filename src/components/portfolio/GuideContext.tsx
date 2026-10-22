import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { introScript, intents, speechText } from "@/lib/portfolio-data";

type Mode = "intro" | "reply" | "idle";
type GuideState = {
  text: string; typed: string; mode: Mode; lineIndex: number; total: number;
  speaking: boolean; paused: boolean; muted: boolean; waving: boolean; ttsSupported: boolean;
  start: () => void; skip: () => void; togglePause: () => void; toggleMute: () => void;
  ask: (id: string) => void;
};

const Ctx = createContext<GuideState | null>(null);

const NOOP = () => {};
const IDLE: GuideState = {
  text: "", typed: "", mode: "idle", lineIndex: 0, total: 0,
  speaking: false, paused: false, muted: true, waving: false, ttsSupported: false,
  start: NOOP, skip: NOOP, togglePause: NOOP, toggleMute: NOOP, ask: NOOP,
};
let warned = false;

export const useGuide = () => {
  const c = useContext(Ctx);
  if (!c) {
    // A hot reload can leave a consumer holding a stale copy of this module. Stay
    // silent instead of throwing, so the page never blanks.
    if (!warned) { warned = true; console.warn("[guide] provider missing — running silent"); }
    return IDLE;
  }
  return c;
};

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}

/** Voice pace — kept deliberately unhurried so each line lands clearly. */
const SPEECH_RATE = 0.85;
const SPEECH_PITCH = 1.1;

export function GuideProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("idle");
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [typed, setTyped] = useState("");
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [waving, setWaving] = useState(false);
  const [ttsSupported, setTts] = useState(false);
  const [audioBusy, setAudioBusy] = useState(false);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;
  const audioTimer = useRef<number | null>(null);

  useEffect(() => setTts(typeof window !== "undefined" && "speechSynthesis" in window), []);

  const clearAudioTimer = useCallback(() => {
    if (audioTimer.current !== null) {
      window.clearTimeout(audioTimer.current);
      audioTimer.current = null;
    }
  }, []);

  const speak = useCallback((t: string) => {
    const spoken = speechText(t).replace(/[\u{1F300}-\u{1FAFF}]/gu, "").trim();
    if (mutedRef.current || !spoken || !("speechSynthesis" in window)) {
      clearAudioTimer();
      setAudioBusy(false);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(spoken);
    u.rate = SPEECH_RATE;
    u.pitch = SPEECH_PITCH;
    const v = window.speechSynthesis.getVoices().find((x) => /en[-_](US|GB|IN)/i.test(x.lang));
    if (v) u.voice = v;
    const done = () => { clearAudioTimer(); setAudioBusy(false); };
    u.onend = done;
    u.onerror = done;
    setAudioBusy(true);
    // Safety net: some engines never report the end of an utterance.
    audioTimer.current = window.setTimeout(done, (spoken.length / 11) * 1000 + 4000);
    window.speechSynthesis.speak(u);
  }, [clearAudioTimer]);

  useEffect(() => () => { clearAudioTimer(); window.speechSynthesis?.cancel(); }, [clearAudioTimer]);

  // typewriter
  useEffect(() => {
    if (!text || paused) return;
    if (typed.length >= text.length) return;
    const t = setTimeout(() => setTyped(Array.from(text).slice(0, Array.from(typed).length + 1).join("")), 30);
    return () => clearTimeout(t);
  }, [text, typed, paused]);

  // advance intro lines (only once the line is typed out and the voice has finished it)
  useEffect(() => {
    if (mode !== "intro" || paused || audioBusy || typed.length < text.length || !text) return;
    const t = setTimeout(() => {
      if (lineIndex < introScript.length - 1) {
        const n = lineIndex + 1;
        setLineIndex(n); setText((introScript[n] ?? "")); setTyped(""); speak((introScript[n] ?? ""));
      } else setMode("idle");
    }, 1500);
    return () => clearTimeout(t);
  }, [mode, paused, audioBusy, typed, text, lineIndex, speak]);

  const start = useCallback(() => {
    setMode("intro"); setPaused(false); setLineIndex(0);
    setText((introScript[0] ?? "")); setTyped(""); speak((introScript[0] ?? ""));
    setWaving(false); requestAnimationFrame(() => setWaving(true));
    setTimeout(() => setWaving(false), 3100);
  }, [speak]);

  const skip = useCallback(() => {
    window.speechSynthesis?.cancel();
    clearAudioTimer(); setAudioBusy(false);
    const last = introScript[introScript.length - 1] ?? "";
    setMode("idle"); setPaused(false); setLineIndex(introScript.length - 1); setText(last); setTyped(last);
  }, [clearAudioTimer]);

  const togglePause = useCallback(() => {
    setPaused((p) => {
      if ("speechSynthesis" in window) p ? window.speechSynthesis.resume() : window.speechSynthesis.pause();
      return !p;
    });
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      mutedRef.current = next;
      if (next) { window.speechSynthesis?.cancel(); clearAudioTimer(); setAudioBusy(false); }
      else if (text) speak(text);
      return next;
    });
  }, [speak, text, clearAudioTimer]);

  const ask = useCallback((id: string) => {
    const i = intents.find((x) => x.id === id);
    if (!i) return;
    setMode("reply"); setPaused(false); setText(i.reply); setTyped(""); speak(i.reply);
    setTimeout(() => scrollToSection(i.section), 900);
  }, [speak]);

  const speaking = !paused && (audioBusy || typed.length < text.length);

  return (
    <Ctx.Provider value={{ text, typed, mode, lineIndex, total: introScript.length, speaking, paused, muted, ttsSupported, waving, start, skip, togglePause, toggleMute, ask }}>
      {children}
    </Ctx.Provider>
  );
}
