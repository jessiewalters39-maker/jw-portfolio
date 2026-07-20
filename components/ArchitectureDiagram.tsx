"use client";
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Brain, Sparkles, Phone, CreditCard, Database, Braces, Webhook,
  Globe, Server, Cloud, Workflow, Bot, ChevronDown,
} from "lucide-react";

type ArchNode = {
  id: string;
  label: string;
  blurb: string;
  icon: React.ReactNode;
  x: number; // percent
  y: number; // percent
};

const NODES: ArchNode[] = [
  { id: "claude", label: "Claude", blurb: "AI-directed development and agentic coding — my primary build partner for shipping production software.", icon: <Sparkles className="h-3.5 w-3.5" />, x: 28, y: 12 },
  { id: "openai", label: "OpenAI", blurb: "Production AI agents, retrieval pipelines, and structured-output workflows.", icon: <Brain className="h-3.5 w-3.5" />, x: 50, y: 7 },
  { id: "agents", label: "AI Agents", blurb: "Receptionists, schedulers, and follow-up agents that do real customer-facing work.", icon: <Bot className="h-3.5 w-3.5" />, x: 72, y: 12 },
  { id: "twilio", label: "Twilio", blurb: "Conversational voice and SMS systems with A2P compliance built in.", icon: <Phone className="h-3.5 w-3.5" />, x: 12, y: 34 },
  { id: "rest", label: "REST APIs", blurb: "Designed and shipped APIs powering real customer workflows.", icon: <Braces className="h-3.5 w-3.5" />, x: 8, y: 58 },
  { id: "webhooks", label: "Webhooks", blurb: "Event-driven integrations between AI, telephony, billing, and CRM.", icon: <Webhook className="h-3.5 w-3.5" />, x: 15, y: 81 },
  { id: "stripe", label: "Stripe", blurb: "Subscriptions, billing automation, and payment workflows.", icon: <CreditCard className="h-3.5 w-3.5" />, x: 88, y: 34 },
  { id: "postgres", label: "PostgreSQL", blurb: "Production data modeling with Drizzle ORM on serverless Postgres.", icon: <Database className="h-3.5 w-3.5" />, x: 92, y: 58 },
  { id: "automation", label: "Automation Engine", blurb: "Orchestrates the workflows that run a business hands-free.", icon: <Workflow className="h-3.5 w-3.5" />, x: 85, y: 81 },
  { id: "nextjs", label: "Next.js", blurb: "Fast, SEO-strong front ends deployed on Vercel.", icon: <Globe className="h-3.5 w-3.5" />, x: 32, y: 90 },
  { id: "node", label: "Node.js", blurb: "Backend APIs, integrations, and scalable business logic.", icon: <Server className="h-3.5 w-3.5" />, x: 50, y: 95 },
  { id: "cloud", label: "Cloud Infrastructure", blurb: "Seven years of systems engineering — servers, storage, virtualization, Azure.", icon: <Cloud className="h-3.5 w-3.5" />, x: 68, y: 90 },
];

const CENTER = { x: 50, y: 51 };

export default function ArchitectureDiagram() {
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      {/* ---------- Desktop: systems diagram ---------- */}
      <div className="relative hidden aspect-[16/10] w-full select-none md:block lg:aspect-[16/9]">
        {/* Connection lines */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="arch-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          {NODES.map((n, i) => {
            const isHot = hovered === n.id;
            return (
              <g key={n.id}>
                <line
                  x1={CENTER.x} y1={CENTER.y} x2={n.x} y2={n.y}
                  stroke={isHot ? "url(#arch-pulse)" : "rgba(255,255,255,0.08)"}
                  strokeWidth={isHot ? 1.6 : 1}
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "stroke 0.3s" }}
                />
                {/* Slow-pulsing data flow along each line */}
                {!reducedMotion && (
                  <line
                    x1={CENTER.x} y1={CENTER.y} x2={n.x} y2={n.y}
                    stroke="url(#arch-pulse)"
                    strokeWidth={isHot ? 1.6 : 1}
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray="3 97"
                    strokeDashoffset="100"
                    opacity={isHot ? 0.9 : 0.35}
                    pathLength={100}
                    style={{
                      animation: `arch-dash 5.5s linear infinite`,
                      animationDelay: `${(i * 0.45).toFixed(2)}s`,
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Center node */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
        >
          <div className="relative rounded-2xl border border-white/20 bg-[#0b0b14]/90 px-6 py-4 text-center shadow-[0_0_50px_rgba(139,92,246,0.25)] backdrop-blur">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />
            <div className="text-sm font-bold text-white">Jessie Walters</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/45">
              Systems Architect
            </div>
          </div>
        </div>

        {/* Satellite nodes */}
        {NODES.map((n) => {
          const isHot = hovered === n.id;
          // Flip the detail card above the node for bottom-row nodes so it stays in view.
          const flipUp = n.y > 65;
          return (
            <div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%`, zIndex: isHot ? 30 : 20 }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.button
                type="button"
                onFocus={() => setHovered(n.id)}
                onBlur={() => setHovered(null)}
                aria-expanded={isHot}
                className="flex cursor-default items-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-1.5 text-xs font-medium backdrop-blur outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60"
                animate={{
                  scale: isHot ? 1.08 : 1,
                  borderColor: isHot ? "rgba(217,70,239,0.5)" : "rgba(255,255,255,0.12)",
                  backgroundColor: isHot ? "rgba(217,70,239,0.08)" : "rgba(255,255,255,0.04)",
                  boxShadow: isHot ? "0 0 28px rgba(217,70,239,0.25)" : "0 0 0 rgba(0,0,0,0)",
                  color: isHot ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={isHot ? "text-fuchsia-300" : "text-white/50"}>{n.icon}</span>
                {n.label}
              </motion.button>

              {/* Detail card */}
              <motion.div
                role="tooltip"
                initial={false}
                animate={{ opacity: isHot ? 1 : 0, y: isHot ? 0 : flipUp ? 6 : -6, pointerEvents: isHot ? "auto" : "none" }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute left-1/2 w-56 -translate-x-1/2 rounded-xl border border-white/15 bg-[#0b0b14]/95 p-3 text-left shadow-xl shadow-black/40 backdrop-blur ${
                  flipUp ? "bottom-full mb-2" : "top-full mt-2"
                }`}
              >
                <div className="text-xs font-semibold text-white">{n.label}</div>
                <div className="mt-1 text-[11px] leading-relaxed text-white/60">{n.blurb}</div>
              </motion.div>
            </div>
          );
        })}

        <style>{`
          @keyframes arch-dash {
            from { stroke-dashoffset: 100; }
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </div>

      {/* ---------- Mobile: expandable list ---------- */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
        <div className="relative col-span-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] p-5 text-center backdrop-blur">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />
          <div className="text-base font-bold text-white">Jessie Walters</div>
          <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/45">Systems Architect</div>
        </div>
        {NODES.map((n) => (
          <MobileArchCard key={n.id} node={n} />
        ))}
      </div>
    </div>
  );
}

function MobileArchCard({ node }: { node: ArchNode }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur transition hover:border-white/20"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-white/85">
          <span className="text-fuchsia-300">{node.icon}</span>
          {node.label}
        </span>
        <ChevronDown className={`h-4 w-4 text-white/40 transition-transform ${open ? "rotate-180" : ""}`} />
      </span>
      {open && (
        <span className="mt-2 block text-xs leading-relaxed text-white/60">{node.blurb}</span>
      )}
    </button>
  );
}
