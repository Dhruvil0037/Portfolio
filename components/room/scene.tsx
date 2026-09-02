"use client";

import { Suspense, type MutableRefObject } from "react";
import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { skillsData, projectsData, experiencesData } from "@/lib/data";
import CameraRig from "./camera-rig";
import RoomShell from "./room-shell";
import Desk from "./props/desk";
import Laptop from "./props/laptop";
import Monitor from "./props/monitor";
import { Keyboard, ComputerMouse, Notebook, Tablet, DeskLamp, Mug } from "./props/desk-props";
import Bookshelf from "./props/bookshelf";
import Frame from "./props/frame";
import RobotToy from "./props/robot-toy";
import BalconyWindow from "./props/window";
import Chair from "./props/chair";
import Plant from "./props/plant";
import type { RoomPalette } from "./theme";

const bookTitles = skillsData
  .filter((s) => !s.includes(" "))
  .slice(0, 16);

const experienceLines = experiencesData
  .slice()
  .reverse()
  .flatMap((e) => [e.date, e.title]);

export default function Scene({
  progressRef,
  interactive,
  palette,
  theme,
}: {
  progressRef: MutableRefObject<number>;
  interactive: boolean;
  palette: RoomPalette;
  theme: "light" | "dark";
}) {
  return (
    <Suspense fallback={null}>
      <color attach="background" args={[palette.bgColor]} />
      <fog attach="fog" args={[palette.fogColor, 5.5, 12]} />

      <Environment preset={theme === "dark" ? "night" : "apartment"} />
      <ambientLight intensity={palette.ambientIntensity} />
      <directionalLight
        position={[2.2, 4, 1.5]}
        intensity={palette.keyIntensity}
        color={palette.keyLight}
        castShadow
      />
      <pointLight
        position={[1.4, 1.4, -0.1]}
        intensity={palette.keyIntensity * 0.35}
        color={palette.rimLight}
        distance={2.2}
      />

      <RoomShell palette={palette} />

      <group position={[0, 0, 0.3]}>
        <Desk palette={palette} />
      </group>

      <Laptop
        palette={palette}
        position={[-0.35, 0.933, 0.85]}
        rotation={[0, 0.35, 0]}
      />

      <Monitor
        palette={palette}
        position={[0.12, 1.05, 0.3]}
        rotation={[0, 0.22, 0]}
        title="$ whoami --skills"
        lines={skillsData.slice(0, 8).map((s) => `> ${s}`)}
      />
      <Monitor
        palette={palette}
        position={[0.56, 1.05, 0.3]}
        rotation={[0, -0.22, 0]}
        title="MY PROJECTS"
        lines={projectsData.slice(0, 6).map((p) => p.title)}
      />

      <Keyboard palette={palette} position={[-0.1, 0.933, 1.05]} rotation={[0, 0.05, 0]} />
      <ComputerMouse palette={palette} position={[0.14, 0.933, 1.08]} rotation={[0, -0.3, 0]} />
      <Notebook palette={palette} position={[0.88, 0.933, 0.95]} rotation={[0, -0.3, 0]} />
      <Tablet palette={palette} position={[-0.85, 0.933, 0.9]} rotation={[-0.05, 0.25, 0]} />
      <DeskLamp palette={palette} position={[1.05, 0.933, 0.05]} />
      <Mug palette={palette} position={[-1.05, 0.955, 0.35]} />
      <RobotToy palette={palette} position={[0.95, 0.933, 0.55]} />

      <Chair palette={palette} position={[0, 0, 1.75]} rotation={[0, Math.PI, 0]} />

      <Bookshelf
        palette={palette}
        position={[-3.75, 0, -0.6]}
        rotation={[0, 0.35, 0]}
        titles={bookTitles}
      />

      <Frame
        palette={palette}
        position={[-1.4, 2.1, -3.14]}
        lines={['"Ship, then', 'sharpen."']}
        accentBorder
      />
      <Frame
        palette={palette}
        position={[-0.5, 2.1, -3.14]}
        lines={experienceLines.slice(0, 4)}
      />
      <Frame
        palette={palette}
        position={[0.4, 2.1, -3.14]}
        lines={["// TODO:", "fix it in prod"]}
      />

      <BalconyWindow palette={palette} position={[2.0, 1.9, -3.12]} theme={theme} />

      <Plant palette={palette} position={[1.9, 0, 0.9]} />
      <Plant palette={palette} position={[-3.9, 0, 1.4]} />

      <ContactShadows position={[0, 0.002, 0.3]} opacity={0.45} scale={7} blur={2.4} far={2} />

      <CameraRig progressRef={progressRef} interactive={interactive} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.4} luminanceThreshold={0.7} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.15} darkness={0.6} />
      </EffectComposer>
    </Suspense>
  );
}
