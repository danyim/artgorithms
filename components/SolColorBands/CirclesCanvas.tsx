import React from "react";
import { drawRatioFrame } from "../../utils/art";
import { drawConcentricCircles } from "./util";

interface Props {
  width?: number;
  height?: number;
  size: number;
  bands: number;
}

export const Canvas = ({ width, height, size, bands }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

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
  }, [bands, size, width, height]);
  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleOnMouseMove}
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
