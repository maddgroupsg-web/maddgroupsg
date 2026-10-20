"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

// Overlapping parallax page transition (after osmo): the new page slides up from the bottom and covers
// the old one, which drifts up more slowly (-25vh) under a darkening layer. Applies to internal link
// clicks; /classes keeps its own tornado transition. Reduced-motion users get a plain navigation.
const DUR = 1200;
const EASE = "cubic-bezier(0.7, 0.05, 0.13, 1)";
const ROOT_ID = "page-root";

export default function PageTransition() {
  const router = useRouter();
  const path = usePathname();
  const pathRef = useRef(path);
  const target = useRef<string | null>(null);
  const clone = useRef<HTMLDivElement | null>(null);
  const dark = useRef<HTMLDivElement | null>(null);
  const busy = useRef(false);
  useEffect(() => { pathRef.current = path; }, [path]);

  // 1) intercept clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      let url: URL; try { url = new URL(a.href, location.href); } catch { return; }
      if (url.origin !== location.origin) return;
      if (url.pathname === "/classes") return;                       // tornado handles it
      if (url.pathname === pathRef.current) return;                   // same page / hash link
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const root = document.getElementById(ROOT_ID); if (!root || busy.current) { if (busy.current) e.preventDefault(); return; }
      e.preventDefault(); e.stopPropagation();
      busy.current = true; target.current = url.pathname;

      // freeze a pixel-identical copy of the current page on top, so the real DOM can change underneath
      const c = document.createElement("div");
      c.setAttribute("aria-hidden", "true"); c.setAttribute("inert", "");
      c.style.cssText = `position:fixed;inset:0;z-index:60;overflow:hidden;pointer-events:none;background:#050607;will-change:transform;`;
      const inner = root.cloneNode(true) as HTMLElement;
      // fixed elements (nav, floating buttons) lose their anchor inside the copy — pin each where it was on screen
      const liveAll = root.querySelectorAll<HTMLElement>("*"), copyAll = inner.querySelectorAll<HTMLElement>("*");
      liveAll.forEach((el, i) => {
        if (getComputedStyle(el).position !== "fixed") return;
        const r = el.getBoundingClientRect(); const k = copyAll[i]; if (!k) return;
        k.style.cssText += `;position:absolute;top:${r.top + window.scrollY}px;left:${r.left}px;right:auto;bottom:auto;width:${r.width}px;height:${r.height}px;margin:0;transform:none;`;
      });
      inner.removeAttribute("id");
      inner.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
      inner.querySelectorAll("video, iframe").forEach((n) => n.remove());
      inner.style.cssText = `position:absolute;left:0;right:0;top:${-window.scrollY}px;`;
      c.appendChild(inner);
      const d = document.createElement("div");
      d.style.cssText = `position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;`;
      c.appendChild(d);
      document.body.appendChild(c);
      clone.current = c; dark.current = d;

      // park the real page below the fold and go
      document.documentElement.style.overflow = "hidden";
      root.style.transform = "translate3d(0,100vh,0)";
      root.style.position = "relative"; root.style.zIndex = "70";
      window.scrollTo(0, 0);
      router.push(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // 2) when the new route has rendered, run both halves together
  useEffect(() => {
    if (!busy.current || !target.current || path !== target.current) return;
    const root = document.getElementById(ROOT_ID); const c = clone.current; const d = dark.current;
    if (!root || !c || !d) return;
    const opts: KeyframeAnimationOptions = { duration: DUR, easing: EASE, fill: "forwards" };
    const a1 = root.animate([{ transform: "translate3d(0,100vh,0)" }, { transform: "translate3d(0,0,0)" }], opts);
    c.animate([{ transform: "translate3d(0,0,0)" }, { transform: "translate3d(0,-25vh,0)" }], opts);
    d.animate([{ opacity: 0 }, { opacity: 0.8 }], opts);
    a1.onfinish = () => {
      a1.cancel();
      root.style.transform = ""; root.style.position = ""; root.style.zIndex = "";
      document.documentElement.style.overflow = "";
      c.remove(); clone.current = null; dark.current = null; target.current = null; busy.current = false;
    };
  }, [path]);

  return null;
}
