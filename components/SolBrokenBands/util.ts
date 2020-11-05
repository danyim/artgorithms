import debug from "debug";
import { drawRatioFrame } from "../../utils/art";
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
  drawRatioFrame(ctx, 0, 0, size, bandSize / size);

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
  // Need the translation here to account for empty spaces when rotated
  ctx.translate(-bandSize * 3, -bandSize * 3);
  // log("Returning to ", -(center.x), -(center.y));

  // TODO: Change k max value to relative value
  for (let k = 0; k < 25; k++) {
    drawBand(ctx, size, bandSize, 0, k * bandSize, colorArray);
  }
  ctx.restore();
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
