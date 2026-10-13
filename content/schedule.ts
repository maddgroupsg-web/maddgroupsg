// Transcribed from "2026 MADDSPACE: GROUP CLASS SCHEDULE - TERM 3 & 4 (Updated 28 July 2026)"
export type ClassSlot = {
  programme: string;
  category: "preschool" | "singdance" | "kpop" | "hiphopkpop" | "crew";
  interest: "singing" | "kpop" | "hiphop" | "showchoir" | "crew";
  ages: string;
  minAge: number;
  maxAge: number;
  day: "Saturday" | "Sunday";
  time: string;
  location: "central" | "west";
  level?: string;
  status: "open" | "waitlist";
  note?: string;
  duration?: string;
  audition?: boolean;
};

const C = "central" as const, W = "west" as const;
export const schedule: ClassSlot[] = [
  { programme: "Preschool: Hip Hop & K-Pop Combo (Parent Accompanied)", category: "preschool", interest: "hiphop", ages: "3.5 – 4.5 Years Old", minAge: 3.5, maxAge: 4.5, day: "Sunday", time: "12.00pm – 1.00pm", location: C, status: "open" },
  { programme: "Preschool: Hip Hop & K-Pop Combo (Parent Accompanied)", category: "preschool", interest: "hiphop", ages: "3.5 – 4.5 Years Old", minAge: 3.5, maxAge: 4.5, day: "Sunday", time: "3.00pm – 4.00pm", location: C, status: "open" },
  { programme: "Pre-Primary: Hip Hop & K-Pop Combo", category: "preschool", interest: "hiphop", ages: "4 – 6 Years Old", minAge: 4, maxAge: 6, day: "Saturday", time: "10.00am – 11.00am", location: C, status: "waitlist" },
  { programme: "Pre-Primary: Hip Hop & K-Pop Combo", category: "preschool", interest: "hiphop", ages: "4 – 6 Years Old", minAge: 4, maxAge: 6, day: "Saturday", time: "12.00pm – 1.00pm", location: C, status: "open" },
  { programme: "Pre-Primary: Hip Hop & K-Pop Combo", category: "preschool", interest: "hiphop", ages: "4 – 6 Years Old", minAge: 4, maxAge: 6, day: "Saturday", time: "4.00pm – 5.00pm", location: C, status: "open" },
  { programme: "Pre-Primary: Hip Hop & K-Pop Combo", category: "preschool", interest: "hiphop", ages: "4 – 6 Years Old", minAge: 4, maxAge: 6, day: "Saturday", time: "10.00am – 11.00am", location: W, status: "open", note: "From 8 Aug" },
  { programme: "Pre-Primary: Hip Hop & K-Pop Combo", category: "preschool", interest: "hiphop", ages: "4 – 6 Years Old", minAge: 4, maxAge: 6, day: "Saturday", time: "1.00pm – 2.00pm", location: W, status: "open" },
  { programme: "Pre-Primary: Hip Hop & K-Pop Combo", category: "preschool", interest: "hiphop", ages: "4 – 6 Years Old", minAge: 4, maxAge: 6, day: "Sunday", time: "10.00am – 11.00am", location: C, status: "waitlist" },
  { programme: "Pre-Primary: Hip Hop & K-Pop Combo", category: "preschool", interest: "hiphop", ages: "4 – 6 Years Old", minAge: 4, maxAge: 6, day: "Sunday", time: "11.00am – 12.00pm", location: C, status: "waitlist" },
  { programme: "Pre-Primary: Sing & Dance", category: "preschool", interest: "singing", ages: "4 – 6 Years Old", minAge: 4, maxAge: 6, day: "Saturday", time: "11.00am – 12.00pm", location: C, status: "open" },
  { programme: "Pre-Primary: Sing & Dance", category: "preschool", interest: "singing", ages: "4 – 6 Years Old", minAge: 4, maxAge: 6, day: "Saturday", time: "3.00pm – 4.00pm", location: C, status: "open" },
  { programme: "Pre-Primary: Sing & Dance", category: "preschool", interest: "singing", ages: "4 – 6 Years Old", minAge: 4, maxAge: 6, day: "Sunday", time: "2.00pm – 3.00pm", location: C, status: "open" },
  { programme: "Pre-Primary: Sing & Dance", category: "preschool", interest: "singing", ages: "4 – 6 Years Old", minAge: 4, maxAge: 6, day: "Sunday", time: "4.30pm – 5.30pm", location: W, status: "open" },
  { programme: "Sing & Dance: Show Choir Foundation", duration: "60mins", category: "singdance", interest: "showchoir", ages: "6 – 9 Years Old", minAge: 6, maxAge: 9, day: "Saturday", time: "11.00am – 12.00pm", location: C, status: "waitlist" },
  { programme: "Sing & Dance: Show Choir Preparatory / Concert", duration: "90mins", category: "singdance", interest: "showchoir", ages: "6 – 9 Years Old", minAge: 6, maxAge: 9, day: "Sunday", time: "5.00pm – 6.30pm", location: W, status: "waitlist" },
  { programme: "Sing & Dance: Show Choir Preparatory / Concert", duration: "90mins", category: "singdance", interest: "showchoir", ages: "10 – 16 Years Old", minAge: 10, maxAge: 16, day: "Saturday", time: "12.30pm – 2.00pm", location: C, status: "waitlist" },
  { programme: "Dance: K-Pop", level: "Foundation", category: "kpop", interest: "kpop", ages: "6 – 9 Years Old", minAge: 6, maxAge: 9, day: "Saturday", time: "12.00pm – 1.00pm", location: C, status: "waitlist" },
  { programme: "Dance: K-Pop", level: "Foundation", category: "kpop", interest: "kpop", ages: "6 – 9 Years Old", minAge: 6, maxAge: 9, day: "Saturday", time: "5.00pm – 6.00pm", location: C, status: "waitlist" },
  { programme: "Dance: K-Pop", level: "Foundation", category: "kpop", interest: "kpop", ages: "6 – 9 Years Old", minAge: 6, maxAge: 9, day: "Sunday", time: "4.00pm – 5.00pm", location: C, status: "open" },
  { programme: "Dance: K-Pop", level: "Foundation", category: "kpop", interest: "kpop", ages: "6 – 9 Years Old", minAge: 6, maxAge: 9, day: "Saturday", time: "11.00am – 12.00pm", location: W, status: "open", note: "From 8 Aug" },
  { programme: "Dance: K-Pop", level: "Foundation", category: "kpop", interest: "kpop", ages: "9 – 12 Years Old", minAge: 9, maxAge: 12, day: "Saturday", time: "1.00pm – 2.00pm", location: C, status: "waitlist" },
  { programme: "Dance: K-Pop", level: "Foundation", category: "kpop", interest: "kpop", ages: "9 – 12 Years Old", minAge: 9, maxAge: 12, day: "Saturday", time: "4.00pm – 5.00pm", location: C, status: "waitlist" },
  { programme: "Dance: K-Pop", level: "Intermediate", category: "kpop", interest: "kpop", ages: "9 – 12 Years Old", minAge: 9, maxAge: 12, day: "Saturday", time: "4.00pm – 5.00pm", location: C, status: "waitlist" },
  { programme: "Dance: K-Pop", level: "Foundation", category: "kpop", interest: "kpop", ages: "9 – 12 Years Old", minAge: 9, maxAge: 12, day: "Saturday", time: "12.00pm – 1.00pm", location: W, status: "open", note: "From 8 Aug" },
  { programme: "Dance: K-Pop", level: "Foundation", category: "kpop", interest: "kpop", ages: "9 – 12 Years Old", minAge: 9, maxAge: 12, day: "Sunday", time: "3.30pm – 4.30pm", location: C, status: "waitlist" },
  { programme: "Dance: K-Pop", level: "Intermediate", category: "kpop", interest: "kpop", ages: "12 – 16 Years Old", minAge: 12, maxAge: 16, day: "Saturday", time: "1.00pm – 2.00pm", location: C, status: "waitlist" },
  { programme: "Dance: K-Pop", level: "Intermediate", category: "kpop", interest: "kpop", ages: "12 – 16 Years Old", minAge: 12, maxAge: 16, day: "Saturday", time: "2.00pm – 3.00pm", location: C, status: "waitlist" },
  { programme: "Dance: K-Pop", level: "Intermediate", category: "kpop", interest: "kpop", ages: "12 – 16 Years Old", minAge: 12, maxAge: 16, day: "Sunday", time: "5.00pm – 6.00pm", location: C, status: "waitlist" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Foundation", category: "hiphopkpop", interest: "hiphop", ages: "6 – 9 Years Old", minAge: 6, maxAge: 9, day: "Saturday", time: "10.00am – 11.00am", location: C, status: "waitlist" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Foundation", category: "hiphopkpop", interest: "hiphop", ages: "6 – 9 Years Old", minAge: 6, maxAge: 9, day: "Saturday", time: "11.00am – 12.00pm", location: C, status: "waitlist" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Foundation", category: "hiphopkpop", interest: "hiphop", ages: "6 – 9 Years Old", minAge: 6, maxAge: 9, day: "Saturday", time: "2.00pm – 3.00pm", location: W, status: "open" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Foundation", category: "hiphopkpop", interest: "hiphop", ages: "6 – 9 Years Old", minAge: 6, maxAge: 9, day: "Sunday", time: "12.00pm – 1.00pm", location: C, status: "waitlist" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Foundation", category: "hiphopkpop", interest: "hiphop", ages: "6 – 9 Years Old", minAge: 6, maxAge: 9, day: "Sunday", time: "2.00pm – 3.00pm", location: C, status: "waitlist" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Foundation", category: "hiphopkpop", interest: "hiphop", ages: "9 – 12 Years Old", minAge: 9, maxAge: 12, day: "Saturday", time: "10.00am – 11.00am", location: C, status: "waitlist" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Foundation", category: "hiphopkpop", interest: "hiphop", ages: "9 – 12 Years Old", minAge: 9, maxAge: 12, day: "Saturday", time: "3.00pm – 4.00pm", location: C, status: "waitlist" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Intermediate", category: "hiphopkpop", interest: "hiphop", ages: "9 – 12 Years Old", minAge: 9, maxAge: 12, day: "Sunday", time: "10.00am – 11.00am", location: C, status: "waitlist" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Foundation", category: "hiphopkpop", interest: "hiphop", ages: "9 – 12 Years Old", minAge: 9, maxAge: 12, day: "Sunday", time: "11.00am – 12.00pm", location: C, status: "open" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Foundation", category: "hiphopkpop", interest: "hiphop", ages: "9 – 12 Years Old", minAge: 9, maxAge: 12, day: "Sunday", time: "2.00pm – 3.00pm", location: C, status: "waitlist" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Foundation", category: "hiphopkpop", interest: "hiphop", ages: "12 – 16 Years Old", minAge: 12, maxAge: 16, day: "Sunday", time: "1.00pm – 2.00pm", location: C, status: "waitlist" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Intermediate", category: "hiphopkpop", interest: "hiphop", ages: "12 – 16 Years Old", minAge: 12, maxAge: 16, day: "Sunday", time: "1.00pm – 2.00pm", location: C, status: "waitlist" },
  { programme: "Dance: Hip Hop & K-Pop Combo", level: "Foundation", category: "hiphopkpop", interest: "hiphop", ages: "12 – 16 Years Old", minAge: 12, maxAge: 16, day: "Sunday", time: "2.00pm – 3.00pm", location: C, status: "waitlist" },
  { programme: "Developing Artistes Programme", duration: "90mins", category: "crew", interest: "crew", ages: "10 – 14 Years Old", minAge: 10, maxAge: 14, day: "Saturday", time: "5.00pm – 6.30pm", location: C, status: "open", audition: true },
  { programme: "MADDartistes Programme", duration: "120mins", category: "crew", interest: "crew", ages: "12 – 21 Years Old", minAge: 12, maxAge: 21, day: "Saturday", time: "6.30pm – 8.30pm", location: C, status: "open", audition: true },
  { programme: "MADDartistes Programme: K-Pop Sing & Dance Crew — MYSTIX", duration: "120mins", category: "crew", interest: "crew", ages: "13 – 16 Years Old", minAge: 13, maxAge: 16, day: "Sunday", time: "3.00pm – 5.00pm", location: C, status: "open", audition: true },
  { programme: "K-Pop Dance Crew — K-STARS JUNIOR", duration: "90mins", category: "crew", interest: "crew", ages: "10 – 13 Years Old", minAge: 10, maxAge: 13, day: "Sunday", time: "3.00pm – 4.30pm", location: C, status: "open", audition: true },
  { programme: "K-Pop Dance Crew — M1XXIE", duration: "90mins", category: "crew", interest: "crew", ages: "10 – 13 Years Old", minAge: 10, maxAge: 13, day: "Sunday", time: "4.30pm – 6.00pm", location: C, status: "open", audition: true },
  { programme: "K-Pop Dance Crew — K-STARS", duration: "90mins", category: "crew", interest: "crew", ages: "13 – 16 Years Old", minAge: 13, maxAge: 16, day: "Saturday", time: "3.30pm – 5.00pm", location: C, status: "open", audition: true },
  { programme: "K-Pop Dance Crew — K-STARS", duration: "90mins", category: "crew", interest: "crew", ages: "13 – 16 Years Old", minAge: 13, maxAge: 16, day: "Saturday", time: "6.30pm – 8.00pm", location: C, status: "open", audition: true },
  { programme: "Hip Hop Dance Crew — MANIAX NOVA", duration: "90mins", category: "crew", interest: "crew", ages: "9 – 12 Years Old", minAge: 9, maxAge: 12, day: "Saturday", time: "3.30pm – 5.00pm", location: C, status: "open", audition: true },
  { programme: "Hip Hop Dance Crew — MADDVERICKS", duration: "90mins", category: "crew", interest: "crew", ages: "9 – 12 Years Old", minAge: 9, maxAge: 12, day: "Sunday", time: "3.00pm – 4.30pm", location: C, status: "open", audition: true },
  { programme: "Hip Hop Dance Crew — MANIAX JUNIOR", duration: "90mins", category: "crew", interest: "crew", ages: "10 – 14 Years Old", minAge: 10, maxAge: 14, day: "Saturday", time: "2.00pm – 3.30pm", location: C, status: "open", audition: true },
  { programme: "Hip Hop Dance Crew — MADDNIFICENT", duration: "90mins", category: "crew", interest: "crew", ages: "10 – 16 Years Old", minAge: 10, maxAge: 16, day: "Saturday", time: "2.00pm – 3.30pm", location: C, status: "open", audition: true },
  { programme: "Hip Hop Dance Crew — MADDMIX", duration: "90mins", category: "crew", interest: "crew", ages: "13 – 16 Years Old", minAge: 13, maxAge: 16, day: "Saturday", time: "11.00am – 12.30pm", location: C, status: "open", audition: true },
];

export const scheduleMeta = {
  title: "2026 MADDspace: Group Class Schedule — Term 3 & 4",
  trial: "Trial period: 28 June (Sunday) – 16 August (Sunday)",
  more: "More classes after 16 Aug: coming soon!",
  updated: "Updated 28 July 2026",
};

export const ageBands = [
  { label: "3–4", min: 3, max: 4.5 },
  { label: "4–6", min: 4, max: 6 },
  { label: "6–9", min: 6, max: 9 },
  { label: "9–12", min: 9, max: 12 },
  { label: "12–16", min: 12, max: 16 },
  { label: "16+", min: 16, max: 35 },
];
