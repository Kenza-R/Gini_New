"use client";

import { motion } from "framer-motion";
import GlassNav from "@/components/GlassNav";
import {
  JoinModalProvider,
  useJoinModal,
} from "@/components/JoinWaitlistModal";
import { GlassButton, GlassFilter } from "@/components/ui/liquid-glass";
import { TypewriterLoop } from "@/components/ui/typewriter-loop";
import HowItWorksScroll from "@/components/HowItWorksScroll";
import ExpertBoard from "@/components/ExpertBoard";
import CustomerQuotes from "@/components/CustomerQuotes";
import FaqAccordion from "@/components/FaqAccordion";
import FoundingPricing from "@/components/FoundingPricing";
import SiteFooter from "@/components/SiteFooter";

const PRODUCT_POINTS = [
  {
    title: "Collected at home",
    body: "A few minutes on your own couch. No lab waiting room, no time off work.",
  },
  {
    title: "Timed to your cycle",
    body: "Your hormones swing across the month. We draw on the days the numbers can be read.",
  },
  {
    title: "Ready for your doctor",
    body: "Results arrive as one clear summary you can hand over at your next appointment.",
  },
] as const;

const CONTRAST_ROWS = [
  ["Three doctors, none with the full picture", "One health story that travels with you"],
  ["“It’s probably stress”", "Symptoms checked against real data"],
  ["One lab draw on a random day", "Testing timed to where you are in your cycle"],
  ["You explain yourself from scratch every visit", "You walk in with the context already there"],
] as const;

const STATS = [
  { value: "7-10 yrs", label: "the typical delay before an endometriosis diagnosis" },
  { value: "Up to 70%", label: "of women with PCOS are never diagnosed" },
  { value: "4 in 5", label: "women say a doctor has dismissed what they were feeling" },
] as const;

const AUDIENCE = [
  {
    title: "You've seen three specialists",
    body: "None of them talk to each other, and you still don't have an answer.",
  },
  {
    title: "Something changed",
    body: "Your period, skin, energy, or weight shifted - and no one connected the dots.",
  },
  {
    title: "You were told it's normal",
    body: "You know your own body well enough to know that it isn't.",
  },
  {
    title: "You're tired of starting over",
    body: "You want to walk into your next appointment with the whole story already told.",
  },
] as const;

const GINI_IS = [
  "A blood test built for women's bodies",
  "Testing timed to your cycle, so trends mean something",
  "One place where your symptoms, labs, and history connect",
  "A clearer handoff to the right doctor",
] as const;

const GINI_IS_NOT = [
  "A diagnosis, or a replacement for your doctor",
  "Another app tracking one thing in isolation",
  "Something to self-diagnose with at 2 a.m.",
  "A one-off lab result with no context",
] as const;

function JoinBetaButton({
  className,
  contentClassName,
}: {
  className?: string;
  contentClassName?: string;
}) {
  const { openJoinModal } = useJoinModal();
  return (
    <GlassButton
      onClick={openJoinModal}
      className={className ?? "!rounded-full !px-8 !py-3.5 sm:!px-10 sm:!py-4"}
      contentClassName={
        contentClassName ?? "text-[15px] font-semibold text-neutral-950 sm:text-[16px]"
      }
    >
      Join waitlist
    </GlassButton>
  );
}

function JoinFoundingButton() {
  const { openFoundingModal } = useJoinModal();
  return (
    <button
      type="button"
      onClick={openFoundingModal}
      className="inline-flex rounded-full bg-[#1f4f7a] px-5 py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] sm:px-6 sm:py-2.5 sm:text-[14px]"
    >
      Join founding members
    </button>
  );
}

