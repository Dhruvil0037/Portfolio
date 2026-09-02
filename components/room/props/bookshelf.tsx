"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { createWoodTexture, createBookSpineTexture } from "../textures";
import type { RoomPalette } from "../theme";

const BOOK_HUES = ["#c2410c", "#3a4a5c", "#5b6b53", "#7a4a6a", "#8a6d3b", "#4a5568"];

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
  const spine = useMemo(
    () => createBookSpineTexture({ title, color, height: 220 }),
    [title, color]
  );
  const materials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color, roughness: 0.8 }), // +x
      new THREE.MeshStandardMaterial({ map: spine, roughness: 0.7 }), // -x (spine, faces outward)
      new THREE.MeshStandardMaterial({ color, roughness: 0.8 }), // +y
      new THREE.MeshStandardMaterial({ color, roughness: 0.8 }), // -y
      new THREE.MeshStandardMaterial({ color, roughness: 0.8 }), // +z
      new THREE.MeshStandardMaterial({ color, roughness: 0.8 }), // -z
    ],
    [color, spine]
  );
  return (
    <mesh
      position={[x, shelfY + height / 2, 0]}
      material={materials}
      castShadow
    >
      <boxGeometry args={[0.028, height, depth]} />
    </mesh>
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

  const shelfYs = [0.15, 0.62, 1.09, 1.56];
  const perShelf = Math.ceil(titles.length / shelfYs.length);

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <RoundedBox args={[0.3, 2.0, 0.85]} radius={0.01} position={[0, 1, 0]} castShadow receiveShadow>
        <meshStandardMaterial map={frameTex} roughness={0.7} />
      </RoundedBox>

      {shelfYs.map((y, si) => {
        const shelfTitles = titles.slice(si * perShelf, si * perShelf + perShelf);
        let cursor = -0.36;
        return (
          <group key={si}>
            <mesh position={[0.16, y, 0]}>
              <boxGeometry args={[0.02, 0.02, 0.82]} />
              <meshStandardMaterial color={palette.deskColorDark} roughness={0.6} />
            </mesh>
            {shelfTitles.map((title, bi) => {
              const height = 0.38 + ((bi * 37) % 10) / 90;
              const depth = 0.16 + ((bi * 19) % 5) / 100;
              const bx = cursor;
              cursor += 0.075;
              return (
                <Book
                  key={bi}
                  title={title}
                  color={BOOK_HUES[(si * 7 + bi) % BOOK_HUES.length]}
                  x={bx}
                  shelfY={y}
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
