"use client";

import { useJoinModal } from "@/components/JoinWaitlistModal";

const MARKERS = [
  "Ferritin",
  "Glucose",
  "TSH",
  "hs-CRP",
  "Insulin",
  "Iron",
  "Cortisol",
  "Cholesterol",
  "B12",
  "Hemoglobin",
  "Triglycerides",
  "Free T3",
  "Vitamin D",
  "SHBG",
  "Platelets",
] as const;

function MarkerTrack({ reverse = false }: { reverse?: boolean }) {
  const row = [...MARKERS, ...MARKERS];
  return (
    <div className="overflow-hidden" aria-hidden>
      <div
        className={`flex w-max gap-10 pr-10 ${
          reverse ? "cycle-marquee-reverse" : "cycle-marquee"
        }`}
      >
        {row.map((marker, index) => (
          <span
            key={`${marker}-${index}`}
            className="font-editorial whitespace-nowrap text-[clamp(1.6rem,3.6vw,2.4rem)] leading-none text-white/90"
          >
            {marker}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CycleNavigation() {
  const { openJoinModal, openFoundingModal } = useJoinModal();

  return (
    <section
      id="the-cycle"
      className="scroll-mt-24 bg-[#7b95a9]"
      aria-label="The cycle and healthcare navigation"
    >
      <div className="mx-auto max-w-4xl px-5 pt-16 pb-10 text-center sm:px-6 sm:pt-24 sm:pb-12">
        <h2 className="font-display mx-auto max-w-[18ch] text-[clamp(2.1rem,5.4vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[#1e3345]">
          The cycle changes more than hormones.
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-[17px] leading-[1.55] text-[#1e3345]/80 sm:text-[18px]">
          Iron, glucose, thyroid, inflammation. They move with the month too.
          Most testing was built as if they don&apos;t. One draw. One range. The
          changes get flattened, or never measured at all.
        </p>
      </div>

      <div className="space-y-4 border-y border-white/15 py-5 sm:py-6">
        <MarkerTrack />
        <MarkerTrack reverse />
      </div>

      <div className="mx-auto max-w-4xl px-5 pt-12 pb-16 text-center sm:px-6 sm:pt-16 sm:pb-24">
        <h3 className="font-display text-[clamp(1.8rem,3.8vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.02em] text-[#1e3345]">
          Healthcare navigator
        </h3>
        <p className="mx-auto mt-5 max-w-[36rem] text-[17px] leading-[1.55] text-[#1e3345]/80 sm:text-[18px]">
          It used to be someone&apos;s job to help you understand the system and
          get through it. For most women, that support was walked back. Gini
          puts it back in your hands: make sense of what your body is doing,
          then find your way through care with it.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={openJoinModal}
            className="inline-flex rounded-full bg-[#f4a24a] px-7 py-3 text-[14px] font-semibold text-neutral-950 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Join waitlist
          </button>
          <button
            type="button"
            onClick={openFoundingModal}
            className="inline-flex rounded-full bg-[#1f4f7a] px-7 py-3 text-[14px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Join founding members
          </button>
        </div>
      </div>
    </section>
  );
}
