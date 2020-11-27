import debug from "debug";
import { degToRad } from "../../utils/polygon";

// const log = debug("utils");
const log = console.log;

/** Draws many vertically-striped colored bands */
export const drawBands = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  bandSize: number,
  numBands: number,
  rotation: number,
  colorArray: number[][],
  randomizeColor: boolean = true
) => {
  ctx.save();
  let size = bandSize * numBands;
  ctx.translate(x + size / 2, y + size / 2);
  ctx.rotate(degToRad(rotation));
  ctx.translate(-(x + size / 2), -(y + size / 2));
  if (rotation === 45) ctx.translate(-size / 4, size / 4);

  const randColor = randomizeColor ? Math.floor(Math.random() * 100) : 0;
  for (let k = 0; k < numBands; k++) {
    ctx.beginPath();
    ctx.fillRect(x, y, size, bandSize * numBands);
    const [r, g, b] = colorArray[(k + randColor) % colorArray.length];
    size -= bandSize;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fill();
  }
  ctx.restore();
};

export const drawConcentricCircles = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  bandSize: number,
  numBands: number,
  colorArray: number[][]
) => {
  let radius = bandSize * numBands;
  const randColor = Math.floor(Math.random() * 100);
  for (let k = 0; k < numBands; k++) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    const [r, g, b] = colorArray[(k + randColor) % colorArray.length];
    radius -= bandSize;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fill();
  }
};

/** Draw concentric triangles of different colors */
export const drawConcentricTriangles = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  bandSize: number,
  numBands: number,
  rotation: number,
  colorArray: number[][]
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(degToRad(rotation));
  ctx.translate(-x, -y);
  let width = bandSize * numBands;
  const randColor = Math.floor(Math.random() * 100);
  ctx.fillRect(x, y, 10, 10);
  for (let k = 0; k < numBands; k++) {
    ctx.beginPath();
    ctx.moveTo(x, y - (7 * width) / 4);
    ctx.lineTo(x + width, y + width / 2);
    ctx.lineTo(x - width, y + width / 2);
    ctx.fill();
    const [r, g, b] = colorArray[(k + randColor) % colorArray.length];
    width -= bandSize;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
  }
  ctx.restore();
};
