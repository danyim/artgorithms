import React from "react";
import { useCanvasInteraction } from "../../../hooks/useCanvasInteraction";
import { drawRatioFrame } from "../../../utils/art";
import { drawConcentricCircles } from "./util";
import { SIZE_MIN, SIZE_MAX } from "./Canvas";

interface Props {
  width?: number;
  height?: number;
  size: number;
  onSizeChange?: (value: number) => void;
}

export const Canvas = ({ width, height, size, onSizeChange }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const lastYRef = React.useRef<number | null>(null);

  const { handlers } = useCanvasInteraction({
    canvasRef,
    horizontal: {
      min: SIZE_MIN,
      max: SIZE_MAX,
      onChange: onSizeChange,
    },
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handlers.onMouseMove(e);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const y = e.clientY - rect.top;
      if (lastYRef.current !== null && Math.abs(y - lastYRef.current) > 2) {
        draw();
      }
      lastYRef.current = y;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    handlers.onTouchMove(e);
    if (e.touches.length > 0) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const y = e.touches[0].clientY - rect.top;
        if (lastYRef.current !== null && Math.abs(y - lastYRef.current) > 2) {
          draw();
        }
        lastYRef.current = y;
      }
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 500, 500);

    // Art params

    const colors = [
      [66, 135, 85],
      [155, 120, 173],
      [225, 71, 43],
      [238, 201, 74],
      [119, 82, 79],
      [47, 121, 200],
      [225, 141, 59],
      [59, 45, 52],
      [177, 70, 64],
    ];

    // Calculate how many bands needed to fill the canvas (use diagonal + buffer for full coverage)
    const diagonal = Math.sqrt(width * width + height * height);
    const bands = Math.ceil(diagonal / size) + 2;

    drawConcentricCircles(ctx, width / 2, height, size, bands, colors);
    drawConcentricCircles(ctx, 0, 0, size, bands, colors);
    drawConcentricCircles(ctx, width, 0, size, bands, colors);
    drawRatioFrame(ctx, 0, 0, width, 0.015);
  };

  const handleOnClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
  };

  React.useEffect(() => {
    draw();
  }, [size, width, height]);
  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      />
      {typeof window !== "undefined" && window.localStorage.debug && (
        <>
          <button onClick={draw}>Redraw</button>
          <button onClick={handleOnClear}>Clear</button>
        </>
      )}
    </>
  );
};

export default Canvas;
