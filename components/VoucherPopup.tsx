"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { waLink } from "@/lib/utils";
import { byId } from "@/content/videos";

const DELAY = 30_000; // 30 seconds on the site
const SEEN = "madd-voucher-seen"; // localStorage: shown once per visitor
const clip = byId("mj-2025-kstars-junior"); // the performance playing beside the form
const START = "madd-visit-start"; // sessionStorage: when this visit began, so changing page does not restart the clock

// The voucher sign-up from the current site, shown once after 30 seconds of browsing.
// Phase 1 has no backend: Sign me up hands the details to WhatsApp, like the enquiry form.
export default function VoucherPopup() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ name: "", email: "", age: "", phone: "" });
  const skip = path.startsWith("/trial"); // ad landing pages keep one clear action

  useEffect(() => {
    if (skip) return;
    let seen = false, start = Date.now();
    try {
      seen = !!localStorage.getItem(SEEN);
      const s = sessionStorage.getItem(START);
      if (s) start = Number(s); else sessionStorage.setItem(START, String(start));
    } catch {}
    if (seen) return;
    const t = setTimeout(() => {
      setOpen(true);
      try { localStorage.setItem(SEEN, "1"); } catch {}
    }, Math.max(0, DELAY - (Date.now() - start)));
    return () => clearTimeout(t);
  }, [skip]);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(waLink(`Hi MADDspace, I'd like the $20 voucher and to know more.\nName: ${f.name}\nEmail: ${f.email}\nAge: ${f.age}\nPhone: ${f.phone}`), "_blank");
    setOpen(false);
  };
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="voucher-title">
      <div className="absolute inset-0 bg-black/75 animate-[fadeIn_.3s_ease-out]" onClick={() => setOpen(false)} />
      <div className="relative grid w-full max-w-[880px] overflow-hidden border border-white/12 bg-[#0b0d10] shadow-2xl shadow-black/80 md:grid-cols-[0.85fr_1fr] animate-[popIn_.45s_cubic-bezier(.22,1,.36,1)]">
        <div className="relative hidden md:block">
          <video src={clip.loop} poster={clip.poster} autoPlay muted loop playsInline preload="metadata" aria-label="MADDspace students performing on stage" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        </div>
        <form onSubmit={submit} className="p-6 sm:p-9">
          <h2 id="voucher-title" className="font-display text-[1.5rem] sm:text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em]">
            Interested in knowing more about us?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">Receive a <span className="font-semibold text-accent">$20 voucher</span> to apply on your future classes!</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <input required value={f.name} onChange={set("name")} placeholder="Name" aria-label="Name" className={inp} />
            <input required type="email" value={f.email} onChange={set("email")} placeholder="Email Address" aria-label="Email Address" className={inp} />
            <input value={f.age} onChange={set("age")} placeholder="Age" aria-label="Age" inputMode="numeric" className={inp} />
            <input required type="tel" value={f.phone} onChange={set("phone")} placeholder="Phone no." aria-label="Phone no." className={inp} />
          </div>
          <button type="submit" className="btn btn-primary mt-5 w-full"><span className="btn-label" data-text="Sign me up!"><span>Sign me up!</span></span></button>
          <p className="mt-4 text-[12px] leading-relaxed text-white/50">By signing up, you agree to be put on our MADDspace mailing list (Don&apos;t worry we won&apos;t spam you)</p>
        </form>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-white/70 hover:text-white"><X size={20} /></button>
      </div>
    </div>
  );
}
const inp = "h-11 w-full border border-white/15 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/45 outline-none focus:border-white/60";
