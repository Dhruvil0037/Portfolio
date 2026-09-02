"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { sampleStations } from "./stations";

const tmpTarget = new THREE.Vector3();
const tmpPos = new THREE.Vector3();

export default function CameraRig({
  progressRef,
}: {
  progressRef: MutableRefObject<number>;
}) {
  const currentTarget = useRef(new THREE.Vector3(0, 1.1, 0));

  useFrame((state, delta) => {
    const sample = sampleStations(progressRef.current);
    tmpPos.set(...sample.position);
    tmpTarget.set(...sample.target);

    const damping = 1 - Math.pow(0.001, delta);
    state.camera.position.lerp(tmpPos, damping);
    currentTarget.current.lerp(tmpTarget, damping);
    state.camera.lookAt(currentTarget.current);

    const cam = state.camera as THREE.PerspectiveCamera;
    if (cam.fov !== sample.fov) {
      cam.fov = THREE.MathUtils.lerp(cam.fov, sample.fov, damping);
      cam.updateProjectionMatrix();
    }
  });

  return null;
}