function GiniLandingContent() {
  return (
    <main id="top" className="min-h-screen bg-gini-surface text-neutral-950">
      <GlassFilter />
      <GlassNav />

      <section className="relative min-h-[100svh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-women.png?v=5"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_22%] sm:object-[center_28%]"
        />
        <div className="hero-vignette pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-28 sm:px-10 sm:pb-14 lg:px-16">
          <div className="w-full max-w-5xl">
            <h1 className="text-[clamp(1.85rem,6.2vw,4.6rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-white uppercase">
              <span className="block drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
                What you&apos;re feeling is not
              </span>
              <TypewriterLoop
                phrases={["just stress", "normal", "in your head"]}
                className="mt-1 block text-[#00ced1] uppercase drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]"
              />
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/88 sm:mt-6 sm:text-[17px]">
              Gini is a blood test built for women&apos;s bodies, read in the context of
              your cycle and your history.
            </p>
            <div className="mt-7 sm:mt-8">
              <JoinFoundingButton />
            </div>
          </div>
        </div>
      </section>

      <section
        id="product"
        className="scroll-mt-24 flex min-h-[100svh] items-center border-t border-neutral-200/80 px-6 py-20 sm:scroll-mt-28 sm:px-10 sm:py-24 lg:px-14"
      >
        <div className="mx-auto grid w-full max-w-[78rem] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-x-16 xl:gap-x-20">
          <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-pretty">
              The first blood test built for women.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-neutral-600 sm:text-[18px]">
              Most blood panels were built around a body that doesn&apos;t cycle. Gini
              reads yours against the week you&apos;re in.
            </p>
            <ul className="mt-9 w-full space-y-5 border-t border-neutral-200/80 pt-8">
              {PRODUCT_POINTS.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                  className="flex gap-3.5 text-left"
                >
                  <span
                    className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gini-accent"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold tracking-[-0.015em] text-neutral-950">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[14px] leading-relaxed text-neutral-600 sm:text-[15px]">
                      {item.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col items-center lg:items-start">
              <JoinBetaButton className="!rounded-full !px-7 !py-3.5 sm:!px-9 sm:!py-4" />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gini-lifestyle.png"
              alt="A woman at home wearing the Gini blood collection device on her upper arm"
              width={708}
              height={1024}
              decoding="async"
              className="mx-auto h-auto w-[min(68vw,240px)] rounded-[1.5rem] object-cover shadow-[0_24px_60px_-16px_rgba(0,0,0,0.18)] sm:w-[280px] lg:w-full lg:max-w-sm lg:rounded-[2rem]"
            />
          </div>
        </div>
      </section>

      <section
        id="contrast"
        className="relative min-h-[100svh] scroll-mt-0"
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/what-changes.png?v=5"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_35%] sm:object-[center_42%]"
          />
          <div className="contrast-vignette pointer-events-none absolute inset-0" aria-hidden />
        </div>

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
          <div className="mx-auto w-full max-w-4xl pt-8 text-center sm:pt-4">
            <h2 className="text-[clamp(2.2rem,7vw,5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-white uppercase drop-shadow-[0_2px_18px_rgba(0,0,0,0.4)]">
              What changes
            </h2>
            <p className="mx-auto mt-5 max-w-[36rem] text-[16px] leading-snug font-medium text-white/92 sm:mt-6 sm:text-[18px]">
              <span className="block">At-home testing should be convenient.</span>
              <span className="mt-3 block">It should also fit</span>
              <span className="block">how women&apos;s health works.</span>
            </p>
          </div>

          <div className="mx-auto mt-10 w-full max-w-4xl sm:mt-12">
            <div className="grid items-stretch gap-3 sm:grid-cols-[0.92fr_1.08fr] sm:gap-0">
              <div className="rounded-[24px] bg-white px-6 py-6 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.35)] sm:rounded-l-[28px] sm:rounded-r-none sm:px-8 sm:py-8">
                <p className="text-[12px] font-extrabold tracking-[0.16em] text-neutral-400 uppercase">
                  Today
                </p>
                <ul className="mt-5 divide-y divide-neutral-200/90">
                  {CONTRAST_ROWS.map(([today]) => (
                    <li
                      key={today}
                      className="py-3.5 text-[15px] leading-snug text-neutral-500 first:pt-0 last:pb-0 sm:text-[16px]"
                    >
                      {today}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 rounded-[24px] bg-white px-6 py-7 shadow-[0_28px_70px_-18px_rgba(0,0,0,0.38)] ring-1 ring-black/5 sm:-ml-1 sm:scale-[1.04] sm:rounded-[28px] sm:px-9 sm:py-9">
                <p className="text-[12px] font-extrabold tracking-[0.16em] text-gini-accent uppercase">
                  With Gini
                </p>
                <ul className="mt-5 divide-y divide-neutral-200/90">
                  {CONTRAST_ROWS.map(([, gini]) => (
                    <li
                      key={gini}
                      className="py-3.5 text-[15px] leading-snug font-semibold text-neutral-900 first:pt-0 last:pb-0 sm:text-[16px]"
                    >
                      {gini}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200/80 bg-white/60 px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Why we&apos;re building this
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-6">
            {STATS.map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.04em] text-gini-accent">
                  {stat.value}
                </p>
                <p className="mx-auto mt-2.5 max-w-[16rem] text-[15px] leading-relaxed text-neutral-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorksScroll />

      <ExpertBoard />

      <CustomerQuotes />

      <section
        id="who-its-for"
        className="scroll-mt-24 border-t border-neutral-200/80 py-14 sm:scroll-mt-28 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <h2 className="text-center text-[clamp(1.6rem,3.4vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
            If any of this sounds familiar
          </h2>
          <p className="mx-auto mt-4 max-w-[30rem] text-center text-[16px] leading-relaxed text-neutral-600">
            Gini is for women done stitching the system together themselves.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {AUDIENCE.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-neutral-200/80 bg-white/60 p-6 transition-colors hover:bg-white"
              >
                <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-neutral-950 sm:text-[16px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-neutral-600 sm:text-[15px]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-24 border-t border-neutral-200/80 py-14 sm:scroll-mt-28 sm:py-20"
      >
        <div className="mx-auto max-w-[40rem] px-5 sm:px-6">
          <h2 className="text-center text-[clamp(1.6rem,3.4vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
            What we&apos;re building
          </h2>
          <p className="mt-8 text-center text-[clamp(1.35rem,2.6vw,1.75rem)] font-semibold leading-snug tracking-[-0.03em] text-neutral-950">
            Your body is connected. Your care almost never is.
          </p>
          <p className="mt-8 text-[17px] leading-[1.7] text-neutral-700 sm:text-[18px]">
            Hormones, energy, skin, mood, and your cycle all move together - but they
            get split across specialists who each see one slice, on one day, out of
            context. So women repeat their story in every waiting room and wait years
            for a name to put on it.
          </p>
          <p className="mt-5 text-[16px] leading-[1.7] text-neutral-600 sm:text-[17px]">
            Gini starts with a blood test built for women&apos;s bodies, then connects
            your labs, cycle, symptoms, and history into one picture that holds
            together over time. It will not diagnose you. It will give the person who
            treats you something real to work from.
          </p>
        </div>
      </section>

      <section
        id="what-gini-is"
        className="scroll-mt-24 border-t border-neutral-200/80 py-14 sm:scroll-mt-28 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <h2 className="text-center text-[clamp(1.6rem,3.4vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
            What Gini is - and isn&apos;t
          </h2>
          <p className="mx-auto mt-4 max-w-[32rem] text-center text-[16px] leading-relaxed text-neutral-600">
            We&apos;d rather be clear up front. Gini helps you see patterns and walk
            into care prepared. It does not replace your clinician.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-6">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-gini-accent">
                Gini is
              </h3>
              <ul className="mt-4 space-y-3">
                {GINI_IS.map((item) => (
                  <li key={item} className="flex gap-2 text-[14px] leading-relaxed text-neutral-700">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gini-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-200/80 bg-white/40 p-6">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                Gini is not
              </h3>
              <ul className="mt-4 space-y-3">
                {GINI_IS_NOT.map((item) => (
                  <li key={item} className="flex gap-2 text-[14px] leading-relaxed text-neutral-600">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion />

      <FoundingPricing />

      <SiteFooter />
    </main>
  );
}

export default function GiniLandingPage() {
  return (
    <JoinModalProvider>
      <GiniLandingContent />
    </JoinModalProvider>
  );
}
