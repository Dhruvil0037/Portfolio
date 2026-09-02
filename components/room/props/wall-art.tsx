"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RoomPalette } from "../theme";

/** Big painted-typography wall piece — graffiti-style word or short dev
 * quote, gently breathing (scale/opacity) so the walls feel alive. */
export function WallText({
  palette,
  position,
  rotation,
  text,
  sub,
  size = [1.6, 0.7],
  accent = false,
}: {
  palette: RoomPalette;
  position: [number, number, number];
  rotation?: [number, number, number];
  text: string;
  sub?: string;
  size?: [number, number];
  accent?: boolean;
}) {
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 900;
    c.height = 400;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, 900, 400);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = accent ? palette.accent : palette.wallColor === palette.floorColor ? palette.inkColor : palette.inkColor;
    ctx.globalAlpha = 0.9;
    ctx.font = "800 110px Fraunces, serif";
    // slight rotation per-letter graffiti feel via multiple passes
    ctx.save();
    ctx.translate(450, sub ? 160 : 200);
    ctx.rotate(-0.02);
    ctx.fillText(text.toUpperCase(), 0, 0);
    ctx.restore();
    if (sub) {
      ctx.font = "500 34px IBM Plex Mono, monospace";
      ctx.globalAlpha = 0.6;
      ctx.fillText(sub, 450, 250);
    }
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [palette, text, sub, accent]);

  useFrame((state) => {
    if (!mat.current) return;
    mat.current.opacity = 0.85 + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.1;
  });

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial ref={mat} map={tex} transparent toneMapped={false} />
    </mesh>
  );
}
