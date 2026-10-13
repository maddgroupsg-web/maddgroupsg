"use client";
import { useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { enquiryFields, contact, BOOK_TRIAL_URL } from "@/content/site";
import { waLink } from "@/lib/utils";

// Phase 1: no backend. The form composes the enquiry and hands it to WhatsApp (primary) or email,
// and keeps the existing fillout booking link as the fast path. Phase 2 replaces this with the CRM.
export default function EnquiryForm({ title = "Sign Up", copy = "Fill up the form below, and our team will reach out to you shortly!", preset }: { title?: string; copy?: string; preset?: string }) {
  const [f, setF] = useState({ parent: "", phone: "", email: "", child: "", dob: "", klass: preset ?? "", location: "", message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const body = `Hi MADDspace, I'd like to enquire about a trial.\nParent: ${f.parent}\nPhone: ${f.phone}\nEmail: ${f.email}\nChild: ${f.child}\nChild's DOB: ${f.dob}\nInterested in: ${f.klass}\nPreferred location: ${f.location}\nMessage: ${f.message}`;
  const valid = f.parent && f.phone && f.child;
  return (
    <form id="enquire" className="glass rounded-xl p-6 sm:p-8" onSubmit={(e) => { e.preventDefault(); if (valid) window.open(waLink(body), "_blank"); }}>
      <h3 className="display text-4xl">{title}</h3>
      <p className="mt-2 text-sm text-mute">{copy}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Name of Parent*"><input required value={f.parent} onChange={set("parent")} className={inp} /></Field>
        <Field label="Phone*"><input required type="tel" value={f.phone} onChange={set("phone")} className={inp} /></Field>
        <Field label="Email*"><input required type="email" value={f.email} onChange={set("email")} className={inp} /></Field>
        <Field label="Name of Child*"><input required value={f.child} onChange={set("child")} className={inp} /></Field>
        <Field label="Child's Date of Birth*"><input required type="date" value={f.dob} onChange={set("dob")} className={inp} /></Field>
        <Field label="Classes You're Interested In">
          <select value={f.klass} onChange={set("klass")} className={inp}><option value="">Select</option>{enquiryFields.classes.map((c) => <option key={c}>{c}</option>)}</select>
        </Field>
        <Field label="Preferred Location" className="sm:col-span-2">
          <select value={f.location} onChange={set("location")} className={inp}><option value="">Select</option>{enquiryFields.locationOptions.map((c) => <option key={c}>{c}</option>)}</select>
        </Field>
        <Field label="Send us a message!" className="sm:col-span-2"><textarea rows={3} value={f.message} onChange={set("message")} className={inp} /></Field>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button type="submit" className="btn btn-primary"><MessageCircle size={16} /> SUBMIT VIA WHATSAPP</button>
        <a className="btn btn-outline" href={`mailto:${contact.email}?subject=${encodeURIComponent("Trial enquiry — " + (f.child || "MADDspace"))}&body=${encodeURIComponent(body)}`}><Mail size={16} /> SEND BY EMAIL</a>
        <a className="btn btn-ghost" href={BOOK_TRIAL_URL} target="_blank" rel="noopener">Or book a trial slot directly</a>
      </div>
    </form>
  );
}
const inp = "w-full rounded-md border border-line bg-black/40 px-3 py-2.5 text-sm text-white outline-none focus:border-accent";
function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <label className={`block text-xs tracking-wider text-white/70 ${className}`}>{label}<div className="mt-1.5">{children}</div></label>;
}
