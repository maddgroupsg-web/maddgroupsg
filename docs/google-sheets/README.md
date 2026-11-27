# Trial bookings → Google Sheet

When a parent clicks **Book a trial** or **Join waitlist** on the schedule page, a form opens with that class
already filled in. On submit the site calls `/api/book-trial`, which checks the details and appends one row to a
Google Sheet through a small Apps Script web app. The sheet URL and a shared secret stay on the server.

## One-time setup (about 10 minutes, done by MADDspace on their Google account)

1. Create a Google Sheet, for example **MADDspace Trial Bookings**.
2. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste in `Code.gs` from this folder.
3. Change `SECRET` at the top to a long random string (keep a copy).
4. **Deploy → New deployment → Web app.** Execute as **Me**, Who has access **Anyone**. Authorise when asked.
5. Copy the **Web app URL** (ends in `/exec`).
6. In Vercel: **Project → Settings → Environment Variables**, add for Production and Preview:
   - `SHEETS_WEBHOOK_URL` = the web app URL
   - `SHEETS_WEBHOOK_SECRET` = the same secret as in step 3
7. Redeploy the site. Submit one test booking and check that a row appears in the **Trial bookings** tab.

The tab and its header row are created on the first booking. The last column, **Status**, starts as "New" so the
team can track follow-ups.

## Notes

- Until the two variables are set, the form shows an error and offers to send the same details on WhatsApp.
- Spam guards: a hidden field bots fill, and submissions faster than 3 seconds are ignored.
- If the script is edited later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.
- Phone numbers are stored as text so leading `+65` is kept.
