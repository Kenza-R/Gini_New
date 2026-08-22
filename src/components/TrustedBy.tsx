function YaleSomMark() {
  return (
    <svg viewBox="0 0 168 44" className="h-9 w-auto max-w-full sm:h-10" aria-hidden>
      <text
        x="84"
        y="24"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="600"
        letterSpacing="-0.4"
      >
        Yale
      </text>
      <text
        x="84"
        y="40"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="7"
        fontWeight="700"
        letterSpacing="1.6"
      >
        SCHOOL OF MEDICINE
      </text>
    </svg>
  );
}

function YaleHealthMark() {
  return (
    <svg viewBox="0 0 168 44" className="h-9 w-auto max-w-full sm:h-10" aria-hidden>
      <text
        x="84"
        y="16"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="8.5"
        fontWeight="600"
        letterSpacing="0.6"
      >
        Yale New Haven
      </text>
      <text
        x="84"
        y="38"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.3"
      >
        Health
      </text>
    </svg>
  );
}

function MitMark() {
  return (
    <svg viewBox="0 0 92 36" className="h-7 w-auto max-w-full sm:h-8" aria-hidden>
      <text
        x="0"
        y="29"
        fill="currentColor"
        fontFamily="Arial Black, Arial, Helvetica, sans-serif"
        fontSize="30"
        fontWeight="900"
        letterSpacing="-1.4"
      >
        MIT
      </text>
    </svg>
  );
}

function HarvardMark() {
  return (
    <svg viewBox="0 0 168 36" className="h-7 w-auto max-w-full sm:h-8" aria-hidden>
      <text
        x="84"
        y="27"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="18"
        fontWeight="700"
        letterSpacing="2.4"
      >
        HARVARD
      </text>
    </svg>
  );
}

function EfMark() {
  return (
    <svg viewBox="0 0 176 36" className="h-6 w-auto max-w-full sm:h-7" aria-hidden>
      <text
        x="88"
        y="24"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="13"
        fontWeight="600"
        letterSpacing="-0.2"
      >
        entrepreneurs first
      </text>
    </svg>
  );
}

function TransposeMark() {
  return (
    <svg viewBox="0 0 168 36" className="h-6 w-auto max-w-full sm:h-7" aria-hidden>
      <text
        x="84"
        y="24"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="13.5"
        fontWeight="600"
        letterSpacing="2.8"
      >
        TRANSPOSE
      </text>
    </svg>
  );
}

function UclMark() {
  return (
    <svg viewBox="0 0 86 36" className="h-7 w-auto max-w-full sm:h-8" aria-hidden>
      <text
        x="0"
        y="29"
        fill="currentColor"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="-0.8"
      >
        UCL
      </text>
    </svg>
  );
}

const LOGOS = [
  { name: "Yale School of Medicine", Mark: YaleSomMark },
  { name: "Yale New Haven Health", Mark: YaleHealthMark },
  { name: "MIT", Mark: MitMark },
  { name: "Harvard", Mark: HarvardMark },
  { name: "Entrepreneurs First", Mark: EfMark },
  { name: "Transpose", Mark: TransposeMark },
  { name: "UCL", Mark: UclMark },
] as const;

function LogoRow({
  logos,
  className,
}: {
  logos: readonly (typeof LOGOS)[number][];
  className?: string;
}) {
  return (
    <ul className={className}>
      {logos.map(({ name, Mark }) => (
        <li key={name} className="flex max-w-full items-center justify-center">
          <span className="sr-only">{name}</span>
          <Mark />
        </li>
      ))}
    </ul>
  );
}

export default function TrustedBy() {
  return (
    <section
      className="bg-white py-12 sm:py-16"
      aria-label="Trusted by leading experts in women's health"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <p className="text-center text-[12px] font-medium tracking-[0.16em] text-neutral-400 uppercase sm:text-[13px]">
          Trusted by leading experts in women&apos;s health
        </p>
        <div className="mt-8 flex flex-col items-center gap-7 text-neutral-400 sm:mt-10 lg:hidden">
          <LogoRow
            logos={LOGOS.slice(0, 4)}
            className="flex w-full items-center justify-center gap-x-5 sm:gap-x-8"
          />
          <LogoRow
            logos={LOGOS.slice(4)}
            className="flex w-full items-center justify-center gap-x-5 sm:gap-x-8"
          />
        </div>
        <LogoRow
          logos={LOGOS}
          className="mt-10 hidden grid-cols-7 items-center justify-items-center gap-x-6 text-neutral-400 lg:grid"
        />
      </div>
    </section>
  );
}
