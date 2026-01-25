import React from "react";

/**
 * Accepts a JSON
 * @param param0
 * @returns
 */
export const useCanvasPosition = (canvas: HTMLCanvasElement) => {
  if (!canvas) {
    console.error("Invalid canvas ref provided");
    return undefined;
  }

  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null,
  });

  React.useEffect(() => {
    if (!canvas) {
      return;
    }

    const updateMousePosition = (ev: any) => {
      let x, y;
      if (ev.touches) {
        const touch = ev.touches[0];
        [x, y] = [touch.clientX, touch.clientY];
      } else {
        [x, y] = [ev.clientX, ev.clientY];
      }
      setMousePosition({ x, y });
    };

    canvas.addEventListener("mousemove", updateMousePosition);
    canvas.addEventListener("touchmove", updateMousePosition);
    return () => {
      canvas.removeEventListener("mousemove", updateMousePosition);
      canvas.removeEventListener("touchmove", updateMousePosition);
    };
  }, []);
  return mousePosition;
};

export default useCanvasPosition;
