import React from "react";
import debug from "debug";
import {
  Bounds,
  createWrappedRow,
  Point,
  printPt,
} from "../../../utils/polygon";
import {
  createSquareBounds,
  createInnerSquareBounds,
  generateRandomPointsOnBounds,
  generatePolygonInsideBounds,
} from "./util";

type Edge = "top" | "right" | "bottom" | "left";

/** Determine which edge of the bounds a point is on */
const getEdge = (pt: Point, bounds: Bounds): Edge | null => {
  const tolerance = 1;
  if (Math.abs(pt.y - bounds.yMin) < tolerance) return "top";
  if (Math.abs(pt.x - bounds.xMax) < tolerance) return "right";
  if (Math.abs(pt.y - bounds.yMax) < tolerance) return "bottom";
  if (Math.abs(pt.x - bounds.xMin) < tolerance) return "left";
  return null;
};

/** Get the corner point between two adjacent edges */
const getCornerBetweenEdges = (
  edge1: Edge,
  edge2: Edge,
  bounds: Bounds,
): Point | null => {
  const edges = [edge1, edge2].sort();
  if (edges[0] === "left" && edges[1] === "top") {
    return { x: bounds.xMin, y: bounds.yMin };
  }
  if (edges[0] === "right" && edges[1] === "top") {
    return { x: bounds.xMax, y: bounds.yMin };
  }
  if (edges[0] === "bottom" && edges[1] === "right") {
    return { x: bounds.xMax, y: bounds.yMax };
  }
  if (edges[0] === "bottom" && edges[1] === "left") {
    return { x: bounds.xMin, y: bounds.yMax };
  }
  return null;
};

const log = debug("canvas");
// const log = console.log;

const MAX_GENERATION_ATTEMPTS = 50;

/** Check if two line segments intersect (excluding shared endpoints) */
const segmentsIntersect = (
  p1: Point,
  p2: Point,
  p3: Point,
  p4: Point,
): boolean => {
  // Skip if segments share an endpoint
  if (
    (p1.x === p3.x && p1.y === p3.y) ||
    (p1.x === p4.x && p1.y === p4.y) ||
    (p2.x === p3.x && p2.y === p3.y) ||
    (p2.x === p4.x && p2.y === p4.y)
  ) {
    return false;
  }

  const d1 = direction(p3, p4, p1);
  const d2 = direction(p3, p4, p2);
  const d3 = direction(p1, p2, p3);
  const d4 = direction(p1, p2, p4);

  if (
    ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
    ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))
  ) {
    return true;
  }
  return false;
};

