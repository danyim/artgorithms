/**
 * Checks if a row and column value should be drawn based on the binary form of the `patternNumber`
 */
export const checkDraw = (
  /** Row and column tuple (0-based) */
  rowCol: [number, number],
  /** Total number of columns */
  totalColumns: number,
  /** Pattern to match (in decimal) */
  patternNumber: number
) => {
  const [row, col] = rowCol;
  const binaryPattern = patternNumber.toString(2);
  // The position of the binary string we'll be evaluating (translates row/col into a linear index)
  const pos = totalColumns * row + col;
  const flippedPos = binaryPattern.length - 1 - pos;
  // console.log({
  //   pattern: binaryPattern,
  //   position: position,
  //   flipped: flippedPos,
  //   flippedAt: binaryPattern[flippedPos],
  //   result: getBit(patternNumber, flippedPos),
  // });
  return getBit(patternNumber, flippedPos);
};

/**
 * Returns the bit value in the nth position of a binary number. Position increments from _right to left_.
 * @param number Binary number
 * @param pos 0-based position in the binary, starts from the right to left
 * @returns
 */
export const getBit = (number: number, pos: number) => {
  // console.log(
  //   `Number:${number}, bin:${number.toString(2)}, pos:${pos}, bit@pos:${
  //     number.toString(2)[pos]
  //   }`
  // );
  return (number >> pos) % 2 != 0;
};
