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
      drawFrame(ctx, {
        xOffset: bound.xMin,
        yOffset: bound.yMin,
        width: bound.xMax - bound.xMin,
        height: bound.yMax - bound.yMin,
        thickness: frameSize,
      });
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
      {typeof window !== "undefined" && window.localStorage.debug && (
        <>
          <button onClick={draw}>Redraw</button>
          <button onClick={handleOnClear}>Clear</button>
        </>
      )}
    </>
  );
};

export default CompositeCanvas2;
