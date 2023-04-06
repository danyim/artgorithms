import { getBit } from "../../utils/binary";
import { PartialFrameSide } from "../../utils/art";

export const getBordersForPattern = (
  /** Row and column tuple (0-based) */
  rowCol: [number, number],
  /** Size of the pattern (assumes NxN) */
  size: number,
  /** Pattern array */
  patternArray: number[]
): PartialFrameSide[] => {
  const [row, col] = rowCol;
  // Translates a row and column to an array index
  const pos = row * size + col;
  const pattern = patternArray[pos];
  // const flippedPos = patternBinary.length - 1 - pos;
  const borders: PartialFrameSide[] = [];

  if (getBit(pattern, 0)) {
    borders.push(PartialFrameSide.Right);
  }
  if (getBit(pattern, 1)) {
    borders.push(PartialFrameSide.Bottom);
  }
  if (getBit(pattern, 2)) {
    borders.push(PartialFrameSide.Top);
  }
  if (getBit(pattern, 3)) {
    borders.push(PartialFrameSide.Left);
  }

  // console.log({
  //   rowCol,
  //   "pattern@rc:": pattern,
  //   result: borders,
  // });

  return borders;
};
