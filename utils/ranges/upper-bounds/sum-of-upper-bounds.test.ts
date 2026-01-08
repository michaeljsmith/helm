import { sumOfUpperBoundsNatural } from "./sum-of-upper-bounds.js";
import { POSITIVE_INFINITY } from "./upper-bound.js";

describe("sumOfUpperBounds", () => {
  it("adds infinities", () => {
    const comparison = sumOfUpperBoundsNatural(
      POSITIVE_INFINITY,
      POSITIVE_INFINITY,
    );
    expect(comparison).toBe(POSITIVE_INFINITY);
  });

  it("adds infinity to finite bound", () => {
    const comparison = sumOfUpperBoundsNatural(POSITIVE_INFINITY, 1);
    expect(comparison).toBe(POSITIVE_INFINITY);
  });

  it("adds finite bound to infinity", () => {
    const comparison = sumOfUpperBoundsNatural(1, POSITIVE_INFINITY);
    expect(comparison).toBe(POSITIVE_INFINITY);
  });

  it("adds finite bounds", () => {
    const comparison = sumOfUpperBoundsNatural(1, 2);
    expect(comparison).toBe(3);
  });
});
