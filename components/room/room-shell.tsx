"use client";

export default function RoomShell() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#e8e2d4" roughness={0.9} />
      </mesh>

      {/* Rug under desk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.6]}>
        <planeGeometry args={[3.2, 2.2]} />
        <meshStandardMaterial color="#c2410c" roughness={1} />
      </mesh>

      {/* Back wall (contact / window) */}
      <mesh position={[0, 2, -5]}>
        <planeGeometry args={[12, 4]} />
        <meshStandardMaterial color="#f4f2ec" roughness={1} />
      </mesh>

      {/* Left wall (about / bookshelf) */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#efe9db" roughness={1} />
      </mesh>

      {/* Right wall (projects / corkboard) */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5, 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#efe9db" roughness={1} />
      </mesh>

      {/* Window on back wall (contact) */}
      <mesh position={[0, 2.1, -4.95]}>
        <planeGeometry args={[1.8, 1.4]} />
        <meshBasicMaterial color="#fde2c8" />
      </mesh>
      {/* Window frame — 4 thin bars, not a wireframe box (avoids an X-crossed look) */}
      <mesh position={[0, 2.83, -4.9]}>
        <boxGeometry args={[1.9, 0.06, 0.05]} />
        <meshStandardMaterial color="#16130f" />
      </mesh>
      <mesh position={[0, 1.37, -4.9]}>
        <boxGeometry args={[1.9, 0.06, 0.05]} />
        <meshStandardMaterial color="#16130f" />
      </mesh>
      <mesh position={[-0.95, 2.1, -4.9]}>
        <boxGeometry args={[0.06, 1.5, 0.05]} />
        <meshStandardMaterial color="#16130f" />
      </mesh>
      <mesh position={[0.95, 2.1, -4.9]}>
        <boxGeometry args={[0.06, 1.5, 0.05]} />
        <meshStandardMaterial color="#16130f" />
      </mesh>
      <mesh position={[0, 2.1, -4.9]}>
        <boxGeometry args={[0.04, 1.5, 0.05]} />
        <meshStandardMaterial color="#16130f" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f4f2ec" roughness={1} />
      </mesh>

      <ambientLight intensity={0.55} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={0.9}
        color="#fff4e8"
      />
      <pointLight position={[-1, 2.4, 1]} intensity={0.5} color="#fb923c" />
    </group>
  );
}
