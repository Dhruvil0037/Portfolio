"use client";

import type { RoomPalette } from "../theme";

export default function Plant({
  palette,
  position,
}: {
  palette: RoomPalette;
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.07, 0.055, 0.09, 16]} />
        <meshStandardMaterial color={palette.deskColorDark} roughness={0.8} />
      </mesh>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.03, 0.13 + (i % 2) * 0.04, Math.sin(angle) * 0.03]}
            rotation={[Math.sin(angle) * 0.3, angle, Math.cos(angle) * 0.3]}
            castShadow
          >
            <coneGeometry args={[0.025, 0.16 + (i % 3) * 0.03, 6]} />
            <meshStandardMaterial color="#4a6b4a" roughness={0.7} />
          </mesh>
        );
      })}
    </group>
  );
}
