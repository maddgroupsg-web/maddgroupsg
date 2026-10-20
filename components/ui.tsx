"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

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
    <motion.div ref={ref} data-reveal className={className} initial={reduce ? false : { opacity: 0, y, x: -14 }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once, margin: "-10% 0px" }} transition={{ duration: 0.7, delay: delay ?? auto, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, sub, align = "left", className, as: Tag = "h2" }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; align?: "left" | "center"; className?: string; as?: "h1" | "h2" | "h3" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <Tag className="display text-[2.6rem] sm:text-6xl lg:text-7xl">{title}</Tag>
      {sub && <p className="mt-4 text-mute text-base sm:text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1 text-xs tracking-wide text-white/80", className)}>{children}</span>;
}
