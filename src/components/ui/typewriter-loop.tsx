"use client";

import { useEffect, useState } from "react";

const DEFAULT_PHRASES = ["just stress", "normal", "in your head"];

type TypewriterLoopProps = {
  phrases?: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  className?: string;
};

export function TypewriterLoop({
  phrases = DEFAULT_PHRASES,
  typeSpeed = 70,
  deleteSpeed = 45,
  pauseAfterType = 2000,
  pauseAfterDelete = 350,
  className = "",
}: TypewriterLoopProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), pauseAfterType);
    } else if (isDeleting && displayText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
      }, pauseAfterDelete);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      }, deleteSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      }, typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    phraseIndex,
    phrases,
    typeSpeed,
    deleteSpeed,
    pauseAfterType,
    pauseAfterDelete,
  ]);

  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      {displayText}
      <span
        aria-hidden
        className="typewriter-cursor ml-[1px] inline-block w-[2px] translate-y-[0.06em] bg-current align-middle"
        style={{ height: "0.92em" }}
      />
    </span>
  );
}
