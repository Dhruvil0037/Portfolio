"use client";

import { useMemo } from "react";
import { createTextTexture } from "../text-texture";
import type { RoomPalette } from "../theme";

export default function Frame({
  palette,
  position,
  rotation,
  size = [0.34, 0.24],
  lines,
  accentBorder = false,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
  lines: string[];
  accentBorder?: boolean;
}) {
  const tex = useMemo(
    () =>
      createTextTexture({
        width: 420,
        height: 300,
        bg: palette.paperColor,
        color: palette.inkColor,
        font: "italic 600 32px Fraunces, serif",
        fontSize: 32,
        align: "center",
        padding: 26,
        lines,
      }),
    [palette.paperColor, palette.inkColor, lines]
  );

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[size[0] + 0.03, size[1] + 0.03, 0.015]} />
        <meshStandardMaterial
          color={accentBorder ? palette.accent : palette.metalColorDark}
          roughness={0.6}
        />
      </mesh>
      <mesh position={[0, 0, 0.009]}>
        <planeGeometry args={size} />
        <meshStandardMaterial map={tex} roughness={0.9} />
      </mesh>
    </group>
  );
}
