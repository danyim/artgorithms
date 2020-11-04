import debug from "debug";
import { degToRad, getBoundsCenter, randRange } from "../../utils/polygon";
import Canvas from "../SolWall565/Canvas";

// const log = debug("utils");
const log = console.log;

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
    // const [r, g, b] = colorArray[1];
    radius -= bandSize;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fill();
  }
};
