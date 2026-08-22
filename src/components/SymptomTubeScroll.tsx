"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const PICTURES = [
  {
    id: "hair-loss",
    image: "/symptoms/hair-loss.png?v=1",
    position: "center 28%",
  },
  {
    id: "fatigue",
    image: "/symptoms/fatigue.png?v=1",
    position: "center 18%",
  },
  {
    id: "cravings",
    image: "/symptoms/cravings.png?v=1",
    position: "center 38%",
  },
  {
    id: "pimples",
    image: "/symptoms/breakouts.png?v=1",
    position: "center 30%",
  },
  {
    id: "periods",
    image: "/symptoms/periods.png?v=1",
    position: "center 36%",
  },
] as const;

const VIGNETTES = [
  { id: "hair-loss", label: "Hair loss", tone: "bg-[#faf7f1]" },
  { id: "fatigue", label: "Fatigue", tone: "bg-white" },
  { id: "pimples", label: "Pimples", tone: "bg-[#f4eee6]" },
  { id: "periods", label: "Painful period", tone: "bg-[#eef3f6]" },
  { id: "cravings", label: "Cravings", tone: "bg-[#f7f1e8]" },
  { id: "sleep", label: "Poor sleep", tone: "bg-white" },
  { id: "weight", label: "Weight gain", tone: "bg-[#faf7f1]" },
  { id: "fog", label: "Brain fog", tone: "bg-[#eef3f6]" },
  { id: "back", label: "Back pain", tone: "bg-[#f4eee6]" },
  { id: "cycles", label: "Irregular cycles", tone: "bg-[#f7f1e8]" },
] as const;

type StageSize = {
  width: number;
  height: number;
  card: number;
  gap: number;
  tubeW: number;
  tubeH: number;
  tubeTop: number;
  tubeRight: number;
};

function measureStage(el: HTMLElement): StageSize {
  const width = el.clientWidth;
  const height = el.clientHeight;
  const tubeTop = height * 0.055;
  const tubeH = height * 0.88;
  const tubeW = tubeH * 0.201;
  const tubeRight = Math.max(20, width * 0.045);
  const card = Math.min(height * 0.2, width * 0.155, 210);
  const gap = card * 0.08;
  return { width, height, card, gap, tubeW, tubeH, tubeTop, tubeRight };
}

export default function SymptomTubeScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(1);
  const [stage, setStage] = useState<StageSize>({
    width: 1280,
    height: 800,
    card: 160,
    gap: 13,
    tubeW: 140,
    tubeH: 700,
    tubeTop: 44,
    tubeRight: 48,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(PICTURES.length - 1) * (stage.card + stage.gap)]
  );

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStage(measureStage(el));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!Number.isFinite(value)) return;
    const progress = Math.min(1, Math.max(0, value));
    const next = 1 + Math.round(progress * (VIGNETTES.length - 1));
    setRevealed(Math.min(VIGNETTES.length, Math.max(1, next)));
  });

  const visible = VIGNETTES.slice(0, revealed);
  const pictureTop = stage.tubeTop + 0.72 * stage.tubeH;
  const padLeft =
    stage.width - stage.tubeRight - stage.tubeW / 2 - stage.card / 2;

  return (
    <section
      id="symptoms"
      ref={containerRef}
      className="relative bg-[#7b95a9]"
      style={{ height: `${PICTURES.length * 100}svh` }}
      aria-label="Symptoms Gini is built to read"
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] overflow-hidden bg-[#7b95a9]"
      >
        <div
          className="absolute top-[max(4.5rem,8svh)] left-0 z-20 px-5 sm:px-10 lg:px-14"
          style={{
            right: stage.tubeRight + stage.tubeW + 16,
          }}
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#1e3345]/55 uppercase sm:text-[12px]">
            The signals
          </p>
          <h2 className="font-display mt-2 max-w-sm text-[clamp(1.25rem,2.4vw+0.6rem,2.05rem)] font-medium leading-[1.12] tracking-[-0.02em] text-[#1e3345]">
            What your body has been trying to say
          </h2>

          <ul className="mt-4 grid w-fit grid-cols-3 items-start gap-x-2.5 gap-y-2 sm:mt-5 sm:gap-x-4 sm:gap-y-3">
            {visible.map((item) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, scale: 0.86, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 22,
                  mass: 0.7,
                }}
                className={`${item.tone} quote-vignette relative w-fit rounded-[0.7rem] px-2 py-1 shadow-[0_10px_24px_rgba(20,20,20,0.1)] sm:px-3 sm:py-1.5`}
              >
                <p className="font-body whitespace-nowrap text-[clamp(0.92rem,1.3vw,1.2rem)] leading-none font-normal text-neutral-800">
                  {item.label}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="absolute left-0 z-[1] flex -translate-y-1/2 will-change-transform"
          style={{
            x,
            top: pictureTop,
            gap: stage.gap,
            paddingLeft: Math.max(0, padLeft),
          }}
        >
          {PICTURES.map((picture) => (
            <div
              key={picture.id}
              className="relative shrink-0 overflow-hidden rounded-[1.05rem] shadow-[0_14px_40px_rgba(0,0,0,0.32)]"
              style={{ width: stage.card, height: stage.card }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={picture.image}
                alt=""
                className="absolute inset-0 h-full w-full max-w-none object-cover"
                style={{ objectPosition: picture.position }}
              />
            </div>
          ))}
        </motion.div>

        <div
          className="pointer-events-none absolute z-10"
          style={{
            width: stage.tubeW,
            height: stage.tubeH,
            top: stage.tubeTop,
            right: stage.tubeRight,
          }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/vacutainer-pink.png?v=2"
            alt=""
            className="h-full w-full max-w-none object-contain object-top"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gini-wordmark.png?v=4"
            alt=""
            className="absolute top-[32%] left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-90 object-contain"
            style={{
              width: stage.tubeW * 1.6,
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
