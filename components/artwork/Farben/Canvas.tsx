import React from "react";
import { useCanvasInteraction } from "../../../hooks/useCanvasInteraction";
import { randomHueColor } from "../../../utils/color";
import { createWrappedRow } from "../../../utils/polygon";

export const SIZE_MIN = 4;
export const SIZE_MAX = 16;
export const SPACE_MIN = 0;
export const SPACE_MAX = 20;

interface Props {
  width: number;
  height: number;
  space: number;
  size: number;
  saturation: number;
  outline: boolean;
  onSizeChange?: (value: number) => void;
  onSpaceChange?: (value: number) => void;
  onReset?: () => void;
}

export const Canvas = ({
  width,
  height,
  space,
  size,
  saturation,
  outline,
  onSizeChange,
  onSpaceChange,
  onReset,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const { handlers } = useCanvasInteraction({
    canvasRef,
    horizontal: {
      min: SIZE_MIN,
      max: SIZE_MAX,
      onChange: onSizeChange,
    },
    vertical: {
      min: SPACE_MIN,
      max: SPACE_MAX,
      onChange: onSpaceChange,
    },
  });

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    const boxWidth = 55;
    const boxHeight = 22;

    // Size directly controls number of columns
    const numCols = size;
    // Calculate rows to maintain roughly square visual aspect ratio
    const numRows = Math.round((numCols * boxWidth) / boxHeight);

    // Calculate grid dimensions
    const gridWidth = numCols * (boxWidth + space) - space;
    const gridHeight = numRows * (boxHeight + space) - space;

    // Center the grid on the canvas
    const offsetX = Math.max(0, (width - gridWidth) / 2);
    const offsetY = Math.max(0, (height - gridHeight) / 2);

    const drawFn = outline ? fillRectWithLines : fillRect;
    createWrappedRow({
      numItems: numCols * numRows,
      numPerLine: numCols,
      width: boxWidth,
      height: boxHeight,
      padding: space,
      offsetX,
      offsetY,
    })
      .filter(
        (point) =>
          point.x + boxWidth <= width && point.y + boxHeight <= height
      )
      .forEach((point) => {
        drawFn(
          ctx,
          point.x,
          point.y,
          boxWidth,
          boxHeight,
          randomHueColor({ max: saturation, min: 15 }, { max: 75, min: 15 }),
          randomHueColor({ max: saturation, min: 15 }, { max: 75, min: 15 })
        );
      });
  };

  const fillRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    stokeColor: string = "",
    fillColor: string = ""
  ) => {
    ctx.save();
    ctx.translate(x, y);

    if (fillColor) ctx.fillStyle = fillColor;
    if (stokeColor) ctx.strokeStyle = stokeColor;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  };

  const fillRectWithLines = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    stokeColor: string = "",
    fillColor: string = ""
  ) => {
    ctx.save();
    ctx.translate(x, y);

    ctx.beginPath();

    if (fillColor) ctx.fillStyle = fillColor;
    if (stokeColor) ctx.strokeStyle = stokeColor;
    ctx.lineWidth = 2;

    // Top
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    // Right
    ctx.moveTo(w, 0);
    ctx.lineTo(w, h);
    // Bottom
    ctx.moveTo(0, h);
    ctx.lineTo(w, h);
    // Left
    ctx.moveTo(0, 0);
    ctx.lineTo(0, h);

    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  };

  React.useEffect(() => {
    draw();
  }, [space, width, height, size, saturation, outline]);

  const handleDoubleClick = () => {
    onReset?.();
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handlers.onMouseMove}
      onTouchMove={handlers.onTouchMove}
      onDoubleClick={handleDoubleClick}
    />
  );
};

export default Canvas;
