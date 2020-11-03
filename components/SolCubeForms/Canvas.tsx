import React from "react";
import { centerSquare } from "../../utils/polygon";

interface Props {
  width: number;
  height: number;
  space: number;
  onMouseMove: (e) => void;
  onMouseOut: (e) => void;
}

export const Canvas = ({
  width,
  height,
  space,
  onMouseMove,
  onMouseOut,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get ref");
      return;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, width, height);

    // Art params
    const squareSize = 500;
    const blackBoundaryFactor = 0.975;
    const innerSquareSize = (squareSize / 10) * space * 0.17;
    const innerSquareBorderFactor = 0.85;

    let x: number, y: number, w: number, h: number;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 6;
    ctx.fillStyle = "rgb(0, 0, 0)";
    ({ x, y, w, h } = centerSquare(250, 250, squareSize));
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = "rgb(35,73,109)"; // Dark bblue
    ({ x, y, w, h } = centerSquare(250, 250, squareSize * blackBoundaryFactor));
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ({ x, y, w, h } = centerSquare(250, 250, innerSquareSize));
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = "rgb(255,255,255)";
    ({ x, y, w, h } = centerSquare(
      250,
      250,
      innerSquareSize * innerSquareBorderFactor
    ));
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ({ x, y, w, h } = centerSquare(
      250,
      250,
      innerSquareSize * innerSquareBorderFactor * innerSquareBorderFactor
    ));
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = "rgb(134,48,19)"; // Dark red
    ({ x, y, w, h } = centerSquare(
      250,
      250,
      innerSquareSize *
        innerSquareBorderFactor *
        innerSquareBorderFactor *
        innerSquareBorderFactor
    ));
    ctx.fillRect(x, y, w, h);
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
  }, [space]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
    />
  );
};

export default Canvas;
