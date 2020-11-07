import React from "react";
import { drawFrame, drawRatioFrame } from "../../utils/art";
import { Bounds } from "../../utils/polygon";
import {
  drawBands,
  drawConcentricCircles,
  drawConcentricTriangles,
} from "./util";

interface Props {
  width?: number;
  height?: number;
  size: number;
  bands: number;
}

export const CompositeCanvas2 = ({ width, height, size, bands }: Props) => {
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
      // [31, 100, 189],
      // [237, 214, 90],
      // [205, 84, 50],
      // [74, 73, 156],
      // [99, 153, 49],
      // [165, 165, 165],
      // [34, 105, 193],
      // [173, 49, 44],
      // [240, 218, 93],
      // [34, 105, 193],
      // [170, 170, 170],
      // [209, 90, 54],
      // [78, 76, 160],
      // [32, 32, 32],

      [248, 201, 69],
      [176, 35, 34],
      [50, 118, 39],
      [238, 93, 42],
      [27, 86, 156],
      [62, 42, 97],
    ];

    const frameSize = 5;

    const bounds = [];
    bounds.push({
      xMin: 0,
      xMax: width / 3 + frameSize / 2,
      yMin: 0,
      yMax: height,
    });

    bounds.push({
      xMin: (1 * width) / 3 - frameSize / 2,
      xMax: (2 * width) / 3 + frameSize / 2,
      yMin: 0,
      yMax: height,
    });

    bounds.push({
      xMin: (2 * width) / 3 - frameSize,
      xMax: width,
      yMin: 0,
      yMax: height / 2 + frameSize / 2,
    });

    bounds.push({
      xMin: (2 * width) / 3 - frameSize,
      xMax: width,
      yMin: height / 2 - frameSize / 2,
      yMax: height,
    });

    bounds.forEach((bound: Bounds, index: number) => {
      ctx.save();

      const clipPath = new Path2D();
      clipPath.rect(bound.xMin, bound.yMin, bound.xMax, bound.yMax);
      ctx.clip(clipPath);

      switch (index) {
        case 0:
          drawBands(ctx, bound.xMin, bound.yMin, size, bands, 45, colors);
          break;
        case 1:
          drawBands(ctx, bound.xMin, bound.yMin, size, bands, 0, colors);
          break;
        case 2:
          drawConcentricCircles(
            ctx,
            bound.xMax,
            bound.yMin,
            size,
            bands,
            colors
          );
          break;

        case 3:
          drawConcentricCircles(
            ctx,
            bound.xMin,
            bound.yMax,
            size,
            bands,
            colors
          );
          break;
      }
      ctx.restore();
      drawFrame(
        ctx,
        bound.xMin,
        bound.yMin,
        bound.xMax - bound.xMin,
        bound.yMax - bound.yMin,
        frameSize
      );
    });
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
      {localStorage.debug && (
        <>
          <button onClick={draw}>Redraw</button>
          <button onClick={handleOnClear}>Clear</button>
        </>
      )}
    </>
  );
};

export default CompositeCanvas2;
