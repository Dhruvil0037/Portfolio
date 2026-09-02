"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (name: (typeof links)[number]["name"]) => {
    setActiveSection(name);
    setTimeOfLastClick(Date.now());
    setMenuOpen(false);
  };

  return (
    <header className="z-[999] relative">
      {/* ── Desktop nav background ── */}
      <motion.div
        className="hidden sm:block fixed top-6 left-1/2 md:left-3/4 h-[3.25rem] w-[min(36rem,90vw)] md:w-[26rem] rounded border border-line bg-paper/85 shadow-sm backdrop-blur-[0.5rem]"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      />

      {/* ── Desktop nav links ── */}
      <nav className="hidden sm:flex fixed top-[1.7rem] left-1/2 md:left-3/4 -translate-x-1/2 h-[initial] py-0">
        <ul className="flex items-center gap-5 font-mono text-[0.85rem] text-ink/60">
          {links.map((link) => (
            <motion.li
              key={link.hash}
              className="h-3/4 flex items-center justify-center relative"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 hover:text-ink transition relative",
                  { "text-ink": activeSection === link.name }
                )}
                href={link.hash}
                onClick={() => handleLinkClick(link.name)}
              >
                {link.name}
                {link.name === activeSection && (
                  <motion.span
                    className="bg-accent h-[2px] absolute bottom-1.5 left-3 right-3"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* ── Mobile top bar ── */}
      <motion.div
        className="sm:hidden fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 h-14 bg-paper/85 backdrop-blur-md border-b border-line"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Brand */}
        <span className="font-display text-base font-semibold text-ink tracking-tight">
          Dhruvil<span className="text-accent">.</span>
        </span>

        {/* Hamburger / close */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex flex-col gap-[5px] p-2 rounded"
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-[2px] w-5 bg-ink origin-center"
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-[2px] w-5 bg-ink"
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block h-[2px] w-5 bg-ink origin-center"
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </motion.div>

      {/* ── Mobile menu: bottom-to-top slide sheet ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="sm:hidden fixed inset-0 z-[998] bg-ink/30 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              className="sm:hidden fixed bottom-0 left-0 right-0 z-[999] bg-paper border-t border-line pt-3 pb-10 flex flex-col items-center"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              {/* Drag handle */}
              <div className="w-10 h-1 bg-line mb-6" />

              {links.map((link, i) => (
                <motion.div
                  key={link.hash}
                  className="w-full px-6"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.hash}
                    onClick={() => handleLinkClick(link.name)}
                    className={clsx(
                      "block w-full text-center font-mono text-base py-3 mb-1 transition-colors",
                      activeSection === link.name
                        ? "text-accent"
                        : "text-ink/60 hover:text-ink"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
