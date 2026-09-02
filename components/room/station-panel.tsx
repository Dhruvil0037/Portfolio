"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSectionInView } from "@/lib/hooks";
import type { SectionName } from "@/lib/types";

/**
 * Wraps a content section so it reads as a distinct "chapter" over the
 * persistent 3D backdrop: fades in on approach, fades back out on exit
 * (not `once: true`) so the room stays the focus between beats, and never
 * competes with a section that's still on screen.
 *
 * `bare` skips the card surface entirely — for a chapter that should just
 * float over the room (the opening beat) rather than block it.
 */
export default function StationPanel({
  children,
  align = "center",
  id,
  sectionName,
  bare = false,
}: {
  children: ReactNode;
  align?: "center" | "start" | "end";
  id: string;
  sectionName: SectionName;
  bare?: boolean;
}) {
  const { ref } = useSectionInView(sectionName, 0.5);
  const justify =
    align === "start"
      ? "justify-start pt-24"
      : align === "end"
      ? "justify-end pb-24"
      : "justify-center";

  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen w-full flex flex-col items-center ${justify} px-4 py-16 scroll-mt-28 pointer-events-none`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[46rem] pointer-events-auto"
      >
        {bare ? (
          children
        ) : (
          // backdrop-blur lives on a non-animated child: combining it with
          // Framer's transform on the same element blurs the text too, not
          // just what's behind it (a real Chromium compositing quirk).
          <div className="rounded-lg border border-line bg-paper px-6 py-8 sm:px-10 sm:py-10 shadow-[0_1px_40px_rgba(0,0,0,0.08)]">
            {children}
          </div>
        )}
      </motion.div>
    </section>
  );
}
