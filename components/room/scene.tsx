"use client";

import { Suspense, type MutableRefObject } from "react";
import RoomShell from "./room-shell";
import DeskArea from "./desk-area";
import Bookshelf from "./bookshelf";
import Corkboard from "./corkboard";
import SkillsCorner from "./skills-corner";
import Whiteboard from "./whiteboard";
import CameraRig from "./camera-rig";

export default function Scene({
  progressRef,
}: {
  progressRef: MutableRefObject<number>;
}) {
  return (
    <Suspense fallback={null}>
      <fog attach="fog" args={["#e8e2d4", 11, 22]} />
      <RoomShell />
      <DeskArea />
      <Bookshelf />
      <Corkboard />
      <SkillsCorner />
      <Whiteboard />
      <CameraRig progressRef={progressRef} />
    </Suspense>
  );
}
