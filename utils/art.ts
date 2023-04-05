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
  {
    xOffset,
    yOffset,
    width,
    height,
    thickness,
    fillStyle = "black",
  }: {
    /** x-axis offset of the top-left starting point */
    xOffset: number;
    /** y-axis offset of the top-left starting point */
    yOffset: number;
    /** Total width of frame */
    width: number;
    /** Total height of frame */
    height: number;
    /** Thickness of frame, must be > `0` to render something */
    thickness: number;
    fillStyle?: string;
  }
) => {
  ctx.fillStyle = fillStyle;
  // Top
  ctx.fillRect(xOffset, yOffset, width, thickness);
  // Left
  ctx.fillRect(xOffset, yOffset, thickness, height);
  // Right
  ctx.fillRect(xOffset + width - thickness, yOffset, thickness, height);
  // Bottom
  ctx.fillRect(xOffset, yOffset + height - thickness, width, thickness);
};
