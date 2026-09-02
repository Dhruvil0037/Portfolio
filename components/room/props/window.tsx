"use client";

import { useMemo } from "react";
import { createSkyTexture } from "../textures";
import type { RoomPalette } from "../theme";

export default function BalconyWindow({
  palette,
  position,
  theme,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  theme: "light" | "dark";
}) {
  const sky = useMemo(
    () =>
      theme === "dark"
        ? createSkyTexture("#1a1830", "#0c0b09")
        : createSkyTexture("#bcd6e8", "#fbe8cf"),
    [theme]
  );

  return (
    <group position={position}>
      {/* Sky plane, behind the glass */}
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[2.4, 1.8]} />
        <meshBasicMaterial map={sky} toneMapped={false} />
      </mesh>

      {/* City silhouette, kept low so it reads as a skyline, not bars */}
      {Array.from({ length: 9 }).map((_, i) => {
        const w = 0.1 + ((i * 13) % 5) / 60;
        const h = 0.12 + ((i * 29) % 10) / 45;
        const x = -1.05 + i * 0.26;
        return (
          <mesh key={i} position={[x, -0.87 + h / 2, -0.06]}>
            <boxGeometry args={[w, h, 0.02]} />
            <meshBasicMaterial
              color={theme === "dark" ? "#050508" : "#5a6472"}
              toneMapped={false}
            />
          </mesh>
        );
      })}

      {/* Glass panes */}
      <mesh>
        <planeGeometry args={[2.3, 1.7]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.08}
          roughness={0.05}
          transmission={0.9}
          color="#ffffff"
        />
      </mesh>

      {/* Mullions */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[2.36, 0.012, 0.012]} />
        <meshStandardMaterial color={palette.metalColorDark} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[0.012, 1.76, 0.012]} />
        <meshStandardMaterial color={palette.metalColorDark} />
      </mesh>
      <mesh position={[-0.65, 0, 0.011]}>
        <boxGeometry args={[0.01, 1.76, 0.01]} />
        <meshStandardMaterial color={palette.metalColorDark} />
      </mesh>
      <mesh position={[0.65, 0, 0.011]}>
        <boxGeometry args={[0.01, 1.76, 0.01]} />
        <meshStandardMaterial color={palette.metalColorDark} />
      </mesh>
    </group>
  );
}
