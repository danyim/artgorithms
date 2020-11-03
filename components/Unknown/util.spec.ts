import { printPt } from "../../utils/polygon";
import {
  createSquareBounds,
  getPreviousQuartileRangeValue,
  getRangeQuartile,
  translateRangeToPoints,
} from "./util";

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

  describe("translateRangeToPoints", () => {
    const sqSize = 400;
    const container = createSquareBounds(0, 0, sqSize);
    const ctx = ({
      set strokeStyle(color) {},
      drawRect: jest.fn(),
    } as unknown) as CanvasRenderingContext2D;

    it("should translate the points correctly", () => {
      const inputs = [55, 363, 584, 800, 855, 1167, 1200, 1467];
      const expected = [
        [55, 0],
        [363, 0],
        [400, 184],
        [400, 400],
        [345, 400],
        [33, 400],
        [0, 400],
        [0, 133],
      ];

      const result = translateRangeToPoints(
        ctx,
        inputs,
        sqSize,
        container.bounds
      );
      expect(result.map(printPt)).toEqual(expected);
    });

    it("should translate the points correctly", () => {
      const inputs = [1167, 1200, 1467];
      const expected = [
        [33, 400],
        [0, 400],
        [0, 133],
      ];
      const result = translateRangeToPoints(
        ctx,
        inputs,
        sqSize,
        container.bounds
      );
      expect(result.map(printPt)).toEqual(expected);
    });

    it("should translate a border point correctly", () => {
      const inputs = [800];
      const expected = [[400, 400]];

      const result = translateRangeToPoints(
        ctx,
        inputs,
        sqSize,
        container.bounds
      );
      expect(result.map(printPt)).toEqual(expected);
    });

    it("should translate a border point correctly", () => {
      const inputs = [1200];
      const expected = [[0, 400]];

      const result = translateRangeToPoints(
        ctx,
        inputs,
        sqSize,
        container.bounds
      );
      expect(result.map(printPt)).toEqual(expected);
    });

    it("should translate a fourth percentile correctly", () => {
      const inputs = [1467];
      const expected = [[0, 133]];

      const result = translateRangeToPoints(
        ctx,
        inputs,
        sqSize,
        container.bounds
      );
      expect(result.map(printPt)).toEqual(expected);
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
