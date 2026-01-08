import { NEGATIVE_INFINITY } from "./lower-bound.js";
import { sumOfLowerBoundsNatural } from "./sum-of-lower-bounds.js";

describe("sumOfLowerBounds", () => {
  it("adds infinities", () => {
    const comparison = sumOfLowerBoundsNatural(
      NEGATIVE_INFINITY,
      NEGATIVE_INFINITY,
    );
    expect(comparison).toBe(NEGATIVE_INFINITY);
  });

  it("adds infinity to finite bound", () => {
    const comparison = sumOfLowerBoundsNatural(NEGATIVE_INFINITY, 1);
    expect(comparison).toBe(NEGATIVE_INFINITY);
  });

  it("adds finite bound to infinity", () => {
    const comparison = sumOfLowerBoundsNatural(1, NEGATIVE_INFINITY);
    expect(comparison).toBe(NEGATIVE_INFINITY);
  });

  it("adds finite bounds", () => {
    const comparison = sumOfLowerBoundsNatural(1, 2);
    expect(comparison).toBe(3);
  });
});
