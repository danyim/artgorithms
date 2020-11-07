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
      {/* <button onClick={draw}>Redraw</button>
      <button onClick={handleOnClear}>Clear</button> */}
    </>
  );
};

export default Canvas;
