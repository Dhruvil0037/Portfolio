"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import BattlestationScene from "./battlestation-scene";
import { useScrollProgress } from "./use-scroll-progress";

export default function RoomStage() {
  const [interactive, setInteractive] = useState(false);
  const [dpr, setDpr] = useState(1.5);
  const progressRef = useScrollProgress();

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setInteractive(isDesktop && !reducedMotion);
    setDpr(Math.min(window.devicePixelRatio || 1, isDesktop ? 2 : 1.5));
  }, []);

  return (
    <div className="h-[55vh] w-full md:sticky md:top-0 md:h-screen md:w-1/2">
      <Canvas
        shadows
        dpr={dpr}
        camera={{ position: [1.9, 1.25, 1.75], fov: 38, near: 0.05, far: 20 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <BattlestationScene progressRef={progressRef} interactive={interactive} />
      </Canvas>
    </div>
  );
}
