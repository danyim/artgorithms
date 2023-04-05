import React from "react";
import { drawFrame } from "utils/art";

interface Props {
  width?: number;
  height?: number;
  bands: number;
}

export const Canvas = ({ width, height, bands }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

  const handleOnMouseMove = () => {
    // draw();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 500, 250);

    // Art params
    // Colors, outside-in
    const hexColorsLeft = [
      "#AE3738",
      "#1A418B",
      "#D55228",
      "#2459A2",
      "#F2BB41",
      "#3274B7",
      "#2E6C4F",
      "#3F8CBF",
      "#1A418E",
      "#7AA9D5",
      "#693C6D",
      "#EDE7E0",
    ];
    // Colors, outside-in
    const hexColorsRight = [
      "#EFEBE6",
      "#6F3F70",
      "#7DADD7",
      "#1A438F",
      "#438EC7",
      "#337750",
      "#3375BA",
      "#F2BB40",
      "#2558A7",
      "#D2522A",
      "#1A3F89",
      "#A83331",
    ];

    const tempWidth = 250;
    const thickness = tempWidth / bands / 2;

    // Left Square
    for (let k = 0; k < bands; k++) {
      drawFrame(ctx, {
        xOffset: 0 + thickness * k,
        yOffset: 0 + thickness * k,
        width: tempWidth - 2 * thickness * k - thickness / 2,
        height: tempWidth - 2 * thickness * k - thickness / 2,
        thickness,
        fillStyle: hexColorsLeft[k % hexColorsLeft.length],
      });
    }
    // Right Square
    for (let k = 0; k < bands; k++) {
      drawFrame(ctx, {
        xOffset: tempWidth + thickness * k,
        yOffset: 0 + thickness * k,
        width: tempWidth - 2 * thickness * k - thickness / 2,
        height: tempWidth - 2 * thickness * k - thickness / 2,
        thickness,
        fillStyle: hexColorsRight[k % hexColorsLeft.length],
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
    ctx.clearRect(0, 0, 500, 500);
  };

  React.useEffect(() => {
    draw();
  }, [bands, width, height]);

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
