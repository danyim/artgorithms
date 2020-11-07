import debug from "debug";
import { degToRad, randRange } from "../../utils/polygon";

// const log = debug("utils");
const log = console.log;

export const drawConcentricCircleBands = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  bandSize: number,
  numBands: number,
  colorArray: number[][]
) => {
  ctx.save();

  for (let k = 0; k < numBands; k++) {
    drawConcentricBandedCircle(ctx, x, y, bandSize * k, bandSize, colorArray);
  }
  drawBandedCircle(ctx, x, y, bandSize / 2, colorArray);

  ctx.restore();
};

export const drawConcentricBandedCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  bandSize: number,
  colorArray: number[][]
) => {
  const randColor = Math.floor(Math.random() * 100);

  const minArcLength = 20;
  const maxArcLength = 30;

  // Random start offset so that each circle has a different origin
  const startDegOffset = randRange(0, 360);
  let currentDeg = 0;
  let prevDeg = 0;
  let index = 0;
  while (currentDeg < 360) {
    const arcLength = randRange(minArcLength, maxArcLength);
    let nextDegree = (360 * arcLength) / (2 * Math.PI * radius);
    // Round up if the next band will be too small
    if (currentDeg + 20 >= 360) {
      currentDeg = 360;
    } else {
      currentDeg += nextDegree;
    }
    ctx.beginPath();
    ctx.arc(
      x,
      y,
      radius,
      degToRad(startDegOffset) + degToRad(prevDeg),
      degToRad(startDegOffset) + degToRad(currentDeg)
    );
    const [r, g, b] = colorArray[(index + randColor) % colorArray.length];
    ctx.lineWidth = bandSize;
    ctx.strokeStyle = `rgb(${r},${g},${b})`;
    ctx.stroke();
    index++;

    prevDeg = currentDeg;
  }
};

/** Draws a banded filled circle */
export const drawBandedCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  colorArray: number[][]
) => {
  const randColor = Math.floor(Math.random() * 100);

  const minArcLength = 10;
  const maxArcLength = 15;

  // Random start offset so that each circle has a different origin
  const startDegOffset = randRange(0, 360);
  let currentDeg = 0;
  let prevDeg = 0;
  let index = 0;
  while (currentDeg < 360) {
    const arcLength = randRange(minArcLength, maxArcLength);
    let nextDegree = (360 * arcLength) / (2 * Math.PI * radius);
    if (currentDeg + 20 >= 360) {
      currentDeg = 360;
    } else {
      currentDeg += nextDegree;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(
      x,
      y,
      radius,
      degToRad(startDegOffset) + degToRad(prevDeg),
      degToRad(startDegOffset) + degToRad(currentDeg)
    );
    const [r, g, b] = colorArray[(index + randColor) % colorArray.length];
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fill();
    index++;

    prevDeg = currentDeg;
  }
};
