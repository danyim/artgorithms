import React from "react";
import {
  centroid,
  closestDistToPoint,
  createWrappedRow,
  Point,
  pushIfTruthy,
} from "../../utils/polygon";
import {
  createQuadrants,
  createPoly,
  createSquareBounds,
  createInnerSquareBounds,
  generateRandomPointsInsideBounds,
  generateRandomPointsOnBounds,
  isVertexPoint,
} from "./util";

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
    const numSquares = 64;
    const squareSize = 40;
    const padding = squareSize * 0.2;

    const wrappedRowPoints = createWrappedRow({
      numItems: numSquares,
      numPerLine: 8,
      itemWidth: squareSize,
      padding: padding,
      offsetX: 0,
      offsetY: 0,
    });
    if (localStorage.getItem("debug")) {
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
      ctx.strokeRect(...container);

      // Create the inner square bounds
      const innerSquareBounds = createInnerSquareBounds(ctx, squareBounds);
      // Choose 3 random points within the inner square
      let innerSquarePoints = generateRandomPointsInsideBounds(
        ctx,
        innerSquareBounds,
        3
      );
      // Chose 6 random points along the edges of the outer box
      const boundaryPoints = generateRandomPointsOnBounds(ctx, squareBounds, 6);

      console.log("boundaryPoints", boundaryPoints);

      /** Method 1: Find boundary points until all inner points are taken */
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
        console.log("polygonVertices", polygonVertices);

        // Create the centroid
        const centerPoint = centroid(polygonVertices);
        if (localStorage.getItem("debug")) {
          ctx.strokeStyle = "green";
          ctx.strokeRect(centerPoint.x, centerPoint.y, 5, 5);
        }

        // Find the inner square vertex that's closest to the polygon center
        const closestInnerVertex = closestDistToPoint(
          centerPoint,
          innerSquarePoints
        );
        // Remove the point from the pool
        innerSquarePoints = innerSquarePoints.filter(
          ({ x, y }: Point) =>
            x !== closestInnerVertex.x && y !== closestInnerVertex.y
        );
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
      <button onClick={draw}>Redraw</button>
      <button onClick={handleOnClear}>Clear</button>
    </>
  );
};

export default Canvas;
