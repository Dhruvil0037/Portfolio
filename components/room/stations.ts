export type Station = {
  id: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

// One station per section, in scroll order. Camera dollies through the room
// from a wide desk shot down to the contact corner.
export const stations: Station[] = [
  { id: "home", position: [0, 2.1, 7.5], target: [0, 1.1, 0.3], fov: 38 },
  { id: "about", position: [-3.4, 2, 3.4], target: [-4.3, 1.7, 0.3], fov: 36 },
  { id: "projects", position: [3.6, 2, 2], target: [4.6, 1.7, -1], fov: 36 },
  { id: "skills", position: [1.6, 1.8, 1.2], target: [0.7, 1.3, -1.7], fov: 34 },
  { id: "experience", position: [-1.8, 2.3, 0.4], target: [-3, 1.9, -3.6], fov: 36 },
  { id: "contact", position: [0, 2.2, -0.6], target: [0, 1.7, -4.5], fov: 38 },
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
