"use client";

import {
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  getReferralParam,
  isValidEmail,
  isValidPhone,
  submitLeadSignup,
  type LeadList,
} from "@/lib/waitlist";

type PopupCopy = {
  emailTitle: string;
  emailBody: string;
  emailCta: string;
  phoneTitle: string;
  phoneBody: string;
  phoneCta: string;
  successTitle: string;
  successBody: string;
  emptyEmail: string;
  badEmail: string;
  badPhone: string;
};

const COPY: Record<LeadList, PopupCopy> = {
  waitlist: {
    emailTitle: "Join our waitlist",
    emailBody:
      "Join hundreds of women who decided to take ownership of their health. Leave your email below to receive updates.",
    emailCta: "Join the waitlist",
    phoneTitle: "One last thing",
    phoneBody:
      "What's the best number to reach you? We'll only use it to tell you when your spot opens.",
    phoneCta: "Add my number",
    successTitle: "You're on the list",
    successBody: "We'll be in touch the moment there's news worth sharing.",
    emptyEmail: "we need an email to add you, love.",
    badEmail: "that email looks a little off. try again?",
    badPhone: "that number looks a little short. try again?",
  },
  founding: {
    emailTitle: "Join as a founding member",
    emailBody:
      "A small group helping us build Gini from the start. Leave your email and we'll follow up personally about founding member access.",
    emailCta: "Request founding access",
    phoneTitle: "How should we reach you?",
    phoneBody:
      "Founding spots are limited. A number helps us get back to you quickly.",
    phoneCta: "Add my number",
    successTitle: "You're in the founding group",
    successBody: "We'll reach out personally about next steps.",
    emptyEmail: "we need an email to add you, love.",
    badEmail: "that email looks a little off. try again?",
    badPhone: "that number looks a little short. try again?",
  },
};

