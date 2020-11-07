import React from "react";
import debug from "debug";
import {
  centroid,
  findClosestDistanceToPoint,
  createWrappedRow,
  Point,
  printPt,
  pushIfTruthy,
} from "../../utils/polygon";
import {
  createSquareBounds,
  createInnerSquareBounds,
  generateRandomPointsInsideBounds,
  generateRandomPointsOnBounds,
  isVertexPoint,
  generateTriangleInsideBounds,
} from "./util";

const log = debug("canvas");
// const log = console.log;

interface Props {
  width?: number;
  height?: number;
  space: number;
}

export const Canvas = ({ width, height, space }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 500, 500);

    // Art params
    const numSquares = 100;
    const squareSize = 35;
    const padding = squareSize * 0.2;

    const wrappedRowPoints = createWrappedRow({
      numItems: numSquares,
      numPerLine: Math.sqrt(numSquares),
      width: squareSize,
      height: squareSize,
      padding: padding,
      offsetX: 0,
      offsetY: 0,
    });
    if (localStorage.getItem("debugShapes")) {
      wrappedRowPoints.forEach((pt) => {
        ctx.strokeRect(pt.x, pt.y, 5, 5);
      });
    }

    for (let k = 0; k < numSquares; k++) {
      const { container, bounds: squareBounds } = createSquareBounds(
        wrappedRowPoints[k].x,
        wrappedRowPoints[k].y,
        squareSize
      );

      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      let [x, y, w, h] = container;
      ctx.strokeRect(x, y, w, h);

      // Create the inner square bounds
      const innerSquareBounds = createInnerSquareBounds(ctx, squareBounds);

      // Create a randomly rotated and scaled isoceles triangle in the center and use its vertices
      const innerSquarePoints = generateTriangleInsideBounds(
        ctx,
        innerSquareBounds
      );

      // Chose 6 random points along the edges of the outer box
      const boundaryPoints = generateRandomPointsOnBounds(ctx, squareBounds, 6);

      log("boundaryPoints", boundaryPoints.map(printPt));

      /** Find boundary points until all inner points are taken */
      while (innerSquarePoints.length > 0) {
        const polygonVertices: Point[] = [];
        const path = new Path2D();
        pushIfTruthy(polygonVertices, boundaryPoints.shift());
        pushIfTruthy(polygonVertices, boundaryPoints.shift());

        if (
          isVertexPoint(
            polygonVertices[Math.max(polygonVertices.length - 1, 0)],
            squareBounds
          )
        ) {
          pushIfTruthy(polygonVertices, boundaryPoints.shift());
        }

        // Create the centroid
        const centerPoint = centroid(polygonVertices);
        if (localStorage.getItem("debugShapes")) {
          ctx.strokeStyle = "green";
          ctx.strokeRect(centerPoint.x, centerPoint.y, 5, 5);
        }

        // Find the inner square vertex that's closest to the polygon center
        const closestInnerVertex = findClosestDistanceToPoint(
          centerPoint,
          innerSquarePoints
        );
        // Remove the point from the pool
        innerSquarePoints = innerSquarePoints.filter(
          ({ x, y }: Point) =>
            x !== closestInnerVertex.x && y !== closestInnerVertex.y
        );
        log("polygonVertices", polygonVertices.map(printPt));
        log("  ", [closestInnerVertex].map(printPt));
        polygonVertices.push(closestInnerVertex);

        // Draw the polygon
        polygonVertices.forEach((point: Point, index: number) => {
          if (index === 0) {
            path.moveTo(point.x, point.y);
            return;
          }

          path.lineTo(point.x, point.y);

          // Clean up and draw if this is the last vertex
          if (index === polygonVertices.length - 1) {
            path.closePath();
            ctx.strokeStyle = "black";
            ctx.stroke(path);
          }
        });
      }
    }
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
  }, [space]);
  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} />
      {localStorage.debug && (
        <>
          <button onClick={draw}>Redraw</button>
          <button onClick={handleOnClear}>Clear</button>
        </>
      )}
    </>
  );
};

export default Canvas;
