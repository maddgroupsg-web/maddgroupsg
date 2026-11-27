import { checkBooking } from "@/lib/booking";

// Receives a trial booking from the schedule page and appends it to the MADDspace Google Sheet through a
// Google Apps Script web app (see docs/google-sheets/README.md). The sheet URL and shared secret live in
// environment variables, never in the browser.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return Response.json({ ok: false, error: "Bad request." }, { status: 400 }); }

  // spam guards: a hidden field people never fill, and a form that took under 3 seconds to complete
  if (typeof body.website === "string" && body.website) return Response.json({ ok: true });
  if (typeof body.startedAt === "number" && Date.now() - body.startedAt < 3000) return Response.json({ ok: true });

  const checked = checkBooking(body);
  if (!checked.ok) return Response.json({ ok: false, error: checked.error }, { status: 422 });

  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) return Response.json({ ok: false, error: "Booking is not connected yet." }, { status: 503 });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, submittedAt: new Date().toISOString(), page: req.headers.get("referer") ?? "", ...checked.value }),
      redirect: "follow", // Apps Script answers a POST with a redirect to its result
      signal: AbortSignal.timeout(10_000),
    });
    const out = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !out?.ok) throw new Error(`sheet responded ${res.status}`);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("book-trial: could not save to sheet", err);
    return Response.json({ ok: false, error: "We could not save your booking just now." }, { status: 502 });
  }
}
