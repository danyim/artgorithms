import debug from "debug";
import {
  Bounds,
  Point,
  printPt,
  randIntegerRange,
  randRange,
} from "../../utils/polygon";

const log = debug("utils");
// const log = console.log;

export const createSquareBounds = (x: number, y: number, length: number) => {
  return {
    container: [x, y, length, length],
    bounds: { xMin: x, xMax: x + length, yMin: y, yMax: y + length } as Bounds,
  };
};

export const createInnerSquareBounds = (
  ctx: CanvasRenderingContext2D,
  bounds: Bounds
) => {
  // Construct the bounds of the inner square based on a factor of the larger square
  const innerRectFactor = 0.6; // Higher = smaller box
  const innerRectBounds: Bounds = {
    xMin: bounds.xMin + (innerRectFactor * (bounds.xMax - bounds.xMin)) / 2,
    xMax: bounds.xMax - (innerRectFactor * (bounds.xMax - bounds.xMin)) / 2,
    yMin: bounds.yMin + (innerRectFactor * (bounds.yMax - bounds.yMin)) / 2,
    yMax: bounds.yMax - (innerRectFactor * (bounds.yMax - bounds.yMin)) / 2,
  };

  if (localStorage.getItem("debugShapes")) {
    ctx.fillStyle = "rgba(255,0,0,0.4)";
    ctx.fillRect(
      innerRectBounds.xMin,
      innerRectBounds.yMin,
      innerRectBounds.xMax - innerRectBounds.xMin,
      innerRectBounds.yMax - innerRectBounds.yMin
    );
  }

  return innerRectBounds;
};

export const generateRandomPointsInsideBounds = (
  ctx: CanvasRenderingContext2D,
  bounds: Bounds,
  numPoints: number
): Point[] => {
  const debugSqSize = 3;
  // Generate n random points
  const points: Point[] = [];
  for (let k = 0; k < numPoints; k++) {
    points.push({
      x: randIntegerRange(bounds.xMin, bounds.xMax),
      y: randIntegerRange(bounds.yMin, bounds.yMax),
    });
  }

  if (localStorage.getItem("debugShapes")) {
    // Draw the points
    for (let point of points) {
      const { x, y } = point;
      ctx.strokeRect(x, y, debugSqSize, debugSqSize);
    }
  }

  return points;
};

export const generateRandomPointsOnBounds = (
  ctx: CanvasRenderingContext2D,
  bounds: Bounds,
  numPoints: number
) => {
  const debugSqSize = 3;
  // The idea of this algorithm is to "flatten" the bounds of the square onto a single line from 0
  // to sum(sides * 4) Assuming it's a square, so len(x) === len(y). We'll call this line the
  // "range"

  const sideLength = bounds.xMax - bounds.xMin;
  const totalLength = sideLength * 4;
  /** Max distance that a second point in a pair can be from the first */
  const maxPairDistance = sideLength;
  // Generate random points along a straight line
  const randRangePoints: number[] = [];

  log("maxPairDistance", maxPairDistance);
  log("totalLength", totalLength);
  let lastRangePoint = 0;
  // Create pairs of points
  for (let k = 0; k < numPoints / 2; k++) {
    // Start a pair relative to the last recorded point
    lastRangePoint = lastRangePoint + randIntegerRange(0, sideLength);
    randRangePoints.push(lastRangePoint);
    const nextRangePoint =
      (lastRangePoint +
        randIntegerRange(maxPairDistance / 2, maxPairDistance)) %
      totalLength;

    // Evaluate if we need to include a corner point
    if (
      getRangeQuartile(lastRangePoint, totalLength) !==
      getRangeQuartile(nextRangePoint, totalLength)
    ) {
      // log("CORNER: Between", lastRangePoint, "and", nextRangePoint);
      // Given that we know that the two quartiles of the pairs are different, idenitfy which corner
      // need to add and push the appropriate range value to the list
      const cornerRangeValue = getPreviousQuartileRangeValue(
        getRangeQuartile(nextRangePoint, totalLength),
        totalLength
      );
      randRangePoints.push(cornerRangeValue);
    }
    randRangePoints.push(nextRangePoint);
    lastRangePoint = nextRangePoint;
    log("pair:", randRangePoints.slice(randRangePoints.length - 3));
  }

  log("points:", randRangePoints);
  const points = translateRangeToPoints(
    ctx,
    randRangePoints,
    sideLength,
    bounds
  );
  log("translated points:", points.map(printPt));
  log(" ");

  return points;
};