const direction = (p1: Point, p2: Point, p3: Point): number => {
  return (p3.x - p1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (p3.y - p1.y);
};

/** Check if any edges from different polygons intersect */
const polygonsIntersect = (polygons: Point[][]): boolean => {
  for (let i = 0; i < polygons.length; i++) {
    for (let j = i + 1; j < polygons.length; j++) {
      const poly1 = polygons[i];
      const poly2 = polygons[j];
      // Check each edge of poly1 against each edge of poly2
      for (let a = 0; a < poly1.length; a++) {
        const a1 = poly1[a];
        const a2 = poly1[(a + 1) % poly1.length];
        for (let b = 0; b < poly2.length; b++) {
          const b1 = poly2[b];
          const b2 = poly2[(b + 1) % poly2.length];
          if (segmentsIntersect(a1, a2, b1, b2)) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

/** Shrink only the inner vertex toward centroid, keeping boundary points fixed */
const shrinkPolygon = (
  vertices: Point[],
  factor: number,
  bounds: Bounds,
): Point[] => {
  const centroid = {
    x: vertices.reduce((sum, v) => sum + v.x, 0) / vertices.length,
    y: vertices.reduce((sum, v) => sum + v.y, 0) / vertices.length,
  };

  return vertices.map((v) => {
    const edge = getEdge(v, bounds);
    // Also check if it's a corner point
    const isCorner =
      (v.x === bounds.xMin || v.x === bounds.xMax) &&
      (v.y === bounds.yMin || v.y === bounds.yMax);

    if (edge || isCorner) {
      // Point is on boundary - keep it exactly where it is
      return v;
    }
    // Inner vertex - shrink toward centroid
    return {
      x: centroid.x + (v.x - centroid.x) * factor,
      y: centroid.y + (v.y - centroid.y) * factor,
    };
  });
};

/** Build a polygon from boundary points, adding corners if needed */
const buildPolygon = (
  bp1: Point,
  bp2: Point,
  innerVertex: Point,
  bounds: Bounds,
): Point[] => {
  const vertices: Point[] = [bp1];

  // Check if the two boundary points are on different adjacent edges
  const edge1 = getEdge(bp1, bounds);
  const edge2 = getEdge(bp2, bounds);
  if (edge1 && edge2 && edge1 !== edge2) {
    const corner = getCornerBetweenEdges(edge1, edge2, bounds);
    if (corner) {
      vertices.push(corner);
    }
  }

  vertices.push(bp2);
  vertices.push(innerVertex);
  return vertices;
};

/** Calculate the angle at vertex C in triangle ABC (in degrees) */
const calculateAngleAtVertex = (a: Point, b: Point, c: Point): number => {
  const ca = { x: a.x - c.x, y: a.y - c.y };
  const cb = { x: b.x - c.x, y: b.y - c.y };
  const dotProduct = ca.x * cb.x + ca.y * cb.y;
  const magnitudeCA = Math.sqrt(ca.x * ca.x + ca.y * ca.y);
  const magnitudeCB = Math.sqrt(cb.x * cb.x + cb.y * cb.y);
  const cosAngle = dotProduct / (magnitudeCA * magnitudeCB);
  return Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);
};

/** Calculate polygon area using shoelace formula */
const calculatePolygonArea = (vertices: Point[]): number => {
  let area = 0;
  const n = vertices.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += vertices[i].x * vertices[j].y;
    area -= vertices[j].x * vertices[i].y;
  }
  return Math.abs(area) / 2;
};

/** Calculate total coverage ratio of polygons within bounds */
const calculateCoverageRatio = (
  polygons: Point[][],
  bounds: Bounds,
): number => {
  const boundsArea = (bounds.xMax - bounds.xMin) * (bounds.yMax - bounds.yMin);
  const totalPolygonArea = polygons.reduce(
    (sum, poly) => sum + calculatePolygonArea(poly),
    0,
  );
  return totalPolygonArea / boundsArea;
};

/** Check if all inner vertex angles are within acceptable bounds */
const validatePolygonAngles = (
  boundaryPoints: Point[],
  innerPoints: Point[],
  numPolygons: number,
  minAngle: number,
  maxAngle: number,
): boolean => {
  for (let i = 0; i < numPolygons; i++) {
    // Each polygon has 2 boundary points + 1 inner point
    const bp1 = boundaryPoints[i * 2];
    const bp2 = boundaryPoints[i * 2 + 1];
    const innerPt = innerPoints[i];
    if (!bp1 || !bp2 || !innerPt) return false;
    // Check angle at inner vertex between the two boundary points
    const angle = calculateAngleAtVertex(bp1, bp2, innerPt);
    if (angle < minAngle || angle > maxAngle) {
      return false;
    }
  }
  return true;
};

// Color palette for color mode (inspired by colorful textile grid)
const COLOR_PALETTE = [
  "#B0C29E",
  "#BCDDD7",
  "#F1D0E4",
  "#E1CBF1",
  "#FCF8EB",
  // "#D4C94A", // Chartreuse yellow
  // "#3AADB8", // Teal
  // "#C75B2A", // Burnt orange
  // "#E8B4C8", // Pink
  // "#7B8BA6", // Slate blue
  // "#6B5344", // Chocolate brown
  // "#1E3A5F", // Navy blue
  // "#C42034", // Crimson red
  // "#F5E6C8", // Cream
  // "#2D5A5A", // Dark teal
  // "#E07B54", // Coral
  // "#8FA07A", // Sage green
  // "#4A1C2A", // Burgundy
  // "#E8D06A", // Pale yellow
];

/** Shuffle array and return first n elements (Fisher-Yates) */
const getShuffledColors = (count: number): string[] => {
  const shuffled = [...COLOR_PALETTE];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

interface Props {
  width?: number;
  height?: number;
  size: number;
  colorMode?: boolean;
  shrinkFactor?: number;
  minCoverage?: number;
  minAngle?: number;
  maxAngle?: number;
}

export const Canvas = ({
  width,
  height,
  size,
  colorMode = false,
  shrinkFactor = 0.92,
  minCoverage = 0.35,
  minAngle = 8,
  maxAngle = 88,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, width, height);

    // Art params - size controls NxN grid
    const numSquares = size * size;
    const padding = 5;
    const squareSize = (Math.min(width, height) - padding * (size + 1)) / size;

    const wrappedRowPoints = createWrappedRow({
      numItems: numSquares,
      numPerLine: size,
      width: squareSize,
      height: squareSize,
      padding: padding,
      offsetX: padding,
      offsetY: padding,
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
        squareSize,
      );

      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      let [x, y, w, h] = container;
      ctx.strokeRect(x, y, w, h);

      // Create the inner square bounds
      const innerSquareBounds = createInnerSquareBounds(ctx, squareBounds);

      const squareCenterX = wrappedRowPoints[k].x + squareSize / 2;
      const squareCenterY = wrappedRowPoints[k].y + squareSize / 2;
      const getAngle = (pt: Point) =>
        Math.atan2(pt.y - squareCenterY, pt.x - squareCenterX);

      // Generate and validate points with angle constraints
      // Regenerate until polygons don't intersect and coverage is adequate
      let boundaryPoints: Point[];
      let innerSquarePoints: Point[];
      let polygons: Point[][] = [];
      let attempts = 0;
      const MAX_POLYGONS = 5;

      // Start with 3 polygons, increase if coverage is too low
      let numPolygons = 3;

      do {
        // Create randomly positioned inner points (one per polygon)
        innerSquarePoints = generatePolygonInsideBounds(
          ctx,
          innerSquareBounds,
          numPolygons,
        );

        // Generate boundary points (2 per polygon)
        boundaryPoints = generateRandomPointsOnBounds(
          ctx,
          squareBounds,
          numPolygons * 2,
        );

        // Sort by angle for non-intersecting polygons
        boundaryPoints.sort((a, b) => getAngle(a) - getAngle(b));
        innerSquarePoints.sort((a, b) => getAngle(a) - getAngle(b));

        // Build all polygons first to check for intersections
        polygons = [];
        const bpCopy = [...boundaryPoints];
        const innerCopy = [...innerSquarePoints];
        for (let i = 0; i < numPolygons; i++) {
          const bp1 = bpCopy.shift();
          const bp2 = bpCopy.shift();
          const inner = innerCopy.shift();
          if (bp1 && bp2 && inner) {
            polygons.push(buildPolygon(bp1, bp2, inner, squareBounds));
          }
        }

        // Check if we need more polygons for better coverage
        const coverage = calculateCoverageRatio(polygons, squareBounds);
        if (
          coverage < minCoverage &&
          numPolygons < MAX_POLYGONS &&
          attempts > 0 &&
          attempts % 10 === 0
        ) {
          numPolygons++;
        }

        attempts++;
      } while (
        (!validatePolygonAngles(
          boundaryPoints,
          innerSquarePoints,
          numPolygons,
          minAngle,
          maxAngle,
        ) ||
          polygonsIntersect(polygons)) &&
        attempts < MAX_GENERATION_ATTEMPTS
      );

      log("boundaryPoints", boundaryPoints.map(printPt));

      // Get shuffled colors for this square (no repeats within a frame)
      const colors = colorMode ? getShuffledColors(polygons.length) : [];

      // Draw each polygon with shrinking for padding
      polygons.forEach((polygon, idx) => {
        const shrunkPolygon = shrinkPolygon(
          polygon,
          shrinkFactor,
          squareBounds,
        );
        const path = new Path2D();

        shrunkPolygon.forEach((point: Point, index: number) => {
          if (index === 0) {
            path.moveTo(point.x, point.y);
          } else {
            path.lineTo(point.x, point.y);
          }
        });

        path.closePath();

        if (colorMode) {
          ctx.fillStyle = colors[idx];
          ctx.fill(path);
        }
        ctx.strokeStyle = "black";
        ctx.stroke(path);
      });
    }
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
  }, [
    size,
    width,
    height,
    colorMode,
    shrinkFactor,
    minCoverage,
    minAngle,
    maxAngle,
  ]);
  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} />
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
