import React from "react";
import { drawOuterFrame } from "../../utils/art";
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

    drawConcentricCircles(ctx, width / 2, height, size, bands, colors);
    drawConcentricCircles(ctx, 0, 0, size, bands, colors);
    drawConcentricCircles(ctx, width, 0, size, bands, colors);
    drawOuterFrame(ctx, 0, 0, width, 0.015);
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
