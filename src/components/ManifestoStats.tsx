const STATS = [
  {
    value: "94%",
    label: "of women have had their symptoms dismissed",
  },
  {
    value: "5–11 yrs",
    label: "the typical time it takes to get diagnosed",
  },
  {
    value: "4 in 5",
    label: "women say there were times they were not listened to",
  },
] as const;

export default function ManifestoStats() {
  return (
    <section className="border-y border-neutral-200/80 bg-gini-surface px-5 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3 sm:gap-6">
        {STATS.map((stat) => (
          <div key={stat.value} className="text-center">
            <p
              className="text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.04em]"
              style={{ color: "#00ced1" }}
            >
              {stat.value}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
