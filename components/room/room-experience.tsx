"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Scene from "./scene";
import { useScrollProgress } from "./use-scroll-progress";

export default function RoomExperience() {
  const [enabled, setEnabled] = useState(false);
  const progressRef = useScrollProgress();

  useEffect(() => {
    const isWide = window.matchMedia("(min-width: 1024px)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(isWide && !reducedMotion);
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 -z-20" aria-hidden="true">
      <Canvas
        shadows
        camera={{ position: [0, 1.6, 5.2], fov: 45, near: 0.1, far: 30 }}
        gl={{ antialias: true }}
      >
        <Scene progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
