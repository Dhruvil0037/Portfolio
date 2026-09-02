"use client";

import { useMemo } from "react";
import { projectsData } from "@/lib/data";
import { createTextTexture } from "./text-texture";

const positions: [number, number][] = [
  [-0.55, 0.55],
  [0.5, 0.5],
  [-0.5, -0.3],
  [0.55, -0.35],
  [0, 0.05],
];

export default function Corkboard() {
  const cards = useMemo(
    () =>
      projectsData.slice(0, 5).map((p) =>
        createTextTexture({
          width: 220,
          height: 160,
          bg: "#faf9f6",
          color: "#16130f",
          font: "600 16px Fraunces, serif",
          fontSize: 16,
          lines: [p.title, "", ...(p.tags.slice(0, 2).map((t) => `#${t}`))],
          padding: 14,
        })
      ),
    []
  );

  return (
    <group position={[4.85, 1.7, -1]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Board */}
      <mesh>
        <boxGeometry args={[2.4, 1.7, 0.04]} />
        <meshStandardMaterial color="#8a6d3b" roughness={1} />
      </mesh>

      {cards.map((tex, i) => {
        const [x, y] = positions[i] ?? [0, 0];
        return (
          <group key={i} position={[x, y, 0.03]} rotation={[0, 0, ((i % 2) - 0.5) * 0.08]}>
            <mesh>
              <planeGeometry args={[0.62, 0.46]} />
              <meshStandardMaterial map={tex} />
            </mesh>
            <mesh position={[0, 0.2, 0.005]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="#c2410c" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
