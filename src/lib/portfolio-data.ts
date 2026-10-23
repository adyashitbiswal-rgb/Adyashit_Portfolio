import deepfake from "@/assets/project-deepfake.jpg";
import diet from "@/assets/project-diet.jpg";
import copilot from "@/assets/project-copilot.jpg";

/** Set to a real file path (e.g. "/resume.pdf" placed in /public) to enable the download button. */
export const RESUME_URL: string | null = null;

export const profile = {
  name: "Adyashit Biswal",
  phone: "+91 9692194562",
  phoneHref: "tel:+919692194562",
  email: "adyashitbiswal@gmail.com",
  linkedin: "https://www.linkedin.com/in/adyashitbiswal-060853367",
  github: "https://github.com/adyashitbiswal-rgb",
  location: "Angul, Odisha, India",
};

export const introScript = [
  "Hii there! 👋 Hello and welcome!",
  "My name is Adyashit — this robot is my AI avatar.",
  "I am from Odisha in India, and I'm a Computer Science student passionate about AI, machine learning and full-stack development.",
  "From a deepfake detection system to an AI-powered career copilot, I love turning ideas into real, working applications.",
  "Let me take you through my journey, skills, projects and what I'm building next. Let's dive in! 🚀",
];

/**
 * Voice-only respellings: what the robot says is pronounced correctly, while the
 * words shown on screen stay exactly as written above.
 */
const SPEECH_FIXES: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bHii\b/g, "High"],
  [/\bAdyashit\b/g, "Aad-ya-shit"],
  [/\badyashitbiswal@gmail\.com\b/g, "adyashit biswal at gmail dot com"],
  [/\bOdisha\b/g, "Oh-dee-sha"],
  [/\bBhubaneswar\b/g, "Bhu-ba-nes-waar"],
  [/\bCSIT\b/g, "C. S. I. T."],
  [/\bAICTE\b/g, "A. I. C. T. E."],
  [/\bGITA\b/g, "GEE-ta"],
];

export function speechText(t: string) {
  return SPEECH_FIXES.reduce((s, [re, to]) => s.replace(re, to), t);
}

export type Intent = { id: string; label: string; section: string; reply: string };
export const intents: Intent[] = [
  { id: "intro", label: "Introduce Adyashit", section: "about", reply: "Adyashit is a CSIT undergraduate at GITA, Bhubaneswar, who enjoys building practical AI applications and modern web experiences." },
  { id: "projects", label: "Show me his projects", section: "projects", reply: "He's built three featured projects: a Deepfake Detection System, an AI Diet Planner, and his flagship — AI Career Copilot." },
  { id: "skills", label: "What are his AI skills?", section: "skills", reply: "Supervised learning, image processing, model evaluation & optimization, and recommendation systems — powered by Python." },
  { id: "achievements", label: "His achievements", section: "achievements", reply: "He completed an AI Internship with IBM SkillsBuild (AICTE) plus four Coursera courses in Python, C, web and ML." },
  { id: "contact", label: "How can I contact him?", section: "contact", reply: "Easiest is email — adyashitbiswal@gmail.com. You'll also find LinkedIn, GitHub and a contact form right here." },
];

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export type Project = {
  id: string; num: string; title: string; tagline: string; category: "AI/ML" | "Full-Stack";
  flagship?: boolean; image: string; description: string; problem: string; solution: string;
  features: string[]; stack: string[]; learnings: string; live?: string; source?: string;
};

export const projects: Project[] = [
  {
    id: "copilot", num: "03", title: "AI Career Copilot", tagline: "Turn your career goals into an actionable plan.",
    category: "Full-Stack", flagship: true, image: copilot,
    description: "An AI-powered career guidance platform using React, TypeScript, FastAPI and MySQL, featuring resume analysis, career readiness scoring and personalized insights powered by Groq LLM APIs.",
    problem: "Students often lack clear, personalised feedback on how ready they are for the careers they want.",
    solution: "A full-stack web app that analyses a resume, scores career readiness and generates tailored guidance with an LLM.",
    features: ["Resume analysis", "Career readiness scoring", "Personalized career insights", "AI guidance via Groq LLM APIs", "Frontend on Vercel", "Backend on Render"],
    stack: ["React", "TypeScript", "FastAPI", "MySQL", "Groq LLM", "Vercel", "Render"],
    learnings: "End-to-end architecture, API design, LLM prompt integration and deploying split frontend/backend services.",
  },
  {
    id: "deepfake", num: "01", title: "Deepfake Detection System", tagline: "Exploring digital media authenticity with ML.",
    category: "AI/ML", image: deepfake,
    description: "An AI-based system designed to detect deepfake videos using machine learning and image-processing techniques.",
    problem: "Manipulated videos are increasingly hard to tell apart from authentic media.",
    solution: "A computer-vision prototype that processes video frames and classifies them using trained ML models.",
    features: ["Preprocessed video frame datasets", "Applied model evaluation techniques", "Functional computer vision prototype", "Research into media authenticity"],
    stack: ["Python", "Machine Learning", "Image Processing", "Computer Vision"],
    learnings: "Dataset preparation, frame extraction pipelines and evaluating classification models honestly.",
  },
  {
    id: "diet", num: "02", title: "AI-Powered Diet Planner", tagline: "Meal suggestions tailored to each person.",
    category: "AI/ML", image: diet,
    description: "A personalized diet recommendation system that uses machine learning to tailor meal suggestions to individual user profiles and constraints.",
    problem: "Generic meal plans ignore individual preferences, goals and dietary constraints.",
    solution: "A recommendation engine that adapts suggestions to a user profile and refines them from feedback. Not a substitute for professional dietary advice.",
    features: ["Personalized recommendation logic", "User-specific dietary constraints", "Feedback-driven refinement", "Focus on practical usability"],
    stack: ["Python", "Machine Learning", "Recommendation Systems"],
    learnings: "Designing recommendation logic, handling constraints and building feedback loops.",
  },
];

export const certifications = [
  { title: "AI Internship", issuer: "IBM SkillsBuild · AICTE", desc: "Hands-on internship program exploring applied artificial intelligence concepts.", featured: true },
  { title: "Data Structures in C", issuer: "Coursera", desc: "Core data structures and their implementation in C." },
  { title: "Programming in Python", issuer: "Coursera", desc: "Python fundamentals, control flow, functions and data handling." },
  { title: "HTML and CSS in Depth", issuer: "Coursera", desc: "Semantic markup, layout and modern styling techniques." },
  { title: "Machine Learning Introduction for Everyone", issuer: "Coursera", desc: "Foundational ML concepts, workflows and terminology." },
];

export const education = [
  { degree: "B.Tech in Computer Science & Information Technology", school: "Gandhi Institute for Technological Advancement", period: "2023 – Present", result: "CGPA 8.0 / 10", current: true },
  { degree: "Higher Secondary Education", school: "Mayadhar Higher Secondary School, Bhubaneswar", period: "2021 – 2023", result: "62%" },
  { degree: "Secondary Education", school: "Saraswati Sishu Vidya Mandir, Talcher", period: "2020 – 2021", result: "68.33%" },
];

export const languages = [
  { name: "Odia", level: "Native" },
  { name: "Hindi", level: "Fluent" },
  { name: "English", level: "Fluent" },
];
