"use client";
import { useMemo, useState } from "react";
import { Calendar, Clock, MapPin, Users, Mic, Star, Music, Trophy, Sparkles } from "lucide-react";
import { schedule, scheduleMeta, ageBands, type ClassSlot } from "@/content/schedule";
import { BOOK_TRIAL_URL, locations } from "@/content/site";
import { cn } from "@/lib/utils";

const interests = [
  { key: "singing", label: "SING & DANCE", icon: Mic },
  { key: "showchoir", label: "SHOW CHOIR", icon: Music },
  { key: "kpop", label: "K-POP", icon: Star },
  { key: "hiphop", label: "HIP HOP", icon: Sparkles },
  { key: "crew", label: "PERFORMING CREW", icon: Trophy },
] as const;

export default function ClassFinder() {
  const [age, setAge] = useState<number | null>(null);
  const [interest, setInterest] = useState<string | null>(null);
  const [loc, setLoc] = useState<"central" | "west" | null>(null);
  const [day, setDay] = useState<"Saturday" | "Sunday" | null>(null);
  const [view, setView] = useState<"recommended" | "all">("recommended");

  const results = useMemo(() => {
    const band = age !== null ? ageBands[age] : null;
    return schedule.filter((s) => {
      if (view === "all") return true;
      if (band && !(s.minAge < band.max && s.maxAge > band.min)) return false;
      if (interest && s.interest !== interest) return false;
      if (loc && s.location !== loc) return false;
      if (day && s.day !== day) return false;
      return true;
    }).sort((a, b) => (a.status === b.status ? 0 : a.status === "open" ? -1 : 1));
  }, [age, interest, loc, day, view]);

  const reset = () => { setAge(null); setInterest(null); setLoc(null); setDay(null); };

  return (
    <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
      <aside className="glass rounded-xl p-5 sm:p-6 h-fit lg:sticky lg:top-24">
        <div className="text-sm font-semibold tracking-wider">1. TELL US ABOUT YOUR CHILD</div>
        <Label>CHILD&apos;S AGE</Label>
        <div className="grid grid-cols-3 gap-2">{ageBands.map((b, i) => <Chip key={b.label} on={age === i} onClick={() => setAge(age === i ? null : i)}>{b.label}</Chip>)}</div>
        <Label>WHAT ARE THEY INTERESTED IN?</Label>
        <div className="grid grid-cols-3 gap-2">{interests.map((it) => <Chip key={it.key} on={interest === it.key} onClick={() => setInterest(interest === it.key ? null : it.key)} tall><it.icon size={18} className="mb-1" />{it.label}</Chip>)}</div>
        <Label>PREFERRED LOCATION</Label>
        <div className="grid grid-cols-2 gap-2">{locations.map((l) => <Chip key={l.key} on={loc === l.key} onClick={() => setLoc(loc === l.key ? null : (l.key as "central" | "west"))}>{l.short.toUpperCase()}</Chip>)}</div>
        <Label>PREFERRED DAY</Label>
        <div className="grid grid-cols-3 gap-2"><Chip on={day === null} onClick={() => setDay(null)}>ANY DAY</Chip><Chip on={day === "Saturday"} onClick={() => setDay("Saturday")}>SAT</Chip><Chip on={day === "Sunday"} onClick={() => setDay("Sunday")}>SUN</Chip></div>
        <button onClick={() => { setView("recommended"); document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="btn btn-primary w-full mt-6">SHOW MATCHING CLASSES</button>
        <button onClick={reset} className="mt-3 w-full text-center text-xs tracking-[0.2em] text-cyan">RESET SELECTION</button>
      </aside>

      <div id="results" className="scroll-mt-24">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-white/80"><span className="font-semibold text-white">{results.length}</span> {view === "all" ? "classes this term" : `matching classes${age !== null ? ` for ages ${ageBands[age].label}` : ""}`}</div>
          <div className="flex rounded-md border border-line overflow-hidden text-xs tracking-[0.15em]">
            <button onClick={() => setView("recommended")} className={cn("px-4 py-2", view === "recommended" ? "bg-cyan text-ink font-semibold" : "text-white/70")}>RECOMMENDED</button>
            <button onClick={() => setView("all")} className={cn("px-4 py-2", view === "all" ? "bg-cyan text-ink font-semibold" : "text-white/70")}>ALL CLASSES</button>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-white/50">{scheduleMeta.title} · {scheduleMeta.trial} · {scheduleMeta.updated}</p>
        <div className="mt-4 space-y-3">
          {results.length === 0 && <div className="glass rounded-xl p-8 text-center text-mute">No class matches every filter yet. Try removing a filter, or <a className="text-cyan" href="/contact">chat with our team</a> — more classes after 16 Aug are coming soon.</div>}
          {results.map((s, i) => <Row key={i} s={s} best={i === 0 && view === "recommended" && (age !== null || interest !== null)} />)}
        </div>
        <p className="mt-6 text-center text-sm text-white/70">Not sure which class to choose? <a href="/contact" className="text-cyan font-semibold">CHAT WITH OUR TEAM →</a></p>
      </div>
    </div>
  );
}

function Row({ s, best }: { s: ClassSlot; best: boolean }) {
  const locName = locations.find((l) => l.key === s.location)!;
  return (
    <article className={cn("glass rounded-xl p-4 sm:p-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center", best && "glow-border")}>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {best && <span className="rounded bg-cyan px-2 py-0.5 text-[10px] font-bold tracking-widest text-ink">BEST MATCH</span>}
          {s.audition && <span className="rounded border border-gold/60 px-2 py-0.5 text-[10px] tracking-widest text-gold">AUDITION-BASED</span>}
          {s.level && <span className="rounded border border-line px-2 py-0.5 text-[10px] tracking-widest text-white/70">{s.level.toUpperCase()}</span>}
          {s.note && <span className="rounded border border-line px-2 py-0.5 text-[10px] tracking-widest text-white/70">{s.note.toUpperCase()}</span>}
        </div>
        <h3 className="display text-2xl sm:text-3xl mt-2">{s.programme}</h3>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/80">
          <li className="flex items-center gap-1.5"><Calendar size={14} className="text-cyan" />{s.day}</li>
          <li className="flex items-center gap-1.5"><Clock size={14} className="text-cyan" />{s.time}{s.duration && <span className="text-white/50">· {s.duration}</span>}</li>
          <li className="flex items-center gap-1.5"><MapPin size={14} className="text-cyan" />{locName.short}</li>
          <li className="flex items-center gap-1.5"><Users size={14} className="text-cyan" />{s.ages}</li>
        </ul>
      </div>
      <div className="flex sm:flex-col gap-2 sm:w-44">
        {s.status === "open" ? (
          <a href={BOOK_TRIAL_URL} target="_blank" rel="noopener" className="btn btn-primary !py-2.5 text-[11px] flex-1">{s.audition ? "ENQUIRE / AUDITION" : "BOOK A TRIAL"}</a>
        ) : (
          <a href={BOOK_TRIAL_URL} target="_blank" rel="noopener" className="btn btn-outline !py-2.5 text-[11px] flex-1">JOIN WAITLIST</a>
        )}
        <span className={cn("text-center text-[10px] tracking-[0.2em]", s.status === "open" ? "text-[#4ade80]" : "text-white/50")}>{s.status === "open" ? "● TRIAL SPOTS" : "WAITLIST"}</span>
      </div>
    </article>
  );
}

function Label({ children }: { children: React.ReactNode }) { return <div className="mt-5 mb-2 text-[11px] tracking-[0.2em] text-white/70">{children}</div>; }
function Chip({ on, onClick, children, tall }: { on: boolean; onClick: () => void; children: React.ReactNode; tall?: boolean }) {
  return <button type="button" onClick={onClick} className={cn("rounded-md border text-[11px] tracking-wider font-semibold transition-colors flex flex-col items-center justify-center", tall ? "py-3 px-1 text-[10px]" : "py-2.5 px-2", on ? "border-cyan bg-cyan text-ink" : "border-line bg-black/30 text-white/80 hover:border-cyan/60")}>{children}</button>;
}
