"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, Mail, Phone, MapPin, ExternalLink, Code2, Cpu, ShieldCheck, Rocket, Star, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ----------
// Quick config: edit these objects only
// ----------
const PROFILE = {
  name: "Jessie Walters",
  title: "Fullstack TypeScript Developer · Cloud‑Ready",
  location: "Ben Wheeler, TX",
  phone: "903.802.8180",
  email: "jessiewalters39@gmail.com",
  github: "https://github.com/jessiewalters39-maker/jw-portfolio.git", // TODO: update
  resumeUrl: "/resume.pdf.pdf", 
  summary:
    "Fullstack developer specializing in React, TypeScript, Node.js and cloud. Generative‑native engineer who ships fast using Copilot, Cursor and Claude. Former Systems Engineer with deep infra, security and Azure experience.",
};

const STACK = [
  "TypeScript", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Jest", "Docker", "CI/CD", "Azure", "AI Tools (Copilot, Cursor, Claude)"
];

const PROJECTS = [
  {
    name: "Roofer’s AI",
    year: "2025",
    tagline: "SaaS for roofing crews: estimates, CRM-lite, Stripe billing, AI assist",
    bullets: [
      "React/TypeScript frontend with protected routes and Stripe subscriptions",
      "Node.js/Express API + PostgreSQL (Neon) with Drizzle ORM",
      "AI-assisted estimate generation and proposal templating",
    ],
    liveUrl: "#", // TODO
    codeUrl: "#", // Optional public sample repo or code slice
    safeNotes: "Public repo shows a reduced feature set with mock data and environment variables removed.",
  },
  {
    name: "Mind Mirror",
    year: "2025",
    tagline: "AI journaling app: reflections, prompts, and secure profiles",
    bullets: [
      "Next.js + serverless API routes, Tailwind UI",
      "Auth, profiles, journaling with optimistic updates",
      "Deployed on Vercel with NeonDB",
    ],
    liveUrl: "#",
    codeUrl: "#",
    safeNotes: "Includes obfuscated prompts and example content only.",
  },
  {
    name: "Crew Check‑In",
    year: "2024",
    tagline: "Field productivity tool with admin dashboard and CSV exports",
    bullets: [
      "React dashboard + TypeScript utilities",
      "Check‑in/out workflows and role‑based views",
      "Google Sheets/Glide integration with serverless adapters",
    ],
    liveUrl: "#",
    codeUrl: "#",
    safeNotes: "Repo is a cleaned demo with synthetic data.",
  },
];

const BADGES = [
  { label: "AZ‑900", icon: <ShieldCheck className="w-4 h-4" /> },
  { label: "Server+", icon: <ShieldCheck className="w-4 h-4" /> },
  { label: "Linux Essentials", icon: <ShieldCheck className="w-4 h-4" /> },
];

// ----------
// UI
// ----------
export default function PortfolioJW() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              {PROFILE.name}
            </motion.h1>
            <p className="text-slate-600 mt-1">{PROFILE.title}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" />{PROFILE.location}</span>
              <span className="inline-flex items-center gap-1"><Phone className="w-4 h-4" />{PROFILE.phone}</span>
              <a className="inline-flex items-center gap-1 hover:underline" href={`mailto:${PROFILE.email}`}><Mail className="w-4 h-4" />{PROFILE.email}</a>
              <a className="inline-flex items-center gap-1 hover:underline" href={PROFILE.github} target="_blank" rel="noreferrer"><Github className="w-4 h-4" />GitHub</a>
              {PROFILE.resumeUrl !== "#" && (
                <a className="inline-flex items-center gap-1 hover:underline" href={PROFILE.resumeUrl} target="_blank" rel="noreferrer"><Download className="w-4 h-4" />Resume</a>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="rounded-2xl px-5" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
              Contact
            </Button>
            <Button variant="outline" className="rounded-2xl px-5" onClick={() => window.open(PROFILE.github, '_blank') }>
              <Github className="w-4 h-4 mr-2"/> View GitHub
            </Button>
          </div>
        </div>
      </header>

      {/* Summary */}
      <section className="max-w-6xl mx-auto px-6 pb-4">
        <Card className="border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Rocket className="w-5 h-5 mt-1"/>
              <p className="text-slate-700 leading-relaxed">{PROFILE.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {BADGES.map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-xs bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                  {b.icon}
                  {b.label}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tech Stack */}
      <section className="max-w-6xl mx-auto px-6 pt-2 pb-8">
        <h2 className="text-xl font-semibold mb-3 inline-flex items-center gap-2"><Cpu className="w-5 h-5"/>Tech Stack</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {STACK.map((item, i) => (
            <div key={i} className="text-sm bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm flex items-center gap-2">
              <Code2 className="w-4 h-4"/>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <h2 className="text-xl font-semibold mb-4 inline-flex items-center gap-2"><Star className="w-5 h-5"/>Selected Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <Card key={i} className="border-slate-200 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{p.name} <span className="text-slate-400 font-normal">• {p.year}</span></h3>
                    <p className="text-slate-600 mt-1">{p.tagline}</p>
                  </div>
                </div>
                <ul className="list-disc list-inside text-sm text-slate-700 mt-4 space-y-1">
                  {p.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-5">
                  {p.liveUrl && p.liveUrl !== "#" && (
                    <a className="inline-flex items-center gap-2 text-sm font-medium hover:underline" href={p.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4"/>Live Demo
                    </a>
                  )}
                  {p.codeUrl && p.codeUrl !== "#" && (
                    <a className="inline-flex items-center gap-2 text-sm font-medium hover:underline" href={p.codeUrl} target="_blank" rel="noreferrer">
                      <Github className="w-4 h-4"/>Code (safe sample)
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-3">{p.safeNotes}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <footer className="max-w-6xl mx-auto px-6 pb-12">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Get in touch</h2>
            <p className="text-slate-600 mb-4">Open to Fullstack roles (React/TypeScript/Node) and teams that embrace generative AI workflows.</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-2xl">
                <a href={`mailto:${PROFILE.email}`}><Mail className="w-4 h-4 mr-2"/>Email Jessie</a>
              </Button>
              <Button variant="outline" asChild className="rounded-2xl">
                <a href={PROFILE.github} target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2"/>GitHub</a>
              </Button>
              {PROFILE.resumeUrl !== "#" && (
                <Button variant="outline" asChild className="rounded-2xl">
                  <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer"><Download className="w-4 h-4 mr-2"/>Resume</a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </footer>
    </div>
  );
}

