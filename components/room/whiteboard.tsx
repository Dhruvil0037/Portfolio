"use client";

import { useMemo } from "react";
import { experiencesData } from "@/lib/data";
import { createTextTexture } from "./text-texture";

const STICKY_COLORS = ["#fde68a", "#fecaca", "#bbf7d0", "#bfdbfe"];

const stickyNotes = [
  { title: "NOW", lines: ["Ship Dayzen v1", "solo — HRMS + WMS"] },
  { title: "GOAL", lines: ["Own full DevOps", "CI/CD + migrations"] },
  { title: "LEARNING", lines: ["LLM agents,", "vector search"] },
  { title: "QUOTE", lines: ['"Ship, then', 'sharpen."'] },
];

export default function Whiteboard() {
  const timelineTexture = useMemo(
    () =>
      createTextTexture({
        width: 420,
        height: 300,
        bg: "#faf9f6",
        color: "#16130f",
        font: "600 15px IBM Plex Mono, monospace",
        fontSize: 15,
        padding: 16,
        lines: experiencesData.flatMap((e) => [
          `${e.date}`,
          `${e.title}`,
          "",
        ]),
      }),
    []
  );

  const stickyTextures = useMemo(
    () =>
      stickyNotes.map((n, i) =>
        createTextTexture({
          width: 160,
          height: 160,
          bg: STICKY_COLORS[i % STICKY_COLORS.length],
          color: "#16130f",
          font: "600 14px IBM Plex Mono, monospace",
          fontSize: 14,
          padding: 14,
          lines: [n.title, "", ...n.lines],
        })
      ),
    []
  );

  return (
    <group position={[-3, 1.9, -4.85]}>
      {/* Whiteboard */}
      <mesh>
        <boxGeometry args={[1.6, 1.1, 0.03]} />
        <meshStandardMaterial color="#faf9f6" />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial map={timelineTexture} />
      </mesh>

      {/* Sticky notes cluster beside it */}
      {stickyTextures.map((tex, i) => (
        <mesh
          key={i}
          position={[1 + (i % 2) * 0.32, 0.3 - Math.floor(i / 2) * 0.32, 0.02]}
          rotation={[0, 0, ((i % 2) - 0.5) * 0.15]}
        >
          <planeGeometry args={[0.28, 0.28]} />
          <meshStandardMaterial map={tex} />
        </mesh>
      ))}
    </group>
  );
}
