"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import Scene from "./scene";
import { useScrollProgress } from "./use-scroll-progress";
import { getPalette } from "./theme";
import { useTheme } from "@/context/theme-context";
import { stations } from "./stations";

export default function RoomStage() {
  const [interactive, setInteractive] = useState(false);
  const [dpr, setDpr] = useState(1.5);
  const progressRef = useScrollProgress();
  const { theme } = useTheme();
  const palette = useMemo(() => getPalette(theme), [theme]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setInteractive(!reducedMotion);
    setDpr(Math.min(window.devicePixelRatio || 1, 2));
  }, []);

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        shadows
        dpr={dpr}
        camera={{ position: stations[0].position, fov: stations[0].fov, near: 0.05, far: 20 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <Scene progressRef={progressRef} interactive={interactive} palette={palette} theme={theme} />
      </Canvas>
    </div>
  );
}
