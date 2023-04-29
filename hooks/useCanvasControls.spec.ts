import { CanvasControl } from "components/InteractableCanvas";
import { useCanvasControls } from "./useCanvasControls";

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
    const { get } = useCanvasControls(controls);
    expect(get("space")).toEqual(controls[0].defaultValue);
  });
  it("should set and get values", () => {
    const expected = 777;
    const { get, set } = useCanvasControls(controls);
    set("space", expected);
    expect(get("space")).toEqual(expected);
  });
});
