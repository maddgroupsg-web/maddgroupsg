"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Theatre intro: logo builds in an L (M·A·D·D down, S·P·A·C·E across), the rest of the words slide in,
// the logo fades and the red curtains part to reveal the stage. Plays once per browser session.
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
    try { if (sessionStorage.getItem("madd-intro")) return; sessionStorage.setItem("madd-intro", "1"); } catch {}
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setOpen(true), T.open * 1000);
    const t2 = setTimeout(() => finish(), T.done * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); document.documentElement.style.overflow = ""; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => { setShow(false); document.documentElement.style.overflow = ""; };
  const skip = () => { setOpen(true); setTimeout(finish, 900); };

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="intro" className="fixed inset-0 z-[100] overflow-hidden select-none" onClick={skip} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} aria-hidden>
          {/* stage behind the curtain: dark + spotlight */}
          <div className="absolute inset-0 bg-ink" />
          {/* curtains */}
          <Curtain side="left" open={open} />
          <Curtain side="right" open={open} />
          {/* valance */}
          <motion.div className="absolute inset-x-0 top-0 h-[9vh] z-20" style={{ background: "linear-gradient(180deg,#5a0b16,#3a060d 70%,transparent)", boxShadow: "0 10px 30px rgba(0,0,0,.6)" }} animate={{ y: open ? "-100%" : 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.76, 0, 0.24, 1] }} />
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
  const folds = "repeating-linear-gradient(90deg, #7a1020 0px, #4a0810 22px, #8a1526 44px, #3b060c 70px)";
  return (
    <motion.div
      className={`absolute top-0 bottom-0 w-1/2 z-10 ${side === "left" ? "left-0 origin-left" : "right-0 origin-right"}`}
      style={{ background: folds, boxShadow: side === "left" ? "12px 0 40px rgba(0,0,0,.7)" : "-12px 0 40px rgba(0,0,0,.7)" }}
      initial={false}
      animate={open ? { x: side === "left" ? "-100%" : "100%", scaleX: 0.75 } : { x: 0, scaleX: 1 }}
      transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 80% at 50% 50%, rgba(255,120,140,0.10), transparent 70%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.35), transparent 30%, transparent 70%, rgba(0,0,0,.5))" }} />
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
      <div className="absolute inset-[11%] flex flex-col justify-between font-light uppercase text-white" style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.08em", fontSize: "min(9.2vw, 44px)", lineHeight: 1 }}>
        {ROWS.map((r, i) => (
          <div key={i} className="flex items-baseline overflow-hidden">
            <motion.span className="inline-block w-[1.1em] font-medium" initial={{ opacity: 0, y: "-40%" }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: T.lead + i * T.step, ease }}>{r.lead}</motion.span>
            <motion.span className="inline-block" initial={{ opacity: 0, x: "-60%" }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: T.rest + i * 0.12, ease }}>{r.rest}</motion.span>
          </div>
        ))}
        <div className="flex items-baseline text-cyan" style={{ textShadow: "0 0 14px rgba(34,211,211,.6)" }}>
          {SPACE.map((c, i) => (
            <motion.span key={i} className={`inline-block ${i === 0 ? "w-[1.1em] font-medium" : ""}`} initial={{ opacity: 0, x: "-30%" }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: T.lead + ROWS.length * T.step + i * 0.14, ease }}>{c}</motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
