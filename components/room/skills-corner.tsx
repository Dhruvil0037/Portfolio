"use client";

import { useMemo } from "react";
import { skillsData } from "@/lib/data";
import { createTextTexture } from "./text-texture";

export default function SkillsCorner() {
  const screenTexture = useMemo(
    () =>
      createTextTexture({
        width: 384,
        height: 288,
        bg: "#16130f",
        color: "#fb923c",
        font: "500 15px IBM Plex Mono, monospace",
        fontSize: 15,
        align: "left",
        padding: 16,
        lines: [
          "$ whoami --skills",
          "",
          ...Array.from({ length: 12 }, (_, i) => `> ${skillsData[i]}`),
        ],
      }),
    []
  );

  return (
    <group position={[0.7, 0, -1.7]}>
      {/* Small table */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.05, 0.5]} />
        <meshStandardMaterial color="#f4f2ec" />
      </mesh>
      <mesh position={[-0.45, 0.38, -0.18]}>
        <boxGeometry args={[0.05, 0.75, 0.05]} />
        <meshStandardMaterial color="#16130f" />
      </mesh>
      <mesh position={[0.45, 0.38, -0.18]}>
        <boxGeometry args={[0.05, 0.75, 0.05]} />
        <meshStandardMaterial color="#16130f" />
      </mesh>

      {/* Monitor */}
      <mesh position={[0, 0.9, -0.1]}>
        <boxGeometry args={[0.06, 0.1, 0.06]} />
        <meshStandardMaterial color="#16130f" />
      </mesh>
      <mesh position={[0, 1.2, -0.1]} castShadow>
        <boxGeometry args={[0.85, 0.55, 0.04]} />
        <meshStandardMaterial color="#16130f" />
      </mesh>
      <mesh position={[0, 1.2, -0.075]}>
        <planeGeometry args={[0.78, 0.48]} />
        <meshStandardMaterial map={screenTexture} emissive="#16130f" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}
