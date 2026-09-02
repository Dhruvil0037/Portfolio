"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { createGrainTexture } from "../textures";
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

/** A deskmat under keyboard+mouse with a looping "scrolling code" texture —
 * cheap animation via texture UV offset, no per-frame canvas redraw. */
export function MousePad({
  palette,
  position,
  rotation,
  size = [0.56, 0.3],
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const codeTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = palette.inkColor;
    ctx.fillRect(0, 0, 256, 512);
    ctx.font = "12px IBM Plex Mono, monospace";
    ctx.fillStyle = palette.accent;
    const lines = [
      "const build = () =>",
      "  ship('v1');",
      "",
      "function focus() {",
      "  return deep(work);",
      "}",
      "",
      "// TODO: sleep",
      "export default Dev;",
    ];
    ctx.globalAlpha = 0.65;
    for (let i = 0; i < 22; i++) {
      const line = lines[i % lines.length];
      ctx.fillText(line, 10, 20 + i * 24);
    }
    ctx.globalAlpha = 1;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 0.5);
    return tex;
  }, [palette.inkColor, palette.accent]);

  useFrame((_, delta) => {
    codeTex.offset.y = (codeTex.offset.y + delta * 0.02) % 1;
  });

  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[size[0], 0.006, size[1]]} radius={0.012} smoothness={3} receiveShadow>
        <meshStandardMaterial color={palette.metalColorDark} roughness={0.9} />
      </RoundedBox>
      <mesh ref={meshRef} position={[0, 0.0035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size[0] - 0.02, size[1] - 0.02]} />
        <meshBasicMaterial map={codeTex} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function Pencil({
  palette,
  position,
  rotation,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <cylinderGeometry args={[0.0035, 0.0035, 0.14, 8]} />
        <meshStandardMaterial color={palette.accent} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.075, 0]}>
        <coneGeometry args={[0.0035, 0.012, 8]} />
        <meshStandardMaterial color={palette.inkColor} roughness={0.5} />
      </mesh>
    </group>
  );
}

const TODO_PAGES = [
  ["TODO", "- ship Dayzen v1", "- fix that bug", "- coffee"],
  ["IDEAS", "- LLM agent demo", "- new portfolio", "- learn Rust?"],
  ["NOTES", '"ship, then', ' sharpen."', "-me, probably"],
];

/** A spiral-bound notebook you can click to flip through a few todo pages. */
export function SpiralNotebook({
  palette,
  position,
  rotation,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const [page, setPage] = useState(0);
  const [hovered, setHovered] = useState(false);

  const pageTex = useMemo(
    () =>
      createTextTexture({
        width: 260,
        height: 340,
        bg: palette.paperColor,
        color: palette.inkColor,
        font: "600 22px IBM Plex Mono, monospace",
        fontSize: 22,
        padding: 24,
        lines: TODO_PAGES[page],
      }),
    [palette.paperColor, palette.inkColor, page]
  );
  const coverTex = useMemo(
    () => createGrainTexture(palette.accent, { contrast: 10 }),
    [palette.accent]
  );

  const rings = 7;

  return (
    <group
      position={position}
      rotation={rotation}
      scale={hovered ? 1.03 : 1}
      onClick={(e) => {
        e.stopPropagation();
        setPage((p) => (p + 1) % TODO_PAGES.length);
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
      <RoundedBox args={[0.19, 0.012, 0.25]} radius={0.004} castShadow>
        <meshStandardMaterial color={palette.paperColor} roughness={0.85} />
      </RoundedBox>
      <mesh position={[0, 0.0065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.17, 0.23]} />
        <meshBasicMaterial map={pageTex} toneMapped={false} />
      </mesh>
      <RoundedBox
        args={[0.03, 0.014, 0.25]}
        radius={0.004}
        position={[-0.11, 0, 0]}
        castShadow
      >
        <meshStandardMaterial map={coverTex} roughness={0.8} />
      </RoundedBox>
      {Array.from({ length: rings }).map((_, i) => (
        <mesh
          key={i}
          position={[-0.11, 0.008, -0.1 + (i * 0.2) / (rings - 1)]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.01, 0.0025, 6, 10]} />
          <meshStandardMaterial color={palette.metalColorDark} roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export function DeskLamp({
  palette,
  position,
  on = true,
  onToggle,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  on?: boolean;
  onToggle?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      scale={hovered ? 1.06 : 1}
      onClick={(e) => {
        e.stopPropagation();
        onToggle?.();
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
      {/* Invisible, generous hit area — the lamp itself is the click target,
          not just the tiny switch nub. */}
      <mesh position={[0.08, 0.2, 0]} visible={false}>
        <sphereGeometry args={[0.22, 8, 8]} />
        <meshBasicMaterial />
      </mesh>

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
          emissiveIntensity={on ? 1.6 : 0.05}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      {on && (
        <pointLight
          position={[0.17, 0.32, 0]}
          intensity={palette.keyIntensity * 0.6}
          color={palette.screenGlow}
          distance={1.1}
        />
      )}

      {/* Switch nub — visual indicator of state, click handled by the group */}
      <mesh position={[0, 0.025, 0.05]} scale={hovered ? 1.4 : 1}>
        <sphereGeometry args={[0.012, 12, 12]} />
        <meshStandardMaterial
          color={on ? palette.accent : palette.metalColor}
          emissive={on ? palette.accent : "#000000"}
          emissiveIntensity={on ? 0.8 : 0}
          toneMapped={false}
        />
      </mesh>
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
