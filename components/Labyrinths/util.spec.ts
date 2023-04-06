import { PartialFrameSide } from "../../utils/art";
import { getBordersForPattern } from "./util";

describe("Labyrinth utils", () => {
  describe("patternFrames", () => {
    it("should return values", () => {
      let rowCol: [number, number];
      const patternArray = [
        12, 6, 6, 5, 9, 12, 5, 9, 9, 11, 9, 9, 10, 6, 3, 11,
      ];
      const size = 4;
      let result: PartialFrameSide[];

      rowCol = [0, 0];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Top);
      expect(result).toContain(PartialFrameSide.Left);
      rowCol = [0, 1];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Top);
      expect(result).toContain(PartialFrameSide.Bottom);
      rowCol = [0, 2];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Top);
      expect(result).toContain(PartialFrameSide.Bottom);
      rowCol = [0, 3];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Top);
      expect(result).toContain(PartialFrameSide.Right);

      rowCol = [1, 0];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Left);
      expect(result).toContain(PartialFrameSide.Right);
      rowCol = [1, 1];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Left);
      expect(result).toContain(PartialFrameSide.Top);
      rowCol = [1, 2];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Top);
      expect(result).toContain(PartialFrameSide.Right);
      rowCol = [1, 3];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Left);
      expect(result).toContain(PartialFrameSide.Right);

      rowCol = [2, 0];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Left);
      expect(result).toContain(PartialFrameSide.Right);
      rowCol = [2, 1];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Bottom);
      expect(result).toContain(PartialFrameSide.Left);
      expect(result).toContain(PartialFrameSide.Right);
      rowCol = [2, 2];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Left);
      expect(result).toContain(PartialFrameSide.Right);
      rowCol = [2, 3];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Left);
      expect(result).toContain(PartialFrameSide.Right);

      rowCol = [3, 0];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Bottom);
      expect(result).toContain(PartialFrameSide.Left);
      rowCol = [3, 1];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Bottom);
      expect(result).toContain(PartialFrameSide.Top);
      rowCol = [3, 2];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Bottom);
      expect(result).toContain(PartialFrameSide.Right);
      rowCol = [3, 3];
      result = getBordersForPattern(rowCol, size, patternArray);
      expect(result).toContain(PartialFrameSide.Bottom);
      expect(result).toContain(PartialFrameSide.Right);
    });
  });
});
