import React from "react";
import { drawBands } from "../SolColorBands/util";

interface Props {
  width?: number;
  height?: number;
  space: number;
}

export const Canvas = ({ width, height, space }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

  const handleOnMouseMove = () => {
    // draw();
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
    const bandSize = 14;

    drawBands(
      ctx,
      0,
      0,
      bandSize,
      width / 10,
      0,
      [
        [0, 0, 0],
        [255, 255, 255],
      ],
      false
    );

    const radius = width * 0.4;
    const numBands = 35;
    const size = bandSize * numBands;
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
    ctx.clip();
    ctx.translate(0, 13);
    drawBands(
      ctx,
      width / 2 - size / 2,
      height / 2 - size / 2,
      bandSize,
      numBands,
      90,
      [
        [0, 0, 0],
        [255, 255, 255],
      ],
      false
    );
    ctx.restore();
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
  }, [space, width, height]);

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
