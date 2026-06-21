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
      {/* ── Desktop pill background (original, unchanged) ── */}
      <motion.div
        className="hidden sm:block fixed top-6 left-1/2 h-[3.25rem] w-[36rem] rounded-full border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      />

      {/* ── Desktop nav links (original, unchanged) ── */}
      <nav className="hidden sm:flex fixed top-[1.7rem] left-1/2 -translate-x-1/2 h-[initial] py-0">
        <ul className="flex items-center gap-5 text-[0.9rem] font-medium text-gray-500">
          {links.map((link) => (
            <motion.li
              key={link.hash}
              className="h-3/4 flex items-center justify-center relative"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300",
                  { "text-gray-950 dark:text-gray-200": activeSection === link.name }
                )}
                href={link.hash}
                onClick={() => handleLinkClick(link.name)}
              >
                {link.name}
                {link.name === activeSection && (
                  <motion.span
                    className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
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
        className="sm:hidden fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 h-14 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-black/5 dark:border-white/5"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Brand */}
        <span className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
          Dhruvil<span className="text-indigo-500">.</span>
        </span>

        {/* Hamburger / close */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex flex-col gap-[5px] p-2 rounded-lg"
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-[2px] w-5 bg-gray-700 dark:bg-gray-200 rounded origin-center"
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-[2px] w-5 bg-gray-700 dark:bg-gray-200 rounded"
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block h-[2px] w-5 bg-gray-700 dark:bg-gray-200 rounded origin-center"
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
              className="sm:hidden fixed inset-0 z-[998] bg-black/30 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              className="sm:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white dark:bg-gray-950 rounded-t-3xl pt-3 pb-10 flex flex-col items-center"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              {/* Drag handle */}
              <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-gray-700 mb-6" />

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
                      "block w-full text-center text-lg font-semibold py-3 rounded-2xl mb-1 transition-colors",
                      activeSection === link.name
                        ? "bg-gray-100 text-gray-950 dark:bg-gray-800 dark:text-white"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-800/50 dark:hover:text-white"
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
