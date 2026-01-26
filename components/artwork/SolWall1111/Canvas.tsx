import React from "react";
import { drawConcentricCircleBands } from "./util";

interface Props {
  width?: number;
  height?: number;
  size: number;
  bands: number;
  onReset?: () => void;
}

export const Canvas = ({ width, height, bands, size, onReset }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleOnMouseMove = () => {
    draw();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, width, height);

    // Art params
    const colors = [
      [229, 204, 88],
      [182, 93, 40],
      [125, 151, 57],
      [88, 103, 178],
      [184, 95, 41],
      [132, 159, 67],
      [239, 214, 97],
      [165, 64, 46],
      [107, 89, 174],
      [149, 171, 91],
      [113, 121, 186],
      [241, 218, 103],
    ];

    // Calculate center and max radius to prevent drawing outside canvas bounds
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(centerX, centerY);

    drawConcentricCircleBands(ctx, centerX, centerY, size, bands, colors, maxRadius);
  };

  const handleOnClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
  };

  React.useEffect(() => {
    draw();
  }, [bands, size, width, height]);

  const handleDoubleClick = () => {
    onReset?.();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleOnMouseMove}
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
