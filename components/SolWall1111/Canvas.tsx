import React from "react";
import { drawConcentricColorCircles } from "./util";

interface Props {
  width?: number;
  height?: number;
  size: number;
  bands: number;
}

export const Canvas = ({ width, height, bands, size }: Props) => {
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
      [189, 40, 56],
      [235, 79, 56],
      [77, 40, 109],
      [36, 99, 154],
      [55, 129, 43],
      [249, 205, 75],
    ];

    drawConcentricColorCircles(ctx, 250, 250, size, bands, colors);
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
      <button onClick={draw}>Redraw</button>
      <button onClick={handleOnClear}>Clear</button>
    </>
  );
};

export default Canvas;
