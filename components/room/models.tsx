"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type GLTFResult = {
  scene: THREE.Group;
};

function useClonedGLTF(path: string) {
  const { scene } = useGLTF(path) as unknown as GLTFResult;
  return useMemo(() => scene.clone(true), [scene]);
}

/** Swaps the given material name (by index match) on a cloned scene for an
 * emissive screen material driven by a canvas texture — used to turn a flat
 * Kenney "metal" screen face into a glowing monitor/laptop display. */
/**
 * Kenney's low-poly kit meshes were never texture-unwrapped (flat-shaded
 * only) — their UVs are degenerate, so an image `map` just samples one flat
 * pixel across the whole face. A solid glow color reads correctly instead
 * and looks intentional (a lit screen), where a broken texture wouldn't.
 */
function useScreenMaterial(
  object: THREE.Object3D,
  materialName: string,
  color: string
) {
  useEffect(() => {
    object.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      const next = materials.map((m) => {
        if (m.name !== materialName) return m;
        return new THREE.MeshBasicMaterial({ color, toneMapped: false });
      });
      child.material = Array.isArray(child.material) ? next : next[0];
    });
  }, [object, materialName, color]);
}

export function Desk(props: JSX.IntrinsicElements["group"]) {
  const scene = useClonedGLTF("/models/desk.glb");
  return <primitive object={scene} {...props} />;
}

export function DeskChair(props: JSX.IntrinsicElements["group"]) {
  const scene = useClonedGLTF("/models/chairDesk.glb");
  return <primitive object={scene} {...props} />;
}

export function Bookcase(props: JSX.IntrinsicElements["group"]) {
  const scene = useClonedGLTF("/models/bookcaseOpen.glb");
  return <primitive object={scene} {...props} />;
}

export function Books(props: JSX.IntrinsicElements["group"]) {
  const scene = useClonedGLTF("/models/books.glb");
  return <primitive object={scene} {...props} />;
}

export function ComputerMouse(props: JSX.IntrinsicElements["group"]) {
  const scene = useClonedGLTF("/models/computerMouse.glb");
  return <primitive object={scene} {...props} />;
}

export function Keyboard(props: JSX.IntrinsicElements["group"]) {
  const scene = useClonedGLTF("/models/computerKeyboard.glb");
  return <primitive object={scene} {...props} />;
}

export function Lamp(props: JSX.IntrinsicElements["group"]) {
  const scene = useClonedGLTF("/models/lampRoundTable.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      materials.forEach((m) => {
        if (m.name === "lamp" && m instanceof THREE.MeshStandardMaterial) {
          m.emissive = new THREE.Color("#fb923c");
          m.emissiveIntensity = 1.4;
          m.toneMapped = false;
        }
      });
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

export function Monitor({
  glow = "#16130f",
  ...props
}: JSX.IntrinsicElements["group"] & {
  glow?: string;
}) {
  const scene = useClonedGLTF("/models/computerScreen.glb");
  useScreenMaterial(scene, "metal", glow);
  return <primitive object={scene} {...props} />;
}

export function Laptop({
  onOpenSite,
  glow = "#16130f",
  ...props
}: JSX.IntrinsicElements["group"] & {
  onOpenSite: () => void;
  glow?: string;
}) {
  const scene = useClonedGLTF("/models/laptop.glb");
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useScreenMaterial(scene, "metal", glow);

  return (
    <group
      ref={groupRef}
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        onOpenSite();
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
      scale={hovered ? 1.03 : 1}
    >
      <primitive object={scene} />
    </group>
  );
}

export function Plant(props: JSX.IntrinsicElements["group"]) {
  const scene = useClonedGLTF("/models/plantSmall1.glb");
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/desk.glb");
useGLTF.preload("/models/chairDesk.glb");
useGLTF.preload("/models/laptop.glb");
useGLTF.preload("/models/computerScreen.glb");
useGLTF.preload("/models/computerKeyboard.glb");
useGLTF.preload("/models/computerMouse.glb");
useGLTF.preload("/models/lampRoundTable.glb");
useGLTF.preload("/models/bookcaseOpen.glb");
useGLTF.preload("/models/books.glb");
useGLTF.preload("/models/plantSmall1.glb");
