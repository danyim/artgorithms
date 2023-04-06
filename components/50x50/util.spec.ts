import { checkDraw } from "./util";

describe("50x50 utils", () => {
  describe("checkSkip", () => {
    it("should return values", () => {
      let rowCol: [number, number];
      const pattern = 2458; // 100 110 011 010
      const totalColumns = 3;

      rowCol = [0, 0];
      expect(checkDraw(rowCol, totalColumns, pattern)).toEqual(true);
      rowCol = [0, 1];
      expect(checkDraw(rowCol, totalColumns, pattern)).toEqual(false);
      rowCol = [0, 2];
      expect(checkDraw(rowCol, totalColumns, pattern)).toEqual(false);

      rowCol = [1, 0];
      expect(checkDraw(rowCol, totalColumns, pattern)).toEqual(true);
      rowCol = [1, 1];
      expect(checkDraw(rowCol, totalColumns, pattern)).toEqual(true);
      rowCol = [1, 2];
      expect(checkDraw(rowCol, totalColumns, pattern)).toEqual(false);

      rowCol = [2, 0];
      expect(checkDraw(rowCol, totalColumns, pattern)).toEqual(false);
      rowCol = [2, 1];
      expect(checkDraw(rowCol, totalColumns, pattern)).toEqual(true);
      rowCol = [2, 2];
      expect(checkDraw(rowCol, totalColumns, pattern)).toEqual(true);

      rowCol = [3, 0];
      expect(checkDraw(rowCol, totalColumns, pattern)).toEqual(false);
      rowCol = [3, 1];
      expect(checkDraw(rowCol, totalColumns, pattern)).toEqual(true);
      rowCol = [3, 2];
      expect(checkDraw(rowCol, totalColumns, pattern)).toEqual(false);
    });
  });
});