/** Translates range points into points along the bounds */
export const translateRangeToPoints = (
  ctx: CanvasRenderingContext2D,
  rangePoints: number[],
  sideLength: number,
  bounds: Bounds
): Point[] => {
  const debugSqSize = 3;

  // Translated points in the coordinate system
  const points: Point[] = [];

  // Translate the points along the flattened "range" into 2D coordinates
  for (let point of rangePoints) {
    let translatedPoint;
    if (point < sideLength) {
      // Top edge
      translatedPoint = {
        x: bounds.xMin + point,
        y: bounds.yMin,
      };
      ctx.strokeStyle = "purple";
    } else if (point >= sideLength && point < sideLength * 2) {
      // Right edge
      translatedPoint = {
        x: bounds.xMax,
        y: bounds.yMin + (point - sideLength),
      };
      ctx.strokeStyle = "blue";
    } else if (point >= sideLength * 2 && point < sideLength * 3) {
      // Bottom edge
      translatedPoint = {
        x: bounds.xMax - (point - sideLength * 2),
        y: bounds.yMax,
      };
      ctx.strokeStyle = "red";
    } else if (point >= sideLength * 3) {
      // Left edge
      translatedPoint = {
        x: bounds.xMin,
        y: bounds.yMax - (point - sideLength * 3),
      };
      ctx.strokeStyle = "green";
    }
    if (localStorage.getItem("debugShapes")) {
      ctx.strokeRect(
        translatedPoint.x,
        translatedPoint.y,
        debugSqSize,
        debugSqSize
      );
    }
    points.push(translatedPoint);
  }

  return points;
};

export const createQuadrants = (
  ctx: CanvasRenderingContext2D,
  bounds: Bounds
) => {
  const q1Bounds: Bounds = {
    xMin: (bounds.xMax - bounds.xMin) / 2,
    xMax: bounds.xMax,
    yMin: bounds.yMin,
    yMax: (bounds.yMax - bounds.yMin) / 2,
  }; // Upper right quadrant

  const debugSqSize = 3;
  ctx.rect(q1Bounds.xMin, q1Bounds.yMin, debugSqSize, debugSqSize);
  ctx.rect(q1Bounds.xMax, q1Bounds.yMax, debugSqSize, debugSqSize);
  ctx.rect(q1Bounds.xMin, q1Bounds.yMax, debugSqSize, debugSqSize);
  ctx.rect(q1Bounds.xMax, q1Bounds.yMin, debugSqSize, debugSqSize);

  const xAxisPt = [randRange(q1Bounds.xMin, q1Bounds.xMax), q1Bounds.yMin];
  const yAxisPt = [q1Bounds.xMax, randRange(q1Bounds.yMin, q1Bounds.yMax)];

  ctx.fillStyle = "red";
  ctx.fillRect(xAxisPt[0], xAxisPt[1], debugSqSize, debugSqSize);
  ctx.fillRect(yAxisPt[0], yAxisPt[1], debugSqSize, debugSqSize);

  const biasFactor = 0.6;
  const middlePt = [
    randRange(
      q1Bounds.xMin + (biasFactor * (q1Bounds.xMax - q1Bounds.xMin)) / 2,
      q1Bounds.xMax - (biasFactor * (q1Bounds.xMax - q1Bounds.xMin)) / 2
    ),
    randRange(
      q1Bounds.yMin + (biasFactor * (q1Bounds.yMax - q1Bounds.yMin)) / 2,
      q1Bounds.yMax
    ),
  ];
  ctx.fillRect(middlePt[0], middlePt[1], debugSqSize, debugSqSize);

  const path = new Path2D();
  path.moveTo(xAxisPt[0], xAxisPt[1]);
  path.lineTo(q1Bounds.xMax, q1Bounds.yMin);
  path.lineTo(yAxisPt[0], yAxisPt[1]);
  path.lineTo(middlePt[0], middlePt[1]);
  path.closePath();
  ctx.fillStyle = "blue";
  ctx.fill(path);
};

/** An ugly function that will tell you which quartile a value is in from a given range */
export const getRangeQuartile = (value: number, maxValue: number) => {
  if (value / maxValue <= 0.25) {
    return 1;
  } else if (value / maxValue > 0.25 && value / maxValue <= 0.5) {
    return 2;
  } else if (value / maxValue > 0.5 && value / maxValue <= 0.75) {
    return 3;
  } else if (value / maxValue > 0.75) {
    return 4;
  }
};

export const getPreviousQuartileRangeValue = (
  quartile: number,
  maxRange: number
): number => {
  switch (quartile) {
    case 1:
      // Top left
      return 0;
    case 2:
      // Top right
      return maxRange / 4;
    case 3:
      // Bottom right
      return maxRange / 2;
    case 4:
      // Bottom left
      return (3 / 4) * maxRange;
    default:
      return undefined;
  }
};

export const nextQuartileToCorner = (
  quartile: number,
  bounds: Bounds
): Point => {
  switch (quartile) {
    case 1:
      // Top left
      return { x: bounds.xMin, y: bounds.yMin };
    case 2:
      // Top right
      return { x: bounds.xMax, y: bounds.yMin };
    case 3:
      // Bottom right
      return { x: bounds.xMax, y: bounds.yMax };
    case 4:
      // Bottom left
      return { x: bounds.xMin, y: bounds.yMin };
  }
};

export const isVertexPoint = (point: Point, bounds: Bounds) =>
  (point.x == bounds.xMin && point.y === bounds.yMin) ||
  (point.x == bounds.xMax && point.y === bounds.yMin) ||
  (point.x == bounds.xMax && point.y === bounds.yMax) ||
  (point.x == bounds.xMin && point.y === bounds.yMin);
