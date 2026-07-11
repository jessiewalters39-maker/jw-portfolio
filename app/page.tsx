"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Github, Mail, Phone, MapPin, ExternalLink, Cpu, ShieldCheck,
  Sparkles, Download, ArrowUpRight, Server, Boxes, Bot, Layers,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Quick config — edit these objects only. Everything below is honest and
// defensible: it reflects what Jessie has actually done and holds.
// ---------------------------------------------------------------------------
const PROFILE = {
  name: "Jessie Walters",
  title: "AI Solutions Engineer · Forward-Deployed Builder",
  kicker: "Former Systems Engineer",
  location: "Ben Wheeler, TX",
  phone: "903.802.8180",
  email: "jessiewalters39@gmail.com",
  github: "https://github.com/jessiewalters39-maker",
  resumeUrl: "/resume.pdf",
  tagline:
    "I turn fuzzy problems into working software by directing AI — and, with four years of infrastructure engineering behind me, I make sure it actually ships, deploys, and runs.",
  summary:
    "Systems engineer turned AI solutions builder. I scope real problems, direct modern AI development tools to build the solution end-to-end — front end, API, database, and go-to-market — and lean on my infrastructure background so what I ship is production-ready, not a demo. Looking for forward-deployed / applied-AI work: sit with a hard problem and build the thing that solves it.",
};

const STATS = [
  { value: "4+ yrs", label: "Infrastructure engineering" },
  { value: "170+", label: "Commits on a production build" },
  { value: "10+", label: "Interactive tools shipped" },
  { value: "Solo", label: "Full product, front to back" },
];

const CERTS = ["AZ-900", "Server+", "Linux Essentials"];

