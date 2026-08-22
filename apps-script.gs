/**
 * Gini Health: Waitlist + Founding Members → Google Sheets
 *
 * Waitlist keeps writing to the existing Signups tab in this spreadsheet.
 * Existing rows are never deleted. A Phone column is added after Email if
 * it is not already there.
 *
 * Founding members go to a separate Google Sheet named
 * "Gini Founding Members", created once in the script owner's Drive.
 *
 * After pasting this file:
 *   1. Save
 *   2. Run setupOnce (first time only) and authorize
 *   3. Deploy > Manage deployments > pencil > Version: New version > Deploy
 *      The /exec URL stays the same.
 *
 * The Next.js /api/signup route posts:
 *   email, phone, list (waitlist | founding), ref, ua
 */

const WAITLIST_SHEET_NAME = "Signups";
const FOUNDING_SHEET_NAME = "FoundingMembers";
const FOUNDING_SPREADSHEET_TITLE = "Gini Founding Members";
const FOUNDING_SHEET_PROP = "FOUNDING_SHEET_ID";

const WAITLIST_HEADERS = [
  "Date",
  "Email",
  "Phone",
  "First Name",
  "Reason",
  "Referred By",
  "User Agent",
];

const FOUNDING_HEADERS = ["Date", "Email", "Phone", "Referred By", "User Agent"];

function looksLikePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function setupOnce() {
  const waitlist = getWaitlistSheet();
  ensureWaitlistPhoneColumn(waitlist);
  const founding = getFoundingSpreadsheet();
  Logger.log("Waitlist sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl());
  Logger.log("Founding members sheet: " + founding.getUrl());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);

    const p = e && e.parameter ? e.parameter : {};
    const email = p.email ? String(p.email).trim().toLowerCase() : "";
    const rawPhone = p.phone ? String(p.phone).trim() : "";
    const rawReason = p.reason ? String(p.reason).trim() : "";
    const phone = rawPhone || (looksLikePhone(rawReason) ? rawReason : "");
    const ref = p.ref ? String(p.ref).trim() : "";
    const ua = p.ua ? String(p.ua) : "";
    const list = String(p.list || "waitlist").toLowerCase();

    if (!email) return json({ ok: false, error: "no email" });

    if (list === "founding") {
      return writeFoundingRow({ email: email, phone: phone, ref: ref, ua: ua });
    }
    return writeWaitlistRow({ email: email, phone: phone, ref: ref, ua: ua });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function writeWaitlistRow(record) {
  const sheet = getWaitlistSheet();
  const phoneCol = ensureWaitlistPhoneColumn(sheet);

  const lastRow = sheet.getLastRow();
  let rowIndex = -1;
  if (lastRow > 1) {
    const emails = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
    for (let i = 0; i < emails.length; i++) {
      if (String(emails[i][0]).trim().toLowerCase() === record.email) {
        rowIndex = i + 2;
        break;
      }
    }
  }

  if (rowIndex === -1) {
    sheet.appendRow([
      new Date(),
      record.email,
      record.phone,
      "",
      "",
      record.ref,
      record.ua,
    ]);
    return json({ ok: true, created: true, sheet: WAITLIST_SHEET_NAME });
  }

  if (record.phone) sheet.getRange(rowIndex, phoneCol).setValue(record.phone);
  const refCol = phoneCol === 3 ? 6 : 5;
  if (record.ref && !sheet.getRange(rowIndex, refCol).getValue()) {
    sheet.getRange(rowIndex, refCol).setValue(record.ref);
  }
  return json({ ok: true, updated: true, sheet: WAITLIST_SHEET_NAME });
}

function writeFoundingRow(record) {
  const ss = getFoundingSpreadsheet();
  let sheet = ss.getSheetByName(FOUNDING_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(FOUNDING_SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(FOUNDING_HEADERS);

  const lastRow = sheet.getLastRow();
  let rowIndex = -1;
  if (lastRow > 1) {
    const emails = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
    for (let i = 0; i < emails.length; i++) {
      if (String(emails[i][0]).trim().toLowerCase() === record.email) {
        rowIndex = i + 2;
        break;
      }
    }
  }

  if (rowIndex === -1) {
    sheet.appendRow([
      new Date(),
      record.email,
      record.phone,
      record.ref,
      record.ua,
    ]);
    return json({
      ok: true,
      created: true,
      sheet: FOUNDING_SHEET_NAME,
      spreadsheet: ss.getUrl(),
    });
  }

  if (record.phone) sheet.getRange(rowIndex, 3).setValue(record.phone);
  if (record.ref && !sheet.getRange(rowIndex, 4).getValue()) {
    sheet.getRange(rowIndex, 4).setValue(record.ref);
  }
  return json({
    ok: true,
    updated: true,
    sheet: FOUNDING_SHEET_NAME,
    spreadsheet: ss.getUrl(),
  });
}

function getWaitlistSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(WAITLIST_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(WAITLIST_SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(WAITLIST_HEADERS);
  return sheet;
}

/**
 * Adds a Phone column after Email on the existing Signups tab.
 * Never deletes rows. Existing First Name / Reason / referral data stays.
 */
function ensureWaitlistPhoneColumn(sheet) {
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet
    .getRange(1, 1, 1, lastCol)
    .getValues()[0]
    .map(function (h) {
      return String(h).trim().toLowerCase();
    });

  const existing = headers.indexOf("phone");
  if (existing !== -1) return existing + 1;

  const emailCol = headers.indexOf("email");
  const insertAfter = emailCol === -1 ? 2 : emailCol + 1;
  sheet.insertColumnAfter(insertAfter);
  sheet.getRange(1, insertAfter + 1).setValue("Phone");
  return insertAfter + 1;
}

function getFoundingSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty(FOUNDING_SHEET_PROP);
  if (existingId) {
    try {
      return SpreadsheetApp.openById(existingId);
    } catch (err) {
      // Fall through and create a new one if the saved file was removed.
    }
  }

  const ss = SpreadsheetApp.create(FOUNDING_SPREADSHEET_TITLE);
  props.setProperty(FOUNDING_SHEET_PROP, ss.getId());

  const sheet = ss.getSheets()[0];
  sheet.setName(FOUNDING_SHEET_NAME);
  sheet.clear();
  sheet.appendRow(FOUNDING_HEADERS);
  return ss;
}

const GOAL = 500;

function doGet(e) {
  const p = e && e.parameter ? e.parameter : {};
  const payload = {
    ok: true,
    count: getWaitlistCount(),
    foundingCount: getFoundingCount(),
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

function getWaitlistCount() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    WAITLIST_SHEET_NAME
  );
  if (!sheet) return 0;
  return Math.max(0, sheet.getLastRow() - 1);
}

function getFoundingCount() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty(FOUNDING_SHEET_PROP);
  if (!id) return 0;
  try {
    const ss = SpreadsheetApp.openById(id);
    const sheet = ss.getSheetByName(FOUNDING_SHEET_NAME);
    if (!sheet) return 0;
    return Math.max(0, sheet.getLastRow() - 1);
  } catch (err) {
    return 0;
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
