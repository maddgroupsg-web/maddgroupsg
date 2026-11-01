"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Theatre intro: logo builds in an L (M·A·D·D down, S·P·A·C·E across), the rest of the words slide in,
// the logo fades and the black screen splits open to reveal the page. Plays once per browser session.
const ROWS = [
  { lead: "M", rest: "USIC" },
  { lead: "A", rest: "RT" },
  { lead: "D", rest: "RAMA" },
  { lead: "D", rest: "ANCE" },
];
const SPACE = ["S", "P", "A", "C", "E"];
const T = { box: 0.15, lead: 0.75, step: 0.22, rest: 1.95, hold: 2.9, open: 3.25, done: 4.4 };

export default function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (reduce) return;
    try { if (sessionStorage.getItem("madd-intro")) return; } catch {}
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setOpen(true), T.open * 1000);
    const t2 = setTimeout(() => finish(), T.done * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); document.documentElement.style.overflow = ""; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // let the hero know the panels have split so its headline can start
  useEffect(() => { if (open) window.dispatchEvent(new Event("madd:intro-open")); }, [open]);

  const finish = () => { setShow(false); document.documentElement.style.overflow = ""; try { sessionStorage.setItem("madd-intro", "1"); } catch {} };
  const skip = () => { setOpen(true); setTimeout(finish, 900); };

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="intro" className="fixed inset-0 z-[100] overflow-hidden select-none pointer-events-none" onClick={skip} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} aria-hidden style={{ pointerEvents: open ? "none" : "auto" }}>
          {/* curtains */}
          <Curtain side="left" open={open} />
          <Curtain side="right" open={open} />
          {/* logo */}
          <motion.div className="absolute inset-0 z-30 flex items-center justify-center" animate={{ opacity: open ? 0 : 1, scale: open ? 1.04 : 1 }} transition={{ duration: 0.5 }}>
            <Logo />
          </motion.div>
          <div className="absolute bottom-6 inset-x-0 z-30 text-center text-[10px] tracking-[0.3em] text-white/40">TAP TO SKIP</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Curtain({ side, open }: { side: "left" | "right"; open: boolean }) {
  return (
    <motion.div
      className={`absolute top-0 bottom-0 w-1/2 z-10 bg-ink ${side === "left" ? "left-0" : "right-0"}`}
      initial={false}
      animate={open ? { x: side === "left" ? "-100%" : "100%" } : { x: 0 }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* thin cyan seam that glows as the screen opens */}
      <motion.div className={`absolute top-0 bottom-0 w-px ${side === "left" ? "right-0" : "left-0"}`} style={{ background: "linear-gradient(180deg, transparent, #22d3d3 30%, #22d3d3 70%, transparent)", boxShadow: "0 0 18px 2px rgba(34,211,211,0.6)" }} initial={{ opacity: 0 }} animate={{ opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} />
    </motion.div>
  );
}

function Logo() {
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <div className="relative" style={{ width: "min(62vw, 300px)", aspectRatio: "1 / 1" }}>
      {/* box draws itself */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
        <motion.rect x="2" y="2" width="96" height="96" stroke="#22d3d3" strokeWidth="2.2" initial={{ pathLength: 0, opacity: 0.4 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.1, delay: T.box, ease: "easeInOut" }} style={{ filter: "drop-shadow(0 0 6px rgba(34,211,211,.8))" }} />
      </svg>
      <div className="absolute inset-[11%] flex flex-col justify-between font-light uppercase text-white" style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.1em", fontSize: "min(9.2vw, 44px)", lineHeight: 1 }}>
        {ROWS.map((r, i) => (
          <div key={i} className="flex items-baseline overflow-hidden">
            <motion.span className="inline-block font-medium" initial={{ opacity: 0, y: "-40%" }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: T.lead + i * T.step, ease }}>{r.lead}</motion.span>
            <motion.span className="inline-block" initial={{ opacity: 0, x: "-60%" }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: T.rest + i * 0.12, ease }}>{r.rest}</motion.span>
          </div>
        ))}
        <div className="flex items-baseline text-cyan" style={{ textShadow: "0 0 14px rgba(34,211,211,.6)" }}>
          {SPACE.map((c, i) => (
            <motion.span key={i} className={`inline-block ${i === 0 ? "font-medium" : ""}`} initial={{ opacity: 0, x: "-30%" }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: T.lead + ROWS.length * T.step + i * 0.14, ease }}>{c}</motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