export function ColorfulLeadDialog({
  open,
  onClose,
  list,
}: {
  open: boolean;
  onClose: () => void;
  list: LeadList;
}) {
  const copy = COPY[list];
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"email" | "phone" | "success">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isFounding = list === "founding";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStep("email");
      setEmail("");
      setPhone("");
      setStatus("idle");
      setErrorMessage("");
    }
  }, [open]);

  const persistDone = () => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(`gini.${list}.done`, "1");
  };

  const handleEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setErrorMessage(copy.emptyEmail);
      return;
    }
    if (!isValidEmail(trimmed)) {
      setStatus("error");
      setErrorMessage(copy.badEmail);
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    try {
      await submitLeadSignup({
        list,
        email: trimmed,
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

  const finish = () => {
    persistDone();
    setStep("success");
    window.setTimeout(onClose, 1800);
  };

  const handlePhone = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidPhone(phone)) {
      setStatus("error");
      setErrorMessage(copy.badPhone);
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    try {
      await submitLeadSignup({
        list,
        email,
        phone,
        ref: getReferralParam(),
      });
      setStatus("idle");
      finish();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Try again."
      );
    }
  };

  if (!mounted || !open) return null;

  const button = isFounding
    ? "bg-[#1f4f7a] text-white"
    : "border border-black/70 bg-[#f4b942] text-black";
  const inputClass =
    "w-full rounded-full border border-black/25 bg-white/70 px-4 py-3 text-[15px] text-neutral-950 outline-none backdrop-blur-sm placeholder:text-neutral-500 focus:border-black/40 focus:bg-white/85 disabled:opacity-60";

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-[34rem] cursor-default overflow-hidden rounded-[2.25rem] border-2 border-[#f4a24a] sm:max-w-[36rem] sm:rounded-[2.5rem]"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{
          boxShadow:
            "0 6px 6px rgba(0, 0, 0, 0.08), 0 0 20px rgba(0, 0, 0, 0.06), 0 24px 80px -24px rgba(0,0,0,0.28)",
        }}
      >
        <div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            borderRadius: "inherit",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            filter: "url(#glass-distortion)",
            isolation: "isolate",
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            borderRadius: "inherit",
            background: isFounding
              ? "rgba(31, 79, 122, 0.22)"
              : "rgba(142, 232, 234, 0.42)",
          }}
        />
        <div
          className="absolute inset-0 z-20 overflow-hidden"
          style={{
            borderRadius: "inherit",
            background: "rgba(255, 255, 255, 0.28)",
            boxShadow:
              "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.45)",
          }}
        />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-6 z-40 text-[17px] leading-none text-black/70 transition-opacity hover:opacity-50 sm:top-7 sm:right-12 sm:text-[15px]"
          aria-label="Close"
        >
          ×
        </button>

        <div className="relative z-30 px-7 py-12 text-center sm:px-16 sm:py-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gini-wordmark.png?v=4"
            alt="Gini"
            className="mx-auto mb-5 h-8 w-auto object-contain sm:h-9"
          />

          {step === "success" ? (
            <>
              <h2
                id={titleId}
                className="font-editorial text-[clamp(1.7rem,5vw,2.35rem)] leading-[1.1] font-semibold text-pretty"
              >
                {copy.successTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-neutral-800 sm:text-[16px]">
                {copy.successBody}
              </p>
            </>
          ) : step === "phone" ? (
            <>
              <h2
                id={titleId}
                className="font-editorial text-[clamp(1.7rem,5vw,2.35rem)] leading-[1.1] font-semibold text-pretty"
              >
                {copy.phoneTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-neutral-800 sm:text-[16px]">
                {copy.phoneBody}
              </p>
              <form
                noValidate
                onSubmit={handlePhone}
                className="mx-auto mt-6 max-w-sm space-y-3"
              >
                <label htmlFor={`${list}-phone`} className="sr-only">
                  Phone number
                </label>
                <input
                  id={`${list}-phone`}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    if (status === "error") {
                      setStatus("idle");
                      setErrorMessage("");
                    }
                  }}
                  placeholder="Phone number"
                  disabled={status === "loading"}
                  className={inputClass}
                />
                <CuteError message={errorMessage} />
                <SubmitButton className={button} loading={status === "loading"}>
                  {copy.phoneCta}
                </SubmitButton>
                <button
                  type="button"
                  onClick={finish}
                  className="text-[13px] font-medium text-neutral-700 underline-offset-2 hover:underline"
                >
                  Skip for now
                </button>
              </form>
            </>
          ) : (
            <>
              <h2
                id={titleId}
                className="font-editorial text-[clamp(1.7rem,5vw,2.35rem)] leading-[1.1] font-semibold text-pretty"
              >
                {copy.emailTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-neutral-800 sm:text-[16px]">
                {copy.emailBody}
              </p>
              <form
                noValidate
                onSubmit={handleEmail}
                className="mx-auto mt-6 max-w-sm space-y-3"
              >
                <label htmlFor={`${list}-email`} className="sr-only">
                  Email address
                </label>
                <input
                  id={`${list}-email`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === "error") {
                      setStatus("idle");
                      setErrorMessage("");
                    }
                  }}
                  placeholder="Your email"
                  disabled={status === "loading"}
                  className={inputClass}
                />
                <CuteError message={errorMessage} />
                <SubmitButton className={button} loading={status === "loading"}>
                  {copy.emailCta}
                </SubmitButton>
                <p className="text-[12px] leading-relaxed text-neutral-700">
                  * No spam ever, we promise. We never sell your information.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function CuteError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p
      className="font-editorial text-[15px] leading-snug text-[#c45c4a] italic"
      role="alert"
    >
      {message}
    </p>
  );
}

function SubmitButton({
  children,
  className,
  loading,
}: {
  children: ReactNode;
  className: string;
  loading: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={[
        "w-full rounded-full px-6 py-3 text-[15px] font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70",
        className,
      ].join(" ")}
    >
      {loading ? "Saving…" : children}
    </button>
  );
}
