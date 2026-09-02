"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { createFabricTexture } from "../textures";
import type { RoomPalette } from "../theme";

export default function Chair({
  palette,
  position,
  rotation,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const fabric = useMemo(
    () => createFabricTexture(palette.inkColor, palette.accent),
    [palette.inkColor, palette.accent]
  );

  return (
    <group position={position} rotation={rotation}>
      {/* Seat */}
      <RoundedBox args={[0.42, 0.06, 0.42]} radius={0.03} position={[0, 0.46, 0]} castShadow>
        <meshStandardMaterial map={fabric} roughness={0.85} />
      </RoundedBox>
      {/* Backrest */}
      <RoundedBox args={[0.4, 0.5, 0.06]} radius={0.05} position={[0, 0.76, -0.19]} rotation={[-0.15, 0, 0]} castShadow>
        <meshStandardMaterial map={fabric} roughness={0.85} />
      </RoundedBox>
      {/* Central column */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.4, 12]} />
        <meshStandardMaterial color={palette.metalColorDark} roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Base star */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, 0.04, 0]} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
          <boxGeometry args={[0.32, 0.02, 0.03]} />
          <meshStandardMaterial color={palette.metalColorDark} roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
