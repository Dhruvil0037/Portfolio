"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { sampleStations, stations } from "./stations";

const tmpTarget = new THREE.Vector3();
const tmpPos = new THREE.Vector3();

export default function CameraRig({
  progressRef,
  interactive = true,
}: {
  progressRef: MutableRefObject<number>;
  interactive?: boolean;
}) {
  const currentTarget = useRef(new THREE.Vector3(...stations[0].target));
  const elapsed = useRef(0);

  useFrame((state, delta) => {
    if (interactive) {
      const sample = sampleStations(progressRef.current);
      tmpPos.set(...sample.position);
      tmpTarget.set(...sample.target);

      const cam = state.camera as THREE.PerspectiveCamera;
      if (cam.fov !== sample.fov) {
        cam.fov = THREE.MathUtils.lerp(cam.fov, sample.fov, 1 - Math.pow(0.001, delta));
        cam.updateProjectionMatrix();
      }
    } else {
      // Static/auto mode (mobile, reduced motion off): gentle orbit around
      // the home framing instead of a hard-locked shot.
      elapsed.current += delta;
      const home = stations[0];
      const angle = Math.sin(elapsed.current * 0.15) * 0.08;
      tmpPos.set(
        home.position[0] + Math.sin(angle) * 0.6,
        home.position[1],
        home.position[2]
      );
      tmpTarget.set(...home.target);
    }

    const damping = 1 - Math.pow(0.001, delta);
    state.camera.position.lerp(tmpPos, damping);
    currentTarget.current.lerp(tmpTarget, damping);
    state.camera.lookAt(currentTarget.current);
  });

  return null;
}
