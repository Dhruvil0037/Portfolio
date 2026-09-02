import * as THREE from "three";

type TextTextureOptions = {
  width?: number;
  height?: number;
  bg?: string;
  color?: string;
  fontSize?: number;
  font?: string;
  align?: CanvasTextAlign;
  padding?: number;
  lines?: string[];
};

export function createTextTexture(opts: TextTextureOptions) {
  const {
    width = 256,
    height = 256,
    bg = "#faf9f6",
    color = "#16130f",
    fontSize = 22,
    font = "600 22px IBM Plex Mono, monospace",
    align = "left",
    padding = 16,
    lines = [],
  } = opts;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = "top";

  const lineHeight = fontSize * 1.35;
  const x = align === "center" ? width / 2 : padding;
  lines.forEach((line, i) => {
    ctx.fillText(line, x, padding + i * lineHeight, width - padding * 2);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
