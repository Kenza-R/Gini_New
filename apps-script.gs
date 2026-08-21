/**
 * Gini Health: Waitlist + Founding Members → Google Sheets
 *
 * Paste into the bound Apps Script, then:
 *   Deploy > Manage deployments > pencil > Version: New version > Deploy
 *
 * The Next.js /api/signup route posts here with:
 *   email, phone, list (waitlist | founding), ref, ua
 *
 * Each list writes to its own sheet so founding members stay separate.
 */

const SHEETS = {
  waitlist: { name: "Waitlist", headers: ["Date", "Email", "Phone", "Referred By", "User Agent"] },
  founding: { name: "FoundingMembers", headers: ["Date", "Email", "Phone", "Referred By", "User Agent"] },
};

function resolveSheet(list) {
  const key = String(list || "waitlist").toLowerCase();
  return SHEETS[key] || SHEETS.waitlist;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);

    const p = e && e.parameter ? e.parameter : {};
    const email = p.email ? String(p.email).trim().toLowerCase() : "";
    const phone = p.phone ? String(p.phone).trim() : "";
    const ref = p.ref ? String(p.ref).trim() : "";
    const ua = p.ua ? String(p.ua) : "";
    const config = resolveSheet(p.list);

    if (!email) return json({ ok: false, error: "no email" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(config.name);
    if (!sheet) sheet = ss.insertSheet(config.name);
    if (sheet.getLastRow() === 0) sheet.appendRow(config.headers);

    const lastRow = sheet.getLastRow();
    let rowIndex = -1;
    if (lastRow > 1) {
      const emails = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (let i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).trim().toLowerCase() === email) {
          rowIndex = i + 2;
          break;
        }
      }
    }

    if (rowIndex === -1) {
      sheet.appendRow([new Date(), email, phone, ref, ua]);
      return json({ ok: true, created: true, sheet: config.name });
    }

    if (phone) sheet.getRange(rowIndex, 3).setValue(phone);
    if (ref && !sheet.getRange(rowIndex, 4).getValue()) {
      sheet.getRange(rowIndex, 4).setValue(ref);
    }
    return json({ ok: true, updated: true, sheet: config.name });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

const GOAL = 500;

function doGet(e) {
  const p = e && e.parameter ? e.parameter : {};
  const payload = {
    ok: true,
    count: getCount("waitlist"),
    foundingCount: getCount("founding"),
    goal: GOAL,
    message: "Gini Health waitlist endpoint actif",
  };
  if (p.callback) {
    return ContentService.createTextOutput(
      p.callback + "(" + JSON.stringify(payload) + ");"
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return json(payload);
}

function getCount(list) {
  const config = resolveSheet(list);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(config.name);
  if (!sheet) return 0;
  return Math.max(0, sheet.getLastRow() - 1);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
