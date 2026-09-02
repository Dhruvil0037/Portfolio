import React from "react";

export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center font-mono text-ink/50 border-t border-line pt-6 max-w-[42rem] mx-auto">
      <small className="mb-2 block text-xs">
        &copy; 2026 Dhruvil. All rights reserved.
      </small>
      <p className="text-xs">
        <span className="text-ink/70">About this website:</span> built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion, React Email & Resend, Vercel hosting.
      </p>
    </footer>
  );
}
