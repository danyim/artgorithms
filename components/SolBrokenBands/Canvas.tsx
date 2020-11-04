import React from "react";
import { rgbToHsl } from "../../utils/color";
import { drawFrame } from "./util";

interface Props {
  width?: number;
  height?: number;
  saturation: number;
}

export const Canvas = ({ width, height, saturation }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, width, height);

    const rgbColors = [
      [189, 40, 56],
      [235, 79, 56],
      [77, 40, 109],
      [36, 99, 154],
      [36, 99, 154],
      [55, 129, 43],
      [249, 205, 75],
    ];
    const hslColors = rgbColors.map(([r, g, b]) => rgbToHsl(r, g, b));
    const colors = hslColors.map(
      ([h, s, l]) => `hsl(${h},${(s * saturation) / 10}%,${l}%)`
    );

    // Art params

    const frameSize = width / 4;
    const bandSize = frameSize / 16;

    const rotations = [90, 0, 135, 45];
    for (let k = 0; k < 4; k++) {
      drawFrame(
        ctx,
        k * (frameSize - bandSize),
        0,
        frameSize,
        bandSize,
        rotations[k],
        colors
      );
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

  const handleMouseMove = () => {
    draw();
  };

  React.useEffect(() => {
    draw();
  }, [saturation, width, height]);
  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
      />
      {/* <button onClick={draw}>Redraw</button>
      <button onClick={handleOnClear}>Clear</button> */}
    </>
  );
};

export default Canvas;
