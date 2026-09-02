import * as THREE from "three";

function tex(canvas: HTMLCanvasElement, repeat?: [number, number]) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(...repeat);
  }
  t.needsUpdate = true;
  return t;
}

/** Procedural wood grain — mid-tone base with darker streaked lines. */
export function createWoodTexture(base: string, dark: string) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 256);
  ctx.globalAlpha = 0.35;
  for (let i = 0; i < 40; i++) {
    const y = Math.random() * 256;
    ctx.strokeStyle = dark;
    ctx.lineWidth = 0.6 + Math.random() * 1.8;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 256; x += 16) {
      ctx.lineTo(x, y + Math.sin(x * 0.05 + i) * 4 + (Math.random() - 0.5) * 3);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  return tex(c, [2, 2]);
}

/** Subtle paper/canvas grain for walls, paper props, book pages. */
export function createGrainTexture(base: string, opts?: { contrast?: number }) {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 128, 128);
  const img = ctx.getImageData(0, 0, 128, 128);
  const contrast = opts?.contrast ?? 14;
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * contrast;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
  return tex(c, [3, 3]);
}

/** Woven-fabric-like pattern for chair upholstery. */
export function createFabricTexture(base: string, weave: string) {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 64, 64);
  ctx.strokeStyle = weave;
  ctx.globalAlpha = 0.25;
  ctx.lineWidth = 1;
  for (let i = -64; i < 64; i += 4) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 64, 64);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(i, 64);
    ctx.lineTo(i + 64, 0);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  return tex(c, [4, 4]);
}

/** Brushed-metal noise for aluminum-style laptop/monitor bodies. */
export function createBrushedMetalTexture(base: string) {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 128, 128);
  ctx.globalAlpha = 0.15;
  for (let y = 0; y < 128; y++) {
    ctx.strokeStyle = Math.random() > 0.5 ? "#ffffff" : "#000000";
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(128, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  return tex(c, [1, 1]);
}

/** A book spine texture: colored ground, title text, thin rule lines. */
export function createBookSpineTexture(opts: {
  title: string;
  color: string;
  textColor?: string;
  width?: number;
  height?: number;
}) {
  const { title, color, textColor = "#faf9f6", width = 64, height = 256 } = opts;
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = textColor;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 2;
  ctx.strokeRect(6, 10, width - 12, height - 20);
  ctx.globalAlpha = 1;

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = textColor;
  ctx.font = "600 15px IBM Plex Mono, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(title.toUpperCase(), 0, 0, height - 40);
  ctx.restore();

  return tex(c);
}

/** Gradient sky for the window/balcony backdrop. */
export function createSkyTexture(top: string, bottom: string) {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, top);
  grad.addColorStop(1, bottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 4, 256);
  return tex(c);
}
