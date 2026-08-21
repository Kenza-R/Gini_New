"use client";

import { useEffect, useState } from "react";
import { useJoinModal } from "@/components/JoinWaitlistModal";
import { GlassButton, GlassEffect } from "@/components/ui/liquid-glass";
import { NAV_SECTIONS } from "@/lib/nav-sections";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-4" aria-hidden>
      <span
        className={[
          "absolute left-0 h-[1.5px] w-4 rounded-full bg-neutral-800 transition-all duration-300",
          open ? "top-[6px] rotate-45" : "top-0",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 top-[6px] h-[1.5px] w-4 rounded-full bg-neutral-800 transition-all duration-300",
          open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 h-[1.5px] w-4 rounded-full bg-neutral-800 transition-all duration-300",
          open ? "top-[6px] -rotate-45" : "top-[12px]",
        ].join(" ")}
      />
    </span>
  );
}

export default function GlassNav() {
  const { openJoinModal } = useJoinModal();
  const [minimized, setMinimized] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setMinimized(window.scrollY > 48);
    };

    const mq = window.matchMedia("(max-width: 1023px)");
    const onResize = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setMenuOpen(false);
    };

    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const showDesktopLinks = !minimized && !isMobile;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-5">
        <nav
          aria-label="Primary"
          className={[
            "pointer-events-auto transition-[width,max-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            showDesktopLinks
              ? "w-full max-w-[1080px]"
              : "w-auto max-w-[min(92vw,420px)]",
          ].join(" ")}
        >
          <GlassEffect
            className={[
              "items-center justify-between gap-3 rounded-full sm:gap-4",
              "transition-[padding,gap] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              showDesktopLinks
                ? "px-3 py-2.5 sm:px-4 sm:py-2.5"
                : "px-3 py-2 sm:px-3.5 sm:py-2",
            ].join(" ")}
            contentClassName="flex w-full items-center justify-between gap-3 sm:gap-4"
            style={{ cursor: "default", width: "100%" }}
          >
            <a
              href="#top"
              className="flex shrink-0 items-center pl-1 sm:pl-1.5"
              aria-label="Gini home"
              onClick={() => setMenuOpen(false)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gini-wordmark.png?v=4"
                alt="Gini"
                className={[
                  "w-auto bg-transparent object-contain object-left transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  showDesktopLinks ? "h-8 sm:h-9" : "h-7 sm:h-8",
                ].join(" ")}
              />
            </a>

            <div
              className={[
                "hidden min-w-0 items-center justify-center overflow-hidden lg:flex",
                "transition-[max-width,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                showDesktopLinks
                  ? "max-w-[820px] flex-1 opacity-100"
                  : "pointer-events-none max-w-0 opacity-0",
              ].join(" ")}
              aria-hidden={!showDesktopLinks}
            >
              <ul className="flex items-center gap-0.5 whitespace-nowrap px-2">
                {NAV_SECTIONS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      tabIndex={showDesktopLinks ? undefined : -1}
                      className="rounded-full px-2.5 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-white transition-colors hover:text-white/80"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-black/5 lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <MenuIcon open={menuOpen} />
              </button>

              <GlassButton
                className="shrink-0 !rounded-full !px-3.5 !py-2 hover:!px-4 hover:!py-2.5 sm:!px-5 sm:!py-2.5"
                contentClassName={[
                  "text-[12px] font-semibold tracking-[-0.01em] sm:text-[13px]",
                  showDesktopLinks ? "text-neutral-950" : "text-[#f4a24a]",
                ].join(" ")}
                onClick={() => {
                  setMenuOpen(false);
                  openJoinModal();
                }}
              >
                Join waitlist
              </GlassButton>
            </div>
          </GlassEffect>
        </nav>
      </header>

      {menuOpen ? (
        <div
          id="mobile-nav-menu"
          className="fixed inset-0 z-40 lg:hidden"
          aria-hidden={!menuOpen}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="pointer-events-none absolute inset-x-4 top-[4.75rem] sm:top-[5.25rem]">
            <GlassEffect
              className="pointer-events-auto rounded-3xl px-2 py-2"
              contentClassName="flex flex-col"
              style={{ cursor: "default", width: "100%" }}
            >
              <ul className="flex flex-col">
                {NAV_SECTIONS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block rounded-2xl px-4 py-3.5 text-[15px] font-medium tracking-[-0.01em] text-neutral-800 transition-colors hover:bg-black/[0.04] hover:text-black"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </GlassEffect>
          </div>
        </div>
      ) : null}
    </>
  );
}
