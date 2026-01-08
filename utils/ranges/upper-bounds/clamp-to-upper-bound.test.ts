import { clampToUpperBoundNatural } from "./clamp-to-upper-bound.js";
import { POSITIVE_INFINITY } from "./upper-bound.js";

describe("clampToUpperBound", () => {
  it("clamps to infinity", () => {
    const clamped = clampToUpperBoundNatural(POSITIVE_INFINITY, 1);
    expect(clamped).toBe(1);
  });

  it("clamps to lower bound", () => {
    const clamped = clampToUpperBoundNatural(1, 2);
    expect(clamped).toBe(1);
  });

  it("clamps to higher bound", () => {
    const clamped = clampToUpperBoundNatural(1, 0);
    expect(clamped).toBe(0);
  });
});
