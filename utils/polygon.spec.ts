import { createWrappedRow } from "./polygon";

describe("polygon utils", () => {
  describe("createWrappedRow", () => {
    it("should create a wrapped row", () => {
      const input = {
        numItems: 20,
        numPerLine: 5,
        itemWidth: 100,
        padding: 10,
        offsetX: 0,
        offsetY: 0,
      };
      expect(createWrappedRow(input)).toMatchSnapshot();
    });

    it("should not return more points than numItems", () => {
      const input = {
        numItems: 20,
        numPerLine: 5,
        itemWidth: 100,
        padding: 10,
        offsetX: 0,
        offsetY: 0,
      };
      expect(createWrappedRow(input).length).toEqual(input.numItems);
    });
  });
});
