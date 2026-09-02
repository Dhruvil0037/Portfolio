"use client";

import { Suspense, type MutableRefObject } from "react";
import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import CameraRig from "./camera-rig";
import {
  Desk,
  DeskChair,
  Bookcase,
  Books,
  ComputerMouse,
  Keyboard,
  Lamp,
  Monitor,
  Laptop,
  Plant,
} from "./models";

const SITE_URL = "https://dhruvilportfolio.vercel.app";

export default function BattlestationScene({
  progressRef,
  interactive,
}: {
  progressRef: MutableRefObject<number>;
  interactive: boolean;
}) {
  return (
    <Suspense fallback={null}>
      <color attach="background" args={["#1c1a17"]} />
      <fog attach="fog" args={["#1c1a17", 6, 13]} />

      <Environment preset="apartment" />
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[2.5, 4, 2]}
        intensity={1.1}
        color="#fff4e0"
      />
      <pointLight
        position={[0.66, 0.65, -0.28]}
        intensity={0.35}
        color="#fb923c"
        distance={1.2}
      />

      {/* Desk footprint: x [-0.01, 0.72], z [-0.38, 0.18], top y = 0.384 */}
      <group position={[0, 0, 0]}>
        <Desk position={[0, 0, 0]} />

        <Monitor
          position={[0.13, 0.384, -0.24]}
          rotation={[0, 0.22, 0]}
          glow="#fb923c"
        />
        <Monitor
          position={[0.53, 0.384, -0.24]}
          rotation={[0, -0.22, 0]}
          glow="#5eead4"
        />

        <Laptop
          position={[0.18, 0.384, 0.06]}
          rotation={[0, 0.3, 0]}
          scale={0.75}
          onOpenSite={() => window.open(SITE_URL, "_blank")}
          glow="#faf9f6"
        />

        <Keyboard position={[0.42, 0.384, 0.08]} rotation={[0, 0.05, 0]} />
        <ComputerMouse position={[0.66, 0.384, 0.1]} rotation={[0, -0.3, 0]} />

        <Lamp position={[0.66, 0.384, -0.28]} />

        <DeskChair position={[0.36, 0, 0.75]} rotation={[0, Math.PI, 0]} />

        <Bookcase position={[-0.55, 0, -0.25]} rotation={[0, 0.3, 0]} />
        <Books position={[0.03, 0.384, -0.32]} rotation={[0, 0.4, 0]} />

        <Plant position={[1.0, 0, -0.05]} />

        <ContactShadows
          position={[0, 0.002, 0]}
          opacity={0.5}
          scale={5}
          blur={2.2}
          far={1.5}
        />
      </group>

      <CameraRig progressRef={progressRef} interactive={interactive} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.35}
          luminanceThreshold={0.75}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.15} darkness={0.55} />
      </EffectComposer>
    </Suspense>
  );
}
