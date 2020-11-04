/** Create a frame */
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
