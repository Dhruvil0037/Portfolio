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
import {
  Keyboard,
  ComputerMouse,
  MousePad,
  SpiralNotebook,
  Pencil,
  DeskLamp,
  Mug,
} from "./props/desk-props";
import Bookshelf from "./props/bookshelf";
import Frame from "./props/frame";
import { WallText } from "./props/wall-art";
import RobotToy from "./props/robot-toy";
import BalconyWindow from "./props/window";
import Chair from "./props/chair";
import Plant from "./props/plant";
import type { RoomPalette } from "./theme";

const bookTitles = skillsData.filter((s) => !s.includes(" ")).slice(0, 20);

const experienceLines = experiencesData
  .slice()
  .reverse()
  .flatMap((e) => [e.date, e.title]);

export default function Scene({
  progressRef,
  interactive,
  palette,
  theme,
  onToggleTheme,
}: {
  progressRef: MutableRefObject<number>;
  interactive: boolean;
  palette: RoomPalette;
  theme: "light" | "dark";
  onToggleTheme: () => void;
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

      {/* Desk top world span: x [-1.15, 1.15], z [-0.13, 0.93], y = 0.93 */}
      <group position={[0, 0, 0.4]}>
        <Desk palette={palette} />
      </group>

      <Monitor
        palette={palette}
        position={[-0.55, 1.05, 0.42]}
        rotation={[0, 0.06, 0]}
        title="$ whoami --skills"
        lines={skillsData.slice(0, 8).map((s) => `> ${s}`)}
      />

      <Laptop
        palette={palette}
        position={[-0.13, 0.933, 0.4]}
        rotation={[0, -0.12, 0]}
      />

      <MousePad palette={palette} position={[-0.34, 0.936, 0.82]} />
      <Keyboard palette={palette} position={[-0.44, 0.942, 0.82]} rotation={[0, 0.02, 0]} />
      <ComputerMouse palette={palette} position={[-0.16, 0.942, 0.85]} rotation={[0, -0.2, 0]} />

      <DeskLamp
        palette={palette}
        position={[0.78, 0.933, 0.35]}
        on={theme === "dark"}
        onToggle={onToggleTheme}
      />
      <SpiralNotebook palette={palette} position={[0.72, 0.933, 0.68]} rotation={[0, 0.15, 0]} />
      <Pencil
        palette={palette}
        position={[0.85, 0.945, 0.7]}
        rotation={[Math.PI / 2, 0, 0.9]}
      />

      <Plant palette={palette} position={[-0.98, 0.933, 0.02]} />
      <Mug palette={palette} position={[-0.9, 0.955, 0.32]} />
      <RobotToy palette={palette} position={[0.98, 0.933, 0.75]} />

      <Chair palette={palette} position={[0, 0, 1.25]} rotation={[0, Math.PI, 0]} />

      <Bookshelf
        palette={palette}
        position={[-3.75, 0, -0.6]}
        rotation={[0, 0.35, 0]}
        titles={bookTitles}
      />

      {/* Real content, eye-level band */}
      <Frame
        palette={palette}
        position={[-1.4, 2.1, -3.14]}
        lines={experienceLines.slice(0, 4)}
      />
      <Frame
        palette={palette}
        position={[-0.5, 2.1, -3.14]}
        lines={experienceLines.slice(4, 8)}
      />
      <Frame
        palette={palette}
        position={[0.4, 2.1, -3.14]}
        lines={['"Ship, then', 'sharpen."']}
        accentBorder
      />

      {/* Big painted typography band, up high */}
      <WallText
        palette={palette}
        position={[-1.3, 2.85, -3.15]}
        size={[1.7, 0.75]}
        text="Ship it"
        sub="// works on my machine"
        accent
      />
      <WallText
        palette={palette}
        position={[0.7, 2.85, -3.15]}
        size={[1.6, 0.75]}
        text="git commit"
        sub="-m 'fix everything'"
      />
      <WallText
        palette={palette}
        position={[-3.9, 2.3, 0.6]}
        rotation={[0, Math.PI / 2, 0]}
        size={[1.4, 0.65]}
        text="console.log"
      />

      <BalconyWindow palette={palette} position={[2.0, 1.9, -3.12]} theme={theme} />

      <Plant palette={palette} position={[1.9, 0, 0.9]} />

      <ContactShadows position={[0, 0.002, 0.4]} opacity={0.45} scale={7} blur={2.4} far={2} />

      <CameraRig progressRef={progressRef} interactive={interactive} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.4} luminanceThreshold={0.7} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.15} darkness={0.6} />
      </EffectComposer>
    </Suspense>
  );
}
