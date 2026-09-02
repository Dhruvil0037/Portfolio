"use client";

import { useMemo, useState } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { createTextTexture } from "./text-texture";

const SITE_URL = "https://dhruvilportfolio.vercel.app";

function DeskLeg({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[x, 0.44, z]} castShadow>
      <boxGeometry args={[0.06, 0.88, 0.06]} />
      <meshStandardMaterial color="#8a6d3b" />
    </mesh>
  );
}

export default function DeskArea() {
  const [hoverCV, setHoverCV] = useState(false);

  const cvTexture = useMemo(
    () =>
      createTextTexture({
        width: 256,
        height: 320,
        bg: "#faf9f6",
        color: "#16130f",
        font: "600 20px IBM Plex Mono, monospace",
        fontSize: 20,
        lines: ["RESUME", "", "Dhamecha", "Dhruvil", "", "→ open", "  CV.pdf"],
        padding: 20,
      }),
    []
  );

  return (
    <group>
      {/* Desk top */}
      <mesh position={[0, 0.9, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.06, 1.2]} />
        <meshStandardMaterial color="#f4f2ec" roughness={0.6} />
      </mesh>
      <DeskLeg x={-1.2} z={0.1} />
      <DeskLeg x={1.2} z={0.1} />
      <DeskLeg x={-1.2} z={0.9} />
      <DeskLeg x={1.2} z={0.9} />
      {/* Apron panel — reads as a solid desk front rather than bare legs */}
      <mesh position={[0, 0.78, 0.98]} castShadow>
        <boxGeometry args={[2.5, 0.18, 0.03]} />
        <meshStandardMaterial color="#8a6d3b" />
      </mesh>

      {/* Laptop */}
      <group position={[-0.3, 0.93, 0.35]}>
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.03, 0.38]} />
          <meshStandardMaterial color="#16130f" />
        </mesh>
        <group position={[0, 0.02, -0.18]} rotation={[-0.35, 0, 0]}>
          <mesh position={[0, 0.19, 0]}>
            <boxGeometry args={[0.55, 0.38, 0.02]} />
            <meshStandardMaterial color="#16130f" />
          </mesh>
          <Html
            transform
            occlude
            position={[0, 0.19, 0.011]}
            distanceFactor={0.62}
            style={{ pointerEvents: "auto" }}
          >
            <div
              style={{
                width: "260px",
                height: "180px",
                background: "#faf9f6",
                border: "2px solid #16130f",
                padding: "10px 12px",
                fontFamily: "IBM Plex Sans, sans-serif",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "9px",
                    color: "#c2410c",
                    marginBottom: "4px",
                  }}
                >
                  dhruvilportfolio.vercel.app
                </div>
                <div
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#16130f",
                    lineHeight: 1.15,
                  }}
                >
                  Hello, I&apos;m Dhruvil.
                </div>
                <div style={{ fontSize: "10px", color: "#555", marginTop: "4px" }}>
                  Senior Full Stack Developer
                </div>
              </div>
              <button
                onClick={() => window.open(SITE_URL, "_blank")}
                style={{
                  background: "#16130f",
                  color: "#faf9f6",
                  border: "none",
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "10px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
              >
                View live ↗
              </button>
            </div>
          </Html>
        </group>
      </group>

      {/* Desk lamp */}
      <group position={[1, 0.93, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.1, 0.02, 16]} />
          <meshStandardMaterial color="#16130f" />
        </mesh>
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0.4]}>
          <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
          <meshStandardMaterial color="#16130f" />
        </mesh>
        <mesh position={[0.22, 0.62, 0]} rotation={[0, 0, 1.1]}>
          <coneGeometry args={[0.12, 0.2, 16, 1, true]} />
          <meshStandardMaterial
            color="#fb923c"
            emissive="#fb923c"
            emissiveIntensity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight position={[0.28, 0.58, 0]} intensity={0.4} color="#fb923c" distance={2} />
      </group>

      {/* Mug */}
      <mesh position={[0.55, 0.97, 0.65]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.09, 16]} />
        <meshStandardMaterial color="#faf9f6" />
      </mesh>

      {/* CV clipboard, clickable */}
      <mesh
        position={[0.65, 0.935, 0.15]}
        rotation={[-Math.PI / 2, 0, -0.15]}
        onClick={(e) => {
          e.stopPropagation();
          window.open("/CV.pdf", "_blank");
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoverCV(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoverCV(false);
          document.body.style.cursor = "auto";
        }}
        scale={hoverCV ? 1.06 : 1}
      >
        <planeGeometry args={[0.28, 0.36]} />
        <meshStandardMaterial map={cvTexture} />
      </mesh>
    </group>
  );
}
