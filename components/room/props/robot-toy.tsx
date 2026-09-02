"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RoomPalette } from "../theme";

export default function RobotToy({
  palette,
  position,
}: {
  palette: RoomPalette;
  position: [number, number, number];
}) {
  const group = useRef<THREE.Group>(null);
  const eye = useRef<THREE.Mesh>(null);
  const [poked, setPoked] = useState(false);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * 1.4) * 0.008;
    group.current.rotation.y = Math.sin(t * 0.5) * 0.25 + (poked ? Math.sin(t * 8) * 0.3 : 0);
  });

  return (
    <group
      ref={group}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setPoked(true);
        setTimeout(() => setPoked(false), 700);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {/* Body */}
      <mesh position={[0, 0.035, 0]} castShadow>
        <capsuleGeometry args={[0.028, 0.02, 4, 12]} />
        <meshStandardMaterial color={palette.paperColor} roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <sphereGeometry args={[0.032, 20, 20]} />
        <meshStandardMaterial color={palette.paperColor} roughness={0.35} metalness={0.2} />
      </mesh>
      {/* Eye */}
      <mesh ref={eye} position={[0, 0.082, 0.03]}>
        <circleGeometry args={[0.012, 20]} />
        <meshStandardMaterial
          color={palette.accent}
          emissive={palette.accent}
          emissiveIntensity={poked ? 2.2 : 1.2}
          toneMapped={false}
        />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 0.118, 0]}>
        <cylinderGeometry args={[0.002, 0.002, 0.025, 6]} />
        <meshStandardMaterial color={palette.metalColorDark} />
      </mesh>
      <mesh position={[0, 0.132, 0]}>
        <sphereGeometry args={[0.006, 10, 10]} />
        <meshStandardMaterial
          color={palette.accent}
          emissive={palette.accent}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
