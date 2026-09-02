"use client";

import { useMemo, useState } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { createBrushedMetalTexture } from "../textures";
import { createTextTexture } from "../text-texture";
import type { RoomPalette } from "../theme";

const SITE_URL = "https://dhruvilportfolio.vercel.app";

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
        padding: 26,
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
      <RoundedBox args={[0.34, 0.014, 0.24]} radius={0.012} smoothness={3} castShadow>
        <meshStandardMaterial map={shellTex} roughness={0.35} metalness={0.7} />
      </RoundedBox>
      {/* Keyboard deck hint */}
      <mesh position={[0, 0.008, -0.01]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.28, 0.16]} />
        <meshStandardMaterial color={palette.metalColorDark} roughness={0.8} />
      </mesh>

      {/* Screen, hinged open */}
      <group position={[0, 0.007, -0.115]} rotation={[-1.15, 0, 0]}>
        <RoundedBox args={[0.34, 0.22, 0.012]} radius={0.012} smoothness={3} position={[0, 0.11, 0]} castShadow>
          <meshStandardMaterial map={shellTex} roughness={0.35} metalness={0.7} />
        </RoundedBox>
        <mesh position={[0, 0.11, 0.007]}>
          <planeGeometry args={[0.3, 0.18]} />
          <meshBasicMaterial map={screenTex} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
