import { CanvasControl } from "types/types";
import { useCanvasControls } from "./useCanvasControls";
import { act, renderHook } from "@testing-library/react";

const controls: CanvasControl[] = [
  {
    name: "space",
    label: "Space",
    minStepMax: [5, 5, 50],
    defaultValue: 10,
  },
  {
    name: "lineWidth",
    label: "Thickness",
    minStepMax: [1, 2, 11],
    defaultValue: 3,
  },
];

describe("useCanvasControls", () => {
  it("should get default values", () => {
    const { result } = renderHook(() => useCanvasControls(controls));
    expect(result.current.get("space")).toEqual(controls[0].defaultValue);
  });

  it("should set and get values", () => {
    const expected = 777;
    const { result } = renderHook(() => useCanvasControls(controls));
    act(() => {
      result.current.set("space", expected);
    });
    expect(result.current.get("space")).toEqual(expected);
  });
});
