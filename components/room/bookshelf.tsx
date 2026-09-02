"use client";

const BOOK_COLORS = ["#c2410c", "#16130f", "#8a6d3b", "#5b6b53", "#a13d2a", "#3d4a5b"];

export default function Bookshelf() {
  return (
    <group position={[-4.6, 0, 0.3]}>
      {/* Shelf frame */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.35, 3.2, 2.2]} />
        <meshStandardMaterial color="#f4f2ec" roughness={0.7} />
      </mesh>

      {/* Shelf boards */}
      {[0.6, 1.3, 2, 2.7, 3.4].map((y, i) => (
        <mesh key={i} position={[0.05, y, 0]}>
          <boxGeometry args={[0.4, 0.03, 2.15]} />
          <meshStandardMaterial color="#16130f" />
        </mesh>
      ))}

      {/* Books, arranged across two shelves */}
      {Array.from({ length: 10 }).map((_, i) => {
        const shelf = i < 5 ? 0.68 : 1.38;
        const z = -0.9 + (i % 5) * 0.42;
        const height = 0.35 + ((i * 37) % 10) / 100;
        return (
          <mesh key={i} position={[0.1, shelf + height / 2, z]} castShadow>
            <boxGeometry args={[0.22, height, 0.32]} />
            <meshStandardMaterial color={BOOK_COLORS[i % BOOK_COLORS.length]} />
          </mesh>
        );
      })}

      {/* Framed photo */}
      <mesh position={[0.19, 2.4, 0.5]}>
        <boxGeometry args={[0.03, 0.5, 0.4]} />
        <meshStandardMaterial color="#16130f" />
      </mesh>
      <mesh position={[0.21, 2.4, 0.5]}>
        <planeGeometry args={[0.34, 0.44]} />
        <meshStandardMaterial color="#fde2c8" />
      </mesh>
    </group>
  );
}
