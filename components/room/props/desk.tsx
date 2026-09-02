"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { createWoodTexture } from "../textures";
import type { RoomPalette } from "../theme";

export default function Desk({ palette }: { palette: RoomPalette }) {
  const topTex = useMemo(
    () => createWoodTexture(palette.deskColor, palette.deskColorDark),
    [palette.deskColor, palette.deskColorDark]
  );

  return (
    <group>
      {/* Top surface */}
      <RoundedBox args={[2.3, 0.06, 1.05]} radius={0.02} smoothness={2} position={[0, 0.9, 0]} castShadow receiveShadow>
        <meshStandardMaterial map={topTex} roughness={0.55} metalness={0.05} />
      </RoundedBox>

      {/* Apron */}
      <RoundedBox args={[2.2, 0.16, 0.03]} radius={0.01} position={[0, 0.78, 0.5]} castShadow>
        <meshStandardMaterial color={palette.deskColorDark} roughness={0.7} />
      </RoundedBox>

      {/* Legs */}
      {[
        [-1.05, 0.08],
        [1.05, 0.08],
        [-1.05, -0.44],
        [1.05, -0.44],
      ].map(([x, z], i) => (
        <RoundedBox
          key={i}
          args={[0.06, 0.88, 0.06]}
          radius={0.015}
          position={[x, 0.44, z]}
          castShadow
        >
          <meshStandardMaterial color={palette.deskColorDark} roughness={0.6} />
        </RoundedBox>
      ))}

      {/* Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0.9]} receiveShadow>
        <circleGeometry args={[1.5, 48]} />
        <meshStandardMaterial color={palette.accent} roughness={1} opacity={0.35} transparent />
      </mesh>
    </group>
  );
}
