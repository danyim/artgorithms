import { createWrappedRow, getBoundsCenter } from "./polygon";

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
      expect(result[1]).toEqual({ x: 0, y: input.height + input.padding });
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

  describe("getBoundsCenter", () => {
    it("should return the center", () => {
      const input = { xMin: 0, xMax: 10, yMin: 0, yMax: 10 };
      const expected = { x: 5, y: 5 };
      const result = getBoundsCenter(input);
      expect(result).toEqual(expected);
    });

    it("should return the center with an offset", () => {
      const input = { xMin: 4, xMax: 50, yMin: 15, yMax: 25 };
      const expected = { x: 27, y: 20 };
      const result = getBoundsCenter(input);
      expect(result).toEqual(expected);
    });
  });
});
