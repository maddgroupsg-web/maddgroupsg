"use client";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Calendar, Clock, MapPin, Users, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/Social";
import type { ClassSlot } from "@/content/schedule";
import { locations } from "@/content/site";
import { waLink } from "@/lib/utils";

type State = "form" | "sending" | "done" | "error";

// Opens from a class on the schedule. The class is already filled in; parents add their details and the
// booking is saved to the Google Sheet through /api/book-trial. If saving fails, WhatsApp is offered instead.
export default function BookTrialModal({ slot, onClose }: { slot: ClassSlot | null; onClose: () => void }) {
  const [f, setF] = useState({ parentName: "", phone: "", email: "", childName: "", childDob: "", message: "", consent: false, website: "" });
  const [state, setState] = useState<State>("form");
  const [error, setError] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    if (!slot) return;
    startedAt.current = Date.now();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [slot, onClose]);

  if (!slot) return null;
  const waitlist = slot.status !== "open";
  const loc = locations.find((l) => l.key === slot.location)!;
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value });
  const summary = `${slot.programme}, ${slot.day} ${slot.time}, ${loc.short}`;
  const wa = waLink(`Hi MADDspace, I'd like to ${waitlist ? "join the waitlist for" : "book a trial for"} ${summary}.\nParent: ${f.parentName}\nPhone: ${f.phone}\nEmail: ${f.email}\nChild: ${f.childName}\nChild's DOB: ${f.childDob}\nMessage: ${f.message}`);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending"); setError("");
    try {
      const res = await fetch("/api/book-trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, kind: waitlist ? "waitlist" : "trial", programme: slot.programme, day: slot.day, time: slot.time, location: loc.name, ages: slot.ages, startedAt: startedAt.current }),
      });
      const out = await res.json().catch(() => ({}));
      if (res.ok && out.ok) { setState("done"); return; }
      setError(out.error ?? "Something went wrong."); setState(res.status === 422 ? "form" : "error");
    } catch {
      setError("Something went wrong."); setState("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="book-title">
      <div className="absolute inset-0 bg-black/80 animate-[fadeIn_.25s_ease-out]" onClick={onClose} />
      <div className="relative max-h-[92svh] w-full max-w-[640px] overflow-y-auto border border-white/12 bg-[#0b0d10] shadow-2xl shadow-black/80 animate-[popIn_.4s_cubic-bezier(.22,1,.36,1)]">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center text-white/70 hover:text-white"><X size={20} /></button>

        {/* the class they picked */}
        <div className="border-b border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="text-[12px] font-medium text-white/55">{waitlist ? "Join the waitlist" : "Book a trial class"}</div>
          <h2 id="book-title" className="mt-1.5 pr-8 font-display text-[1.35rem] sm:text-2xl font-semibold leading-tight tracking-[-0.02em]">{slot.programme}</h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-white/75">
            <li className="flex items-center gap-1.5"><Calendar size={14} className="text-accent" />{slot.day}</li>
            <li className="flex items-center gap-1.5"><Clock size={14} className="text-accent" />{slot.time}</li>
            <li className="flex items-center gap-1.5"><MapPin size={14} className="text-accent" />{loc.short}</li>
            <li className="flex items-center gap-1.5"><Users size={14} className="text-accent" />{slot.ages}</li>
          </ul>
        </div>

        {state === "done" ? (
          <div className="p-6 sm:p-8">
            <CheckCircle2 size={36} className="text-accent" />
            <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em]">Thank you, {f.parentName.split(" ")[0] || "we've got it"}!</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/75">Our team will get back to you shortly to confirm {waitlist ? "your place on the waitlist" : "your trial"} for {f.childName || "your child"}.</p>
            <button type="button" onClick={onClose} className="btn btn-outline mt-6"><span className="btn-label" data-text="Close"><span>Close</span></span></button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Parent's name"><input required value={f.parentName} onChange={set("parentName")} autoComplete="name" className={inp} /></Field>
              <Field label="Phone"><input required type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" placeholder="8123 4567" className={inp} /></Field>
              <Field label="Email" className="sm:col-span-2"><input required type="email" value={f.email} onChange={set("email")} autoComplete="email" className={inp} /></Field>
              <Field label="Child's name"><input required value={f.childName} onChange={set("childName")} className={inp} /></Field>
              <Field label="Child's date of birth"><input required type="date" value={f.childDob} onChange={set("childDob")} className={inp} /></Field>
              <Field label="Anything we should know? (optional)" className="sm:col-span-2"><textarea rows={3} value={f.message} onChange={set("message")} className={inp + " h-auto py-2.5"} /></Field>
            </div>
            {/* hidden from people; bots fill it */}
            <input type="text" name="website" value={f.website} onChange={set("website")} tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <label className="mt-5 flex items-start gap-3 text-[13px] leading-relaxed text-white/70">
              <input type="checkbox" required checked={f.consent} onChange={set("consent")} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]" />
              I agree to MADDspace contacting me about this booking.
            </label>
            {error && <p className="mt-4 text-[13px] text-[#f87171]" role="alert">{error}</p>}
            {state === "error" && (
              <a href={wa} target="_blank" rel="noopener" className="btn btn-outline mt-3 w-full"><WhatsAppIcon size={16} /> Send it on WhatsApp instead</a>
            )}
            <button type="submit" disabled={state === "sending"} className="btn btn-primary mt-5 w-full disabled:opacity-60">
              <span className="btn-label" data-text={state === "sending" ? "Sending…" : waitlist ? "Join the waitlist" : "Book my trial"}><span>{state === "sending" ? "Sending…" : waitlist ? "Join the waitlist" : "Book my trial"}</span></span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
const inp = "h-11 w-full border border-white/15 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/60";
function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <label className={`block text-[12px] font-medium text-white/65 ${className}`}>{label}<div className="mt-1.5">{children}</div></label>;
}
