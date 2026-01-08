import { sumOfRangesNatural } from "./sum-of-ranges.js";

describe("sumOfRanges", () => {
  it("finds sum of trivial ranges", () => {
    const sum = sumOfRangesNatural({}, {});
    expect(sum).toEqual({});
  });

  it("finds sum of range and trivial range", () => {
    const sum = sumOfRangesNatural({ min: 5, max: 7 }, {});
    expect(sum).toEqual({});
  });

  it("finds sum of trivial range and range", () => {
    const sum = sumOfRangesNatural({}, { min: 5, max: 7 });
    expect(sum).toEqual({});
  });

  it("finds sum of ranges", () => {
    const sum = sumOfRangesNatural({ min: 3, max: 4 }, { min: 5, max: 7 });
    expect(sum).toEqual({ min: 8, max: 11 });
  });
});
