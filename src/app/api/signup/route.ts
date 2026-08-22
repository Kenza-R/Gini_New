import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const LISTS = ["waitlist", "founding"] as const;
type LeadList = (typeof LISTS)[number];

const FILES: Record<LeadList, { jsonl: string; csv: string }> = {
  waitlist: {
    jsonl: "waitlist.jsonl",
    csv: "waitlist.csv",
  },
  founding: {
    jsonl: "founding-members.jsonl",
    csv: "founding-members.csv",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CSV_HEADER = "date,email,phone,list,ref,userAgent\n";

function csvCell(value: string) {
  const escaped = value.replaceAll('"', '""');
  return `"${escaped}"`;
}

function googleEndpoint(list: LeadList) {
  if (list === "founding") {
    return (
      process.env.FOUNDING_FORM_ENDPOINT ||
      process.env.NEXT_PUBLIC_FOUNDING_FORM_ENDPOINT ||
      process.env.NEXT_PUBLIC_WAITLIST_FORM_ENDPOINT ||
      ""
    );
  }
  return (
    process.env.WAITLIST_FORM_ENDPOINT ||
    process.env.NEXT_PUBLIC_WAITLIST_FORM_ENDPOINT ||
    "https://script.google.com/macros/s/AKfycbzo4SWAhaOkHEyzr7Tb9JllMb4nReaNcdAMnszSZGxTIPRKkqaW8lKzk5hpZVRYjMMIjA/exec"
  );
}

async function saveLocalFile(record: {
  date: string;
  email: string;
  phone: string;
  list: LeadList;
  ref: string;
  ua: string;
}) {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });

  const files = FILES[record.list];
  const jsonlPath = path.join(dir, files.jsonl);
  const csvPath = path.join(dir, files.csv);

  const line =
    JSON.stringify({
      date: record.date,
      email: record.email,
      phone: record.phone,
      list: record.list,
      ref: record.ref,
      userAgent: record.ua,
    }) + "\n";

  await appendFile(jsonlPath, line, "utf8");

  try {
    const { readFile } = await import("node:fs/promises");
    await readFile(csvPath, "utf8");
  } catch {
    await appendFile(csvPath, CSV_HEADER, "utf8");
  }

  await appendFile(
    csvPath,
    [
      csvCell(record.date),
      csvCell(record.email),
      csvCell(record.phone),
      csvCell(record.list),
      csvCell(record.ref),
      csvCell(record.ua),
    ].join(",") + "\n",
    "utf8"
  );
}

async function forwardToSheet(record: {
  email: string;
  phone: string;
  list: LeadList;
  ref: string;
  ua: string;
}) {
  const endpoint = googleEndpoint(record.list);
  if (!endpoint) return;

  const payload = new URLSearchParams({
    email: record.email,
    phone: record.phone,
    list: record.list,
    ref: record.ref,
    ua: record.ua,
  });
  // The live Apps Script is still the original Signups writer. It ignores
  // `phone` and writes `reason` into column 4. Send the number there too
  // so it lands in the existing sheet before that script is redeployed.
  if (record.phone) {
    payload.set("reason", record.phone);
  }

  const response = await fetch(`${endpoint}?${payload.toString()}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: payload,
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Sheet forward failed (${response.status})`);
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const list = String(body.list ?? "waitlist") as LeadList;
  if (!LISTS.includes(list)) {
    return Response.json({ ok: false, error: "Unknown list." }, { status: 400 });
  }

  const email = String(body.email ?? "")
    .trim()
    .toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const ref = String(body.ref ?? "").trim();
  const ua = String(body.ua ?? "").slice(0, 400);

  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "That email doesn't look quite right." },
      { status: 400 }
    );
  }

  const record = {
    date: new Date().toISOString(),
    email,
    phone,
    list,
    ref,
    ua,
  };

  let savedLocally = false;
  try {
    await saveLocalFile(record);
    savedLocally = true;
  } catch (error) {
    console.error("Failed to write signup file", error);
  }

  let forwarded = false;
  try {
    await forwardToSheet(record);
    forwarded = true;
  } catch (error) {
    console.error("Sheet forward failed", error);
  }

  if (!savedLocally && !forwarded) {
    return Response.json(
      { ok: false, error: "Could not save your signup." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
