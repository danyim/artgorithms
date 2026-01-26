import React from "react";
import { getBordersForPattern } from "./util";
import { drawPartialFrame } from "utils/art";
import { useCanvasInteraction } from "../../../hooks/useCanvasInteraction";

// Control limits
export const SIZE_MIN = 2;
export const SIZE_MAX = 10;
export const PATTERN_MIN = 0;
export const PATTERN_MAX = 35;

interface Props {
  width?: number;
  height?: number;
  size: number;
  pattern: number;
  onSizeChange?: (value: number) => void;
  onPatternChange?: (value: number) => void;
  onReset?: () => void;
}

export const Canvas = ({ width, height, size, pattern, onSizeChange, onPatternChange, onReset }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const { handlers } = useCanvasInteraction({
    canvasRef,
    horizontal: {
      min: PATTERN_MIN,
      max: PATTERN_MAX,
      onChange: onPatternChange,
    },
    vertical: {
      min: SIZE_MIN,
      max: SIZE_MAX,
      onChange: onSizeChange,
    },
  });

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

    // Size controls NxN grid
    const innerColumns = 4;
    const innerRows = 4;
    const spacing = 24;
    // Calculate boxSize to fit within canvas
    const totalSpacing = spacing * (size - 1);
    const availableSpace = Math.min(width, height) - totalSpacing;
    const patternSize = availableSpace / size;
    const boxSize = patternSize / innerColumns;

    // Derived values
    const patternWidth = innerColumns * boxSize;
    const patternHeight = innerRows * boxSize;

    // Iterate over rows and columns of the pattern
    for (let k = 0; k < size; k++) {
      for (let j = 0; j < size; j++) {
        const xOffset = patternWidth * k + spacing * k;
        const yOffset = patternHeight * j + spacing * j;
        const patternIndex = (j * size + k + pattern) % patternArray.length;
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
    ctx.clearRect(0, 0, width, height);
  };

  React.useEffect(() => {
    draw();
  }, [size, pattern, width, height]);

  const handleDoubleClick = () => {
    onReset?.();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handlers.onMouseMove}
        onTouchMove={handlers.onTouchMove}
        onDoubleClick={handleDoubleClick}
        style={{ touchAction: "none" }}
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
