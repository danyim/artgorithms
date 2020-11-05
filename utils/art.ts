/** Create a frame */
export const drawRatioFrame = (
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

/** Draws a frame with a thickness and width & height */
export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  xOffset: number,
  yOffset: number,
  width: number,
  height: number,
  thickness: number
) => {
  ctx.fillStyle = "black";
  ctx.fillRect(xOffset, yOffset, width, thickness);
  ctx.fillRect(xOffset, yOffset, thickness, height);
  ctx.fillRect(xOffset + width - thickness, yOffset, thickness, height);
  ctx.fillRect(xOffset, yOffset + height - thickness, width, thickness);
};
