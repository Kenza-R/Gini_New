export type LeadList = "waitlist" | "founding";

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function getReferralParam() {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("ref")?.trim() ?? "";
}

export async function submitLeadSignup({
  list,
  email,
  phone,
  ref,
}: {
  list: LeadList;
  email: string;
  phone?: string;
  ref?: string;
}) {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      list,
      email: email.trim().toLowerCase(),
      phone: phone?.trim() ?? "",
      ref: ref ?? "",
      ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
    }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;
    throw new Error(data?.error || "Could not save your signup.");
  }
}

/** @deprecated use submitLeadSignup */
export async function submitWaitlistSignup({
  email,
  ref,
}: {
  email: string;
  ref?: string;
}) {
  return submitLeadSignup({ list: "waitlist", email, ref });
}
