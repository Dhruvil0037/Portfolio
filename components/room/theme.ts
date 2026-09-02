// Day/night material palettes for the 3D scene, tied to the site's
// paper/ink/accent tokens (see app/globals.css) rather than ad-hoc colors.

export type RoomPalette = {
  fogColor: string;
  bgColor: string;
  wallColor: string;
  floorColor: string;
  deskColor: string;
  deskColorDark: string;
  metalColor: string;
  metalColorDark: string;
  accent: string;
  screenGlow: string;
  keyLight: string;
  rimLight: string;
  ambientIntensity: number;
  keyIntensity: number;
  windowColor: string;
  paperColor: string;
  inkColor: string;
};

export const dayPalette: RoomPalette = {
  fogColor: "#e4ddc9",
  bgColor: "#efe7d3",
  wallColor: "#efe9db",
  floorColor: "#d9cfb4",
  deskColor: "#8a6a45",
  deskColorDark: "#5f4a30",
  metalColor: "#cfd2d6",
  metalColorDark: "#3a3d42",
  accent: "#c2410c",
  screenGlow: "#fef6ec",
  keyLight: "#fff6e2",
  rimLight: "#ffd9a6",
  ambientIntensity: 0.75,
  keyIntensity: 1.3,
  windowColor: "#bcd6e8",
  paperColor: "#faf9f6",
  inkColor: "#16130f",
};

export const nightPalette: RoomPalette = {
  fogColor: "#0e0c0a",
  bgColor: "#0c0b09",
  wallColor: "#171310",
  floorColor: "#100e0b",
  deskColor: "#4a3924",
  deskColorDark: "#2b2116",
  metalColor: "#4b4e54",
  metalColorDark: "#1a1b1e",
  accent: "#fb923c",
  screenGlow: "#fb923c",
  keyLight: "#fbe8cf",
  rimLight: "#fb923c",
  ambientIntensity: 0.22,
  keyIntensity: 0.55,
  windowColor: "#1a2436",
  paperColor: "#f5f2ea",
  inkColor: "#121110",
};

export function getPalette(theme: "light" | "dark"): RoomPalette {
  return theme === "dark" ? nightPalette : dayPalette;
}
