"use client";

import { useMemo } from "react";
import { createGrainTexture } from "./textures";
import type { RoomPalette } from "./theme";

export default function RoomShell({ palette }: { palette: RoomPalette }) {
  const wallTex = useMemo(
    () => createGrainTexture(palette.wallColor, { contrast: 6 }),
    [palette.wallColor]
  );
  const floorTex = useMemo(
    () => createGrainTexture(palette.floorColor, { contrast: 10 }),
    [palette.floorColor]
  );

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial map={floorTex} roughness={0.95} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.6, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial map={wallTex} roughness={1} />
      </mesh>
      <mesh position={[0, 1.8, -3.2]}>
        <planeGeometry args={[10, 3.6]} />
        <meshStandardMaterial map={wallTex} roughness={1} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-4, 1.8, 0]}>
        <planeGeometry args={[8, 3.6]} />
        <meshStandardMaterial map={wallTex} roughness={1} />
      </mesh>
    </group>
  );
}
