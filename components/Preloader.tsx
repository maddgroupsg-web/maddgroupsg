"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Intro, once per browser session. Black stage; two spotlights swing in from the top corners and land on the
// logo, which lights up; then the screen opens from the middle (top half up, bottom half down) onto the page.
const T = { beams: 0.3, lit: 1.15, open: 2.35, done: 3.3 }; // seconds
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const SWING: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Beam shapes in a 100 x 100 stretched box: a cone from a top corner. "from" hangs down the side, "to" lands on the logo.
const LEFT = { from: "M-4 -4 L2 112 L20 106 Z", to: "M-4 -4 L40 67 L61 49 Z" };
const RIGHT = { from: "M104 -4 L98 112 L80 106 Z", to: "M104 -4 L60 67 L39 49 Z" };

export default function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const finish = useCallback(() => {
    setShow(false);
    document.documentElement.style.overflow = "";
    try { sessionStorage.setItem("madd-intro", "1"); } catch {}
  }, []);

  useEffect(() => {
    if (reduce) return;
    try { if (sessionStorage.getItem("madd-intro")) return; } catch {}
    const t0 = setTimeout(() => { setShow(true); document.documentElement.style.overflow = "hidden"; }, 0);
    const t1 = setTimeout(() => setOpen(true), T.open * 1000);
    const t2 = setTimeout(finish, T.done * 1000);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); document.documentElement.style.overflow = ""; };
  }, [reduce, finish]);

  // let the hero know the screen has opened so its text can start
  useEffect(() => { if (open) window.dispatchEvent(new Event("madd:intro-open")); }, [open]);

  const skip = () => { setOpen(true); setTimeout(finish, 800); };

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="intro" className="fixed inset-0 z-[100] overflow-hidden select-none" onClick={skip} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} aria-hidden style={{ pointerEvents: open ? "none" : "auto" }}>
          <Half side="top" open={open} />
          <Half side="bottom" open={open} />

          {/* the two spotlights */}
          <motion.svg className="absolute inset-0 z-20 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: "blur(22px)", mixBlendMode: "screen" }} animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.35 }}>
            <defs>
              <linearGradient id="beamL" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.5" /><stop offset="1" stopColor="#fff" stopOpacity="0.14" /></linearGradient>
              <linearGradient id="beamR" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.5" /><stop offset="1" stopColor="#fff" stopOpacity="0.14" /></linearGradient>
            </defs>
            <motion.path fill="url(#beamL)" initial={{ d: LEFT.from, opacity: 0 }} animate={{ d: LEFT.to, opacity: 1 }} transition={{ d: { duration: 0.95, delay: T.beams, ease: SWING }, opacity: { duration: 0.35, delay: T.beams } }} />
            <motion.path fill="url(#beamR)" initial={{ d: RIGHT.from, opacity: 0 }} animate={{ d: RIGHT.to, opacity: 1 }} transition={{ d: { duration: 0.95, delay: T.beams + 0.14, ease: SWING }, opacity: { duration: 0.35, delay: T.beams + 0.14 } }} />
          </motion.svg>

          {/* pool of light where the beams meet */}
          <motion.div className="absolute left-1/2 top-1/2 z-20 h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.20), rgba(255,255,255,0.05) 55%, transparent)" }} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: open ? 0 : 1, scale: 1 }} transition={{ opacity: { duration: open ? 0.3 : 0.5, delay: open ? 0 : T.lit - 0.15 }, scale: { duration: 0.7, delay: T.lit - 0.15, ease: SWING } }} />

          {/* logo: in the dark until the lights land on it */}
          <motion.div className="absolute inset-0 z-30 flex items-center justify-center" initial={{ opacity: 0.05, filter: "brightness(0.5)" }} animate={{ opacity: open ? 0 : 1, filter: "brightness(1.1)" }} transition={{ opacity: { duration: open ? 0.25 : 0.55, delay: open ? 0 : T.lit }, filter: { duration: 0.55, delay: T.lit } }}>
            <Image src="/images/brand/maddspace-logo.png" alt="" width={738} height={738} priority className="h-20 w-auto sm:h-24" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Half({ side, open }: { side: "top" | "bottom"; open: boolean }) {
  return (
    <motion.div
      className={`absolute left-0 right-0 z-10 h-1/2 bg-ink ${side === "top" ? "top-0" : "bottom-0"}`}
      initial={false}
      animate={open ? { y: side === "top" ? "-100%" : "100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}
