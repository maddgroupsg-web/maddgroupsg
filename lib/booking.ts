// Shared shape of a trial booking: what the form sends, what the API checks, what lands in the Google Sheet.
export type Booking = {
  kind: "trial" | "waitlist";
  programme: string;
  day: string;
  time: string;
  location: string;
  ages: string;
  parentName: string;
  phone: string;
  email: string;
  childName: string;
  childDob: string;
  message: string;
  consent: boolean;
};

const LIMITS: Partial<Record<keyof Booking, number>> = {
  programme: 120, day: 20, time: 40, location: 60, ages: 40,
  parentName: 80, phone: 20, email: 120, childName: 80, childDob: 10, message: 1000,
};

// Returns a cleaned booking, or the first problem as a sentence the form can show.
export function checkBooking(input: unknown): { ok: true; value: Booking } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "Missing details." };
  const b = input as Record<string, unknown>;
  const str = (k: keyof Booking) => (typeof b[k] === "string" ? (b[k] as string).trim().slice(0, LIMITS[k] ?? 200) : "");
  const value: Booking = {
    kind: b.kind === "waitlist" ? "waitlist" : "trial",
    programme: str("programme"), day: str("day"), time: str("time"), location: str("location"), ages: str("ages"),
    parentName: str("parentName"), phone: str("phone"), email: str("email"), childName: str("childName"),
    childDob: str("childDob"), message: str("message"), consent: b.consent === true,
  };
  if (!value.programme) return { ok: false, error: "Please pick a class." };
  if (!value.parentName) return { ok: false, error: "Please enter the parent's name." };
  if (!/^\+?[\d\s-]{8,15}$/.test(value.phone)) return { ok: false, error: "Please enter a valid phone number." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) return { ok: false, error: "Please enter a valid email address." };
  if (!value.childName) return { ok: false, error: "Please enter your child's name." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value.childDob)) return { ok: false, error: "Please enter your child's date of birth." };
  if (!value.consent) return { ok: false, error: "Please agree to be contacted about this booking." };
  return { ok: true, value };
}
