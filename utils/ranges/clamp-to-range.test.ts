import { clampToRangeNatural } from "./clamp-to-range.js";

describe("clampToRange", () => {
  it("clamps to trivial range", () => {
    const clamped = clampToRangeNatural({}, 1);
    expect(clamped).toEqual(1);
  });

  it("clamps to higher lower bound", () => {
    const clamped = clampToRangeNatural({ min: 2 }, 1);
    expect(clamped).toEqual(2);
  });

  it("clamps to lower lower bound", () => {
    const clamped = clampToRangeNatural({ min: 0 }, 1);
    expect(clamped).toEqual(1);
  });

  it("clamps to lower higher bound", () => {
    const clamped = clampToRangeNatural({ max: 1 }, 2);
    expect(clamped).toEqual(1);
  });

  it("clamps to higher higher bound", () => {
    const clamped = clampToRangeNatural({ max: 2 }, 1);
    expect(clamped).toEqual(1);
  });
});