const STACK = [
  {
    group: "Product Build",
    icon: <Layers className="h-4 w-4" />,
    items: ["React", "TypeScript", "Next.js", "Node.js", "Express", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
  },
  {
    group: "Infrastructure",
    icon: <Server className="h-4 w-4" />,
    items: ["Windows Server", "Linux / Unix", "Virtualization", "Storage", "WSUS", "Azure"],
  },
  {
    group: "AI Workflow",
    icon: <Bot className="h-4 w-4" />,
    items: ["Claude / Claude Code", "ChatGPT", "Prompt Engineering", "AI-directed development", "Technical QA of AI code"],
  },
];

const EXPERIENCE = [
  {
    role: "Founder & AI Solutions Builder",
    org: "TaskBuild (Independent)",
    period: "2024 — Present",
    note: "Directing AI to design and ship a production SaaS product end-to-end.",
    current: true,
  },
  {
    role: "NOC Associate",
    org: "Network Operations",
    period: "2024 — Present",
    note: "Monitoring, triage, and incident response across production infrastructure.",
  },
  {
    role: "Systems Engineer",
    org: "Mercy Ships",
    period: "2021 — 2023",
    note: "Designed and deployed infrastructure across servers, storage, and virtualization; assessed solutions for technical and business fit.",
  },
  {
    role: "Junior Systems Engineer",
    org: "Mercy Ships",
    period: "2019 — 2021",
    note: "WSUS patch environment, server hardening with the security team, and technical documentation.",
  },
  {
    role: "IT Systems Administration — Certification",
    org: "MyComputerCareer",
    period: "2019",
    note: "The credential that started the engineering track.",
  },
];

const PROJECT = {
  name: "TaskBuild",
  period: "2024 — Present",
  tagline:
    "Production SaaS + growth platform for home-service businesses — designed, built, and shipped solo by directing AI development tools.",
  bullets: [
    "Full-stack app: React + TypeScript front end, Express API, PostgreSQL (Neon) via Drizzle ORM, deployed on Vercel — 115+ source modules across 170+ commits.",
    "A suite of 10+ interactive business calculators (AI-hire ROI, customer lifetime value, missed-revenue index, true-rate, and more) built as real lead-generation assets.",
    "A growth engine: SEO-optimized industry and landing pages, a blog system, an AI prompt library, and a published research report.",
    "A2P/SMS compliance, lead capture, and transactional email — the operational and regulatory details most builds skip.",
  ],
  tags: ["React", "TypeScript", "Express", "PostgreSQL", "Drizzle", "Vercel", "SEO", "AI-directed"],
  liveUrl: "#", // add TaskBuild's live URL here to reveal the button
};

const ACCENT = "from-violet-500 via-fuchsia-500 to-cyan-400";

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Blob({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{ scale: [1, 1.25, 1], x: [0, 30, 0], y: [0, -20, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function SectionHeading({ icon, kicker, title }: { icon: React.ReactNode; kicker: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
        {icon}
        {kicker}
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h2>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function PortfolioJW() {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#07070c] text-white">
      {/* Animated aurora background */}
      <div className="absolute inset-0 -z-10">
        <Blob className="left-[-10%] top-[-10%] h-[42rem] w-[42rem] bg-violet-600/25" />
        <Blob className="right-[-15%] top-[10%] h-[38rem] w-[38rem] bg-fuchsia-600/20" delay={4} />
        <Blob className="bottom-[-15%] left-[20%] h-[40rem] w-[40rem] bg-cyan-500/20" delay={8} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent,#07070c_75%)]" />
      </div>

      {/* ---------------- Hero ---------------- */}
      <header className="mx-auto max-w-5xl px-6 pb-16 pt-20 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to work · Remote
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
            <span className={`bg-gradient-to-r ${ACCENT} bg-clip-text text-transparent`}>
              {PROFILE.name}
            </span>
          </h1>

          <p className="mt-4 text-xl font-semibold text-white/90 md:text-2xl">{PROFILE.title}</p>
          <p className="mt-1 text-sm uppercase tracking-[0.2em] text-white/40">{PROFILE.kicker}</p>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{PROFILE.tagline}</p>

          {/* Contact row */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{PROFILE.location}</span>
            <a className="inline-flex items-center gap-1.5 transition hover:text-white" href={`tel:${PROFILE.phone}`}><Phone className="h-4 w-4" />{PROFILE.phone}</a>
            <a className="inline-flex items-center gap-1.5 transition hover:text-white" href={`mailto:${PROFILE.email}`}><Mail className="h-4 w-4" />{PROFILE.email}</a>
            <a className="inline-flex items-center gap-1.5 transition hover:text-white" href={PROFILE.github} target="_blank" rel="noreferrer"><Github className="h-4 w-4" />GitHub</a>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={scrollToContact}
              className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${ACCENT} px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.03]`}
            >
              <Mail className="h-4 w-4" /> Get in touch
            </button>
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
            >
              <Github className="h-4 w-4" /> View GitHub
            </a>
          </div>

          {/* Certs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CERTS.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </header>

      {/* ---------------- Stats ---------------- */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <div className={`bg-gradient-to-r ${ACCENT} bg-clip-text text-3xl font-black text-transparent`}>{s.value}</div>
                <div className="mt-1 text-xs leading-snug text-white/55">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- About ---------------- */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur md:p-10">
            <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${ACCENT}`} />
            <div className="flex items-start gap-4">
              <Sparkles className="mt-1 h-6 w-6 shrink-0 text-fuchsia-300" />
              <p className="text-lg leading-relaxed text-white/80">{PROFILE.summary}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Tech Stack ---------------- */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <Reveal>
          <SectionHeading icon={<Cpu className="h-4 w-4" />} kicker="What I work with" title="Tech Stack" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {STACK.map((col, i) => (
            <Reveal key={col.group} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-white/20">
                <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90">
                  <span className="text-fuchsia-300">{col.icon}</span>
                  {col.group}
                </div>
                <div className="flex flex-wrap gap-2">
                  {col.items.map((item) => (
                    <span key={item} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Featured Project ---------------- */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <Reveal>
          <SectionHeading icon={<Boxes className="h-4 w-4" />} kicker="Featured work" title="What I've Built" />
        </Reveal>
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur md:p-10">
            <div className={`absolute -inset-px -z-10 rounded-3xl bg-gradient-to-r ${ACCENT} opacity-0 blur transition duration-500 group-hover:opacity-20`} />
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl font-bold text-white">{PROJECT.name}</h3>
                <p className="mt-1 text-sm text-white/45">{PROJECT.period} · Independent</p>
              </div>
              {PROJECT.liveUrl && PROJECT.liveUrl !== "#" && (
                <a
                  href={PROJECT.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
                >
                  <ExternalLink className="h-4 w-4" /> Live site
                </a>
              )}
            </div>

            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/75">{PROJECT.tagline}</p>

            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {PROJECT.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {PROJECT.tags.map((t) => (
                <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Experience ---------------- */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <Reveal>
          <SectionHeading icon={<Server className="h-4 w-4" />} kicker="The path here" title="Experience" />
        </Reveal>
        <div className="relative ml-3 border-l border-white/10 pl-8">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={`${e.role}-${e.period}`} delay={i * 0.06}>
              <div className="relative pb-8 last:pb-0">
                <span
                  className={`absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center rounded-full ${
                    e.current ? `bg-gradient-to-r ${ACCENT}` : "border border-white/20 bg-[#07070c]"
                  }`}
                >
                  {e.current && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-base font-semibold text-white">
                    {e.role} <span className="font-normal text-white/45">· {e.org}</span>
                  </h3>
                  <span className="text-xs font-medium uppercase tracking-wider text-white/40">{e.period}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{e.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Contact ---------------- */}
      <section id="contact" className="mx-auto max-w-5xl px-6 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-10 text-center backdrop-blur md:p-14">
            <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${ACCENT}`} />
            <h2 className="text-3xl font-bold text-white md:text-4xl">Let&apos;s build something</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/65">
              Open to <span className="text-white/90">AI Solutions Engineer</span>,{" "}
              <span className="text-white/90">Forward-Deployed Engineer</span>, and applied-AI builder roles — remote.
              Also available for independent and contract builds.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${ACCENT} px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.03]`}
              >
                <Mail className="h-4 w-4" /> Email Jessie
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
            </div>
          </div>
        </Reveal>
        <p className="mt-8 text-center text-xs text-white/30">
          © {"2026"} {PROFILE.name} · Built by directing AI
        </p>
      </section>
    </div>
  );
}
