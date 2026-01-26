import { useCallback } from "react";

interface AxisConfig {
  min: number;
  max: number;
  inverted?: boolean; // Default false for horizontal (left=min), true for vertical (top=max)
  decimals?: number; // Number of decimal places (default: 0 for integers)
  onChange?: (value: number) => void;
}

interface UseCanvasInteractionConfig {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  horizontal?: AxisConfig;
  vertical?: AxisConfig;
}

interface UseCanvasInteractionReturn {
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    onTouchMove: (e: React.TouchEvent<HTMLCanvasElement>) => void;
  };
}

export function useCanvasInteraction({
  canvasRef,
  horizontal,
  vertical,
}: UseCanvasInteractionConfig): UseCanvasInteractionReturn {
  const updateFromPosition = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Helper to round to specified decimals
      const roundTo = (value: number, decimals: number = 0) => {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
      };

      // Map horizontal position
      if (horizontal) {
        const normX = Math.max(0, Math.min(1, x / rect.width));
        const range = horizontal.max - horizontal.min;
        const rawValue = horizontal.inverted
          ? horizontal.max - normX * range
          : horizontal.min + normX * range;
        const newValue = roundTo(rawValue, horizontal.decimals);
        horizontal.onChange?.(newValue);
      }

      // Map vertical position
      if (vertical) {
        const normY = Math.max(0, Math.min(1, y / rect.height));
        const range = vertical.max - vertical.min;
        // Vertical is inverted by default (top = max feels natural)
        const rawValue = vertical.inverted === false
          ? vertical.min + normY * range
          : vertical.max - normY * range;
        const newValue = roundTo(rawValue, vertical.decimals);
        vertical.onChange?.(newValue);
      }
    },
    [canvasRef, horizontal, vertical]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      updateFromPosition(e.clientX, e.clientY);
    },
    [updateFromPosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      if (e.touches.length > 0) {
        updateFromPosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [updateFromPosition]
  );

  return {
    handlers: {
      onMouseMove: handleMouseMove,
      onTouchMove: handleTouchMove,
    },
  };
}
