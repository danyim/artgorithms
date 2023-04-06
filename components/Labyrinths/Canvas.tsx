import React from "react";
import { getBordersForPattern } from "./util";
import { drawPartialFrame } from "utils/art";

interface Props {
  width?: number;
  height?: number;
  pattern: number;
}

export const Canvas = ({ width, height, pattern }: Props) => {
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
    ctx.clearRect(0, 0, width, height);

    /**
     * Similar to 50/50, the original artwork contains a 6x6 grid of a 4x4 pattern of disconnected lines, which mimic a labyrinth.
     *
     * Each 4x4 pattern can be represented by 4-bit bitfield, where each bit represents the drawing of a border:
     *    0000: no border
     *    0001: right border
     *    0100: top border
     *    0010: bottom border
     *    1000: left border
     * and combinations of various states of borders can be achieved by adding the bits together.
     *
     * The first "row" in top left pattern in the inspiration image translates to:
     *    1100 (top and left)
     *    0110 (top and bottom)
     *    0110 (top and bottom)
     *    0101 (top and right)
     *
     * Then the entire pattern of the top left square becomes:
     *    1100 0110 0110 0101 = 12  6   6   5
     *    1001 1100 0101 1001 = 9   12  5   9
     *    1001 1011 1001 1001 = 9   11  9   9
     *    1010 0110 0011 1011 = 10  6   3   11
     *
     * Working with 4 bits means that there are a total of 16 combinations.
     */

    const patternArray = [
      // Row 1
      [12, 6, 6, 5, 9, 12, 5, 9, 9, 11, 9, 9, 10, 6, 3, 11],
      [12, 6, 6, 5, 9, 12, 7, 9, 9, 10, 5, 9, 10, 6, 3, 11],
      [12, 6, 6, 5, 9, 12, 5, 9, 9, 9, 9, 9, 10, 3, 11, 11],
      [12, 6, 6, 5, 9, 12, 5, 9, 10, 3, 9, 9, 14, 6, 3, 11],
      [12, 6, 6, 5, 10, 5, 13, 9, 12, 3, 9, 9, 10, 6, 3, 11],
      [12, 6, 6, 5, 10, 6, 5, 9, 12, 6, 3, 9, 10, 6, 7, 11],
      // Row 2
      [12, 6, 6, 5, 10, 6, 5, 9, 12, 7, 9, 9, 10, 6, 3, 11],
      [12, 6, 6, 5, 10, 6, 5, 9, 12, 5, 9, 9, 11, 10, 3, 11],
      [12, 5, 12, 5, 9, 10, 3, 9, 9, 14, 5, 9, 10, 6, 3, 11],
      [12, 5, 12, 5, 9, 10, 3, 9, 9, 12, 5, 9, 10, 3, 11, 11],
      [12, 5, 12, 5, 9, 10, 3, 9, 10, 6, 5, 9, 14, 6, 3, 11],
      [12, 5, 12, 5, 9, 9, 9, 9, 9, 10, 3, 9, 10, 6, 7, 11],
      // Row 3
      [12, 5, 12, 5, 9, 9, 9, 9, 9, 9, 9, 9, 11, 10, 3, 11],
      [12, 5, 12, 5, 9, 9, 9, 9, 9, 11, 9, 9, 10, 6, 3, 11],
      [12, 7, 12, 5, 10, 5, 9, 9, 12, 3, 9, 9, 10, 6, 3, 11],
      [12, 7, 12, 5, 9, 12, 3, 9, 9, 10, 5, 9, 10, 6, 3, 11],
      [12, 6, 6, 5, 10, 5, 12, 3, 12, 3, 10, 5, 10, 6, 7, 11],
      [12, 6, 6, 5, 9, 12, 6, 3, 9, 10, 6, 5, 10, 6, 7, 11],
      // Row 4
      [12, 6, 6, 5, 9, 12, 6, 3, 9, 10, 7, 13, 10, 6, 6, 3],
      [12, 6, 6, 5, 9, 12, 6, 3, 9, 11, 14, 5, 10, 6, 6, 3],
      [12, 6, 6, 5, 9, 14, 6, 3, 9, 14, 6, 5, 10, 6, 6, 3],
      [12, 7, 14, 5, 9, 12, 6, 3, 9, 10, 6, 5, 10, 6, 6, 3],
      [12, 6, 6, 5, 9, 13, 12, 3, 9, 10, 3, 13, 10, 6, 6, 3],
      [12, 6, 6, 5, 10, 5, 12, 3, 12, 3, 11, 13, 10, 6, 6, 3],
      // Row 5
      [12, 6, 6, 5, 11, 12, 6, 3, 13, 10, 6, 5, 10, 6, 6, 3],
      [12, 6, 6, 5, 10, 5, 14, 3, 12, 3, 14, 5, 10, 6, 6, 3],
      [12, 6, 6, 5, 10, 5, 12, 3, 12, 3, 10, 5, 10, 7, 14, 3],
      [12, 7, 12, 5, 10, 5, 9, 9, 12, 3, 11, 9, 10, 6, 6, 3],
      [12, 7, 12, 5, 10, 5, 9, 11, 12, 3, 10, 5, 10, 6, 6, 3],
      [14, 5, 12, 5, 12, 3, 9, 9, 9, 12, 3, 9, 10, 3, 14, 3],

      // Row 6
      [14, 5, 12, 5, 12, 3, 9, 9, 9, 14, 3, 9, 10, 6, 6, 3],
      [14, 5, 12, 5, 12, 3, 11, 9, 9, 12, 5, 9, 10, 3, 10, 3],
      [12, 5, 12, 5, 11, 9, 9, 9, 12, 3, 11, 9, 10, 6, 6, 3],
      [14, 5, 12, 7, 12, 3, 10, 5, 9, 12, 5, 9, 10, 3, 10, 3],
      [12, 7, 12, 5, 10, 6, 3, 9, 12, 6, 6, 3, 10, 6, 6, 7],
      [12, 5, 12, 5, 11, 9, 9, 11, 12, 3, 10, 5, 10, 6, 6, 3],
    ];

    // Utility function to place into a JS REPL to quickly convert the binary into a string of numbers
    /**
    copy(
      `
    1100 0110 0110 0101
    1001 1100 0111 1001
    1001 1010 0101 1001
    1010 0110 0011 1011
      `
        .split("\n")
        .map((v) => v.trim())
        .filter((v) => v != "")
        .join(" ")
        .split(" ")
        .map((v) => parseInt(v, 2))
    );
     */

    /**
    Box 1
    1110 0101 1100 0101
    1100 0011 1001 1001
    1001 1110 0011 1001
    1010 0110 0110 0011

    Box 2
    1110 0101 1100 0101
    1100 0011 1011 1001
    1001 1100 0101 1001
    1010 0011 1010 0011

    Box 3
    1100 0101 1100 0101
    1011 1001 1001 1001
    1100 0011 1011 1001
    1010 0110 0110 0011

    Box 4
    1110 0101 1100 0111
    1100 0011 1010 0101
    1001 1100 0101 1001
    1010 0011 1010 0011

    Box 5
    1100 0111 1100 0101
    1010 0110 0011 1001
    1100 0110 0110 0011
    1010 0110 0110 0111
    
    Box 6
    1100 0101 1100 0101
    1011 1001 1001 1011
    1100 0011 1010 0101
    1010 0110 0110 0011
     */
    const size = 6; // NxN array
    const boxSize = 12;
    const spacing = boxSize * 2;
    // Columns & rows of the pattern to repeat
    const innerColumns = 4;
    const innerRows = 4;

    // Derived values
    const patternWidth = innerColumns * boxSize;
    const patternHeight = innerRows * boxSize;

    const offset = pattern;

    // Iterate over rows and columns of the pattern
    for (let k = 0; k < size; k++) {
      for (let j = 0; j < size; j++) {
        const xOffset = patternWidth * k + spacing * k;
        const yOffset = patternHeight * j + spacing * j;
        const patternIndex = (j * size + k + offset) % patternArray.length;
        // Draw the main pattern
        for (let row = 0; row < innerRows; row++) {
          for (let col = 0; col < innerColumns; col++) {
            drawPartialFrame(ctx, {
              xOffset: xOffset + boxSize * col,
              yOffset: yOffset + boxSize * row,
              width: boxSize,
              height: boxSize,
              thickness: 1,
              parts: getBordersForPattern(
                [row, col],
                innerColumns,
                // Remove the ?? as default value once others are filled in
                patternArray[patternIndex] ?? patternArray[0]
              ),
            });
          }
        }

        // drawFrame(ctx, {
        //   xOffset,
        //   yOffset,
        //   width: patternWidth,
        //   height: patternHeight,
        //   thickness: 1,
        //   fillStyle: "red",
        // });
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
  }, [pattern, width, height]);

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

export default Canvas;
