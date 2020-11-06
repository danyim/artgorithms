import debug from "debug";
import { degToRad, randRange } from "../../utils/polygon";

// const log = debug("utils");
const log = console.log;

export const drawConcentricColorCircles = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  bandSize: number,
  numBands: number,
  colorArray: number[][]
) => {
  ctx.save();

  for (let k = 0; k < 1; k++) {
    drawConcentricColorCircle(ctx, x, y, bandSize * k, bandSize, colorArray);
  }
  drawConcentricColorCircle(ctx, x, y, 1, bandSize, colorArray);

  ctx.restore();
};

export const drawConcentricColorCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  bandSize: number,
  colorArray: number[][]
) => {
  const randColor = Math.floor(Math.random() * 100);

  const minSizeDeg = 5;
  const maxSizeDeg = 12;

  let currentDeg = 0;
  let prevDeg = 0;
  let index = 0;
  while (currentDeg < 360) {
    let nextSize = randRange(minSizeDeg, maxSizeDeg);
    if (currentDeg + minSizeDeg >= 360) {
      currentDeg = 360;
    } else {
      currentDeg += nextSize;
    }
    // TODO: Solve for a length x
    const degDelta = currentDeg - prevDeg;
    const length = (degDelta / 360) * 2 * Math.PI * radius;
    console.log("radius", radius, length);
    ctx.beginPath();
    ctx.arc(x, y, radius, degToRad(prevDeg), degToRad(currentDeg));
    const [r, g, b] = colorArray[(index + randColor) % colorArray.length];
    ctx.lineWidth = bandSize;
    ctx.strokeStyle = `rgb(${r},${g},${b})`;
    ctx.stroke();
    index++;

    prevDeg = currentDeg;
  }
};
