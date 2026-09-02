"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { createBrushedMetalTexture } from "../textures";
import { createTextTexture } from "../text-texture";
import type { RoomPalette } from "../theme";

export default function Monitor({
  palette,
  position,
  rotation,
  title,
  lines,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  lines: string[];
}) {
  const shellTex = useMemo(
    () => createBrushedMetalTexture(palette.metalColorDark),
    [palette.metalColorDark]
  );
  const screenTex = useMemo(
    () =>
      createTextTexture({
        width: 480,
        height: 340,
        bg: palette.inkColor,
        color: palette.accent,
        font: "600 20px IBM Plex Mono, monospace",
        fontSize: 20,
        padding: 22,
        lines: [title, "", ...lines],
      }),
    [palette.inkColor, palette.accent, title, lines]
  );

  return (
    <group position={position} rotation={rotation}>
      {/* Stand */}
      <mesh position={[0, -0.14, -0.01]}>
        <cylinderGeometry args={[0.035, 0.05, 0.02, 20]} />
        <meshStandardMaterial map={shellTex} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.09, -0.01]}>
        <cylinderGeometry args={[0.012, 0.015, 0.1, 12]} />
        <meshStandardMaterial map={shellTex} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Panel */}
      <RoundedBox args={[0.42, 0.28, 0.014]} radius={0.01} smoothness={3} castShadow>
        <meshStandardMaterial map={shellTex} roughness={0.35} metalness={0.7} />
      </RoundedBox>
      <mesh position={[0, 0, 0.008]}>
        <planeGeometry args={[0.38, 0.24]} />
        <meshBasicMaterial map={screenTex} toneMapped={false} />
      </mesh>
    </group>
  );
}
