'use client';

import { type JSX, useEffect, useRef, useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
  /** Keeps the line from wrapping during scramble by reserving final-text width */
  singleLine?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function scrambleText(text: string, characterSet: string) {
  return text
    .split('')
    .map((char) =>
      char === ' '
        ? ' '
        : characterSet[Math.floor(Math.random() * characterSet.length)]
    )
    .join('');
}

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = 'p',
  trigger = true,
  singleLine = false,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  );
  const [displayText, setDisplayText] = useState(() =>
    scrambleText(children, characterSet)
  );
  const isAnimatingRef = useRef(false);
  const text = children;

  useEffect(() => {
    if (!trigger) return;

    const scramble = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const steps = duration / speed;
      let step = 0;

      const interval = setInterval(() => {
        let scrambled = '';
        const progress = step / steps;

        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            scrambled += ' ';
            continue;
          }

          if (progress * text.length > i) {
            scrambled += text[i];
          } else {
            scrambled +=
              characterSet[Math.floor(Math.random() * characterSet.length)];
          }
        }

        setDisplayText(scrambled);
        step++;

        if (step > steps) {
          clearInterval(interval);
          setDisplayText(text);
          isAnimatingRef.current = false;
          onScrambleComplete?.();
        }
      }, speed * 1000);

      return interval;
    };

    const interval = scramble();
    return () => {
      if (interval) clearInterval(interval);
      isAnimatingRef.current = false;
    };
  }, [trigger, text, duration, speed, characterSet, onScrambleComplete]);

  const textNode = singleLine ? (
    <span className="relative inline-block whitespace-nowrap">
      <span className="invisible block whitespace-nowrap" aria-hidden>
        {text}
      </span>
      <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
        {displayText}
      </span>
    </span>
  ) : (
    displayText
  );

  return (
    <MotionComponent
      className={
        singleLine
          ? `inline-block whitespace-nowrap ${className ?? ''}`
          : className
      }
      {...props}
    >
      {textNode}
    </MotionComponent>
  );
}
