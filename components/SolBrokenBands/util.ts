import debug from "debug";
import { degToRad, getBoundsCenter, randRange } from "../../utils/polygon";

// const log = debug("utils");
const log = console.log;

export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  xOffset: number,
  yOffset: number,
  size: number,
  bandSize: number,
  rotationDegrees: number,
  colorArray: string[]
) => {
  ctx.save();
  ctx.translate(xOffset, yOffset);
  drawOuterFrame(ctx, 0, 0, size, bandSize / size);

  const rectClipPath = new Path2D();
  rectClipPath.rect(
    bandSize,
    bandSize,
    size - 2 * bandSize,
    size - 2 * bandSize
  );
  ctx.clip(rectClipPath);

  const center = getBoundsCenter({
    xMin: bandSize,
    xMax: size - 2 * bandSize,
    yMin: bandSize,
    yMax: size - 2 * bandSize,
  });
  // log("Translating to", center.x, center.y);
  ctx.translate(center.x, center.y);
  ctx.rotate(degToRad(rotationDegrees));
  ctx.translate(-center.x, -center.y);
  ctx.translate(-bandSize * 3, -bandSize * 3);
  // log("Returning to ", -(center.x), -(center.y));

  // TODO: Change k max value to relative value
  for (let k = 0; k < 25; k++) {
    drawBand(ctx, size, bandSize, 0, k * bandSize, colorArray);
  }
  ctx.restore();
};

export const drawOuterFrame = (
  ctx: CanvasRenderingContext2D,
  xOffset: number,
  yOffset: number,
  size: number,
  thicknessRatio: number = 1 / 16
) => {
  const thickness = size * thicknessRatio;

  ctx.fillStyle = "black";
  ctx.fillRect(xOffset, yOffset, size, thickness);
  ctx.fillRect(xOffset + size - thickness, yOffset, thickness, size);
  ctx.fillRect(xOffset, yOffset + size - thickness, size, thickness);
  ctx.fillRect(xOffset, yOffset, thickness, size);
};

export const drawBand = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  xOffset: number,
  yOffset: number,
  colorArray: string[]
) => {
  let x = xOffset;
  let lastColor = colorArray[0];
  while (x < xOffset + width * 1.5) {
    // Pick a next color that isn't the same as the last
    let bandColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    while (bandColor === lastColor) {
      bandColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    }
    ctx.fillStyle = bandColor;
    lastColor = bandColor;
    const bandWidth = randRange(width / 16, width / 6);
    ctx.fillRect(x, yOffset, bandWidth, height);
    x += bandWidth;
  }
};
