export interface Bounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export interface Point {
  x: number;
  y: number;
}

/** Parameters for fill/stokeRect */
export interface RectParam {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Rotates a point about another */
export const rotatePoint = (center: Point, point: Point, angle: number) => {
  let x = point.x;
  let y = point.y;

  // Translate point back to origin
  x -= center.x;
  y -= center.y;

  // Rotate point
  let xnew = x * Math.cos(angle) - y * Math.sin(angle);
  let ynew = x * Math.sin(angle) + y * Math.cos(angle);

  // Translate point back:
  x = xnew + center.x;
  y = ynew + center.y;
  return { x, y };
};
/** Degrees to radians */
export const degToRad = (deg: number): number => deg * (Math.PI / 180);

/** Get the center point for a given bound */
export const getBoundsCenter = (bound: Bounds): Point => ({
  x: bound.xMin + (bound.xMax - bound.xMin) / 2,
  y: bound.yMin + (bound.yMax - bound.yMin) / 2,
});

/** For use in mapping points for console output */
export const printPt = (pt: Point) => [pt.x, pt.y]; // `(${pt.x},${pt.y})`;

/** Random real number in a given range */
export const randRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

/** Random integer in a given range */
export const randIntegerRange = (min: number, max: number) =>
  Math.floor(randRange(min, max));

/** Returns the center of gravity of a polygon, i.e. centoid */
export const centroid = (vertices: Point[]): Point => {
  const x = (a, v: Point) => a + v.x;
  const y = (a, v: Point) => a + v.y;
  return {
    x: vertices.reduce(x, 0) / vertices.length,
    y: vertices.reduce(y, 0) / vertices.length,
  };
};

export const vector = (a: Point, b: Point) => ({
  x: b.x - a.x,
  y: b.y - a.y,
});

/** Dot product of two points */
export const dot = (u: Point, v: Point) => u.x * v.x + u.y * v.y;

/** Euclidean distance between two points */
export const distance = (a: Point, b: Point) =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

export const findClosestDistanceToPoint = (
  point: Point,
  pointsToPick: Point[]
) => {
  let closestDistance: number = undefined;
  let closeastDistanceIndex;
  pointsToPick.forEach((pickPoint, index) => {
    const ptDistance = distance(point, pickPoint);

    if (!closestDistance || ptDistance < closestDistance) {
      closestDistance = ptDistance;
      closeastDistanceIndex = index;
    }
  });

  return pointsToPick[closeastDistanceIndex];
};

/** Pushes a value into an array if the value is truthy */
export function pushIfTruthy<A>(arr: A[], value: A) {
  if (value) {
    arr.push(value);
  }
}

/** Given certain parameters, this function will return the x,y positions of a wrapped row */
export const createWrappedRow = ({
  numItems,
  numPerLine,
  width,
  height,
  padding,
  offsetX,
  offsetY,
}: {
  numItems: number;
  numPerLine: number;
  width: number;
  height: number;
  padding: number;
  offsetX: number;
  offsetY: number;
}): Point[] => {
  // TODO: First position does _not_ start at 0,0 or offsetX,offsetY

  const positions: Point[] = [];
  let x = 0 + offsetX;
  let y = 0 + offsetY;
  let itemsPlaced = 0;
  for (let row = 0; row <= Math.ceil(numItems / numPerLine); row++) {
    for (let col = 0; col < numPerLine; col++) {
      if (itemsPlaced >= numItems) {
        break;
      }
      positions.push({
        x,
        y,
      });

      x += width + padding;
      itemsPlaced++;
    }
    x = offsetX;
    y += height + padding;
  }

  return positions;
};

/** Downsizes a square by a factor */
export const downsizeSquare = (
  squareSize: number,
  factor: number,
  offsetX: number = 0,
  offsetY: number = 0
): Point => {
  return {
    x: offsetX + (squareSize / 2 - (squareSize * factor) / 2),
    y: offsetY + (squareSize / 2 - (squareSize * factor) / 2),
  };
};

/** Returns the parameters to draw a square centered and scaled from the center as the origin (as
 * opposed to the top left) */
export const centerSquare = (x: number, y: number, size: number): RectParam => {
  return {
    x: x - size / 2,
    y: y - size / 2,
    w: size,
    h: size,
  };
};
