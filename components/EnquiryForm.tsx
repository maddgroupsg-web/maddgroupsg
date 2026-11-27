"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/Social";
import { enquiryFields, contact, BOOK_TRIAL_URL } from "@/content/site";
import { cn, waLink } from "@/lib/utils";

// Phase 1: no backend. A three-step enquiry (you, your child, your message). The last step hands it to
// WhatsApp (primary) or email, and keeps the existing booking link as the fast path.
const STEPS = ["About you", "Your child", "Your message"] as const;

export default function EnquiryForm({ title = "Sign Up", copy = "Fill up the form below, and our team will reach out to you shortly!", preset }: { title?: string; copy?: string; preset?: string }) {
  const [f, setF] = useState({ parent: "", phone: "", email: "", child: "", dob: "", klass: preset ?? "", location: "", message: "" });
  const [step, setStep] = useState(0);
  const [tried, setTried] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const body = `Hi MADDspace, I'd like to enquire about a trial.\nParent: ${f.parent}\nPhone: ${f.phone}\nEmail: ${f.email}\nChild: ${f.child}\nChild's DOB: ${f.dob}\nInterested in: ${f.klass}\nPreferred location: ${f.location}\nMessage: ${f.message}`;
  const stepOk = [!!(f.parent && f.phone && /\S+@\S+\.\S+/.test(f.email)), !!(f.child && f.dob), true][step];
  const next = () => { if (!stepOk) { setTried(true); return; } setTried(false); setStep((s) => Math.min(s + 1, STEPS.length - 1)); };
  const back = () => { setTried(false); setStep((s) => Math.max(s - 1, 0)); };

  return (
    <form id="enquire" className="border border-white/10 bg-white/[0.02] p-6 sm:p-8" onSubmit={(e) => { e.preventDefault(); if (step < STEPS.length - 1) { next(); return; } window.open(waLink(body), "_blank"); }} noValidate>
      <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="mt-2 text-sm text-mute">{copy}</p>

      {/* progress */}
      <div className="mt-6 flex items-center gap-2" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
        {STEPS.map((s, i) => (
          <button key={s} type="button" onClick={() => i < step && setStep(i)} className={cn("flex-1 text-left", i < step && "cursor-pointer")} disabled={i > step}>
            <span className={cn("block h-[3px] transition-colors", i <= step ? "bg-accent" : "bg-white/15")} />
            <span className={cn("mt-2 block text-[11.5px] font-medium", i === step ? "text-white" : "text-white/45")}>{i + 1}. {s}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {step === 0 && <>
          <Field label="Parent's name" className="sm:col-span-2" bad={tried && !f.parent}><input value={f.parent} onChange={set("parent")} autoComplete="name" className={inp} /></Field>
          <Field label="Phone" bad={tried && !f.phone}><input type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" className={inp} /></Field>
          <Field label="Email" bad={tried && !/\S+@\S+\.\S+/.test(f.email)}><input type="email" value={f.email} onChange={set("email")} autoComplete="email" className={inp} /></Field>
        </>}
        {step === 1 && <>
          <Field label="Child's name" bad={tried && !f.child}><input autoFocus value={f.child} onChange={set("child")} className={inp} /></Field>
          <Field label="Child's date of birth" bad={tried && !f.dob}><input type="date" value={f.dob} onChange={set("dob")} className={inp} /></Field>
          <Field label="Classes you're interested in (optional)">
            <select value={f.klass} onChange={set("klass")} className={inp}><option value="">Select</option>{enquiryFields.classes.map((c) => <option key={c}>{c}</option>)}</select>
          </Field>
          <Field label="Preferred location (optional)">
            <select value={f.location} onChange={set("location")} className={inp}><option value="">Select</option>{enquiryFields.locationOptions.map((c) => <option key={c}>{c}</option>)}</select>
          </Field>
        </>}
        {step === 2 && (
          <Field label="Send us a message (optional)" className="sm:col-span-2"><textarea autoFocus rows={5} value={f.message} onChange={set("message")} className={inp + " h-auto py-2.5"} /></Field>
        )}
      </div>
      {tried && !stepOk && <p className="mt-3 text-[13px] text-[#f87171]" role="alert">Please fill in the highlighted fields.</p>}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {step > 0 && <button type="button" onClick={back} className="btn btn-outline"><ArrowLeft size={15} /><span className="btn-label" data-text="Back"><span>Back</span></span></button>}
        {step < STEPS.length - 1 ? (
          <button type="submit" className="btn btn-primary"><span className="btn-label" data-text="Next"><span>Next</span></span><ArrowRight size={15} /></button>
        ) : (<>
          <button type="submit" className="btn btn-primary"><WhatsAppIcon size={16} /><span className="btn-label" data-text="Send via WhatsApp"><span>Send via WhatsApp</span></span></button>
          <a className="btn btn-outline" href={`mailto:${contact.email}?subject=${encodeURIComponent("Trial enquiry — " + (f.child || "MADDspace"))}&body=${encodeURIComponent(body)}`}><Mail size={15} /><span className="btn-label" data-text="Send by email"><span>Send by email</span></span></a>
        </>)}
        <a className="ml-auto text-[13px] text-white/60 underline decoration-white/30 underline-offset-4 hover:text-white" href={BOOK_TRIAL_URL} target="_blank" rel="noopener">Or book a trial slot directly</a>
      </div>
    </form>
  );
}
const inp = "h-11 w-full border border-white/15 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-white/60";
function Field({ label, children, className = "", bad }: { label: string; children: React.ReactNode; className?: string; bad?: boolean }) {
  return <label className={cn("block text-[12px] font-medium", bad ? "text-[#f87171] [&_input]:border-[#f87171]/70" : "text-white/65", className)}>{label}<div className="mt-1.5">{children}</div></label>;
}
