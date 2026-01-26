import React from "react";

interface Props {
  width?: number;
  height?: number;
  bandCount: number;
}

// Single continuous ribbon path traced from reference
// Normalized coordinates (0-1), flows left to right
// W-shape: half-crest left, trough, large crest, trough, half-crest right
const RIBBON_PATH = [
  // Enters from left edge - coming down from half-crest
  { x: 0.0, y: 0.25 },
  { x: 0.06, y: 0.35 },
  { x: 0.12, y: 0.50 },
  // First trough (left valley) - pinched V-shape
  { x: 0.18, y: 0.68 },
  { x: 0.22, y: 0.80 },
  { x: 0.26, y: 0.72 },
  // Rising toward central crest
  { x: 0.34, y: 0.55 },
  { x: 0.42, y: 0.40 },
  // Central crest (peak)
  { x: 0.50, y: 0.22 },
  { x: 0.58, y: 0.40 },
  // Falling toward second trough
  { x: 0.65, y: 0.60 },
  // Second trough (right valley)
  { x: 0.72, y: 0.75 },
  { x: 0.78, y: 0.78 },
  { x: 0.82, y: 0.68 },
  // Rising toward right half-crest
  { x: 0.88, y: 0.50 },
  { x: 0.94, y: 0.35 },
  // Exits right edge - going up into half-crest
  { x: 1.0, y: 0.25 },
];

export const Canvas = ({
  width = 500,
  height = 500,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background - terracotta red
    ctx.fillStyle = "#c44535";
    ctx.fillRect(0, 0, width, height);

    // Draw the single continuous black ribbon
    ctx.beginPath();
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    RIBBON_PATH.forEach((p, i) => {
      const x = p.x * width;
      const y = p.y * height;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        // Use quadratic curves for smoothness
        const prev = RIBBON_PATH[i - 1];
        const prevX = prev.x * width;
        const prevY = prev.y * height;
        const midX = (prevX + x) / 2;
        const midY = (prevY + y) / 2;
        ctx.quadraticCurveTo(prevX, prevY, midX, midY);
      }
    });
    // Draw to the last point
    const last = RIBBON_PATH[RIBBON_PATH.length - 1];
    ctx.lineTo(last.x * width, last.y * height);
    ctx.stroke();
  };

  const handleOnClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, width, height);
  };

  React.useEffect(() => {
    draw();
  }, [width, height]);

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} />
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
