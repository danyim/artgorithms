import { getBit } from "./binary";

describe("binary utils", () => {
  describe("getBit", () => {
    it("should get the correct value at the bit position(s)", () => {
      const num = 2458; // 100110011010;
      expect(getBit(num, 0)).toEqual(false);
      expect(getBit(num, 1)).toEqual(true);
      expect(getBit(num, 2)).toEqual(false);
      expect(getBit(num, 3)).toEqual(true);
      expect(getBit(num, 4)).toEqual(true);
      expect(getBit(num, 5)).toEqual(false);
    });

    it("should get the correct value at the bit position(s)", () => {
      const num = 10; // 1010
      expect(getBit(num, 3)).toEqual(true);
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
