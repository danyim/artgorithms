import React from "react";
import { Point, randRange } from "../../../utils/polygon";
import { useCanvasInteraction } from "../../../hooks/useCanvasInteraction";

// Control limits
export const DENSITY_MIN = 5000;
export const DENSITY_MAX = 25000;
export const LINE_WIDTH_MIN = 0.25;
export const LINE_WIDTH_MAX = 1;

// Fixed line length
const LINE_LENGTH = 12;

interface Props {
  width: number;
  height: number;
  density: number;
  lineWidth: number;
  onDensityChange?: (value: number) => void;
  onLineWidthChange?: (value: number) => void;
  onReset?: () => void;
}

export const Canvas = ({
  width,
  height,
  density,
  lineWidth,
  onDensityChange,
  onLineWidthChange,
  onReset,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const { handlers } = useCanvasInteraction({
    canvasRef,
    horizontal: {
      min: DENSITY_MIN,
      max: DENSITY_MAX,
      onChange: onDensityChange,
    },
    vertical: {
      min: LINE_WIDTH_MIN,
      max: LINE_WIDTH_MAX,
      decimals: 1,
      onChange: onLineWidthChange,
    },
  });

  const addLine = (
    ctx: CanvasRenderingContext2D,
    start: Point,
    end: Point,
    color: string = "black",
    width: number = 1,
  ) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    // Circle parameters
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.45;

    // Save context and clip to circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.clip();

    // Draw many short random lines within the circle
    // Use rejection sampling to get uniform distribution within circle
    for (let i = 0; i < density; i++) {
      // Generate random point within circle using rejection sampling
      let x: number, y: number;
      do {
        x = randRange(centerX - radius, centerX + radius);
        y = randRange(centerY - radius, centerY + radius);
      } while (Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) > radius);

      // Random angle for the line
      const angle = randRange(0, 2 * Math.PI);

      // Calculate line endpoints (centered on the random point)
      const halfLength = LINE_LENGTH / 2;
      const x1 = x - halfLength * Math.cos(angle);
      const y1 = y - halfLength * Math.sin(angle);
      const x2 = x + halfLength * Math.cos(angle);
      const y2 = y + halfLength * Math.sin(angle);

      addLine(ctx, { x: x1, y: y1 }, { x: x2, y: y2 }, "black", lineWidth);
    }

    ctx.restore();
  };

  React.useEffect(() => {
    draw();
  }, [density, lineWidth, width, height]);

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
      style={{ touchAction: "none" }}
    />
  );
};

export default Canvas;
