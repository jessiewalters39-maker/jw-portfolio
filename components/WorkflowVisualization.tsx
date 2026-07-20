"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  PhoneIncoming, Bot, Workflow, Database, CalendarCheck,
  MessageSquare, DollarSign, Check, Radio,
} from "lucide-react";

type Node = {
  label: string;
  icon: React.ReactNode;
  // Alternate events per cycle so the feed feels alive, not scripted.
  events: string[];
};

const NODES: Node[] = [
  { label: "Customer Inquiry", icon: <PhoneIncoming className="h-4 w-4" />, events: ["Customer called", "Web lead captured"] },
  { label: "AI Receptionist", icon: <Bot className="h-4 w-4" />, events: ["Call answered · intent captured", "Conversation transcribed"] },
  { label: "Automation Engine", icon: <Workflow className="h-4 w-4" />, events: ["Workflow triggered", "Proposal generated"] },
  { label: "CRM", icon: <Database className="h-4 w-4" />, events: ["CRM updated", "Contact enriched"] },
  { label: "Scheduler", icon: <CalendarCheck className="h-4 w-4" />, events: ["Appointment booked", "Reminder scheduled"] },
  { label: "Follow-Up", icon: <MessageSquare className="h-4 w-4" />, events: ["SMS sent", "Review requested"] },
  { label: "Revenue", icon: <DollarSign className="h-4 w-4" />, events: ["Invoice delivered", "Payment received"] },
];

const STEP_MS = 1150;
const PAUSE_MS = 2400;

type FeedEvent = { id: number; time: string; text: string };

function timestamp() {
  return new Date().toLocaleTimeString("en-US", { hour12: false });
}

export default function WorkflowVisualization() {
  const reducedMotion = useReducedMotion();
  // step: -1 = idle between cycles, 0..N-1 = pulse position
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [feed, setFeed] = useState<FeedEvent[]>([]);
  const eventId = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;
    const delay = step === NODES.length - 1 ? PAUSE_MS : step === -1 ? 400 : STEP_MS;
    const t = setTimeout(() => {
      if (step === NODES.length - 1) {
        setStep(-1);
        setCycle((c) => c + 1);
      } else {
        setStep((s) => s + 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [step, reducedMotion]);

  // Emit a live event as the pulse reaches each node.
  useEffect(() => {
    if (reducedMotion || step < 0) return;
    const node = NODES[step];
    const text = node.events[cycle % node.events.length];
    setFeed((prev) => [{ id: eventId.current++, time: timestamp(), text }, ...prev].slice(0, 4));
  }, [step, cycle, reducedMotion]);

  const isActive = (i: number) => !reducedMotion && step === i;
  const isDone = (i: number) => reducedMotion || (step === -1 ? false : i < step) || step === -1;

  return (
    <div>
      {/* ---- Pipeline: horizontal on md+, vertical on mobile ---- */}
      <div className="hidden md:flex md:items-stretch">
        {NODES.map((node, i) => (
          <React.Fragment key={node.label}>
            <PipelineCard node={node} active={isActive(i)} done={isDone(i)} />
            {i < NODES.length - 1 && (
              <div className="relative mx-1 flex min-w-4 flex-1 items-center self-stretch" aria-hidden>
                <div className="h-px w-full bg-white/10" />
                <motion.div
                  className="absolute left-0 top-1/2 h-px w-full origin-left -translate-y-1/2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300"
                  animate={{ scaleX: isDone(i) || isActive(i) ? 1 : 0, opacity: isDone(i) || isActive(i) ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-col md:hidden">
        {NODES.map((node, i) => (
          <React.Fragment key={node.label}>
            <PipelineCard node={node} active={isActive(i)} done={isDone(i)} />
            {i < NODES.length - 1 && (
              <div className="relative ml-7 h-6 w-px bg-white/10" aria-hidden>
                <motion.div
                  className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-violet-400 to-cyan-300"
                  animate={{ scaleY: isDone(i) || isActive(i) ? 1 : 0, opacity: isDone(i) || isActive(i) ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ---- Live event feed ---- */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
          <Radio className="h-3.5 w-3.5 text-emerald-400" />
          Live events
          <span className="relative ml-1 flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
        </div>
        <div className="px-4 py-3 font-mono text-xs leading-6 text-white/55" aria-live="off">
          {reducedMotion ? (
            <>
              <div><span className="text-white/30">—</span> Customer called → appointment booked → invoice delivered</div>
              <div className="text-white/35">Animation paused (reduced motion enabled)</div>
            </>
          ) : feed.length === 0 ? (
            <div className="text-white/30">listening…</div>
          ) : (
            feed.map((e) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-3"
              >
                <span className="shrink-0 text-white/25">{e.time}</span>
                <span>{e.text}</span>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function PipelineCard({ node, active, done }: { node: Node; active: boolean; done: boolean }) {
  return (
    <motion.div
      className="relative flex shrink-0 flex-col items-center gap-2 rounded-2xl border p-3 backdrop-blur transition-colors duration-300 md:w-[7.5rem] max-md:w-full max-md:flex-row max-md:px-4"
      animate={{
        borderColor: active ? "rgba(217,70,239,0.5)" : done ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.10)",
        backgroundColor: active ? "rgba(217,70,239,0.06)" : "rgba(255,255,255,0.04)",
        boxShadow: active
          ? "0 0 24px rgba(217,70,239,0.25), 0 0 60px rgba(34,211,238,0.08)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 ${active ? "text-fuchsia-300" : "text-white/60"}`}>
        {node.icon}
      </span>
      <span className="text-center text-[11px] font-medium leading-tight text-white/75 max-md:text-left max-md:text-sm">
        {node.label}
      </span>
      <motion.span
        aria-hidden
        className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
        initial={false}
        animate={{ scale: done || active ? 1 : 0, opacity: done || active ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </motion.span>
    </motion.div>
  );
}
