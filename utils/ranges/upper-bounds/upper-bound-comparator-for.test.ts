import { naturalUpperBoundComparator } from "./upper-bound-comparator-for.js";
import { POSITIVE_INFINITY } from "./upper-bound.js";

describe("compareUpperBound", () => {
  it("compares infinities", () => {
    const comparison = naturalUpperBoundComparator(
      POSITIVE_INFINITY,
      POSITIVE_INFINITY,
    );
    expect(comparison).toBe(0);
  });

  it("compares infinity to finite bound", () => {
    const comparison = naturalUpperBoundComparator(POSITIVE_INFINITY, 1);
    expect(comparison).toBe(1);
  });

  it("compares finite bound to infinity", () => {
    const comparison = naturalUpperBoundComparator(1, POSITIVE_INFINITY);
    expect(comparison).toBe(-1);
  });

  it("compares finite bounds", () => {
    const comparison = naturalUpperBoundComparator(1, 2);
    expect(comparison).toBe(-1);
  });
});
