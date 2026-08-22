import { Star } from "lucide-react";

const QUOTES = [
  {
    quote:
      "Nobody helps you put two and two together, and that's so annoying.",
    name: "Maya R.",
    rotate: "-rotate-[5deg]",
    tone: "bg-[#faf7f1]",
  },
  {
    quote:
      "Going to a doctor appointment is so frustrating when you don't know what to say. Gini helped me navigate that.",
    name: "Priya S.",
    rotate: "rotate-[4deg]",
    tone: "bg-white",
  },
  {
    quote: "I feel less alone trying to understand my health.",
    name: "Elena M.",
    rotate: "rotate-[6deg]",
    tone: "bg-[#eef3f6]",
  },
  {
    quote:
      "I walked in knowing what to ask for, not hoping they'd figure it out for me.",
    name: "Jordan K.",
    rotate: "-rotate-[3deg]",
    tone: "bg-[#f4eee6]",
  },
] as const;

function Stars() {
  return (
    <div className="flex gap-[3px]" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-[13px] w-[13px] fill-[#f4a24a] text-[#f4a24a]"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export default function CustomerQuotes() {
  return (
    <section
      id="stories"
      className="scroll-mt-24 overflow-x-clip border-t border-neutral-200/80 bg-[#f8f8f8] py-12 sm:scroll-mt-28 sm:py-16"
      aria-label="Customer stories"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <p className="text-center text-[13px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
          From women who know this
        </p>
        <h2 className="font-display mt-3 text-center text-[clamp(1.9rem,4vw,2.8rem)] font-medium leading-[1.15] tracking-[-0.02em]">
          They were told it was nothing.
        </h2>

        <div className="mx-auto mt-10 grid grid-cols-2 gap-x-3 gap-y-8 md:mt-12 md:grid-cols-4 md:items-start md:gap-x-4 md:gap-y-0 lg:gap-x-5">
          {QUOTES.map((item) => (
            <figure
              key={item.name}
              className={`${item.rotate} ${item.tone} quote-vignette relative min-w-0 w-full rounded-[1.15rem] px-4 py-5 shadow-[0_18px_40px_rgba(20,20,20,0.08)] sm:px-5 sm:py-6`}
            >
              <Stars />
              <blockquote className="mt-3 font-editorial text-[1.05rem] leading-[1.35] text-neutral-800 sm:mt-4 sm:text-[1.15rem]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[12px] font-semibold tracking-[-0.02em] text-neutral-500 sm:mt-5 sm:text-[13px]">
                {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
