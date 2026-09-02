"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { createGrainTexture, createBrushedMetalTexture } from "../textures";
import { createTextTexture } from "../text-texture";
import type { RoomPalette } from "../theme";

export function Keyboard({
  palette,
  position,
  rotation,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const cols = 12;
  const rows = 4;
  const keys = useMemo(() => {
    const out: [number, number][] = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) out.push([c, r]);
    return out;
  }, []);

  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[0.26, 0.012, 0.1]} radius={0.006} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color={palette.metalColorDark} roughness={0.6} />
      </RoundedBox>
      {keys.map(([c, r], i) => (
        <RoundedBox
          key={i}
          args={[0.017, 0.008, 0.017]}
          radius={0.002}
          position={[-0.11 + c * 0.02, 0.009, -0.035 + r * 0.022]}
        >
          <meshStandardMaterial color={palette.paperColor} roughness={0.5} />
        </RoundedBox>
      ))}
    </group>
  );
}

export function ComputerMouse({
  palette,
  position,
  rotation,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <RoundedBox
      args={[0.05, 0.025, 0.08]}
      radius={0.02}
      smoothness={4}
      position={position}
      rotation={rotation}
      castShadow
    >
      <meshStandardMaterial color={palette.metalColorDark} roughness={0.4} />
    </RoundedBox>
  );
}

export function Notebook({
  palette,
  position,
  rotation,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const cover = useMemo(
    () => createGrainTexture(palette.accent, { contrast: 10 }),
    [palette.accent]
  );
  const pages = useMemo(
    () => createGrainTexture(palette.paperColor, { contrast: 6 }),
    [palette.paperColor]
  );
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[0.16, 0.014, 0.22]} radius={0.006} castShadow>
        <meshStandardMaterial map={pages} roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[0.165, 0.004, 0.225]} radius={0.006} position={[0, 0.009, 0]} castShadow>
        <meshStandardMaterial map={cover} roughness={0.8} />
      </RoundedBox>
      {/* Pen */}
      <mesh position={[0.11, 0.014, 0.02]} rotation={[0, 0, Math.PI / 2 - 0.3]}>
        <cylinderGeometry args={[0.004, 0.004, 0.14, 8]} />
        <meshStandardMaterial color={palette.inkColor} roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

export function Tablet({
  palette,
  position,
  rotation,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const shellTex = useMemo(
    () => createBrushedMetalTexture(palette.metalColor),
    [palette.metalColor]
  );
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[0.16, 0.01, 0.22]} radius={0.012} smoothness={3} castShadow>
        <meshStandardMaterial map={shellTex} roughness={0.3} metalness={0.6} />
      </RoundedBox>
      <mesh position={[0, 0.0055, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.14, 0.2]} />
        <meshBasicMaterial color={palette.inkColor} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function DeskLamp({
  palette,
  position,
}: {
  palette: RoomPalette;
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.045, 0.06, 0.02, 20]} />
        <meshStandardMaterial color={palette.metalColorDark} roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.19, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.008, 0.008, 0.36, 8]} />
        <meshStandardMaterial color={palette.metalColorDark} roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0.15, 0.35, 0]} rotation={[0, 0, 1.15]}>
        <cylinderGeometry args={[0.05, 0.07, 0.1, 20, 1, true]} />
        <meshStandardMaterial
          color={palette.screenGlow}
          emissive={palette.screenGlow}
          emissiveIntensity={1.6}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <pointLight
        position={[0.17, 0.32, 0]}
        intensity={palette.keyIntensity * 0.6}
        color={palette.screenGlow}
        distance={1.1}
      />
    </group>
  );
}

export function Mug({
  palette,
  position,
}: {
  palette: RoomPalette;
  position: [number, number, number];
}) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[0.032, 0.028, 0.05, 16]} />
      <meshStandardMaterial color={palette.paperColor} roughness={0.4} />
    </mesh>
  );
}
