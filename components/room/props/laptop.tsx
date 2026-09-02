"use client";

import { useMemo, useState } from "react";
import { RoundedBox } from "@react-three/drei";
import { createBrushedMetalTexture } from "../textures";
import { createTextTexture } from "../text-texture";
import type { RoomPalette } from "../theme";

const SITE_URL = "https://dhruvilportfolio.vercel.app";

// Real-ish laptop proportions (13" body): ~0.30 wide x 0.21 deep base,
// screen the same width, ~0.19 tall, thin bezel, opened to a natural angle.
export default function Laptop({
  palette,
  position,
  rotation,
  scale = 1,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const shellTex = useMemo(
    () => createBrushedMetalTexture(palette.metalColor),
    [palette.metalColor]
  );
  const screenTex = useMemo(
    () =>
      createTextTexture({
        width: 480,
        height: 300,
        bg: palette.inkColor,
        color: palette.paperColor,
        font: "600 22px Fraunces, serif",
        fontSize: 22,
        padding: 24,
        lines: [
          "dhruvilportfolio.vercel.app",
          "",
          "Hello, I'm Dhruvil.",
          "Senior Full Stack",
          "Developer",
          "",
          "-> view live site",
        ],
      }),
    [palette.inkColor, palette.paperColor]
  );

  const W = 0.3;
  const D = 0.21;
  const baseH = 0.01;

  return (
    <group
      position={position}
      rotation={rotation}
      scale={hovered ? scale * 1.02 : scale}
      onClick={(e) => {
        e.stopPropagation();
        window.open(SITE_URL, "_blank");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Base */}
      <RoundedBox args={[W, baseH, D]} radius={0.006} smoothness={3} position={[0, baseH / 2, 0]} castShadow>
        <meshStandardMaterial map={shellTex} roughness={0.35} metalness={0.65} />
      </RoundedBox>
      {/* Keyboard deck */}
      <mesh position={[0, baseH + 0.001, -0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - 0.02, D - 0.05]} />
        <meshStandardMaterial color={palette.metalColorDark} roughness={0.75} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, baseH + 0.0012, 0.07]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W * 0.4, D * 0.28]} />
        <meshStandardMaterial color={palette.metalColor} roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Screen, hinged at the back edge */}
      <group position={[0, baseH, -D / 2]} rotation={[-1.22, 0, 0]}>
        <RoundedBox
          args={[W, D * 0.92, 0.008]}
          radius={0.006}
          smoothness={3}
          position={[0, (D * 0.92) / 2, 0]}
          castShadow
        >
          <meshStandardMaterial map={shellTex} roughness={0.35} metalness={0.65} />
        </RoundedBox>
        {/* Bezel + display */}
        <mesh position={[0, (D * 0.92) / 2, 0.0045]}>
          <planeGeometry args={[W - 0.014, D * 0.92 - 0.014]} />
          <meshBasicMaterial map={screenTex} toneMapped={false} />
        </mesh>
        {/* Camera notch */}
        <mesh position={[0, D * 0.92 - 0.006, 0.0046]}>
          <circleGeometry args={[0.0018, 8]} />
          <meshStandardMaterial color={palette.metalColorDark} />
        </mesh>
      </group>
    </group>
  );
}
