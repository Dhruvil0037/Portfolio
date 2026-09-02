"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createWoodTexture, createBookSpineTexture } from "../textures";
import type { RoomPalette } from "../theme";

const BOOK_HUES = [
  "#c2410c",
  "#3a4a5c",
  "#5b6b53",
  "#7a4a6a",
  "#8a6d3b",
  "#4a5568",
  "#9a3324",
  "#2f5d50",
];

function Book({
  title,
  color,
  x,
  shelfY,
  depth,
  height,
}: {
  title: string;
  color: string;
  x: number;
  shelfY: number;
  depth: number;
  height: number;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [pulled, setPulled] = useState(false);

  const spine = useMemo(
    () => createBookSpineTexture({ title, color, height: 220 }),
    [title, color]
  );
  const materials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color, roughness: 0.8 }),
      new THREE.MeshStandardMaterial({ map: spine, roughness: 0.7 }),
      new THREE.MeshStandardMaterial({ color, roughness: 0.8 }),
      new THREE.MeshStandardMaterial({ color, roughness: 0.8 }),
      new THREE.MeshStandardMaterial({ color: "#f0ead6", roughness: 0.9 }),
      new THREE.MeshStandardMaterial({ color: "#f0ead6", roughness: 0.9 }),
    ],
    [color, spine]
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetZ = pulled ? 0.06 : hovered ? 0.025 : 0;
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 8, delta);
    const targetRot = pulled ? -0.25 : hovered ? -0.08 : 0;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRot, 8, delta);
  });

  return (
    <group ref={group} position={[x, shelfY + height / 2, 0]}>
      <mesh
        material={materials}
        castShadow
        onClick={(e) => {
          e.stopPropagation();
          setPulled((p) => !p);
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
        <boxGeometry args={[0.03, height, depth]} />
      </mesh>
    </group>
  );
}

export default function Bookshelf({
  palette,
  position,
  rotation,
  titles,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
  titles: string[];
}) {
  const frameTex = useMemo(
    () => createWoodTexture(palette.deskColorDark, "#1a1310"),
    [palette.deskColorDark]
  );

  const shelfYs = [0.05, 0.52, 0.99, 1.46];
  const perShelf = Math.ceil(titles.length / shelfYs.length);
  const shelfDepth = 0.34;
  const shelfWidth = 0.82;

  return (
    <group position={position} rotation={rotation}>
      {/* Side panels only — no solid front/back, reads as an open shelf */}
      {[-shelfWidth / 2, shelfWidth / 2].map((sx, i) => (
        <mesh key={i} position={[sx, 0.95, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.03, 1.95, shelfDepth]} />
          <meshStandardMaterial map={frameTex} roughness={0.7} />
        </mesh>
      ))}
      {/* Back panel, thin — gives depth without boxing it in */}
      <mesh position={[0, 0.95, -shelfDepth / 2 + 0.01]}>
        <boxGeometry args={[shelfWidth, 1.95, 0.015]} />
        <meshStandardMaterial map={frameTex} roughness={0.8} />
      </mesh>
      {/* Top + base slabs */}
      <mesh position={[0, 1.95, 0]} castShadow>
        <boxGeometry args={[shelfWidth + 0.03, 0.03, shelfDepth]} />
        <meshStandardMaterial map={frameTex} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[shelfWidth + 0.03, 0.03, shelfDepth]} />
        <meshStandardMaterial map={frameTex} roughness={0.7} />
      </mesh>

      {shelfYs.map((y, si) => {
        const shelfTitles = titles.slice(si * perShelf, si * perShelf + perShelf);
        let cursor = -shelfWidth / 2 + 0.06;
        return (
          <group key={si}>
            <mesh position={[0, y, 0]} receiveShadow castShadow>
              <boxGeometry args={[shelfWidth, 0.02, shelfDepth]} />
              <meshStandardMaterial map={frameTex} roughness={0.6} />
            </mesh>
            {shelfTitles.map((title, bi) => {
              const height = 0.36 + ((bi * 37) % 10) / 90;
              const depth = 0.18 + ((bi * 19) % 5) / 100;
              const bx = cursor;
              cursor += 0.075;
              return (
                <Book
                  key={bi}
                  title={title}
                  color={BOOK_HUES[(si * 7 + bi) % BOOK_HUES.length]}
                  x={bx}
                  shelfY={y + 0.01}
                  depth={depth}
                  height={height}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
}
