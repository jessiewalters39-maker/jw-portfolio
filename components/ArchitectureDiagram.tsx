"use client";
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Brain, Sparkles, Phone, CreditCard, Database, Braces, Webhook,
  Globe, Server, Cloud, Workflow, Bot, ChevronDown, User, TrendingUp,
} from "lucide-react";

type CategoryId = "ai" | "app" | "infra" | "biz" | "flowpoint";

const CATEGORIES: Record<CategoryId, { label: string; text: string; iconIdle: string; iconHot: string }> = {
  ai: { label: "AI", text: "text-fuchsia-300", iconIdle: "text-fuchsia-300/60", iconHot: "text-fuchsia-300" },
  app: { label: "Application & Backend", text: "text-cyan-300", iconIdle: "text-cyan-300/60", iconHot: "text-cyan-300" },
  infra: { label: "Automation & Infrastructure", text: "text-violet-300", iconIdle: "text-violet-300/60", iconHot: "text-violet-300" },
  biz: { label: "Business Systems", text: "text-emerald-300", iconIdle: "text-emerald-300/60", iconHot: "text-emerald-300" },
  flowpoint: { label: "Production Flow", text: "text-white/60", iconIdle: "text-white/50", iconHot: "text-white/90" },
};

type FlowInfo = {
  order: number;
  x: number; // percent, Build Stack position
  y: number;
  label?: string; // override label in Build Stack mode
  caption: string;
};

type ArchNode = {
  id: string;
  label: string;
  blurb: string;
  icon: React.ReactNode;
  category: CategoryId;
  x: number; // percent, Architecture position
  y: number;
  flow?: FlowInfo;
  flowOnly?: boolean;
};

const NODES: ArchNode[] = [
  { id: "claude", label: "Claude", category: "ai", blurb: "AI-directed development and agentic coding — my primary build partner for shipping production software.", icon: <Sparkles className="h-3.5 w-3.5" />, x: 28, y: 12 },
  { id: "openai", label: "OpenAI", category: "ai", blurb: "Production AI agents, retrieval pipelines, and structured-output workflows.", icon: <Brain className="h-3.5 w-3.5" />, x: 50, y: 7 },
  { id: "agents", label: "AI Agents", category: "ai", blurb: "Receptionists, schedulers, and follow-up agents that do real customer-facing work.", icon: <Bot className="h-3.5 w-3.5" />, x: 72, y: 12, flow: { order: 2, x: 63, y: 22, label: "AI Agent", caption: "reasoning" } },
  { id: "twilio", label: "Twilio", category: "biz", blurb: "Conversational voice and SMS systems with A2P compliance built in.", icon: <Phone className="h-3.5 w-3.5" />, x: 12, y: 34, flow: { order: 1, x: 37, y: 22, caption: "voice & sms" } },
  { id: "rest", label: "REST APIs", category: "app", blurb: "Designed and shipped APIs powering real customer workflows.", icon: <Braces className="h-3.5 w-3.5" />, x: 8, y: 58 },
  { id: "webhooks", label: "Webhooks", category: "infra", blurb: "Event-driven integrations between AI, telephony, billing, and CRM.", icon: <Webhook className="h-3.5 w-3.5" />, x: 15, y: 81 },
  { id: "stripe", label: "Stripe", category: "biz", blurb: "Subscriptions, billing automation, and payment workflows.", icon: <CreditCard className="h-3.5 w-3.5" />, x: 88, y: 34, flow: { order: 6, x: 37, y: 72, label: "Stripe / CRM", caption: "billing & crm" } },
  { id: "postgres", label: "PostgreSQL", category: "app", blurb: "Production data modeling with Drizzle ORM on serverless Postgres.", icon: <Database className="h-3.5 w-3.5" />, x: 92, y: 58, flow: { order: 4, x: 90, y: 72, caption: "persistence" } },
  { id: "automation", label: "Automation Engine", category: "infra", blurb: "Orchestrates the workflows that run a business hands-free.", icon: <Workflow className="h-3.5 w-3.5" />, x: 85, y: 81, flow: { order: 5, x: 63, y: 72, caption: "orchestration" } },
  { id: "nextjs", label: "Next.js", category: "app", blurb: "Fast, SEO-strong front ends deployed on Vercel.", icon: <Globe className="h-3.5 w-3.5" />, x: 32, y: 90 },
  { id: "node", label: "Node.js", category: "app", blurb: "Backend APIs, integrations, and scalable business logic.", icon: <Server className="h-3.5 w-3.5" />, x: 50, y: 95, flow: { order: 3, x: 90, y: 22, label: "Node.js / API", caption: "business logic" } },
  { id: "cloud", label: "Cloud Infrastructure", category: "infra", blurb: "Seven years of systems engineering — servers, storage, virtualization, Azure.", icon: <Cloud className="h-3.5 w-3.5" />, x: 68, y: 90 },
  // Build Stack endpoints — only visible in Build Stack mode.
  { id: "customer", label: "Customer", category: "flowpoint", blurb: "A real call, text, or web inquiry from a real customer starts the flow.", icon: <User className="h-3.5 w-3.5" />, x: 10, y: 22, flow: { order: 0, x: 10, y: 22, caption: "the request" }, flowOnly: true },
  { id: "outcome", label: "Customer Outcome", category: "flowpoint", blurb: "Booked job, paid invoice, review requested — a measurable business result, not just a response.", icon: <TrendingUp className="h-3.5 w-3.5" />, x: 10, y: 72, flow: { order: 7, x: 10, y: 72, caption: "measurable result" }, flowOnly: true },
];

