# MADDspace — Website (Phase 1 frontend)

Next.js 16 · Tailwind 4 · Framer Motion · Embla. Deploys to Vercel with zero config (root directory: `web`).

## Run locally
```bash
npm install
npm run dev   # http://localhost:3000
npm run build # production build / type check
```

## Where things live
| What | Where |
|---|---|
| All page copy (verbatim from the brief + the old site) | `content/*.ts` |
| Nav, contact details, locations, booking links, media logos, awards | `content/site.ts` |
| Homepage sections (hero, progression, pathways, MADD Group, testimonials) | `content/home.ts` |
| Group class timetable (drives the class finder) | `content/schedule.ts` |
| Team (About page) / Instructors (carousel + grids) | `content/team.ts`, `content/instructors.ts` |
| The 4 campaign landing pages (`/trial/singing`, `/trial/kpop`, `/trial/hiphop`, `/trial/show-choir`) | `content/landing.ts` |
| Page titles + meta descriptions (carried over 1:1 from the old site) | `content/seo.ts` |
| Photos | `public/images/classes/<age-group>/…` (from the Google Drive folders, renamed), `public/images/instructors`, `team`, `achievements`, `media` (colour logos), `awards` |

## Adding a coach video
In `content/instructors.ts` add `video: "/videos/<name>.mp4"` (drop the file in `public/videos/`) or a YouTube URL.
The featured card on `/instructors` then plays it on hover / tap.

## Booking & forms (Phase 1)
No backend yet. "Book a trial" buttons go to the existing fillout / trafft links in `content/site.ts`.
The enquiry form composes the message and opens WhatsApp (8829 0800) or email. Phase 2 replaces this with the CRM.

## SEO
- Every old URL slug is kept. `/private-classes-booking` 301s to trafft (see `next.config.ts`).
- `/trial/*` pages are `noindex` with a canonical pointing at the matching SEO page.
- `sitemap.xml` and `robots.txt` are generated from `content/seo.ts`.
- The blog is not migrated yet — `/blog` is a holding page. Export the Wix posts before cancelling Wix.

## Content still required from MADDspace
- FAQ answers on the 4 landing pages (questions are placeholders from the design).
- Instructor videos (the Drive folder was empty) and instructor specialities.
- Portraits for Daphinia and Isabelle (About page).
- Hero video footage (hero currently uses a photo; `components/home/Hero.tsx` is ready for a `<video>`).
- MADD Entertainment / IDOLLAB URLs if they should link out instead of to the Idol page.
