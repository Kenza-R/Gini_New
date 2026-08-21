"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Tell us your story",
    body: "Share your history, symptoms, and goals so we start with the full picture.",
    image: "/how-story.png?v=5",
    position: "center 28%",
  },
  {
    number: "02",
    title: "Test at home, on time",
    body: "Collect blood from home and retest on a cadence that tracks how you change over the month.",
    image: "/how-test.png?v=5",
    position: "center 32%",
  },
  {
    number: "03",
    title: "See the whole you",
    body: "Connect your labs, history, and patterns into one holistic read of your health.",
    image: "/how-whole.png?v=5",
    position: "center 30%",
  },
  {
    number: "04",
    title: "Personalize your insights",
    body: "Shape guidance around your biology into daily steps toward your goals.",
    image: "/how-personalize.png?v=5",
    position: "center 22%",
  },
  {
    number: "05",
    title: "Walk in prepared",
    body: "Arrive at every appointment with clarity, context, and the confidence to advocate for yourself.",
    image: "/how-prepared.png?v=5",
    position: "center 35%",
  },
] as const;

export default function HowItWorksScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(STEPS.length - 1) * 100}vw`]
  );

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative"
      style={{ height: `${STEPS.length * 100}svh` }}
      aria-label="How it works"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="flex h-full will-change-transform" style={{ x }}>
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="relative h-[100svh] w-screen min-w-[100vw] shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={step.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: step.position }}
              />
              <div className="how-vignette pointer-events-none absolute inset-0" aria-hidden />
              <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-14 sm:px-12 sm:pb-16 lg:px-16">
                <p className="text-[12px] font-extrabold tracking-[0.22em] text-white/80 uppercase">
                  How it works · {step.number}
                </p>
                <h3 className="mt-3 max-w-4xl text-[clamp(2.1rem,7vw,5.4rem)] leading-[0.92] font-extrabold tracking-[-0.045em] text-white uppercase drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed font-medium text-white/90 sm:text-[17px]">
                  {step.body}
                </p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
