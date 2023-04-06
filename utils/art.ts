interface FrameParams {
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

export enum PartialFrameSide {
  Top,
  Right,
  Bottom,
  Left,
}

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

/** Draws a frame with a given thickness and width & height */
export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  {
    xOffset,
    yOffset,
    width,
    height,
    thickness,
    fillStyle = "black",
  }: FrameParams
) => {
  ctx.fillStyle = fillStyle;
  // Top
  ctx.fillRect(xOffset, yOffset, width, thickness);
  // Right
  ctx.fillRect(xOffset + width - thickness, yOffset, thickness, height);
  // Bottom
  ctx.fillRect(xOffset, yOffset + height - thickness, width, thickness);
  // Left
  ctx.fillRect(xOffset, yOffset, thickness, height);
};

/** Draws a partial frame with a given thickness and width & height */
export const drawPartialFrame = (
  ctx: CanvasRenderingContext2D,
  {
    xOffset,
    yOffset,
    width,
    height,
    thickness,
    fillStyle = "black",
    parts,
  }: FrameParams & {
    parts: PartialFrameSide[];
  }
) => {
  ctx.fillStyle = fillStyle;
  // Top
  if (parts.includes(PartialFrameSide.Top)) {
    ctx.fillRect(xOffset, yOffset, width, thickness);
  }
  // Right
  if (parts.includes(PartialFrameSide.Right)) {
    ctx.fillRect(xOffset + width - thickness, yOffset, thickness, height);
  }
  // Bottom
  if (parts.includes(PartialFrameSide.Bottom)) {
    ctx.fillRect(xOffset, yOffset + height - thickness, width, thickness);
  }
  // Left
  if (parts.includes(PartialFrameSide.Left)) {
    ctx.fillRect(xOffset, yOffset, thickness, height);
  }
};
