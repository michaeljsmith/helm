import { clampToLowerBoundNatural } from "./clamp-to-lower-bound.js";
import { NEGATIVE_INFINITY } from "./lower-bound.js";

describe("clampToLowerBound", () => {
  it("clamps to infinity", () => {
    const clamped = clampToLowerBoundNatural(NEGATIVE_INFINITY, 1);
    expect(clamped).toBe(1);
  });

  it("clamps to higher bound", () => {
    const clamped = clampToLowerBoundNatural(2, 1);
    expect(clamped).toBe(2);
  });

  it("clamps to lower bound", () => {
    const clamped = clampToLowerBoundNatural(0, 1);
    expect(clamped).toBe(1);
  });
});
