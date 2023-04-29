import { DrawCanvasFn } from "types/types";
import { Point } from "../../utils/polygon";

const draw = (
  canvas: HTMLCanvasElement,
  clearCanvas: (ctx: CanvasRenderingContext2D) => void,
  params: { width: number; height: number; space: number; lineWidth: number }
): DrawCanvasFn => {
  if (!canvas) {
    console.error("Could not get ref");
    return;
  }

  const ctx = canvas.getContext("2d");
  clearCanvas(ctx);

  const x = 10;
  const y = 10;
  const padding = params.space;
  const size = 120;
  const lineWidth = params.lineWidth;
  const color = "black";

  // This is the ratio of the horiz/vert sections vs diagonal
  const hRatio = 0.7;
  const vRatio = 0.7;
  const positions = [
    [0, 0],
    [size, 0],
    [size * 2, 0],
    [size * 3, 0],
    [0, size],
    [size, size],
    [size * 2, size],
    [size * 3, size],
    [0, size * 2],
    [size, size * 2],
    [size * 2, size * 2],
    [size * 3, size * 2],
    [0, size * 3],
    [size, size * 3],
    [size * 2, size * 3],
    [size * 3, size * 3],
  ];

  ctx.save();
  ctx.translate(x, y);

  for (let k = 0; k < positions.length; k += 1) {
    let drawFns = [];
    let space = padding;
    if (k === 0 || k === 3 || k === 12 || k === 15) {
      drawFns = [drawLinesOnMinorDiagonal];
    } else if (k === 1 || k === 2 || k === 13 || k === 14) {
      drawFns = [drawLinesOnVertical];
      space *= vRatio;
    } else if (k === 4 || k === 7 || k === 8 || k === 11) {
      drawFns = [drawLinesOnMajorDiagonal];
    } else if (k === 5 || k === 6 || k === 9 || k === 10) {
      drawFns = [drawLinesOnHorizontal];
      space *= hRatio;
    }
    drawLineRectWithFill(
      ctx,
      positions[k][0],
      positions[k][1],
      size,
      size,
      color,
      lineWidth,
      space,
      drawFns
    );
  }
  ctx.restore();
};

const addLine = (
  ctx: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  color: string = "black",
  width: number = 1
) => {
  if (color) ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};

const drawLineRectWithFill = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  c: string,
  lineWidth: number,
  padding: number,
  fillFunctions = []
) => {
  ctx.save();
  ctx.translate(x, y);
  addLine(ctx, { x: 0, y: 0 }, { x: w, y: 0 }, c, lineWidth); // Top
  addLine(ctx, { x: 0, y: 0 }, { x: 0, y: h }, c, lineWidth); // Left
  addLine(ctx, { x: w, y: 0 }, { x: w, y: h }, c, lineWidth); // Right
  addLine(ctx, { x: 0, y: h }, { x: w, y: h }, c, lineWidth); // Bottom

  for (let k = 0; k < fillFunctions.length; k++) {
    fillFunctions[k].apply(this, [ctx, w, h, padding, lineWidth]);
  }

  ctx.restore();
};

const drawLinesOnHorizontal = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  padding: number = 10,
  lineWidth: number = null
) => {
  for (let k = 0; k <= h && k <= w; k += padding) {
    addLine(ctx, { x: 0, y: k }, { x: w, y: k }, null, lineWidth);
  }
};

const drawLinesOnVertical = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  padding: number = 10,
  lineWidth: number = null
) => {
  for (let k = 0; k <= h && k <= w; k += padding) {
    addLine(ctx, { x: k, y: 0 }, { x: k, y: h }, null, lineWidth);
  }
};

const drawLinesOnMajorDiagonal = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  padding: number = 10,
  lineWidth: number = null
) => {
  for (let k = 0; k <= h && k <= w; k += padding) {
    addLine(ctx, { x: k, y: 0 }, { x: w, y: h - k }, null, lineWidth);
  }
  for (let k = padding; k <= h && k <= w; k += padding) {
    addLine(ctx, { x: 0, y: k }, { x: w - k, y: h }, null, lineWidth);
  }
};

const drawLinesOnMinorDiagonal = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  padding: number = 10,
  lineWidth: number = null
) => {
  for (let k = 0; k <= h && k <= w; k += padding) {
    addLine(ctx, { x: k, y: 0 }, { x: 0, y: k }, null, lineWidth);
  }
  for (let k = padding; k <= h && k <= w; k += padding) {
    addLine(ctx, { x: k, y: h }, { x: h, y: k }, null, lineWidth);
  }
};

export default draw;
