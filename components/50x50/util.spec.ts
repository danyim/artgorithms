import { checkDraw, getBit } from "./util";

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

  describe("getBit", () => {
    it("should get the correct value at the bit position(s)", () => {
      const num = 2458; // 100110011010;
      // Assumes right to left
      expect(getBit(num, 0)).toEqual(false);
      expect(getBit(num, 1)).toEqual(true);
      expect(getBit(num, 2)).toEqual(false);
      expect(getBit(num, 3)).toEqual(true);
      expect(getBit(num, 4)).toEqual(true);
      expect(getBit(num, 5)).toEqual(false);
    });

    describe("one bit", () => {
      it("should correct value at the position for a one bit", () => {
        const num = 1;
        expect(getBit(num, 0)).toEqual(true);
      });
      it("should correct value at the position for a one bit", () => {
        const num = 0;
        expect(getBit(num, 0)).toEqual(false);
      });
    });

    describe("two bits", () => {
      it("should correct value at the position for three bits", () => {
        const num = 4; // 100
        expect(getBit(num, 0)).toEqual(false);
        expect(getBit(num, 1)).toEqual(false);
        expect(getBit(num, 2)).toEqual(true);
      });
    });
  });
});
