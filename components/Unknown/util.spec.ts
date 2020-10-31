import { getPreviousQuartileRangeValue, getRangeQuartile } from "./util";

describe("utils", () => {
  describe("getRangeQuartile", () => {
    it("should find the quartile", () => {
      const inputs = [12, 100];
      const expected = 1;
      expect(getRangeQuartile(inputs[0], inputs[1])).toEqual(expected);
    });

    it("should find the quartile", () => {
      const inputs = [77, 100];
      const expected = 4;
      expect(getRangeQuartile(inputs[0], inputs[1])).toEqual(expected);
    });
  });

  describe("getPreviousQuartileRangeValue", () => {
    it("should find the range value for quartile", () => {
      const inputs = [1, 100];
      const expected = 0;
      expect(getPreviousQuartileRangeValue(inputs[0], inputs[1])).toEqual(
        expected
      );
    });

    it("should find the range value for quartile", () => {
      const inputs = [2, 100];
      const expected = 25;
      expect(getPreviousQuartileRangeValue(inputs[0], inputs[1])).toEqual(
        expected
      );
    });

    it("should find the range value for quartile", () => {
      const inputs = [3, 100];
      const expected = 50;
      expect(getPreviousQuartileRangeValue(inputs[0], inputs[1])).toEqual(
        expected
      );
    });

    it("should find the range value for quartile", () => {
      const inputs = [4, 100];
      const expected = 75;
      expect(getPreviousQuartileRangeValue(inputs[0], inputs[1])).toEqual(
        expected
      );
    });
  });
});
