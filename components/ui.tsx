"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Fragment, createElement, isValidElement, useEffect, useRef, useState, type CSSProperties, type ReactElement, type ReactNode } from "react";

export function Button({ href, children, variant = "primary", className, external, ...rest }: { href: string; children: ReactNode; variant?: "primary" | "outline" | "ghost"; className?: string; external?: boolean }) {
  const cls = cn("btn", variant === "primary" && "btn-primary", variant === "outline" && "btn-outline", variant === "ghost" && "btn-ghost", className);
  const ext = external ?? /^https?:/.test(href);
  if (ext) return <a href={href} target="_blank" rel="noopener" className={cls} {...rest}>{children}{variant === "ghost" && <ArrowRight size={16} />}</a>;
  return <Link href={href} className={cls} {...rest}>{children}{variant === "ghost" && <ArrowRight size={16} />}</Link>;
}

// Scroll-in reveal. When several Reveals sit side by side in the same parent, they queue left → right
// automatically (each waits STEP s longer than the previous sibling), unless an explicit delay is given.
const STEP = 0.09;
export function Reveal({ children, className, delay, y = 24, once = true, stagger = true }: { children: ReactNode; className?: string; delay?: number; y?: number; once?: boolean; stagger?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [auto, setAuto] = useState(0);
  useEffect(() => {
    if (delay !== undefined || !stagger) return;
    const el = ref.current; if (!el?.parentElement) return;
    const sibs = Array.from(el.parentElement.children).filter((c) => c.hasAttribute("data-reveal"));
    const i = sibs.indexOf(el);
    if (i > 0) setAuto(i * STEP);
  }, [delay, stagger]);
  return (
    <motion.div ref={ref} data-reveal className={className} initial={reduce ? false : { opacity: 0, y, x: -14, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }} viewport={{ once, margin: "-10% 0px" }} transition={{ duration: 0.7, delay: delay ?? auto, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// Word-by-word fade-in for headings. Walks the children, splits every text node into words and gives each a
// stagger delay. The reveal itself is CSS (see .w-word in globals.css) and is triggered by <WordsObserver /> in the
// root layout, which adds .is-in when the heading scrolls into view — so it works on any heading, server-rendered or not.
export function Words({ children, delay = 0.05, step = 0.055, className }: { children: ReactNode; delay?: number; step?: number; className?: string }) {
  let i = 0;
  const walk = (node: ReactNode): ReactNode => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node).split(/(\s+)/).map((part, k) => {
        if (!part) return null;
        if (/^\s+$/.test(part)) return <Fragment key={k}> </Fragment>;
        const d = (delay + i++ * step).toFixed(3);
        return <span key={k} className="w-word" style={{ "--d": `${d}s` } as CSSProperties}>{part}</span>;
      });
    }
    if (Array.isArray(node)) return node.map((n, k) => <Fragment key={k}>{walk(n)}</Fragment>);
    if (isValidElement(node)) {
      const el = node as ReactElement<{ children?: ReactNode }>;
      if (el.props.children === undefined || el.props.children === null) return el;
      const { children: inner, ...rest } = el.props;
      return createElement(el.type, { ...rest, key: el.key ?? undefined }, walk(inner));
    }
    return node;
  };
  return <span data-words className={className}>{walk(children)}</span>;
}

// Mounted once in the root layout: reveals every [data-words] heading when it enters the viewport.
export function WordsObserver() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }, { rootMargin: "-8% 0px" });
    const scan = () => document.querySelectorAll<HTMLElement>("[data-words]:not([data-wo])").forEach((el) => { el.dataset.wo = "1"; io.observe(el); });
    scan();
    let raf = 0;
    const mo = new MutationObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(scan); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); io.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return null;
}

export function SectionHeading({ eyebrow, title, sub, align = "left", className, as: Tag = "h2" }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; align?: "left" | "center"; className?: string; as?: "h1" | "h2" | "h3" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <Tag className="display text-[2.6rem] sm:text-6xl lg:text-7xl"><Words>{title}</Words></Tag>
      {sub && <p className="mt-4 text-mute text-base sm:text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1 text-xs tracking-wide text-white/80", className)}>{children}</span>;
}
