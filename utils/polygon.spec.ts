import { createWrappedRow } from "./polygon";

describe("polygon utils", () => {
  describe("createWrappedRow", () => {
    it("should create a wrapped row", () => {
      const input = {
        numItems: 20,
        numPerLine: 5,
        width: 100,
        height: 100,
        padding: 10,
        offsetX: 0,
        offsetY: 0,
      };
      expect(createWrappedRow(input)).toMatchSnapshot();
    });

    it("should create a wrapped row starting at (0,0)", () => {
      const input = {
        numItems: 2,
        numPerLine: 1,
        width: 100,
        height: 100,
        padding: 10,
        offsetX: 0,
        offsetY: 0,
      };
      const result = createWrappedRow(input);
      expect(result[0]).toEqual({ x: 0, y: 0 });
      expect(result[1]).toEqual({ x: 0, y: input.height });
    });

    it("should create a wrapped row starting at (100,100)", () => {
      const input = {
        numItems: 2,
        numPerLine: 1,
        width: 100,
        height: 100,
        padding: 10,
        offsetX: 100,
        offsetY: 100,
      };
      const result = createWrappedRow(input);
      expect(result[0]).toEqual({ x: 100, y: 100 });
      expect(result[1]).toEqual({ x: 100, y: 100 + 100 + 10 });
    });

    it("should not return more points than numItems", () => {
      const input = {
        numItems: 20,
        numPerLine: 5,
        width: 100,
        height: 100,
        padding: 10,
        offsetX: 0,
        offsetY: 0,
      };
      expect(createWrappedRow(input).length).toEqual(input.numItems);
    });
  });
});
