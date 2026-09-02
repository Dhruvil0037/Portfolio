export type Station = {
  id: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

// Desk top is at world y=0.933, centered around x=0, z=0.3..1.5 (front edge).
// Bookshelf sits at x=-3.75, back wall (frames + window) at z=-3.14.
export const stations: Station[] = [
  { id: "home", position: [2.3, 1.55, 2.7], target: [0, 0.95, 0.4], fov: 40 },
  { id: "about", position: [-2.5, 1.4, 0.9], target: [-3.5, 1.1, -0.3], fov: 34 },
  { id: "projects", position: [0.45, 1.15, 0.85], target: [0.35, 0.98, 0.15], fov: 28 },
  { id: "skills", position: [-0.55, 1.05, 1.25], target: [-0.25, 0.96, 0.7], fov: 26 },
  { id: "experience", position: [0.6, 1.75, -1.1], target: [-0.5, 1.65, -3.0], fov: 32 },
  { id: "contact", position: [1.5, 1.35, -0.4], target: [2.0, 1.7, -3.1], fov: 32 },
];

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpVec3(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

// Given global scroll progress [0,1], find the current station segment and
// return interpolated position/target/fov.
export function sampleStations(progress: number) {
  const segments = stations.length - 1;
  const scaled = progress * segments;
  const index = Math.min(segments - 1, Math.floor(scaled));
  const localT = smoothstep(Math.min(1, Math.max(0, scaled - index)));

  const from = stations[index];
  const to = stations[index + 1];

  return {
    position: lerpVec3(from.position, to.position, localT),
    target: lerpVec3(from.target, to.target, localT),
    fov: lerp(from.fov, to.fov, localT),
    stationIndex: localT < 0.5 ? index : index + 1,
  };
}
