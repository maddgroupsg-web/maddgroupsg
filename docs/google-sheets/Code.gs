/**
 * MADDspace trial bookings → Google Sheet.
 * Paste into Extensions → Apps Script of the bookings sheet, set SECRET, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). Put the web app URL and the same SECRET into Vercel (see README.md).
 */
const SECRET = "change-me-to-a-long-random-string";
const SHEET_NAME = "Trial bookings";
const HEADERS = ["Submitted at", "Type", "Programme", "Day", "Time", "Location", "Ages", "Parent's name", "Phone", "Email", "Child's name", "Child's DOB", "Message", "Page", "Status"];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return json({ ok: false, error: "unauthorised" });
    const sheet = getSheet();
    sheet.appendRow([
      new Date(data.submittedAt), data.kind === "waitlist" ? "Waitlist" : "Trial", data.programme, data.day, data.time,
      data.location, data.ages, data.parentName, "'" + data.phone, data.email, data.childName, data.childDob,
      data.message, data.page, "New",
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