const CENTER = { x: 50, y: 51 };
const FLOW_CENTER = { x: 50, y: 47 };
// Serpentine request path through the Build Stack rows.
const FLOW_PATH = "M 10 22 L 90 22 L 90 72 L 10 72";

type Mode = "arch" | "flow";

export default function ArchitectureDiagram() {
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("arch");
  const isFlow = mode === "flow";
  const moveTransition = { duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] as const };

  const toggleMode = () => setMode((m) => (m === "arch" ? "flow" : "arch"));

  return (
    <div>
      {/* ---------- Desktop: systems diagram ---------- */}
      <div className="relative hidden aspect-[16/10] w-full select-none md:block lg:aspect-[16/9]">
        <ModeToggle mode={mode} onChange={setMode} className="absolute right-0 top-0 z-40" />

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

          {/* Architecture mode: radial hub-and-spoke */}
          <g
            className="transition-opacity duration-500"
            style={{ opacity: isFlow ? 0 : 1 }}
          >
            {NODES.filter((n) => !n.flowOnly).map((n, i) => {
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
                  {/* Traveling data-packet pulse. Staggered so only a few lines
                      are in flight at once; dims further when another node is
                      hovered so the hovered path reads clearly. */}
                  {!reducedMotion && !isFlow && (
                    <line
                      x1={CENTER.x} y1={CENTER.y} x2={n.x} y2={n.y}
                      stroke="url(#arch-pulse)"
                      strokeWidth={isHot ? 1.6 : 1}
                      vectorEffect="non-scaling-stroke"
                      strokeDasharray="3 97"
                      strokeDashoffset="100"
                      opacity={isHot ? 0.9 : hovered ? 0.08 : 0.25}
                      pathLength={100}
                      style={{
                        animation: "arch-dash 5.5s linear infinite",
                        animationDelay: `${(i * 0.45).toFixed(2)}s`,
                        transition: "opacity 0.3s",
                      }}
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* Build Stack mode: serpentine request path */}
          <g
            className="transition-opacity delay-200 duration-500"
            style={{ opacity: isFlow ? 1 : 0 }}
          >
            <path
              d={FLOW_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            {!reducedMotion && isFlow && (
              <>
                <path
                  d={FLOW_PATH}
                  fill="none"
                  stroke="url(#arch-pulse)"
                  strokeWidth={1.4}
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="4 96"
                  strokeDashoffset="100"
                  opacity={0.7}
                  pathLength={100}
                  style={{ animation: "arch-dash 6s linear infinite" }}
                />
                <path
                  d={FLOW_PATH}
                  fill="none"
                  stroke="url(#arch-pulse)"
                  strokeWidth={1.4}
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="4 96"
                  strokeDashoffset="100"
                  opacity={0.3}
                  pathLength={100}
                  style={{ animation: "arch-dash 6s linear infinite", animationDelay: "3s" }}
                />
              </>
            )}
          </g>
        </svg>

        {/* Center node — click to switch views */}
        <motion.div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          initial={false}
          animate={{
            left: `${isFlow ? FLOW_CENTER.x : CENTER.x}%`,
            top: `${isFlow ? FLOW_CENTER.y : CENTER.y}%`,
          }}
          transition={moveTransition}
        >
          <button
            type="button"
            onClick={toggleMode}
            aria-pressed={isFlow}
            aria-label={isFlow ? "Switch to Architecture view" : "Switch to Build Stack view"}
            className="group relative rounded-2xl border border-white/20 bg-[#0b0b14]/90 px-6 py-4 text-center shadow-[0_0_50px_rgba(139,92,246,0.25)] backdrop-blur outline-none transition hover:border-white/35 focus-visible:ring-2 focus-visible:ring-fuchsia-400/60"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />
            <div className="text-sm font-bold text-white">Jessie Walters</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/45">
              Forward-Deployed Engineer
            </div>
            <div className="mt-1.5 text-[10px] text-white/35 transition group-hover:text-white/60">
              {isFlow ? "◂ back to architecture" : "view build stack ▸"}
            </div>
          </button>
        </motion.div>

        {/* Technology nodes */}
        {NODES.map((n) => {
          const isHot = hovered === n.id;
          const cat = CATEGORIES[n.category];
          const visible = isFlow ? !!n.flow : !n.flowOnly;
          const pos = isFlow && n.flow ? { x: n.flow.x, y: n.flow.y } : { x: n.x, y: n.y };
          const label = isFlow && n.flow?.label ? n.flow.label : n.label;
          // Flip the detail card above the node for lower-half nodes so it stays in view.
          const flipUp = pos.y > 65;
          return (
            <motion.div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              initial={false}
              animate={{ left: `${pos.x}%`, top: `${pos.y}%`, opacity: visible ? 1 : 0 }}
              transition={moveTransition}
              style={{ zIndex: isHot ? 30 : 20, pointerEvents: visible ? "auto" : "none" }}
              aria-hidden={!visible}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex flex-col items-center">
                <motion.button
                  type="button"
                  tabIndex={visible ? 0 : -1}
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
                  <span className={isHot ? cat.iconHot : cat.iconIdle}>{n.icon}</span>
                  {label}
                </motion.button>
                {/* Build Stack step caption */}
                {isFlow && n.flow && (
                  <span className="pointer-events-none mt-1.5 text-[9px] uppercase tracking-[0.15em] text-white/35">
                    {n.flow.caption}
                  </span>
                )}
              </div>

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
                <div className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${cat.text}`}>
                  {cat.label}
                </div>
                <div className="mt-0.5 text-xs font-semibold text-white">{n.label}</div>
                <div className="mt-1 text-[11px] leading-relaxed text-white/60">{n.blurb}</div>
              </motion.div>
            </motion.div>
          );
        })}

        <style>{`
          @keyframes arch-dash {
            from { stroke-dashoffset: 100; }
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </div>

      {/* ---------- Mobile ---------- */}
      <div className="md:hidden">
        <ModeToggle mode={mode} onChange={setMode} className="mb-4 flex justify-center" />

        <div className="relative mb-3 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] p-5 text-center backdrop-blur">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />
          <div className="text-base font-bold text-white">Jessie Walters</div>
          <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/45">Forward-Deployed Engineer</div>
        </div>

        {isFlow ? (
          <div className="flex flex-col">
            {NODES.filter((n) => n.flow)
              .sort((a, b) => a.flow!.order - b.flow!.order)
              .map((n, i, arr) => (
                <React.Fragment key={n.id}>
                  <MobileArchCard node={n} flowMode />
                  {i < arr.length - 1 && (
                    <div className="ml-7 h-5 w-px bg-gradient-to-b from-violet-400/40 to-cyan-300/40" aria-hidden />
                  )}
                </React.Fragment>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {NODES.filter((n) => !n.flowOnly).map((n) => (
              <MobileArchCard key={n.id} node={n} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ModeToggle({ mode, onChange, className }: { mode: Mode; onChange: (m: Mode) => void; className?: string }) {
  return (
    <div className={className}>
      <div
        role="group"
        aria-label="Diagram view"
        className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1 text-xs backdrop-blur"
      >
        {([
          ["arch", "Architecture"],
          ["flow", "Build Stack"],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            aria-pressed={mode === value}
            className={`rounded-full px-3 py-1 font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-fuchsia-400/60 ${
              mode === value ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MobileArchCard({ node, flowMode = false }: { node: ArchNode; flowMode?: boolean }) {
  const [open, setOpen] = useState(false);
  const cat = CATEGORIES[node.category];
  const label = flowMode && node.flow?.label ? node.flow.label : node.label;
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur transition hover:border-white/20 focus-visible:ring-2 focus-visible:ring-fuchsia-400/60"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-white/85">
          <span className={cat.iconHot}>{node.icon}</span>
          {label}
          {flowMode && node.flow && (
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/35">
              {node.flow.caption}
            </span>
          )}
        </span>
        <ChevronDown className={`h-4 w-4 text-white/40 transition-transform ${open ? "rotate-180" : ""}`} />
      </span>
      {open && (
        <span className="mt-2 block">
          <span className={`block text-[9px] font-semibold uppercase tracking-[0.18em] ${cat.text}`}>
            {cat.label}
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-white/60">{node.blurb}</span>
        </span>
      )}
    </button>
  );
}
