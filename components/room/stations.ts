export type Station = {
  id: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

// One battlestation, six cinematic angles — camera orbits/zooms around the
// same composition rather than moving between separate rooms.
export const stations: Station[] = [
  { id: "home", position: [1.9, 1.25, 1.75], target: [0.35, 0.55, -0.05], fov: 38 },
  { id: "about", position: [-0.5, 1.05, 1.05], target: [-0.15, 0.6, -0.15], fov: 34 },
  { id: "projects", position: [0.33, 0.65, 0.4], target: [0.33, 0.5, -0.24], fov: 30 },
  { id: "skills", position: [0.42, 0.6, 0.52], target: [0.35, 0.42, 0.07], fov: 25 },
  { id: "experience", position: [1.3, 1.2, 0.85], target: [0.5, 0.55, -0.1], fov: 32 },
  { id: "contact", position: [1.2, 1.0, 0.95], target: [0.45, 0.55, -0.05], fov: 32 },
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
