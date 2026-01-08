import { naturalLowerBoundComparator } from "./lower-bound-comparator-for.js";
import { NEGATIVE_INFINITY } from "./lower-bound.js";

describe("lowerBoundComparatorFor", () => {
  it("compares infinities", () => {
    const comparison = naturalLowerBoundComparator(
      NEGATIVE_INFINITY,
      NEGATIVE_INFINITY,
    );
    expect(comparison).toBe(0);
  });

  it("compares infinity to finite bound", () => {
    const comparison = naturalLowerBoundComparator(NEGATIVE_INFINITY, 1);
    expect(comparison).toBe(-1);
  });

  it("compares finite bound to infinity", () => {
    const comparison = naturalLowerBoundComparator(1, NEGATIVE_INFINITY);
    expect(comparison).toBe(1);
  });

  it("compares finite bounds", () => {
    const comparison = naturalLowerBoundComparator(1, 2);
    expect(comparison).toBe(-1);
  });
});
