"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="fixed bottom-5 right-5 bg-paper/90 text-ink w-[3rem] h-[3rem] backdrop-blur-[0.5rem] borderInk rounded flex items-center justify-center hover:border-accent hover:text-accent hover:scale-[1.08] active:scale-95 transition-all"
      onClick={toggleTheme}
    >
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}
