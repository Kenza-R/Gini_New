const EXPERTS = [
  {
    name: "Hugh Taylor, MD",
    role: "Professor and Chair, Obstetrics, Gynecology & Reproductive Sciences",
    affiliation: "Yale School of Medicine",
    image: "/experts/hugh-taylor.jpg",
    width: 1080,
    height: 1350,
    note: "National Academy of Medicine. Known internationally for his work on endometriosis, infertility, and reproductive science.",
  },
  {
    name: "Clare Flannery, MD",
    role: "Associate Professor, Obstetrics, Gynecology & Reproductive Sciences",
    affiliation: "Yale School of Medicine",
    image: "/experts/clare-flannery.jpg",
    width: 1600,
    height: 2400,
    note: "Reproductive endocrinologist focused on PCOS, metabolic health, and how hormones move through a woman's life.",
  },
] as const;

export default function ExpertBoard() {
  return (
    <section
      id="experts"
      className="scroll-mt-24 border-t border-neutral-200/80 bg-white py-16 sm:scroll-mt-28 sm:py-24"
      aria-label="Backed by leading experts"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <p className="text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
          Medical advisors
        </p>
        <h2 className="mt-3 text-center text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
          Backed by leading experts in the field
        </h2>
        <p className="mx-auto mt-4 max-w-[34rem] text-center text-[16px] leading-relaxed text-neutral-600">
          Built with clinicians who have spent their careers inside women&apos;s
          reproductive health, at one of the country&apos;s leading medical
          schools.
        </p>

        <ul className="mx-auto mt-12 grid max-w-4xl gap-10 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:gap-12">
          {EXPERTS.map((expert) => (
            <li key={expert.name} className="flex flex-col">
              <div className="overflow-hidden rounded-[1.35rem] bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={expert.image}
                  alt={expert.name}
                  width={expert.width}
                  height={expert.height}
                  decoding="async"
                  className="aspect-[4/5] h-auto w-full object-cover object-[center_18%]"
                />
              </div>
              <div className="mt-5 px-1">
                <h3 className="font-editorial text-[1.55rem] leading-tight tracking-[-0.02em] text-neutral-950">
                  {expert.name}
                </h3>
                <p className="mt-1.5 text-[14px] leading-snug text-neutral-700">
                  {expert.role}
                </p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                  {expert.affiliation}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">
                  {expert.note}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
