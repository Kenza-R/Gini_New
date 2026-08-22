"use client";

import { useJoinModal } from "@/components/JoinWaitlistModal";

const FEATURES = [
  "Tailored blood panels, designed around your biology",
  "Connected medical history",
  "Designed by leaders in women's health",
  "A personalized health plan",
  "Context-aware, AI-powered health insights",
  "Comprehensive blood biomarker and hormonal testing",
] as const;

export default function FoundingPricing() {
  const { openFoundingModal } = useJoinModal();

  return (
    <section
      id="founding"
      className="relative scroll-mt-24 border-t border-neutral-200/80 bg-white py-16 sm:scroll-mt-28 sm:py-24"
    >
      <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
        <h2 className="font-editorial text-center text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] text-neutral-900">
          Founding Member Pricing
        </h2>

        <div className="mt-10 overflow-hidden rounded-[28px] border border-neutral-200 bg-white">
          <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="flex flex-col justify-center px-8 py-10 sm:px-10">
              <p className="text-[13px] font-medium tracking-[0.04em] text-neutral-500">
                Annually
              </p>
              <div className="relative mt-2 w-fit pr-20">
                <p className="font-editorial text-[clamp(3.4rem,8vw,4.6rem)] leading-none text-neutral-900">
                  $1,499
                </p>
                <p className="font-editorial absolute -top-1 right-0 text-[1.35rem] leading-none text-neutral-400 line-through decoration-neutral-400">
                  $7,000
                </p>
              </div>
              <p className="mt-4 max-w-[18rem] text-[14px] leading-relaxed text-neutral-700">
                Keep this pricing through every renewal.
              </p>
              <button
                type="button"
                onClick={openFoundingModal}
                className="mt-8 inline-flex w-fit rounded-full bg-[#1f4f7a] px-7 py-3 text-[14px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Join founding members
              </button>
            </div>

            <ul className="border-t border-neutral-200/80 md:border-t-0 md:border-l">
              {FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="border-b border-neutral-200/80 px-8 py-4 text-[15px] leading-snug text-neutral-800 last:border-b-0 sm:px-10 sm:py-[1.15rem]"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
