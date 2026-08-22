"use client";

import GlassNav from "@/components/GlassNav";
import SiteFooter from "@/components/SiteFooter";
import { JoinModalProvider } from "@/components/JoinWaitlistModal";
import { GlassFilter } from "@/components/ui/liquid-glass";

export default function TeamPage() {
  return (
    <JoinModalProvider>
      <main className="min-h-screen bg-gini-surface text-neutral-950">
        <GlassFilter />
        <GlassNav />
        <section className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:px-6 sm:pt-36 sm:pb-32">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
            About us
          </p>
          <h1 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em]">
            Team
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.55] text-neutral-600 sm:text-[18px]">
            We&apos;re building Gini in service of women&apos;s health. This page
            is where the team will live.
          </p>
        </section>
        <SiteFooter />
      </main>
    </JoinModalProvider>
  );
}
