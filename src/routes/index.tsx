import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Background } from "@/components/portfolio/Background";
import { Intro } from "@/components/portfolio/Intro";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About, Skills, Projects, Achievements, Education } from "@/components/portfolio/Sections";
import { Terminal } from "@/components/portfolio/Terminal";
import { Contact } from "@/components/portfolio/Contact";
import { FloatingGuide } from "@/components/portfolio/FloatingGuide";

import { profile } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adyashit Biswal — AI/ML & Full-Stack Developer" },
      { name: "description", content: "Portfolio of Adyashit Biswal, CSIT student building practical AI applications and modern web experiences. Meet ADI, his AI guide." },
      { property: "og:title", content: "Adyashit Biswal — AI/ML & Full-Stack Developer" },
      { property: "og:description", content: "Meet the developer. Explore the intelligence behind the code." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      {!ready && <Intro onDone={() => setReady(true)} />}
      <Background />
      <Nav />
      <main>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Education />
        <Terminal />
        <Contact />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row md:px-8">
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground"></div>
          <div className="flex gap-2">
            {[{ i: Github, h: profile.github, l: "GitHub" }, { i: Linkedin, h: profile.linkedin, l: "LinkedIn" }, { i: Mail, h: `mailto:${profile.email}`, l: "Email" }].map(({ i: I, h, l }) => (
              <a key={l} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={l} className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"><I size={16} /></a>
            ))}
          </div>
        </div>
      </footer>
      <FloatingGuide />
    </>
  );
}
