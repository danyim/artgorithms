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

export const closestDistToPoint = (point: Point, pointsToPick: Point[]) => {
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
  let x = Math.max(offsetX - (width + padding), 0);
  let y = Math.max(offsetY - (width + padding), 0);
  let itemsPlaced = 0;
  for (let row = 0; row <= Math.ceil(numItems / numPerLine); row++) {
    for (let col = 0; col < numPerLine; col++) {
      if (itemsPlaced >= numItems) {
        break;
      }
      x += width + padding;
      itemsPlaced++;
      positions.push({
        x,
        y,
      });
    }
    x = Math.max(offsetX - (width + padding), 0);
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
