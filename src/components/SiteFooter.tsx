"use client";

import { FormEvent, useState } from "react";
import { useJoinModal } from "@/components/JoinWaitlistModal";
import {
  getReferralParam,
  isValidEmail,
  isValidPhone,
  submitLeadSignup,
} from "@/lib/waitlist";

export default function SiteFooter() {
  const { openJoinModal } = useJoinModal();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"email" | "phone" | "done">("email");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMessage("That email doesn't look quite right.");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      await submitLeadSignup({
        list: "waitlist",
        email,
        ref: getReferralParam(),
      });
      setStatus("idle");
      setStep("phone");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Try again."
      );
    }
  };

  const handlePhone = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidPhone(phone)) {
      setStatus("error");
      setErrorMessage("Enter a number with at least 10 digits.");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      await submitLeadSignup({
        list: "waitlist",
        email,
        phone,
        ref: getReferralParam(),
      });
      setStatus("idle");
      setStep("done");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Try again."
      );
    }
  };

  return (
    <footer className="relative bg-[#B5CBDC] text-black">
      <div className="absolute inset-x-0 top-0 z-20 flex -translate-y-1/2 justify-center">
        <a href="#top" aria-label="Gini home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gini-wordmark.png?v=4"
            alt="Gini"
            className="h-12 w-auto object-contain sm:h-14"
          />
        </a>
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-black" aria-hidden />

      <div className="mx-auto max-w-3xl px-5 pt-14 pb-12 text-center sm:px-8 sm:pt-16">
        <p className="font-editorial text-[clamp(1.2rem,2.8vw,1.55rem)] leading-snug">
          Join the waitlist for news, access, and what we&apos;re building next.
        </p>

        {step === "done" ? (
          <p className="mt-6 text-[15px] font-medium">You&apos;re on the list. We&apos;ll be in touch.</p>
        ) : step === "phone" ? (
          <form
            onSubmit={handlePhone}
            className="mx-auto mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            <label htmlFor="footer-phone" className="sr-only">
              Phone number
            </label>
            <input
              id="footer-phone"
              type="tel"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                if (status === "error") setErrorMessage("");
              }}
              placeholder="Phone number"
              className="min-h-[48px] flex-1 rounded-full border border-black bg-white px-5 text-[15px] outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-[#f4b942] px-7 py-3 text-[15px] font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {status === "loading" ? "Saving…" : "Add number"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleEmail}
            className="mx-auto mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status === "error") setErrorMessage("");
              }}
              placeholder="Your email"
              className="min-h-[48px] flex-1 rounded-full border border-black bg-white px-5 text-[15px] outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-[#f4b942] px-7 py-3 text-[15px] font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {status === "loading" ? "Joining…" : "Join waitlist"}
            </button>
          </form>
        )}
        {errorMessage ? (
          <p className="mt-2 text-[13px] text-red-900" role="alert">
            {errorMessage}
          </p>
        ) : null}
        {step === "phone" ? (
          <button
            type="button"
            onClick={() => setStep("done")}
            className="mt-3 text-[13px] underline-offset-2 hover:underline"
          >
            Skip for now
          </button>
        ) : null}
      </div>

      <div className="grid w-full grid-cols-1 border-t border-black md:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.85fr)]">
        <div className="px-6 py-10 sm:px-10 sm:py-14 md:border-r md:border-black lg:px-16 lg:py-16 xl:px-24">
          <p className="font-editorial max-w-[40rem] text-[clamp(1.25rem,2.2vw,1.85rem)] font-bold leading-snug md:max-w-none">
            Gini started from a frustration our founders know too well, and one
            that too many women around them still live with. The vision is bigger
            than a test. We&apos;re building in service of women, and for their
            health: a future where women can live healthy, active lives through
            every phase. If that&apos;s a future you&apos;d like to be part of,
            join us.
          </p>
        </div>
        <div className="border-t border-black px-6 py-10 sm:px-10 sm:py-14 md:border-t-0 lg:px-16 lg:py-16 xl:px-20">
          <p className="text-[13px] font-semibold tracking-[0.08em] uppercase">About</p>
          <ul className="mt-5 space-y-3 text-[16px]">
            <li>
              <a href="/team" className="hover:underline">
                Team
              </a>
            </li>
            <li>
              <a href="/#the-cycle" className="hover:underline">
                The cycle
              </a>
            </li>
            <li>
              <button type="button" onClick={openJoinModal} className="hover:underline">
                Join the waitlist
              </button>
            </li>
            <li>
              <a href="/#founding" className="hover:underline">
                Founding members
              </a>
            </li>
            <li>
              <a href="mailto:hello@gini.health" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
          <p className="mt-8 text-[13px] text-black/70">
            © {new Date().getFullYear()} Gini Health. Not a medical device.
          </p>
        </div>
      </div>
    </footer>
  );
}
