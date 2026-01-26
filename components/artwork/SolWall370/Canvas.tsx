import React from "react";
import { drawBands } from "../SolColorBands/util";
import { useCanvasInteraction } from "../../../hooks/useCanvasInteraction";

// Control limits
export const SPACE_MIN = 5;
export const SPACE_MAX = 50;
export const ROTATION_MIN = 0;
export const ROTATION_MAX = 180;

interface Props {
  width: number;
  height: number;
  space: number;
  rotation: number;
  onSpaceChange?: (value: number) => void;
  onRotationChange?: (value: number) => void;
  onReset?: () => void;
}

export const Canvas = ({ width, height, space, rotation, onSpaceChange, onRotationChange, onReset }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const { handlers } = useCanvasInteraction({
    canvasRef,
    horizontal: {
      min: SPACE_MIN,
      max: SPACE_MAX,
      onChange: onSpaceChange,
    },
    vertical: {
      min: ROTATION_MIN,
      max: ROTATION_MAX,
      decimals: 1,
      onChange: onRotationChange,
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

    // Art params
    const bandSize = space;

    // Calculate bands needed to fill the canvas
    const backgroundBands = Math.ceil(height / bandSize) + 2;

    drawBands(
      ctx,
      0,
      0,
      bandSize,
      backgroundBands,
      0,
      [
        [0, 0, 0],
        [255, 255, 255],
      ],
      false
    );

    const radius = width * 0.4;
    // Calculate bands needed to fill the circle diameter
    const numBands = Math.ceil((radius * 2) / bandSize) + 2;
    const size = bandSize * numBands;
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
    ctx.clip();
    ctx.translate(0, 13);
    drawBands(
      ctx,
      width / 2 - size / 2,
      height / 2 - size / 2,
      bandSize,
      numBands,
      rotation,
      [
        [0, 0, 0],
        [255, 255, 255],
      ],
      false
    );
    ctx.restore();
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
  }, [space, rotation, width, height]);

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
