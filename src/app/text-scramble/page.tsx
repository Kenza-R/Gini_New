"use client";

import { BasicDemo, CustomCharacterDemo, CustomTriggerDemo } from "@/components/ui/demo";

export default function TextScrambleDemoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-16 bg-white px-6 py-20">
      <BasicDemo />
      <CustomTriggerDemo />
      <CustomCharacterDemo />
    </main>
  );
}
