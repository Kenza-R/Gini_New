"use client";

const FAQ_ITEMS = [
  {
    q: "What is Gini, exactly?",
    a: "A blood test built for women's bodies. It reads your results against where you are in your cycle and what your history says, so a number that looks fine in isolation doesn't get waved through as fine for you.",
  },
  {
    q: "How is this different from other at-home blood tests?",
    a: "Most at-home tests optimize for convenience alone: one draw, whenever you get around to it, scored against reference ranges built largely on men. Gini is convenient too, but it times your test to your cycle, reads your biomarkers in a women's health context, and hands you something your doctor can use.",
  },
  {
    q: "Is this a period tracking app?",
    a: "No. A tracker logs what already happened. Gini adds bloodwork to the picture and builds it over time, so you have something concrete to bring to an appointment.",
  },
  {
    q: "Will Gini diagnose me?",
    a: "No. Gini helps you see patterns and prepare for care. It is not a diagnosis, not medical advice, and not a replacement for your doctor.",
  },
  {
    q: "What if I don't have a cycle?",
    a: "You would still benefit from Gini. The panels are built specifically around women's metabolism and hormonal health, not only around a monthly bleed. Let us know in onboarding, and we'll make sure you get specific attention for whichever stage of life you're in.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Women's health data is deeply personal. Gini runs on HIPAA-compliant infrastructure with strict access controls. Your data is encrypted, never sold, and handled with the care this category demands.",
  },
] as const;

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="h-4 w-4 shrink-0 text-neutral-400"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FaqAccordion() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-neutral-200/80 py-14 sm:scroll-mt-28 sm:py-20"
    >
      <div className="mx-auto max-w-[40rem] px-5 sm:px-6">
        <h2 className="font-display text-center text-[clamp(1.6rem,3.4vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.02em]">
          Your questions answered
        </h2>
        <div className="mt-8 divide-y divide-neutral-200/80 border-y border-neutral-200/80">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[16px] font-semibold text-neutral-950 transition-colors hover:text-black sm:text-[17px] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="transition-transform duration-200 group-open:rotate-180">
                  <ChevronIcon />
                </span>
              </summary>
              <p className="max-w-[36rem] pb-5 text-[14px] leading-[1.7] text-neutral-600 sm:text-[15px]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
