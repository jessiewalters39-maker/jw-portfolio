"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SESSION_KEY = "jw-boot-v3";
const HEADER_TEXT = "Initializing Jessie Walters...";

const BOOT_LINES = [
  "Infrastructure loaded",
  "APIs connected",
  "AI agents online",
  "Automation engine ready",
  "Customer systems connected",
];

const TYPE_MS = 38;
const LINE_MS = 460;
const MISSION_HOLD_MS = 1100;
const EXIT_MS = 800;

function hasSeenBoot() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markBootSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* private mode — just let it replay */
  }
}

export default function BootSequence() {
  const reducedMotion = useReducedMotion();
  // "pending" until we can read sessionStorage on the client; the overlay is
  // rendered opaque during "pending" so the hero never flashes underneath.
  // Exit is a plain CSS opacity transition + unmount timer — deliberately not
  // AnimatePresence, which proved unreliable for this always-on-top overlay.
  const [phase, setPhase] = useState<"pending" | "booting" | "exiting" | "done">("pending");
  const [typedCount, setTypedCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [missionVisible, setMissionVisible] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const finishedRef = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    clearTimers();
    markBootSeen();
    setPhase("exiting");
    setTimeout(() => setPhase("done"), EXIT_MS + 50);
  }, [clearTimers]);

  useEffect(() => {
    if (finishedRef.current) return;
    if (hasSeenBoot()) {
      finishedRef.current = true;
      setPhase("done");
      return;
    }
    setPhase("booting");

    const schedule = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    };

    if (reducedMotion) {
      // No typing for reduced motion — show everything, hold briefly, fade.
      setTypedCount(HEADER_TEXT.length);
      setLineCount(BOOT_LINES.length);
      setMissionVisible(true);
      schedule(finish, 1600);
      return clearTimers;
    }

    let t = 350;
    for (let i = 1; i <= HEADER_TEXT.length; i++) {
      schedule(() => setTypedCount(i), t);
      t += TYPE_MS;
    }
    t += 300;
    for (let i = 1; i <= BOOT_LINES.length; i++) {
      schedule(() => setLineCount(i), t);
      t += LINE_MS;
    }
    t += 250;
    schedule(() => setMissionVisible(true), t);
    t += MISSION_HOLD_MS;
    schedule(finish, t);

    return clearTimers;
  }, [reducedMotion, finish, clearTimers]);

  // Lock page scroll while the boot screen is up.
  useEffect(() => {
    if (phase === "done" || phase === "exiting") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  const showContent = phase === "booting" || phase === "exiting";

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050508] transition-opacity ease-out ${
        phase === "exiting" ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${EXIT_MS}ms` }}
    >
      {/* Soft glow behind the terminal text */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/3 -translate-y-1/3 rounded-full bg-cyan-500/10 blur-3xl"
      />
      {/* Subtle scan lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050508_100%)]"
      />

      {showContent && (
        <div className="relative w-full max-w-md px-8 font-mono text-sm md:text-base">
          <div className="text-white/85">
            <span className="mr-2 select-none text-white/35">$</span>
            {HEADER_TEXT.slice(0, typedCount)}
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-cyan-300/80"
              style={{ animation: "jw-boot-blink 1s steps(1) infinite" }}
            />
          </div>

          <div className="mt-5 space-y-2.5" aria-live="polite">
            {BOOT_LINES.slice(0, lineCount).map((line) => (
              <motion.div
                key={line}
                initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2.5 text-white/60"
              >
                <motion.span
                  initial={reducedMotion ? false : { scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-emerald-400"
                >
                  ✓
                </motion.span>
                {line}
              </motion.div>
            ))}
          </div>

          {missionVisible && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-base font-semibold md:text-lg"
            >
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                Mission loaded.
              </span>
            </motion.div>
          )}

          <button
            onClick={finish}
            className="absolute -bottom-16 right-8 text-xs tracking-wider text-white/30 transition hover:text-white/70"
          >
            skip ↵
          </button>
        </div>
      )}

      <style>{`
        @keyframes jw-boot-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
