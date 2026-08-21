import { Star } from "lucide-react";

const QUOTES = [
  {
    quote:
      "For the first time I had something to bring to my appointment besides a list of symptoms nobody believed.",
    name: "Maya R.",
    rotate: "-rotate-[7deg]",
    width: "w-[17.5rem]",
    tone: "bg-[#faf7f1]",
    offset: "sm:mt-10 sm:ml-0",
  },
  {
    quote:
      "I stopped apologizing for how I felt. Seeing the pattern on paper changed the whole conversation.",
    name: "Priya S.",
    rotate: "rotate-[5deg]",
    width: "w-[16.2rem]",
    tone: "bg-white",
    offset: "sm:mt-0 sm:-mr-4",
  },
  {
    quote:
      "Testing finally felt built for my cycle, not a random Tuesday at 8am between meetings.",
    name: "Elena M.",
    rotate: "rotate-[8deg]",
    width: "w-[18.2rem]",
    tone: "bg-[#eef3f6]",
    offset: "sm:-mt-4 sm:ml-6",
  },
  {
    quote:
      "I walked in with the whole picture instead of a half-remembered list. That was the first time a doctor stayed with me.",
    name: "Jordan K.",
    rotate: "-rotate-[4deg]",
    width: "w-[17rem]",
    tone: "bg-[#f4eee6]",
    offset: "sm:mt-8 sm:-ml-2",
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
      className="scroll-mt-24 overflow-x-clip border-t border-neutral-200/80 bg-[#f8f8f8] py-16 sm:scroll-mt-28 sm:py-24"
      aria-label="Customer stories"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <p className="text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
          From women who know this
        </p>
        <h2 className="mt-3 text-center text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
          They were told it was nothing.
        </h2>
        <p className="mx-auto mt-4 max-w-[30rem] text-center text-[16px] leading-relaxed text-neutral-600">
          Notes from early members who were done explaining themselves from
          scratch.
        </p>

        <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-8 sm:mt-16 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center sm:gap-x-8 sm:gap-y-12">
          {QUOTES.map((item) => (
            <figure
              key={item.name}
              className={`${item.width} ${item.rotate} ${item.offset} ${item.tone} quote-vignette relative max-w-[85vw] rounded-[1.15rem] px-6 py-6 shadow-[0_18px_40px_rgba(20,20,20,0.08)] sm:px-7 sm:py-7`}
            >
              <Stars />
              <blockquote className="mt-4 font-editorial text-[1.2rem] leading-[1.35] text-neutral-800">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-[13px] font-semibold tracking-[-0.02em] text-neutral-500">
                {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
