import React from "react";
import { useCanvasInteraction } from "../../../hooks/useCanvasInteraction";
import { drawRatioFrame } from "../../../utils/art";
import { drawConcentricCircles, drawConcentricTriangles } from "./util";

export const SIZE_MIN = 3;
export const SIZE_MAX = 50;

interface Props {
  width?: number;
  height?: number;
  size: number;
  onSizeChange?: (value: number) => void;
  onReset?: () => void;
}

export const Canvas = ({ width, height, size, onSizeChange, onReset }: Props) => {
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

  // Combined handler: horizontal for size, vertical for rerender
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handlers.onMouseMove(e);

    // Trigger redraw on vertical movement
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
      [31, 100, 189],
      [237, 214, 90],
      [205, 84, 50],
      [74, 73, 156],
      [99, 153, 49],
      [165, 165, 165],
      [34, 105, 193],
      [173, 49, 44],
      [240, 218, 93],
      [34, 105, 193],
      [170, 170, 170],
      [209, 90, 54],
      [78, 76, 160],
      [32, 32, 32],
    ];
    // Calculate how many bands needed to fill the canvas (use diagonal + buffer for full coverage)
    const diagonal = Math.sqrt(width * width + height * height);
    const bands = Math.ceil(diagonal / size) + 2;

    drawConcentricTriangles(
      ctx,
      width / 2,
      width / 2,
      size,
      bands,
      180,
      colors
    );
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

  const handleDoubleClick = () => {
    onReset?.();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onDoubleClick={handleDoubleClick}
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
