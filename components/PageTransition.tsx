"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Page transition after benjamintoh.com, running top to bottom: horizontal bands grow down one after another
// until the screen is covered, the new page loads underneath, then the bands pull away top to bottom.
// Applies to internal link clicks. Reduced-motion users get a plain navigation.
const BANDS = 6;
const STEP = 55; // ms between bands
const GROW = 420; // ms each band takes
const COVER = GROW + STEP * (BANDS - 1); // fully covered after this
const COLOUR = "#22d3d3";

export default function PageTransition() {
  const router = useRouter();
  const path = usePathname();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const target = useRef<{ path: string; href: string } | null>(null);
  const busy = useRef(false);
  const pathRef = useRef(path);
  useEffect(() => { pathRef.current = path; }, [path]);

  // 1) intercept internal link clicks and cover the screen
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      let url: URL; try { url = new URL(a.href, location.href); } catch { return; }
      if (url.origin !== location.origin || url.pathname === pathRef.current) return; // other sites, same-page anchors
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      if (busy.current) return;
      busy.current = true;
      target.current = { path: url.pathname, href: url.pathname + url.search + url.hash };
      setPhase("in");
      setTimeout(() => router.push(target.current!.href, { scroll: false }), COVER);
      setTimeout(() => setPhase((p) => (p === "in" ? "out" : p)), COVER + 4000); // never leave the screen covered
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // 2) once the new page is in place, jump to its top and uncover
  useEffect(() => {
    if (phase !== "in" || !target.current || path !== target.current.path) return;
    const t = setTimeout(() => { window.scrollTo(0, 0); setPhase("out"); }, 80);
    return () => clearTimeout(t);
  }, [path, phase]);

  // 3) after uncovering, rest
  useEffect(() => {
    if (phase !== "out") return;
    const t = setTimeout(() => { setPhase("idle"); busy.current = false; target.current = null; }, COVER + 50);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "idle") return null;
  return (
    <div className="pointer-events-auto fixed inset-0 z-[95]" aria-hidden>
      {Array.from({ length: BANDS }, (_, i) => (
        <Band key={i} i={i} phase={phase} />
      ))}
    </div>
  );
}

function Band({ i, phase }: { i: number; phase: "in" | "out" }) {
  // mount at 0 then grow, so the "in" transition actually runs
  const [grown, setGrown] = useState(false);
  useEffect(() => { const r = requestAnimationFrame(() => setGrown(true)); return () => cancelAnimationFrame(r); }, []);
  const covering = phase === "in" ? grown : false;
  return (
    <div
      className="absolute left-0 right-0"
      style={{
        top: `${(i * 100) / BANDS}%`,
        height: `calc(${100 / BANDS}% + 1px)`,
        background: COLOUR,
        transform: `scaleY(${covering ? 1 : 0})`,
        transformOrigin: phase === "in" ? "top" : "bottom",
        transition: `transform ${GROW}ms cubic-bezier(0.76, 0, 0.24, 1) ${i * STEP}ms`,
      }}
    />
  );
}
