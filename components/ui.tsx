"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Button({ href, children, variant = "primary", className, external, ...rest }: { href: string; children: ReactNode; variant?: "primary" | "outline" | "ghost"; className?: string; external?: boolean }) {
  const cls = cn("btn", variant === "primary" && "btn-primary", variant === "outline" && "btn-outline", variant === "ghost" && "btn-ghost", className);
  const ext = external ?? /^https?:/.test(href);
  if (ext) return <a href={href} target="_blank" rel="noopener" className={cls} {...rest}>{children}{variant === "ghost" && <ArrowRight size={16} />}</a>;
  return <Link href={href} className={cls} {...rest}>{children}{variant === "ghost" && <ArrowRight size={16} />}</Link>;
}

export function Reveal({ children, className, delay = 0, y = 24, once = true }: { children: ReactNode; className?: string; delay?: number; y?: number; once?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once, margin: "-10% 0px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
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
